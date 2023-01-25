const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


const SECRET = "SECRETFORTOKEN"


const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1]

        const decodeToken = jwt.verify(token, SECRET);
        req.authUser = decodeToken
        next();

    } else {
        res.status(401).json({
            success: false,
            message: "Not Authorized"
        })
    }

})

module.exports = { authMiddleware }