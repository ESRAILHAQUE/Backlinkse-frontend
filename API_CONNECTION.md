# API Connection Guide

This document explains how the frontend is connected to the backend API.

## Architecture

The frontend and backend are **separate applications** that communicate via HTTP:
- **Frontend**: Located in `Backlinkse-frontend/` folder
- **Backend**: Located in `Backlinkse-backend/` folder (outside the frontend folder)
- **Communication**: HTTP REST API calls
- **Backend Port**: 5004 (default)
- **Frontend Port**: 3000 (Next.js default)

## Setup

### 1. Backend Setup (Backlinkse-backend folder)
```bash
cd ../Backlinkse-backend
npm install
# Create .env file with required variables (MONGODB_URI, JWT_SECRET, etc.)
npm run dev  # Starts backend on http://localhost:5004
```

### 2. Frontend Setup (Backlinkse-frontend folder)
```bash
cd Backlinkse-frontend
pnpm install
# Create .env.local file (see below)
pnpm dev  # Starts frontend on http://localhost:3000
```

### 3. Environment Variables

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5004/api/v1
```

**Backend** (`.env` in Backlinkse-backend folder):
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_REFRESH_SECRET` - JWT refresh secret key
- `PORT` - Server port (default: 5004)
- `CORS_ORIGIN` - Frontend URL (default: http://localhost:3000)

### 4. Running Both Services

You need to run **both** services simultaneously:

**Terminal 1 - Backend:**
```bash
cd ../Backlinkse-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Backlinkse-frontend
pnpm dev
```

The frontend will make HTTP requests to the backend API running on port 5004.

### 5. CORS Configuration

The backend is configured to allow requests from the frontend:
- **Development**: All origins are allowed (CORS is permissive)
- **Production**: Only configured origins in `CORS_ORIGIN` are allowed
- Default frontend origin: `http://localhost:3000`

## API Structure

### Base Configuration
- **Location**: `lib/api.ts`
- **Base URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable
- **Authentication**: JWT tokens stored in localStorage

### Available Services

#### Authentication (`lib/auth.ts`)
- `login(credentials)` - User login
- `register(data)` - User registration
- `getCurrentUser(userId?)` - Get current user
- `logout()` - Clear authentication
- `isAuthenticated()` - Check if user is authenticated

#### Users (`lib/users.ts`)
- `getAllUsers()` - Get all users
- `getUserById(id)` - Get user by ID
- `createUser(data)` - Create new user
- `updateUser(id, data)` - Update user
- `deleteUser(id)` - Delete user

## Connected Pages

### Authentication
- **Login**: `app/login/page.tsx` - Connected to `/api/v1/auth/login`
- **Signup**: `app/signup/page.tsx` - Connected to `/api/v1/auth/register`

### Admin
- **Users Management**: `app/admin/users/page.tsx` - Connected to `/api/v1/users`

## Usage Example

```typescript
import { login } from '@/lib/auth';
import { getAllUsers } from '@/lib/users';

// Login
try {
  const authData = await login({ email: 'user@example.com', password: 'password' });
  console.log('Logged in:', authData.user);
} catch (error) {
  console.error('Login failed:', error);
}

// Get users
try {
  const { users, count } = await getAllUsers();
  console.log('Users:', users);
} catch (error) {
  console.error('Failed to fetch users:', error);
}
```

## Backend API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create user
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Health Check
- `GET /health` - Server health check

## Token Management

- Access tokens are stored in `localStorage` as `accessToken`
- Refresh tokens are stored in `localStorage` as `refreshToken`
- User data is stored in `localStorage` as `user`
- Tokens are automatically included in API requests via Authorization header

## Error Handling

All API calls include error handling:
- Network errors are caught and displayed to users
- Validation errors from backend are shown in forms
- Authentication errors redirect to login page (can be implemented)

## Next Steps

To connect additional pages:
1. Create service functions in `lib/` directory
2. Import and use in your components
3. Handle loading and error states
4. Update UI based on API responses

## Deployment

- CI/CD via GitHub Actions deploys to `/var/www/Backlinkse/frontend` with PM2 on port 3004.
