const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);
const productos = require("../models/productsModel");

router.get("/", async (req, res) => {
    const data = await productos.getProducts();
    const products = data.map((row) => {
        const imageURL = cloudinary.url(row.Imagen, {
            width: 320,
            height: 150,
            crop: "fill",
        });

        return {
            ...row,
            imageURL
        };
    });


    res.render("tableProducts", {
        products
    });
});


module.exports = router;