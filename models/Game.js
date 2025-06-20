const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: String,
    mainStoryHours: Number,
    completionistHours: Number,
    platform: String,
    multiplayer: Boolean
});

module.exports = mongoose.model("Game", gameSchema);
