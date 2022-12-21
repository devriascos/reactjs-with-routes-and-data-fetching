
/**
 * Agrega una clase de borde rojo para destacar errores en formulario
 * @param {String} input 
 * @param {String} type //Default 'input'
 */
export const addErrorClass = (input, type = 'input') => {
    document.querySelector(`${type}[name='${input}']`).classList.add(`border-red-500`)
}

/**
 * Quita una la clase de error cuando se ha corregido el valor del input
 * @param {String} input 
 * @param {String} type //Default 'input'
 */
export const removeErrorClass = (input, type = 'input') => {
    document.querySelector(`${type}[name='${input}']`).classList.remove(`border-red-500`)
}
