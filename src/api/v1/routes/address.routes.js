const express = require("express");
const addressRoute = express.Router();

const { authMiddleware } = require("../controllers/address.controller");

const {
    CreateAddress, 
    getAddress,
    searchAddress,
    updateAddress,
    deleteAddress
}  = require("../controllers/address.controller");

const { validationMiddleware } = require("../middleware/validationMiddleware");


addressRoute.post("/crrate",CreateAddress);

module.exports=addressRoute;