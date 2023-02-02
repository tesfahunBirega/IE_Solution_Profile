const express = require("express");
const partnerRoute = express.Router();

const multer = require("multer");
const path = require('path');
// const app = require("..");

const storage = multer.diskStorage({
    destination:"public",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

const uploade = multer({storage})
const { authMiddleware } = require("../middleware/authMiddleware")

const {
    createPartner, 
    allPartner,
    onePartner,
    updatePartner,
    deletePartner
}  = require("../controllers/partner.controller");

const { validationMiddleware } = require("../middleware/validationMiddleware");


partnerRoute.post("/create",uploade.single("partner"),authMiddleware,createPartner);
partnerRoute.get("/", allPartner);
partnerRoute.get("/:id", onePartner);
partnerRoute.patch("/:id",uploade.single("partner"), authMiddleware,updatePartner);
partnerRoute.delete("/:id",authMiddleware,deletePartner);


partnerRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is clienttttt read page</h1>");
});
// PartnerRoute.get('/partenr',(req, res) => {
//   res.send("this partenr route")
// });
module.exports = partnerRoute;