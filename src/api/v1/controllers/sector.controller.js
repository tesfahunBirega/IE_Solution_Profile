const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createSector = asyncHandler(async (req, res) => {
  try {
    let { name, description } = req.body;

    const sector = await prisma.sector.create({
      data: {
        name: name,
        description: description,

      },
    });

    if (sector) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "sector created successfully!!!",
        data: sector,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allSectors = asyncHandler(async (req, res) => {
    try {
      const sector = await prisma.sector.findMany();
      if (sector) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All sector find successfully!!!`,
          data: sector,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneSector = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const sector = await prisma.sector.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (sector) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${sector.name} find successfully!!!`,
          data: sector,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  

module.exports = {
  createSector,
  oneSector,
  allSectors,
//   updateUser,
//   deleteUser,
};