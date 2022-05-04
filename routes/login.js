"use strict"
const express = require("express");
const router = express.Router();
const modelUsers = require("../models/modelUsers");

router.get("/", (req, res) => {
   res.render("login");
});

router.get("/logout", (req, res) => {
   req.session.destroy();
   res.redirect("/");
});

router.post("/", async (req, res) => {
   const {
      user,
      pass
   } = req.body;
   const data = await modelUsers.getUser(user, pass);
   if (data != undefined) {
      req.session.user = user;
      res.render("index", {
         user
      });
   } else {
      const message = "Usuario o contraseña incorrectos";
      res.render("Login", {
         message
      });
   }
});

module.exports = router;