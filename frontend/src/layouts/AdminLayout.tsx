import { Outlet } from "react-router-dom"
import Sidebar from "../components/ui/Sidebar"
import { AdminContextProvider } from "../contexts/AdminContext";
import { BookMarked, BookOpen, Building2, GraduationCap, IdCard, LayoutDashboard, Shield, User, UserCheck } from "lucide-react";

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", to: "/admin" },
    { icon: <Building2 size={20} />, label: "Departments", to: "/admin/departments" },
    { icon: <BookOpen size={20} />, label: "Courses", to: "/admin/courses" },
    { icon: <GraduationCap size={20} />, label: "Students", to: "/admin/students" },
    { icon: <UserCheck size={20} />, label: "Instructors", to: "/admin/instructors" },
    { icon: <BookMarked size={20} />, label: "Subjects", to: "/admin/subjects" },
    { icon: <Shield size={20} />, label: "Admins", to: "/admin/admins" },
    { icon: <IdCard size={20} />, label: "Registrars", to: "/admin/registrars" },
    { icon: <User size={20} />, label: "Profile", to: "/admin/profile" }, 
];

const AdminLayout = () => {

    return (
        <AdminContextProvider>
        <main className="w-full md:pl-60 bg-gradient-to-br from-red-50 to-red-100">
            <Sidebar menuItems={menuItems} user="Admin"/>
            <Outlet />
        </main>
        </AdminContextProvider>
    )
}

export default AdminLayout