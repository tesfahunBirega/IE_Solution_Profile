const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
// const partnerRoute = require("../routes/partner.routes")
const { request } = require("express");

const prisma = new PrismaClient();

const createPartner = asyncHandler(async(req, res) => {

    try{
        let { partner,name } = req.body;
// console.log(certeficate);
console.log("req.body below");
        const partners = await prisma.partner.create({
            data: {
              name:name,
              partner:req.file.filename,
              created_by:req.authUser.id,
          created_at:new Date()

            }
        });
        if(partners){
            return res.status(201).json({
                success:true,
                status:201,
                message: "partner created successfully!!!",
                data: partners,
            });
        }
    }catch(error){
        res.status(400).json({
            error: error,
            message:error.code,
        });
    }
});

const allPartner = asyncHandler(async (req, res) => {
   try{
    const partner = await prisma.partner.findMany({
      select:{
        id:true,
        name:true,
        partner:true

      },    
      where:{
      is_deleted:false
      }
    });

    if(partner){
        return res.status(201).json({
            success:true,
            status:201,
            message: `All partner find Successfully`,
            data:partner
        });
    }
}catch(error){
    res.status(400).json({
        error:error,
        message: error.code
    })
}
})
const onePartner = asyncHandler(async (req, res) => {
    // const is_deleted = true
    try {
      const { id } = req.params;
      const partner = await prisma.partner.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (partner?.is_deleted === true) {
        res.status(409).json({
          success: false,
          message: "partner Not Found"
        })
  
        console.log(client,"this is client")
      }
      if (partner) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${partner.partner} find successfully!!!`,
          data: partner,
        });
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          message: `partner not found!`,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  const updatePartner = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(req.authUser)
      let  { partner,name } = req.body;

      // console.log(certficate);
      const partners = await prisma.partner.update({
        where: {
          id: Number(id),
        },
        data: {
          name:name,
          partner: req.file.filename,
          updated_by:req.authUser.id,
          updated_at:new Date()
        },
      });
      if (partner?.is_deleted === true) {
        res.status(409).json({
          success: false,
          message: "Partner Not Found"
        })
      }
      if (partners) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Partner updated successfully!!!",
          data: partners,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  const deletePartner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(req, "request from client")
    try {
      const is_deleted = true
  
      const partner = await prisma.partner.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      console.log(partner?.is_deleted === true, "false")
  
      if (partner?.is_deleted === true) {
        res.status(409).json({
          success: false,
          message: "partner Not Found"
        })
  
      }
  
      const deletePartner = await prisma.partner.update({
        where: {
          id: Number(id),
        },
        data: {
          is_deleted: is_deleted
        },
      });
  
      if (deletePartner) {
        res.status(201).json({
          success: true,
          message: `partner deleted successfully`
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
    createPartner,
    allPartner,
    onePartner,
    updatePartner,
    deletePartner};