import { useState } from "react";
import { getAIRecommendation } from "../services/aiService";
import ProgressSummary from "../components/ProgressSummary";


function Dashboard() {

    const [aiRecommendation, setAIRecommendation] =
        useState("");

    const [aiLoading, setAILoading] =
        useState(false);

    const [aiError, setAIError] =
        useState("");

    const handleAIRecommendation = async () => {

        try {

            setAILoading(true);
            setAIError("");

            const data =
                await getAIRecommendation();


            if (data.success) {

                setAIRecommendation(
                    data.recommendation
                );

            } 
            else {

                setAIError(
                    data.message ||
                    "Unable to generate recommendation"
                );

            }

        } catch (error) {

            console.error(
                "AI Recommendation Error:",
                error
            );

            setAIError(
                error.message ||
                "Unable to connect to AI service"
            );

        } finally {

            setAILoading(false);

        }

    };


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>

                    <h1>
                        DSA Progress Tracker
                    </h1>

                    <p>
                        Track your DSA preparation
                        and improve your coding skills.
                    </p>

                </div>

            </div>

            <ProgressSummary />

            <div className="dashboard-section ai-section">

                <div className="section-header">

                    <div>

                        <h2>
                            🤖 AI Study Recommendation
                        </h2>

                        <p>
                            Get a personalized DSA study
                            plan based on your current
                            progress.
                        </p>

                    </div>

                </div>

                <div className="ai-action">

                    <button
                        className="primary-button"
                        onClick={handleAIRecommendation}
                        disabled={aiLoading}
                    >

                        {aiLoading
                            ? "Generating Recommendation..."
                            : "Generate AI Recommendation"
                        }

                    </button>

                </div>

                {aiError && (

                    <div className="error-message">

                        {aiError}

                    </div>

                )}

                {aiRecommendation && (

                    <div className="ai-recommendation">

                        <h3>
                            Your Personalized Recommendation
                        </h3>

                        <div className="ai-content">

                            {aiRecommendation}

                        </div>

                    </div>

                )}

            </div>

            <div className="dashboard-section">

                <h2>
                    Quick Actions
                </h2>

                <p>
                    Quickly access the main features
                    of your DSA tracker.
                </p>

                <div className="quick-actions">

                    <button
                        onClick={() =>
                            window.location.href =
                            "/problems/add"
                        }
                    >
                        + Add Problem
                    </button>

                    <button
                        onClick={() =>
                            window.location.href =
                            "/notes/add"
                        }
                    >
                        + Add Note
                    </button>

                    <button
                        onClick={() =>
                            window.location.href =
                            "/problems"
                        }
                    >
                        View Problems
                    </button>

                    <button
                        onClick={() =>
                            window.location.href =
                            "/notes"
                        }
                    >
                        View Notes
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;