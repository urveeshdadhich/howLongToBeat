const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

// Create a game
router.post("/games", async (req, res) => {
    try {
        const game = new Game(req.body);
        const saved = await game.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all games
router.get("/games", async (req, res) => {
    const games = await Game.find();
    res.json(games);
});

// Update a game
router.put("/games/:id", async (req, res) => {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Delete a game
router.delete("/games/:id", async (req, res) => {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: "Game deleted" });
});

module.exports = router;
