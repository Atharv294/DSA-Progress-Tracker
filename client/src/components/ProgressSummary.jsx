import { useEffect, useState } from "react";

import {
    getDashboardStats
} from "../services/progressService";


function ProgressSummary() {

    const [stats, setStats] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const fetchStats = async () => {

        try {
            setLoading(true);
            const data =
                await getDashboardStats();

            if (data.success) {
                setStats(data);
            } 
            else {
                setError(
                    data.message ||
                    "Failed to fetch dashboard statistics"
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
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <p>
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <p>
                    {error}
                </p>
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    const {
        overview,
        difficulty,
        topics,
        weakTopics
    } = stats;

    return (
        <div className="progress-dashboard">

            <div className="stats-grid">

                <div className="stat-card">

                    <h3>
                        Total Problems
                    </h3>

                    <p className="stat-number">
                        {overview.totalProblems}
                    </p>

                </div>

                <div className="stat-card">

                    <h3>
                        Solved
                    </h3>

                    <p className="stat-number">
                        {overview.solvedProblems}
                    </p>

                </div>

                <div className="stat-card">

                    <h3>
                        Unsolved
                    </h3>

                    <p className="stat-number">
                        {overview.unsolvedProblems}
                    </p>

                </div>

                <div className="stat-card">

                    <h3>
                        Completion
                    </h3>

                    <p className="stat-number">
                        {overview.solvingPercentage}%
                    </p>

                </div>

            </div>

            <div className="dashboard-section">

                <h2>
                    Overall Progress
                </h2>

                <div className="progress-container">

                    <div
                        className="progress-bar"
                        style={{
                            width:
                                `${overview.solvingPercentage}%`
                        }}
                    >
                    </div>

                </div>

                <p className="progress-text">
                    {overview.solvedProblems}
                    {" "}
                    of
                    {" "}
                    {overview.totalProblems}
                    {" "}
                    problems solved
                </p>

            </div>

            <div className="dashboard-section">

                <h2>
                    Difficulty Progress
                </h2>

                <div className="difficulty-grid">

                    <div className="difficulty-card">

                        <h3>
                            Easy
                        </h3>

                        <p>
                            {difficulty.Easy.solved}
                            {" / "}
                            {difficulty.Easy.total}
                            {" solved"}
                        </p>

                        <div className="progress-container">

                            <div
                                className="progress-bar"
                                style={{
                                    width:
                                        `${difficulty.Easy.percentage}%`
                                }}
                            >
                            </div>

                        </div>

                        <span>
                            {difficulty.Easy.percentage}%
                        </span>

                    </div>

                    <div className="difficulty-card">

                        <h3>
                            Medium
                        </h3>

                        <p>
                            {difficulty.Medium.solved}
                            {" / "}
                            {difficulty.Medium.total}
                            {" solved"}
                        </p>

                        <div className="progress-container">

                            <div
                                className="progress-bar"
                                style={{
                                    width:
                                        `${difficulty.Medium.percentage}%`
                                }}
                            >
                            </div>

                        </div>

                        <span>
                            {difficulty.Medium.percentage}%
                        </span>

                    </div>

                    <div className="difficulty-card">

                        <h3>
                            Hard
                        </h3>

                        <p>
                            {difficulty.Hard.solved}
                            {" / "}
                            {difficulty.Hard.total}
                            {" solved"}
                        </p>

                        <div className="progress-container">

                            <div
                                className="progress-bar"
                                style={{
                                    width:
                                        `${difficulty.Hard.percentage}%`
                                }}
                            >
                            </div>

                        </div>

                        <span>
                            {difficulty.Hard.percentage}%
                        </span>

                    </div>

                </div>

            </div>

            <div className="dashboard-section">

                <h2>
                    Topic Progress
                </h2>

                {topics.length === 0 ? (

                    <p>
                        No topic data available.
                    </p>

                ) : (

                    <div className="topic-list">
                        {topics.map((topic) => (

                            <div
                                className="topic-item"
                                key={topic.topic}
                            >

                                <div className="topic-header">

                                    <span>
                                        {topic.topic}
                                    </span>

                                    <span>
                                        {topic.percentage}%
                                    </span>

                                </div>

                                <div className="progress-container">

                                    <div
                                        className="progress-bar"
                                        style={{
                                            width:
                                                `${topic.percentage}%`
                                        }}
                                    >
                                    </div>

                                </div>

                                <p>
                                    {topic.solved}
                                    {" / "}
                                    {topic.total}
                                    {" solved"}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            <div className="dashboard-section">

                <h2>
                    Topics Needing Improvement
                </h2>

                {weakTopics.length === 0 ? (

                    <div className="success-message">

                        <p>
                            Great job! No weak topics detected.
                        </p>

                    </div>

                ) : (

                    <div className="weak-topics">

                        {weakTopics.map((topic) => (

                            <div
                                className="weak-topic-card"
                                key={topic.topic}
                            >

                                <div>

                                    <h3>
                                        {topic.topic}
                                    </h3>

                                    <p>
                                        {topic.solved}
                                        {" / "}
                                        {topic.total}
                                        {" solved"}
                                    </p>

                                </div>

                                <strong>
                                    {topic.percentage}%
                                </strong>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default ProgressSummary;