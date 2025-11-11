import { Outlet } from "react-router-dom"
import StudentSidebar from "../pages/student/components/StudentSidebar"
import { StudentContextProvider } from "../contexts/StudentContext"

const StudentLayout = () => {

    return (
        <StudentContextProvider>
            <main className="w-full lg:pl-60">
                <StudentSidebar />
                <Outlet />
            </main>
        </StudentContextProvider>
    )
}

export default StudentLayout