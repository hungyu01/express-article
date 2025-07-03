# Express Web API

A modern Web API project built with Express.js and MongoDB.

## Project Structure

```
express-web/
├── src/
│   ├── config/
│   │   └── database.js      # Database connection configuration
│   ├── routes/
│   │   ├── index.js         # Main routes
│   │   ├── api.js           # API routes
│   │   └── user.js          # User routes
│   ├── controllers/
│   │   ├── index.js         # Main controller
│   │   └── userController.js # User controller
│   ├── models/
│   │   ├── User.js          # User model
│   │   └── index.js         # Model index
│   ├── middleware/
│   │   ├── auth.js          # Authentication middleware
│   │   └── validation.js    # Validation middleware
│   ├── utils/
│   │   ├── jwt.js           # JWT utilities
│   │   └── totp.js          # TOTP utilities
│   └── app.js               # Main application file
├── .env                     # Environment variables (create manually)
├── .gitignore
└── package.json
```

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment variables file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

4. Start production server:
```bash
npm start
```

## API Endpoints

### Basic Endpoints
- `GET /` - Home page
- `GET /health` - Health check
- `GET /api` - API information

### User Management
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users` - Get user profile
- `PUT /api/users` - Update user profile
- `PUT /api/users/password` - Change password
- `DELETE /api/users` - Delete account

### TOTP Two-Factor Authentication
- `POST /api/users/totp` - Setup TOTP
- `POST /api/users/totp/verify` - Verify and enable TOTP
- `PUT /api/users/totp` - Disable TOTP

### Article Management (In Development)
- `GET /api/articles` - Articles endpoint

## Environment Variables

Create a `.env` file and set the following variables:

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/article-web
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=24h
```

## Features

- ✅ Modular architecture
- ✅ Environment variables support
- ✅ CORS configuration
- ✅ Error handling
- ✅ Health check endpoint
- ✅ MongoDB integration
- ✅ User authentication with JWT
- ✅ Password encryption with bcrypt
- ✅ TOTP two-factor authentication
- ✅ Input validation
- ✅ Account lockout protection
- ✅ Soft delete functionality
- ✅ Auto-restart in development mode

## Dependencies

### Core Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables

### Authentication & Security
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation

### TOTP & QR Code
- `speakeasy` - TOTP generation
- `qrcode` - QR code generation

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Code Style
- Use ES6+ features
- Follow RESTful API conventions
- Implement proper error handling
- Use async/await for database operations

## Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **TOTP 2FA**: Time-based one-time password for enhanced security
- **Account Lockout**: Protection against brute force attacks
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Cross-origin resource sharing configuration
- **Soft Delete**: Data preservation with logical deletion

## API Response Format

All API responses follow a consistent format:

```json
{
  "message": "Success message",
  "status": "success|error",
  "data": {
    // Response data
  },
  "errors": [
    // Validation errors (if any)
  ]
}
```

## Error Handling

The API implements comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **423 Locked**: Account temporarily locked
- **500 Internal Server Error**: Server-side errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
