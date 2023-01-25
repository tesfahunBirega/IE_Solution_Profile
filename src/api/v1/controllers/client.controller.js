const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const prisma = new PrismaClient();

const createClient = asyncHandler(async (req, res) => {
  try {
    let { name, email, contact_no, address, website, logo } = req.body;
//     console.log(req, "laley kbel leyaley");
// console.log(name);
// const isExist = await prisma.clients.findUnique({
//   where: {
//     email: email
//   }
// })
// console.log(isExist);
// if(isExist){
// res.status(409).json({
//   success: false,
//   message: "User already exist"
// })
// }
//     else{
      const client = await prisma.clients.create({
      data: {
        name: name,
        logo: req.file.filename,
        website: website,
        email: email,
        contact_no: contact_no,
        // created_by:req.authUser.id
      },
    });
    console.log(client);

    if (client) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "client created successfully!!!",
        data: client,
      });
    }
  } catch (error) {
    console.log(error)
    console.log(req)
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allClients = asyncHandler(async (req, res) => {
  try {
    const client = await prisma.clients.findMany({
      where: {
        is_deleted: false,
      },
    });
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
    if (client?.is_deleted === true) {
      res.status(409).json({
        success:false,
        message:"Client Not Found"
        })
      
// console.log(client,"this is client")
    }
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
    let { name, email, website,contact_no, address  } = req.body;
    const client = await prisma.clients.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        email: email,
        website:website,
        contact_no:contact_no,
        address:address
        // updated_by:req.authUser.id

      },
    });
    if(client?.is_deleted === true){
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
      success:false,
      message:"Client Not Found"
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
// const findAllByClientId = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const client = await prisma.clients.findUniqueOrThrow({
//       where: {
//         id: Number(id),
//       },
//     });
//     if (client) {
//       return res.status(201).json({
//         success: true,
//         status: 201,
//         message: `${client.name} find successfully!!!`,
//         data: client,
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: error,
//       message: error.code,
//     });
//   }
// });

module.exports = {
  createClient,
  oneClient,
  allClients,
  updateClient,
  deleteClient,
  // findAllByClientId,
};
