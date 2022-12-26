// const asyncHandler = require("express-async-handler");
// const { PrismaClient } = require("@prisma/client");
// const { request } = require("express");

// const prisma = new PrismaClient();
// const createUser = asyncHandler(async (req, res) => {
//   try {
//     let { name, email, password,gender, department,job} = req.body;

//     const user = await prisma.users.create({
//       data: {
//         name: name,
//         email: email,
//         gender:gender,
//         department:department,
//         job:job,
//         password: password,
//       },
//     });

//     if (user) {
//       return res.status(201).json({
//         success: true,
//         status: 201,
//         message: "User created successfully!!!",
//         data: user,
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: error,
//       message: error.code,
//     });
//   }
// });




// module.exports = {
//   createUser,
 
// };
