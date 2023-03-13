import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./style.css";
import { Navbar } from "../../components";

const Product = () => {
  const [product, setProduct] = useState("");
  const [msg, setMsg] = useState("");

  const getDataProduct = async () => {
    const response = await axios.get(`http://localhost:3000/products`);
    setProduct(response.data);
  };

  const deleteProduct = async (productId) => {
    const response = window.confirm(
      "Are you sure want to delete this product?"
    );
    if (response) {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`);
        alert("Delete data product successfully");
        setMsg("Delete data product successfully");
        getDataProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const items = product;

  function Items({ currentItems }) {
    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product Name</th>
              <th scope="col">Author</th>
              <th className="text-center" scope="col">
                Action
              </th>
            </tr>
          </thead>

          {currentItems &&
            currentItems.map((item, index) => (
              <tbody key={item.id}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td className="text-center">
                    <Link to={`/edit/${item.id}`} className="btn btn-warning">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={(e) => deleteProduct(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="prev"
          pageClassName="page-item"
          pageLinkClassName="page-link-custom"
          previousClassName="page-item"
          previousLinkClassName="page-link-custom"
          nextClassName="page-item"
          nextLinkClassName="page-link-custom"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link-custom"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  useEffect(() => {
    getDataProduct();
    // console.log(product);
  }, []);
  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* Content */}
      <div className="container">
        <h1 className="fw-bold mb-5">List Product</h1>
        <Link to="/add">
          <button className="btn btn-primary mb-2">Add Product</button>
        </Link>
        {msg && msg && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Success - </strong> {msg}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}

        <PaginatedItems itemsPerPage={10} />
      </div>
      ;
    </>
  );
};

export default Product;
