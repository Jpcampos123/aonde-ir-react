"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsTicketPerforated } from "react-icons/bs";
import getDetailsEvent from "@/app/services/eventsDetails";
import Loading from "@/app/components/Loading";
import Modal, { Guest } from "@/app/components/Guests";
import { EventItem } from "@/app/page";

const EventDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const response = await getDetailsEvent(id as string);
        setLoading(false);
        setEvent(response.event);
        setGuests(response.guests);
        setCount(response.count);
        return;
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }

    loadEvents();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      {/* Seção de Ingressos */}
      <div className="mt-4 justify-between w-full flex items-center">
        <h4 className="text-xl font-semibold text-gray-800">Ingressos</h4>
        <a
          href="http://www.casadefestas.net/eventos/evento.asp?id=2854"
          target="_blank"
        >
          <BsTicketPerforated className="text-red-500" size={30} />
        </a>
      </div>

      {/* Seção de Confirmar Presença */}
      <div className="mt-4 justify-between w-full flex items-center">
        <h4 className="text-xl font-semibold text-gray-800">
          Confirmar presença
        </h4>
        <div
          className="relative text-center"
          onMouseEnter={() => setIsMenuVisible(true)}
          onMouseLeave={() => setIsMenuVisible(false)}
        >
          <div className="text-red-500">
            {selectedReaction ? (
              <span className="text-xl">
                {selectedReaction === "Confirmado" && <AiFillHeart size={30} />}
                {selectedReaction === "Interessado" && (
                  <AiOutlineHeart size={30} />
                )}
                {selectedReaction === "Não vou" && <span>😢</span>}
              </span>
            ) : (
              <AiOutlineHeart size={32} />
            )}
          </div>
        </div>
      </div>
      {isMenuVisible && (
        <div className="flex justify-center items-center gap-4 p-2 bg-white rounded-lg shadow-lg">
          <button
            className="flex flex-col items-center hover:scale-125 transition-transform"
            onClick={() => setSelectedReaction("Confirmado")}
          >
            <AiFillHeart className="text-red-500" size={30} />
            <span className="mt-1 text-sm">Confirmado</span>
          </button>
          <button
            className="flex flex-col items-center hover:scale-125 transition-transform"
            onClick={() => setSelectedReaction("Interessado")}
          >
            <AiOutlineHeart className="text-blue-500" size={30} />
            <span className="mt-1 text-sm">Interessado</span>
          </button>
          <button
            className="flex flex-col items-center hover:scale-125 transition-transform"
            onClick={() => setSelectedReaction("Não vou")}
          >
            <span className="text-2xl">😢</span>
            <span className="mt-1 text-sm">Não vou</span>
          </button>
        </div>
      )}

      {/* Botão para Ver Confirmados */}
      <div className="flex justify-center mt-6 my-16">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-600 mb-2 bg-red-500 text-white mt-20 rounded w-full h-12"
        >
          Ver Confirmados
        </button>
      </div>

      {/* Modal de Confirmados */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guests={guests}
      />
    </div>
  );
};

export default EventDetails;
