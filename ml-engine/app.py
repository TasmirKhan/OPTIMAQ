from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os
from datetime import datetime

app = Flask(__name__)

# Load or train model
MODEL_PATH = 'models/optimization_model.pkl'

def load_or_train_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    else:
        # Generate synthetic training data
        np.random.seed(42)
        n_samples = 1000

        # Features: cpu_usage, memory_usage, network_traffic, user_load
        X = np.random.rand(n_samples, 4) * 100
        # Target: performance_score (higher is better)
        y = 100 - (X[:, 0] * 0.3 + X[:, 1] * 0.4 + X[:, 2] * 0.2 + X[:, 3] * 0.1) + np.random.normal(0, 5, n_samples)

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)

        # Save model
        os.makedirs('models', exist_ok=True)
        joblib.dump(model, MODEL_PATH)

        # Evaluate
        y_pred = model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        print(f"Model trained. MSE: {mse:.2f}")

        return model

model = load_or_train_model()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = np.array([[data['cpu'], data['memory'], data['network'], data['users']]])
        prediction = model.predict(features)[0]

        # Generate insights based on prediction
        insights = generate_insights(data, prediction)

        return jsonify({
            'prediction': prediction,
            'insights': insights,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def generate_insights(data, prediction):
    insights = []

    if data['cpu'] > 80:
        insights.append("High CPU usage detected. Consider optimizing compute-intensive operations.")
    if data['memory'] > 85:
        insights.append("Memory usage is high. Implement memory pooling or increase RAM allocation.")
    if data['network'] > 5:
        insights.append("Network traffic is elevated. Consider implementing caching or CDN.")
    if prediction < 70:
        insights.append("Overall performance score is low. Review system bottlenecks and resource allocation.")

    # AI-based suggestions
    if data['cpu'] > 60 and data['memory'] < 50:
        insights.append("CPU-bound system detected. Consider vertical scaling or algorithm optimization.")
    elif data['memory'] > 70 and data['cpu'] < 50:
        insights.append("Memory-bound system detected. Implement memory-efficient data structures.")

    return insights

@app.route('/train', methods=['POST'])
def train_model():
    try:
        # In a real scenario, this would accept new training data
        global model
        model = load_or_train_model()
        return jsonify({'message': 'Model retrained successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)