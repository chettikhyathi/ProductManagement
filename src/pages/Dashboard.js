import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  getAllCustomers,
  getAllOrders,
  getAllPayments
} from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProductCount(response.data.length);
      })
      .catch((error) => console.log(error));

    getAllCustomers()
      .then((response) => {
        setCustomerCount(response.data.length);
      })
      .catch((error) => console.log(error));

    getAllOrders()
      .then((response) => {
        setOrderCount(response.data.length);
      })
      .catch((error) => console.log(error));

    getAllPayments()
      .then((response) => {
        setPaymentCount(response.data.length);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh"
      }}
    >
      {/* Heading */}
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            margin: "0",
            fontSize: "30px",
            color: "#1f2937"
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
            marginTop: "8px"
          }}
        >
          Welcome to Product Management System
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px"
        }}
      >
        {/* Products */}
        <div
          onClick={() => navigate("/products")}
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            borderLeft: "5px solid #2563eb"
          }}
        >
          <h3
            style={{
              margin: "0",
              color: "#6b7280"
            }}
          >
            Products
          </h3>

          <h1
            style={{
              fontSize: "35px",
              margin: "15px 0 5px",
              color: "#2563eb"
            }}
          >
            {productCount}
          </h1>

          <p style={{ margin: "0", color: "#6b7280" }}>
            Total Products
          </p>
        </div>

        {/* Customers */}
        <div
          onClick={() => navigate("/customers")}
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            borderLeft: "5px solid #16a34a"
          }}
        >
          <h3
            style={{
              margin: "0",
              color: "#6b7280"
            }}
          >
            Customers
          </h3>

          <h1
            style={{
              fontSize: "35px",
              margin: "15px 0 5px",
              color: "#16a34a"
            }}
          >
            {customerCount}
          </h1>

          <p style={{ margin: "0", color: "#6b7280" }}>
            Total Customers
          </p>
        </div>

        {/* Orders */}
        <div
          onClick={() => navigate("/orders")}
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            borderLeft: "5px solid #d97706"
          }}
        >
          <h3
            style={{
              margin: "0",
              color: "#6b7280"
            }}
          >
            Orders
          </h3>

          <h1
            style={{
              fontSize: "35px",
              margin: "15px 0 5px",
              color: "#d97706"
            }}
          >
            {orderCount}
          </h1>

          <p style={{ margin: "0", color: "#6b7280" }}>
            Total Orders
          </p>
        </div>

        {/* Payments */}
        <div
          onClick={() => navigate("/payments")}
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            borderLeft: "5px solid #db2777"
          }}
        >
          <h3
            style={{
              margin: "0",
              color: "#6b7280"
            }}
          >
            Payments
          </h3>

          <h1
            style={{
              fontSize: "35px",
              margin: "15px 0 5px",
              color: "#db2777"
            }}
          >
            {paymentCount}
          </h1>

          <p style={{ margin: "0", color: "#6b7280" }}>
            Total Payments
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div
        style={{
          marginTop: "35px",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ marginTop: "0" }}>Quick Navigation</h2>

        <button
          onClick={() => navigate("/products")}
          style={quickButton}
        >
          Products
        </button>

        <button
          onClick={() => navigate("/customers")}
          style={quickButton}
        >
          Customers
        </button>

        <button
          onClick={() => navigate("/orders")}
          style={quickButton}
        >
          Orders
        </button>

        <button
          onClick={() => navigate("/payments")}
          style={quickButton}
        >
          Payments
        </button>
      </div>
    </div>
  );
}

const quickButton = {
  backgroundColor: "#1f2937",
  color: "white",
  border: "none",
  padding: "11px 20px",
  borderRadius: "6px",
  marginRight: "12px",
  cursor: "pointer",
  fontSize: "14px"
};

export default Dashboard;