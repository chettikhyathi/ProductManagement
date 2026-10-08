import React, { useEffect, useState } from "react";
import { getPaymentById, updatePayment } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditPayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    orderId: "",
    amount: "",
    paymentStatus: ""
  });

  useEffect(() => {
    getPaymentById(id)
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePayment(id, {
      orderId: Number(payment.orderId),
      amount: Number(payment.amount),
      paymentStatus: payment.paymentStatus
    })
      .then(() => {
        alert("Payment updated successfully!");
        navigate("/payments");
      })
      .catch((error) => {
        console.log("UPDATE ERROR:", error);
        alert("Failed to update payment");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Payment</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Order ID</label><br />
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
          <label>Amount</label><br />
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
          <label>Payment Status</label><br />

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
          Update Payment
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

export default EditPayment;