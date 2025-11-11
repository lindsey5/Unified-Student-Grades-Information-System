import { Outlet } from "react-router-dom"
import Sidebar from "../pages/admin/components/Sidebar"
import { AdminContextProvider } from "../contexts/AdminContext";

const AdminLayout = () => {

    return (
        <AdminContextProvider>
        <main className="flex w-full min-h-screen pl-60">
            <Sidebar />
            <Outlet />
        </main>
        </AdminContextProvider>
    )
}

export default AdminLayout