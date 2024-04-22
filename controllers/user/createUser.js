//------------------- Api to create a User -------------------------

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../../models/user");
const { constant } = require("../../helpers/constant");

const createUser = async (req, res) => {
  try {
    const { name, email, password, Mobile, photo } = req.body;

    //Checking if the user is already found
    const isuser = await User.findOne({ email: email });
    if (isuser) {
      constant.success = false;
      return res.status(400).json({ status: "User is already found" });
    }

    // Making hash and salt of the password to secure them using bcrypt js
    const salt = await bcrypt.genSaltSync(constant.saltRounds);
    const hash = await bcrypt.hashSync(password, salt);

    // creating the user in the database.
    const user = await User.create({
      name: name,
      email: email,
      password: hash,
      MobileNo: Mobile,
      Photo: photo,
    });

    if (!user) {
      constant.success = false;
      res.send({
        success: constant.success,
        error: "Unexpected database error",
      });
    }

    // taking the user id and send it to the jwt to generate token.
    const data = {
      user: {
        id: user.id,
      },
    };

    // Generating the token for the user.
    var token = jwt.sign(data, process.env.JWT_SECRET);

    // If token is not generated
    if (!token) {
      constant.success = false;
      res.json({ success: constant.success, error: "token is not generated" });
    }

    constant.success = true;
    res.json({ success: constant.success, token: token });
  } catch (error) {
    res.send({ success: constant.success, error: error });
  }
};

module.exports = { createUser };
