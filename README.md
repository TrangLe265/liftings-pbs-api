# Backend API - Express & Supabase
- This backend was created for a ReactNative mobile app frontend
- User can signup/in with the mobile app, start adding + viewing their own data
- The app stores the received access token securely (e.g., AsyncStorage in React Native).
- API requests to the backend include the token in the headers.
- In backend, Supabase validates credentials and returns an access token.
- The token is included in the Authorization header for future requests.
- Middleware verifies the token before processing protected endpoints (e.g., /lifts).
- If authentication fails, the user is prompted to log in again.

## 📌 Tech Stack
- **Express.js** - Backend framework
- **Nodemon** - Hot reloading for development
- **Supabase** - Database provider & authentication
- **Docker** - Required for running Supabase locally

## 🚀 Setup & Running Locally

### 1️⃣ Prerequisites
- Install **Docker** ([Download here](https://www.docker.com/))
- Register on **Supabase** ([Sign up here](https://supabase.com/))

### 2️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
*(You can find these values in your Supabase dashboard under Project Settings > API.)*

### 3️⃣ Start Backend Locally
Run the following commands in your terminal:
```sh
#Install deps
npm install

# Login to Supabase (only needed once)
supabase login

# Start Supabase locally
docker start  # Ensure Docker is running
supabase start

# Start backend with hot reload
nodemon start  # Runs with Nodemon
```

## 📡 API Endpoints
- `POST /lifts` - Add a new lift record
- `GET /lifts` - Fetch all lift records
- `GET /lifts/lift_category_id` - Fetch all lift records in a specific category
- `PUT /lifts/id` - Edit a specific lift
- `DELETE /lifts/id` - Delete a specific lift
- `GET /categories` - Fetch all lift categories
---

🚀 Happy Coding!

