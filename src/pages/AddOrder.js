import React, { useState } from "react";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    customerId: "",
    pid: "",
    quantity: "",
    totalAmount: ""
  });

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createOrder({
      customerId: Number(order.customerId),
      pid: Number(order.pid),
      quantity: Number(order.quantity),
      totalAmount: Number(order.totalAmount)
    })
      .then(() => {
        alert("Order added successfully!");
        navigate("/orders");
      })
      .catch((error) => {
        console.log("ERROR:", error);
        alert("Failed to add order");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Order</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Customer ID</label>
          <br />
          <input
            type="number"
            name="customerId"
            value={order.customerId}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Product ID</label>
          <br />
          <input
            type="number"
            name="pid"
            value={order.pid}
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
            value={order.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Total Amount</label>
          <br />
          <input
            type="number"
            name="totalAmount"
            value={order.totalAmount}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Save Order
        </button>

        <button
          type="button"
          onClick={() => navigate("/orders")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>
    </div>
  );
}

export default AddOrder;