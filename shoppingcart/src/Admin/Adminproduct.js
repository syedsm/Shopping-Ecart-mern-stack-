import { Link } from "react-router-dom";
import Left from "./Leftmenu";
import { useEffect, useState } from "react";
import axios from 'axios';

function Adminproduct() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/allproduct')
            .then((res) => {
                setProducts(res.data.apiData);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleDeleteProduct = (id) => {
        axios.delete(`/api/delete/${id}`)
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
        <section id="mid">
            <div className="container">
                <div className="row">
                    <Left />
                    <div className="col-md-9">
                        <h2 className="text-center">Product Management</h2>
                        <p>{message}</p>
                        <Link to='/adminproductadd'>
                            <button className="btn btn-success form-control">Add Product here</button>
                        </Link>
                        <table className="table table-hover margin-left:30px">
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
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Adminproduct;
