import React, { useEffect, useState } from "react";
import { getAllPayments, deletePayment } from "../services/api";
import { useNavigate } from "react-router-dom";

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    getAllPayments()
      .then((response) => {
        console.log("PAYMENT DATA:", response.data);
        setPayments(response.data);
      })
      .catch((error) => {
        console.log("PAYMENT ERROR:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      deletePayment(id)
        .then(() => {
          alert("Payment deleted successfully!");
          loadPayments();
        })
        .catch((error) => {
          console.log("DELETE ERROR:", error);
          alert("Failed to delete payment");
        });
    }
  };

  // Search
  const filteredPayments = payments.filter((payment) =>
    payment.paymentId.toString().includes(search)
  );

  // Pagination
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;

  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(
    filteredPayments.length / itemsPerPage
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
        Payment List
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
          placeholder="Search payments..."
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
            onClick={() => navigate("/add-payment")}
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
            + Add Payment
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
            <th style={thStyle}>Payment ID</th>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Payment Status</th>

            {role === "ADMIN" && (
              <th style={thStyle}>Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentPayments.length > 0 ? (
            currentPayments.map((payment) => (
              <tr key={payment.paymentId}>
                <td style={tdStyle}>{payment.paymentId}</td>
                <td style={tdStyle}>{payment.orderId}</td>
                <td style={tdStyle}>₹{payment.amount}</td>
                <td style={tdStyle}>
                  {payment.paymentStatus}
                </td>

                {/* ADMIN ONLY */}
                {role === "ADMIN" && (
                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        navigate(
                          "/edit-payment/" +
                            payment.paymentId
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
                        handleDelete(payment.paymentId)
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
                colSpan={role === "ADMIN" ? 5 : 4}
                style={{
                  textAlign: "center",
                  padding: "25px"
                }}
              >
                No payments found
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

export default PaymentList;