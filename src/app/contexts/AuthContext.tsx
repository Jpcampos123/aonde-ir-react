"use client";

import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../services/api";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
  phone: string;
  photo: string;
  role: number;
};

type ResponseUserProps = {
  data: UserProps;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};
export type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
  } catch {
    console.log("Erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      axiosInstance
        .post("auth/me")
        .then((response) => {
          const { id, name, email, phone, photo, role } = response.data.payLoad;

          setUser({
            id,
            name,
            email,
            token,
            phone,
            photo,
            role,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  // para logar com usuarios testes use '/teste' para usuarios efetivos use '/session'
  async function signIn({ email, password }: SignInProps) {
    try {
      const response: ResponseUserProps = await axiosInstance.post(
        "/auth/teste",
        {
          email,
          password,
        }
      );

      const { id, name, token, phone, photo, role } = response.data;
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 mês
        path: "/",
      });

      setUser({
        id,
        name,
        email,
        phone,
        photo,
        token,
        role,
      });
      axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      toast.success("Logado com sucesso");
    } catch (err) {
      toast.error("Erro ao acessar!");
      console.log("Erro ao fazer login", err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await axiosInstance.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso");
    } catch (err) {
      toast.error("Erro ao cadastrar!");
      console.log("Erro ao cadastrar", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
