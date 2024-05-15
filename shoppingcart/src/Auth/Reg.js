import { useState } from "react";
import { Link } from "react-router-dom";

function Reg() {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function handleform(e) {
        e.preventDefault()
        const data = { Username, Password }

        fetch('/api/reg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((result) => { return result.json() }).then((data) => {
            setMessage(data.message)
        })
    }

    return (
        <section id="register" style={{ height:'80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-4 text-center">Register</h2>
                                <h6 className="text-center mb-3">{message}</h6>
                                <form onSubmit={handleform}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" id="username" className="form-control" value={Username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="text-center mt-3 ">
                                        <button type="submit" className="btn btn-primary btn-block mt-4 form-control">Create Account</button>

                                    </div>
                                </form>
                                <div className="text-center mt-3 form-control">
                                    <Link to="/" style={{textDecoration:"none"}}>Back to Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reg;
