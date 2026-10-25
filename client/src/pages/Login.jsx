import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";;

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [message, setMessage] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage(
            "Logging in..."
        );

        try {

            const data =
                await loginUser({
                    email,
                    password
                });


            if (data.success) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                setMessage(
                    "Login successful!"
                );

                navigate(
                    "/dashboard"
                );

            }
            else {

                setMessage(
                    data.message ||
                    "Login failed"
                );

            }

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to connect to server"
            );

        }

    };


    return (

        <div className="auth-page">

            <div className="auth-container">

                <h1>
                    Login
                </h1>

                <p>
                    Welcome back! Continue your
                    DSA preparation.
                </p>

                {message && (

                    <div className="form-message">

                        {message}

                    </div>

                )}

                <form
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div>

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="auth-switch">

                    Don't have an account?

                    <button
                        type="button"
                        className="auth-link-button"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create Account
                    </button>

                </p>

            </div>

        </div>

    );
}

export default Login;