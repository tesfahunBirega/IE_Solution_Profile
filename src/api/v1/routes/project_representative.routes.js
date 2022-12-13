const express = require("express");
// const connection = require("../connection");
const project_representativeRoute = express.Router();

const {
  createProject_representative,
//   allClients,
//   oneClient,
//   updateClient,
//   deleteClient
 
} = require("../controllers/project_representative.controller");

/**
 * @swagger
 * user/all-users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 */
project_representativeRoute.post("/create", createProject_representative);
// clientRoute.get("/all-clients", allClients);
// clientRoute.get("/one-client/:id", oneClient);
// clientRoute.put("/update/:id", updateClient);
// clientRoute.delete("/delete/:id", deleteClient);

project_representativeRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is clienttttttttt read page</h1>");
});

module.exports = project_representativeRoute;