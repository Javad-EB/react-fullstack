const Validator = require("validator")
const isEmpty = require("./isEmpty")

const validateRegisterInput = (data) => {
    let errors = {}

    // Check the email filed
    if (isEmpty(data.email)) {
        errors.email = "Email field can not be empty"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid, please provide a vaid email"
    }

    // Check password field
    if (isEmpty(data.password)) {
        errors.password = "Password field can not be empty"
    } else if (!Validator.isLength(data.password, { min: 6, max: 150 })) {
        errors.password = "Password must be between 6 and 150 characters long"
    }

    // Check name field
    if (isEmpty(data.name)) {
        errors.name = "Name field can not be empty"
    } else if (!Validator.isLength(data.name, { min: 4, max: 15 })) {
        errors.name = "Name must be between 4 and 15 characters long"
    }


    // Check confirm password field
    if (isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password can not be empty"
    } else if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Password and Confirm Password fields must match"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}

module.exports = validateRegisterInput
