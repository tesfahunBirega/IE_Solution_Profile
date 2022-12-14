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
 * sector/create:
 *   get:
 *     summary: Create sectors.
 *     description: Create Sector.
 */
 sectorRoute.post("/create", createSector);
 /**
 * @swagger
 * sector/all-sectors:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder sector.
 *     description: Retrieve a list of sector from JSONPlaceholder.
 */
 sectorRoute.get("/all-sectors", allSectors);
 /**
 * @swagger
 * sector/one-sectors:
 *   get:
 *     summary: Retrieve a sector of JSONPlaceholder sectors.
 *     description: Retrieve a list of sectors from JSONPlaceholder.
 */
 sectorRoute.get("/one-sector/:id", oneSector);
 /**
 * @swagger
 * sector/update/:id:
 *   update:
 *     summary: update a sector of JSONPlaceholder sectors.
 *     description: update a sector of sectors from JSONPlaceholder.
 */
 sectorRoute.put("/update/:id", updateSector);
 /**
 * @swagger
 * sector/delete/:id:
 *   delete:
 *     summary: delete a sector of JSONPlaceholder sectors.
 *     description: delete a sector of sectors from JSONPlaceholder.
 */
 sectorRoute.delete("/delete/:id", deleteSector);

 sectorRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is sectorssssssssss read page</h1>");
});

module.exports = sectorRoute;