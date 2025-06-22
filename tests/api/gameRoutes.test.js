const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const gameRoutes = require("../../routes/gameRoutes");

const app = express();
app.use(express.json());
app.use("/api", gameRoutes);

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
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

describe("Game API Routes", () => {
  it("should create a new game", async () => {
    const res = await request(app).post("/api/games").send({
      name: "Hollow Knight",
      mainStoryHours: 30,
      completionistHours: 60,
      platform: "PC",
      multiplayer: false
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Hollow Knight");
  });

  it("should fetch all games", async () => {
    // First add one
    await request(app).post("/api/games").send({
      name: "Celeste",
      mainStoryHours: 8,
      completionistHours: 20,
      platform: "PC",
      multiplayer: false
    });

    // Now get
    const res = await request(app).get("/api/games");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Celeste");
  });
});
