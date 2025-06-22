const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Game = require("../../models/Game");

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
  await Game.deleteMany();
});

describe("Database Integration", () => {
  it("should insert and retrieve a game from the database", async () => {
    const game = new Game({
      name: "Stardew Valley",
      mainStoryHours: 20,
      completionistHours: 80,
      platform: "PC",
      multiplayer: true
    });

    await game.save();

    const foundGame = await Game.findOne({ name: "Stardew Valley" });

    expect(foundGame).toBeDefined();
    expect(foundGame.name).toBe("Stardew Valley");
    expect(foundGame.multiplayer).toBe(true);
  });
});
