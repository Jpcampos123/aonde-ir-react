"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoCloudUpload } from "react-icons/io5";
import Image from "next/image";
import CreateNewEvent from "@/app/services/createEvent";

export interface Data {
  name: string;
  description: string;
  date: string;
  photo: string;
  location: string;
}

const CreateEvent: React.FC = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    // time: "",
    description: "",
    location: "",
    // achievements: "",
    // tickets: "",
    photo:
      "https://drki4mwx2hl8h.cloudfront.net/3/imagens/196473434866799148191c55.42984551.1719243080_m.png",
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const EditPhoto = (item: any) => {
    const file = item.target.files[0];

    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Substitua 'API_ENDPOINT' pelo seu endpoint real
      const response = await CreateNewEvent(event);
      console.log(response);
      toast.success("Evento criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar evento.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Evento</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start mb-4">
          <div className="w-1/2 p-2">
            <label className="block text-sm font-bold mb-2" htmlFor="image">
              Seu evento aqui
            </label>
            <div className="border border-dashed relative border-gray-300 rounded-lg  flex flex-col items-center justify-center h-48 shadow-md">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover rounded-lg"
                  loading="lazy"
                  fill
                />
              ) : (
                <div className="items-center">
                  <span className="text-gray-400">Seu evento aqui</span>
                  <label
                    htmlFor="image"
                    className="cursor-pointer mt-2 text-red-500"
                  >
                    <span className="sr-only">Carregar imagem</span>
                    <IoCloudUpload className="mx-auto" size={28} />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={EditPhoto}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 p-2">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Nome do Evento*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={event.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="date">
                Data*
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={event.date}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="time">
                Horário*
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={event.time}
                onChange={handleChange}
                required
              />
            </div> */}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">
            Descrição
          </label>
          <textarea
            name="description"
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={event.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="location">
            Localização*
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="achievements"
          >
            Realizações
          </label>
          <textarea
            name="achievements"
            id="achievements"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={event.achievements}
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="tickets">
            Ingressos
          </label>
          <textarea
            name="tickets"
            id="tickets"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={event.tickets}
            onChange={handleChange}
          />
        </div> */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Criar Evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
