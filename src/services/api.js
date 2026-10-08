import axios from "axios";

const API_URL = "http://localhost:8081";

// ==================== AUTH ====================

export const loginUser = (username, password) => {
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("password", password);

  return axios.get(`${API_URL}/getProductList`, {
    auth: {
      username: username,
      password: password
    }
  });
};

const authConfig = () => {
  return {
    auth: {
      username: sessionStorage.getItem("username"),
      password: sessionStorage.getItem("password")
    }
  };
};


// ==================== PRODUCT ====================

export const getAllProducts = () => {
  return axios.get(`${API_URL}/getProductList`, authConfig());
};

export const getProductById = (id) => {
  return axios.get(`${API_URL}/getProduct/${id}`, authConfig());
};

export const createProduct = (product) => {
  return axios.post(`${API_URL}/createProduct`, product, authConfig());
};

export const updateProduct = (id, product) => {
  return axios.put(`${API_URL}/updateProduct/${id}`, product, authConfig());
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/deleteProduct/${id}`, authConfig());
};


// ==================== CUSTOMER ====================

export const getAllCustomers = () => {
  return axios.get(`${API_URL}/getCustomerList`, authConfig());
};

export const getCustomerById = (id) => {
  return axios.get(`${API_URL}/getCustomer/${id}`, authConfig());
};

export const createCustomer = (customer) => {
  return axios.post(`${API_URL}/createCustomer`, customer, authConfig());
};

export const updateCustomer = (id, customer) => {
  return axios.put(`${API_URL}/updateCustomer/${id}`, customer, authConfig());
};

export const deleteCustomer = (id) => {
  return axios.delete(`${API_URL}/deleteCustomer/${id}`, authConfig());
};


// ==================== ORDER ====================

export const getAllOrders = () => {
  return axios.get(`${API_URL}/getOrderList`, authConfig());
};

export const getOrderById = (id) => {
  return axios.get(`${API_URL}/getOrder/${id}`, authConfig());
};

export const createOrder = (order) => {
  return axios.post(`${API_URL}/createOrder`, order, authConfig());
};

export const updateOrder = (id, order) => {
  return axios.put(`${API_URL}/updateOrder/${id}`, order, authConfig());
};

export const deleteOrder = (id) => {
  return axios.delete(`${API_URL}/deleteOrder/${id}`, authConfig());
};


// ==================== PAYMENT ====================

export const getAllPayments = () => {
  return axios.get(`${API_URL}/getPaymentList`, authConfig());
};

export const getPaymentById = (id) => {
  return axios.get(`${API_URL}/getPayment/${id}`, authConfig());
};

export const createPayment = (payment) => {
  return axios.post(`${API_URL}/createPayment`, payment, authConfig());
};

export const updatePayment = (id, payment) => {
  return axios.put(`${API_URL}/updatePayment/${id}`, payment, authConfig());
};

export const deletePayment = (id) => {
  return axios.delete(`${API_URL}/deletePayment/${id}`, authConfig());
};