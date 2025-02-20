import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./signup.css";

export const SignupPage = () => {
    const [formData, setFormData] = useState({
        role: "admin",
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { name, email, phone, password, role } = formData;

        if (!name || !email || !phone || !password) {
            setError("All fields are required");
            return;
        }

        if (phone.length !== 10) {
            setError("Phone number must be 10 digits");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/register", formData);
            setSuccess(response.data.message);
            console.log(formData)
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label>Role:</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                </select>

                <button type="submit">Sign Up</button>

                <p className="login-text">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};
