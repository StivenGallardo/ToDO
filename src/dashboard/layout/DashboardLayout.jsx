import React, { useState } from 'react';
import Modal from '../components/Modal';
import { FormCreateTable } from '../components';

const DashboardLayout = ({ children, classNameMain = '' }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [open, setOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
            {/* Logo */}
            <div className="flex items-center">
                <span className="font-bold text-xl text-blue-600">ToDoLogo</span>
            </div>
            {/* Search & Create */}
            <div className="flex items-center flex-1 justify-center">
                <input
                type="text"
                placeholder="Buscar..."
                className="border rounded-l px-3 py-2 w-5/12 focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"  onClick={() => setOpen(true)}>Crear</button>
                <Modal isOpen={open} onClose={() => setOpen(false)} title="Crear Tablero">
                    <FormCreateTable onClose={() => setOpen(false)}/>
                </Modal>
            </div>
            {/* Profile Avatar */}
            <div className="relative">
                <button
                className="flex items-center focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                <img
                    src="https://ui-avatars.com/api/?name=User"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border"
                />
                </button>
                {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Configuraciones</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Cerrar sesión</button>
                </div>
                )}
            </div>
            </header>
            <main className={classNameMain}>{children}</main>
        </div>
    );
};

export default DashboardLayout;
