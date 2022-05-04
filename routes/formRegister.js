const express = require("express");
const router = express.Router();
const md5 = require("md5");
const modelUsers = require("../models/modelUsers");

router.get("/", (req, res) => {
  res.render("formRegister");
});

router.post("/", (req, res) => {
  const {
    userName,
    email,
    userPass
  } = req.body;
  const data = {
    userName,
    email,
    userPass: md5(userPass),
  }
  console.log(data);
  modelUsers.addUser(data);
  res.redirect("/");
});


module.exports = router;