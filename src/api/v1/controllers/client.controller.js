const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
// const userRoute = require("../routes/users.routes");
const prisma = new PrismaClient();

const createClient = asyncHandler(async (req, res) => {
  try {
    let { name, email, contact_phone, website,address,city } = req.body;
// console.log(name);
// console.log(email);

      const client = await prisma.clients.create({
        data: {
          name: name,
          addresss:address,
          city:city,
          logo: req.file.filename,
          website: website,
          email: email,
          contact_no: contact_phone,
          created_by:req.authUser.id,
          created_at:new Date()
        },  
      });
      console.log(client)

      if (client) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Client created successfully!!!",
          data: client,
        });
      // }
      // console.log(client)

    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allClients = asyncHandler(async (req, res) => {
  try {
    const client = await prisma.clients.findMany({
      include: {
        
        representative_info:{
          where:{
            is_deleted:false
          }
        }
        // id: true,
        // name:true,
        // website:true,
        // email:true,
        // contact_no:true,        
        // representative_info,client,true
      },
      where:{
        is_deleted:false
      }
    });

    // const client = await prisma.$queryRaw
    // `SELECT clients.*, 
    // representative_info.name as representative_info_name, 
    // representative_info.email as representative_info_email, 
    // representative_info.contact_1 as representative_info_contact_1, 
    // representative_info.contact_2 as representative_info_contact_2 
    // from clients
    // left join representative_info
    // ON representative_info.client_id = clients.id `
    if (client) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `All Clients find successfully!!!`,
        data: client,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});


const oneClient = asyncHandler(async (req, res) => {
  const is_deleted = true
  try {
    const { id } = req.params;
    const client = await prisma.clients.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    // if (client?.is_deleted === true) {
    //   res.status(409).json({
    //     success: false,
    //     message: "Client Not Found"
    //   })

    //   // console.log(client,"this is client")
    // }
    if (client?.is_deleted === false) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${client.name} find successfully!!!`,
        data: client,
      });
    } else {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `client not found!`,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const updateClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.authUser)
    let { name, email, website, contact_phone,address } = req.body;
    
    console.log(name);
    const client = await prisma.clients.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        email: email,
        website: website,
        contact_no: contact_phone,
        addresss: address,
       logo:req.file.filename,
        updated_by:req.authUser.id,
          updated_at:new Date()

      },
    });
    if (client?.is_deleted === true) {
      res.status(409).json({
        success: false,
        message: "Client Not Found"
      })
    }
    if (client) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "client updated successfully!!!",
        data: client,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(req, "request from client")
  try {
    const is_deleted = true

    const client = await prisma.clients.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    console.log(client?.is_deleted === true, "false")

    if (client?.is_deleted === true) {
      res.status(409).json({
        success: false,
        message: "Client Not Found"
      })

    }

    const deleteclient = await prisma.clients.update({
      where: {
        id: Number(id),
      },
      data: {
        is_deleted: is_deleted
      },
    });

    if (deleteclient) {
      res.status(201).json({
        success: true,
        message: `Client deleted successfully`
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
  // const client = await prisma.clients.delete({
  //   where: {
  //     id: Number(id),
  //   },
  // });
  // if (client) {
  //   return res.status(201).json({
  //     success: true,
  //     status: 201,
  //     message: `${client.name} deleted successfully!!!`,
  //     data: client,
  //   });
  //  }
});


module.exports = {
  createClient,
  oneClient,
  allClients,
  updateClient,
  deleteClient,
};
