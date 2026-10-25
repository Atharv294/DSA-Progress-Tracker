import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (

        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/dashboard")}
            >
                DSA Tracker
            </div>

            <div className="navbar-links">
                <button
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/problems")}
                >
                    Problems
                </button>

                <button
                    onClick={() => navigate("/notes")}
                >
                    Notes
                </button>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
    
}

export default Navbar;