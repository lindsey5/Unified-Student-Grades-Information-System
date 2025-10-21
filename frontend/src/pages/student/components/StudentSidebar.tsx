import { BookOpen, GraduationCap, LogOutIcon, ShieldAlert } from "lucide-react"
import { logout } from "../../../utils/auth"
import { SidebarButton } from "../../../components/Button"

const StudentSidebar = () => {
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
            <SidebarButton icon={<BookOpen size={20} />} label="Your Grades" to="/student" />
            <SidebarButton icon={<ShieldAlert size={20} />} label="Security" to="/student/security" />
            <button 
                className="hover:bg-emerald-800 flex items-center gap-3 py-2 px-3 rounded-lg transition cursor-pointer"
                onClick={async () => await logout()}
            >
            <LogOutIcon />
            Logout
            </button>
        </nav>
        </aside>
    )
}

export default StudentSidebar