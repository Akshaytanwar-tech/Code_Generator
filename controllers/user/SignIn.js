const User = require('../../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { constant } = require("../../helpers/constant");
require("dotenv").config();

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Checking email is exists or not
    const user = await User.findOne({ email: email });

    // If email is not found
    if (!user) {
      constant.success = false;
      return res
        .status(400)
        .json({ err: "Email is Not found", success: constant.success });
    }

    // Comparing the user password and hash of particular email
    const isPassword = await bcrypt.compareSync(password, user.password);

    // If the password doesn't match with the hased password
    if (!isPassword) {
      constant.success = false;
      return res
        .status(400)
        .json({ err: "Wrong Password", success: constant.success });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    // generating token to user
    var token = await jwt.sign(data, process.env.JWT_SECRET);
    if (!token) {
      constant.success = false;
      return res
        .status(400)
        .json({ err: "Wrong Password", success: constant.success });
    }

    constant.success = true;
    res.json({ token, success });
  } catch (error) {
    constant.success = false;
    return res.status(400).json({ err: error, success: constant.success });
  }
};

module.exports = { SignIn };
