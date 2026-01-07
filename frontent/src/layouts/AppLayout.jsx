import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
// import Sidebar from "@/components/sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
