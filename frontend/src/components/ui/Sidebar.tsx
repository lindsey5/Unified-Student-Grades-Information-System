import { useState, type ReactNode } from "react";
import {
  LogOutIcon,
  Menu,
  X,
} from "lucide-react";
import { logout } from "../../utils/auth";
import { NavigationButton } from "../Button";

const Sidebar = ({ menuItems, user } : { 
    menuItems: { icon : ReactNode, label: string, to: string }[];
    user: 'Admin' | 'Registrar'
}
) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-red-700 text-white rounded-lg shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 bg-red-700 text-white flex flex-col p-4 shadow-lg
          w-60 transform lg:translate-x-0 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Title with Icon */}
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2">
                <img className="w-15 h-15" src="/logo.png" alt="" />
                <h1 className="text-lg font-semibold leading-tight text-center">
                    Unified Student Grades
                    <br />
                    <span className="text-sm font-normal text-red-200">
                        Information System
                    </span>
                </h1>
            </div>

            <span className="text-sm font-medium bg-red-600 px-3 py-1 rounded-full text-white shadow">
              {user}
            </span>
        </div>

        {/* Sidebar buttons */}
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavigationButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to}
            />
          ))}

          <button
            className="hover:bg-red-800 flex items-center gap-3 py-2 px-3 rounded-lg transition cursor-pointer mt-auto"
            onClick={async () => await logout()}
          >
            <LogOutIcon />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
