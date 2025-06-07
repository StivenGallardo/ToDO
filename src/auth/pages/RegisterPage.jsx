import React, {useState} from 'react';
import { FaRegEyeSlash, FaRegEye  } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; // Importa el componente Link
import { useAuthStore } from '../../hooks/';

const RegisterPage = () => {

    const {startRegister} = useAuthStore();
    const [errorsForm, setErrorsForm] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            name: "",
            password: "",
        }
    });


    const onSubmit = async(data) => {
        const resp = await startRegister(data);
        setErrorsForm(resp);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-base font-bold text-gray-600 mb-6 text-center">Regístrate para continuar</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
                            Correo:*
                        </label>
                        <input
                            {...register('email', {
                                required: 'El correo es obligatorio',
                                pattern: 
                                {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'El formato del correo no es válido'
                                }
                            })}
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Intruduce tu correo electrónico"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                        {errorsForm?.email && <p className="text-red-500 text-xs italic">{errorsForm?.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="name">
                            Nombres:*
                        </label>
                        <input
                            {...register('name', {
                                required: 'El nombre es obligatorio',
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message: 'El nombre no debe contener caracteres especiales'
                                },
                                maxLength: {
                                    value: 60,
                                    message: 'El nombre no debe exceder los 60 caracteres'
                                }
                            })}
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Intruduce tus nombres"
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                        {errorsForm?.name && <p className="text-red-500 text-xs italic">{errorsForm?.name}</p>}
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña:*
                        </label>
                        <div className='relative'>
                            <input
                                {...register('password', { required: 'La contraseña es obligatoria' })}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="shadow appearance-none border rounded w-full py-2 pl-3 pr-11 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Intruduce tu contraseña"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-2 flex items-center text-2xl leading-5 bg-gray-300 rounded-xs border"
                                >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye   />}
                            </button>

                        </div>
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>  }
                        {errorsForm?.password && <p className="text-red-500 text-xs italic">{errorsForm?.password}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer w-full"
                        >
                            Registrarse
                        </button>
                    </div>
                    <div className="flex items-center justify-end mt-5">
                        <Link to="/auth/login" className="text-sm text-blue-500 hover:text-blue-800 ml-2">
                            Iniciar sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage