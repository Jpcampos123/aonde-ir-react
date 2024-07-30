"use client";
import Loading from "@/app/components/Loading";
import { AuthContext } from "@/app/contexts/AuthContext";
// components/Profile.js

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [name, setName] = useState("Rafaella Almeida");
  const [email, setEmail] = useState("rafaellacostasales@hotmail.com");
  const [password, setPassword] = useState("**********");
  const [accountType, setAccountType] = useState("Convidado(a)");
  const [birthdate, setBirthdate] = useState("19/08/1999");
  const [gender, setGender] = useState("Lorem ipsum");
  const Auth = useContext(AuthContext);
  const { signOut } = useContext(AuthContext);
  const user = Auth.user;
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const EditPhoto = (item: any) => {
    const file = item.target.files[0];

    setUrl(URL.createObjectURL(file));
  };

  const handleGetOut = () => {
    setLoading(false);
    try {
      signOut();
      router.push("/");
      setLoading(false);
      router.refresh();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    function loadProfile() {
      try {
        setLoading(false);
        return;
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }

    loadProfile();
  }, [user]);

  if (!user?.photo) return <Loading />;

  return (
    <div className="max-w-md mx-auto bg-white  overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="flex items-center">
            {user?.photo ? (
              <Image
                src={user.photo}
                alt="Profile Photo"
                width={50}
                height={50}
                className="object-cover rounded-full"
              />
            ) : (
              <Image
                src="https://cdn.quasar.dev/img/avatar.png"
                alt="Avatar"
                width={50}
                height={50}
                className="object-cover"
              />
            )}
            <div className="ml-4 flex justify-between w-full">
              <div className="">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-gray-500">
                  {" "}
                  {user?.role === 1 ? "Convidado" : "Administrador"}
                </p>
              </div>
              <div>
                <CiLogout
                  className="text-red-500 cursor-pointer"
                  size={24}
                  onClick={handleGetOut}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <form className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  value={user?.name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  value={user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  value={user?.phone}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data de nascimento
                  </label>
                  <input
                    type="text"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <div className="flex px-1 items-center justify-between">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="profileImage"
                      onChange={EditPhoto}
                    />
                    <label
                      className="text-gray-700 text-sm font-medium mr-1 cursor-pointer "
                      htmlFor="profileImage"
                    >
                      Editar foto
                    </label>
                    <FaRegEdit className="text-zinc-800 opacity-80" />
                  </div>

                  {url ? (
                    <Image
                      src={url}
                      alt="Profile Photo"
                      width={50}
                      height={50}
                      className="object-cover rounded-full mx-auto  text-red-500 mt-1"
                    />
                  ) : (
                    <CgProfile size={40} className="" />
                  )}
                </div>
              </div>

              <div className="">
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-red-500  text-white rounded-md mt-6"
                >
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
