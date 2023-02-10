const express = require("express");
// const connection = require("../connection");
const DepartmentRoute = express.Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination:"public",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}]`)
  }
})

const uploade = multer({storage})
const { authMiddleware } = require("../middleware/authMiddleware")

const {
  createDepartment,
  allDepartment,
  oneDepartment,
  updateDepartment,
  deleteDepartment
 
} = require("../controllers/department.controller");

const { validationMiddleware } = require("../middleware/validationMiddleware")
const { updateSectorValidator,createSectorValidation } = require("../validators/projectFillValidor");

DepartmentRoute.post("/create",uploade.single("logo"), authMiddleware, createDepartment);

DepartmentRoute.get("/",allDepartment);
DepartmentRoute.get("/:id", oneDepartment);
DepartmentRoute.patch("/:id",uploade.single("logo"), authMiddleware,updateDepartment);
DepartmentRoute.delete("/:id",authMiddleware, deleteDepartment);

DepartmentRoute.get("/read", (req, res) => {
  const baseUrl = req.baseUrl;
  res.send("<h1>This is Department read page</h1>");
});

module.exports = DepartmentRoute;