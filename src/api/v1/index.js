const express = require("express");
// const connection = require("./connection");
// const userRouter = require("./routes/users.routes");
//const roleRoute = require("./api/v1/routes/");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/sector/create", (req,res,next) => {
  console.log("object");
  console.log(req.body);
  next();
})
app.get("/", (req, res) => {
  res.send("<h1>This is IE Solutio Profile Home page</h1>");
});


app.use("/user", require("./routes/users.routes"));
app.use("/client", require("./routes/clients.routes"));
app.use("/project", require("./routes/projects.routes"));
app.use("/representative", require("./routes/representatives.routes"));
app.use("/department", require("./routes/department.routes"));
app.use("/solution", require("./routes/solutions.routes"));
app.use("/vendor", require("./routes/vendors.routes"));
app.use("/certeficate", require("./routes/certeficates.routes"));
app.use("/partner", require("./routes/partners.routes"));
app.use("/sector", require("./routes/sector.routes"));

// app.use("/partner", require("./routes/partners.routes"));


// app.use("/address", require("./routes/address.routes"))



module.exports = app;

// app.use((req, res, next) => {
//   const error = Error('no route')
//   next(error)
// })

// app.use((error, req, res, next) => {
//   const code = error.code
//   console.log(error.message);
//   res.status(code).json({message: error.message, code: error.code})
// })