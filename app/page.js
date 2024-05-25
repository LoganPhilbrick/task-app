"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState(null);
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("api/get")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        // setLoading(false);
        console.log(data);
      });
  }, []);

  if (!tasks) {
    return <div>Loading...</div>;
  }
  return tasks.map((task, index) => (
    <>
      <div key={index}>{task.title}</div>
      <div>{task.text}</div>
    </>
  ));
}
