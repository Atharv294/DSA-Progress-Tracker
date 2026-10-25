const Note = require("../models/Note");
const Problem = require("../models/Problem");

const createNote = async (req, res) => {
    try {
        const {
            title,
            topic,
            content,
            problem
        } = req.body;

        if (!title || !topic || !content) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, topic and content"
            });
        }

        // If a problem ID is provided, verify that it exists
        if (problem) {
            const existingProblem = await Problem.findOne({
                _id: problem,
                user: req.userId
            });

            if (!existingProblem) {
                return res.status(404).json({
                    success: false,
                    message: "Problem not found"
                });
            }
        }

        const note = await Note.create({
            title,
            topic,
            content,
            problem: problem || null,
            user: req.userId
        });

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note
        });

    } catch (error) {
        console.error("Create Note Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getNotes = async (req, res) => {
    try {
        const {
            topic,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const query = {
            user: req.userId
        };

        // Topic filter
        if (topic) {
            query.topic = topic;
        }

        // Search by title
        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;

        const totalNotes = await Note.countDocuments(query);

        const notes = await Note.find(query)
            .populate("problem", "title topic difficulty")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        const totalPages = Math.ceil(
            totalNotes / limitNumber
        );

        res.status(200).json({
            success: true,
            count: notes.length,
            totalNotes,
            currentPage: pageNumber,
            totalPages,
            notes
        });

    } catch (error) {
        console.error("Get Notes Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.userId
        }).populate(
            "problem",
            "title topic difficulty"
        );

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            note
        });

    } catch (error) {
        console.error("Get Note Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const updateNote = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        const {
            title,
            topic,
            content,
            problem
        } = req.body;

        // If a new problem is provided,
        // verify that it belongs to the user
        if (problem) {
            const existingProblem = await Problem.findOne({
                _id: problem,
                user: req.userId
            });

            if (!existingProblem) {
                return res.status(404).json({
                    success: false,
                    message: "Problem not found"
                });
            }

            note.problem = problem;
        }

        if (title !== undefined) {
            note.title = title;
        }

        if (topic !== undefined) {
            note.topic = topic;
        }

        if (content !== undefined) {
            note.content = content;
        }

        await note.save();

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note
        });

    } catch (error) {
        console.error("Update Note Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });

    } catch (error) {
        console.error("Delete Note Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Note deleted successfully"
        });
    }
};


module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
};