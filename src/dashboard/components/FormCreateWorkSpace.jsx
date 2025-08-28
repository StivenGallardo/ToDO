import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {useDropzone} from 'react-dropzone';
import { useWorkSpaceStore } from '../../hooks';
export const FormCreateTable = ({onClose}) => {
    const [coverImage, setCoverImage] = useState(null);
    const [errorsForm, setErrorsForm] = useState({});
    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors }
    } = useForm({
        defaultValues: {
            nametable: "",
            cover_image: null,
        }
    });

    const {startCreateWorkSpace} = useWorkSpaceStore();

    // Registrar el campo 'cover_image' para validación
    React.useEffect(() => {
        register('cover_image', {
            required: 'La imagen es obligatoria',
            validate: {
                isImage: (file) => {
                    if (!file) return 'Debes subir una imagen';
                    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
                    return validTypes.includes(file.type)
                        ? true
                        : 'Solo se permiten imágenes JPEG, PNG, JPG o WEBP';
                },
            },
        });
    }, [register]);

    const onSubmit = async(data) => {
        if (!coverImage) {
            setValue('cover_image', null, { shouldValidate: true });
            await trigger('cover_image');
            return;
        }
        data.cover_image = coverImage;
        const resp = await startCreateWorkSpace(data);
        if(!resp){
            onClose();
            return;
        }
        setErrorsForm(resp);
    };

    // Integración con useDropzone
    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/jpg': [],
            'image/webp': []
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles[0]) {
                setCoverImage(acceptedFiles[0]);
                setPreview(URL.createObjectURL(acceptedFiles[0]));
                setValue('cover_image', acceptedFiles[0], { shouldValidate: true });
                trigger('cover_image');
            }
        }
    });
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label htmlFor="nametable" className="font-medium">Nombre del tablero</label>
                <input
                    type="text"
                    id="nametable"
                    className="border rounded px-3 py-2 focus:outline-none"
                    placeholder="Escribe el nombre"
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
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                {errorsForm?.name && <p className="text-red-500 text-xs italic">{errorsForm?.name}</p>}
                <label className="font-medium">Imagen</label>
                <div {...getRootProps({ className: 'border rounded px-3 py-6 text-center cursor-pointer bg-gray-50' })}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-blue-600">Suelta la imagen aquí...</p>
                    ) : (
                        <p>Arrastra una imagen aquí, o haz clic para seleccionar</p>
                    )}
                </div>
                {preview && (
                    <div className="mt-2 flex justify-center">
                        <img src={preview} alt="Preview" className="h-32 w-auto rounded shadow" />
                    </div>
                )}
                {errors.cover_image && <p className="text-red-500 text-xs italic">{errors.cover_image.message || 'La imagen es obligatoria'}</p>}
                {errorsForm?.cover_image && <p className="text-red-500 text-xs italic">{errorsForm?.cover_image}</p>}
                <div className="flex items-center justify-end gap-4">

                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 cursor-pointer"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    >
                        Crear Tablero
                    </button>
                </div>
            </form>
        </>
    )
}
