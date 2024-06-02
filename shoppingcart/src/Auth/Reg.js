import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Contextapi } from "../Contextapi";

function Reg() {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const { themeMode } = useContext(Contextapi)

    function handleform(e) {
        e.preventDefault()
        const data = { Username, Password, Email }

        if (!Username && !Password) {
            alert("Please Enter the User Complete Detail")
            return
        } else if (!Password) {
            alert("Please Enter the User Password")
            return
        } else if (!Username) {
            alert("Please Enter the User  Detail")
            return
        }
    try {
    fetch('https://backend-livid-five-40.vercel.app/api/reg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then((result) => { return result.json() }).then((data) => {
        console.log(data);
        setMessage(data.message);
    });
} catch (error) {
    console.log(error.message);
}

    }

    return (
        <section id="register" style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className={`card  ${themeMode === "dark" ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ borderRadius: '10px', borderWidth: '2px', borderColor: themeMode === "dark" ? '#f8f9fa' : '', borderStyle: 'solid', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
                            <div className="card-body">
                                <h2 className="card-title mb-4 text-center">Register</h2>
                                <h6 className="text-center mb-3">{message}</h6>
                                <form onSubmit={handleform}>
                                    <div className="form-group ">

                                        <input type="text" id="username" className="form-control" value={Username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                    </div>
                                    <div className="form-group mt-3 ">

                                        <input type="text" id="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    </div>
                                    <div className="form-group  mt-3">

                                        <input type="password" id="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    </div>
                                    <div className="text-center mt-3 ">
                                        <button type="submit" className="btn btn-primary btn-block mt-4 form-control">Create Account</button>

                                    </div>
                                </form>
                                <div className="text-center mt-3 form-control">
                                    <Link to="/" style={{ textDecoration: "none" }}>Back to Login</Link>
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
