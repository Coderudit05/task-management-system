import { createContext, useContext, useState, useEffect } from "react";

// create TaskContext

const TaskContext = createContext();

// Provider Component

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  // firstly load tasks from local storage when app loads
  useEffect(() => {
    // fetch tasks from local storage on initial load
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      setTasks(Array.isArray(savedTasks) ? savedTasks : []);
    } catch (error) {
      console.error("Unable to read saved tasks:", error);
      setTasks([]);
    } finally {
      setTasksLoaded(true);
    }
  }, []);

  // now whenever tasks change, update local storage

  useEffect(() => {
    if (!tasksLoaded) return;

    try {
      // Persist empty arrays too, so deleting the final task stays deleted.
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Unable to save tasks:", error);
    }
  }, [tasks, tasksLoaded]);

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

  // Edit / Update Task : Ye function ke help se ham kisi task ko edit kar sakte hain

  const updateTask = (taskId, updatedData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
  };

  // Delete Task : Ye function ke help se ham kisi task ko delete kar sakte hain
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Get Single Task by ID : Ye function ke help se ham kisi specific task ko uske ID ke through fetch kar sakte hain
  const getTaskById = (taskId) => {
    return tasks.find((task) => task.id === taskId);
  };

  const value = {
    // ye hame esliye export karna hai taaki hum useContext me use kar sake
    tasks,
    createTask,
    updateTaskStatus,
    updateTask, // edit task
    deleteTask,
    getTaskById,
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
