"use client";
// pages/index.tsx
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getEvents from "./services/events";
import EventCard from "./components/Events";
import Loading from "./components/Loading";
import whatshot from "../../public/assets/whatshot.svg";
import { AuthContext, UserProps } from "@/app/contexts/AuthContext";

export type EventItem = {
  id: string;
  photo: string;
  name: string;
  date: string;
  description: string;
  status: string;
  location: string;
  created_at: string;
  updated_at: string;
  hostId: string;
};

interface EventResponse {
  data: EventItem;
}

export interface EventCardProps {
  event: EventItem;
  handleDetails: (id: string) => void;
}

const Home = () => {
  const [events, setEvents] = useState<EventItem[] | []>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const [img, setImg] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      try {
        setImg(user?.photo as string);
        const response = await getEvents();
        setLoading(false);
        return setEvents(response);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }

    loadEvents();
  }, [user]);

  const handleDetails = async (id: string) => {
    setLoading(true);

    await router.push(`/pages/Details/${id}`);
    setLoading(false);
  };

  // const handleEvent = (item: string) => {
  //   setLoading(true);
  //   router.push(`/Details/${item}}`);
  //   setLoading(false);
  // };

  if (loading && img) {
    return <Loading />;
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("../../assets/Rectangle.png"), linear-gradient(
      180deg,
      #d5281e 44.98%,
      rgba(213, 40, 30, 0) 112.15%
    )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover, cover",
          backgroundPosition: "right, center",
          width: "100vw",
          height: "279px",
          marginBottom: "27px",
          mixBlendMode: "normal",
          borderRadius: "0px 0px 0px 77px",
        }}
      >
        <div className="pt-8 text-white">
          <div className="flex items-center p-2">
            <Image
              src={img}
              alt={user?.name as string}
              width={50}
              height={50}
              className="w-12 h-12 rounded-full object-cover"
              onError={() => setHasError(true)}
            />
            <h2 className="p-1 font-bold text-xl">
              Olá, <br /> {user?.name}
            </h2>
          </div>

          <div className="block text-left items-center text-white p-2 ">
            <h2 className="">
              Não sabe aonde ir? Veja aqui quais festas estão rolando!
            </h2>
          </div>
        </div>
      </div>

      {/* section */}
      <div className="container mx-auto my-8 text-center lg:text-left">
        <div className="flex row justify-start q-ml-lg ml-6">
          <h1 className="text-3xl font-bold ">Hoje! </h1>
          <Image
            className="object-contain"
            src={whatshot}
            alt="Whatshot"
            width={24}
            height={24}
          />
        </div>

        <div className="flex overflow-x-scroll space-x-4 p-4">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                handleDetails={handleDetails}
              />
            ))
          ) : (
            <p>Nenhum filme encontrado</p>
          )}
        </div>
      </div>

      <div className="container mx-auto my-8 text-center lg:text-left">
        <div className="flex row justify-start q-ml-lg">
          <h1 className="text-3xl font-bold ml-6">Fire </h1>
          <Image
            className="object-contain"
            src={whatshot}
            alt="Whatshot"
            width={24}
            height={24}
          />
        </div>
        {/* section */}
        <div className="flex overflow-x-scroll space-x-4 p-4">
          {events.length > 0
            ? events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  handleDetails={handleDetails}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Home;
