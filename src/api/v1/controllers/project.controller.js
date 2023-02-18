const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const createProject = asyncHandler(async (req, res) => {
  try {
    let { name, description, vendor_id, client_id, solution_id,representative_id,sector_id } = req.body;
console.log(req.body);
    solutionss = []
    solution_id.map((id) => {
      let obj = {
        "id": id 
      }
      solutionss.push(obj)
    })
    console.log(typeof(solutions))

    // representative_infos = []

    // representative_id.map((id) => {
    //   let obj = {
    //     "id": id 
    //   }
    //   representative_infos.push(obj)
    // })
    console.log(typeof(representative_info))

    vendorss = []

    vendor_id.map((id) => {
      let obj = {
        "id": id 
      }
      vendorss.push(obj)
    })
    console.log(typeof(vendors))
    const project = await prisma.project.create({
      data: {
        name: name,
        description: description,
        client_id: Number(client_id),
        sector_id: Number(sector_id),
        created_by:req.authUser.id,
        created_at:new Date(),
        representative_id: Number(representative_id),
        solutions:{
          connect: solutionss
        },
        vendors:{
          connect: vendorss
        },
        // representative_info:{
        //   connect: representative_infos
        // },
        // connect:{project_solution:{solution_id: solution.id, project_id: project.id}}
    
        // project_solution: [{
        //   solution_id:1,
        //   project_id:2

        //  } ]

      }
  })
  console.log(typeof(client_id));
  if (project) {
      return res.status(201).json({
        success: true,
        status: 201,
        // accessToken: (project._id),
        message: "project created successfully!!!",
        data: project,
      });
    }
  } catch (error) {
  //  console.log(error);
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allProjects = asyncHandler(async (req, res) => {
  try {
    const project = await prisma.project.findMany({
      where:{
        is_deleted:false
           },
      select: {
        id:true,
        // logo:true
        // website:true,
        // email:true,
        // contact_phonetrue:true,
        name:true,
        description:true,
        is_deleted: false,
        // client:true,
        solutions:{
          where:{
          is_deleted:false
          }
        },
        vendors:{
          where:{
          is_deleted:false
          }
        },
        clients:true
        // clients:{
        //  where:{
        //  is_deleted:false
        //          }
        // }

      },
     
    });
    // if(project?.is_deleted === true){
    //      res.status(409).json({
    //       success:false,
    //       message:"Project Not Found"
    //      })
    // }
    if(project?.is_deleted === true){
      res.status(409).json({
        success:false,
        message: "department Not Found"
      })
    }
    console.log(project,"project data");
    if(project?.is_deleted === true){
      res.status(409).json({
        success:false,
        message: "project Not Found"
      })
    }
    if (project) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `All Project find successfully!!!`,
        data: project,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});


const oneProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findFirst({
      where: {
        id:Number(id),
      },
      select: {
        id:true,
        name:true,
        description:true,
        is_deleted:false,
        solutions:true,
        vendors:true,
        clients:true
      }
    });
    // console.log(project?.is_deleted === true);
    if(project?.is_deleted === true){
      res.status(409).json({
        success:false,
        message: "Project Not Found"
      })
    }
    if (project) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${project.name} find successfully!!!`,
        data: project,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const updateProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let { name } = req.body;
    const project = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        updated_by:req.authUser.id,
        updated_at:new Data()

      },
    });
    if(project?.is_deleted === true){
      res.status(409).json({
        success:false,
        message: "Project already exist"
      })
    }
    if (project) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "Project updated successfully!!!",
        data: project,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
try{
  const is_deleted =true
  const project = await prisma.project.findUniqueOrThrow({
    where: {
id: Number(id)
    },
  });
  // console.log(project?.is_deleted === true, "false")

if(project?.is_deleted === true){
  res.status(400).json({
    success: true,
    message:"Project Not Found"
  })
}

const deleteproject = await prisma.project.update({
  where: {
    id: Number(id),
  },
  data: {
    is_deleted: is_deleted
  },
});
if (deleteproject) {
  res.status(201).json({
    success: true,
    message: `project deleted successfully`
  })
}
else {
  res.status(400).json({
    success: false,
    message: "Something wrong please try again"
  });
}
}catch (error) {
  res.status(400).json({
    error: error,
    message: error.code,
  });


}


  // const project = await prisma.project.delete({
  //   where: {
  //     id: Number(id),
  //   },
  // });
  // if (project) {
  //   return res.status(201).json({
  //     success: true,
  //     status: 201,
  //     message: `${project.name} deleted successfully!!!`,
  //     data: project,
  //   });
  // }
});
  

module.exports = {
  createProject,
  oneProject,
  allProjects,
  updateProject,
  deleteProject,
};
