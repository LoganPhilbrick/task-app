"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

export default function FormCard({ setNotDone }) {
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
    setNotDone(updatedTasks);
    formRef.current.reset();
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
    <div className="m-4 flex justify-center">
      <form action={submit} ref={formRef}>
        <Card className="w-[340px] sm:w-[380px]">
          <CardHeader>
            <textarea required style={{ resize: "none" }} className="rounded-md text-xl  border p-1" cols={1} placeholder="Title your task..." onChange={handleTitleChange} />
            <textarea required style={{ resize: "none" }} className="rounded-md  border p-1" cols={1} placeholder="Task details..." onChange={handleTextChange} />
          </CardHeader>
          <Button className="mb-6 ml-6 bg-sky-500" variant="outline" type="submit">
            submit
          </Button>
        </Card>
      </form>
    </div>
  );
}
