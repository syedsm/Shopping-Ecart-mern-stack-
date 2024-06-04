import React, { useContext } from "react";
import { Contextapi } from "./Contextapi";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const { loginname, setloginname, setCart, cart, setToken, themeMode, toggleThemeMode } = useContext(Contextapi);
    let navigate = useNavigate();

    function handleLogout(e) {
        setloginname(localStorage.removeItem('loginname'));
        localStorage.removeItem('cart');
        setCart('');
        setToken(localStorage.removeItem('token'));
        navigate('/');
    }

    return (
        <section id="header" className={`py-3 ${themeMode === "dark" ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ borderBottom: '2px solid #dee2e6' }}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-2 col-6">
                        <img src="../logo.png" className="img-fluid" alt="Logo" />
                    </div>
                    {loginname ? (
                        <>
                            <div className="col-md-2 col-6 text-center text-md-start">
                                <h5>Welcome {loginname}</h5>
                            </div>
                            <div className="col-md-8 col-12 d-flex justify-content-md-end justify-content-center align-items-center mt-2 mt-md-0">
                                <div className="form-check form-switch me-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="themeSwitch"
                                        checked={themeMode}
                                        onChange={toggleThemeMode}
                                    />
                                    <label className="form-check-label" htmlFor="themeSwitch">
                                        {themeMode === "dark" ? 'Dark Mode' : 'Light Mode'}
                                    </label>
                                </div>
                                <Link to='/userprofile' className="me-2">
                                    <button className="btn btn-info">
                                        <i className="bi bi-person-circle"></i> Profile
                                    </button>
                                </Link>
                                <Link to='/userproduct' className="me-2">
                                    <button className="btn btn-success">Products</button>
                                </Link>
                                <Link to='/cart' className="me-2">
                                    <button className="btn btn-warning">
                                        <i className="bi bi-cart-fill"></i> - {cart.totalItems || 0}
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
                                    checked={themeMode}
                                    onChange={toggleThemeMode}
                                />
                                <label className="form-check-label" htmlFor="themeSwitch">
                                    {themeMode === "dark" ? 'Dark Mode' : 'Light Mode'}
                                </label>
                            </div>
                            <Link to='/userproduct' className="me-2">
                                <button className="btn btn-success">Products</button>
                            </Link>
                            <Link to='/cart' className="me-2">
                                <button className="btn btn-warning">Cart - {cart.totalItems || 0}</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
}

export default Header;
