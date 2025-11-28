import { Outlet } from "react-router-dom"
import { RegistrarContextProvider } from "../contexts/RegistrarContext";
import Sidebar from "../components/ui/Sidebar.tsx";
import { BookMarked, BookOpen, Building2, GraduationCap, LayoutDashboard, User, UserCheck } from "lucide-react";

const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", to: "/registrar" },
    { icon: <Building2 size={20} />, label: "Departments", to: "/registrar/departments" },
    { icon: <BookOpen size={20} />, label: "Courses", to: "/registrar/courses" },
    { icon: <UserCheck size={20} />, label: "Instructors", to: "/registrar/instructors" },
    { icon: <GraduationCap size={20} />, label: "Students", to: "/registrar/students" },
    { icon: <BookMarked size={20} />, label: "Subjects", to: "/registrar/subjects" },
    { icon: <User size={20} />, label: "Profile", to: "/registrar/profile" }, 
]

const RegistrarLayout = () => {

    return (
        <RegistrarContextProvider>
        <main className="w-full md:pl-60">
            <Sidebar 
                menuItems={menuItems}
                user="Registrar"
            />
            <Outlet />
        </main>
        </RegistrarContextProvider>
    )
}

export default RegistrarLayout 