const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const generateStudyRecommendation = async (progressData) => {

    const prompt = `
You are an AI DSA study assistant.

Analyze the following student's DSA progress:

Total Problems: ${progressData.totalProblems}

Solved Problems: ${progressData.solvedProblems}

Unsolved Problems: ${progressData.unsolvedProblems}

Overall Solving Percentage: ${progressData.solvingPercentage}%

Difficulty Statistics:
${JSON.stringify(progressData.difficulty, null, 2)}

Topic Statistics:
${JSON.stringify(progressData.topics, null, 2)}

Weak Topics:
${JSON.stringify(progressData.weakTopics, null, 2)}

Based on this information:

1. Identify the student's strengths.
2. Identify the student's weak areas.
3. Recommend the most important DSA topics to study next.
4. Suggest how many problems they should practice.
5. Give a practical study plan for the next few days.

Keep the response concise and useful for a college student preparing for software engineering placements.

Do not invent statistics that are not present in the data.
`;


    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });


    return response.text;
};


module.exports = {
    generateStudyRecommendation
};