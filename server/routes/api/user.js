const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Load User model
const User = require("../../models/User");

// @route GET api/user/auth
// @description tests user route
// @access Public
router.get("/test", (req, res) => res.send("auth endpoint works!"));

// @route GET api/user
// @description register user
// @access Public
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, userName } = req.body;
  const data = { firstName, lastName, userName, email, password };

  const checkIfUserAlreadyExists = await User.findOne({ userName: userName });
  if (checkIfUserAlreadyExists) {
    res.send({
      message: "Username is taken, please choose a different name",
      userExists: true,
    });
  } else {
    // hasing the password before saving to DB
    const bcryptSaltRounds = 10;
    const hashedpassword = await bcrypt.hash(data.password, bcryptSaltRounds);
    data.password = hashedpassword;

    const userInserted = await User.insertMany(data);

    if (userInserted) {
      res.send({
        message: "Successfully, Created a user record",
        userExists: false,
      });
    }
  }
});

// @route GET api/auth
// @description login user
// @access Public
router.post("/login", async (req, res) => {
  const { password, userName } = req.body;
  const data = { userName, password };
  // try {
  const checkIfUserExists = await User.findOne({ userName: userName });
  if (!checkIfUserExists) {
    res.send({
      message: "There is no record assocaited with the username",
      userExists: false,
    });
  } else {
    const comparePasswordsMatch = await bcrypt.compare(
      password,
      checkIfUserExists.password
    );

    if (comparePasswordsMatch) {
      res.send({
        message: "User logged in successfully ",
        passwordMatch: true,
        user: checkIfUserExists,
      });
    } else {
      res.send({
        message: "Password did not match",
        passwordMatch: false,
      });
    }
  }
});

module.exports = router;
