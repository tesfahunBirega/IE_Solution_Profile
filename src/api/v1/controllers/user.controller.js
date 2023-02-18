const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
// const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt");
// const registerRoute = require("../routes/registers.routes");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const SECRET = "SECRETFORTOKEN"


// })

const createUser = asyncHandler(async (req, res) => {
  try {
    const password1 = req.body.password
    console.log(password1);
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password1, 10)
//     console.log(hash);
//      const isMatch = await bcrypt.compare(password1,hash)
//  console.log(isMatch);
    let {email, password, firstName, lastName, gender, department, tel,} = req.body;
    console.log(password);
/**@check if User Email exists*/
const isExist = await prisma.users.findUnique( { 
  where: {
  email: email,
}})

// const salt = await bcrypt.genSalt(10)
// const hash = await bcrypt.hash(password, salt)

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
        password: hash,
        // created_by: req.authUser.id,
        created_at:new Date()
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
  if(users?.is_deleted === true){
    res.status(409).json({
      success:false,
      message: "users Not Found"
    })
  }
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
  // console.log(email)
  // console.log(password)

  try {
    const user = await prisma.users.findFirst({
      where: {
        email:email,
      },
    });
  console.log(user)
  const isMatch = await bcrypt.compare(password,user.password)
  console.log(isMatch);
  console.log(user.password);
  console.log(password);

//   const isMatch =  bcrypt.compare(password, user.password)
//   isMatch.then((value)=>{
//     console.log(value, "value")
//     console.log(password, "input");
// console.log(user.password, "database");
//   }).catch((err)=>{
//     console.log(err,value)
//   })

    /**@check if user exists*/
    if (!user& isMatch) {
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
      if (user) {
        res.status(200).json({
          success: true,
          data: userInfo,
          accessToken: generateToken(user),
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
        // update_by:req.authUser.id,
        updated_at:new Date()
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


const authUser= asyncHandler(async(req,res)=>{

  try {
    const id = req.authUser.id;
console.log(id);
    const authorizedUser = 
     await prisma.users.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
     
    });
// if(authorizedUser?.is_deleted === true){
//   res.status(409).json({
// success:false,
// message:"User Not Found"
//   })
// }

    if (authorizedUser) {
      return res.status(201).json({
        success: true,
        status: 201,
        message: "Authorized user data",
        data: authorizedUser,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
      message: error.code,
    });
  }


})

module.exports = {
  createUser,
  oneUser,
  allUsers,
  updateUser,
  deleteUser,
  login,
  authUser
  // createRegister,
};
