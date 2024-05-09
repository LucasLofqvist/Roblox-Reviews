import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import {FetchRouter} from '../components/FetchRouter';
import '../signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const currentYear = new Date().getFullYear();
        const minBirthYear = currentYear - 13; // No younger than 13
        const maxBirthYear = currentYear - 120; // No older than 120 years

        if (birthYear < maxBirthYear || birthYear > minBirthYear) {
            setError('Birth year must be valid. You must be at least 13 years old.');
            return;
        }

        if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 4) {
            setError('Password must be at least 4 characters long.');
            return;
        }

        try {
            const data = await FetchRouter('api/users', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username,
                    birthYear: parseInt(birthYear), 
                    email, 
                    password, 
                }),
            });
            
            if (data.success) {
                alert("Account created successfully!")
                navigate('/login'); // Redirect to login page after successful signup
            }
            //Handles duplicate index errors
            else if(data.error.startsWith("E11000")) {
                setError("This username already exists");
            }
            //Other errors are logged
            else {
                setError('Failed to create account');
                console.error(data.error);
            }
            } catch (err) {
                console.error(err);
            }
        };

    return (
        <div className="signup-container">
            <div className="signup-body">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Birth Year:
                    <input type="number" placeholder="YYYY" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" placeholder="xxx@xxx.com "value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
            </div>
        </div>
    );
    }

    export default Signup;
