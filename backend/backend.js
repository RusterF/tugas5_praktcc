const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

// ✅ Create MySQL Connection
const db = mysql.createConnection({
    host: "34.142.236.208",
    user: "root",
    password: "",
    database: "notes_db",
});

// ✅ Handle MySQL Connection Errors
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit if database connection fails
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// ✅ Get all notes
app.get("/notes", (req, res) => {
    db.query("SELECT * FROM notes", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ✅ Add a new note
app.post("/notes", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and content are required" });

    db.query("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, title, content });
    });
});

// ✅ Edit a note
app.put("/notes/:id", (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    if (!title || !content) return res.status(400).json({ error: "Title and content are required" });

    db.query("UPDATE notes SET title = ?, content = ? WHERE id = ?", [title, content, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "✅ Note successfully updated" });
    });
});

// ✅ Delete a note
app.delete("/notes/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM notes WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "🗑️ Note successfully deleted" });
    });
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
