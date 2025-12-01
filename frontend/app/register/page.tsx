"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success("Account created");
    } catch  {
      toast.error("Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} className="input" />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="input" />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} className="input" />
        <button className="btn">Register</button>
      </form>
    </div>
  );
}
