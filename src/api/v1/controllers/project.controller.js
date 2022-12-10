const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createProject = asyncHandler(async (req, res) => {
  try {
    let { name, description } = req.body;

    const project = await prisma.project.create({
      data: {
        name: name,
        description: description,

      },
    });

    if (project) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "project created successfully!!!",
        data: project,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allProjects = asyncHandler(async (req, res) => {
    try {
      const project = await prisma.project.findMany();
      if (project) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All Project find successfully!!!`,
          data: project,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneProject = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const project = await prisma.project.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (project) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${project.name} find successfully!!!`,
          data: project,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateProject = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name } = req.body;
      const project = await prisma.project.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
     
        },
      });
      if (project) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Project updated successfully!!!",
          data: project,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const project = await prisma.project.delete({
      where: {
        id: Number(id),
      },
    });
    if (project) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${user.name} deleted successfully!!!`,
        data: project,
      });
    }
  });
module.exports = {
  createProject,
  oneProject,
  allProjects,
  updateProject,
  deleteProject,
};
