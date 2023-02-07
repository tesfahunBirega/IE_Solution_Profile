const http = require("http");
const express = require("express");

const app = require("./src/api/v1/index");
//const app = require("./src/api/v2/index");
const swaggerOptions = require("./src/config/swagger");
const cors=  require("cors");
const PORT = process.env.APP_PORT || 8000;

const swaggerUi = require("swagger-ui-express");
const swaggerJsDocS = require("swagger-jsdoc");

const server = http.createServer(app);
app.use(cors())

const swaggerDocs = swaggerJsDocS(swaggerOptions);

/**@across_origin_service CORS  */
const corsOptions = {
  origin: "*",
  credentials: false, //access-control-allow-credentials:true else false
  optionSuccessStatus: 200,
};

app.use("/api-docs", cors(corsOptions), swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
  "/api/v1/user",
  cors(corsOptions),
  require("./src/api/v1/routes/users.routes")
);
app.use(
  "/api/v1/client",
  cors(corsOptions),
  require("./src/api/v1/routes/clients.routes")
);

app.use(
  "/api/v1/project",
  cors(corsOptions),
  require("./src/api/v1/routes/projects.routes")
);

app.use(
  "/api/v1/representative",
  cors(corsOptions),
  require("./src/api/v1/routes/representatives.routes")
);
app.use(
  "/api/v1/certeficate",
  cors(corsOptions),
  require("./src/api/v1/routes/certeficates.routes")
);
app.use(
  "/api/v1/partner",
  cors(corsOptions),
  require("./src/api/v1/routes/partners.routes")
);
app.use(
  "/api/v1/department",
  cors(corsOptions),
  require("./src/api/v1/routes/department.routes")
);
app.use(
  "/api/v1/solution",
  cors(corsOptions),
  require("./src/api/v1/routes/solutions.routes")
);

app.use(
  "/api/v1/vendor",
  cors(corsOptions),
  require("./src/api/v1/routes/vendors.routes")
);

app.use("/public", express.static("public"))


// app.use("/test", cors(corsOptions),  
//  require("./src/api/v1/routes/testRoute"))


server.listen(PORT, () => {
  console.log(`Express Crud is running on port http://localhost:${PORT}`);
});


