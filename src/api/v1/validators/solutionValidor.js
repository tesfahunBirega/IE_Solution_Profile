const { body, query, params  } = require("express-validator");

/**@list_of_attributes for validation */
const name = body("name").isString().withMessage("Name is required.");
const email = body("email")
  .isEmail()
  .withMessage("Please enter a valid email.");
const password = body("password")
  .isLength({
    min: 8,
    max: 16,
  })
  .withMessage("Please enter a password a minimum of 8 characters.");
// const gender = body("gender").isString().withMessage("Gender is required.");
const logo = body("logo").isString().withMessage("Logo is required.");
const contact_no = body("contact_no").isString().withMessage("Contact is required.");

/**@create_user validation */
const updateSolutionValidator = [name, email];
const createSolutionValidation = [name,email,logo, contact_no]


module.exports  = {
updateSolutionValidator,
createSolutionValidation
  };
