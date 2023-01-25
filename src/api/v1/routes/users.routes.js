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
  login
} = require("../controllers/user.controller");

const { updateUserValidator,createUserValidation } = require("../validators/userValidetor");

const { authMiddleware } = require("../middleware/authMiddleware")

userRoute.post("/create",createUser);
userRoute.post("/login", login);


userRoute.get("/", allUsers);

userRoute.get("/:id", oneUser);

userRoute.patch("/:id", updateUserValidator, validationMiddleware,  updateUser);
// userRoute.route("/update/:id").put(authMiddleware, CreateUserValidations, validationMiddleware,  updateUser);

userRoute.delete("/:id", deleteUser);

userRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is user read page</h1>");
});

module.exports  = userRoute;
