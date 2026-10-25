const API_URL = "http://localhost:5000/api";


export const getDashboardStats = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/progress/dashboard`,
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