
# README

This is a simple Node.js server for a MongoDB project.

## Packages

- cors - for Cross-Origin Resource Sharing
- morgan - for logging requests to the server
- express - for creating the server
- dotenv - for setting up environment variables
- mongoose - for connecting to the database
- nodemon - for restarting the server on file changes (for development purposes only)

### Installation

For a quick setup, you can run:

**Quick Setup:**

```sh
npm i
```

or

```sh
npm install
```

This will install all dependencies as listed in the package.json.

**Recommended Setup:**

For a more controlled environment, it's advisable to install the latest versions of the packages manually:

```sh
npm i cors morgan express dotenv mongoose
```

or

```sh
npm install cors morgan express dotenv mongoose
```

## Scripts

- `npm start` - to start the server for production
- `node index.js` - to start the server for production
- `npm run dev` - to start the server for development
- `nodemon index.js` - to start the server for development

## .env.example

This file provides a reference for setting up the environment variables:

- `PORT` - port number for the server
- `MONGODB_URI` - MongoDB connection string
- `ALLOWED_ORIGINS` - comma-separated list of allowed origins for CORS (e.g., `http://localhost:3000,http://localhost:3001`)

## .gitignore.example

This file provides a reference for ignoring files and directories from git (if you are using git).
