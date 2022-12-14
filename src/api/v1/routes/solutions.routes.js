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
 * solution/create:
 *   post:
 *     summary: Create Solution.
 *     description: Create Solution.
 */
 solutionRoute.post("/create", createSolution);
 /**
 * @swagger
 * solution/all-solutions:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder solutions.
 *     description: Retrieve a list of solutions from JSONPlaceholder.
 */
 solutionRoute.get("/all-solutions", allSolutions);
  /**
 * @swagger
 * solution/one-solution:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder solutions.
 *     description: Retrieve a list of solutions from JSONPlaceholder.
 */
 solutionRoute.get("/one-solution/:id", oneSolution);
  /**
 * @swagger
 * solution/update/:id:
 *   put:
 *     summary: update a list of JSONPlaceholder solutions.
 *     description: update a list of solutions from JSONPlaceholder.
 */
 solutionRoute.put("/update/:id", updateSolution);
   /**
 * @swagger
 * solution/delete/:id:
 *   put:
 *     summary: delete a list of JSONPlaceholder solutions.
 *     description: delete a list of solutions from JSONPlaceholder.
 */
 solutionRoute.delete("/delete/:id", deleteSolution);

 solutionRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is solutionsssssssssssss read page</h1>");
});

module.exports = solutionRoute;