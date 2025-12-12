import Navbar from "../Navbar";
import CreateTask from "./CreateTask";
import ShowTasks from "./ShowTasks";

export default function Admin() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <CreateTask />
      <ShowTasks />
    </div>
  );
}
