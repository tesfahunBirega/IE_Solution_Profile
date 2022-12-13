const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createRepresentative = asyncHandler(async (req, res) => {
  try {
    let { name, email, address, contact_1, contact_2, country } = req.body;

    const representative = await prisma.representative_info.create({
      data: {
        name: name,
        email:email,
        address:address,
        contact_1:contact_1,
        contact_2:contact_2,
        country:country

      },
    });

    if (representative) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "project created successfully!!!",
        data: representative,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allRepresentatives = asyncHandler(async (req, res) => {
    try {
      const representative = await prisma.representative_info.findMany();
      if (project) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All Project find successfully!!!`,
          data: representative,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneRepresentative = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const representative = await prisma.representative_info.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (representative) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${project.name} find successfully!!!`,
          data: representative,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateRepresentative = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name, email } = req.body;
      const representative = await prisma.representative_info.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email
        },
      });
      if (representative) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "representative updated successfully!!!",
          data: representative,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteRepresentative = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const representative = await prisma.representative_info.delete({
      where: {
        id: Number(id),
      },
    });
    if (representative) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${representative.name} deleted successfully!!!`,
        data: representative,
      });
    }
  });
module.exports = {
  createRepresentative,
  oneRepresentative,
  allRepresentatives,
  updateRepresentative,
  deleteRepresentative,
};
