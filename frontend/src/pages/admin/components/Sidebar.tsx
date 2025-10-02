import { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  UserCheck,
  BookMarked,
  GraduationCap,
  Shield,
  IdCard,
} from "lucide-react";

interface SidebarButtonProps {
  icon: ReactNode;
  label: string;
  to: string;
}

export const SidebarButton = ({ icon, label, to }: SidebarButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 py-2 px-3 rounded-lg transition cursor-pointer
        ${isActive ? "bg-emerald-600 text-white" : "hover:bg-emerald-800"}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-emerald-700 text-white flex flex-col p-4 shadow-lg">
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
      <nav className="flex flex-col gap-2">
        <SidebarButton icon={<LayoutDashboard size={20} />} label="Dashboard" to="/admin" />
        <SidebarButton icon={<Building2 size={20} />} label="Departments" to="/admin/departments" />
        <SidebarButton icon={<BookOpen size={20} />} label="Courses" to="/admin/courses" />
        <SidebarButton icon={<GraduationCap size={20} />} label="Students" to="/admin/students" />
        <SidebarButton icon={<UserCheck size={20} />} label="Instructors" to="/admin/instructors" />
        <SidebarButton icon={<BookMarked size={20} />} label="Subjects" to="/admin/subjects" />
        <SidebarButton icon={<Shield size={20} />} label="Admins" to="/admin/admins" />
        <SidebarButton icon={<IdCard size={20} />} label="Registrars" to="/admin/registrars" />
      </nav>
    </aside>
  );
};

export default Sidebar;
