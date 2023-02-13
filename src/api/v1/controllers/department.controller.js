const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createDepartment = asyncHandler(async (req, res) => {
  try {
    console.log("object");
    let { name,description } = req.body;
console.log(req.body);
    const department = await prisma.department.create({
      data: {
        name:name,
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
      const department = await prisma.department.findUniqueOrThrow({
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
      let { name, description } = req.body;
      const department = await prisma.department.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          logo: req.file.filename,
          description:description,
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
    // console.log(req, "request from client")
    try {
      const is_deleted = true
  
      const department = await prisma.department.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      console.log(department?.is_deleted === true, "false")
  
      if (department?.is_deleted === true) {
        res.status(409).json({
          success: false,
          message: "department Not Found"
        })
  
      }
  
      const deletedepartment = await prisma.department.update({
        where: {
          id: Number(id),
        },
        data: {
          is_deleted: is_deleted
        },
      });
  
      if (deletedepartment) {
        res.status(201).json({
          success: true,
          message: `department deleted successfully`
        })
      }
      else {
        res.status(400).json({
          success: false,
          message: "Something wrong please try again"
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
  createDepartment,
  oneDepartment,
  allDepartment,
  updateDepartment,
  deleteDepartment,
};
