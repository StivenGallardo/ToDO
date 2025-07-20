// Modal.jsx
import * as Dialog from '@radix-ui/react-dialog';

export default function Modal({ isOpen, onClose, title = '', children }) {
    return (
        <Dialog.Root open={isOpen} >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-80 z-50" />
                <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                    <Dialog.Title className="text-xl font-bold mb-4">{title}</Dialog.Title>
                    <div className="mt-2">{children}</div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
