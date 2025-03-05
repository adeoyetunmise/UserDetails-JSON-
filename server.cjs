// server.cjs
const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());

// Use default middlewares (e.g., logger, static, etc.)
server.use(middlewares);

// Use the router (db.json)
server.use(router);

// Start the server
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});