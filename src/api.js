import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/students";

export const fetchStudents = (search = "") =>
  axios.get(API_URL, { params: { search } });

export const createStudent = (data) => axios.post(API_URL, data);

export const updateStudent = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const removeStudent = (id) => axios.delete(`${API_URL}/${id}`);
