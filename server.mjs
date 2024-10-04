import http from 'http';
import { promises as fs } from 'fs'; // Using promises to handle asynchronous file reading

const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer(async (req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    try {
      // Read the index.html file from the current directory
      const data = await fs.readFile('./index.html', 'utf-8');
      
      // Serve the HTML file with the appropriate headers
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
      
    } catch (err) {
      // Handle file not found or other errors
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error loading index.html');
    }
  } else {
    // Handle other routes with a 404 response
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found');
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

