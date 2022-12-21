import { useEffect, useState } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid'

import { registerFormValidation } from '../validations/RegisterFormValidation'

import {
    Auth,
    createAuthToken,
    setJwtToken,
    redirectIfHasActiveToken
} from '../api/Auth'

import { saveUser } from '../api/User'

export default function Register() {

    redirectIfHasActiveToken()

    const [signUpData, setSignUpData] = useState({
        username: '',
        user_profile_id: 2,
        email: '',
        password: '',
        password_confirmation: '',
        status: true
    })

    const [submitStatus, setSubmitStatus] = useState({})

    useEffect(() => {
        document.title = 'Elearning - Registro';
    }, []);


    const signUp = async (e) => {
        e.preventDefault()

        const isValidForm = await registerFormValidation(signUpData)

        if (Boolean(isValidForm)) {
            //Traemos las credenciales para autenticación y crear el usuario
            const apiResponse = await saveUser({ ...Auth(), signUpData })

            if (apiResponse.error) {
                setSubmitStatus({
                    error: true,
                    message: apiResponse.error.message
                })
                return
            } else {
                setSubmitStatus({})
                //Si se ha creado el usuario, creamos ahora un jwt para su sesión/consultas
                const userToken = await createAuthToken({ ...Auth(), signUpData })
                //Redirecciona al perfil de usuario
                if (userToken) { setJwtToken(userToken) }
            }

        }

    }


    const handleChange = (event) => {
        setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
    }


    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <a href='/'>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Enso Learning"
                        />
                    </a>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        ¡Crea tu cuenta gratis!
                    </h2>

                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={signUp}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                onChange={handleChange}
                                required
                                autoComplete={'off'}
                                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Jhony Deep"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="user_profile_id" className="block text-sm font-medium text-gray-700">
                                Posición
                            </label>
                            <select
                                id="user_profile_id"
                                name="user_profile_id"
                                className="relative block w-full border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                onChange={handleChange}
                            >
                                <option value={0}>Elige una opción...</option>
                                <option value={1}>Empleador</option>
                                <option value={2}>Colaborador</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Correo
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={handleChange}
                                required
                                className="relative block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="jhony@company.me"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                required
                                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Clave super secreta"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirma tu contraseña
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                onChange={handleChange}
                                required
                                className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Confirma tu clave super secreta"
                            />
                        </div>

                        <div className="mt-4">
                            <span className="text-red-400 font-bold capitalize text-sm">
                                {
                                    submitStatus.error ? submitStatus.message : ''
                                }
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-200 group-hover:text-indigo-200" aria-hidden="true" />
                            </span>
                            Crear cuenta
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}