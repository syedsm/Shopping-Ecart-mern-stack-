import { useContext } from "react";
import { Contextapi } from "./Contextapi.jsx";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const {
    loginname,
    setloginname,
    cartitem,
    setcartitem,
    setToken,
    themeMode,
    toggleThemeMode,
  } = useContext(Contextapi);
  let navigate = useNavigate();

  function handleLogout() {
    setloginname(localStorage.removeItem("loginname"));
    localStorage.removeItem("cart");
    setcartitem("");
    setToken(localStorage.removeItem("token"));
    navigate("/");
  }

  return (
    <>
      <style>
        {`
          body {
            padding-top: 10%; 
          }

          #header .form-check-input {
            width: 50px;
            height: 25px;
            background-color: #ccc;
            border-radius: 25px;
            position: relative;
            transition: background-color 0.3s ease-in-out;
            -webkit-appearance: none;
            outline: none;
            cursor: pointer;
          }

          #header .form-check-input:checked {
            background-color: #0d6efd;
          }

          #header .form-check-input:before {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 21px;
            height: 21px;
            background-color: #fff;
            border-radius: 50%;
            transition: transform 0.3s ease-in-out;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          }

          #header .form-check-input:checked:before {
            transform: translateX(25px);
            box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.6);
          }

          #header .form-check-label {
            margin-left: 10px;
            font-weight: bold;
          }

          @media (max-width: 768px) {
            #header .row {
              text-align: center;
            }
            #header .col-md-2,
            #header .col-md-8,
            #header .col-md-10 {
              margin-bottom: 10px;
            }
            body {
              padding-top: 10%; 
            }
          }
        `}
      </style>
      <section
        id="header"
        className={`fixed-top ${
          themeMode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        style={{ borderBottom: "2px solid #dee2e6" }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-2 col-6">
              <Link to="/userproduct">
                <img
                  src="../logo.png"
                  className="img-fluid"
                  style={{ width: "150px" }}
                  alt="Logo"
                />
              </Link>
            </div>
            {loginname ? (
              <>
                <div className="col-md-2 col-6 text-center text-md-start">
                  <h5 style={{ margin: 0 }}>Welcome {loginname}</h5>
                </div>
                <div className="col-md-8 col-12 d-flex justify-content-md-end justify-content-center align-items-center mt-2 mt-md-0">
                  <div className="form-check form-switch me-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="themeSwitch"
                      checked={themeMode === "dark"}
                      onChange={toggleThemeMode}
                    />
                    <label className="form-check-label" htmlFor="themeSwitch">
                      <i
                        className={`bi ${
                          themeMode === "dark" ? "bi-moon-stars-fill" : "bi-sun-fill"
                        }`}
                      ></i>
                      {themeMode === "dark" ? " Dark Mode" : " Light Mode"}
                    </label>
                  </div>
                  <Link to="/userprofile" className="me-2">
                    <button className="btn btn-info">
                      <i className="bi bi-person-circle"></i> Profile
                    </button>
                  </Link>
                  <Link to="/userproduct" className="me-2">
                    <button className="btn btn-success">Products</button>
                  </Link>
                  <Link to="/cart" className="me-2">
                    <button className="btn btn-warning">
                      <i className="bi bi-cart-fill"></i> -{" "}
                      {cartitem.totalItems || 0}
                    </button>
                  </Link>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout <i className="bi bi-box-arrow-right"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="col-md-10 col-12 d-flex justify-content-md-end justify-content-center align-items-center mt-2 mt-md-0">
                <div className="form-check form-switch me-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="themeSwitch"
                    checked={themeMode === "dark"}
                    onChange={toggleThemeMode}
                  />
                  <label className="form-check-label" htmlFor="themeSwitch">
                    <i
                      className={`bi ${
                        themeMode === "dark" ? "bi-moon-stars-fill" : "bi-sun-fill"
                      }`}
                    ></i>
                    {themeMode === "dark" ? " Dark Mode" : " Light Mode"}
                  </label>
                </div>
                <Link to="/userproduct" className="me-2">
                  <button className="btn btn-success">Products</button>
                </Link>
                <Link to="/cart" className="me-2">
                  <button className="btn btn-warning">
                    Cart - {cartitem.totalItems || 0}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
