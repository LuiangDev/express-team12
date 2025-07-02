import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://project-express-12.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
