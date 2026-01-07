import {
  LayoutDashboard,
  Store,
  ShoppingCart,
  Calculator,
  ShoppingBag,
  Users,
  Mail,
  ClipboardList,
  Settings,
  HelpCircle,
  Star
} from "lucide-react";

import { SIDEBAR_ITEMS } from "@/config/sidebar.config";
import { useAuth } from "@/context/Auth.context";
import { hasAnyPermission } from "@/utils/permission";
import { useLocation, useNavigate } from "react-router-dom";

/* icon mapping */
const iconMap = {
  dashboard: LayoutDashboard,
  pos: Store,
  sales: ShoppingCart,
  accounting: Calculator,
  purchase: ShoppingBag,
  customers: Users,
  payroll: Mail,
  reports: ClipboardList,
  settings: Settings,
  help: HelpCircle
};

export default function Sidebar() {
  const { user } = useAuth();
  const userPermissions = user?.permissions || [];

  const location = useLocation();
  const navigate = useNavigate();

  const visibleItems = SIDEBAR_ITEMS.filter(item =>
    !item.permissions || hasAnyPermission(userPermissions, item.permissions)
  );

  const mainItems = visibleItems.filter(item => item.id !== "help");
  const bottomItems = visibleItems.filter(item => item.id === "help");

  return (
    <div className="h-screen w-64 bg-gray-100/50 backdrop-blur-xl border-r border-white/40 flex flex-col p-4 shadow-xl">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8 mt-2">
        <Star className="w-8 h-8 fill-gray-800 text-gray-800" />
        <span className="text-xl font-bold text-gray-800">Starline</span>
      </div>

      {/* Main */}
      <nav className="flex-1 space-y-2">
        {mainItems.map(item => (
          <NavItem
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto space-y-2 pt-4 border-t border-gray-200/50">
        {bottomItems.map(item => (
          <NavItem
            key={item.id}
            item={item}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- NavItem component ---- */
function NavItem({ item, isActive, onClick }) {
  const Icon = iconMap[item.icon];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all
        ${isActive
          ? "bg-[#D4F34A] text-gray-900 font-semibold"
          : "text-gray-500 hover:bg-white/60 hover:text-gray-900"
        }`}
    >
      {Icon && <Icon size={22} />}
      <span className="text-sm">{item.label}</span>
    </button>
  );
}
