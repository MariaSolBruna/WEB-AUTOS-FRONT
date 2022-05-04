"use strict"
const express = require("express");
const router = express.Router();
const productos = require("../models/productsModel");
const {
  body,
  validationResult
} = require("express-validator");
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("secret", {
    user: req.session.user
  });
});

router.get("/", async (req, res) => {
  const data = await productos.getProducts();

  res.render("secret", {
    data
  });
});

router.get("/", (req, res) => {
  res.render("secret");
});


const validationRules = [
  body("name", "Debe ingresar su nombre").exists().isLength({
    min: 2
  }),
  body("lastName", "Debe ingresar su apellido").exists().isLength({
    min: 2
  }),
  body("email", "Debe ingresar su email").exists().isEmail(),
  body("phone", "Debe ingresar un teléfono valido").exists().isLength({
    min: 6
  }),
  body("city", "Debe ingresar su ciudad").exists().isLength({
    min: 2
  }),
  body("location", "Debe ingresar su localidad").exists().isLength({
    min: 2
  }),

  //body("message", "Su mensaje debe contener entre 10 y 200 caracteres") .exists() .isLength({mix:10, max:200}),
];

router.post("/", validationRules, async (req, res) => {
  //Encontramos los errores de validación en la request y los envolvemos en un objeto con funciones que provee express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formData = req.body;
    const arrWarnings = errors.array()
    res.render("secret", {
      formData,
      arrWarnings
    });

  } else {
    const emailMsg = {
      to: "atencioncliente@empresaaaaa.com",
      from: req.body.email,
      subject: "Mensaje desde formulario",
      html: `Un usuario está interesado/a en adquirir un producto. Datos de contacto:
     Nombre: ${req.body.name}.
     Apellido: ${req.body.lastName}.
     Email: ${req.body.email}.
     Telefono: ${req.body.phone}.
     Ciudad: ${req.body.city}.
     Localidad: ${req.body.location}.
     Sucursal de preferencia: ${req.body.store}.`
    };

    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "61475320ff436f",
        pass: "acab6e1e646fa5"
      },
    });

    const sendMailStatus = await transport.sendMail(emailMsg);
    let statusMessage = "";
    if (sendMailStatus.rejected.length) {
      statusMessage = "NO PUDIMOS ENVIAR SU MENSAJE. INTENTE NUEVAMENTE"
    } else {
      statusMessage = "MENSAJE ENVIADO. EN BREVE SERAS CONTACTADO POR UN ASESOR."
    }
    res.render("secret", {
      statusMessage
    });
  }
});


module.exports = router;