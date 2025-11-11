import { Outlet } from "react-router-dom"
import StudentSidebar from "../pages/student/components/StudentSidebar"

const StudentLayout = () => {

    return (
        <main className="flex w-full min-h-screen lg:pl-60">
            <StudentSidebar />
            <Outlet />
        </main>
    )
}

export default StudentLayout