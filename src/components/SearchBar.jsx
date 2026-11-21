export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search"
      placeholder="Search by name, email or course..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
