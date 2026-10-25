const bcrypt = require("bcrypt");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email and password"
            });
        }


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Registration Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error("Profile Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getProfile
};