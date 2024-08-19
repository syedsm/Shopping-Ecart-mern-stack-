import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Cart() {
  const { cartitem, setcartitem, buyitem, setbuyitem, loginname, themeMode } =
    useContext(Contextapi);
  const [product, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  let totalAmount = 0;

  useEffect(() => {
    if (!cartitem || !cartitem.item) {
      console.warn("Cart items are not defined");
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}/api/cartproducts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Object.keys(cartitem.item) }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.apiData);
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching cart products:", error);
        setMessage("Failed to load cart products");
      });
  }, [cartitem.item, cartitem, buyitem]);

  function handleQuan(id) {
    return cartitem.item ? cartitem.item[id] : 0;
  }

  function handleIncrement(e, id, qty) {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }
    let currentQty = handleQuan(id);
    if (qty === currentQty) {
      alert("Product Reached Maximum limit");
      return;
    }
    let _cart = { ...cartitem };
    _cart.item[id] = currentQty + 1;
    _cart.totalItems += 1;
    setcartitem(_cart);
  }

  function handleDecrement(e, id) {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }
    let currentQty = handleQuan(id);
    if (currentQty === 1) {
      return;
    }
    let _cart = { ...cartitem };
    _cart.item[id] = currentQty - 1;
    _cart.totalItems -= 1;
    setcartitem(_cart);
  }

  function handlePrice(id, price) {
    let currentPrice = handleQuan(id) * price;
    totalAmount += currentPrice;
    return currentPrice;
  }

  function handleCheckout() {
    if (!loginname) {
      navigate("/");
      return;
    } else {
      localStorage.setItem("cart", "");
      setcartitem(JSON.parse(localStorage.getItem("cart") || "{}"));
      navigate("/userproduct");
    }
  }

  function handleDelete(e, id) {
    const handleconfrim = window.confirm("Are you sure to delete");
    if (handleconfrim) {
      if (!id) {
        console.error("Product ID is undefined");
        return;
      }
      let currentQty = handleQuan(id);
      const updatedItems = Object.fromEntries(
        Object.entries(cartitem.item).filter(([itemId]) => itemId !== id)
      );
      const updatedTotalItems = cartitem.totalItems - currentQty;
      const updatedCart = {
        ...cartitem,
        item: updatedItems,
        totalItems: updatedTotalItems,
      };
      setcartitem(updatedCart);
    } else {
      console.log("error delete product in cart");
    }
  }

  return (
    <>
      {message}
      {product.length ? (
        <div
          id="cart-container"
          className={`container mt-5 ${
            themeMode === "dark" ? "dark-mode" : "light-mode"
          }`}
        >
          <div className="row">
            <div id="cart-items" className="col-lg-8 col-md-12">
              <div
                className={`card mb-3 ${
                  themeMode === "dark"
                    ? "bg-dark text-white"
                    : "bg-light text-dark"
                }`}
              >
                <div className="card-header">
                  <h5>Items in Cart</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Product Name</th>
                          <th>Product Image</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.map((result, key) => (
                          <tr key={result._id}>
                            <td>{key + 1}</td>
                            <td>{result.name}</td>
                            <td>
                              <img
                                id={`product-img-${result._id}`}
                                className="img-fluid"
                                src={`/productimages/${result.img}`}
                                alt={result.name}
                                style={{ maxWidth: "50px" }}
                              />
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-sm btn-primary rounded-circle me-2"
                                  onClick={(e) =>
                                    handleIncrement(e, result._id, result.qty)
                                  }
                                >
                                  +
                                </button>
                                <span className="me-2">
                                  {handleQuan(result._id)}
                                </span>
                                <button
                                  className="btn btn-sm btn-primary rounded-circle"
                                  onClick={(e) =>
                                    handleDecrement(e, result._id)
                                  }
                                >
                                  -
                                </button>
                              </div>
                            </td>
                            <td>₹{handlePrice(result._id, result.price)}</td>
                            <td>
                              <button
                                onClick={(e) => handleDelete(e, result._id)}
                                className="btn btn-danger btn-sm"
                              >
                                <i className="bi bi-trash3"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div id="order-summary" className="col-lg-4 col-md-12">
              <div
                className={`card ${
                  themeMode === "dark"
                    ? "bg-dark text-white"
                    : "bg-light text-dark"
                }`}
              >
                <div className="card-header">
                  <h5>Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Subtotal
                      <span>₹{totalAmount}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Delivery Charges
                      <span>₹0</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Total Amount
                      <span>₹{totalAmount}</span>
                    </li>
                  </ul>
                  <button
                    className="btn btn-warning btn-block mt-3 w-100"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                  <div className="text-center mt-3">
                    <span className="badge bg-success">
                      Safe and Secure Payment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section id="emptycard">
          <div className="text-center">
            <img
              src="./empty-cart.png"
              className="img-fluid"
              alt="emptycart"
              style={{ width: "40%" }}
            />
            <h3>Your Cart is Empty</h3>
          </div>
        </section>
     
      )}
    </>
  );
}

export default Cart;
