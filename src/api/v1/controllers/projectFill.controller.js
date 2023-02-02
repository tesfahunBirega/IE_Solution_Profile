const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createProjectFill = asyncHandler(async (req, res) => {
  try {
    let { name,description } = req.body;

    const projectFill = await prisma.projectFill.create({
      data: {
        name: name,
        description:description,
        // updated_by:updated_by,
        created_by:req.authUser.id,
        created_at:new Date()


      }, 

    });
// console.log(projectFill)
    if (projectFill) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "projectFill created successfully!!!",
        data: projectFill,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allProjectFill = asyncHandler(async (req, res) => {
    try {
      const projectFill = await prisma.projectFill.findMany({
        whrere: {
      is_deleted: false
        }
      });
      if (projectFill) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All projectFill find successfully!!!`,
          data: projectFill,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneProjectFill = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const projectFill = await prisma.projectFill.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if(projectFill?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "Project Not Found"
        })
      }
      if (projectFill) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${projectFill.name} find successfully!!!`,
          data: projectFill,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateProjectFill = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name, email } = req.body;
      const projectFill = await prisma.projectFill.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email,
          updated_by: req.authUser.id,
          created_at:new Date()
        },
      });
      if(projectFill?.isdeleted === true){
        res.status(409).json({
          success:false,
          message: "project Not Found"
        })
      }
      if (projectFill) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "projectFill updated successfully!!!",
          data: projectFill,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteProjectFill = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const projectFill = await prisma.projectFill.delete({
      where: {
        id: Number(id),
      },
    });
    if(projectFill?.isdeleted === true){
      res.status(409).json({
        success:false,
        message: "project Not Found"
      })
    }
    if (projectFill) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${projectFill.name} deleted successfully!!!`,
        data: projectFill,
      });
    }
  });
module.exports = {
  createProjectFill,
  oneProjectFill,
  allProjectFill,
  updateProjectFill,
  deleteProjectFill,
};
