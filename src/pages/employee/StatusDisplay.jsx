import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

export default function StatusDisplay() {
  // 1️⃣ Context se data fetch
  const { tasks } = useTasks();
  const { user } = useAuth(); // Current logged employee

  // 2️⃣ Filter - Sirf is employee ke tasks
  const myTasks = tasks.filter((task) => task.assignedTo === user.id);

  // 3️⃣ Count by status - Har status ke tasks count karo
  const statusCounts = {
    new: myTasks.filter((task) => task.status === "new").length,
    active: myTasks.filter((task) => task.status === "active").length,
    completed: myTasks.filter((task) => task.status === "completed").length,
    failed: myTasks.filter((task) => task.status === "failed").length,
  };

  // 4️⃣ Status cards configuration
  const statusCards = [
    {
      label: "New Tasks",
      count: statusCounts.new,
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
      borderColor: "border-blue-500",
      icon: "📋",
    },
    {
      label: "Active",
      count: statusCounts.active,
      bgColor: "bg-yellow-500/20",
      textColor: "text-yellow-400",
      borderColor: "border-yellow-500",
      icon: "⚡",
    },
    {
      label: "Completed",
      count: statusCounts.completed,
      bgColor: "bg-green-500/20",
      textColor: "text-green-400",
      borderColor: "border-green-500",
      icon: "✅",
    },
    {
      label: "Failed",
      count: statusCounts.failed,
      bgColor: "bg-red-500/20",
      textColor: "text-red-400",
      borderColor: "border-red-500",
      icon: "❌",
    },
  ];

  return (
    <div>
      <h2 className="text-white text-2xl font-semibold mb-6">
        Task Overview
      </h2>

      {/* Grid layout - 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} ${card.borderColor} border-2 rounded-2xl p-6 
            backdrop-blur-lg hover:scale-105 transition-transform`}
          >
            {/* Icon */}
            <div className="text-4xl mb-3">{card.icon}</div>

            {/* Count */}
            <div className={`${card.textColor} text-4xl font-bold mb-2`}>
              {card.count}
            </div>

            {/* Label */}
            <div className="text-gray-300 text-sm font-medium">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}