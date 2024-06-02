"use client";

import MappedCards from "@/components/mappedCards";
import FormCard from "@/components/formCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState(null);
  const completedTasks = [
    { title: "Tasks title is too long to fit on single line", text: "Text for the task goes here and describes the task hhhhhhhhhhhhh.", date: "06/26/2024 11:50 pm" },
    { title: "Tasks title", text: "Describes the task.", date: "06/26/2024 11:50 pm" },
  ];

  useEffect(() => {
    if (tasks === null) {
      fetch("api/get")
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        });
    }
  }, [tasks]);

  if (!tasks) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex flex-col items-center">
      <div>
        <FormCard setTasks={setTasks} />
        <MappedCards tasks={tasks} setTasks={setTasks} done={completedTasks} />
      </div>
    </main>
  );
}
