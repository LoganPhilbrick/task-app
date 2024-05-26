"use client";

import MappedCards from "@/components/mappedCards";
import FormCard from "@/components/formCard";
import { ModeToggle } from "@/components/modeToggle";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetch("api/get")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
      });
  }, []);

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
