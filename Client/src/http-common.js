import axios from "axios";

export default axios.create({
  baseURL: "https://node-crm.onrender.com",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
});