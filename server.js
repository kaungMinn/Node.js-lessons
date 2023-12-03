require("dotenv").config();

const express = require("express");
const { default: mongoose } = require("mongoose");
const connectDB = require("./config/dbConn");

const app = express();
const PORT = process.env.PORT || 5000;

//"content-typ: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));

//build-in middleware for json
app.use(express.json());

//connect to Mongodb
connectDB();

app.use("/employee", require("./routes/employee/employee"));

mongoose.connection.once("open", () => {
  console.log("Connected to Mongodb");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
