const Employee = require("../model/Employee");
const { validationmaker } = require("../util/validationMaker");

const getAllEmployees = async (req, res) => {
  const employee = await Employee.find();

  if (!employee) return res.status(204).json({ message: "No employee found!" });

  res.json(employee);
};

const createEmployees = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // if (!firstname && !lastname) {
  //   return res
  //     .status(400)
  //     .json({ message: "Firstname and Lastname are required!" });
  // } else if (!lastname) {
  //   return res.status(400).json({ message: "Lastname is required!" });
  // } else if (!firstname) {
  //   return res.status(400).json({ message: "Firstname is required!" });
  // }

  const errorMessage = validationmaker({
    firstname,
    lastname,
    email,
    password,
  });

  if (errorMessage) return res.status(400).json({ message: errorMessage });
};

module.exports = {
  getAllEmployees,
  createEmployees,
};
