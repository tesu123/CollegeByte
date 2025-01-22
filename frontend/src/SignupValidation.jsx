function SignupValidation(values) {
    let errors = {};

    // Validate name
    if (!values.name) {
        errors.name = "Name is required.";
    } else if (values.name.trim().length < 3) {
        errors.name = "Name must be at least 3 characters.";
    }

    // Validate email
    if (!values.email) {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid.";
    }

    // Validate password
    if (!values.password) {
        errors.password = "Password is required.";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    return errors;
}

export default SignupValidation;
