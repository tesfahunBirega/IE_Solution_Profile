const express = require("express");
// const connection = require("../connection");
const vendorRoute = express.Router();

const {
  createVendor,
  allVendors,
  oneVendor,
 
} = require("../controllers/vendor.controller");

/**
 * @swagger
 * user/all-users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 */
 vendorRoute.post("/create", createVendor);
 vendorRoute.get("/all-projects", allVendors);
 vendorRoute.get("/one-project/:id", oneVendor);

 vendorRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is Vendorsssssssssssss read page</h1>");
});

module.exports = vendorRoute;