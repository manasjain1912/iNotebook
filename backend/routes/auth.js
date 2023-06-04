const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchusers");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "Have$omeNote$";

// ROUTE 1 : Create a user using : POST "api/auth/createUser".Doesn't require authentication
router.post(
  "/createUser",
  [
    body("name", "Name should not be Empty").notEmpty(), // name must not be empty
    body("name", "Name must only contain alphabets").isAlpha(), // name must be a string
    body("email", "Enter a valid email").isEmail(), // email must be an email
    body("password", "Password must contain minimum 8 characters").isLength({
      min: 8,
    }), // password should be minimum of 8 chars
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether user email exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Email has already been taken. Use another email." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Creating new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id, //since id is unique
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2 : Authenticate a user using: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(), // email must be an email
    body("password", "Password cannot be blank").exists(), // password should be minimum of 8 chars
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error:
            "Incorrect Username or Password : Please try to login with credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error:
            "Incorrect Username or Password : Please try to login with credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log({ error: error.message });
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 : Get logged in  user details using: POST "/api/auth/getUser"
router.post(
  "/getUser",
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password"); // getting user details other than password
      res.send(user);
    } catch (error) {
      console.log({ error: error.message });
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
