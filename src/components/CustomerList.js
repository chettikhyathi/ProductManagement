import React, { useEffect, useState } from "react";
import {
  getAllCustomers,
  deleteCustomer
} from "../services/api";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    getAllCustomers()
      .then((response) => {
        console.log("CUSTOMER DATA:", response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log("CUSTOMER ERROR:", error);
      });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this customer?"
      )
    ) {
      deleteCustomer(id)
        .then(() => {
          alert("Customer deleted successfully!");
          loadCustomers();
        })
        .catch((error) => {
          console.log("DELETE ERROR:", error);
          alert("Failed to delete customer");
        });
    }
  };

  // Search
  const filteredCustomers = customers.filter((customer) =>
    customer.customerId
      .toString()
      .includes(search)
  );

  // Pagination
  const indexOfLastCustomer =
    currentPage * itemsPerPage;

  const indexOfFirstCustomer =
    indexOfLastCustomer - itemsPerPage;

  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(
    filteredCustomers.length / itemsPerPage
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
        Customer List
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
          placeholder="Search customers..."
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
            onClick={() => navigate("/add-customer")}
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
            + Add Customer
          </button>
        )}
      </div>

      {/* Customer Table */}
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
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Customer Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>

            {/* ADMIN ONLY */}
            {role === "ADMIN" && (
              <th style={thStyle}>Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <tr key={customer.customerId}>
                <td style={tdStyle}>
                  {customer.customerId}
                </td>

                <td style={tdStyle}>
                  {customer.customerName}
                </td>

                <td style={tdStyle}>
                  {customer.email}
                </td>

                <td style={tdStyle}>
                  {customer.phone}
                </td>

                {/* ADMIN ONLY */}
                {role === "ADMIN" && (
                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        navigate(
                          "/edit-customer/" +
                            customer.customerId
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
                        handleDelete(
                          customer.customerId
                        )
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
                No customers found
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

export default CustomerList;