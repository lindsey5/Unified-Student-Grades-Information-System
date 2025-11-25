import { Outlet } from "react-router-dom"
import StudentHeader from "../components/Student/StudentHeader"
import { StudentContextProvider } from "../contexts/StudentContext"

const StudentLayout = () => {

    return (
        <StudentContextProvider>
            <main className="w-full lg:px-30 bg-gradient-to-br from-emerald-50 to-teal-50">
                <StudentHeader />
                <Outlet />
            </main>
        </StudentContextProvider>
    )
}

export default StudentLayout