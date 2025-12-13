import { useTasks } from "../../context/TaskContext";
import { employees } from "../../data/db";
import { useState, useMemo } from "react";

export default function ShowTasks() {
  const { tasks, deleteTask } = useTasks();

  // 1️⃣ Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // 2️⃣ Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // 3️⃣ Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");

  // 4️⃣ Filtered Tasks Logic
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search Filter
    if (searchQuery.trim()) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status Filter - ✅ FIXED TYPO
    if (statusFilter !== "all") {
      result = result.filter((task) => task.status === statusFilter);
    }

    // Employee Filter
    if (employeeFilter !== "all") {
      result = result.filter(
        (task) => task.assignedTo === parseInt(employeeFilter)
      );
    }

    return result;
  }, [tasks, searchQuery, statusFilter, employeeFilter]);

  // 5️⃣ Clear Filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setEmployeeFilter("all");
  };

  // 6️⃣ Check Active Filters
  const hasActiveFilters =
    searchQuery || statusFilter !== "all" || employeeFilter !== "all";

  // 7️⃣ Helper: Get Employee Name
  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? employee.name : "Unknown Employee";
  };

  // 8️⃣ Helper: Status Color
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500";
      case "active":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500";
    }
  };

  // 9️⃣ Edit Handlers
  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  // 🔟 Delete Handlers
  const handleDeleteClick = (taskId) => {
    setDeleteConfirmId(taskId);
  };

  const confirmDelete = () => {
    deleteTask(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  return (
    <div className="mt-8 px-6 pb-6">
      <h2 className="text-white text-2xl font-semibold mb-6">All Tasks</h2>

      {/* FILTER SECTION */}
      <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="text-gray-300 text-sm mb-2 block">
              Search Tasks
            </label>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 
              rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 
              rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Employee Filter */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Assigned To
            </label>
            <select
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 
              rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="all">All Employees</option>
              {employees
                .filter((emp) => emp.role === "employee")
                .map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Results Count & Clear Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Showing{" "}
            <span className="text-blue-400 font-semibold">
              {filteredTasks.length}
            </span>{" "}
            of{" "}
            <span className="text-gray-300 font-semibold">{tasks.length}</span>{" "}
            tasks
          </p>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg 
              text-sm transition"
            >
              ✕ Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* EMPTY STATE - No Results After Filter */}
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="bg-gray-800/60 backdrop-blur-lg p-12 rounded-2xl border border-gray-700 text-center">
            <p className="text-gray-400 text-lg mb-2">No tasks found!</p>
            <p className="text-gray-500 text-sm mb-4">
              Try adjusting your filters or search query.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* EMPTY STATE - No Tasks Created */}
      {tasks.length === 0 && (
        <div className="flex items-center justify-center">
          <div className="bg-gray-800/60 backdrop-blur-lg p-12 rounded-2xl border border-gray-700 text-center">
            <p className="text-gray-400 text-lg">No tasks created yet!</p>
            <p className="text-gray-500 text-sm mt-2">
              Create your first task using the form above.
            </p>
          </div>
        </div>
      )}

      {/* TASKS GRID - ✅ ONLY ONE GRID (using filteredTasks) */}
      {filteredTasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 
              hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Header - Title + Status */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white text-lg font-semibold flex-1 mr-2">
                  {task.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {task.description}
              </p>

              {/* Meta Info */}
              <div className="space-y-2 border-t border-gray-700 pt-4 mb-4">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-24">Assigned To:</span>
                  <span className="text-blue-400 font-medium">
                    {getEmployeeName(task.assignedTo)}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-24">Due Date:</span>
                  <span className="text-gray-300">{task.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-24">Created:</span>
                  <span className="text-gray-300">
                    {new Date(task.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 
                  rounded-lg text-sm font-medium transition shadow hover:shadow-blue-500/30"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(task.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                  rounded-lg text-sm font-medium transition shadow hover:shadow-red-500/30"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditTaskModal
          task={editingTask}
          onClose={handleCloseEditModal}
          employeeList={employees}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 max-w-md w-full mx-4">
            <h3 className="text-white text-xl font-bold mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 
                rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// EDIT TASK MODAL COMPONENT
function EditTaskModal({ task, onClose, employeeList }) {
  const { updateTask } = useTasks();

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    date: task.date,
    assignedTo: task.assignedTo,
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setMessage({ type: "error", text: "Task title is required!" });
      return;
    }
    if (!formData.description.trim()) {
      setMessage({ type: "error", text: "Task description is required!" });
      return;
    }
    if (!formData.date) {
      setMessage({ type: "error", text: "Due date is required!" });
      return;
    }
    if (!formData.assignedTo) {
      setMessage({ type: "error", text: "Please assign to an employee!" });
      return;
    }

    updateTask(task.id, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: formData.date,
      assignedTo: parseInt(formData.assignedTo),
    });

    setMessage({ type: "success", text: "Task updated successfully!" });
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {message.text && (
            <div
              className={`p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500"
                  : "bg-red-500/20 text-red-400 border border-red-500"
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <label className="text-gray-300 mb-2 block">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 
              rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="text-gray-300 mb-2 block">Due Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 
              rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300 mb-2 block">Assign To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 
              rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Employee</option>
              {/* ✅ FIXED: Use employeeList prop */}
              {employeeList
                .filter((emp) => emp.role === "employee")
                .map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-gray-300 mb-2 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-700 
              rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Task description..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 
              rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 
              rounded-xl transition"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
