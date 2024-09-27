import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "../Contextapi";
import axios from "axios";

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { setloginname, setToken, themeMode } = useContext(Contextapi);

  function handlelogin(e) {
    e.preventDefault();
    // console.log(Username, Password);

    if (!Username && !Password) {
      alert("Please Enter the Complete User Details");
    } else if (!Password) {
      alert("Please Enter the User Password");
    } else if (!Username) {
      alert("Please Enter the User Details");
    } else {
      try {
        const data = { Username, Password };
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/logincheck`, data)
        // axios
        //   .post("/api/auth/logincheck", data)
          .then((res) => {
            // console.log("data",res);
            const apiData = res.data.apiData;
            if (res.data.status === 201) {
              localStorage.setItem("loginname", apiData.record.username);
              setloginname(localStorage.getItem("loginname"));
              localStorage.setItem("token", apiData.token);
              setToken(localStorage.getItem("token"));

              if (apiData.record.username.toLowerCase() === "admin") {
                navigate("/dashboard");
              } else {
                navigate("/userproduct");
              }
            } else {
              setMessage(apiData.message);
            }
          })
          .catch((error) => {
            console.log("Error:", error.message);
          });
      } catch (error) {
        console.log("Error:", error.message);
      }
    }
  }

  return (
    <section
      id="login"
      className={
        themeMode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
      }
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div
              className={`card ${
                themeMode === "dark"
                  ? "bg-dark text-white"
                  : "bg-white text-dark"
              }`}
              style={{
                borderRadius: "15px",
                boxShadow:
                  themeMode === "dark"
                    ? "0 4px 20px rgba(255, 255, 255, 0.1)"
                    : "0 4px 20px rgba(0, 0, 0, 0.2)",
                padding: "2rem",
              }}
            >
              <div className="card-body">
                <h2
                  className={`card-title mb-4 text-center ${
                    themeMode === "dark" ? "text-light" : "text-dark"
                  }`}
                  style={{ fontWeight: "bold", fontSize: "1.8rem" }}
                >
                  Login
                </h2>

                {message && (
                  <div className="alert alert-danger text-center" role="alert">
                    {message}
                  </div>
                )}

                <form onSubmit={handlelogin}>
                  <div className="form-group mb-3">
                    <input
                      className="form-control form-control-lg"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Email or Username"
                      style={{
                        borderRadius: "8px",
                        padding: "10px 15px",
                      }}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      style={{
                        borderRadius: "8px",
                        padding: "10px 15px",
                      }}
                    />
                  </div>

                  <div className="mb-5">
                    <Link
                      to={"/forgotpasswordpage"}
                      style={{
                        float: "right",
                        textDecoration: "none",
                        color: themeMode === "dark" ? "#f8f9fa" : "#6c757d",
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      style={{ borderRadius: "8px", padding: "10px" }}
                    >
                      Login
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p>
                    Don’t have an account?{" "}
                    <Link
                      to="/reg"
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: themeMode === "dark" ? "#ffc107" : "#007bff",
                      }}
                    >
                      Sign up now!
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

export default Login;
