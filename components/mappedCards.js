"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function MappedCards({ tasks, setTasks }) {
  if (!tasks) {
    return <div>Loading...</div>;
  }
  return tasks.map((task, index) => (
    <div key={index} className="m-4">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.text}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ));
}
