const express = require("express");
const sectorRoute = express.Router();

// const multer = require("multer");
// const path = require('path');

// const storage = multer.diskStorage({
//     destination:"public",
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}_${file.originalname}`)
//     }
//   })

// const uploade = multer({storage})
const { authMiddleware } = require("../middleware/authMiddleware")
const { validationMiddleware } = require("../middleware/validationMiddleware")

const {
    createSector, 
    allSector,
    oneSector,
    updateSector,
    deleteSector
}  = require("../controllers/sectors.controller");



sectorRoute.post("/create/:name",authMiddleware,createSector);
sectorRoute.get("/", allSector);
sectorRoute.get("/:id", oneSector);
sectorRoute.patch("/:id",authMiddleware,updateSector);
sectorRoute.delete("/:id",authMiddleware,deleteSector);
module.exports = sectorRoute;