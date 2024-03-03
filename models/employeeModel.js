const mongoose = require("mongoose");
const validator = require("validator");

EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  team_id: {
    type: String,
    required: true,
  },
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
