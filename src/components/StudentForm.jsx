import { useState } from "react";

const empty = { name: "", email: "", age: "", course: "", phone: "" };

// Basic client-side validation
const validate = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "Enter a valid email";
  const age = Number(v.age);
  if (!v.age || age < 5 || age > 100) errors.age = "Age must be between 5 and 100";
  if (!v.course.trim()) errors.course = "Course is required";
  if (!/^\d{10}$/.test(v.phone)) errors.phone = "Phone must be 10 digits";
  return errors;
};

export default function StudentForm({ initialData, onSubmit, onCancel }) {
  const [values, setValues] = useState(
    initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          age: String(initialData.age),
          course: initialData.course,
          phone: initialData.phone,
        }
      : empty
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const ok = await onSubmit({ ...values, age: Number(values.age) });
    if (ok && !initialData) setValues(empty); // clear form after adding
  };

  const field = (name, label, type = "text", placeholder = "") => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        className={errors[name] ? "invalid" : ""}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {field("name", "Full Name", "text", "e.g. Priya Sharma")}
      {field("email", "Email", "email", "priya@example.com")}
      {field("age", "Age", "number", "e.g. 20")}
      {field("course", "Course", "text", "e.g. B.Tech CSE")}
      {field("phone", "Phone", "tel", "10-digit number")}
      <div className="actions">
        <button type="submit" className="btn primary">
          {initialData ? "Update Student" : "Add Student"}
        </button>
        {initialData && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
