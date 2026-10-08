import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProductList from "./components/ProductList";
import AddProduct from "./pages/AddProducts";
import EditProduct from "./pages/EditProducts";

import CustomerList from "./components/CustomerList";
import AddCustomer from "./pages/AddCustomers";
import EditCustomer from "./pages/EditCustomers";

import OrderList from "./components/OrderList";
import AddOrder from "./pages/AddOrder";
import EditOrder from "./pages/EditOrder";

import PaymentList from "./components/PaymentList";
import AddPayment from "./pages/AddPayment";
import EditPayment from "./pages/EditPayment";


function App() {

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>

      {isLoggedIn ? (
        <>
          <Navbar />

          <div style={{ display: "flex" }}>
            <Sidebar />

            <div style={{ flex: 1 }}>

              <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />

                <Route path="/customers" element={<CustomerList />} />
                <Route path="/add-customer" element={<AddCustomer />} />
                <Route path="/edit-customer/:id" element={<EditCustomer />} />

                <Route path="/orders" element={<OrderList />} />
                <Route path="/add-order" element={<AddOrder />} />
                <Route path="/edit-order/:id" element={<EditOrder />} />

                <Route path="/payments" element={<PaymentList />} />
                <Route path="/add-payment" element={<AddPayment />} />
                <Route path="/edit-payment/:id" element={<EditPayment />} />

                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />

              </Routes>

            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      )}

    </BrowserRouter>
  );
}

export default App;