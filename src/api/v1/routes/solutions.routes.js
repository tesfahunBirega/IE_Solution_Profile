const express = require("express");
// const connection = require("../connection");
const solutionRoute = express.Router();
const multer = require("multer");
const path = require('path');
const { authMiddleware } = require("../middleware/authMiddleware")

const storage = multer.diskStorage({
  destination:"public",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const uploade = multer({storage})

const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateSolutionValidator,createSolutionValidation } = require("../validators/solutionValidor");

const {
  createSolution,
  oneSolution,
  allSolutions,
  updateSolution,
  deleteSolution
 
} = require("../controllers/solution.controller");

 solutionRoute.post("/create",uploade.single("logo"),authMiddleware,createSolution);
 solutionRoute.get("/", allSolutions);
 solutionRoute.get("/:id", oneSolution);
 solutionRoute.patch("/:id",authMiddleware,updateSolution);
 solutionRoute.delete("/:id",uploade.single("logo"),authMiddleware, deleteSolution);
 solutionRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is solutionsssssssssssss read page</h1>");
});

module.exports = solutionRoute;