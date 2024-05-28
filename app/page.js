"use client";

import MappedCards from "@/components/mappedCards";
import FormCard from "@/components/formCard";
import { ModeToggle } from "@/components/modeToggle";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState(null);

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
    <main>
      <FormCard setTasks={setTasks} />
      <MappedCards tasks={tasks} setTasks={setTasks} />
      <ModeToggle />
    </main>
  );
}
