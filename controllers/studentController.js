const Student = require("../models/Student");

// Turn Mongoose errors into friendly messages
const handleError = (err, res) => {
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message).join(", ");
    return res.status(400).json({ message });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: "A student with this email already exists" });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid student ID" });
  }
  console.error(err);
  return res.status(500).json({ message: "Server error" });
};

// GET /api/students?search=term   -> View + Search
exports.getStudents = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search && search.trim()) {
      // escape special regex characters so user input is treated as plain text
      const term = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(term, "i");
      filter = { $or: [{ name: regex }, { email: regex }, { course: regex }] };
    }
    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    handleError(err, res);
  }
};

// POST /api/students   -> Add
exports.addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    handleError(err, res);
  }
};

// PUT /api/students/:id   -> Edit
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/students/:id   -> Delete
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};
