const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        platform: {
            type: String,
            required: true,
            trim: true
        },

        topic: {
            type: String,
            required: true,
            trim: true
        },

        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"]
        },

        status: {
            type: String,
            enum: ["Solved", "Unsolved"],
            default: "Unsolved"
        },

        notes: {
            type: String,
            default: ""
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;