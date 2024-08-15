import { useState } from "react";
import Left from "./Leftmenu";
import { useContext } from "react";
import { Contextapi } from "@/Contextapi";

function Productadd() {
  const { loginname } = useContext(Contextapi);

  const [Fromdata, setFromdata] = useState({
    name: "",
    desc: "",
    price: "",
    qty: "",
    category: "",
    img: "",
    imgPreview: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFromdata((prevData) => ({
          ...prevData,
          img: file,
          imgPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setErrors((prevErrors) => ({ ...prevErrors, img: "" }));
    } else {
      setFromdata((prevData) => ({
        ...prevData,
        img: null,
        imgPreview: "",
      }));
    }
  }

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);

    let data = new FormData();
    data.append("name", Fromdata.name);
    data.append("desc", Fromdata.desc);
    data.append("price", Fromdata.price);
    data.append("qty", Fromdata.qty);
    data.append("img", Fromdata.img);
    data.append("category", Fromdata.category);

    try {
      // const response = await fetch("/api/productadd", {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/productadd`, {
        method: "POST",
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      // console.log('Response:', result);

      if (response.status === 201) {
        setFromdata({
          name: "",
          desc: "",
          price: "",
          qty: "",
          category: "",
          img: null,
          imgPreview: "",
          message: "Product has been successfully added",
        });
      } else {
        setFromdata((prevData) => ({
          ...prevData,
          message: result.message || "Failed to add product",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setFromdata((prevData) => ({
        ...prevData,
        message: "An error occurred while adding the product",
      }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {loginname === "admin" ? (
        <section id="mid">
          <div className="container">
            <div className="row">
              <Left />
              <div className="col-md-9">
                <h2 className="text-center">Add a New Product</h2>
                <p className="text-success">{Fromdata.message}</p>
                <form onSubmit={handleForm}>
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={Fromdata.name}
                    onChange={(e) =>
                      setFromdata({ ...Fromdata, name: e.target.value })
                    }
                    required
                  />

                  <label>Product Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={Fromdata.desc}
                    onChange={(e) =>
                      setFromdata({ ...Fromdata, desc: e.target.value })
                    }
                    required
                  />

                  <label>Product Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={Fromdata.price}
                    onChange={(e) =>
                      setFromdata({ ...Fromdata, price: e.target.value })
                    }
                    required
                  />

                  <label>Product Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={Fromdata.qty}
                    onChange={(e) =>
                      setFromdata({ ...Fromdata, qty: e.target.value })
                    }
                    required
                  />

                  <label>Select Category</label>
                  <select
                    className="form-select"
                    value={Fromdata.category}
                    onChange={(e) =>
                      setFromdata({ ...Fromdata, category: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Toys">Toys</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Furniture">Furniture</option>
                  </select>

                  <label>Product Image</label>
                  <div>
                    {Fromdata.imgPreview && (
                      <img
                        style={{ width: "100px" }}
                        src={Fromdata.imgPreview}
                        alt="Product preview"
                      />
                    )}
                    <input
                      type="file"
                      className="form-control mt-2"
                      onChange={handleImage}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="form-control mt-3 btn btn-danger"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </form>
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
