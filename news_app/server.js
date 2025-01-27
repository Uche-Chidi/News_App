const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cors = require('cors');
// Enable CORS for all routes
server.use(cors());


app.prepare().then(() => {
  const server = express();

  // Serve static files from the 'public' directory
  server.use('/public', express.static('public'));

  // Handle all other routes with Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
