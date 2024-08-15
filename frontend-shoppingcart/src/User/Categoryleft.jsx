import axios from "axios";
import PropTypes from "prop-types";

export const Categoryleft = ({ onFilter }) => {
  const categories = ["Electronics", "Toys", "Clothes", "Furniture"];

  const handleCategory = (category) => {
    // axios.get(`/api/categoryfilter/${category}`).then((res) => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/categoryfilter/${category}`).then((res) => {
      onFilter(res.data.apiData);
    });
  };

  return (
    <div
      className="category-container p-3 bg-light rounded mx-auto "
      style={{ maxWidth: "300px"}}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ fontWeight: "bold", color: "#333" }}>
          Filter by Category
        </h5>
        <button
          className="btn btn-light d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filterMenu"
          aria-expanded="false"
          aria-controls="filterMenu"
        >
          <i className="bi bi-funnel-fill"></i>
        </button>
      </div>

      <div className="collapse d-md-block" id="filterMenu">
        {categories.map((category) => (
          <div key={category} className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id={category.toLowerCase()}
              onClick={() => handleCategory(category)}
              style={{ cursor: "pointer" }}
            />
            <label
              className="form-check-label ms-2"
              htmlFor={category.toLowerCase()}
              style={{
                fontSize: "1.1rem",
                fontWeight: "500",
                color: "#555",
                cursor: "pointer",
              }}
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation
Categoryleft.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
