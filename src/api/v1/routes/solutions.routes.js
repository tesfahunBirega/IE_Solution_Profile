const express = require("express");
// const connection = require("../connection");
const solutionRoute = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware")

const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateSolutionValidator,createSolutionValidation } = require("../validators/solutionValidor");

const {
  createSolution,
  oneSolution,
  allSolutions,
  updateSolution,
  deleteSolution
 
} = require("../controllers/solution.controller");

 solutionRoute.post("/create",createSolution);
 solutionRoute.get("/", allSolutions);
 solutionRoute.get("/:id", oneSolution);
 solutionRoute.patch("/:id", updateSolutionValidator, validationMiddleware,updateSolution);
 solutionRoute.delete("/:id", deleteSolution);
 solutionRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is solutionsssssssssssss read page</h1>");
});

module.exports = solutionRoute;