import { useState } from "react";
import {
  LayoutDashboard,
  BookMarked,
  GraduationCap,
  LogOutIcon,
  Menu,
  X,
  Building2,
  BookOpen,
  UserCheck,
} from "lucide-react";
import { logout } from "../../utils/auth";
import { NavigationButton } from "../Button";

const RegistrarSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", to: "/registrar" },
        { icon: <Building2 size={20} />, label: "Departments", to: "/registrar/departments" },
        { icon: <BookOpen size={20} />, label: "Courses", to: "/registrar/courses" },
        { icon: <UserCheck size={20} />, label: "Instructors", to: "/registrar/instructors" },
        { icon: <GraduationCap size={20} />, label: "Students", to: "/registrar/students" },
        { icon: <BookMarked size={20} />, label: "Subjects", to: "/registrar/subjects" },
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
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
                <div className="flex items-center gap-2">
                    <GraduationCap size={28} className="text-white" />
                    <h1 className="text-lg font-semibold leading-tight text-center">
                        Unified Student Grades
                        <br />
                        <span className="text-sm font-normal text-emerald-200">
                            Information System
                        </span>
                    </h1>
                </div>

                {/* Registrar Title */}
                <span className="text-sm font-medium bg-emerald-600 px-3 py-1 rounded-full text-white shadow">
                    Registrar
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

export default RegistrarSidebar
