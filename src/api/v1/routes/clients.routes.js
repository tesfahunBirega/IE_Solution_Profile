const express = require("express");
// const connection = require("../connection");
const clientRoute = express.Router();

const {
  createClient,
  allClients,
  oneClient,
  updateClient,
  deleteClient,
  findAllByClientId,
 
} = require("../controllers/client.controller");

/**
 * @swagger
 * client/create:
 *   post:
 *     tag:
 *         -cleintCreate
 *            description: Retrieve a client of clients from JSONPlaceholder.
 *     response:
*            200:
*            description:   App is up and running
 */
clientRoute.post("/create", createClient);
/**
 * @swagger
 * client/all-clients:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder clients.
 *     description: Retrieve a list of clients from JSONPlaceholder.
 */
clientRoute.get("/all-clients", allClients);
/**
 * @swagger
 * client/one-client:
 *   get:
 *     summary: Retrieve a client of JSONPlaceholder clients.
 *     description: Retrieve a client of clients from JSONPlaceholder.
 */
clientRoute.get("/one-client/:id", oneClient);
clientRoute.get("/project-client/:id", findAllByClientId);

/**
 * @swagger
 * client/update/:id:
 *   put:
 *     summary: update a client of JSONPlaceholder clients.
 *     description: update a list of clients from JSONPlaceholder.
 */
clientRoute.put("/update/:id", updateClient);
/**
 * @swagger
 * client/delete/:id:
 *   delete:
 *     summary: delete a client of JSONPlaceholder clients.
 *     description: delete a list of clients from JSONPlaceholder.
 */
clientRoute.delete("/delete/:id", deleteClient);

clientRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is clienttttt read page</h1>");
});

module.exports = clientRoute;



// module.exports = clientRoute;
