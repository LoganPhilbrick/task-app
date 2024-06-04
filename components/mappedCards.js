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

  if (!notDone) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex">
      <div>
        {notDone.map((task, id) => (
          <div key={id} className="w-96 m-4">
            <Card className="group">
              <CardHeader className="flex flex-row">
                <div className="w-5/6">
                  <CardTitle className="pb-1">{task.title}</CardTitle>
                  <CardDescription className="text-gray-700 mt-1 break-words">{task.text}</CardDescription>
                  <CardDescription className="text-gray-400 mt-5">
                    created {task.date} {task.time}
                  </CardDescription>
                </div>
                <div className="ml-auto flex flex-col justify-center invisible group-hover:visible">
                  <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
                    <Trash2 className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <div>
        {done.map((task, id) => (
          <div key={id} className="m-4 w-96">
            <Card className="group ">
              <CardHeader className="flex flex-row">
                {/* ^^ style={{ filter: "blur(1px)" }} ^^ */}
                <div className="w-5/6">
                  <CardTitle className="truncate pb-1">{task.title}</CardTitle>
                  <CardDescription className="text-gray-700 mt-1 truncate">{task.text}</CardDescription>
                  <CardDescription className="text-gray-400 mt-5">
                    created {task.date} {task.time}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
