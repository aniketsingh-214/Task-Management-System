"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-5 rounded-xl shadow-lg border border-gray-100 space-y-3"
      >
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          Login
        </h2>

        <input
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition-all shadow hover:shadow-md mt-3">
          Login
        </button>

        <p className="text-xs text-center text-gray-500 mt-3">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Create one
          </a>
        </p>
      </form>
    </div>
  );
}
