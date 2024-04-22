const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/user/createUser");
const { SignIn } = require("../controllers/user/SignIn");
// const { verifyDetails } = require("../controllers/wholeseller/verifyDetails");
// const { forgotPassword } = require("../controllers/wholeseller/forgotpassword");
// const fetchuser = require("../middlewares/fetchuser");

// Route to create a user.
router.post("/SignUp", createUser);

// Route to sign in a wholeseller
router.post("/Signin", SignIn);

// Route to verify the details of the user
// router.post("/verifyDetails", verifyDetails);

// Router to forgot the password of the user
// router.put("/forgotpassword/:id", forgotPassword);

//Route to test the fetch user api
// router.post("/fetchuser", fetchuser);

module.exports = router;
