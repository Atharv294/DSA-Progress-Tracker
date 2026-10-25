import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getProblems, deleteProblem} from "../services/problemService";
import ProblemCard from "../components/ProblemCard";


function Problems() {

    const navigate = useNavigate();

    const [problems, setProblems] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [topicFilter, setTopicFilter] =
        useState("All");

    const [
        difficultyFilter,
        setDifficultyFilter
    ] = useState("All");

    const [searchQuery, setSearchQuery] =
        useState("");

    const [sortOption, setSortOption] =
        useState("default");


    useEffect(() => {
        fetchProblems();
    }, []);


    const fetchProblems = async () => {

        try {
            setLoading(true);
            const data =
                await getProblems();

            console.log(
                "Problems API Response:",
                data
            );


            if (data.success) {
                setProblems(
                    data.problems || []
                );
            } 
            else {
                setError(
                    data.message ||
                    "Failed to fetch problems"
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


    const handleDelete = async (
        problemId
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this problem?"
            );

        if (!confirmed) {
            return;
        }

        try {
            const data =
                await deleteProblem(
                    problemId
                );

            if (data.success) {
                setProblems(
                    problems.filter(
                        (problem) =>
                            problem._id !==
                            problemId
                    )
                );
            } 
            else {
                alert(
                    data.message ||
                    "Failed to delete problem"
                );
            }

        } catch (error) {
            console.error(error);
            alert(
                "Unable to connect to server"
            );
        }
    };


    const filteredProblems =
        problems.filter(
            (problem) => {
                const searchMatch =
                    problem.title
                        .toLowerCase()
                        .includes(
                            searchQuery
                                .toLowerCase()
                        );

                const topicMatch =
                    topicFilter === "All" ||
                    problem.topic ===
                    topicFilter;

                const difficultyMatch =
                    difficultyFilter ===
                        "All" ||

                    problem.difficulty ===
                    difficultyFilter;

                return (
                    searchMatch &&
                    topicMatch &&
                    difficultyMatch
                );
            }
        );


    const sortedProblems =
        [...filteredProblems].sort(
            (a, b) => {
                if (
                    sortOption ===
                    "title-asc"
                ) {
                    return a.title.localeCompare(
                        b.title
                    );
                }

                if (
                    sortOption ===
                    "title-desc"
                ) {
                    return b.title.localeCompare(
                        a.title
                    );
                }
                return 0;
            }
        );

    const handleEdit = (
        problemId
    ) => {
        navigate(
            `/problems/edit/${problemId}`
        );
    };


    if (loading) {
        return (

            <div className="page-container">

                <div className="loading">

                    Loading problems...

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
                        DSA Problems
                    </h1>

                    <p>
                        Track and manage your
                        DSA practice problems.
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate(
                            "/problems/add"
                        )
                    }
                >

                    + Add Problem

                </button>

            </div>

            <div className="filter-container">

                <div className="filter-group search-group">

                    <label>
                        Search Problem
                    </label>

                    <input
                        type="text"
                        placeholder="Search by problem title..."
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="filter-group">

                    <label>
                        Topic
                    </label>

                    <select
                        value={topicFilter}
                        onChange={(e) =>
                            setTopicFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Topics
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

                <div className="filter-group">

                    <label>
                        Difficulty
                    </label>

                    <select
                        value={difficultyFilter}
                        onChange={(e) =>
                            setDifficultyFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Difficulties
                        </option>

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

                <div className="filter-group">

                    <label>
                        Sort By
                    </label>

                    <select
                        value={sortOption}
                        onChange={(e) =>
                            setSortOption(
                                e.target.value
                            )
                        }
                    >

                        <option value="default">
                            Default
                        </option>

                        <option value="title-asc">
                            Title A-Z
                        </option>

                        <option value="title-desc">
                            Title Z-A
                        </option>

                    </select>

                </div>


            </div>

            {problems.length === 0 ? (

                <div className="empty-state">

                    <h2>
                        No Problems Yet
                    </h2>

                    <p>
                        Start tracking your DSA journey
                        by adding your first problem.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() =>
                            navigate(
                                "/problems/add"
                            )
                        }
                    >

                        + Add Your First Problem

                    </button>

                </div>


            ) : filteredProblems.length === 0 ? (

                <div className="empty-state">

                    <h2>
                        No Matching Problems
                    </h2>

                    <p>
                        Try changing your search
                        or filters.
                    </p>

                </div>


            ) : (

                <div className="problems-grid">

                    {sortedProblems.map(
                        (problem) => (

                            <ProblemCard
                                key={problem._id}
                                problem={problem}
                                onDelete={
                                    handleDelete
                                }
                                onEdit={
                                    handleEdit
                                }
                            />

                        )
                    )}

                </div>

            )}


        </div>

    );

}

export default Problems;