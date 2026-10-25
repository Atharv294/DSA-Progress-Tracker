const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const noteRoutes = require("./routes/noteRoutes");
const progressRoutes = require("./routes/progressRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully"
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;