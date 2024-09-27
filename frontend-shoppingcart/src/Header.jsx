import { useContext } from "react";
import { Contextapi } from "./Contextapi.jsx";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

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
      <section
        id="header"
        className={`fixed-top shadow-sm py-2 ${
          themeMode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        style={{ borderBottom: "2px solid #dee2e6" }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-2 col-6 d-flex justify-content-start">
              <Link to="/userproduct">
                <img
                  src="../assest/logo.png"
                  className="img-fluid"
                  style={{ width: "150px" }}
                  alt="Logo"
                />
              </Link>
            </div>

            {loginname ? (
              <>
                <div className="col-md-2 col-6 d-flex justify-content-center justify-content-md-start">
                  <h5 className="fw-bold m-0">Welcome, {loginname}</h5>
                </div>
                <div className="col-md-8 col-12 d-flex justify-content-end align-items-center mt-2 mt-md-0">
                  <div className="d-flex align-items-center me-3">
                    <div className="theme-switch-wrapper d-flex align-items-center">
                      <label className="theme-switch me-2">
                        <input
                          type="checkbox"
                          checked={themeMode === "dark"}
                          onChange={toggleThemeMode}
                        />
                        <span className="slider round"></span>
                      </label>
                      <i
                        className={`bi bi-moon-stars-fill ${
                          themeMode === "dark" ? "text-warning" : "text-muted"
                        }`}
                        style={{
                          fontSize: "1.2rem",
                          display: themeMode === "dark" ? "block" : "none",
                        }}
                      ></i>
                      <i
                        className={`bi bi-sun-fill ${
                          themeMode === "light" ? "text-warning" : "text-muted"
                        }`}
                        style={{
                          fontSize: "1.2rem",
                          display: themeMode === "light" ? "block" : "none",
                        }}
                      ></i>
                    </div>
                  </div>
                  <Link to="/userprofile" className="me-2">
                    <button className="btn btn-info btn-sm d-flex align-items-center">
                      <i className="bi bi-person-circle me-1"></i> Profile
                    </button>
                  </Link>
                  <Link to="/userproduct" className="me-2">
                    <button className="btn btn-success btn-sm d-flex align-items-center">
                      <i className="bi bi-box-seam me-1"></i> Products
                    </button>
                  </Link>
                  <Link to="/cart" className="me-2">
                    <button className="btn btn-warning btn-sm position-relative d-flex align-items-center">
                      <i className="bi bi-cart-fill me-1"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartitem.totalItems || 0}
                      </span>
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    Logout <i className="bi bi-box-arrow-right ms-1"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="col-md-10 col-12 d-flex justify-content-end align-items-center mt-2 mt-md-0">
                <div className="d-flex align-items-center me-3">
                  <div className="theme-switch-wrapper d-flex align-items-center">
                    <label className="theme-switch me-2">
                      <input
                        type="checkbox"
                        checked={themeMode === "dark"}
                        onChange={toggleThemeMode}
                      />
                      <span className="slider round"></span>
                    </label>
                    <i
                      className={`bi bi-moon-stars-fill ${
                        themeMode === "dark" ? "text-warning" : "text-muted"
                      }`}
                      style={{
                        fontSize: "1.2rem",
                        display: themeMode === "dark" ? "block" : "none",
                      }}
                    ></i>
                    <i
                      className={`bi bi-sun-fill ${
                        themeMode === "light" ? "text-warning" : "text-muted"
                      }`}
                      style={{
                        fontSize: "1.2rem",
                        display: themeMode === "light" ? "block" : "none",
                      }}
                    ></i>
                  </div>
                </div>
                <Link to="/userproduct" className="me-2">
                  <button className="btn btn-success btn-sm d-flex align-items-center">
                    <i className="bi bi-box-seam me-1"></i> Products
                  </button>
                </Link>
                <Link to="/cart" className="me-2">
                  <button className="btn btn-warning btn-sm position-relative d-flex align-items-center">
                    <i className="bi bi-cart-fill me-1"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartitem.totalItems || 0}
                    </span>
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
