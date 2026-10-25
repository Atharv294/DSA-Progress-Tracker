const Problem = require("../models/Problem");

const createProblem = async (req, res) => {
    try {
        const {
            title,
            platform,
            problemLink,
            topic,
            difficulty,
            status,
            notes
        } = req.body;

        if (!title || !platform || !topic || !difficulty) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, platform, topic and difficulty"
            });
        }

        const problem = await Problem.create({
            title,
            platform,
            problemLink,
            topic,
            difficulty,
            status,
            notes,
            user: req.userId
        });

        res.status(201).json({
            success: true,
            message: "Problem created successfully",
            problem
        });

    } catch (error) {
        console.error("Create Problem Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getProblems = async (req, res) => {
    try {
        const {
            topic,
            difficulty,
            status,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const query = {
            user: req.userId
        };

        if (topic) {
            query.topic = topic;
        }

        if (difficulty) {
            query.difficulty = difficulty;
        }

        if (status) {
            query.status = status;
        }

        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;

        const totalProblems = await Problem.countDocuments(query);

        const problems = await Problem.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        const totalPages = Math.ceil(totalProblems / limitNumber);

        res.status(200).json({
            success: true,

            count: problems.length,

            totalProblems,

            currentPage: pageNumber,

            totalPages,

            problems
        });

    } catch (error) {
        console.error("Get Problems Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        res.status(200).json({
            success: true,
            problem
        });

    } catch (error) {
        console.error("Get Problem Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const updateProblem = async (req, res) => {
    try {
        const problem = await Problem.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        const {
            title,
            platform,
            problemLink,
            topic,
            difficulty,
            status,
            notes
        } = req.body;

        problem.title = title ?? problem.title;
        problem.platform = platform ?? problem.platform;
        problem.problemLink = problemLink ?? problem.problemLink;
        problem.topic = topic ?? problem.topic;
        problem.difficulty = difficulty ?? problem.difficulty;
        problem.status = status ?? problem.status;
        problem.notes = notes ?? problem.notes;

        await problem.save();

        res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem
        });

    } catch (error) {
        console.error("Update Problem Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Problem deleted successfully"
        });

    } catch (error) {
        console.error("Delete Problem Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getProblemStats = async (req, res) => {
    try {
        const total = await Problem.countDocuments({
            user: req.userId
        });

        const solved = await Problem.countDocuments({
            user: req.userId,
            status: "Solved"
        });

        const unsolved = await Problem.countDocuments({
            user: req.userId,
            status: "Unsolved"
        });

        const easy = await Problem.countDocuments({
            user: req.userId,
            difficulty: "Easy"
        });

        const medium = await Problem.countDocuments({
            user: req.userId,
            difficulty: "Medium"
        });

        const hard = await Problem.countDocuments({
            user: req.userId,
            difficulty: "Hard"
        });

        const solvingPercentage =
            total === 0
                ? 0
                : Math.round((solved / total) * 100);

        res.status(200).json({
            success: true,
            stats: {
                total,
                solved,
                unsolved,
                solvingPercentage,
                difficulty: {
                    easy,
                    medium,
                    hard
                }
            }
        });

    } catch (error) {
        console.error("Get Problem Stats Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createProblem,
    getProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getProblemStats
};