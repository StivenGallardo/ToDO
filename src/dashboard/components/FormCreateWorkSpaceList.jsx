import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useWorkSpaceStore } from '../../hooks';
export const FormCreateWorkSpaceList = ({onClickCreteWorkSpaceList}) => {
    const [errorsForm, setErrorsForm] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
        }
    });

    const {startCreateWorkSpaceList} = useWorkSpaceStore();

    const onSubmit = async(data) => {
        const resp = await startCreateWorkSpaceList(data);
        if(!resp){
            onClickCreteWorkSpaceList();
            return;
        }
        setErrorsForm(resp);
    };

    return (
        <div className="w-2/12 bg-gray-100 p-3 rounded-2xl shadow-md shrink-0">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                <label className="text-gray-600 text-sm font-bold mb-2 hidden" htmlFor="name">
                    Nombres:*
                </label>
                <input
                    {...register('name', {
                    required: 'El nombre es obligatorio',
                    pattern: {
                        value: /^[a-zA-Z\\s]+$/,
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
                    placeholder="Intruduce el nombre de la lista"
                    autoComplete='off'
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                {errorsForm?.name && <p className="text-red-500 text-xs italic">{errorsForm?.name}</p>}
                </div>
                <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                    Añadir Lista
                </button>
                <button 
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer' onClick={onClickCreteWorkSpaceList}>X</button>
                </div>

            </form>
        
        </div>
    )
}
