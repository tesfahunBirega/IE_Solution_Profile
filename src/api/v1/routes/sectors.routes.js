const express = require("express");
// const connection = require("../connection");
const sectorRoute = express.Router();

const {
  createSector,
  allSectors,
  oneSector
 
} = require("../controllers/sector.controller");

/**
 * @swagger
 * user/all-users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 */
 sectorRoute.post("/create", createSector);
 sectorRoute.get("/all-projects", allSectors);
 sectorRoute.get("/one-project/:id", oneSector);

 sectorRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is sectorssssssssss read page</h1>");
});

module.exports = sectorRoute;