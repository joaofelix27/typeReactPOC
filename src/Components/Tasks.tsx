import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "../App.css";
import Task from "./Task";

export type Tasks = {
  id: string;
  title: string;
  complete: boolean;
  createdAt: Date;
};

export default function Tasks(): JSX.Element {
  const [taskInput, setTaskInput] = useState<string>("");
  const [taskArray, setTaskArray] = useState<Tasks[]>([]);

  useEffect(() => {
    const localTasksString : string | null = localStorage.getItem("Tasks");
    if (localTasksString !== null) {
      const localTasksParse= JSON.parse(localTasksString) as Tasks[];
      setTaskArray(localTasksParse);
    }
  }, []);

  function addTask(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!taskInput) return;
    const taskObject: Tasks = {
      id: uuid(),
      title: taskInput,
      complete: false,
      createdAt: new Date(),
    };
    setTaskArray((prev) => {
      const newArray: Tasks[] = [...prev];
      newArray.push(taskObject);
      localStorage.setItem("Tasks", JSON.stringify(newArray))
      return newArray;
    });

    setTaskInput("");
  }

  return (
    <>
      <h1 className="title">TO DO LIST</h1>
      <form onSubmit={addTask} className="toDoContainer">
        <input
          type="text"
          onChange={(e) => setTaskInput(e.target.value)}
          value={taskInput}
          placeholder="Insira uma tarefa"
        ></input>
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {taskArray.map((task, index) => {
          return (
            <Task key={index} tasks={taskArray}>
              {task}
            </Task>
          );
        })}
      </ul>
    </>
  );
}
