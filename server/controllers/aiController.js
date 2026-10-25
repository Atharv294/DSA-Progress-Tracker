const {
    generateStudyRecommendation
} = require("../services/geminiService");


const getStudyRecommendation = async (req, res) => {

    try {
        const userId = req.userId;
        const Problem = require("../models/Problem");
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

        const difficulties = [
            "Easy",
            "Medium",
            "Hard"
        ];

        const difficultyStats = {};

        difficulties.forEach(difficulty => {
            const difficultyProblems =
                problems.filter(
                    problem =>
                        problem.difficulty === difficulty
                );

            const total =
                difficultyProblems.length;

            const solved =
                difficultyProblems.filter(
                    problem =>
                        problem.status === "Solved"
                ).length;

            difficultyStats[difficulty] = {
                total,
                solved,
                unsolved: total - solved
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


        const topics =
            Object.keys(topicStats).map(topic => {

                const stats =
                    topicStats[topic];

                const percentage =
                    stats.total === 0
                        ? 0
                        : Math.round(
                            (stats.solved /
                                stats.total) *
                            100
                        );

                return {
                    topic,
                    total: stats.total,
                    solved: stats.solved,
                    unsolved: stats.unsolved,
                    percentage
                };
            });

        const weakTopics =
            topics.filter(
                topic =>
                    topic.total >= 3 &&
                    topic.percentage < 50
            );


        const progressData = {
            totalProblems,
            solvedProblems,
            unsolvedProblems,
            solvingPercentage,
            difficulty:
                difficultyStats,
            topics,
            weakTopics
        };


        const recommendation =
            await generateStudyRecommendation(
                progressData
            );


        res.status(200).json({
            success: true,
            recommendation
        });


    } catch (error) {
        console.error(
            "AI Recommendation Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to generate AI recommendation"
        });
    }
};


module.exports = {
    getStudyRecommendation
};