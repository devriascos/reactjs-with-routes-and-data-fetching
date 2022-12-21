import {
    validateEmailFormat
} from './Types'
import {
    removeErrorClass,
    addErrorClass
} from './Errors'

export const loginFormValidation = (loginData) => {

    const {
        email,
        password
    } = loginData

    const isValidEmail = validateEmailFormat(email)
    isValidEmail ? removeErrorClass('email') : addErrorClass('email')

    const isValidPassword = validatePassword(password)

    if (isValidPassword) {
        removeErrorClass('password')
    } else {
        addErrorClass('password')
    }

    //Validación final:
    return isValidEmail & isValidPassword
}

const validatePassword = (pass) => {
    pass = pass.trim()
    const noEmptyPass = pass != ''
    //Revisa si las contraseñas no están vacías 
    return noEmptyPass ? true : false
}

