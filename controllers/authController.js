const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: `User name and password are required!` });

  const foundUser = await User.findOne({ email: email }).exec();

  if (foundUser) {
    return res.sendStatus(409);
  }

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      email: email,
      pwd: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${email} is created!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
