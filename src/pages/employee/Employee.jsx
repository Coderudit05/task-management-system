import Navbar from "../Navbar";
import StatusDisplay from "./StatusDisplay";
import Tasks from "./Tasks";

export default function Employee() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      {/* Status Overview Cards */}
      <div className="px-6 pt-6">
        <StatusDisplay />
      </div>

      {/* Employee Tasks List */}
      <div className="px-6 py-6">
        <Tasks />
      </div>
    </div>
  );
}