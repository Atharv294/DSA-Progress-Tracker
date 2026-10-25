const express = require("express");

const {
    createProblem,
    getProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getProblemStats
} = require("../controllers/problemController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createProblem);
router.get("/", protect, getProblems);
router.get("/stats", protect, getProblemStats);
router.get("/:id", protect, getProblemById);
router.put("/:id", protect, updateProblem);
router.delete("/:id", protect, deleteProblem);

module.exports = router;