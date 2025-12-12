import { createContext, useContext, useState, useEffect } from "react";

// create TaskContext

const TaskContext = createContext();

// Provider Component

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // firstly load tasks from local storage when app loads
  useEffect(() => {
    // fetch tasks from local storage on initial load
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // now whenever tasks change, update local storage

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // function to add new task
  const createTask = (taskData) => {
    const newTask = {
      id: Date.now(), // unique id based on timestamp
      ...taskData, // spread task data so that title,date,assignedTo comes here
      status: "new", // default status
      createdAt: new Date().toISOString(), // timestamp
    };

    // update tasks state
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // update task function ( for status update) iska matlab hai ke hum kisi task ko update kar sakte hain

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const value = {
    // ye hame esliye export karna hai taaki hum useContext me use kar sake
    tasks,
    createTask,
    updateTaskStatus,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// custom hook

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
