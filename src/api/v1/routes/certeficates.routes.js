const express = require("express");
const certeficateRoute = express.Router();

const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination:"public",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

const uploade = multer({storage})
const { authMiddleware } = require("../middleware/authMiddleware")
const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateProjectValidator,createProjectValidation } = require("../validators/projectValidoter");

const {
    createCerteficate, 
    allCerteficate,
    oneCerteficate,
    updateCerteficate,
    deleteCerteficate
}  = require("../controllers/certeficates.controller");



certeficateRoute.post("/create",uploade.single("certeficate"),authMiddleware,createCerteficate);
certeficateRoute.get("/", allCerteficate);
certeficateRoute.get("/:id", oneCerteficate);
certeficateRoute.patch("/:id",uploade.single("certeficate"),authMiddleware,updateCerteficate);
certeficateRoute.delete("/:id",authMiddleware,deleteCerteficate);
module.exports = certeficateRoute;