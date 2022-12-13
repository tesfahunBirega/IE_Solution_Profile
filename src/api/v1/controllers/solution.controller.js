const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createSolution = asyncHandler(async (req, res) => {
  try {
    let {name, logo, email, contact_no  } = req.body;

    const solution = await prisma.solutions.create({
      data: {
        name: name,
        logo:logo,
        email:email,
        contact_no
      },
    });

    if (solution) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "solution created successfully!!!",
        data: solution,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allSolutions = asyncHandler(async (req, res) => {
    try {
      const solution = await prisma.solutions.findMany();
      if (solution) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All solution find successfully!!!`,
          data: solution,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneSolution = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const solution = await prisma.solutions.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (solution) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${solution.name} find successfully!!!`,
          data: solution,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateSolution = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name, email } = req.body;
      const solution = await prisma.solutions.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email,
        },
      });
      if (solution) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Solution updated successfully!!!",
          data: solution,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteSolution = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const solution = await prisma.solutions.delete({
      where: {
        id: Number(id),
      },
    });
    if (solution) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${solution.name} deleted successfully!!!`,
        data: solution,
      });
    }
  });
module.exports = {
  createSolution,
  oneSolution,
  allSolutions,
  updateSolution,
  deleteSolution,
};
