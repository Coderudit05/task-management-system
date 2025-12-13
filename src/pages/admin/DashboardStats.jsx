import { useTasks } from "../../context/TaskContext";
import { employees } from "../../data/db";
import { useMemo } from "react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardStats() {
  const { tasks } = useTasks();

  // Step 1: Calculate statistics
  const status = useMemo(() => {
    const total = tasks.length;
    const newTasks = tasks.filter((t) => t.status === "new").length;
    const activeTasks = tasks.filter((t) => t.status === "active").length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const failedTasks = tasks.filter((t) => t.status === "failed").length;

    const completionRate =
      total === 0 ? 0 : ((completedTasks / total) * 100).toFixed(1);

    return {
      total,
      newTasks,
      activeTasks,
      completedTasks,
      failedTasks,
      completionRate,
    };
  }, [tasks]);

  // Step 2: Pie Chart Data
  const statusChartData = useMemo(() => {
    return [
      { name: "New", value: status.newTasks, color: "#3b82f6" },
      { name: "Active", value: status.activeTasks, color: "#eab308" },
      { name: "Completed", value: status.completedTasks, color: "#22c55e" },
      { name: "Failed", value: status.failedTasks, color: "#ef4444" },
    ].filter((item) => item.value > 0);
  }, [status]);

  // Step 3: Bar Chart Data - ✅ FIXED: First name only
  const employeeChartData = useMemo(() => {
    const employeeList = employees.filter((emp) => emp.role === "employee");

    return employeeList.map((emp) => {
      const employeeTasks = tasks.filter((t) => t.assignedTo === emp.id);
      return {
        name: emp.name.split(" ")[0], // ✅ Only first name
        fullName: emp.name,
        tasks: employeeTasks.length,
        completed: employeeTasks.filter((t) => t.status === "completed").length,
        active: employeeTasks.filter((t) => t.status === "active").length,
        failed: employeeTasks.filter((t) => t.status === "failed").length,
      };
    });
  }, [tasks]);

  // Step 4: Custom Tooltip - ✅ IMPROVED
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-xl">
          <p className="text-white font-semibold mb-2">
            {label || payload[0].name}
          </p>
          <div className="space-y-1">
            {payload.map((item, index) => (
              <p key={index} style={{ color: item.color }} className="text-sm">
                {item.name}: {item.value} tasks
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // ✅ EMPTY STATE
  if (tasks.length === 0) {
    return (
      <div className="px-6 py-6">
        <h2 className="text-white text-3xl font-bold mb-4">
          Dashboard Overview
        </h2>
        <div className="bg-gray-800/60 backdrop-blur-lg p-12 rounded-2xl border border-gray-700 text-center">
          <span className="text-6xl mb-4 block">📊</span>
          <p className="text-gray-400 text-lg mb-2">
            No data to visualize yet!
          </p>
          <p className="text-gray-500 text-sm">
            Create your first task to see analytics and charts here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-white text-3xl font-bold">Dashboard Overview</h2>
        <p className="text-gray-400 mt-1">
          Real-time task management statistics
        </p>
      </div>

      {/* ✅ OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Tasks */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Total Tasks</h3>
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-white text-3xl font-bold">{status.total}</p>
          <p className="text-blue-400 text-xs mt-1">All time</p>
        </div>

        {/* New Tasks */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">New Tasks</h3>
            <span className="text-2xl">🆕</span>
          </div>
          <p className="text-white text-3xl font-bold">{status.newTasks}</p>
          <p className="text-blue-400 text-xs mt-1">Pending start</p>
        </div>

        {/* Active Tasks - ✅ FIXED */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Active</h3>
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-white text-3xl font-bold">{status.activeTasks}</p>
          <p className="text-yellow-400 text-xs mt-1">In progress</p>
        </div>

        {/* Completed Tasks - ✅ FIXED */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Completed</h3>
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-white text-3xl font-bold">
            {status.completedTasks}
          </p>
          <p className="text-green-400 text-xs mt-1">
            Success rate: {status.completionRate}%
          </p>
        </div>

        {/* Failed Tasks - ✅ FIXED */}
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Failed</h3>
            <span className="text-2xl">❌</span>
          </div>
          <p className="text-white text-3xl font-bold">{status.failedTasks}</p>
          <p className="text-red-400 text-xs mt-1">Need review</p>
        </div>
      </div>

      {/* ✅ CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700">
          <h3 className="text-white text-xl font-semibold mb-4">
            Task Status Distribution
          </h3>
          {statusChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-500">No tasks to display</p>
            </div>
          )}
        </div>

        {/* BAR CHART */}
        <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700">
          <h3 className="text-white text-xl font-semibold mb-4">
            Tasks by Employee
          </h3>
          {employeeChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="completed"
                  fill="#22c55e"
                  name="Completed"
                  animationDuration={800}
                />
                <Bar
                  dataKey="active"
                  fill="#eab308"
                  name="Active"
                  animationDuration={800}
                />
                <Bar
                  dataKey="failed"
                  fill="#ef4444"
                  name="Failed"
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-500">No employee data available</p>
            </div>
          )}
        </div>
      </div>

      {/* ✅ PROGRESS BARS */}
      <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700">
        <h3 className="text-white text-xl font-semibold mb-4">
          Employee Performance
        </h3>
        <div className="space-y-4">
          {employeeChartData.map((emp, index) => {
            const completionRate =
              emp.tasks > 0
                ? ((emp.completed / emp.tasks) * 100).toFixed(1)
                : 0;

            return (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">
                    {emp.fullName}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {emp.completed}/{emp.tasks} tasks ({completionRate}%)
                  </span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
