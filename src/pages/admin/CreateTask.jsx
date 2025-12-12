import { employees } from "../../data/db";
import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

export default function CreateTask() {
  const { createTask } = useTasks();
  const { user } = useAuth();

  const [taskTitle, setTaskTitle] = useState("");
  const [date, setDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const filteredEmployees = employees.filter(
    (user) => user.role === "employee"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!taskTitle.trim()) {
      setMessage({ type: "error", text: "Task title is required!" });
      return;
    }

    if (!date) {
      setMessage({ type: "error", text: "Please select a date!" });
      return;
    }

    if (!assignedTo) {
      setMessage({ type: "error", text: "Please select an employee!" });
      return;
    }

    if (!description.trim()) {
      setMessage({ type: "error", text: "Task description is required!" });
      return;
    }

    const taskData = {
      title: taskTitle.trim(),
      date: date,
      assignedTo: parseInt(assignedTo),
      description: description.trim(),
      createdBy: user.id,
    };

    try {
      createTask(taskData);
      setMessage({ type: "success", text: "Task created successfully!" });

      setTaskTitle("");
      setDate("");
      setAssignedTo("");
      setDescription("");

      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to create task. Please try again.",
      });
    }
  };
  return (
    <div className="mt-5 bg-gray-900 p-6 flex items-center justify-center w-full">
      {/* ✅ Success/Error Message */}
      {message.text && (
        <div
          className={`fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg ${
            message.type === "success"
              ? "bg-green-500/90 text-white border border-green-400"
              : "bg-red-500/90 text-white border border-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-6 w-full">
        {/* Left Section */}
        <form
          id="taskForm" // ✅ Form ID
          onSubmit={handleSubmit} // ✅ onSubmit handler
          className="flex-1 bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700"
        >
          <h2 className="text-white text-xl font-semibold mb-4">
            Create New Task
          </h2>

          <div className="space-y-5">
            {/* Task Title */}
            <div>
              <label htmlFor="taskTitle" className="text-gray-300 mb-1 block">
                Task Title
              </label>
              <input
                type="text"
                id="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl 
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task title"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="text-gray-300 mb-1 block">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl 
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Assign To */}
            <div>
              <label htmlFor="assignTo" className="text-gray-300 mb-1 block">
                Assign To
              </label>
              <select
                id="assignTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl 
                outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Employee</option>
                {filteredEmployees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    Employee Id : {emp.id} Employee name : {emp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex-1 bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col">
          <h2 className="text-white text-xl font-semibold mb-4">
            Task Description
          </h2>

          <textarea
            rows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            form="taskForm" // ✅ Form se link
            className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl 
            outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Write task details here..."
          ></textarea>

          <div className="flex justify-end pt-4">
            <button
              type="submit" // ✅ Type submit
              form="taskForm" // ✅ Form se link
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium 
              hover:bg-blue-700 transition hover:shadow-blue-500/20 hover:shadow-lg"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
