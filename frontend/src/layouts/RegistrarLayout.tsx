import { Outlet } from "react-router-dom"
import RegistrarSidebar from "../components/Registrar/RegistrarSidebar.tsx";
import { RegistrarContextProvider } from "../contexts/RegistrarContext";

const RegistrarLayout = () => {

    return (
        <RegistrarContextProvider>
        <main className="w-full md:pl-60">
            <RegistrarSidebar />
            <Outlet />
        </main>
        </RegistrarContextProvider>
    )
}

export default RegistrarLayout 