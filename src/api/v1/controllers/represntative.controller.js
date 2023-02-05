const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createRepresentative = asyncHandler(async (req, res) => {
  try {
    let { name, email, position, contact_1, contact_2, vendor_id, client_id, country } = req.body;
console.log(name);
    const representative = await prisma.representative_info.create({
      data: {
        name: name,
        email:email,
        position:position,
        contact_1:contact_1,
        contact_2:contact_2,
        client_id:client_id,
        vendor_id:vendor_id,
        created_by:req.authUser.id,
        created_at:new Date()

      },
    });
console.log(representative);
    if (representative) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "representative created successfully!!!",
        data: representative,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allRepresentatives = asyncHandler(async (req, res) => {
    try {
      const representative = await prisma.representative_info.findMany({
        select: {
          id:true,
          name:true,
          email:true,
          contact_1:true,
          contact_2:true,
          position:true,
          vendors:true,
          clients:true
        },
        where:{
            is_deleted:false
        }
      });
      // console.log(representative);
      if (representative) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All representative find successfully!!!`,
          data: representative,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneRepresentative = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const representative = await prisma.representative_info.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if(representative?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "representative Not Found"
        })
      }
      if (representative) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${representative.name} find successfully!!!`,
          data: representative,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateRepresentative = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      let { name, email } = req.body;
      const representative = await prisma.representative_info.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email,
          updated_by:req.authUser.id,
          updated_at:new Date()

        },
      });
      if(representative?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "representative Not Found"
        })
      if (representative) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "representative updated successfully!!!",
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
  
  const deleteRepresentative = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const is_deleted = true
    
      const representative = await prisma.representative_info.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      console.log(representative?.is_deleted === true, "false")
      
      if(representative?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "representative Not Found"
        })
      }
      const deleterepresentative = await prisma.representative_info.update({
        where: {
          id: Number(id),
        },
        data: {
          is_deleted: is_deleted
        },
      });
  
      if (deleterepresentative) {
        res.status(201).json({
          success: true,
          message: `representative_info deleted successfully`
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
  createRepresentative,
  oneRepresentative,
  allRepresentatives,
  updateRepresentative,
  deleteRepresentative,
};
