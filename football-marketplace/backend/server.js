const express = require('express');
const cors = require('cors'); // Add this line
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('football_marketplace.db');

app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

// Database initialization code
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, team TEXT, value TEXT)");
});

// GET players endpoint
app.get('/players', (req, res) => {
    db.all("SELECT * FROM players", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// POST a new player
app.post('/players', (req, res) => {
    const { name, team, value } = req.body;
    db.run("INSERT INTO players (name, team, value) VALUES (?, ?, ?)", [name, team, value], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, name, team, value });
    });
});

// Update a player
app.put('/players/:id', (req, res) => {
    const playerId = parseInt(req.params.id);
    const { name, team, value } = req.body;

    db.run("UPDATE players SET name = ?, team = ?, value = ? WHERE id = ?", [name, team, value, playerId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Player not found' });
        } else {
            res.json({ id: playerId, name, team, value });
        }
    });
});

// Delete a player
app.delete('/players/:id', (req, res) => {
    const playerId = parseInt(req.params.id);

    db.run("DELETE FROM players WHERE id = ?", playerId, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ message: 'Player not found' });
        } else {
            res.status(204).send(); // No content
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
