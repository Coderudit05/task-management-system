import { useTasks } from "../../context/TaskContext";
import { employees } from "../../data/db";

export default function ShowTasks() {
  // 1️⃣ Context se tasks fetch karo
  const { tasks } = useTasks();

  // 2️⃣ Helper function - Employee ID se naam nikalna
  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? employee.name : "Unknown Employee";
  };

  // 3️⃣ Helper function - Status ke liye color class
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

  // 4️⃣ Empty state check - Agar tasks nahi hain
  if (tasks.length === 0) {
    return (
      <div className="mt-8 flex items-center justify-center">
        <div className="bg-gray-800/60 backdrop-blur-lg p-12 rounded-2xl border border-gray-700 text-center">
          <p className="text-gray-400 text-lg">No tasks created yet!</p>
          <p className="text-gray-500 text-sm mt-2">
            Create your first task using the form above.
          </p>
        </div>
      </div>
    );
  }

  // 5️⃣ Tasks display - Grid layout
  return (
    <div className="mt-8 px-6 pb-6">
      <h2 className="text-white text-2xl font-semibold mb-6">All Tasks</h2>

      {/* Grid Layout - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 
            hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
          >
            {/* Task Header - Title + Status Badge */}
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

            {/* Task Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {task.description}
            </p>

            {/* Task Meta Info */}
            <div className="space-y-2 border-t border-gray-700 pt-4">
              {/* Assigned To */}
              <div className="flex items-center text-sm">
                <span className="text-gray-500 w-24">Assigned To:</span>
                <span className="text-blue-400 font-medium">
                  {getEmployeeName(task.assignedTo)}
                </span>
              </div>

              {/* Due Date */}
              <div className="flex items-center text-sm">
                <span className="text-gray-500 w-24">Due Date:</span>
                <span className="text-gray-300">{task.date}</span>
              </div>

              {/* Created Date */}
              <div className="flex items-center text-sm">
                <span className="text-gray-500 w-24">Created:</span>
                <span className="text-gray-300">
                  {new Date(task.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
