const express = require("express");

const {
    getStudyRecommendation
} = require("../controllers/aiController");

const protect =
    require("../middleware/authMiddleware");


const router = express.Router();


router.get(
    "/recommendation",
    protect,
    getStudyRecommendation
);


module.exports = router;