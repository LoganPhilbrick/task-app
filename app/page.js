"use client";

import MappedCards from "@/components/mappedCards";
import FormCard from "@/components/formCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [notDone, setNotDone] = useState(null);
  const [done, setDone] = useState(null);

  function returnDone(task) {
    return task.completed == true;
  }
  function returnNotDone(task) {
    return task.completed == false;
  }

  useEffect(() => {
    if (!notDone || !done) {
      fetch("api/get")
        .then((res) => res.json())
        .then((data) => {
          const done = data.filter(returnDone);
          setDone(done);
          const notDone = data.filter(returnNotDone);
          setNotDone(notDone);
        });
    }
  }, [done, notDone]);

  if (!done || !notDone) {
    <div className="flex justify-center items-center">
      <div>Loading...</div>
    </div>;
  }
  return (
    <main className="flex flex-col items-center ">
      <div>
        <FormCard setNotDone={setNotDone} setDone={setDone} />
        <MappedCards notDone={notDone} setNotDone={setNotDone} done={done} setDone={setDone} />
      </div>
    </main>
  );
}
