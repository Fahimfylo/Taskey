"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import { useEffect } from "react";
import Filters from "../completed/Filters/Filters";
import TaskItem from "../Components/TaskItem/TaskItem";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalAdd, priority, setPriority } = useTasks();

  const pendingTasks = tasks.filter((task: Task) => !task.completed);
  
  const filtered = filteredTasks(pendingTasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-6 h-full ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Pending Tasks</h1>
        <Filters />
      </div>
      <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <button
          onClick={openModalAdd}
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
        >
          Add New Task
        </button>
      </div>
    </main>
  );
}