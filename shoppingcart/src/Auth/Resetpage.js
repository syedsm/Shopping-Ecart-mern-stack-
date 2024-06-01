import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Contextapi } from '../Contextapi';

function ResetPasswordPage() {
    const { email } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { themeMode } = useContext(Contextapi)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setMessage('');
            return;
        }

        try {
            const res = await axios.post('/api/resetpassword', { email, password });
            setMessage(res.data.message);
            setError('');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred. Please try again later.');
            }
            setMessage('');
        }
    };

    return (
        <div className="container  d-flex justify-content-center align-items-center"  style={{ height: '70vh' }} >
            <div className={`card p-4 ${themeMode === "dark" ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ width: '30%', border: "2px solid white" }}>
                <h2 className={`card-title text-center ${themeMode === "dark" ? 'bg-dark text-white' : 'bg-light text-dark'}`}>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                            placeholder="New Password"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="form-control"
                            placeholder="Confirm New Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                    <h5 className="mt-3">
                        <Link to="/" style={{ textDecoration: 'none', color: 'gray' }}>Back to Login</Link>
                    </h5>
                </form>
                {message && <p className="mt-3 text-center text-success">{message}</p>}
                {error && <p className="mt-3 text-center text-danger">{error}</p>}
            </div>
        </div>
    );
}

export default ResetPasswordPage;
