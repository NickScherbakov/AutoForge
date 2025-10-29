# AutoForge MVP - Project Documentation

## Quick Start Guide

### Prerequisites
- Docker and Docker Compose installed
- Git

### Running the Project

1. **Clone the repository**
```bash
git clone https://github.com/NickScherbakov/AutoForge.git
cd AutoForge
```

2. **Set up environment variables**
```bash
# Copy example env file
cp backend/.env.example backend/.env

# Edit backend/.env with your configuration
# At minimum, configure:
# - SECRET_KEY (generate a random string)
# - STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY (if testing payments)
# - SMTP settings (if testing email actions)
# - TELEGRAM_BOT_TOKEN (if testing Telegram actions)
```

3. **Start all services with Docker Compose**
```bash
docker-compose up --build
```

This will start:
- PostgreSQL database (port 5432)
- Redis (port 6379)
- Backend API (port 8000)
- Celery workers
- Celery beat scheduler
- Frontend (port 3000)

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API docs: http://localhost:8000/docs
- Backend health check: http://localhost:8000/health

### Manual Setup (Without Docker)

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Start PostgreSQL and Redis separately

# Run migrations (tables are auto-created on startup)
# Start the API server
uvicorn app.main:app --reload

# In another terminal, start Celery worker
celery -A app.workers.celery_app worker --loglevel=info

# In another terminal, start Celery beat (for scheduled tasks)
celery -A app.workers.celery_app beat --loglevel=info
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## Architecture

### Backend (FastAPI + Python)
- **app/main.py** - Main FastAPI application
- **app/models/** - SQLAlchemy database models
- **app/schemas/** - Pydantic validation schemas
- **app/api/** - API endpoints (auth, chains, users, webhooks)
- **app/core/** - Core functionality (config, database, security)
- **app/workers/** - Celery tasks for background job execution
- **app/services/** - Business logic services

### Frontend (Next.js + TypeScript + Tailwind CSS)
- **src/pages/** - Next.js pages and routes
- **src/components/** - Reusable React components
- **src/lib/** - API client and utilities
- **src/store/** - State management (Zustand)
- **src/styles/** - Global styles and Tailwind config

### Database Schema
- **users** - User accounts with email, password, balance
- **chains** - Workflow definitions (trigger + actions)
- **execution_logs** - History of workflow executions
- **transactions** - Financial transactions (deposits and charges)

## Features

### Triggers (Events)
1. **Webhook** - Receive HTTP POST requests at `/webhooks/{chain_id}`
2. **Schedule** - Run on a schedule (requires Celery beat configuration)
3. **Manual** - Trigger via button in the UI or API call

### Actions
1. **HTTP Request** - Send GET/POST/PUT/DELETE requests to any URL
2. **Send Email** - Send emails via SMTP
3. **Telegram Message** - Send messages to Telegram chats

### Billing
- Users have an account balance
- Each workflow execution costs $0.05-$0.50 (configurable per chain)
- Users are only charged when the workflow completes successfully
- Deposits via Stripe integration

### Authentication
- Email and password registration/login
- JWT token-based authentication
- Protected API endpoints

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get access token

### Chains (Workflows)
- `GET /chains/` - List user's chains
- `POST /chains/` - Create new chain
- `GET /chains/{id}` - Get chain details
- `PUT /chains/{id}` - Update chain
- `DELETE /chains/{id}` - Delete chain
- `POST /chains/{id}/execute` - Manually trigger execution
- `GET /chains/{id}/executions` - Get execution history

### User
- `GET /users/me` - Get current user info
- `GET /users/me/transactions` - Get transaction history
- `POST /users/me/deposit` - Deposit funds

### Webhooks
- `POST /webhooks/{chain_id}` - Webhook endpoint for triggering chains

## Development

### Running Tests
```bash
cd backend
pytest
```

### Database Migrations
The application uses SQLAlchemy and creates tables automatically on startup. For production, consider using Alembic for migrations:

```bash
# Initialize Alembic
alembic init alembic

# Create a migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head
```

## Deployment

### Production Checklist
- [ ] Set strong SECRET_KEY in environment variables
- [ ] Configure production database (PostgreSQL)
- [ ] Configure Redis for production
- [ ] Set up proper CORS origins in backend
- [ ] Configure Stripe with production keys
- [ ] Set up SMTP for email sending
- [ ] Configure Telegram bot if using Telegram actions
- [ ] Set up SSL/TLS certificates
- [ ] Configure proper logging and monitoring
- [ ] Set up automated backups for database
- [ ] Configure rate limiting and security headers
- [ ] Test all workflows in staging environment

### Deployment Options
1. **VPS (DigitalOcean, Linode, etc.)**
   - Use docker-compose for deployment
   - Set up nginx as reverse proxy
   - Configure SSL with Let's Encrypt

2. **Railway / Render**
   - Deploy backend and frontend separately
   - Use managed PostgreSQL and Redis
   - Configure environment variables in platform

3. **Vercel (Frontend) + Railway (Backend)**
   - Deploy Next.js to Vercel
   - Deploy FastAPI to Railway
   - Configure NEXT_PUBLIC_API_URL to point to backend

## Contributing

This is an MVP. Areas for improvement:
- [ ] Add comprehensive test coverage
- [ ] Implement drag-and-drop visual workflow editor (React Flow)
- [ ] Add more trigger types (email, form submission, etc.)
- [ ] Add more action types (Slack, Discord, database operations, etc.)
- [ ] Implement workflow conditions and branching logic
- [ ] Add workflow templates library
- [ ] Implement team collaboration features
- [ ] Add detailed analytics and monitoring
- [ ] Implement rate limiting per user
- [ ] Add webhook signature verification
- [ ] Implement retry logic for failed actions
- [ ] Add workflow versioning

## License

See LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.
