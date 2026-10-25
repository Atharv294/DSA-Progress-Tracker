const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        topic: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            default: null
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

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;