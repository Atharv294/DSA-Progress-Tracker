function ProblemCard({
    problem,
    onDelete,
    onEdit
}) {

    return (

        <div className="problem-card">

            <div className="problem-card-header">

                <h2>
                    {problem.title}
                </h2>

                <span
                    className={`difficulty ${problem.difficulty.toLowerCase()}`}
                >
                    {problem.difficulty}
                </span>

            </div>

            <div className="problem-details">

                <p>
                    <strong>Platform:</strong>
                    {" "}
                    {problem.platform}
                </p>

                <p>
                    <strong>Topic:</strong>
                    {" "}
                    {problem.topic}
                </p>

                <p>
                    <strong>Status:</strong>
                    {" "}
                    {problem.status}
                </p>

            </div>

            <div className="problem-actions">

                <button
                    className="edit-button"
                    onClick={() =>
                        onEdit(problem._id)
                    }
                >
                    Edit
                </button>

                <button
                    className="delete-button"
                    onClick={() =>
                        onDelete(problem._id)
                    }
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default ProblemCard;