const express = require('express'); // Import Express
const app = express();              // Create an Express app
const PORT = 3000;                  // Set the server port
const mysql = require('mysql2');    // Import MySQL

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'amiler',
    database: 'my_database'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database!");
});

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to My Backend Server!');
});

// Contact API route
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validation: check if email contains '@'
    if (!email.includes('@')) {
        return res.status(400).json({
            error: "Invalid email address"
        });
    }

    // Insert contact into database
    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) throw err;

        res.json({
            message: `Thank you ${name}, your message has been saved!`,
            data: {
                id: result.insertId,
                name,
                email,
                message
            }
        });
    });
});

// User API route
app.get('/api/user', (req, res) => {
    res.json({
        name: "Zairoze",
        email: "zairozeamiler@gmail.com"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});