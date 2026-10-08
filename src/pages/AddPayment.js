import React, { useState } from "react";
import { createPayment } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddPayment() {
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    orderId: "",
    amount: "",
    paymentStatus: ""
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createPayment({
      orderId: Number(payment.orderId),
      amount: Number(payment.amount),
      paymentStatus: payment.paymentStatus
    })
      .then(() => {
        alert("Payment added successfully!");
        navigate("/payments");
      })
      .catch((error) => {
        console.log("ERROR:", error);
        alert("Failed to add payment");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Payment</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Order ID</label>
          <br />
          <input
            type="number"
            name="orderId"
            value={payment.orderId}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Amount</label>
          <br />
          <input
            type="number"
            name="amount"
            value={payment.amount}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Payment Status</label>
          <br />
          <select
            name="paymentStatus"
            value={payment.paymentStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        <br />

        <button type="submit">
          Save Payment
        </button>

        <button
          type="button"
          onClick={() => navigate("/payments")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>
    </div>
  );
}

export default AddPayment;