import { useEffect, useState } from "react";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  removeStudent,
} from "./api";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null); // student being edited
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type, text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const loadStudents = async (term = "") => {
    try {
      setLoading(true);
      const { data } = await fetchStudents(term);
      setStudents(data);
    } catch (err) {
      showToast("error", "Could not load students. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  // Load on first render, and re-run search 300ms after typing stops (debounce)
  useEffect(() => {
    const timer = setTimeout(() => loadStudents(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateStudent(editing._id, formData);
        showToast("success", "Student updated");
        setEditing(null);
      } else {
        await createStudent(formData);
        showToast("success", "Student added");
      }
      loadStudents(search);
      return true;
    } catch (err) {
      showToast("error", err.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const handleDelete = async (student) => {
    if (!window.confirm(`Delete ${student.name}?`)) return;
    try {
      await removeStudent(student._id);
      showToast("success", "Student deleted");
      if (editing?._id === student._id) setEditing(null);
      loadStudents(search);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Student Management System</h1>
        <p>MERN Stack Mini Project</p>
      </header>

      {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}

      <div className="layout">
        <section className="card">
          <h2>{editing ? "Edit Student" : "Add Student"}</h2>
          <StudentForm
            key={editing?._id || "new"}
            initialData={editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="card">
          <div className="list-header">
            <h2>Students ({students.length})</h2>
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <StudentTable
            students={students}
            loading={loading}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}
