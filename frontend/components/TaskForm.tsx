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
    <div className="space-x-2">
      <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input value={description} placeholder="Description" onChange={(e) => setDesc(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
