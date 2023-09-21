// Server-side Node.js using Express and MySQL
const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

// MySQL database configuration
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: "root",                   // use mysql details k
    port:3306,
    database: "user"
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL!");
});

// Serve static files
app.use(express.static(__dirname));

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Fetch user from MySQL and update the 'updated_at' timestamp
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (results.length === 1) {
            // Update 'updated_at' timestamp
            const updateSql = `UPDATE users SET updated_at = NOW() WHERE id = ?`;
            connection.query(updateSql, [results[0].id], (updateErr, updateResults) => {
                if (updateErr) {
                    console.error("Error executing MySQL query:", updateErr);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }

                res.json({ message: "Login successful" });
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    });
});


// Register route
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Insert user into MySQL with the current timestamp
    const sql = `INSERT INTO users (username, password, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`;
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        res.json({ message: "Registration successful" });
    });
});

// Default route handler
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Start the server
const port =3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
