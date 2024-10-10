import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware to serve static files from the current directory
app.use(express.static(path.resolve())); // Serve static files from the project folder

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Path to store user data
const usersFilePath = path.resolve('users.json');

// Function to read users from the JSON file
const readUsersFromFile = () => {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    }
    return []; // Return an empty array if the file doesn't exist
};

// Function to write users to the JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)); // Format the JSON nicely
};

// Function to generate a username
const usernameGenerator = (fullname) => {
    const trimmedFullname = fullname.trim();

    if (!trimmedFullname) {
        throw new Error('Fullname cannot be empty'); // Handle empty fullname
    }

    const firstName = trimmedFullname.split(' ')[0]; // Extract the first name
    const randomNumber = Math.floor(Math.random() * 9000) + 1000; // Range: 1000-9999

    return `${firstName}${randomNumber}`; // Combine first name and random number
};

// Signup route
app.post('/signup', (req, res) => {
    const { fullname, email, phone_number, password } = req.body;

    // Validate incoming data
    if (!fullname || !email || !phone_number || !password) {
        return res.status(400).json({ message: 'All fields are required' }); // Check for empty fields
    }

    let users = readUsersFromFile(); // Read existing users

    // Check if email already exists
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    // Generate the username
    let username = usernameGenerator(fullname); // Call the username generator
    console.log('Generated username:', username); // Log the generated username for debugging

    // Check for username uniqueness
    let usernameExists = users.some((user) => user.username === username);
    let attemptCount = 1; // To limit attempts for generating a unique username

    while (usernameExists && attemptCount < 10) { // Limit to 10 attempts to avoid infinite loop
        username = usernameGenerator(fullname);
        console.log('New generated username:', username); // Log new username attempts
        usernameExists = users.some((user) => user.username === username);
        attemptCount++;
    }

    if (usernameExists) {
        return res.status(400).json({ message: 'Could not generate a unique username. Please try again later.' });
    }

    // Store user data in the JSON file
    const newUser = { fullname, email, phone_number, password, username };
    console.log('New User Data:', newUser); // Log the new user data for debugging
    users.push(newUser); // Add new user to the users array
    writeUsersToFile(users); // Write updated user list to the file

    // Respond with success
    res.status(200).json({ message: 'Signup successful', username }); // Return success message with username
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); // Log server start message
});


