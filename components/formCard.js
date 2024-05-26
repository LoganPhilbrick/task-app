"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function FormCard({ setTasks }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const submit = () => {
    fetch(
      "api/add?" +
        new URLSearchParams({
          title: title,
          text: text,
        })
    ).then((res) => res.json());

    fetch("api/get")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
      });
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setText(value);
  };

  return (
    <div className="m-4">
      <form action={submit}>
        <Card className={cn("w-[380px]")}>
          <CardHeader>
            <textarea required style={{ resize: "none" }} className="rounded-md text-xl  border p-1" cols={1} placeholder="Title your task..." onChange={handleTitleChange} />
            <textarea required style={{ resize: "none" }} className="rounded-md  border p-1" cols={1} placeholder="Task details..." onChange={handleTextChange} />
          </CardHeader>
          <button className=" rounded-md ml-6 mb-6" type="submit">
            submit
          </button>
        </Card>
      </form>
    </div>
  );
}
