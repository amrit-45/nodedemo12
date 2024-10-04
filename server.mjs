import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv'; // For loading environment variables

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Serve the login HTML page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html')); // Serve index.html file
});

// Temporary in-memory storage for user submissions
const submittedUsers = [];

// Login Route (POST)
app.post('/login', (req, res) => {
  const { username, rollNumber } = req.body;

  // Log the submitted information
  console.log(`Username: ${username}, Roll Number: ${rollNumber}`);

  // Store the user information in memory
  submittedUsers.push({ username, rollNumber });

  // Return a success response
  res.status(200).json({ message: 'Submission successful' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

