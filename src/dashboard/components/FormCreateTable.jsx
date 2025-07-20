import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {useDropzone} from 'react-dropzone';
export const FormCreateTable = ({onClose}) => {
    const [image, setImage] = useState(null);
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
            image: null,
        }
    });

    // Registrar el campo 'image' para validación
    React.useEffect(() => {
        register('image', {
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
        if (!image) {
            setValue('image', null, { shouldValidate: true });
            await trigger('image');
            return;
        }
        data.image = image;
        console.log('Form submitted:', data);
        onClose();
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
                setImage(acceptedFiles[0]);
                setPreview(URL.createObjectURL(acceptedFiles[0]));
                setValue('image', acceptedFiles[0], { shouldValidate: true });
                trigger('image');
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
                {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message || 'La imagen es obligatoria'}</p>}
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
