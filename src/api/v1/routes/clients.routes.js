const express = require("express");
const clientRoute = express.Router();

const {createClient} = require("../controllers/client.controller");

/**
 * @swagger
 * client/all-clients:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder clients.
 *     description: Retrieve a list of clients from JSONPlaceholder.
 */
clientRoute.post("/create ", createClient);
clientRoute.get("/all-clients", );
clientRoute.get("/one-user/:id", );
clientRoute.put("/update/:id", );
clientRoute.delete("/delete/:id",);

clientRoute.get("/test", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("This is Client Test page");
});

module.exports = clientRoute;
