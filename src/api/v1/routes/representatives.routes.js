const express = require("express");
// const connection = require("../connection");
const representativeRoute = express.Router();

const {
  createRepresentative,
  allRepresentatives,
  oneRepresentative,
  updateRepresentative,
  deleteRepresentative
 
} = require("../controllers/represntative.controller");

/**
 * @swagger
 * representative/Create:
 *   post:
 *     summary: Create representatives.
 *     description: Create representatives.
 */
 representativeRoute.post("/create", createRepresentative);
 /**
 * @swagger
 * representative/all-representative:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder representatives.
 *     description: Retrieve a list of representative from JSONPlaceholder.
 */
 representativeRoute.get("/all-representative", allRepresentatives);
 /**
 * @swagger
 * representative/one-representative/:id:
 *   get:
 *     summary: Retrieve a representative of JSONPlaceholder representatives.
 *     description: Retrieve a representative of representative from JSONPlaceholder.
 */
 representativeRoute.get("/one-representative/:id", oneRepresentative);
  /**
 * @swagger
 * representative/update/:id:
 *   update:
 *     summary: update a representative of JSONPlaceholder representatives.
 *     description: update a representative of representative from JSONPlaceholder.
 */
 representativeRoute.put("/update/:id", updateRepresentative);
  /**
 * @swagger
 * representative/delete/:id:
 *   delete:
 *     summary: delete a representative of JSONPlaceholder representatives.
 *     description: delete a representative of representative from JSONPlaceholder.
 */
 representativeRoute.delete("/delete/:id", deleteRepresentative);

 representativeRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is representativessssssssss read page</h1>");
});

module.exports = representativeRoute;