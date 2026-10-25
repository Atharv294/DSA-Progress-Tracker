import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProblem } from "../services/problemService";


function AddProblem() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [platform, setPlatform] =
        useState("LeetCode");

    const [topic, setTopic] = useState("");

    const [difficulty, setDifficulty] =
        useState("Easy");

    const [status, setStatus] =
        useState("Unsolved");

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setMessage(
            "Adding problem..."
        );

        try {

            const data = await createProblem({
                title,
                platform,
                topic,
                difficulty,
                status
            });


            if (data.success) {

                setMessage(
                    "Problem added successfully!"
                );

                setTimeout(() => {

                    navigate(
                        "/problems"
                    );

                }, 800);

            } 
            else {

                setMessage(
                    data.message ||
                    "Failed to add problem"
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


    return (

        <div className="form-page">

            <div className="form-card">

                <div className="form-header">

                    <h1>
                        Add Problem
                    </h1>

                    <p>
                        Add a new problem to track
                        your DSA progress.
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
                            Problem Title
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Two Sum"
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
                            Platform
                        </label>

                        <input
                            type="text"
                            placeholder="Example: LeetCode"
                            value={platform}
                            onChange={(e) =>
                                setPlatform(
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

                        <select
                            value={topic}
                            onChange={(e) =>
                                setTopic(
                                    e.target.value
                                )
                            }
                            required
                            disabled={loading}
                        >

                            <option value="">
                                Select Topic
                            </option>

                            <option value="Arrays">
                                Arrays
                            </option>

                            <option value="Strings">
                                Strings
                            </option>

                            <option value="Stack">
                                Stack
                            </option>

                            <option value="Queue">
                                Queue
                            </option>

                            <option value="Linked List">
                                Linked List
                            </option>

                            <option value="Binary Search">
                                Binary Search
                            </option>

                            <option value="Trees">
                                Trees
                            </option>

                            <option value="Graphs">
                                Graphs
                            </option>

                            <option value="Dynamic Programming">
                                Dynamic Programming
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>
                            Difficulty
                        </label>

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(
                                    e.target.value
                                )
                            }
                            required
                            disabled={loading}
                        >

                            <option value="Easy">
                                Easy
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Hard">
                                Hard
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                            disabled={loading}
                        >

                            <option value="Unsolved">
                                Unsolved
                            </option>

                            <option value="Solved">
                                Solved
                            </option>

                        </select>

                    </div>

                    <div className="form-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate(
                                    "/problems"
                                )
                            }
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "Add Problem"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddProblem;