const express = require("express");
// const connection = require("../connection");
const clientRoute = express.Router();
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

const {
  createClient,
  allClients,
  oneClient,
  updateClient,
  deleteClient,
  // findAllByClientId,
 
} = require("../controllers/client.controller");
const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateClientValidator,createClientValidation } = require("../validators/clientValidoter");

clientRoute.post("/create", uploade.single("logo"), createClientValidation, validationMiddleware, createClient);

clientRoute.get("/", allClients);

clientRoute.get("/:id", oneClient);
// clientRoute.get("/project-client/:id",authMiddleware, findAllByClientId);

clientRoute.patch("/:id",uploade.single("logo"), updateClient);

clientRoute.delete("/:id", deleteClient);

clientRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is clienttttt read page</h1>");
});

module.exports = clientRoute;



// module.exports = clientRoute;
