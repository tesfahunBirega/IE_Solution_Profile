const { body, query, params  } = require("express-validator");

/**@list_of_attributes for validation */
const firstName = body("firstName").isString().withMessage("firstName is required.");
const email = body("email")
  .isEmail()
  .withMessage("Please enter a valid email.");
const password = body("password")
  .isLength({
    min: 8,
    max: 16,
  })
  .withMessage("Please enter a password a minimum of 8 characters.");
const gender = body("gender").isString().withMessage("Gender is required.");
const department = body("department").isString().withMessage("department is required.");
const job = body("job").isString().withMessage("job is required.");

/**@create_user validation */
const updateUserValidator = [email];
const createUserValidation = [firstName,email,password,gender,department]



module.exports  = {
  updateUserValidator,
  createUserValidation
  };
