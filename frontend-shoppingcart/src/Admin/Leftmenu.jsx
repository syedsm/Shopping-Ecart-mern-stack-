import { Link } from "react-router-dom";
import { Contextapi } from "@/Contextapi";
import { useContext } from "react";

function Left() {
  const { loginname } = useContext(Contextapi);

  return (
    <>
      {loginname === "admin" ? (
        <div className="col-md-3 mt-5">
          <Link to="/adminproducts">
            {" "}
            <button className="btn btn-primary form-control mt-2 mb-2">
              {" "}
              Product Management
            </button>
          </Link>
          <Link to="/usermanagment">
            {" "}
            <button className="btn btn-primary form-control mt-2">
              {" "}
              Users Management
            </button>
          </Link>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default Left;
