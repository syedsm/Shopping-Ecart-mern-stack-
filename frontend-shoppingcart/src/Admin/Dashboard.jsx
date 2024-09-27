import { useContext } from "react";
import Left from "./Leftmenu";
import { Contextapi } from "@/Contextapi";

function Dashboard() {
  const { loginname } = useContext(Contextapi);

  return (
    <>
      {loginname === "admin" ? (
        <section id="mid">
          <div className="container">
            <div className="row">
              <Left />
              <div className="col-md-9 text-center fs-3 fw-bold">
                Shopping-Cart
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

export default Dashboard;
