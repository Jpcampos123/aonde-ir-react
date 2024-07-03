import Image from "next/image";
import React from "react";

export interface Guest {
  event_id: string;
  id: string;
  status: string;
  user: {
    id: string;
    name: string;
    photo: string;
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, guests }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full">
        <div className="p-4 border-b flex justify-between">
          <h2 className="text-xl font-semibold">Confirmados</h2>
          <button onClick={onClose} className="top-2 right-2 text-gray-600">
            fechar
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          <ul>
            {guests.map((guest, index) => (
              <li
                key={index}
                className="flex items-center  space-x-4 mb-4  border-b"
              >
                {guest.user.photo ? (
                  <img
                    src={guest.user.photo}
                    alt={guest.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src="https://cdn.quasar.dev/img/avatar.png"
                    alt="Avatar"
                    width={50}
                    height={50}
                  />
                )}
                <span className="text-gray-800">{guest.user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
