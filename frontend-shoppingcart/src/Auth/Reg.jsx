import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Contextapi } from "../Contextapi";

function Reg() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { themeMode } = useContext(Contextapi);

  function handleform(e) {
    e.preventDefault();
    const data = { Username, Password, Email };

    if (!Username && !Password) {
      alert("Please Enter the User Complete Detail");
      return;
    } else if (!Password) {
      alert("Please Enter the User Password");
      return;
    } else if (!Username) {
      alert("Please Enter the User  Detail");
      return;
    }

    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/reg`, {
      // fetch('/api/auth/reg', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          console.log(data);
          setMessage(data.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section
      id="register"
      className={themeMode === "dark" ? "bg-dark text-white" : "bg-light text-dark"} 
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div
              className={`card ${themeMode === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`} 
              style={{
                borderRadius: "15px",
                boxShadow: themeMode === "dark"
                  ? "0 8px 30px rgba(255, 255, 255, 0.1)" 
                  : "0 8px 30px rgba(0, 0, 0, 0.2)", 
                padding: "2rem",
              }}
            >
              <div className="card-body">
                <h2
                  className="card-title mb-4 text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.8rem",
                    color: themeMode === "dark" ? "#ffc107" : "#007bff", 
                  }}
                >
                  Register
                </h2>
  
                <h6 className="text-center mb-3">{message}</h6>
  
                <form onSubmit={handleform}>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      style={{
                        borderRadius: "8px",
                        padding: "10px 15px",
                      }}
                    />
                  </div>
  
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      style={{
                        borderRadius: "8px",
                        padding: "10px 15px",
                      }}
                    />
                  </div>
  
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      style={{
                        borderRadius: "8px",
                        padding: "10px 15px",
                      }}
                    />
                  </div>
  
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg w-100"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
  
                <div className="text-center mt-4">
                  <p>
                    Already have an account?{" "}
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: themeMode === "dark" ? "#ffc107" : "#007bff", // Link color based on theme mode
                      }}
                    >
                      Back to Login
                    </Link>
                  </p>
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
