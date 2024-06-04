"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash2, CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MappedCards({ notDone, setNotDone, done, setDone }) {
  function returnDone(task) {
    return task.completed == true;
  }
  function returnNotDone(task) {
    return task.completed == false;
  }

  const deleteTask = async (id) => {
    if (id) {
      const res = await fetch(
        "api/delete?" +
          new URLSearchParams({
            id: id,
          })
      );
      const data = await res.json();

      const done = data.filter(returnDone);
      setDone(done);
      const notDone = data.filter(returnNotDone);
      setNotDone(notDone);
    }
  };

  const completeTask = async (id) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    if (id) {
      const res = await fetch(
        "api/complete?" +
          new URLSearchParams({
            id: id,
            date: date,
            time: time,
          })
      );
      const data = await res.json();

      const done = data.filter(returnDone);
      setDone(done);
      const notDone = data.filter(returnNotDone);
      setNotDone(notDone);
    }
  };

  if (!notDone) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <div className="flex justify-center w-96 mx-4">
          <h2 className="font-bold text-lg">Tasks</h2>
        </div>
        {notDone.map((task, id) => (
          <div key={id} className="w-96 m-4 flex justify-center group relative">
            <Card className=" w-[340px] sm:w-[380px] group-hover:blur-sm">
              <CardHeader className="flex flex-row">
                <div className="w-4/6">
                  <CardTitle className="pb-1">{task.title}</CardTitle>
                  <CardDescription className="mt-1 break-words">{task.text}</CardDescription>
                  <CardDescription className="text-gray-400 mt-5">
                    created {task.date}
                    {task.time}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
            <div className="flex flex-row justify-evenly items-center h-full w-[340px] sm:w-[380px] absolute top-0 bg-zinc-900/50 rounded-lg invisible group-hover:visible">
              <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => completeTask(task.id)}>
                <CircleCheckBig className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <div className="flex justify-center w-96 mx-4">
          <h2 className="font-bold text-lg">Complete</h2>
        </div>
        {done.map((task, id) => (
          <div key={id} className="w-96 m-4 flex justify-center group relative">
            <Card className="bg-green-300 w-[340px] sm:w-[380px] group-hover:blur-sm">
              <CardHeader className="flex flex-row">
                <div className="w-5/6">
                  <CardTitle className="truncate pb-1">{task.title}</CardTitle>
                  <CardDescription className="mt-1 truncate">{task.text}</CardDescription>
                  <CardDescription className="text-gray-400 mt-5 flex items-center">
                    <CircleCheckBig className="mr-2 size-4" /> completed {task.date} {task.time}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
            <div className="flex flex-row justify-evenly items-center h-full w-[340px] sm:w-[380px] absolute top-0 bg-zinc-900/50 rounded-lg invisible group-hover:visible">
              <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
