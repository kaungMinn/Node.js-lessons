const Employee = require("../model/Employee");
const { validationmaker } = require("../util/validationMaker");

const getAllEmployees = async (req, res) => {
  const employee = await Employee.find();

  if (employee.length <= 0) return  res.status(500).send({ error: "No Employee Found! :(" });
  
  return res.json(employee);
};

const createEmployees = async (req, res) => {
  const { firstname, lastname } = req.body;

  // if (!firstname && !lastname) {
  //   return res
  //     .status(400)
  //     .json({ message: "Firstname and Lastname are required!" });
  // } else if (!lastname) {
  //   return res.status(400).json({ message: "Lastname is required!" });
  // } else if (!firstname) {
  //   return res.status(400).json({ message: "Firstname is required!" });
  // }

  const payload = {firstname, lastname}
  const errorMessage = validationmaker(payload);

  if (errorMessage) return res.status(400).json({ message: errorMessage });
 
  const duplicate = await Employee.findOne(payload)
  if(duplicate) return res.status(409).send({message: "Employee already exit!"});
  const newEmployee = await Employee.create(payload);  
  return res.status(201).send(newEmployee);
};

const updateEmployee = async (req, res) => {
  const {firstname, lastname, id}  = req.body;
  const data = {firstname, lastname, id}

    const employee = await Employee.findByIdAndUpdate({_id:id}, data, {new:true});
    if(!employee) return res.send("Employee not avaliable");
    return res.send(employee);
}

 
const deleteEmployee = async (req, res) => {
   const {id} = req.body;

   const employee = await Employee.findByIdAndDelete({_id: id});
    if(!employee) return res.send("Employee Not Avaliable");
    return res.send("Employee deleted successfully")
 }
module.exports = {
  getAllEmployees,
  createEmployees,
  updateEmployee,
  deleteEmployee
};
