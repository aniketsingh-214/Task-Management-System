"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Task } from "@/types/task";
import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.data.tasks);
  };

  useEffect(() => {
    const load = async () => {
      await fetchTasks();
    };
    load();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
            <p className="text-gray-600">
              Manage and organize your daily tasks
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <TaskForm refresh={fetchTasks} />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">All Tasks</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-500">
                Create your first task to get started
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} refresh={fetchTasks} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
