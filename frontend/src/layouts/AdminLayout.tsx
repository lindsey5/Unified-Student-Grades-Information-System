import { Outlet } from "react-router-dom"
import Sidebar from "../components/Admins/ui/Sidebar"
import { AdminContextProvider } from "../contexts/AdminContext";

const AdminLayout = () => {

    return (
        <AdminContextProvider>
        <main className="w-full md:pl-60">
            <Sidebar />
            <Outlet />
        </main>
        </AdminContextProvider>
    )
}

export default AdminLayout