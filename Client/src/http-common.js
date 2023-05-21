import axios from "axios";

export default axios.create({
  // baseURL: "https://node-crm.onrender.com",

  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
});