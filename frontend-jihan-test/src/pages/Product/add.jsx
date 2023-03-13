import axios from "axios";
import React, { useState } from "react";
import { Navbar } from "../../components";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();

  const saveDataProduct = async (e) => {
    e.preventDefault();

    if (name === null || name === "")
      return alert("Please fill the name of product");

    if (author === null || author === "")
      return alert("Please fill the author of product");
    try {
      await axios
        .post(`http://localhost:3000/products`, {
          name: name,
          author: author,
        })
        .then((response) => {
          window.alert("Add Product Successfully");
        });
    } catch (error) {
      window.alert(error.response.data);
    }
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="fw-bold mb-5">Add Product</h1>
        <form onSubmit={saveDataProduct}>
          <div className="mb-3 col-lg-7 col-md-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-12">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control"
              type="text"
              id="author"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
