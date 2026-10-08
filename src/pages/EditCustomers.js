import React, { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    getCustomerById(id)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateCustomer(id, {
      customerName: customer.customerName,
      email: customer.email,
      phone: customer.phone
    })
      .then(() => {
        alert("Customer updated successfully!");
        navigate("/customers");
      })
      .catch((error) => {
        console.log("UPDATE ERROR:", error);
        alert("Failed to update customer");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Customer</h1>

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
          Update Customer
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

export default EditCustomer;