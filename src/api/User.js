export async function saveUser({ ...props }) {

    const { signUpData, host, token } = props

    const apiResponse = await fetch(`${host}/users`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...signUpData, role: 1 })
    })
        .then(response => response.json())
        .then(response => {
            return response
        })

    return apiResponse
}

export async function getUsers({ ...props }) {

    const { host } = props

    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];

    const userList = await fetch(`${host}/users`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(response => {
            return response
        })


    return userList
}


export async function changeUserStatus({ ...props }) {

    const { updatedUserId, currentStatus, host, token } = props
    const isUpdated = await fetch(`${host}/users/${updatedUserId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: !currentStatus })
    })
        .then(response => response.json())
        .then(response => {
            return response
        })
    return isUpdated
}