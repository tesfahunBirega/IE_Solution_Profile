const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createSolution = asyncHandler(async (req, res) => {
  try {
    let {name, email,description,contact_no,department_id,department  } = req.body;
    console.log(name);

    // department_id = []
    // department.map((id) => {
    //   let obj = {
    //     "id": id 
    //   }
    //   department_id.push(obj)
    // })
    console.log(typeof(department_id));
    const solution = await prisma.solutions.create({
      data: {
        name: name,
        description: description,
        department_id:department,
        logo:req.file.filename,
        // email:email,
        // contact_no:contact_no,
        created_by:req.authUser.id,
        created_at:new Date(),
        // department:{
        //   connect: department_id
        // }
      },
    });
console.log(solution);
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
      const solution = await prisma.solutions.findMany({
        where: {
          is_deleted: false
        }
    });
    if(solution?.is_deleted === true){
      res.status(409).json({
        success:false,
        message: "solution Not Found"
      })
    }
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
      if(solution?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "solution Not Found"
        })
      }
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
      let { name, description } = req.body;
      console.log(name,description);
      const solution = await prisma.solutions.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          description: description,
          logo:req.file.filename,
          updated_by:req.authUser.id,
          updated_at:new Date()
          
        },
      });
      console.log(solution);
      if(solution?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "solution Not Found"
        })
      }
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
    try {
      const is_deleted = true
    
      const solution = await prisma.solutions.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      console.log(solution?.is_deleted === true, "false")
      
      if(solution?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "solution Not Found"
        })
      }
      const deletesolutions = await prisma.solutions.update({
        where: {
          id: Number(id),
        },
        data: {
          is_deleted: is_deleted
        },
      });
  
      if (deletesolutions) {
        res.status(201).json({
          success: true,
          message: `solutions deleted successfully`
        })
      }
      else {
        res.status(400).json({
          success: false,
          message: "Something gose wrong please try again"
        });
      }
  
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
  
  
    }
    // const solution = await prisma.solutions.delete({
    //   where: {
    //     id: Number(id),
    //   },
    // });
    // if (solution) {
    //   return res.status(201).json({
    //     success: true,
    //     status: 201,
    //     message: `${solution.name} deleted successfully!!!`,
    //     data: solution,
    //   });
    // }
  });
module.exports = {
  createSolution,
  oneSolution,
  allSolutions,
  updateSolution,
  deleteSolution,
};
