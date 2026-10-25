const API_URL = "http://localhost:5000/api";


// ========================================
// GET ALL NOTES
// ========================================

export const getNotes = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/notes`,
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


// ========================================
// GET SINGLE NOTE BY ID
// ========================================

export const getNoteById = async (noteId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/notes/${noteId}`,
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


// ========================================
// CREATE NOTE
// ========================================

export const createNote = async (noteData) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/notes`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(noteData)
        }
    );

    const data = await response.json();

    return data;
};


// ========================================
// UPDATE NOTE
// ========================================

export const updateNote = async (
    noteId,
    noteData
) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/notes/${noteId}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",

                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(noteData)
        }
    );

    const data = await response.json();

    return data;
};


// ========================================
// DELETE NOTE
// ========================================

export const deleteNote = async (noteId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/notes/${noteId}`,
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