import { useContext, useEffect, useState } from "react";
import { Contextapi } from "@/Contextapi.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { Categoryleft } from "./Categoryleft";
import Footerpage from "./Footerpage";

function Usersproduct() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const { isDarkMode } = useContext(Contextapi);

  useEffect(() => {
    axios
      // .get("/api/instockproducts")
      .get(`${import.meta.env.VITE_SERVER_URL}/api/instockproducts`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.apiData || []);
        } else {
          setMessage(response.data.message || "Failed to fetch products");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setMessage("There was an error fetching the products");
      });
  }, [setProducts]);

  const { cartitem, setcartitem } = useContext(Contextapi);

  function handleCart(e, product) {
    const updatedCart = { ...cartitem };
    const { _id } = product;

    if (!updatedCart.item) {
      updatedCart.item = {};
    }

    if (typeof updatedCart.totalItems === "undefined") {
      updatedCart.totalItems = 0;
    }

    if (updatedCart.item[_id]) {
      updatedCart.item[_id] += 1;
    } else {
      updatedCart.item[_id] = 1;
    }

    updatedCart.totalItems += 1;

    console.log(updatedCart);

    setcartitem(updatedCart);
  }

  function handleFilter(filteredData) {
    setProducts(filteredData);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="../productimages/demophoto.jpeg"
                    className="d-block w-100 img-fluid"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="../productimages/2demophoto.jpeg"
                    className="d-block w-100 img-fluid"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="../productimages/3demophoto.jpeg"
                    className="d-block w-100 img-fluid"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section id="product">
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}

        <div className="container mt-3">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <Categoryleft onFilter={handleFilter} />
            </div>
            <div className="col-md-9 col-sm-12">
              <div className="row">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4"
                  >
                    <div
                      className={`card h-100 ${
                        isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
                      }`}
                    >
                      <img
                        src={`../productimages/${item.img}`}
                        className="card-img-top img-fluid"
                        alt={item.name}
                      />
                      <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <h6
                          className={`card-title ${
                            isDarkMode ? "text-white" : "text-dark"
                          }`}
                        >
                          {item.name}
                        </h6>
                        <p className="card-text">{item.desc}</p>
                        <h5 className="card-text text-center">
                          {" "}
                          $ {item.price}
                        </h5>
                        <div className="mt-auto d-grid gap-2">
                          <button
                            className="btn btn-success"
                            onClick={(e) => handleCart(e, item)}
                          >
                            Add to Cart
                          </button>
                          <Link
                            to={`/productdetail/${item._id}`}
                            className="btn btn-primary mt-2"
                          >
                            More Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footerpage />
    </>
  );
}

export default Usersproduct;
