const express = require("express");
// const connection = require("../connection");
const userRoute = express.Router();

const {
  createRegisterUser,
} = require("../controllers/login/login.controller");

/**
 * @swagger
 * user/create:
 *   post:
 *     summary: create user.
 *     description: create user.
 */
userRoute.post("/create", createRegisterUser);
/**
 * @swagger
 * user/all-users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder.
 */

module.exports = userRoute;
