import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getProblems,
    updateProblem
} from "../services/problemService";


function EditProblem() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [platform, setPlatform] =
        useState("LeetCode");

    const [topic, setTopic] = useState("");

    const [difficulty, setDifficulty] =
        useState("Easy");

    const [status, setStatus] =
        useState("Unsolved");

    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [message, setMessage] =
        useState("");


    useEffect(() => {
        fetchProblem();
    }, [id]);


    const fetchProblem = async () => {

        try {

            setLoading(true);

            const data =
                await getProblems();


            if (data.success) {

                const problem =
                    data.problems.find(
                        (item) =>
                            item._id === id
                    );


                if (!problem) {

                    setMessage(
                        "Problem not found"
                    );

                    return;

                }

                setTitle(
                    problem.title || ""
                );

                setPlatform(
                    problem.platform ||
                    "LeetCode"
                );

                setTopic(
                    problem.topic || ""
                );

                setDifficulty(
                    problem.difficulty ||
                    "Easy"
                );

                setStatus(
                    problem.status ||
                    "Unsolved"
                );

            } 
            else {

                setMessage(
                    data.message ||
                    "Failed to fetch problem"
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

        setSubmitting(true);

        setMessage(
            "Updating problem..."
        );


        try {

            const data =
                await updateProblem(
                    id,
                    {
                        title,
                        platform,
                        topic,
                        difficulty,
                        status
                    }
                );


            if (data.success) {

                setMessage(
                    "Problem updated successfully!"
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
                    "Failed to update problem"
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


    if (loading) {

        return (

            <div className="form-page">

                <div className="loading">

                    Loading problem...

                </div>

            </div>

        );

    }


    return (

        <div className="form-page">

            <div className="form-card">

                <div className="form-header">

                    <h1>
                        Edit Problem
                    </h1>

                    <p>
                        Update the details of your
                        DSA problem.
                    </p>

                </div>

                {message && (

                    <div className="form-message">

                        {message}

                    </div>

                )}

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Problem Title
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

                    <div className="form-group">

                        <label>
                            Platform
                        </label>

                        <input
                            type="text"
                            value={platform}
                            onChange={(e) =>
                                setPlatform(
                                    e.target.value
                                )
                            }
                            required
                            disabled={submitting}
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
                            disabled={submitting}
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
                            disabled={submitting}
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
                            disabled={submitting}
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
                                : "Update Problem"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProblem;