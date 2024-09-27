import { Link } from "react-router-dom";
import Left from "./Leftmenu";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Contextapi } from "../Contextapi";

function Adminproduct() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const { themeMode, loginname } = useContext(Contextapi);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      // .get("/api/admin/allproduct", {
        .get(`${import.meta.env.VITE_SERVER_URL}/api/admin/allproduct`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("data", res);
        setProducts(res.data.apiData);
      });
  }, [token]);

  const handleDeleteProduct = (id) => {
    axios
      // .delete(`/api/admin/delete/${id}`, {
      .delete(`${import.meta.env.VITE_SERVER_URL}/api/admin/delete/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setProducts(products.filter((product) => product._id !== id));
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const confirmDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      handleDeleteProduct(id);
    }
  };

  return (
    <>
      {loginname === "admin" ? (
        <section
          id="mid"
          className={`${themeMode === "dark" ? "dark-mode" : "light-mode"}`}
          style={{
            minHeight: "100vh",
            padding: "20px 0",
            backgroundColor: themeMode === "dark" ? "#181818" : "#f8f9fa",
          }}
        >
          <div className="container">
            <div className="row">
              <Left />
              <div className="col-md-9">
                <h2 className="text-center mb-4">Product Management</h2>
                <p>{message}</p>
                <Link to="/adminproductadd">
                  <button className="btn btn-primary form-control mb-3">
                    Add Product here
                  </button>
                </Link>
                {products.length ? (
                  <table
                    className={`table table-hover ${
                      themeMode === "dark"
                        ? "table-dark text-white"
                        : "table-light text-dark"
                    } mt-3`}
                  >
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Product Status</th>
                        <th>Product Image</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((result, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{result.name}</td>
                          <td>{result.desc}</td>
                          <td>{result.price}</td>
                          <td>{result.qty}</td>
                          <td>{result.status}</td>
                          <td>
                            <img
                              style={{ width: "65px" }}
                              src={`/productimages/${result.mainImg}`}
                              alt="Product"
                            />
                          </td>
                          <td>
                            <Link
                              to={`/productupdate/${result._id}`}
                              className="btn btn-warning text-white"
                              style={{ textDecoration: "none" }}
                            >
                              Update
                            </Link>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => confirmDelete(result._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center mt-3">
                    <h2>No Products Added</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading.....</p>
      )}
    </>
  );
}

export default Adminproduct;
