const { body, query, params  } = require("express-validator");

/**@list_of_attributes for validation */
const name = body("name").isString().withMessage("Name is required.");
const email = body("email")
  .isEmail()
  .withMessage("Please enter a valid email.");
// const password = body("password")
//   .isLength({
//     min: 8,
//     max: 16,
//   })
//   .withMessage("Please enter a password a minimum of 8 characters.");
const position = body("position").isString().withMessage("position is required.");
// const country = body("country").isString().withMessage("Country is required.");
const contact_1 = body("contact_1").isString().withMessage("Contact is required.");

/**@create_user validation */
const updateRepresentativeValidator = [name, email];
const createeRepresentativeValidation = [name,email,position, contact_1]



module.exports  = {
updateRepresentativeValidator,
createeRepresentativeValidation
  };
