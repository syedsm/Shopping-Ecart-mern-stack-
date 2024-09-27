import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Left from "./Leftmenu";
import axios from "axios";
import { Contextapi } from "@/Contextapi";

function Usersmanag() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const { themeMode, loginname } = useContext(Contextapi); 
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetch(`/api/admin/usersfetch/${id}`, {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/admin/usersfetch/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.status === 200) {
          setUsers(data.record);
        } else {
          setMessage(data.message);
        }
      });
  }, [id, token]);

  const handleUpdateStatus = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        const newStatus = user.status === "Active" ? "Suspend" : "Active";
        axios
        // .put(`/api/admin/statusupdate/${userId}`,
          .put(`${import.meta.env.VITE_SERVER_URL}/api/admin/statusupdate/${userId}`,
            { status: newStatus },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            // console.log("Status updated successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error updating status:", error);
            setMessage(error.message);
          });
        return { ...user, status: newStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <>
      {loginname === "admin" ? (
        <div
          className={`container ${
            themeMode === "dark" ? "bg-dark text-white" : "bg-light text-dark"
          }`}
        >
          <div className="row">
            <Left />
            <div className="col-md-9">
              <h2 className="text-center mb-4">Users Management</h2>
              <p>{message}</p>
              <table
                className={`table table-hover ${
                  themeMode === "dark"
                    ? "table-dark text-white"
                    : "table-light text-dark"
                }`}
              >
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Username</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`toggleSwitch-${user._id}`}
                            checked={user.status === "Active"}
                            onChange={() => handleUpdateStatus(user._id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`toggleSwitch-${user._id}`}
                          >
                            {user.status === "Active" ? "Active" : "Suspend"}
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}

export default Usersmanag;
