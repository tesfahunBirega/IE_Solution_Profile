const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createClient = asyncHandler(async (req, res) => {
  try {
    let { name, email, contact_no, address, website, logo } = req.body;

    const client = await prisma.clients.create({
      data: {
        name: name,
        logo: logo,
        website: website,
        email: email,
        contact_no: contact_no,
        address: address,

      },
    });

    if (client) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "client created successfully!!!",
        data: client,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allClients = asyncHandler(async (req, res) => {
    try {
      const client = await prisma.clients.findMany();
      if (client) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All Clients find successfully!!!`,
          data: client,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneClient = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const client = await prisma.clients.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (client) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${client.name} find successfully!!!`,
          data: client,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateClient = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name, email  } = req.body;
      const client = await prisma.clients.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email
        },
      });
      if (client) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "client updated successfully!!!",
          data: client,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteClient = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const client = await prisma.clients.delete({
      where: {
        id: Number(id),
      },
    });
    if (client) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${client.name} deleted successfully!!!`,
        data: client,
      });
    }
  });
module.exports = {
  createClient,
  oneClient,
  allClients,
  updateClient,
  deleteClient,
};
