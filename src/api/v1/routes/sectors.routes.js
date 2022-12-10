const express = require("express");
// const connection = require("../connection");
const sectorRoute = express.Router();

const {
  createSector,
  allSectors,
  oneSector,
  updateSector,
  deleteSector
 
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
 sectorRoute.put("/update/:id", updateSector);
 sectorRoute.delete("/delete/:id", deleteSector);

 sectorRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is sectorssssssssss read page</h1>");
});

module.exports = sectorRoute;