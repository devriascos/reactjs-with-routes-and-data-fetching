/**
 * 
 * @param {String} string 
 * @returns true or false
 */
export const validateTextFormat = (string) => {

    const inputValue = string.trim()
    //Si el campo ha sido vacío, de una retornamos false
    if (inputValue == '') { return false }

    //Si continúa normal, valida que lo ingresado sea texto (de a-z / A-Z)
    const valid_format = new RegExp(/^[A-Z a-z]+$/, 'g');

    return valid_format.test(inputValue)
}

/**
 * 
 * @param {String} inputEmail 
 * @returns true or false
 */
export const validateEmailFormat = (inputEmail) => {

    const email = inputEmail.trim()
    //Si el campo ha sido vacío, de una retornamos false
    if (email == '') { return false }

    //Si continúa normal, valida que lo ingresado sea texto (de a-z / A-Z)
    const valid_format = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return valid_format.test(email)
}

