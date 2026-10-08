import React from "react";

function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "#1f2937",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px"
      }}
    >
      <h2>Product Management System</h2>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "white",
          color: "#1f2937",
          fontWeight: "bold"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;