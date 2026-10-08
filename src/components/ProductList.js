import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct
} from "../services/api";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const role = sessionStorage.getItem("role");

  const itemsPerPage = 5;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pid) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(pid);
        alert("Product deleted successfully!");
        loadProducts();
      } catch (error) {
        alert("Delete failed!");
      }
    }
  };

  const handleEdit = (pid) => {
    navigate(`/edit-product/${pid}`);
  };

  const filteredProducts = products.filter((product) =>
    Object.values(product)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div style={{ padding: "30px" }}>

      <h2>Product List</h2>

      {/* Search + Add Product */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}
      >

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{ width: "300px" }}
        />

        {role === "ADMIN" && (
          <button
            onClick={() => navigate("/add-product")}
            style={{
              backgroundColor: "#1f2937",
              color: "white"
            }}
          >
            + Add Product
          </button>
        )}

      </div>

      {/* Product Table */}
      <table
        style={{
          width: "100%",
          textAlign: "left"
        }}
      >

        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>

            {role === "ADMIN" && (
              <th>Actions</th>
            )}
          </tr>
        </thead>

        <tbody>

          {currentProducts.map((product) => (

            <tr key={product.pid}>

              <td>{product.pid}</td>

              <td>{product.productName}</td>

              <td>{product.price}</td>

              <td>{product.quantity}</td>

              {role === "ADMIN" && (
                <td>

                  <button
                    onClick={() => handleEdit(product.pid)}
                    style={{
                      backgroundColor: "#2563eb",
                      color: "white",
                      marginRight: "8px"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.pid)}
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white"
                    }}
                  >
                    Delete
                  </button>

                </td>
              )}

            </tr>

          ))}

        </tbody>

      </table>

      {/* Pagination */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px"
        }}
      >

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span style={{ padding: "10px" }}>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default ProductList;