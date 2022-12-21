import {
    validateTextFormat,
    validateEmailFormat
} from './Types'
import {
    removeErrorClass,
    addErrorClass
} from './Errors'

export const registerFormValidation = (RegisterData) => {

    const {
        username,
        user_profile_id,
        email,
        password,
        password_confirmation
    } = RegisterData

    const isValidName = validateTextFormat(username)
    isValidName ? removeErrorClass('username') : addErrorClass('username')

    const isValidProfileId = !isNaN(user_profile_id) && Math.sign(user_profile_id)
    isValidProfileId ? removeErrorClass('user_profile_id', 'select') : addErrorClass('user_profile_id', 'select')

    const isValidEmail = validateEmailFormat(email)
    isValidEmail ? removeErrorClass('email') : addErrorClass('email')

    const isValidPassword = validatePassword(password, password_confirmation)

    if (isValidPassword) {
        removeErrorClass('password')
        removeErrorClass('password_confirmation')
    } else {
        addErrorClass('password')
        addErrorClass('password_confirmation')
    }


    //Validación final:
    return isValidName & isValidProfileId & isValidEmail & isValidPassword
}

const validatePassword = (pass, confirmation) => {

    pass = pass.trim()
    confirmation = confirmation.trim()

    const noEmptyPass = pass != '' && confirmation != ''
    const passwordsAreEqual = pass == confirmation

    //Revisa si las contraseñas no están vacías y son iguales
    return noEmptyPass && passwordsAreEqual ? true : false
}

