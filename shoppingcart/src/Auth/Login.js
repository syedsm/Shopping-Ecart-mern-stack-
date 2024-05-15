import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "../App";

function Login() {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { setloginname } = useContext(Contextapi)

    function handlelogin(e) {
        e.preventDefault()
        const data = { Username, Password }

        fetch('/api/logincheck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                localStorage.setItem('loginname', data.apiData.username)
                setloginname(localStorage.getItem('loginname'))
                navigate(data.apiData.username === 'Admin' ? '/dashboard' : '/userproduct')
            } else {
                setMessage(data.message)
            }
        })
    }

    return (
        <section id="login" style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-4 text-center">Login</h2>
                                {message && <div className="alert alert-danger" role="alert">{message}</div>}
                                <form onSubmit={handlelogin}>
                                    <div className="form-group">
                                        <label >Username</label>
                                        <input className="form-control" value={Username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
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
