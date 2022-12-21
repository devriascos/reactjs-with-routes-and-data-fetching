export function Auth() {

    const app = {
        host: process.env.REACT_APP_API_HOST,
        token: process.env.REACT_APP_API_TOKEN
    }

    return app
}

/**
 * Creamos un JWT para el usuario
 * @param {Object} params
 * @returns 
 */
export async function createAuthToken({ ...props }) {

    const { signUpData, loginData, host } = props
    const { email, password } = signUpData || loginData

    const userToken = await fetch(`${host}/auth/local`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: email,
            password: password,
        })
    })
        .then(response => response.json())
        .then(response => {
            //Almacena el usuario localmente también
            localStorage.clear()
            localStorage.setItem('user', JSON.stringify(response.user));
            return response.jwt ?? response.data.jwt
        })

    return userToken
}

export function logout({ ...props }) {
    const { token } = props
    document.cookie = `jwt=${token}; max-age=${-2}; path=/`;
    localStorage.clear()
    window.location.reload()
}

/**
 * Guarda la cookie de jwt con duración de 7 días
 * 
 * @param {*} userToken 
 */
export function setJwtToken(userToken) {
    const cookiTimeLimit = new Date();
    cookiTimeLimit.setDate(cookiTimeLimit.getDate() + 7)
    document.cookie = `jwt=${userToken}; expires=${cookiTimeLimit}; path=/`;
    //Finalmente redirige a perfil
    redirectIfHasActiveToken()
}

export function redirectIfHasActiveToken() {
    if (document.cookie) { window.location.href = '/me' }
}


export function redirectIfNotHasActiveToken() {
    if (!document.cookie) { window.location.href = '/login' }
}
