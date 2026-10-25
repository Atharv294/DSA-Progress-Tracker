import { useEffect, useState } from "react";

import {
useNavigate,
useParams
} from "react-router-dom";

import {
getNoteById,
updateNote
} from "../services/noteService";

function EditNote() {
    
const navigate = useNavigate();

const { id } = useParams();


const [title, setTitle] =
    useState("");

const [topic, setTopic] =
    useState("");

const [content, setContent] =
    useState("");

const [message, setMessage] =
    useState("");

// Loading while fetching the note
const [loading, setLoading] =
    useState(true);

// Loading while updating the note
const [submitting, setSubmitting] =
    useState(false);


useEffect(() => {

    fetchNote();

}, [id]);


const fetchNote = async () => {

    try {

        setLoading(true);

        const data =
            await getNoteById(id);


        if (data.success) {

            const note =
                data.note;

            setTitle(
                note.title || ""
            );

            setTopic(
                note.topic || ""
            );

            setContent(
                note.content || ""
            );

        } else {

            setMessage(
                data.message ||
                "Failed to fetch note"
            );

        }

    } catch (error) {

        console.error(error);

        setMessage(
            "Unable to connect to server"
        );

    } finally {

        setLoading(false);

    }

};


const handleSubmit = async (e) => {

    e.preventDefault();

    // Start submit loading
    setSubmitting(true);

    setMessage(
        "Updating note..."
    );


    try {

        const data =
            await updateNote(
                id,
                {
                    title,
                    topic,
                    content
                }
            );


        if (data.success) {

            setMessage(
                "Note updated successfully!"
            );


            setTimeout(() => {

                navigate("/notes");

            }, 800);

        } else {

            setMessage(
                data.message ||
                "Failed to update note"
            );

        }

    } catch (error) {

        console.error(error);

        setMessage(
            "Unable to connect to server"
        );

    } finally {

        // Stop submit loading
        setSubmitting(false);

    }

};


if (loading) {

    return (

        <div className="form-page">

            <div className="loading">

                Loading note...

            </div>

        </div>

    );

}


return (

    <div className="form-page">

        <div className="form-card">


            {/* FORM HEADER */}

            <div className="form-header">

                <h1>
                    Edit Revision Note
                </h1>

                <p>
                    Update your revision notes
                    and keep them organized.
                </p>

            </div>


            {/* MESSAGE */}

            {message && (

                <div className="form-message">

                    {message}

                </div>

            )}


            {/* FORM */}

            <form
                onSubmit={handleSubmit}
            >


                {/* NOTE TITLE */}

                <div className="form-group">

                    <label>
                        Note Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                        required
                        disabled={submitting}
                    />

                </div>


                {/* TOPIC */}

                <div className="form-group">

                    <label>
                        Topic
                    </label>

                    <input
                        type="text"
                        value={topic}
                        onChange={(e) =>
                            setTopic(
                                e.target.value
                            )
                        }
                        required
                        disabled={submitting}
                    />

                </div>


                {/* CONTENT */}

                <div className="form-group">

                    <label>
                        Note Content
                    </label>

                    <textarea
                        value={content}
                        onChange={(e) =>
                            setContent(
                                e.target.value
                            )
                        }
                        required
                        disabled={submitting}
                    />

                </div>


                {/* ACTION BUTTONS */}

                <div className="form-actions">


                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                            navigate("/notes")
                        }
                        disabled={submitting}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="primary-button"
                        disabled={submitting}
                    >

                        {submitting
                            ? "Updating..."
                            : "Update Note"
                        }

                    </button>


                </div>


            </form>


        </div>

    </div>

);

}


export default EditNote;
