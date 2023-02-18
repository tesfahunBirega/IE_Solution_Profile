const express = require("express");
// const connection = require("../connection");
const userRoute = express.Router();
const { validationMiddleware } = require("../middleware/validationMiddleware")

const {
  createUser,
  allUsers,
  oneUser,
  updateUser,
  deleteUser,
  login,
  authUser
} = require("../controllers/user.controller");

// const { updateUserValidator,createUserValidation } = require("../validators/userValidetor");

const { authMiddleware } = require("../middleware/authMiddleware")

const { updateUserValidator,createUserValidation } = require("../validators/userValidetor");
userRoute.post("/create",createUserValidation,validationMiddleware,createUser);
userRoute.post("/login", login);


userRoute.get("/", allUsers);
userRoute.get("/authUser", authMiddleware,authUser);

userRoute.get("/:id", oneUser);

userRoute.patch("/:id", authMiddleware,updateUserValidator, validationMiddleware,  updateUser);
// userRoute.route("/update/:id").put(authMiddleware, CreateUserValidations, validationMiddleware,  updateUser);

userRoute.delete("/:id", authMiddleware,deleteUser);

userRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is user read page</h1>");
});

module.exports  = userRoute;
