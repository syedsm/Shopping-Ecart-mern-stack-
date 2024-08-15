import { Link } from "react-router-dom";

function Footerpage() {
  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "40px 20px",
        width: "100%",
      }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h6>SHOP</h6>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Drinks
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Store Locator
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Refer a Friend
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h6>HELP</h6>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h6>ABOUT</h6>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Ecart Shopping Digest
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h6>Subscribe</h6>
            <p>Sign up to get 10% off your first order</p>
            <form>
              <input
                type="email"
                placeholder="Your Email Address"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#FFC107",
                  color: "black",
                  width: "100%",
                }}
              >
                Subscribe
              </button>
            </form>
            <div style={{ margin: "20px", display: "flex", gap: "50px" }}>
              <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#" style={{ color: "white", textDecoration: "none" }}>
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p style={{ margin: 0 }}>
              &copy; 2022 ShoppingE-cart, Inc. All Rights Reserved
            </p>
            <div style={{ marginTop: "10px" }}>
              <Link
                to="#"
                style={{
                  color: "white",
                  marginRight: "10px",
                  textDecoration: "none",
                }}
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                style={{
                  color: "white",
                  marginRight: "10px",
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footerpage;
