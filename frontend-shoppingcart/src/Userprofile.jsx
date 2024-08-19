import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Contextapi } from "./Contextapi.jsx";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { loginname, setloginname, setCart, setToken, themeMode } =
    useContext(Contextapi);

  const [profile, setProfile] = useState({
    profileimage: "",
    username: "",
    email: "",
    _id: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetch(`/api/singleuserfetch/${loginname}`, {
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/singleuserfetch/${loginname}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log("fetch user data", res);
        if (res.status === 201) {
          const { username, email, profileimage, _id } = res.body;
          setProfile({ username, email, profileimage, _id });
          setImagePreview(`/productimages/${profileimage}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [loginname, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const confirmUpdate = () =>
    window.confirm("Are you sure you want to update these fields?");

  const handleUpdate = () => {
    if (confirmUpdate()) {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("email", profile.email);
      if (selectedFile) {
        formData.append("profileimage", selectedFile);
      }

      const id = profile._id;
      // axios.put(`/api/userprofileupdate/${id}`, formData, {
      axios
        .put(
          `${import.meta.env.VITE_SERVER_URL}/api/userprofileupdate/${id}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log("Updated Data", res);
          if (res.status === 200) {
            alert("Profile updated successfully!");
            setProfile(res.data.user);
            setloginname(profile.username);
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          alert("Something went wrong!");
        });
    }
  };

  const confirmDelete = () =>
    window.confirm("Are you sure you want to delete this account?");

  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirmDelete()) {
      const id = profile._id;
      // axios.delete(`/api/userdelete/${id}`, {
      axios
        .delete(`${import.meta.env.VITE_SERVER_URL}/api/userdelete/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("Deleted Data", res);
          alert("User successfully deleted");
          setloginname("");
          setToken("");
          setCart("");
          localStorage.removeItem("token");
          localStorage.removeItem("loginname");
          localStorage.removeItem("cart");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Something went wrong! Please try again later.");
        });
    }
  };

  return (
    <section id="userprofile">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div
              className={`card ${
                themeMode === "dark"
                  ? "bg-dark text-white"
                  : "bg-light text-dark"
              } border-${themeMode ? "light" : "dark"}`}
            >
              <div className="card-header text-center">
                <h2>User Profile</h2>
                <img
                  src={imagePreview || `/productimages/${profile.profileimage}`}
                  alt="Profile"
                  className="rounded-circle img-fluid mb-3"
                  style={{
                    cursor: "pointer",
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                  onClick={() =>
                    document.getElementById("profileimage").click()
                  }
                />
                <input
                  type="file"
                  className="form-control d-none"
                  id="profileimage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="card-body">
                <div className="form-group mb-3">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <button
                    className="btn btn-primary mt-3 w-100 w-md-48"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </button>
                  <button
                    className="btn btn-danger mt-3 w-100 w-md-48"
                    onClick={handleDelete}
                  >
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
