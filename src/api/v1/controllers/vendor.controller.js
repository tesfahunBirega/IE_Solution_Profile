const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createVendor = asyncHandler(async (req, res) => {
  try {
    let { name, description } = req.body;

    const vendor = await prisma.vendors.create({
      data: {
        name: name,
        description: description,

      },
    });

    if (vendor) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "Vendor created successfully!!!",
        data: vendor,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allVendors = asyncHandler(async (req, res) => {
    try {
      const vendor = await prisma.vendors.findMany();
      if (vendor) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All Vendor find successfully!!!`,
          data: vendor,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneVendor = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const vendor = await prisma.vendors.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (vendor) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${vendor.name} find successfully!!!`,
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
  
  const updateVendor = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name, email } = req.body;
      const vendor = await prisma.vendors.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email,
        },
      });
      if (vendor) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Vendor updated successfully!!!",
          data: vendor,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteVendor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const vendor = await prisma.vendors.delete({
      where: {
        id: Number(id),
      },
    });
    if (vendor) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${vendor.name} deleted successfully!!!`,
        data: vendor,
      });
    }
  });
module.exports = {
  createVendor,
  oneVendor,
  allVendors,
  updateVendor,
  deleteVendor,
};
