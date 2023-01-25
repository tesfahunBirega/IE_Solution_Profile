const express = require("express");
// const connection = require("../connection");
const projectFillRoute = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware")

const {
  createProjectFill,
  allProjectFill,
  oneProjectFill,
  updateProjectFill,
  deleteProjectFill
 
} = require("../controllers/projectFill.controller");

const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateSectorValidator,createSectorValidation } = require("../validators/projectFillValidor");

projectFillRoute.post("/create", createSectorValidation, validationMiddleware, createProjectFill);

projectFillRoute.get("/", allProjectFill);
projectFillRoute.get("/:id", oneProjectFill);
projectFillRoute.patch("/:id", updateSectorValidator, updateSectorValidator,updateProjectFill);
projectFillRoute.delete("/:id" , deleteProjectFill);
projectFillRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is sectorssssssssss read page</h1>");
});

module.exports = projectFillRoute;