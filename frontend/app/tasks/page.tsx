"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Task } from "@/types/task";
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
    <div className="p-6">
      <TaskForm refresh={fetchTasks} />
      <div className="grid gap-4 mt-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} refresh={fetchTasks} />
        ))}
      </div>
    </div>
  );
}
