const express = require("express");
// const connection = require("../connection");
const userRoute = express.Router();

const {
  createUser,
  allUsers,
  oneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

/**
 * @swagger
 * user/create:
 *   post:
 *     summary: create user.
 *     description: create user.
 */
userRoute.post("/create", createUser);
/**
 * @swagger
 * user/all-users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 */
userRoute.get("/all-users", allUsers);
/**
 * @swagger
 * user/one-users:
 *   get:
 *     summary: Retrieve a user of JSONPlaceholder users.
 *     description: Retrieve a user of users from JSONPlaceholder.
 */
userRoute.get("/one-user/:id", oneUser);
/**
 * @swagger
 * user/update/:id:
 *   put:
 *     summary: update a user of JSONPlaceholder users.
 *     description: update a user of users from JSONPlaceholder.
 */
userRoute.put("/update/:id", updateUser);
/**
 * @swagger
 * user/delete/:id:
 *   delete:
 *     summary: delete a user of JSONPlaceholder users.
 *     description: delete a user of users from JSONPlaceholder.
 */
userRoute.delete("/delete/:id", deleteUser);

userRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is user read page</h1>");
});

module.exports = userRoute;
