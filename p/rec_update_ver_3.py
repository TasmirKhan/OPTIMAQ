import pandas as pd
import ast
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# =========================
# 1️⃣ Load Dataset
# =========================
movies = pd.read_csv("tmdb_5000_movies.csv", encoding="utf-8")

movies.columns = movies.columns.str.lower().str.strip()

# ✅ Keep additional columns
movies = movies[['title', 'overview', 'genres',
                 'vote_average', 'vote_count',
                 'runtime', 'budget', 'popularity']]

movies.dropna(inplace=True)
movies.reset_index(drop=True, inplace=True)


# =========================
# 2️⃣ Clean Titles
# =========================
movies['title'] = (
    movies['title']
    .astype(str)
    .str.replace('\ufeff', '', regex=False)
    .str.strip()
    .str.replace(r'\s+', ' ', regex=True)
)


# =========================
# 3️⃣ Extract Genres
# =========================
def extract_genres(genres):
    genres = ast.literal_eval(genres)
    return " ".join([g['name'] for g in genres])

movies['genres'] = movies['genres'].apply(extract_genres)


# =========================
# 4️⃣ Create Content Column
# =========================
movies['content'] = movies['overview'] + " " + movies['genres']


# =========================
# 5️⃣ TF-IDF + Cosine Similarity
# =========================
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movies['content'])

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)


# =========================
# 6️⃣ Case-Insensitive Index
# =========================
indices = pd.Series(
    movies.index,
    index=movies['title'].str.lower().str.strip()
).drop_duplicates()


# =========================
# 7️⃣ Recommendation Function
# =========================
def recommend(movie_title, n=5):
    movie_title = str(movie_title).strip().lower()

    # Try exact match
    if movie_title in indices:
        idx = indices[movie_title]
    else:
        # Try partial match
        matches = movies[movies['title'].str.lower().str.contains(movie_title)]
        if matches.empty:
            print("Movie not found in dataset")
            return pd.DataFrame()
        idx = matches.index[0]
        print(f"Using closest match: {movies['title'].iloc[idx]}")

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    sim_scores = sim_scores[1:n+1]
    movie_indices = [i[0] for i in sim_scores]

    # ✅ Return detailed information
    return movies[['title',
               'vote_average',
               'vote_count',
               'runtime',
               'budget',
               'popularity',
               'genres',
               'overview']].iloc[movie_indices]