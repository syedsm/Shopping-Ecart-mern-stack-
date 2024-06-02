import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "../Contextapi";

function Login() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { setloginname, setToken, themeMode } = useContext(Contextapi);

    function handlelogin(e) {
        e.preventDefault();
        if (!Username && !Password) {
            alert("Please Enter the User Complete Detail");
        } else if (!Password) {
            alert("Please Enter the User Password");
        } else if (!Username) {
            alert("Please Enter the User Detail");
        } else {
            try {
                const data = { Username, Password };
                fetch('backend-livid-five-40.vercel.app/api/logincheck', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then((result) => result.json()).then((data) => {
                    if (data.status === 201) {
                        localStorage.setItem('loginname', data.apiData.record.username);
                        setloginname(localStorage.getItem('loginname'));
                        setToken(localStorage.setItem('token', data.apiData.token));
                        if (data.apiData.record.username.toLowerCase() === "admin") {
                            navigate('/dashboard');
                        } else {
                            navigate('/userproduct');
                        }
                    } else {
                        setMessage(data.message);
                    }
                });
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <section id="login" style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={`container ${themeMode === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className={`card ${themeMode === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ borderRadius: '10px', borderWidth: '2px', borderColor: themeMode === 'dark' ? '#f8f9fa' : '', borderStyle: 'solid', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
                            <div className="card-body">
                                <h2 className={`card-title mb-4 text-center ${themeMode === 'dark' ? 'text-white' : 'text-dark'}`}>Login</h2>
                                {message && <div className="alert alert-danger" role="alert">{message}</div>}
                                <form onSubmit={handlelogin}>
                                    <div className="form-group">
                                        <input className="form-control" value={Username} onChange={(e) => setUsername(e.target.value)} placeholder="Email or Username" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input className="form-control" type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    </div>
                                    <h5 className="mt-3">
                                        <Link to={'/forgotpasswordpage'} style={{ textDecoration: "none", color: themeMode === 'dark' ? '#f8f9fa' : 'grey' }}>Forgot Password</Link>
                                    </h5>
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-primary btn-block mt-4 form-control">Login</button>
                                    </div>
                                </form>
                                <div className="text-center mt-3 form-control">
                                    <Link to="/reg" style={{ textDecoration: "none" }}>Create New Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
