const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

const createVendor = asyncHandler(async (req, res) => {
  try {
    let { name, logo, website, email, contact_phone, address, country  } = req.body;

    const vendor = await prisma.vendors.create({
      data: {
        name: name,
        logo:logo,
        website:website,
        email:email,
        contact_phone:contact_phone,
        address:address,
        country:country,
        // created_by: req.authUser.id

      },
    });

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
      let { name, email } = req.body;
      const vendor = await prisma.vendors.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email,
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
