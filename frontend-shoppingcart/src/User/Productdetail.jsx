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
  const [currentMainImg, setCurrentMainImg] = useState("");

  useEffect(() => {
    axios
      // .get(`/api/user/singleproductfetch/${id}`)
      .get(
        `${import.meta.env.VITE_SERVER_URL}/api/user/singleproductfetch/${id}`
      )
      .then((response) => {
        setProduct(response.data);
        setCurrentMainImg(response.data.mainImg);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  let _cart = { ...cartitem };
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

    setcartitem(_cart);
  }

  let navigate = useNavigate();

  function handlebuy() {
    if (loginname) {
      let _buyitem = {};
      _buyitem.item = {
        [product._id]: 1,
      };
      setbuyitem(_buyitem);
      navigate("/buy");
    } else {
      navigate("/");
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
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              {loading ? (
                <p className="p-4">Loading...</p>
              ) : product ? (
                <>
                  <img
                    src={`../productimages/${currentMainImg}`}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                      objectFit: "cover",
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                  <div className="d-flex flex-wrap mt-2 justify-content-center">
                    {product.additionalImgs &&
                      product.additionalImgs.map((img, index) => (
                        <img
                          key={index}
                          src={`../productimages/${img}`}
                          alt={`Additional ${index + 1}`}
                          className="img-thumbnail"
                          onClick={() => setCurrentMainImg(img)}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            marginRight: "10px",
                            marginBottom: "10px",
                            cursor: "pointer",
                            transition: "transform 0.2s ease",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.1)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                          }}
                        />
                      ))}
                  </div>
                </>
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
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
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
                    onClick={handlebuy}
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
