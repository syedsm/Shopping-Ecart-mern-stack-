import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Contextapi } from "@/Contextapi.jsx";
import Footerpage from "./Footerpage";

function ProductDetail() {
  const { isDarkMode, cartitem, setcartitem, loginname, buyitem, setbuyitem } =
    useContext(Contextapi);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      // .get(`/api/singleproductfetch/${id}`)
      .get(`${import.meta.env.VITE_SERVER_URL}/api/singleproductfetch/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  let _cart = { ...cartitem };
  function handlecart(e, product) {
    console.log("ID", product._id);

    if (!_cart.item) {
      _cart.item = {};
      console.log("First c", _cart);
    }
    if (!_cart.item[product._id]) {
      _cart.item[product._id] = 1;
      console.log("Second c", _cart);
    } else {
      _cart.item[product._id] += 1;
      console.log("Third c", _cart);
    }
    if (!_cart.totalItems) {
      _cart.totalItems = 1;
      console.log("4rth c", _cart);
    } else {
      _cart.totalItems += 1;
      console.log("5th c", _cart);
    }
    console.log("Final Vaue", _cart);
    setcartitem(_cart);
  }

  //   function handlecart(e,product) {
  //     console.log("ID",product._id)
  //     let _cart={...cartitem}
  //     // console.log(product)
  //     // if (!_cart.item) {
  //     //     _cart.item = {}
  //     // }
  //     if (!_cart.item[product._id]) {
  //         _cart.item[product._id] = 1
  //     } else {
  //         _cart.item[product._id] += 1
  //     } if (!_cart.totalItems) {
  //         _cart.totalItems = 1
  //     } else {
  //         _cart.totalItems += 1
  //     }
  //     console.log(_cart)
  //     setcartitem(_cart)
  // }
  let Naviagte = useNavigate();

  function handlebuy() {
    if (loginname) {
      let _buyitem = {};
      _buyitem.item = {
        [product._id]: 1,
      };

      console.log("Buyitem", _buyitem);

      setbuyitem(_buyitem);
      Naviagte("/buy");
    } else {
      Naviagte("/");
    }
  }

  return (
    <>
      <div id="productdetail" className="container mt-4">
        <div className="row">
          <div className="col-lg-5 mb-4">
            <div
              className={`card ${
                isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
              }`}
            >
              {loading ? (
                <p className="p-4">Loading...</p>
              ) : product ? (
                <img
                  src={`../productimages/${product.img}`}
                  alt={product.name}
                  className="card-img-top"
                />
              ) : (
                <p
                  className="card-text p-4"
                  style={{
                    borderRadius: "10px",
                    borderWidth: "2px",
                    paddingLeft: "15px",
                    borderColor: isDarkMode ? "text-white" : "text-dark",
                    borderStyle: "solid",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Product not found
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-7">
            {loading ? (
              <p>Loading...</p>
            ) : product ? (
              <div
                className={`card ${
                  isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
                }`}
              >
                <div
                  className="card-body"
                  style={{
                    borderColor: isDarkMode ? "text-white" : "text-dark",
                    border: "2px solid #dee2e6",
                  }}
                >
                  <h2 className="card-title">{product.name}</h2>
                  <p className="card-text mb-4">{product.desc}</p>
                  <h3 className="card-text mb-3">Price: ${product.price}</h3>
                  <button
                    className="btn btn-outline-primary me-3"
                    onClick={(e) => handlecart(e, product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={(e) => handlebuy(e)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ) : (
              <p>Product not found</p>
            )}
          </div>
        </div>
      </div>
      <Footerpage />
    </>
  );
}

export default ProductDetail;
