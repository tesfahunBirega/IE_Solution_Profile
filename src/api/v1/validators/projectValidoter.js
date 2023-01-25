const { body, query, params  } = require("express-validator");

/**@list_of_attributes for validation */
const name = body("name").isString().withMessage("Name is required.");
// const email = body("email")
//   .isEmail()
//   .withMessage("Please enter a valid email.");
// const password = body("password")
//   .isLength({
//     min: 8,
//     max: 16,
//   })
//   .withMessage("Please enter a password a minimum of 8 characters.");
const description = body("description").isString().withMessage("description is required.");
// const log = body("gender").isString().withMessage("Gender is required.");
// const contact_phone = body("gender").isString().withMessage("Gender is required.");

/**@create_user validation */
const updateProjectValidator= [name, description];
const createProjectValidation = [name, description]



module.exports  = {
updateProjectValidator,
createProjectValidation
  };
