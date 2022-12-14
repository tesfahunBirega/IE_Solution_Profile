const express = require("express");
// const connection = require("../connection");
const projectRoute = express.Router();

const {
  createProject,
  allProjects,
  oneProject,
  updateProject,
  deleteProject
 
} = require("../controllers/project.controller");

/**
 * @swagger
 * project/create:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder projects.
 *     description: Retrieve a list of projects from JSONPlaceholder.
 */
projectRoute.post("/create", createProject);
/**
 * @swagger
 * project/all-projects:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder projects.
 *     description: Retrieve a list of projects from JSONPlaceholder.
 */
projectRoute.get("/all-projects", allProjects);
/**
 * @swagger
 * project/one-project/:id:
 *   get:
 *     summary: Retrieve a project of JSONPlaceholder projects.
 *     description: Retrieve a project of projects from JSONPlaceholder.
 */
projectRoute.get("/one-project/:id", oneProject);
/**
 * @swagger
 * project/update/:id:
 *   put:
 *     summary: update a project of JSONPlaceholder projects.
 *     description: update a project of projects from JSONPlaceholder.
 */
projectRoute.put("/update/:id", updateProject);
/**
 * @swagger
 * project/delete/:id:
 *   delete:
 *     summary: delete a project of JSONPlaceholder projects.
 *     description: delete a project of projects from JSONPlaceholder.
 */
projectRoute.delete("/delete/:id", deleteProject);

projectRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is Projectttttt read page</h1>");
});

module.exports = projectRoute;