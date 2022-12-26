const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const bcrypt = require("bcrypt");
const registerRoute = require("../routes/registers.routes");
const prisma = new PrismaClient();

const allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    if (users) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `All Users find successfully!!!`,
        data: users,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const oneUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const users = await prisma.users.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    if (users) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${users.name} find successfully!!!`,
        data: users,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

/**@description create user
 * @api api/v1/user/create
 * @access PUBLIC
 * @type POST
 */

const createUser = asyncHandler(async (req, res) => {
  try {
    let { name, email, password, gender, department, job,} = req.body;

    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        gender:gender,
        department:department,
        job:job,
        password: password,
      },
    });

    if (user) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "User created successfully!!!",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});


const createRegister = asyncHandler(async (req, res) => {
  try {
    
    let { name, email, password, gender, department, job,} = req.body;
    // if (!req.body) {
    //   res.status(400).send({
    //       message: "Content can not be empty!"
    //   });
    //   return;
  // }
    //remove any case sensetivity fron our email address
    if (!req.body.name || !req.body.password) {
      res.status(400).json({
        error: 'Please provide username and password'
      })
    }
    const toLowerCaseEmail = email.toLowerCase();

    //hash the password
    const hashpassword = await bcrypt.hashSync(
      password,
      10
    )
    const userss = await prisma.users.create({
      data: {
        name: name,
        email: toLowerCaseEmail,
        gender:gender,
        department:department,
        job:job,
        password: hashpassword,
      },
    });

    if (userss) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "User created successfully!!!",
        data: userss,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, password } = req.body;
    const user = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    if (user) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "User updated successfully!!!",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.delete({
    where: {
      id: Number(id),
    },
  });
  if (user) {
    return res.status(201).json({
      success: true,
      status: 201,
      message: `${user.name} deleted successfully!!!`,
      data: user,
    });
  }
});

module.exports = {
  createUser,
  oneUser,
  allUsers,
  updateUser,
  deleteUser,
  createRegister,
};
