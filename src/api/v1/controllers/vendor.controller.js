const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createVendor = asyncHandler(async (req, res) => {
  try {
    let { name, website, email, contact_phone,address  } = req.body;
console.log(req.body.name);
// console.log(name,website,email,contact_phone,address);
    const vendor = await prisma.vendors.create({
      data: {
        name: name,
        logo:req.file.filename,
        website:website,
        email:email,
        address:address,
        contact_phone:contact_phone,
        created_by: req.authUser.id,
        created_at:new Date()

      },
    });
console.log(vendor,"its vendor data");
    if (vendor) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "Vendor created successfully!!!",
        data: vendor,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allVendors = asyncHandler(async (req, res) => {
    try {
      const vendor = await prisma.vendors.findMany({
        include:{
          representative_info:true
        },
        where: {
          is_deleted: false
        }
      });
      if (vendor) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `All Vendor find successfully!!!`,
          data: vendor,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });

  
const oneVendor = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const vendor = await prisma.vendors.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      console.log(vendor);

      if(vendor?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "Vendor Not Found"
        })
      }
      console.log(vendor);
      if (vendor) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: `${vendor.name} find successfully!!!`,
          data: vendor,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const updateVendor = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body
        );
      let { name, email,contact_phone,website,address } = req.body;
      const vendor = await prisma.vendors.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email,
          contact_phone:contact_phone,
          address:address,
          website:website,
          logo:req.file.filename,
          updated_by:req.authUser.id,
          update_at:new Date()
        },
      });
      if(vendor?.is_deleted === true){
        res.status(409).json({
          success:false,
          message: "Vendor Not Found"
        })
      }
      if (vendor) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Vendor updated successfully!!!",
          data: vendor,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: error,
        message: error.code,
      });
    }
  });
  
  const deleteVendor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const is_deleted = true
    
      const vendor = await prisma.vendors.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      console.log(vendor?.is_deleted === true, "false")
  
      if (vendor?.is_deleted === true) {
        res.status(400);
        throw new Error("Vendor not found");
  
      }
  
      const deletevendor = await prisma.vendors.update({
        where: {
          id: Number(id),
        },
        data: {
          is_deleted: is_deleted
        },
      });
  
      if (deletevendor) {
        res.status(201).json({
          success: true,
          message: `Vendor deleted successfully`
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
    // const vendor = await prisma.vendors.delete({
    //   where: {
    //     id: Number(id),
    //   },
    // });
    // if (vendor) {
    //   return res.status(201).json({
    //     success: true,
    //     status: 201,
    //     message: `${vendor.name} deleted successfully!!!`,
    //     data: vendor,
    //   });
    // }
  });
module.exports = {
  createVendor,
  oneVendor,
  allVendors,
  updateVendor,
  deleteVendor,
};
