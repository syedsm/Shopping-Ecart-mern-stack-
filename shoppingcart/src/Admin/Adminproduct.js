import { Link } from "react-router-dom";
import Left from "./Leftmenu";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Contextapi } from "../Contextapi";

function Adminproduct() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const { themeMode } = useContext(Contextapi);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/allproduct`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setProducts(res.data.apiData);
            });
    }, [token]);

    const handleDeleteProduct = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
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
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            handleDeleteProduct(id);
        }
    };

    return (
        <section id="mid" className={`${themeMode === "dark" ? "dark-mode" : "light-mode"}`}>
            <div className="container">
                <div className="row">
                    <Left />
                    <div className="col-md-9">
                        <h2 className="text-center">Product Management</h2>
                        <p>{message}</p>
                        <Link to='/adminproductadd'>
                            <button className="btn btn-primary form-control">Add Product here</button>
                        </Link>
                        {!products.length?
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Product Name</th>
                                    <th>Product Description</th>
                                    <th>Product Price</th>
                                    <th>Product Quantity</th>
                                    <th>Product Status</th>
                                    <th>Product Image</th>
                                    <th>Action</th>
                                    <th>Action</th>
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
                                        <td><img style={{ width: "65px" }} src={`/productimages/${result.img}`} alt="error" /></td>
                                        <td>
                                            <button className="btn btn-warning">
                                                <Link style={{ textDecoration: "none", color: "white" }} to={`/productupdate/${result._id}`}>Update</Link>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => confirmDelete(result._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <>
                        <h2>No Product Add</h2>
                        </>
                        }

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Adminproduct;
