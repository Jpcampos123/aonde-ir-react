"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import getDetailsEvent from "@/app/services/eventsDetails";
import Loading from "@/app/components/Loading";
import { EventItem } from "../../dashboard/page";
import Modal, { Guest } from "@/app/components/Guests";

// interface EventDetailsProps {
//   id: string;
//   name: string;
//   photo: string;
//   description: string;
//   confirmed: number;
//   date: string;
//   location: string;
//   like: boolean;
// }

// interface Guest {
//   id: string;
//   photo: string;
//   name: string;
// }

const EventDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      try {
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

  if (!event) return <Loading />;

  const formattedDate = format(new Date(event.date), "dd/MM/yyyy");

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <img
          src={event.photo}
          alt={event.description}
          className="w-full h-64 object-cover object-center"
        />
      </div>
      <div className="mt-4">
        <h4 className="text-xl font-semibold text-gray-800">{event.name}</h4>
        <span className="block text-gray-600">{event.description}.</span>
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">
            Confirmados
            <span className="text-red-500 ml-2">{count}</span>
          </h4>
          <span className="text-gray-600 block">{formattedDate}</span>
        </div>
      </div>
      <div className="mt-4">
        {/* <p className="text-gray-600">{event.description}</p> */}
        <h4 className="mt-4 text-xl font-semibold text-gray-800">Ingressos</h4>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">Local</h4>
          <span className="text-gray-600">{event.location}</span>
        </div>
        <div className="text-center">
          <div className="text-red-500">
            <AiOutlineHeart size={36} />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-600 mb-2 bg-red-500 text-white mt-20 rounded w-full h-12"
        >
          Ver Confirmados
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guests={guests}
      />
    </div>
  );
};

export default EventDetails;
