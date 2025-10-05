import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "../pages/admin/components/Sidebar"
import useFetch from "../hooks/useFetch"

const AdminLayout = () => {
    const { data :adminRes, loading } = useFetch('/api/admins');

    if(!loading && !adminRes?.admin){
        return (
            <Navigate to="/"/>
        )
    }

    return (
        <main className="flex w-full min-h-screen pl-60">
            <Sidebar />
            <Outlet />
        </main>
    )
}

export default AdminLayout