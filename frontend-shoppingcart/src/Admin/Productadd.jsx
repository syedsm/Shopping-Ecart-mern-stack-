import { useState } from "react";
import Left from "./Leftmenu";
import { useContext } from "react";
import { Contextapi } from "@/Contextapi";
import axios from "axios";

function Productadd() {
  const { loginname, themeMode } = useContext(Contextapi);

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

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    qty: "",
    category: "",
    mainImg: null,
    additionalImgs: [],
    mainImgPreview: "",
    additionalImgsPreviews: [],
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  function handleMainImage(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        mainImg: file,
        mainImgPreview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        mainImg: null,
        mainImgPreview: "",
      }));
    }
  }

  function handleAdditionalImages(e) {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 additional images.");
      return;
    }
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData((prevData) => ({
      ...prevData,
      additionalImgs: files,
      additionalImgsPreviews: previews,
    }));
  }
  // console.log(formData);

  function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);

    let data = new FormData();

    data.append("name", formData.name);
    data.append("desc", formData.desc);
    data.append("price", formData.price);
    data.append("qty", formData.qty);
    data.append("category", formData.category);

    if (formData.mainImg) {
      data.append("mainImg", formData.mainImg);
    }

    if (formData.additionalImgs && formData.additionalImgs.length > 0) {
      formData.additionalImgs.forEach((img) => {
        data.append("additionalImgs", img);
      });
    }

    // console.log("FormData content:", Array.from(data));

    axios
      // .post("/api/admin/productadd", data, {
        .post(`${import.meta.env.VITE_SERVER_URL}/api/admin/productadd`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 201) {
          setFormData({
            name: "",
            desc: "",
            price: "",
            qty: "",
            category: "",
            mainImg: "",
            additionalImgs: [],
            mainImgPreview: "",
            additionalImgsPreviews: [],
            message: "Product has been successfully added",
          });
        } else {
          setFormData((prevData) => ({
            ...prevData,
            message: response.data.message || "Failed to add product",
          }));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setFormData((prevData) => ({
          ...prevData,
          message: "An error occurred while adding the product",
        }));
      })
      .finally(() => {
        setIsLoading(false);
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
                  <h2
                    className="text-center mb-4"
                    style={{
                      fontWeight: "bold",
                      backgroundColor: currentTheme.cardBg,
                      borderRadius: "10px",
                      color: currentTheme.color,
                    }}
                  >
                    Add a New Product
                  </h2>
                  {formData.message && (
                    <p className="alert alert-success text-center">
                      {formData.message}
                    </p>
                  )}
                  <form onSubmit={handleForm}>
                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{
                          fontWeight: "600",
                          backgroundColor: currentTheme.cardBg,
                          borderRadius: "10px",
                          color: currentTheme.color,
                        }}
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter product name"
                        required
                        style={{ borderRadius: "8px" }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600" }}
                      >
                        Product Description
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={formData.desc}
                        onChange={(e) =>
                          setFormData({ ...formData, desc: e.target.value })
                        }
                        placeholder="Enter product description"
                        required
                        style={{ borderRadius: "8px" }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600" }}
                      >
                        Product Price
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="Enter product price"
                        required
                        style={{ borderRadius: "8px" }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600" }}
                      >
                        Product Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        value={formData.qty}
                        onChange={(e) =>
                          setFormData({ ...formData, qty: e.target.value })
                        }
                        placeholder="Enter product quantity"
                        required
                        style={{ borderRadius: "8px" }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600" }}
                      >
                        Select Category
                      </label>
                      <select
                        className="form-select form-select-lg"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                        style={{ borderRadius: "8px" }}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        <option value="Electronics">Electronics</option>
                        <option value="Toys">Toys</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Furniture">Furniture</option>
                      </select>
                    </div>

                    <div className="form-group mb-4">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600" }}
                      >
                        Main Product Image
                      </label>
                      <div className="mb-2">
                        {formData.mainImgPreview && (
                          <img
                            style={{ width: "100px", borderRadius: "5px" }}
                            src={formData.mainImgPreview}
                            alt="Main product preview"
                          />
                        )}
                      </div>
                      <input
                        type="file"
                        className="form-control form-control-lg"
                        onChange={handleMainImage}
                        style={{ borderRadius: "8px" }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label
                        className="form-label"
                        style={{ fontWeight: "600" }}
                      >
                        Additional Product Images (up to 4)
                      </label>
                      <div className="d-flex flex-wrap mb-2">
                        {formData.additionalImgsPreviews.map(
                          (imgPreview, index) => (
                            <img
                              key={index}
                              style={{
                                width: "100px",
                                marginRight: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                              }}
                              src={imgPreview}
                              alt={`Additional preview ${index + 1}`}
                            />
                          )
                        )}
                      </div>
                      <input
                        type="file"
                        className="form-control form-control-lg"
                        onChange={handleAdditionalImages}
                        multiple
                        accept="image/*"
                        style={{ borderRadius: "8px" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-lg btn-danger w-100"
                      disabled={isLoading}
                      style={{ borderRadius: "8px", fontWeight: "bold" }}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading......</p>
      )}
    </>
  );
}

export default Productadd;
