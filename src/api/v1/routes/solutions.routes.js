const express = require("express");
// const connection = require("../connection");
const solutionRoute = express.Router();

const {
  createSolution,
  oneSolution,
  allSolutions,
  updateSolution,
  deleteSolution
 
} = require("../controllers/solution.controller");

/**
 * @swagger
 * user/all-users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 */
 solutionRoute.post("/create", createSolution);
 solutionRoute.get("/all-projects", allSolutions);
 solutionRoute.get("/one-project/:id", oneSolution);
 solutionRoute.put("/update/:id", updateSolution);
 solutionRoute.delete("/delete/:id", deleteSolution);

 solutionRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is solutionsssssssssssss read page</h1>");
});

module.exports = solutionRoute;