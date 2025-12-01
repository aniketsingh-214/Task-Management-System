"use client";

import { api } from "@/lib/api";

import { Task } from "@/types/task";

interface Props {
  task: Task;
  refresh: () => void;
}

export default function TaskCard({ task, refresh }: Props){
  const toggle = async () => {
    await api.patch(`/tasks/${task.id}/toggle`);
    refresh();
  };

  const del = async () => {
    await api.delete(`/tasks/${task.id}`);
    refresh();
  };

  return (
    <div className="border p-2">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={del}>Delete</button>
    </div>
  );
}
