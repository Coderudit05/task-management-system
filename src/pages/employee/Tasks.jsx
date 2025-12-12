import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Tasks() {
  // 1️⃣ Context se data
  const { tasks, updateTaskStatus } = useTasks(); // ✅ updateTaskStatus import karo
  const { user } = useAuth();

  // 2️⃣ Loading state
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  // 3️⃣ Filter - Employee ke tasks
  const myTasks = tasks.filter((task) => task.assignedTo === user.id);

  // 4️⃣ Status color
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

  // 5️⃣ Handle status update - YE IMPORTANT HAI!
  const handleStatusUpdate = (taskId, newStatus) => {
    console.log("Updating task:", taskId, "to status:", newStatus); // ✅ Debug log

    setUpdatingTaskId(taskId);
    updateTaskStatus(taskId, newStatus);

    setTimeout(() => {
      setUpdatingTaskId(null);
    }, 500);
  };

  // 6️⃣ Empty state
  if (myTasks.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-white text-2xl font-semibold mb-4">Your Tasks</h1>
        <div className="bg-gray-800/60 backdrop-blur-lg p-12 rounded-2xl border border-gray-700 text-center">
          <p className="text-gray-400 text-lg">No tasks assigned yet!</p>
          <p className="text-gray-500 text-sm mt-2">
            You'll see your tasks here once admin assigns them.
          </p>
        </div>
      </div>
    );
  }

  // 7️⃣ Tasks display
  return (
    <div className="p-6">
      <h1 className="text-white text-2xl font-semibold mb-4">
        Your Tasks ({myTasks.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl hover:shadow-gray-700/40 transition"
          >
            {/* Header - Title + Status Badge */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl text-white font-bold flex-1 mr-2">
                {task.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-4">
              {task.description}
            </p>

            {/* Deadline */}
            <p className="text-gray-400 text-sm mb-4">Deadline: {task.date}</p>

            {/* Status Update Buttons */}
            <div className="space-y-2">
              {/* NEW → ACTIVE */}
              {task.status === "new" && (
                <button
                  onClick={() => handleStatusUpdate(task.id, "active")}
                  disabled={updatingTaskId === task.id}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 
                  rounded-lg transition shadow-md hover:shadow-yellow-500/30 disabled:opacity-50"
                >
                  {updatingTaskId === task.id ? "Starting..." : "Start Task"}
                </button>
              )}

              {/* ACTIVE → COMPLETED or FAILED */}
              {task.status === "active" && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStatusUpdate(task.id, "completed")}
                    disabled={updatingTaskId === task.id}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 
                    rounded-lg transition shadow-md hover:shadow-green-500/30 disabled:opacity-50"
                  >
                    {updatingTaskId === task.id ? "Completing..." : "Complete"}
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(task.id, "failed")}
                    disabled={updatingTaskId === task.id}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                    rounded-lg transition shadow-md hover:shadow-red-500/30 disabled:opacity-50"
                  >
                    {updatingTaskId === task.id ? "Marking..." : "Failed"}
                  </button>
                </div>
              )}

              {/* FINAL STATES - No buttons */}
              {(task.status === "completed" || task.status === "failed") && (
                <div className="text-center text-gray-400 text-sm py-2 bg-gray-700/50 rounded-lg">
                  Task {task.status}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
