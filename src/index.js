const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and Model
const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const Student = mongoose.model("Student", StudentSchema);

// REST API Endpoints
// GET all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// POST new student
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
