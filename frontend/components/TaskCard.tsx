"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Task } from "@/types/task";

interface Props {
  task: Task;
  refresh: () => void;
}

export default function TaskCard({ task, refresh }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const toggle = async () => {
    await api.patch(`/tasks/${task.id}/toggle`);
    refresh();
  };

  const del = async () => {
    await api.delete(`/tasks/${task.id}`);
    refresh();
  };

  const update = async () => {
    await api.patch(`/tasks/${task.id}`, { title, description });
    setIsEditing(false);
    refresh();
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
      {isEditing ? (
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Edit Task</h4>
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 placeholder-gray-400"
            placeholder="Task title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900 placeholder-gray-400"
            placeholder="Task description"
          />

          <div className="flex gap-2 pt-2">
            <button
              onClick={update}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {task.title}
            </h3>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.status.toLowerCase() === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {task.status.toLowerCase() === "completed"
                ? "✓ Completed"
                : "○ Pending"}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-6 line-clamp-3">
            {task.description}
          </p>

          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <button
              onClick={toggle}
              className={`flex-1 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 ${
                task.status.toLowerCase() === "completed"
                  ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
                  : "bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {task.status.toLowerCase() === "completed"
                ? "Mark Pending"
                : "Complete"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 border border-blue-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              onClick={del}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 border border-red-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
