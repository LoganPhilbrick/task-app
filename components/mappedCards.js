"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MappedCards({ tasks, setTasks }) {
  const deleteTask = async (id) => {
    if (id) {
      const res = await fetch(
        "api/delete?" +
          new URLSearchParams({
            id: id,
          })
      );
      const updatedTasks = await res.json();
      setTasks(updatedTasks);
      // console.log(updatedTasks);
    }
  };

  if (!tasks) {
    return <div>Loading...</div>;
  }
  return tasks.map((task, id) => (
    <div key={id} className="m-4">
      <Card className="w-96 group">
        <CardHeader className="flex flex-row">
          <div>
            <CardTitle className="">{task.title}</CardTitle>
            <CardDescription className="text-gray-700 mt-1">{task.text}</CardDescription>
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
  ));
}
