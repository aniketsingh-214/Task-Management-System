"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("accessToken", res.data.data.accessToken);
    setUser(res.data.data.user);
    router.push("/tasks");
  };

  const register = async (name: string, email: string, password: string) => {
    await api.post("/auth/register", { name, email, password });

    // Auto login after register
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("accessToken", res.data.data.accessToken);
    setUser(res.data.data.user);
    router.push("/tasks");
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

 useEffect(() => {
  const loadUser = async () => {
    try {
      const res = await api.post("/auth/refresh");
      localStorage.setItem("accessToken", res.data.data.accessToken);
      setUser(res.data.data.user); // ✅ THIS MAKES LOGOUT APPEAR
    } catch {
      setUser(null);
    }
  };

  loadUser();
}, []);


  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };
