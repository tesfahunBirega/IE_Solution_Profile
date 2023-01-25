const { body, query, params  } = require("express-validator");

/**@list_of_attributes for validation */
const name = body("name").isString().withMessage("Name is required.");

/**@create_user validation */
const updateSectorValidator = [name ];
const createSectorValidation = [name ];



module.exports  = {
updateSectorValidator,
createSectorValidation
  };
