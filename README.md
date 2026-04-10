# OPTIMAQ - AI Optimization Dashboard

An intelligent optimization dashboard that leverages AI/ML to analyze system performance, provide insights, and recommend optimizations in real time.

## 🚀 Features

- **Real-time Analytics Dashboard**: Interactive charts and KPI cards
- **AI-Powered Insights**: ML-based optimization recommendations
- **Resource Management**: CRUD operations for system resources
- **Authentication & Authorization**: JWT-based secure access
- **Real-time Monitoring**: WebSocket-based live updates
- **Report Generation**: Export analytics as PDF/CSV
- **Performance Optimization**: Automated bottleneck detection

## 🏗️ Architecture

```
frontend/     # React + Vite + Tailwind CSS
backend/      # Node.js + Express + MongoDB
ml-engine/    # Python + Scikit-learn + Flask
docs/         # Documentation
scripts/      # Utility scripts
```

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- Recharts for data visualization
- Socket.io for real-time updates

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- Socket.io for real-time features
- Winston for logging

### AI/ML Engine
- Python with Flask
- Scikit-learn for ML models
- Random Forest for optimization predictions

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Python 3.11+
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/optimaq.git
   cd optimaq
   ```

2. **Environment Setup**
   ```bash
   # Copy environment files
   cp backend/.env.example backend/.env
   # Edit .env with your configuration
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - ML Engine: http://localhost:8000

### Manual Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **ML Engine Setup**
   ```bash
   cd ml-engine
   pip install -r requirements.txt
   python app.py
   ```

## 📊 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Metrics
- `GET /api/metrics` - Get system metrics
- `POST /api/metrics/simulate` - Simulate metrics data

### Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create new resource
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### Reports
- `GET /api/reports` - Get available reports
- `POST /api/reports/generate` - Generate new report

## 🤖 AI Model

The ML engine uses a Random Forest regressor trained on synthetic system performance data to predict optimization opportunities and provide actionable insights.

### Model Features
- CPU usage
- Memory usage
- Network traffic
- User load

### Training
```bash
cd ml-engine
python -c "from app import load_or_train_model; load_or_train_model()"
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

## 📦 Deployment

### Production Build

1. **Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Docker Deployment**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

### Environment Variables

See `.env.example` files in each service directory for required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@optimaq.com or join our Slack channel.

## 🔄 Future Enhancements

- Kubernetes deployment
- Advanced ML models (LSTM, Neural Networks)
- Multi-tenant architecture
- Integration with cloud providers (AWS, GCP, Azure)
- Mobile app companion
- Advanced alerting system

javac main/Main.java models/*.java optimizer/*.java

3 Run:

java main.Main

Algorithm Used:

Greedy Scheduling Algorithm:
Tasks are sorted by priority and allocated to the least loaded resource that can handle the task.

Objective:

To demonstrate algorithmic optimization techniques for efficient resource management.

Future Improvements:

Database integration
Web interface
Graph visualization
AI based prediction

Conclusion:

OPTIMAQ demonstrates how DSA concepts can be applied to solve real world resource allocation problems.