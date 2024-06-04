import { useContext, useEffect, useState } from "react";
import { Contextapi } from "../Contextapi";
import { Link } from "react-router-dom";

function Usersproduct() {
    const [products, setproducts] = useState([]);
    const [message, setmessage] = useState('');
    const { isDarkMode } = useContext(Contextapi);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/instockproducts`)
        // fetch('/api/instockproducts')
            .then((result) => result.json())
            .then((data) => {
                // console.log(data);
                if (data.status === 200) {
                    setproducts(data.apiData);
                } else {
                    setmessage(data.message);
                }
            });
    }, []);

    const { cart, setCart } = useContext(Contextapi);
    let _cart = { ...cart };

    function handlecart(e, product) {
        if (!_cart.item) {
            _cart.item = {};
        }
        if (!_cart.item[product._id]) {
            _cart.item[product._id] = 1;
        } else {
            _cart.item[product._id] += 1;
        }
        if (!_cart.totalItems) {
            _cart.totalItems = 1;
        } else {
            _cart.totalItems += 1;
        }
        setCart(_cart);
    }

    return (
        <>
            <section id="product">
                {message && <div className="alert alert-danger" role="alert">{message}</div>}
                <div className="container mt-3">
                    <div className="row justify-content-center">
                        {products.map((item) => (
                            <div key={item._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                                <div className={`card h-100 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                                    <img src={`../productimages/${item.img}`} className="card-img-top" alt={item.name} />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className={`card-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>{item.name}</h5>
                                        <p className="card-text">{item.desc}</p>
                                        <p className="card-text">${item.price}</p>
                                        <div className="mt-auto d-grid gap-2">
                                            <button className="btn btn-success" onClick={(e) => handlecart(e, item)}>Add to Cart</button>
                                            <Link to={`/productdetail/${item._id}`} className="btn btn-primary mt-2">More Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}

export default Usersproduct;
