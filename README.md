# FitnessTracker

Simple Node.js server that accepts booking requests and stores them in a PostgreSQL database.

## Setup

1. Copy `.env.example` to `.env` and update `DATABASE_URL` to point to your database.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

## API

### `POST /bookings`

Create a booking with JSON body:
```json
{
  "name": "Alice",
  "date": "2024-01-01"
}
```
