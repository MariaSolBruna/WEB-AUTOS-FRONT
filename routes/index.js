"use strict"
const express = require("express");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const router = express.Router();
const productos = require("../models/productsModel");
const productsModel = require("../models/productsModel")

module.exports = router;