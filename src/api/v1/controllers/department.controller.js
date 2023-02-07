const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createDepartment = asyncHandler(async (req, res) => {
  try {
    let { name,description } = req.body;

    const department = await prisma.department.create({
      data: {
        name: name,
        description:description,
        logo:req.file.filename,
        // updated_by:updated_by,
        created_by:req.authUser.id,
        created_at:new Date()


      }, 

    });
// console.log(projectFill)
    if (department) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "department created successfully!!!",
        data: department,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allDepartment = asyncHandler(async (req, res) => {
    try {
      const department = await prisma.department.findMany({
        where: {
      is_deleted: false
        }
      });
      if (department) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All department find successfully!!!`,
          data: department,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneDepartment = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const projectFill = await prisma.department.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if(department?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "department Not Found"
        })
      }
      if (department) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${department.name} find successfully!!!`,
          data: department,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateDepartment = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name, email } = req.body;
      const department = await prisma.department.update({
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
      if(department?.isdeleted === true){
        res.status(409).json({
          success:false,
          message: "department Not Found"
        })
      }
      if (department) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "department updated successfully!!!",
          data: department,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteDepartment = asyncHandler(async (req, res) => {
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
  createDepartment,
  oneDepartment,
  allDepartment,
  updateDepartment,
  deleteDepartment,
};
