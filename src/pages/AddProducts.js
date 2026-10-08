import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    quantity: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/createProduct", {
        productName: product.productName,
        price: Number(product.price),
        quantity: Number(product.quantity)
      })
      .then((response) => {
        alert("Product added successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.log("ERROR:", error);
        alert("Failed to add product");
      });
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Product Name</label>
          <br />
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Price</label>
          <br />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Quantity</label>
          <br />
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Save Product
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>

    </div>
  );
}

export default AddProduct;