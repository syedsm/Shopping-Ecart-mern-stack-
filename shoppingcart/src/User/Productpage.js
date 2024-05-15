// import { useContext, useEffect, useState } from "react";
// // import Productstr from "./productstr";
// import { Contextapi } from "../App";
// import { Link } from "react-router-dom";

// function Usersproduct() {
//     const [products, setproducts] = useState([])
//     const [message, setmessage] = useState('')

//     useEffect(() => {
//         fetch('/api/instockproducts', {

//         }).then((result) => { return result.json() }).then((data) => {
//             // console.log(data)  
//             if (data.status === 200) {
//                 setproducts(data.apiData)
//             } else {
//                 setmessage(data.message)
//             }
//         })
//     }, [])

//     //ignore this line
//     /*
//         { {products.map((products) => (
    
//                     <Productstr key={products._id} product={products} />
//                 ))} }
//     */


//     const { cart, setCart } = useContext(Contextapi)
//     let _cart = { ...cart }

//     function handlecart(e, product) {
//         // console.log(product._id)
//         // console.log(product)
//         if (!_cart.item) {
//             _cart.item = {}
//         } if (!_cart.item[product._id]) {
//             _cart.item[product._id] = 1
//         } else {
//             _cart.item[product._id] += 1
//         } if (!_cart.totalItems) {
//             _cart.totalItems = 1
//         } else {
//             _cart.totalItems += 1
//         }
//         setCart(_cart)
//         // console.log(cart)
//     }
//     return (
//         <>
//             <section id="product">
//                 {message}
//                 <div className="container mt-3 ">
//                     <div className="row justify-content-center">
//                         {products.map((item) => (
//                             <div key={item._id} className="col-md-3">
//                                 <div className="card" style={{ width: "18rem" }} >
//                                     <img src={`../productimages/${item.img}`} className="card-img-top" style={{ width: '100%' }} alt="..." />
//                                     <div className="card-body">
//                                         <h5 className="card-title">Product Name: {item.name}</h5>
//                                         <p className="card-text">Product Detail :{item.desc}</p>
//                                         <p className="card-text">Product Price :{item.price}</p>
//                                         <Link to="" className="btn btn-success" onClick={(e) => handlecart(e, item)}>Add Cart </Link>
//                                         <Link to="" className="btn btn-primary" style={{ marginLeft: '20px' }} >More Details</Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Usersproduct;




import { useContext, useEffect, useState } from "react";
import { Contextapi } from "../App";
import { Link } from "react-router-dom";

function Usersproduct() {
    const [products, setproducts] = useState([]);
    const [message, setmessage] = useState('');

    useEffect(() => {
        fetch('/api/instockproducts', {}).then((result) => result.json()).then((data) => {
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
                            <div key={item._id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img src={`../productimages/${item.img}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.desc}</p>
                                        <p className="card-text">${item.price}</p>
                                        <div className="d-grid gap-2">
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
