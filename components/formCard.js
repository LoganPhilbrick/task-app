"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

export default function FormCard({ setTasks }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const formRef = useRef();

  const submit = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const res = await fetch(
      "api/add?" +
        new URLSearchParams({
          title: title,
          text: text,
          date: date,
          time: time,
        })
    );
    const updatedTasks = await res.json();
    setTasks(updatedTasks);
    formRef.current.reset();
    // console.log(updatedTasks);
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
      <form action={submit} ref={formRef}>
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
