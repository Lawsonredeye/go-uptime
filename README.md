# GoUptime - Website Monitoring Service

A modern website monitoring service built with Go and React that helps you track the uptime of your web applications and APIs.

## Features

- 🔐 **Authentication System**
  - JWT-based authentication using API tokens
  - Secure password hashing with bcrypt
  - Protected routes with middleware authentication

- 🌐 **CORS Support**
  - Configured for cross-origin requests
  - Allows requests from `http://localhost:5173`
  - Supports various HTTP methods (GET, POST, PUT, DELETE, OPTIONS)
  - Custom header support including `X-API-Key`

- 📊 **Real-time Monitoring**
  - Periodic uptime checks every 5 minutes
  - Status tracking for multiple endpoints
  - Alert system for downtime notifications
  - Email notifications for service disruptions

- 🎯 **User Features**
  - User registration and login
  - Personal dashboard
  - API token management
  - Multiple endpoint monitoring

## Tech Stack

### Backend
- Go (Golang)
- Gin Web Framework
- SQLite Database
- CORS middleware
- Bcrypt for password hashing
- UUID for API token generation

### Frontend
- React
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- Vite for development

## API Endpoints

### Public Routes
- `POST /signup`
  - Creates a new user account
  - Required fields: name, email, password
  - Returns: Success message

- `POST /login`
  - Authenticates user and returns API token
  - Required fields: email, password
  - Returns: API token and success message

### Protected Routes (requires X-API-Key header)
- `POST /api/v1/monitor`
  - Start monitoring a new endpoint
  - Required fields: url, email (for alerts)
  - Returns: Success message

- `GET /api/v1/status`
  - Get status of all monitored endpoints
  - Returns: List of endpoints with their status and alert counts

## Getting Started

### Prerequisites
- Go 1.23.1 or higher
- Node.js and npm
- SQLite

### Backend Setup

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd go_uptime
\`\`\`

2. Install Go dependencies
\`\`\`bash
go mod download
\`\`\`

3. Create .env file for email notifications (optional)
\`\`\`bash
SMTP_MAIL_PASSWORD=your_smtp_password
\`\`\`

4. Run the server
\`\`\`bash
go run main.go
\`\`\`

The server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:5173`

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT unique,
    password TEXT,
    organization_name TEXT,
    subscription TEXT,
    api_token TEXT
)
\`\`\`

### Endpoints Table
\`\`\`sql
CREATE TABLE endpoints (
    url TEXT PRIMARY KEY,
    user_id integer,
    status INT,
    alert_count INT
)
\`\`\`

## Features in Detail

### Authentication Middleware
- Validates API tokens for protected routes
- Extracts user email from token for request context
- Ensures secure access to monitoring features

### Monitoring System
- Performs HTTP checks on registered endpoints
- Updates status in real-time
- Tracks alert counts for each endpoint
- Sends email notifications for downtime

### Frontend Features
- Responsive design with TailwindCSS
- Protected route navigation
- Real-time status updates
- User-friendly forms for endpoint management

## Security Features
- Password hashing using bcrypt
- UUID-based API tokens
- CORS protection
- HTTP-only cookies
- Protected API routes
- Input validation

## Error Handling
- Custom error responses
- Input validation on both frontend and backend
- Proper HTTP status codes
- User-friendly error messages

## Contributing
Feel free to submit issues and enhancement requests!
