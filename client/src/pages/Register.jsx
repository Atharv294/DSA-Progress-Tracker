import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {

const navigate = useNavigate();

const [name, setName] = useState("");

const [email, setEmail] = useState("");

const [password, setPassword] =
    useState("");

const [message, setMessage] =
    useState("");


const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage(
        "Creating account..."
    );

    try {

        const data = await registerUser({
            name,
            email,
            password
        });


        if (data.success) {

            setMessage(
                "Registration successful!"
            );

            setTimeout(() => {

                navigate("/login");

            }, 800);

        } else {

            setMessage(
                data.message ||
                "Registration failed"
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
                Create Account
            </h1>

            <p>
                Start tracking your DSA progress.
            </p>


            {message && (

                <div className="form-message">

                    {message}

                </div>

            )}


            <form
                onSubmit={handleSubmit}
            >

                <label>
                    Name
                </label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    required
                />


                <label>
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    required
                />


                <label>
                    Password
                </label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    required
                />


                <button
                    type="submit"
                >
                    Register
                </button>

            </form>


            <p>

                Already have an account?

                {" "}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Login
                </button>

            </p>

        </div>

    </div>

);

}


export default Register;
