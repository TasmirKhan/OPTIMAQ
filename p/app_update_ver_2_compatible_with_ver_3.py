import streamlit as st
from rec_update_ver_3 import recommend

st.set_page_config(page_title="Movie Recommendation System", layout="centered")

st.title("🎬 Movie Recommendation System")
st.write("Get movie suggestions based on your favorite movie")

movie_name = st.text_input("Enter a movie name:")

if st.button("Recommend"):
    if movie_name:
        recommendations = recommend(movie_name)

        if not recommendations.empty:
            st.subheader("🎥 Recommended Movies:")

            for _, row in recommendations.iterrows():
                st.markdown(f"## 🎬 {row['title']}")
                st.write(f"⭐ Rating: {row['vote_average']} ({row['vote_count']} votes)")
                st.write(f"🔥 Popularity Score: {row['popularity']}")
                st.write(f"⏱ Runtime: {row['runtime']} minutes")
                st.write(f"🎭 Genres: {row['genres']}")

                budget = row['budget']
                budget_display = f"${budget:,}" if budget > 0 else "Not Available"
                st.write(f"💰 Budget: {budget_display}")

                st.write(f"📝 Overview: {row['overview']}")
                st.divider()

        else:
            st.error("Movie not found. Try another title.")
    else:
        st.warning("Please enter a movie name.")