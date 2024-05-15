import { Link } from "react-router-dom";

function Left() {
  return (
    <>
      <div className="col-md-3 mt-5">
        <Link to='/adminproducts'> <button className="btn btn-info form-control mt-2 mb-2"> Product Management</button></Link>
        <Link to='/usermanagment'> <button className="btn btn-info form-control mt-2"> Users Management</button></Link>
      </div>


    </>
  );
}

export default Left;