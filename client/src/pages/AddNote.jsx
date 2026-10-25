import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createNote} from "../services/noteService";

function AddNote() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [topic, setTopic] = useState("");

    const [content, setContent] = useState("");

    const [message, setMessage] = useState("");

    const [submitting, setSubmitting] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setSubmitting(true);

        setMessage(
            "Creating note..."
        );


        try {

            const data = await createNote({
                title,
                topic,
                content
            });


            if (data.success) {

                setMessage(
                    "Note created successfully!"
                );


                setTimeout(() => {

                    navigate("/notes");

                }, 800);

            } else {

                setMessage(
                    data.message ||
                    "Failed to create note"
                );

            }

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to connect to server"
            );

        } finally {

            setSubmitting(false);

        }

    };


    return (

        <div className="form-page">

            <div className="form-card">

                <div className="form-header">

                    <h1>
                        Add Revision Note
                    </h1>

                    <p>
                        Save important concepts
                        for future revision.
                    </p>

                </div>

                {message && (

                    <div className="form-message">

                        {message}

                    </div>

                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Note Title
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Binary Search Pattern"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Topic
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Binary Search"
                            value={topic}
                            onChange={(e) =>
                                setTopic(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Note Content
                        </label>

                        <textarea
                            placeholder="Write your revision notes here..."
                            value={content}
                            onChange={(e) =>
                                setContent(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

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
                                ? "Saving..."
                                : "Save Note"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddNote;