import { useContext, useEffect, useState } from "react";
import { Contextapi } from "@/Contextapi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Buypage() {
  const { buyitem, loginname } = useContext(Contextapi);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showBillingDetails, setShowBillingDetails] = useState(false);
  const [billingDetails, setBillingDetails] = useState({});
  const [finalBilling, setFinalBilling] = useState({
    price: 0,
    gst: 0,
    total: 0,
  });
  let navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [country, setcountry] = useState("");
  const [address, setaddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (buyitem && buyitem.item) {
          const res = await axios.post("/api/buycheck/", {
            ids: Object.keys(buyitem.item),
          });

          if (res.status === 200) {
            const record = res.data.record;

            setData(record);

            const price = record.price;
            const gst = price > 1000 ? 1.8 : price;
            const total = (gst * price).toFixed(2);

            setFinalBilling({ price, gst, total });
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [buyitem]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <p>No data found.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { firstName, lastName, city, zip, country, state, address };
    setBillingDetails(data);
    setShowBillingDetails(true);
  };
  const handlecheckout = () => {
    if (loginname) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-5 " style={{ padding: "100px 50px" }}>
      <div className="row">
        {/* Left side: Product details */}
        <div className="col-12 col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center text-md-start">
                {data.name}
              </h1>
              <div className="img mb-3 text-center">
                <img
                  src={`./public/productimages/${data.img}`}
                  alt="Product"
                  className="img-fluid w-25"
                />
              </div>
              <h4 className="text-muted text-center text-md-start">
                Price: ${data.price}
              </h4>
              <p className="card-text text-center text-md-start">{data.desc}</p>
            </div>
          </div>
        </div>

        {/* Right side: Billing address form */}
        <div
          className={`col-12 col-md-6 ${
            showBillingDetails ? "d-none" : "d-block"
          }`}
        >
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center">Billing Address</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => {
                          setfirstName(e.target.value);
                        }}
                        required
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => {
                          setlastName(e.target.value);
                        }}
                        required
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="string"
                        className="form-control"
                        value={city}
                        onChange={(e) => {
                          setcity(e.target.value);
                        }}
                        required
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        value={state}
                        onChange={(e) => {
                          setstate(e.target.value);
                        }}
                        required
                        placeholder="State"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input
                        type="number"
                        className="form-control"
                        value={zip}
                        onChange={(e) => {
                          setzip(e.target.value);
                        }}
                        required
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        value={country}
                        className="form-control"
                        onChange={(e) => {
                          setcountry(e.target.value);
                        }}
                        required
                      >
                        <option value="" disabled>
                          Select Country
                        </option>
                        <option value="INDIA">INDIA</option>
                        <option value="USA">USA</option>
                        <option value="China">China</option>
                        <option value="UK">UK</option>
                        <option value="France">France</option>
                        <option value="Dubai">Dubai</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                    required
                    placeholder="Address"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Final Billing Section */}
        <div
          className={`col-12 col-md-6 ${
            showBillingDetails ? "d-block" : "d-none"
          }`}
        >
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center">Final Billing Details</h2>
              <p>
                <strong>Name:</strong> {billingDetails.firstName}{" "}
                {billingDetails.lastName}
              </p>
              <p>
                <strong>City:</strong> {billingDetails.city}
              </p>
              <p>
                <strong>State:</strong> {billingDetails.state}
              </p>
              <p>
                <strong>ZIP Code:</strong> {billingDetails.zip}
              </p>
              <p>
                <strong>Country:</strong> {billingDetails.country}
              </p>
              <p>
                <strong>Address:</strong> {billingDetails.address}
              </p>
              <hr />
              <h3 className="text-center">Payment Summary</h3>
              <p>
                <strong>Price:</strong> ${finalBilling.price}
              </p>
              <p>
                <strong>GST:</strong> ${finalBilling.gst}
              </p>
              <p>
                <strong>Total:</strong> ${finalBilling.total}
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowBillingDetails(false)}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Edit Billing Details
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handlecheckout()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buypage;
