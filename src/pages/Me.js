import { useEffect, useState } from "react";
import {
    Auth,
    redirectIfNotHasActiveToken,
    logout
} from '../api/Auth'
import { getUsers } from '../api/User'
import UserStatusButton from "../components/UserStatusButton"


export default function Me({ ...props }) {

    redirectIfNotHasActiveToken()

    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState({
        ...JSON.parse(localStorage.getItem('user'))
    });

    useEffect(() => {
        document.title = 'Elearning - Profile';

        getUsers({ ...Auth() })
            .then(users => {
                setUsers([...users])
            })

    }, [users]);

    const handleSession = () => {
        logout({ ...Auth() })
    }


    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-[86%] px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">
                                    Bienvenido, {profile.username}
                                </h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button
                                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                    onClick={handleSession}>Cerrar sesión</button>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Usuario
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Fecha registro
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Estado
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Tipo
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Acción
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    (Object.keys(users).length > 0) ?
                                        (
                                            users.map((user, id) => {
                                                return (
                                                    <tr key={id}>
                                                        < th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 " >
                                                            {user.username}
                                                        </th>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                            {new Date(user.createdAt).toLocaleDateString("es-CO")}
                                                        </td>
                                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {user.status ? 'Activo' : 'Inactivo'}
                                                        </td>
                                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {user.user_profile_id == 1 ? 'Manager' : 'Colaborador'}
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                            <UserStatusButton rowUserId={user.id} rowUserStatus={user.status} logedUserProfile={profile} />
                                                        </td>
                                                    </tr>)
                                            })
                                        ) :
                                        <tr><td>{'Sin registros...'}</td></tr>
                                }
                                {

                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div >
        </section >
    )
}