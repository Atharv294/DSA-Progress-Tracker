import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getNotes,
    deleteNote
} from "../services/noteService";


function Notes() {

    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchQuery, setSearchQuery] =
        useState("");

    const fetchNotes = async () => {

        try {

            setLoading(true);

            const data = await getNotes();

            console.log(
                "Notes API Response:",
                data
            );


            if (data.success) {

                setNotes(
                    data.notes || []
                );

            } 
            else {

                setError(
                    data.message ||
                    "Failed to fetch notes"
                );

            }

        } catch (error) {

            console.error(error);

            setError(
                "Unable to connect to server"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (noteId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const data =
                await deleteNote(noteId);


            if (data.success) {

                setNotes(
                    notes.filter(
                        (note) =>
                            note._id !== noteId
                    )
                );

            }
            else {

                alert(
                    data.message ||
                    "Failed to delete note"
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to server"
            );

        }

    };

    const filteredNotes =
        notes.filter((note) => {

            const searchText =
                searchQuery.toLowerCase();


            return (

                note.title
                    .toLowerCase()
                    .includes(searchText)

                ||

                note.topic
                    .toLowerCase()
                    .includes(searchText)

                ||

                note.content
                    .toLowerCase()
                    .includes(searchText)

            );

        });

    if (loading) {

        return (

            <div className="page-container">

                <div className="loading">

                    Loading notes...

                </div>

            </div>

        );

    }

    if (error) {

        return (

            <div className="page-container">

                <div className="error-message">

                    {error}

                </div>

            </div>

        );

    }

    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>
                        Revision Notes
                    </h1>

                    <p>
                        Save and manage notes for
                        your DSA revision.
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/notes/add")
                    }
                >
                    + Add Note
                </button>

            </div>

            {notes.length > 0 && (

                <div className="filter-container">

                    <div className="filter-group search-group">

                        <label>
                            Search Notes
                        </label>

                        <input
                            type="text"
                            placeholder="Search by title, topic or content..."
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>

            )}

            {notes.length === 0 ? (

                <div className="empty-state">

                    <h2>
                        No Revision Notes Yet
                    </h2>

                    <p>
                        Start building your revision
                        notes for important DSA concepts.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() =>
                            navigate("/notes/add")
                        }
                    >
                        + Add Your First Note
                    </button>

                </div>

            ) : filteredNotes.length === 0 ? (

                <div className="empty-state">

                    <h2>
                        No Matching Notes
                    </h2>

                    <p>
                        No notes were found for
                        "{searchQuery}".
                    </p>

                    <button
                        className="secondary-button"
                        onClick={() =>
                            setSearchQuery("")
                        }
                    >
                        Clear Search
                    </button>

                </div>

            ) : (

                <div className="notes-grid">

                    {filteredNotes.map(
                        (note) => (

                            <div
                                className="note-card"
                                key={note._id}
                            >

                                <div className="note-card-header">

                                    <h2>
                                        {note.title}
                                    </h2>

                                    <span className="note-topic">

                                        {note.topic}

                                    </span>

                                </div>

                                <p className="note-content">

                                    {note.content}

                                </p>

                                <div className="note-actions">

                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            navigate(
                                                `/notes/edit/${note._id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(
                                                note._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

}

export default Notes;