/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API for managing games
 *
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - name
 *         - mainStoryHours
 *         - completionistHours
 *         - platform
 *         - multiplayer
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the game
 *         name:
 *           type: string
 *           description: The name of the game
 *         mainStoryHours:
 *           type: number
 *           description: Main story playtime in hours
 *         completionistHours:
 *           type: number
 *           description: Time to complete everything
 *         platform:
 *           type: string
 *           description: Gaming platform (e.g., PC, PS5)
 *         multiplayer:
 *           type: boolean
 *           description: Multiplayer availability
 *       example:
 *         name: The Witcher 3
 *         mainStoryHours: 50
 *         completionistHours: 120
 *         platform: PC
 *         multiplayer: false
 */

const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Create a new game entry
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Invalid input
 */
router.post("/games", async (req, res) => {
  try {
    const game = new Game(req.body);
    const saved = await game.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get("/games", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     summary: Update a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Game ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 */
router.put("/games/:id", async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Game ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Game deleted
 *       404:
 *         description: Game not found
 */
router.delete("/games/:id", async (req, res) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
