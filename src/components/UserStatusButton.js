import { useEffect, useState } from "react"
import {
    Auth
} from '../api/Auth'
import { changeUserStatus } from '../api/User'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserStatusButton({ ...props }) {

    const { rowUserStatus, rowUserId, logedUserProfile } = props
    const { id, user_profile_id } = logedUserProfile
    const [buttonStyle, setButtonStyle] = useState({
        disable: false,
        class: ''
    })
    const [isManager, setIsManager] = useState(true)

    useEffect(() => {
        document.title = 'Elearning - Profile';

        //Si no es el jefe de proyecto o la fila corresponde a su usuario, se desactiva el botón
        if (user_profile_id != 1 || rowUserId == id) {
            setButtonStyle({
                disable: true,
                class: 'disabled:opacity-75'
            })
            setIsManager(false);
        }

    }, []);

    const handleClick = (event) => {
        event.preventDefault()
        //Si no es gerente, interrumpimos el script
        if (!isManager) { return false }

        const updatedUserId = event.target.id
        const currentStatus = rowUserStatus
        const isUpdated = changeUserStatus({ ...Auth(), updatedUserId, currentStatus })
        const notify = () => toast("Registro actualizado", { autoClose: 3000 });
        if (isUpdated) {
            notify()
        }
    }

    return (
        <>
            <button
                id={rowUserId}
                href="#"
                onClick={handleClick}
                disabled={buttonStyle.disable}
                className={`w-28 p-2 backdrop-blur-sm bg-indigo-600 rounded-md text-white ${buttonStyle.class}`}
            >
                {rowUserStatus ? 'Desactivar' : 'Activar'}
            </button>
            <ToastContainer />
        </>
    )
}