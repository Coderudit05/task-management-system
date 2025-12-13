import Navbar from "../Navbar";
import CreateTask from "./CreateTask";
import ShowTasks from "./ShowTasks";
import DashboardStats from "./DashboardStats";

export default function Admin() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <DashboardStats />
      <CreateTask />
      <ShowTasks />

    </div>
  );
}
