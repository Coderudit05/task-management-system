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
      setMessage({ type: "success", text: "✅ Task created successfully!" });

      // Reset form
      setTaskTitle("");
      setDate("");
      setAssignedTo("");
      setDescription("");

      // Clear message after 3s
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "❌ Failed to create task. Please try again.",
      });
    }
  };

  return (
    <div className="mt-5 px-4 sm:px-6 py-6">
      {/* ✅ Success/Error Toast Message */}
      {message.text && (
        <div
          className={`fixed top-20 right-4 sm:right-6 z-50 p-4 rounded-lg shadow-xl border-2 
          animate-slide-in max-w-sm ${
            message.type === "success"
              ? "bg-green-500/95 text-white border-green-400"
              : "bg-red-500/95 text-white border-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {message.type === "success" ? "✅" : "⚠️"}
            </span>
            <p className="font-medium">{message.text}</p>
          </div>
        </div>
      )}

      {/* ✅ RESPONSIVE CONTAINER */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ✅ RESPONSIVE GRID: Single column on mobile, 2 columns on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SECTION - Form Fields */}
            <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700">
              <h3 className="text-white text-xl font-semibold mb-5">
                Task Details
              </h3>

              <div className="space-y-5">
                {/* Task Title */}
                <div>
                  <label
                    htmlFor="taskTitle"
                    className="text-gray-300 mb-2 block text-sm font-medium"
                  >
                    Task Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="taskTitle"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl 
                    outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g., Fix login bug"
                  />
                </div>

                {/* Date & Assign To - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="text-gray-300 mb-2 block text-sm font-medium"
                    >
                      Due Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // ✅ Prevent past dates
                      className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl 
                      outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  {/* Assign To */}
                  <div>
                    <label
                      htmlFor="assignTo"
                      className="text-gray-300 mb-2 block text-sm font-medium"
                    >
                      Assign To <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="assignTo"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl 
                      outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select Employee</option>
                      {filteredEmployees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - Description */}
            <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col">
              <h3 className="text-white text-xl font-semibold mb-5">
                Task Description
              </h3>

              <div className="flex-1 flex flex-col">
                <label
                  htmlFor="description"
                  className="text-gray-300 mb-2 block text-sm font-medium"
                >
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={7}
                  className="flex-1 w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-xl 
                  outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition"
                  placeholder="Write detailed task description here...&#10;&#10;Example:&#10;- Fix the authentication bug on login page&#10;- Update user profile validation&#10;- Add error handling"
                ></textarea>
              </div>
            </div>
          </div>

          {/* ✅ SUBMIT BUTTON - Full width on mobile, auto on desktop */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl 
              text-sm font-semibold transition-all duration-200 
              hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              ✨ Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
