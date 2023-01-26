const express = require("express");
// const {storage} = require("./clients.routes")
const multer = require("multer");

// const connection = require("../connection");
const vendorRoute = express.Router();

const path = require('path');

 const storage = multer.diskStorage({
  destination:"public",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const uploade = multer({storage})
const { authMiddleware } = require("../middleware/authMiddleware")


const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateVendorValidator,createVendorValidation } = require("../validators/vendorValidor");
const {
  createVendor,
  allVendors,
  oneVendor,
  updateVendor,
  deleteVendor,
 
} = require("../controllers/vendor.controller");
 vendorRoute.post("/create", uploade.single("logo"), createVendor);
 vendorRoute.get("/", allVendors);
 vendorRoute.get("/:id", oneVendor);
 vendorRoute.patch("/:id", updateVendorValidator, validationMiddleware,updateVendor);
 vendorRoute.delete("/:id", deleteVendor);
 vendorRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is Vendorsssssssssssss read page</h1>");
});

module.exports = vendorRoute;