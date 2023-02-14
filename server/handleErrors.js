module.exports.handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
    if(err.message === 'incorrect Email'){
        errors.email = 'That email is not registered';
    }

    if(err.message === 'incorrect Password'){
        errors.password = 'Wrong Password';
    }

    if (err.code === 11000) {
        errors.email = 'that email is already registered.';
    }

    if (err.message.includes('user validation failed')) {
        err.errors = [
            {
                properties: {
                    path: 'email',
                    message: 'email invalid'
                },
            },
            {
                properties: {
                    path: 'password',
                    message: 'password empty'
                }
            }
        ]
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    console.log(errors)
    errors = {
        'email': 'email invalid',
    }
    return errors;
}
