"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import arrowLeft from "../../../../public/assets/arrowLeft.png";
import { AuthContext } from "../../contexts/AuthContext";
import { canSSRGuest } from "../../utils/canSSRGuest";
const FormPage = () => {
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPwd, setIsPwd] = useState(true);
  const router = useRouter();
  const { signIn, signUp } = useContext(AuthContext);

  

  const handleBack = () => {
    setLoading(true);
    router.back();
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      await signIn({ email, password });
      router.push("/pages/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }

    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      await signUp({ name, email, password });
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (register) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className=" ">
      <div
        className="relative h-52 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/assets/backgroundBar.png')" }}
      >
        <Image
          src={arrowLeft}
          alt="Voltar"
          className="absolute top-24 left-4 cursor-pointer"
          onClick={handleBack}
        />
      </div>
      <div className="text-center mt-8">
        <form onSubmit={handleSubmit}>
          <div className="pb-5">
            <h3 className="text-4xl font-bold text-red-600">
              {register ? "Cadastrar" : "Entrar"}
            </h3>
            {!register && (
              <span className="block mt-2">Assine para continuar</span>
            )}
          </div>
          <div className="mb-4 mx-6">
            {register && (
              <div className="mb-4 ">
                <label className="block text-left mb-1">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-left mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-left mb-1">Senha</label>
              <div className="relative">
                <input
                  type={isPwd ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={() => setIsPwd(!isPwd)}
                >
                  {isPwd ? "Mostrar" : "Esconder"}
                </span>
              </div>
            </div>
          </div>
          {!register && (
            <div className="mb-4 mx-6 text-right">
              <span className="cursor-pointer text-sm font-semibold">
                Esqueceu a senha?
              </span>
            </div>
          )}
          <div className="mb-4 mx-6">
            <button
              type="submit"
              className={`w-full py-2 text-white font-bold rounded-md ${
                loading ? "bg-gray-500" : "bg-red-600"
              }`}
              disabled={loading}
            >
              {loading ? "Carregando..." : register ? "Registrar" : "Entrar"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm font-bold">
              {register ? "Possui conta?" : "Não tem conta?"}{" "}
            </span>
            <span
              className="cursor-pointer text-sm font-bold text-red-600"
              onClick={() => setRegister(!register)}
            >
              {register ? "Ir para login" : "Inscreva-se"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
