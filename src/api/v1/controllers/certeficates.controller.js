const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const certeficateRoute = require("../routes/certeficates.routes")
const { request } = require("express");
const { createUserValidation } = require("../validators/userValidetor");
const { authUser } = require("./user.controller");

const prisma = new PrismaClient();

const createCerteficate = asyncHandler(async(req, res) => {
    try{
      // console.log("create");
        let { certeficate,name } = req.body;
        console.log(name);
// console.log(certeficate);
// console.log("req.body below");
        const certeficates = await prisma.certficate.create({
            data: {
                name:name,
                certeficate:req.file.filename,
                created_by:req.authUser.id,
                created_at:new Date()
            }
        });
        console.log(certeficates);
        if(certeficates){
            return res.status(201).json({
                success:true,
                status:201,
                message: "certeficate created successfully!!!",
                data: certeficates,
            });
        }
    }catch(error){
        res.status(400).json({
            error: error,
            message:error.code,
        });
    }
});

const allCerteficate = asyncHandler(async (req, res) => {
   try{
    const certeficate = await prisma.certficate.findMany({
      select:{
        id:true,
        name:true,
        certeficate:true
      },
where:{
  is_deleted:false
}
    });
    if(certeficate?.is_deleted === true){
      res.status(409).json({
        success:false,
        message: "certeficate Not Found"
      })
    }
    if(certeficate){
        return res.status(201).json({
            success:true,
            status:201,
            message: `All Certeficate find Successfully`,
            data:certeficate
        });
    }
}catch(error){
    res.status(400).json({
        error:error,
        message: error.code
    })
}
})
const oneCerteficate = asyncHandler(async (req, res) => {
    // const is_deleted = true
    try {
      const { id } = req.params;
      const certficate = await prisma.certficate.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (certficate?.is_deleted === true) {
        res.status(409).json({
          success: false,
          message: "certeficates Not Found"
        })
      }
        // console.log(client,"this is client")
    //   }
      if (certficate) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${certficate.name} find successfully!!!`,
          data: certficate,
        });
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          message: `certficate not found!`,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  const updateCerteficate = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(req.authUser)
      let  { certeficate,name} = req.body;

      // console.log(certficate);
      const certeficates = await prisma.certficate.update({
        where: {
          id: Number(id),
        },
        data: {
          name:name,
          certeficate: req.file.filename,
          updated_by:req.authUser.id,
          updated_at:new Date()
        },
      });
      console.log(certeficates);
      if (certeficates?.is_deleted === true) {
        res.status(409).json({
          success: false,
          message: "certeficates Not Found"
        })
      }
      if (certeficates) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "certficate updated successfully!!!",
          data: certeficates,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  const deleteCerteficate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(req, "request from client")
    try {
      const is_deleted = true
  
      const certficate = await prisma.certficate.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      console.log(certficate?.is_deleted === true, "false")
  
      if (certficate?.is_deleted === true) {
        res.status(409).json({
          success: false,
          message: "certficate Not Found"
        })
  
      }
  
      const deletecertficate = await prisma.certficate.update({
        where: {
          id: Number(id),
        },
        data: {
          is_deleted: is_deleted
        },
      });
  
      if (deletecertficate) {
        res.status(201).json({
          success: true,
          message: `certficate deleted successfully`
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
    createCerteficate,
    allCerteficate,
    oneCerteficate,
    updateCerteficate,
    deleteCerteficate};