import { Outlet } from "react-router-dom"
import Sidebar from "../pages/admin/components/Sidebar"

const AdminLayout = () => {
    return (
        <main className="flex w-full min-h-screen pl-60">
            <Sidebar />
            <Outlet />
        </main>
    )
}

export default AdminLayout