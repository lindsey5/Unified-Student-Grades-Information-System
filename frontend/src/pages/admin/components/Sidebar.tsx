import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  UserCheck,
  BookMarked,
  GraduationCap,
  Shield,
  IdCard,
  LogOutIcon,
  Menu,
  X,
} from "lucide-react";
import { logout } from "../../../utils/auth";
import { SidebarButton } from "../../../components/Button";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", to: "/admin" },
    { icon: <Building2 size={20} />, label: "Departments", to: "/admin/departments" },
    { icon: <BookOpen size={20} />, label: "Courses", to: "/admin/courses" },
    { icon: <GraduationCap size={20} />, label: "Students", to: "/admin/students" },
    { icon: <UserCheck size={20} />, label: "Instructors", to: "/admin/instructors" },
    { icon: <BookMarked size={20} />, label: "Subjects", to: "/admin/subjects" },
    { icon: <Shield size={20} />, label: "Admins", to: "/admin/admins" },
    { icon: <IdCard size={20} />, label: "Registrars", to: "/admin/registrars" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-emerald-700 text-white rounded-lg shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
            z-5
          fixed inset-y-0 left-0 bg-emerald-700 text-white flex flex-col p-4 shadow-lg
          w-60 transform lg:translate-x-0 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Title with Icon */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <GraduationCap size={28} className="text-white" />
          <h1 className="text-lg font-semibold leading-tight text-center">
            Unified Student Grades
            <br />
            <span className="text-sm font-normal text-emerald-200">
              Information System
            </span>
          </h1>
        </div>

        {/* Sidebar buttons */}
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to}
            />
          ))}
          <button
            className="hover:bg-emerald-800 flex items-center gap-3 py-2 px-3 rounded-lg transition cursor-pointer mt-auto"
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
