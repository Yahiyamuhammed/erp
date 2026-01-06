import { menuItems } from "./menuConfig";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const allowedMenu = menuItems.filter(item =>
    user.permissions.includes(item.permission)
  );

  return (
    <aside>
      {allowedMenu.map(item => (
        <div key={item.id}>{item.label}</div>
      ))}
    </aside>
  );
}
