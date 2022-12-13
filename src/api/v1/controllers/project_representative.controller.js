const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createProject_representative = asyncHandler(async (req, res) => {
  try {
    let {  project_id, representative_id  } = req.body;

    const project_representative = await prisma.project_representative.create({
      data: {
        project_id: project_id,
        representative_id: representative_id
      },
    });

    if (project_representative) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "project_representative created successfully!!!",
        data: project_representative,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});
// const oneProject = asyncHandler(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const project = await prisma.project.findUniqueOrThrow({
//         where: {
//           id: Number(id),
//         },
//       });
//       if (project) {
//         return res.status(201).json({
//           success: true,
//           status: 201,
//           message: `${project.name} find successfully!!!`,
//           data: project,
//         });
//       }
//     } catch (error) {
//       res.status(400).json({
//         error: error,
//         message: error.code,
//       });
//     }
//   });
module.exports = {
    createProject_representative
    // oneClient,
    // allClients,
    // updateClient,
    // deleteClient,
  };
  