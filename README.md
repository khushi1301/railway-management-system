# Railway Management System

- This project is a Railway Management System API built with Node.js, Express.js, and MySQL. It provides endpoints for user registration, login, train management, seat booking, and more.

## Setup

### Prerequisites

- Node.js installed on your machine
- MySQL server installed and running
- Git (optional)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>

   ```

2. **Navigate to the project directory:**
   cd railway-management-system

3. **Install dependencies:**
   npm install

4. **Configure the database:**

   - Create a MySQL database named railway_management.
   - Update the database configuration in the config.js file with your MySQL username and password.

5. **Start the server:**
   npm start

# The server should now be running on http://localhost:3000.

### Usage

# You can interact with the Railway Management System API using various endpoints.

### Endpoints

**User Management**

# POST /api/users/register: Register a new user with the following JSON payload:

{
"username": "your_username",
"email": "your_email@example.com",
"password": "your_password"
}

# POST /api/users/login: Log in an existing user with the following JSON payload:

{
"email": "your_email@example.com",
"password": "your_password"
}

**Admin**

# POST /api/admin/trains: Add a new train (admin only) with the following JSON payload:

{
"source": "source_station",
"destination": "destination_station",
"total_seats": 100
}

**Booking**

# GET /api/bookings/:bookingId: Get specific booking details.

# GET /api/seatsAvailability: Get seat availability between two stations.

# POST /api/bookings: Book a seat on a train with the following JSON payload:

{
"train_id": 1,
"user_id": 1
}

### Contributing

# Contributions are welcome! If you find any issues or have suggestions for improvement, please create a pull request or open an issue.
