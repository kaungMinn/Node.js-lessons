const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required!" });

  const foundUser = await User.findOne({ email: email }).exec();

  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.pwd);

  if (match) {
    const accessToken = jwt.sign({
      UserInfo: {
        email: foundUser.email,
      },
    });
  }
};

module.exports = { handleLogin };
