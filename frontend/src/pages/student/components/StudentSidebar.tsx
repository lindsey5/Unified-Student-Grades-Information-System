import { useState } from "react";
import { BookOpen, GraduationCap, LogOutIcon, ShieldAlert, Menu, X, Trophy } from "lucide-react";
import { logout } from "../../../utils/auth";
import { SidebarButton } from "../../../components/Button";

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="flex items-center justify-center gap-2 mb-8 text-center">
          <GraduationCap size={28} className="text-white" />
          <div>
            <h1 className="text-lg font-semibold leading-tight">
              Unified Student Grades
            </h1>
            <span className="text-sm font-normal text-emerald-200">
              Information System
            </span>
          </div>
        </div>

        {/* Sidebar buttons */}
        <nav className="flex flex-col gap-2">
          <SidebarButton icon={<BookOpen size={20} />} label="Your Grades" to="/student" />
          <SidebarButton icon={<ShieldAlert size={20} />} label="Security" to="/student/security" />
          <SidebarButton icon={<Trophy size={20} />} label="Ranking" to="/student/ranking" />
          <button
            className="hover:bg-emerald-800 flex items-center gap-3 py-2 px-3 rounded-lg transition cursor-pointer"
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

export default StudentSidebar;
