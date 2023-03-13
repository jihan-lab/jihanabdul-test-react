import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddProduct, EditProduct, Product } from "./pages";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
