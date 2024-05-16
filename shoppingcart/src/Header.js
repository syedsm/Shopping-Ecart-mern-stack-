import { useContext } from "react";
import { Contextapi } from "./App";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const { loginname, setloginname, setCart, cart } = useContext(Contextapi);
    let navigate = useNavigate();

    function handlelogout(e) {
        setloginname(localStorage.removeItem('loginname'));
        localStorage.removeItem('cart');
        setCart('');
        navigate('/');
    }

    return (
        <header className="sticky-top">
            <section id="header" className="bg-light py-3">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-2">
                            <img src="../cartlogo.png" style={{ width: "100px" }} alt="..." />
                        </div>
                        {loginname ?
                            <>
                                <div className="col-md-6" ><h2 style={{ color: "black" }}>Welcome {loginname}</h2></div>
                                <div className="col-md-4 d-flex justify-content-end align-items-center">
                                    <Link to='/userproduct'><button className="btn btn-success me-2">Products</button></Link>
                                    <Link to='/cart'><button className="btn btn-warning me-2">Cart - {cart.totalItems || 0}</button></Link>
                                     <button className="btn btn-danger" onClick={(e) => { handlelogout(e) }} >Logout   <i class="bi bi-box-arrow-right"></i></button>
                                </div>
                            </>
                            :
                            <>
                                <div className="col-md-10 d-flex justify-content-end align-items-center">

                                    <Link to='/userproduct'><button className="btn btn-success me-2">Products</button></Link>
                                    <Link to='/cart'><button className="btn btn-warning me-2">Cart - {cart.totalItems || 0}</button></Link>

                                </div>
                            </>
                        }
                    </div>
                </div>
            </section>
        </header>
    );
}

export default Header;
