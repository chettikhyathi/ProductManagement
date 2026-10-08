import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getAllOrders()
      .then((response) => {
        console.log("ORDER DATA:", response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log("ORDER ERROR:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(id)
        .then(() => {
          alert("Order deleted successfully!");
          loadOrders();
        })
        .catch((error) => {
          console.log("DELETE ERROR:", error);
          alert("Failed to delete order");
        });
    }
  };

  // Search by Order ID
  const filteredOrders = orders.filter((order) =>
    order.orderId.toString().includes(search)
  );

  // Pagination
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(
    filteredOrders.length / itemsPerPage
  );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh"
      }}
    >
      {/* Heading */}
      <h1
        style={{
          marginBottom: "20px",
          fontSize: "28px"
        }}
      >
        Order List
      </h1>

      {/* Search + Add */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "22px"
        }}
      >
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "12px",
            width: "310px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "15px"
          }}
        />

        {/* ADMIN ONLY */}
        {role === "ADMIN" && (
          <button
            onClick={() => navigate("/add-order")}
            style={{
              backgroundColor: "#1f2937",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "6px",
              fontSize: "15px",
              cursor: "pointer"
            }}
          >
            + Add Order
          </button>
        )}
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden"
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#1f2937",
              color: "white"
            }}
          >
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Customer ID</th>
            <th style={thStyle}>Product ID</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Total Amount</th>
            <th style={thStyle}>Order Status</th>

            {role === "ADMIN" && (
              <th style={thStyle}>Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <tr key={order.orderId}>
                <td style={tdStyle}>{order.orderId}</td>
                <td style={tdStyle}>{order.customerId}</td>
                <td style={tdStyle}>{order.productId}</td>
                <td style={tdStyle}>{order.quantity}</td>
                <td style={tdStyle}>₹{order.totalAmount}</td>
                <td style={tdStyle}>{order.orderStatus}</td>

                {/* ADMIN ONLY */}
                {role === "ADMIN" && (
                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        navigate(
                          "/edit-order/" + order.orderId
                        )
                      }
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px"
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(order.orderId)
                      }
                      style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={role === "ADMIN" ? 7 : 6}
                style={{
                  textAlign: "center",
                  padding: "25px"
                }}
              >
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
            gap: "12px"
          }}
        >
          <button
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            disabled={currentPage === 1}
            style={paginationButton}
          >
            Previous
          </button>

          <span
            style={{
              fontSize: "16px",
              fontWeight: "500"
            }}
          >
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            style={paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

/* Table styles */
const thStyle = {
  padding: "15px",
  textAlign: "left",
  fontSize: "16px"
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
  fontSize: "16px"
};

const paginationButton = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px"
};

export default OrderList;