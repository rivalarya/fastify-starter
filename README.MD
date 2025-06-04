# Fastify TypeScript API Boilerplate

A modern, robust boilerplate for building RESTful APIs with Fastify and TypeScript.

## Features

- **Fastify Framework** - High performance web framework
- **TypeScript** - Type safety for your project
- **Structured Project** - Domain-driven directory organization
- **Auto Route Registration** - Automatically map and register domain routes
- **Request Validation** - Schema-based validation via Fastify's built-in validator
- **Middleware Support** - CORS and Rate Limiting built-in
- **Error Handling** - Standardized error handling with custom error classes
- **Testing** - Jest and Supertest for API testing
- **Dev Experience** - Hot reloading with Nodemon
- **Production Ready** - Configuration for development and production environments

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory:
   ```
   PORT=4000
   ENABLE_CORS=false
   ALLOWED_ORIGIN=https://example.com
   NODE_ENV=development
   ```

2. Create a `config.json` file in the root directory with the same structure as `config.example.json`.

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm start
```

#### Testing
```bash
npm test
```

#### Linting
```bash
npm run lint-fix
```

## Project Structure

```
├── src/
│   ├── config/          # Configuration files
│   ├── domains/         # Domain-driven modules
│   │   ├── ping/        # Example domain
│   │   │   ├── handler.ts
│   │   │   ├── routes.ts
│   │   │   └── routesSchema.ts
│   ├── exceptions/      # Custom error classes
│   ├── middlewares/     # Fastify middlewares
│   ├── utils/           # Utility functions
│   └── main.ts          # Application entry point
├── tests/               # Test files
├── logs/                # Application logs
├── .env                 # Environment variables
└── config.json          # Application configuration
```

## Adding New Routes

1. Create a new domain folder in `src/domains/`
2. Create the following files:
   - `handler.ts` - Request handlers
   - `routes.ts` - Route definitions
   - `routesSchema.ts` - Validation schemas (optional)
3. The routes will be automatically registered by the route mapper

## Error Handling

The application includes a set of custom error classes:

- `ClientError` - Base class for all client errors
- `AuthenticationError` - 401 Unauthorized
- `AuthorizationError` - 403 Forbidden
- `InvariantError` - 400 Bad Request
- `NotFoundError` - 404 Not Found

Example usage:

```typescript
import NotFoundError from '../../exceptions/NotFoundError';

if (!user) {
  throw new NotFoundError('User not found');
}
```

## Security Features

### CORS
CORS is configured in `src/middlewares/CORS.ts`. Set `ENABLE_CORS=true` in your `.env` file to enable it.

### Rate Limiting
Rate limiting is implemented to protect against abuse. Default configuration limits each IP to 10 requests per 10 seconds.

## Testing

The project includes example tests for:
- Basic routes (ping)
- CORS functionality
- Rate limiting

Run tests with:
```bash
npm test
```

## License

This project is licensed under the MIT License.

## TODO:

- [ ] Should manually add labels `auto-merge` and `dependecies` to repo for auto-merge dependabot can successfully run. Make it automatic.