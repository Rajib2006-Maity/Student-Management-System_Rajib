export default function StudentTable({ students, loading, onEdit, onDelete }) {
  if (loading) return <p className="muted">Loading...</p>;
  if (students.length === 0) return <p className="muted">No students found.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Course</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>{s.course}</td>
              <td>{s.phone}</td>
              <td className="row-actions">
                <button className="btn small" onClick={() => onEdit(s)}>Edit</button>
                <button className="btn small danger" onClick={() => onDelete(s)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
