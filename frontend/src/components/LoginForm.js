import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";  // <-- added Navigate
import { useEffect } from 'react';

const LoginForm = () => {
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    // Check if user is already logged in when they try to visit the login page
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // If token exists, redirect to home page
            navigate('/home');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();



        const user = { email, password };

        const response = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // For handling cookies
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message || "An error occurred"); // Display error message from backend
        }

        if (response.ok) {
            localStorage.setItem('token', json.token);

            setEmail('');
            setPassword('');
            setError(null);
            console.log('User logged in', json);
            navigate('/home'); // Redirect after successful login
        }
    };


    if (localStorage.getItem('token')) {
        return <Navigate to="/home" />;
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3> {/* Changed to reflect login purpose */}

            {error && <div className="error">{error}</div>}    

            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}  
            />    

            <label>Password:</label>
            <input
                type="password"  
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button className="login-button">Login</button>
        </form>
    );
};

export default LoginForm;
