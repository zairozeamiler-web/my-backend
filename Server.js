const express = require('express'); // Import Express 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to My Updated Backend Server!');
});

// Contact API route
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validation: check if email contains '@'
    if (!email || !email.includes('@')) {
        return res.status(400).json({
            error: "Invalid email address"
        });
    }

    res.json({
        message: `Thank you ${name}, your message has been received!`,
        data: {
            name,
            email,
            message
        }
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