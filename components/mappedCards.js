"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function MappedCards({ tasks, setTasks }) {
  const deleteTask = async (id) => {
    if (id) {
      await fetch(
        "api/delete?" +
          new URLSearchParams({
            id: id,
          })
      ).then((res) => res.json());

      fetch("api/get")
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          console.log(data);
        });
    }
  };

  if (!tasks) {
    return <div>Loading...</div>;
  }
  return tasks.map((task, id) => (
    <div key={id} className="m-4">
      <Card className={cn("w-[380px]")}>
        <CardHeader className="flex flex-row">
          <div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.text}</CardDescription>
          </div>
          <div className="ml-auto">
            <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
              <Trash2 className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  ));
}
