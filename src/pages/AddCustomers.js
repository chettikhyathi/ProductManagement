import React, { useState } from "react";
import { createCustomer } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerName: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCustomer(customer)
      .then(() => {
        alert("Customer added successfully!");
        navigate("/customers");
      })
      .catch((error) => {
        console.log("ERROR:", error);
        alert("Failed to add customer");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Customer</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Customer Name</label>
          <br />
          <input
            type="text"
            name="customerName"
            value={customer.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Save Customer
        </button>

        <button
          type="button"
          onClick={() => navigate("/customers")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>
    </div>
  );
}

export default AddCustomer;