const express = require("express");

const {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createNote);

router.get("/", protect, getNotes);

router.get("/:id", protect, getNoteById);

router.patch("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);

module.exports = router;