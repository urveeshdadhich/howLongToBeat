// tests/unit/gameModel.test.js
const mongoose = require("mongoose");
const Game = require("../../models/Game");

// Use in-memory MongoDB (no mocking for now)
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Game.deleteMany(); // Clear DB after each test
});

describe("Game Model Unit Tests", () => {
  it("should create and save a game", async () => {
    const game = new Game({
      name: "The Witcher 3",
      mainStoryHours: 50,
      completionistHours: 100,
      platform: "PC",
      multiplayer: false
    });

    const savedGame = await game.save();
    expect(savedGame._id).toBeDefined();
    expect(savedGame.name).toBe("The Witcher 3");
  });

  it("should fail to save without required fields", async () => {
    const game = new Game({});
    try {
      await game.save();
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });
});
