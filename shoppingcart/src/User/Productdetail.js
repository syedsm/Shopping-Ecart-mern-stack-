import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Contextapi } from "../App";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/singleproductfetch/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  const { cart, setCart } = useContext(Contextapi);
  let _cart = { ...cart };

  function handlecart(product) {
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-5 mb-4">
          <div className="card">
            {loading ? (
              <p className="p-4">Loading...</p>
            ) : product ? (
              <img src={`../productimages/${product.img}`} alt={product.name} className="card-img-top" />
            ) : (
              <p className="card-text p-4">Product not found</p>
            )}
          </div>
        </div>
        <div className="col-lg-7">
          {loading ? (
            <p>Loading...</p>
          ) : product ? (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text mb-4">{product.desc}</p>
                <h3 className="card-text mb-3">Price: ${product.price}</h3>
                {/* Add more details here */}
                <button className="btn btn-outline-primary  me-3" onClick={() => handlecart(product)}>Add to Cart</button>
                <button className="btn btn-outline-success">Buy Now</button>
              </div>
            </div>
          ) : (
            <p>Product not found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
