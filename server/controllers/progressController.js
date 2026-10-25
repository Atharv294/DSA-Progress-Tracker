const Problem = require("../models/Problem");

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.userId;

        const problems = await Problem.find({
            user: userId
        });

        const totalProblems = problems.length;

        const solvedProblems = problems.filter(
            problem => problem.status === "Solved"
        ).length;

        const unsolvedProblems = problems.filter(
            problem => problem.status === "Unsolved"
        ).length;

        const solvingPercentage =
            totalProblems === 0
                ? 0
                : Math.round(
                    (solvedProblems / totalProblems) * 100
                );

        const difficulties = ["Easy", "Medium", "Hard"];

        const difficultyStats = {};

        difficulties.forEach(difficulty => {
            const difficultyProblems = problems.filter(
            problem => problem.difficulty === difficulty
            );

            const total = difficultyProblems.length;

            const solved = difficultyProblems.filter(
                problem => problem.status === "Solved"
            ).length;

            const percentage =
                total === 0
                    ? 0
                    : Math.round((solved / total) * 100);

            difficultyStats[difficulty] = {
                total,
                solved,
                unsolved: total - solved,
                percentage
            };
        });


        const topicStats = {};

        problems.forEach(problem => {
            const topic = problem.topic;

            if (!topicStats[topic]) {
                topicStats[topic] = {
                    total: 0,
                    solved: 0,
                    unsolved: 0
                };
            }

            topicStats[topic].total++;

            if (problem.status === "Solved") {
                topicStats[topic].solved++;
            } else {
                topicStats[topic].unsolved++;
            }
        });

        const topics = Object.keys(topicStats).map(topic => {
            const stats = topicStats[topic];

            const percentage =
                stats.total === 0
                    ? 0
                    : Math.round(
                        (stats.solved / stats.total) * 100
                    );

            return {
                topic,
                total: stats.total,
                solved: stats.solved,
                unsolved: stats.unsolved,
                percentage
            };
        });

        topics.sort(
            (a, b) => a.percentage - b.percentage
        );
        
        const weakTopics = topics.filter(
            topic =>
                topic.total >= 3 &&
                topic.percentage < 50
        );


        res.status(200).json({
            success: true,

            overview: {
                totalProblems,
                solvedProblems,
                unsolvedProblems,
                solvingPercentage
            },

            difficulty: difficultyStats,

            topics,

            weakTopics
        });


    } catch (error) {
        console.error(
            "Dashboard Stats Error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    getDashboardStats
};