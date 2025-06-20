// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

// Routes
const gameRoutes = require("./routes/gameRoutes");
app.use("/api", gameRoutes);

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
