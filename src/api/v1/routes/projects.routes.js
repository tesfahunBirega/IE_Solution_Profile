const express = require("express");
// const connection = require("../connection");
const projectRoute = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware")
const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateProjectValidator,createProjectValidation } = require("../validators/projectValidoter");
const {
  createProject,
  allProjects,
  oneProject,
  updateProject,
  deleteProject
 
} = require("../controllers/project.controller");

projectRoute.post("/create",authMiddleware,createProjectValidation,validationMiddleware, createProject);

projectRoute.get("/", allProjects);

projectRoute.get("/:id", oneProject);

projectRoute.patch("/:id",authMiddleware, updateProjectValidator, validationMiddleware,updateProject);

projectRoute.delete("/:id",authMiddleware, deleteProject);

projectRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is Projectttttt read page</h1>");
});

module.exports = projectRoute;