import { useParams } from "react-router-dom";
import Left from "./Leftmenu";
import { useContext, useEffect, useState } from "react";
import { Contextapi } from "@/Contextapi";

function Productupdate() {
  const { id } = useParams();
  const { loginname } = useContext(Contextapi);

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [status, setStatus] = useState("");
  const [img, setImg] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`/api/singleproduct/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === 200) {
          setName(data.apiData.name);
          setDesc(data.apiData.desc);
          setPrice(data.apiData.price);
          setQty(data.apiData.qty);
          setStatus(data.apiData.status);
          setImg(data.apiData.img);
          setImagePreview(`/productimages/${data.apiData.img}`);
        } else {
          setMessage(data.message);
        }
      });
  }, [id, token]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("name", name);
    data.append("desc", desc);
    data.append("price", price);
    data.append("qty", qty);
    data.append("status", status);
    data.append("img", img);

    fetch(`/api/productupdate/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        console.log("Update Data ", data);
        if (data.status === 200) {
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
      });
  }

  return (
    <>
      {loginname === "admin" ? (
        <section id="mid">
          <div className="container">
            <div className="row">
              <Left />
              <div className="col-md-9">
                <h3 className="text-center">Product Update Here</h3>
                {message && (
                  <p className="alert alert-success text-center">{message}</p>
                )}
                <form onSubmit={handleFormSubmit} style={{ fontSize: "14px" }}>
                  <label>Enter Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Enter Product Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Product Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label>Product Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                  <label>Product Image</label>
                  <div>
                    <img
                      style={{ width: "100px" }}
                      src={imagePreview}
                      alt="Product preview"
                    />
                    <input
                      type="file"
                      className="form-control mt-2"
                      onChange={handleImageChange}
                    />
                  </div>
                  <label>Product Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="IN-STOCK">IN-STOCK</option>
                    <option value="OUT-OF-STOCK">OUT-OF-STOCK</option>
                  </select>
                  <button
                    type="submit"
                    className="form-control mt-3 btn btn-danger"
                  >
                    Update
                  </button>
                </form>
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

export default Productupdate;
