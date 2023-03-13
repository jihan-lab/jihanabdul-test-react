import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../../components";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    setName(response.data.name);
    setAuthor(response.data.author);
  };

  const updateDataProduct = async (e) => {
    e.preventDefault();

    if (name === null || name === "")
      return alert("Please fill the name of product");

    if (author === null || author === "")
      return alert("Please fill the author of product");
    try {
      await axios
        .patch(`http://localhost:3000/products/${id}`, {
          name: name,
          author: author,
        })
        .then((response) => {
          window.alert("Update Product Successfully");
        });
    } catch (error) {
      window.alert(error.response.data);
    }
    navigate("/");
  };

  useEffect(() => {
    getProductById();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="fw-bold mb-5">Update Product</h1>
        <form onSubmit={updateDataProduct}>
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
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditProduct;
