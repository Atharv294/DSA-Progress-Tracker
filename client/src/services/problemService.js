const API_URL = "http://localhost:5000/api";


export const getProblems = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/problems`,
        {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return data;
};


export const createProblem = async (problemData) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/problems`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(problemData)
        }
    );

    const data = await response.json();

    return data;
};


export const deleteProblem = async (problemId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/problems/${problemId}`,
        {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return data;
};


export const updateProblem = async (problemId, problemData) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/api/problems/${problemId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(problemData)
        }
    );

    const data = await response.json();

    return data;
};