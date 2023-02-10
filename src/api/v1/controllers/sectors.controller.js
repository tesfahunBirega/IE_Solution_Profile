const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response, connect } = require("..");

const prisma = new PrismaClient();

const createSector = asyncHandler(async (req, res) => {
  try {
    let  {name} = req.params.name;
    console.log(name);
    const sectors = await prisma.sectors.create({
      data: {
        name: req.body.name,
        created_by:req.authUser.id,
        created_at:new Date()

      },
    });
console.log(sectors);
    if (sectors) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "sectors created successfully!!!",
        data: sectors,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

// const createSector=(request,response)=>{
//     const name=request.body.name;
//     const created_by=request.authUser.id;
//     const created_at=new Date();
//     connect.query("INSERT INTO `sectors`(`name`, `created_by`, `created_at`) VALUES ('?,?,?')",[name,created_by,created_at],(err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             response.send(result)
//         }
//     })
// }
const allSector = asyncHandler(async (req, res) => {
    try {
      const sectors = await prisma.sectors.findMany({
        select: {
          id:true,
          name:true,
         
        },
        where:{
            is_deleted:false
        }
      });
      // console.log(representative);
      if (sectors) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All sectors find successfully!!!`,
          data: sectors,
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
      const sectors = await prisma.sectors.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if(sectors?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "sectors Not Found"
        })
      }
      if (sectors) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${sectors.name} find successfully!!!`,
          data: sectors,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateSector = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name} = req.body;
      const sectors = await prisma.sectors.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          updated_by:req.authUser.id,
          updated_at:new Date()

        },
      });
      if(sectors?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "sector Not Found"
        })
      if (representative) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "sector updated successfully!!!",
          data: representative,
        });
      }}
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteSector = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const is_deleted = true
    
      const sectors = await prisma.sectors.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      console.log(sectors?.is_deleted === true, "false")
      
      if(sectors?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "sector Not Found"
        })
      }
      const deletesector = await prisma.sectors.update({
        where: {
          id: Number(id),
        },
        data: {
          is_deleted: is_deleted
        },
      });
  
      if (deletesector) {
        res.status(201).json({
          success: true,
          message: `sector deleted successfully`
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
    // const representative = await prisma.representative_info.delete({
    //   where: {
    //     id: Number(id),
    //   },
    // });
    // if (representative) {
    //   return res.status(201).json({
    //     success: true,
    //     status: 201,
    //     message: `${representative.name} deleted successfully!!!`,
    //     data: representative,
    //   });
    // }
  });
module.exports = {
  createSector,
  oneSector,
  allSector,
  updateSector,
  deleteSector,
};
