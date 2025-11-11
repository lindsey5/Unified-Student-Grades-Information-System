import useFetch from "../../hooks/useFetch";
import DepartmentCard from "./components/DepartmentCard";
import Navbar from "./components/Navbar";

const CoursesPage = () => {
    const { data  : departmentsRes, loading } = useFetch('/api/departments');

    if(!loading && departmentsRes?.departments.length < 1) return;

    return (
        <main className="pt-20">
            <Navbar />
            <div id="courses" className="min-h-screen py-10 px-5 md:py-20 md:px-10 bg-gradient-to-r from-emerald-50 to-white">
                <h1 className="text-center text-5xl font-light text-emerald-700 mb-8 tracking-wide">Courses Offered</h1>
                <div className="gap-5 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {departmentsRes?.departments.map((department : Department) => (
                        <DepartmentCard department={department}/>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default CoursesPage