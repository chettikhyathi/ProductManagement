import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {

    axios
      .get("http://localhost:8081/getProduct/" + id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });

  }, [id]);

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    axios
      .put("http://localhost:8081/updateProduct/" + id, {
        productName: product.productName,
        price: Number(product.price),
        quantity: Number(product.quantity)
      })
      .then(() => {

        alert("Product updated successfully!");

        navigate("/products");

      })
      .catch((error) => {

        console.log("UPDATE ERROR:", error);

        alert("Failed to update product");

      });

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Edit Product</h1>

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
          Update Product
        </button>

        <button
          type="button"
          onClick={() => navigate("/products")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>

    </div>

  );
}

export default EditProduct;