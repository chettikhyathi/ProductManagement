import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {

  const linkStyle = {
    display: "block",
    color: "white",
    padding: "15px 25px",
    textDecoration: "none"
  };

  const activeStyle = {
    backgroundColor: "#374151",
    fontWeight: "bold"
  };

  return (
    <div
      style={{
        width: "220px",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#111827",
        paddingTop: "20px"
      }}
    >

      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        🏠 Dashboard
      </NavLink>

      <NavLink
        to="/products"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        📦 Products
      </NavLink>

      <NavLink
        to="/customers"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        👥 Customers
      </NavLink>

      <NavLink
        to="/orders"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        🛒 Orders
      </NavLink>

      <NavLink
        to="/payments"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        💳 Payments
      </NavLink>

    </div>
  );
}

export default Sidebar;