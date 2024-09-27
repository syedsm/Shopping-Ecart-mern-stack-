import { useParams } from "react-router-dom";
import Left from "./Leftmenu";
import { useContext, useEffect, useState } from "react";
import { Contextapi } from "@/Contextapi";
import axios from "axios";

function Productupdate() {
  const { id } = useParams();
  const { loginname, themeMode } = useContext(Contextapi);

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [status, setStatus] = useState("");
  const [img, setImg] = useState(null);
  const [existingMainImg, setExistingMainImg] = useState("");
  const [additionalImgs, setAdditionalImgs] = useState([]);
  const [existingAdditionalImgs, setExistingAdditionalImgs] = useState([]);

  const token = localStorage.getItem("token");

  const lightTheme = {
    backgroundColor: "bg-white text-dark",
    color: "#343a40",
    cardBg: "#ffffff",
    inputBg: "#ffffff",
    inputColor: "#343a40",
    borderColor: "white",
  };

  const darkTheme = {
    backgroundColor: "bg-dark text-white",
    color: "#f8f9fa",
    cardBg: "#495057",
    inputBg: "#6c757d",
    inputColor: "#f8f9fa",
    borderColor: "white",
  };

  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    axios
      // .get(`/api/admin/singleproduct/${id}`, {
        .get(`${import.meta.env.VITE_SERVER_URL}/api/admin/singleproduct/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        if (data.status === 200) {
          setName(data.apiData.name);
          setDesc(data.apiData.desc);
          setPrice(data.apiData.price);
          setQty(data.apiData.qty);
          setStatus(data.apiData.status);
          setExistingMainImg(data.apiData.mainImg);
          setImg(null);

          if (Array.isArray(data.apiData.additionalImgs)) {
            setExistingAdditionalImgs(data.apiData.additionalImgs);
          } else {
            setExistingAdditionalImgs([]);
          }
        } else {
          setMessage(data.message);
        }
      });
  }, [id, token]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  }

  function handleAdditionalImages(e) {
    const files = Array.from(e.target.files);
    files.length > 4
      ? alert("you can upload up to 4 images")
      : setAdditionalImgs(files);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    let data = new FormData();
    data.append("name", name);
    data.append("desc", desc);
    data.append("price", price);
    data.append("qty", qty);
    data.append("status", status);

    if (img) {
      data.append("img", img);
    } else {
      data.append("existingMainImg", existingMainImg);
    }

    if (additionalImgs.length > 0) {
      additionalImgs.forEach((file) => data.append("additionalImgs", file));
    } else {
      existingAdditionalImgs.forEach((filename) =>
        data.append("existingAdditionalImgs", filename)
      );
    }

    axios
      // .put(`/api/admin/productupdate/${id}`, data, {
        .put(`${import.meta.env.VITE_SERVER_URL}/api/admin/productupdate/${id}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Update Data ", res.data);
        if (res.data.status === 200) {
          setMessage(res.data.message);
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((error) => {
        setMessage("An error occurred while updating the product.");
        console.error("Update Error", error);
      });
  }

  return (
    <>
      {loginname === "admin" ? (
        <section
          id="mid"
          className="py-5"
          style={{
            backgroundColor: currentTheme.backgroundColor,
            color: currentTheme.color,
          }}
        >
          <div className="container">
            <div className="row">
              <Left />
              <div className="col-md-9">
                <div
                  className="card shadow-sm p-4"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderRadius: "10px",
                    color: currentTheme.color,
                  }}
                >
                  <h3
                    className="text-center mb-4"
                    style={{ fontWeight: "bold", color: currentTheme.color }}
                  >
                    Product Update
                  </h3>
                  {message && (
                    <p className="alert alert-success text-center">{message}</p>
                  )}
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600", color: currentTheme.color }}
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.inputColor,
                          borderRadius: "8px",
                          borderColor: currentTheme.borderColor,
                        }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600", color: currentTheme.color }}
                      >
                        Product Description
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Enter product description"
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.inputColor,
                          borderRadius: "8px",
                          borderColor: currentTheme.borderColor,
                        }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600", color: currentTheme.color }}
                      >
                        Product Price
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.inputColor,
                          borderRadius: "8px",
                          borderColor: currentTheme.borderColor,
                        }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600", color: currentTheme.color }}
                      >
                        Product Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        placeholder="Enter product quantity"
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.inputColor,
                          borderRadius: "8px",
                          borderColor: currentTheme.borderColor,
                        }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600", color: currentTheme.color }}
                      >
                        Product Image
                      </label>
                      <div className="mb-2">
                        <img
                          style={{ width: "100px", borderRadius: "5px" }}
                          src={
                            img
                              ? URL.createObjectURL(img)
                              : `/productimages/${existingMainImg}`
                          }
                          alt="Product preview"
                        />
                      </div>
                      <input
                        type="file"
                        className="form-control form-control-lg"
                        onChange={handleImageChange}
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.inputColor,
                          borderRadius: "8px",
                          borderColor: currentTheme.borderColor,
                        }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600", color: currentTheme.color }}
                      >
                        Additional Product Images (up to 4)
                      </label>
                      <div className="d-flex flex-wrap mb-2">
                        {additionalImgs.length > 0
                          ? additionalImgs.map((imgPreview, index) => (
                              <img
                                key={index}
                                style={{
                                  width: "100px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "5px",
                                }}
                                src={URL.createObjectURL(imgPreview)}
                                alt={`Additional preview ${index + 1}`}
                              />
                            ))
                          : existingAdditionalImgs.map((imgUrl, index) => (
                              <img
                                key={index}
                                style={{
                                  width: "100px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "5px",
                                }}
                                src={`/productimages/${imgUrl}`}
                                alt={`Existing additional preview ${index + 1}`}
                              />
                            ))}
                      </div>
                      <input
                        type="file"
                        className="form-control form-control-lg"
                        onChange={handleAdditionalImages}
                        multiple
                        accept="image/*"
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.inputColor,
                          borderRadius: "8px",
                          borderColor: currentTheme.borderColor,
                        }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600", color: currentTheme.color }}
                      >
                        Product Status
                      </label>
                      <select
                        className="form-select form-select-lg"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                          backgroundColor: currentTheme.inputBg,
                          color: currentTheme.inputColor,
                          borderRadius: "8px",
                          borderColor: currentTheme.borderColor,
                        }}
                      >
                        <option value="IN-STOCK">IN-STOCK</option>
                        <option value="OUT-OF-STOCK">OUT-OF-STOCK</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-lg btn-danger w-100"
                      style={{ borderRadius: "8px", fontWeight: "bold" }}
                    >
                      Update Product
                    </button>
                  </form>
                </div>
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
