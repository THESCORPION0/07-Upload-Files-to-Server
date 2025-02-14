# My Way to Learn NodeJS -  Upload Files to Server

This repo contains my 5th project for learning Backend using Express.js, application that allows users to upload files to the server. It includes features for user authentication, product management, and image handling.

## Features

- User Authentication
  - Signup
  - Login
  - Protect Routes
  - Role-based Access Control
  - Account Activation

- Product Management
  - Create, Read, Update, Delete (CRUD) operations for products
  - Upload and handle multiple product images

- User Management
  - CRUD operations for users
  - Upload and handle user profile images
  - Change user password

- Error Handling
  - Custom error handling middleware
  - 404 Not Found middleware
  - Request Validation middleware

- Security
  - Helmet for setting various HTTP headers
  - CORS for enabling Cross-Origin Resource Sharing
  - XSS-Clean for sanitizing user input
  - Rate Limiting to prevent brute-force attacks

## Project Structure

```
Upload-Files-to-Server/
├── controllers/      # Controllers for handling requests
│   ├── auth.js       # Authentication controller
│   ├── products.js   # Product management controller
│   ├── refactorHandler.js # Refactor handler
│   └── user.js       # User management controller
├── db/               # Database connection files
│   └── connect.js    # MongoDB connection setup
├── middleware/       # Custom middleware
│   ├── error-handler.js # Error handling middleware
│   ├── not-found.js  # 404 Not Found middleware
│   ├── uploadImage.js # Image upload middleware
│   └── validatorMiddleware.js # Validation middleware
├── models/           # Mongoose models
│   ├── productsModel.js # Product model
│   └── userModel.js  # User model
├── routes/           # Route definitions
│   ├── authRoute.js  # Authentication routes
│   ├── index.js      # Main route file
│   ├── productsRoute.js # Product routes
│   └── userRoute.js  # User routes
├── uploads/          # Uploaded files
│   ├── products/     # Product images
│   └── users/        # User profile images
├── utils/            # Utility functions
│   ├── apiErrors.js  # API error handling
│   ├── createToken.js # JWT token creation
│   ├── features.js   # Additional features
│   └── startServer.js # Server startup script
├── validation/       # Validation scripts
├── .env              # Environment variables
├── .gitignore        # Ignored files/folders
├── app.js            # Main application file
├── package.json      # NPM dependencies
└── README.md         # Project documentation
```

## Routes

### Auth Routes

- `POST /api/v1/auth/signup` - User signup
- `POST /api/v1/auth/login` - User login

### User Routes

- `GET /api/v1/users/me` - Get logged-in user profile
- `PUT /api/v1/users/updateMe` - Update logged-in user profile
- `PUT /api/v1/users/changeMyPassword` - Change logged-in user password
- `DELETE /api/v1/users/deleteMe` - Delete logged-in user account
- `GET /api/v1/users` - Get all users (Manager only)
- `POST /api/v1/users` - Create a new user (Manager only)
- `GET /api/v1/users/:id` - Get a user by ID (Manager only)
- `PUT /api/v1/users/:id` - Update a user by ID (Manager only)
- `DELETE /api/v1/users/:id` - Delete a user by ID (Manager only)
- `PUT /api/v1/users/:id/changePassword` - Change user password by ID (Manager only)

### Product Routes

- `GET /api/v1/products` - Get all products
- `POST /api/v1/products` - Create a new product (Manager only)
- `GET /api/v1/products/:id` - Get a product by ID
- `PUT /api/v1/products/:id` - Update a product by ID (Manager only)
- `DELETE /api/v1/products/:id` - Delete a product by ID (Manager only)

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Usage

1. Clone the repository.
2. Create a `.env` file in the root directory and add your environment variables:
    ```
    DB=<your-mongodb-connection-string>
    PORT=<your-port>
    JWT_SECRET_KEY=<your-jwt-secret-key>
    JWT_EXPIRED_TIME=<your-jwt-expiration-time>
    NODE_ENV=<development-or-production>
    ```
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.
5. Use a tool like Postman to test the endpoints.