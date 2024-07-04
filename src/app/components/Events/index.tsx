"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { EventCardProps } from "@/app/page";
import { format } from "date-fns";
import fireRed from '../../../../public/assets/fireRed.svg'
import Image from "next/image";

const EventCard: React.FC<EventCardProps> = ({ event, handleDetails }) => {
  const router = useRouter();

  const formattedDate = format(new Date(event.date), "dd/MM/yyyy");

  const handleNavigateToDetails = () => {
    handleDetails(event.id);
  };

  const truncate = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <div className="w-60 flex-shrink-0 mx-2 my-4 bg-white rounded-lg overflow-hidden shadow-lg flex flex-col justify-between">
      <div>
        <div className="relative h-40">
          <img
            className="w-full h-full object-cover object-center"
            src={event.photo}
            alt={event.description}
          />
        </div>
        <div className="p-2">
          <h3 className="text-md font-bold mb-1">{event.name}</h3>
          <span className="text-gray-500 text-sm block mb-2">
            {formattedDate}
          </span>
          <p className="text-gray-700 text-sm overflow-hidden">
            {truncate(event.description, 80)}
          </p>
        </div>
      </div>
      <div className="p-2 mt-auto flex justify-between items-end">
        <button
          className="bg-red-500 hover:bg-700 text-white font-bold py-1 px-2 rounded text-xs"
          onClick={handleNavigateToDetails}
        >
          Detalhes
        </button>
        {/* <Image
          src={fireRed}
          alt="Voltar"
          className="absolute top-24 left-4 cursor-pointer"
          
        /> */}
      </div>
    </div>
  );
};

export default EventCard;
