import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Contextapi } from '../Contextapi';

function ForgotPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { themeMode } = useContext(Contextapi)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/forgotpassword`, { email });
      setMessage(res.data.message);
      setError(''); // Clear any previous errors
      alert('Password reset link has been sent successfully!'); // Alert user about success
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        setMessage(''); // Clear any previous success messages
      } else {
        setError('An error occurred. Please try again later.');
        setMessage(''); // Clear any previous success messages
      }
    }
  };

  return (
    <div className={`container d-flex justify-content-center align-items-center ${themeMode === "dark" ? 'bg-dark text-white ' : 'bg-light text-dark'}`} style={{ height: '70vh' }}>
      <div className={`card p-4 ${themeMode === "dark" ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ width: '30%',border:"2px solid white" }}>
        <h2 className="card-title text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        </form>
        {message && <p className="mt-3 text-center text-success">{message}</p>}
        {error && <p className="mt-3 text-center text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPage;
