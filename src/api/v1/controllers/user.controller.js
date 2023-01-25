const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const bcrypt = require("bcrypt");
// const registerRoute = require("../routes/registers.routes");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const SECRET = "SECRETFORTOKEN"



// const signup = asyncHandler(async(req,res)=>{
// const {name,email, gender,department} = req.body

// const isExist = await prisma.users.findUnique( { where: {
//   eamil: email,
// }})
// if(isExist){
//   res.status(409).json({
//     success:false,
//     message:"User alredy exist"
//   })
// } else {
//   const user = await prisma.users.create({
//     data: {
//       name: name,
//       email: email,
//       gender:gender,
//       department:department,
//       job:job,
//       password: password,
//     },
//   });

// } 





// })

const createUser = asyncHandler(async (req, res) => {
  try {
    let {email, password, firstName, lastName, gender, department, tel,} = req.body;
    console.log(password);
/**@check if User Email exists*/
const isExist = await prisma.users.findUnique( { 
  where: {
  email: email,
}})
console.log(isExist);
    if(isExist){
        res.status(409).json({
    success:false,
    message:"User already exist"
  })
    }else{
    const user = await prisma.users.create({
      data: {
        firstName:firstName,
        lastName:lastName,
        email: email,
        gender:gender,
        department:department,
        tel:tel,
        password: password,
        // created_by: req.authUser.id
      },
    });
console.log(user);
    if (user) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "User created successfully!!!",
        data: user,
      });
    }
  }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      where: {
      is_deleted: false,
      }
  });
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
const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  console.log(email)
  console.log(password)

  try {
    const user = await prisma.users.findFirst({
      where: {
        email:email,
      },
    });
  console.log(user)

    /**@check if user exists*/
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
    } else {
      let userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      console.log(user, "is user")
      if (user && 
        // (await bcrypt.compare(password, user.password))
        (password=== user.password)
        ) {
        res.status(200).json({
          success: true,
          data: userInfo,
          // accessToken: generateToken(user),
          message: "You are logged in successfully!!!",
        });
      } else {
        res.status(400);
        throw new Error("Invalid credentials");
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }
});
const oneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {

    // const is_deleted=true;
    const users = await prisma.users.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    console.log(users?.is_deleted === true, "false") 
   if(users?.is_deleted === true){
    res.status(409).json({
    success:false,
    message:"User Not Found"
    })
   }
    if (users) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: `${users.firstName} find successfully!!!`,
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




// const createRegister = asyncHandler(async (req, res) => {
//   try {
    
//     let { name, email, password, gender, department, job,} = req.body;
//     // if (!req.body) {
//     //   res.status(400).send({
//     //       message: "Content can not be empty!"
//     //   });
//     //   return;
//   // }
//     //remove any case sensetivity fron our email address
//     if (!req.body.name || !req.body.password) {
//       res.status(400).json({
//         error: 'Please provide username and password'
//       })
//     }
//     const toLowerCaseEmail = email.toLowerCase();

//     //hash the password
//     const hashpassword = await bcrypt.hashSync(
//       password,
//       10
//     )
//     const userss = await prisma.users.create({
//       data: {
//         name: name,
//         email: toLowerCaseEmail,
//         gender:gender,
//         department:department,
//         job:job,
//         password: hashpassword,
//       },
//     });

//     if (userss) {
//       return res.status(201).json({
//         success: true,
//         status: 201,
//         message: "User created successfully!!!",
//         data: userss,
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       error: error,
//       message: error.code,
//     });
//   }
// });
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { email } = req.body;
    // console.log(firstName);
    const user = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        // lastName: lastName,
        email: email,
      },
    });
    console.log(user?.is_deleted === true, "false");
if(user?.is_deleted === true){
  res.status(409).json({
success:false,
message:"User Not Found"
  })
}
    console.log(user);
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

  try {
    const is_deleted = true
  
    const user = await prisma.users.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    console.log(user?.is_deleted === true, "false")

    if (user?.is_deleted === true) {
          res.status(409).json({
    success:false,
    message:"User Not Found"
  })

    }

    const deleteuser = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        is_deleted: is_deleted
      },
    });

    if (deleteuser) {
      res.status(201).json({
        success: true,
        message: `User deleted successfully`
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
  // const user = await prisma.users.delete({
  //   where: {
  //     id: Number(id),
  //   },
  // });
  // if (user) {
  //   return res.status(201).json({
  //     success: true,
  //     status: 201,
  //     message: `${user.name} deleted successfully!!!`,
  //     data: user,
  //   });
  // }
});

/**@generate JWT*/
const generateToken = (id) => {
  return jwt.sign(id , SECRET, {
    expiresIn: "1d",
  });
};


module.exports = {
  createUser,
  oneUser,
  allUsers,
  updateUser,
  deleteUser,
  login
  // createRegister,
};
