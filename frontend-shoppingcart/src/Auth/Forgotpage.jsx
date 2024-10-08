import  { useContext, useState } from 'react';
import axios from 'axios';
import { Contextapi } from '@/Contextapi';

function ForgotPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { themeMode } = useContext(Contextapi)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('/api/auth/forgotpassword', { email });
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/forgotpassword`, { email });
      // const res = await axios.post('/api/forgotpassword', { email });
      setMessage(res.data.message);
      setError(''); 
      alert('Password reset link has been sent successfully!'); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        setMessage(''); 
      } else {
        setError('An error occurred. Please try again later.');
        setMessage(''); 
      }
    }
  };

  return (
    <section id="Forgotpage">
    <div
      className={`container d-flex justify-content-center align-items-center ${
        themeMode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
      }`}
      style={{ height: "70vh", padding: "15px" }}
    >
      <div
        className={`card p-4 ${
          themeMode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        style={{
          width: "100%",
          maxWidth: "400px", /* Ensures a max width */
          border: "2px solid white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", /* Adds shadow for better visibility */
        }}
      >
        <h2 className="card-title text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              style={{ fontSize: "16px", padding: "10px" }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ padding: "10px" }}>
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-3 text-center text-success">{message}</p>}
        {error && <p className="mt-3 text-center text-danger">{error}</p>}
      </div>
    </div>
  </section>
  

  );
}

export default ForgotPage;
