"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function TaskForm({ refresh }: { refresh: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const handleSubmit = async () => {
    await api.post("/tasks", { title, description });
    setTitle("");
    setDesc("");
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Create New Task</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={title}
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 placeholder-gray-400"
        />
        <input
          value={description}
          placeholder="Task description"
          onChange={(e) => setDesc(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 placeholder-gray-400"
        />
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Task
        </button>
      </div>
    </div>
  );
}
