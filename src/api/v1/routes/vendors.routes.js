const express = require("express");
// const connection = require("../connection");
const vendorRoute = express.Router();
const {
  createVendor,
  allVendors,
  oneVendor,
  updateVendor,
  deleteVendor,
 
} = require("../controllers/vendor.controller");

/**
 * @swagger
 * Vendor/create:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder Vendors.
 *     description: Retrieve a list of Vendors from JSONPlaceholder.
 */
 vendorRoute.post("/create", createVendor);
 /**
 * @swagger
 * vendor/all-vendors:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder vendors.
 *     description: Retrieve a list of vendors from JSONPlaceholder.
 */
 vendorRoute.get("/all-vendors", allVendors);
 /**
 * @swagger
 * vendor/one-vendor:
 *   get:
 *     summary: Search a vendor of JSONPlaceholder vendors.
 *     description:Search a vendor of vendors from JSONPlaceholder.
 */
 vendorRoute.get("/one-vendor/:id", oneVendor);
 /**
 * @swagger
 * vendor/update:
 *   put:
 *     summary: update a vendor of JSONPlaceholder vendors.
 *     description: update a vendor of vendors from JSONPlaceholder.
 */
 vendorRoute.put("/update/:id", updateVendor);
  /**
 * @swagger
 * vendor/delete:
 *   delete:
 *     summary: delete a vendor of JSONPlaceholder vendors.
 *     description: delete a vendor of vendors from JSONPlaceholder.
 */
 vendorRoute.delete("/delete/:id", deleteVendor);

 vendorRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is Vendorsssssssssssss read page</h1>");
});

module.exports = vendorRoute;