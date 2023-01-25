const express = require("express");
// const connection = require("../connection");
const representativeRoute = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware")

const {
  createRepresentative,
  allRepresentatives,
  oneRepresentative,
  updateRepresentative,
  deleteRepresentative
 
} = require("../controllers/represntative.controller");
const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateRepresentativeValidator,createeRepresentativeValidation } = require("../validators/representativeValidor");

 representativeRoute.post("/create",createRepresentative);

 representativeRoute.get("/", allRepresentatives);
 representativeRoute.get("/:id", oneRepresentative);
 representativeRoute.patch("/:id", updateRepresentativeValidator, validationMiddleware,updateRepresentative);
 representativeRoute.delete("/:id", deleteRepresentative);
 representativeRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is representativessssssssss read page</h1>");
});

module.exports = representativeRoute;