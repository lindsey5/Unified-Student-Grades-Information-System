import useFetch from "../../../hooks/useFetch"
import DepartmentCard from "./DepartmentCard";

const CoursesSection = () => {
    const { data  : departmentsRes, loading } = useFetch('/api/departments');

    if(!loading && departmentsRes?.departments.length < 1) return;

    return (
        <section id="courses" className="py-10 px-5 md:py-20 md:px-10 bg-gradient-to-r from-emerald-50 to-white">
            <h1 className="text-center text-5xl font-light text-emerald-700 mb-8 tracking-wide">Courses Offered</h1>
            <div className="gap-5 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {departmentsRes?.departments.slice(0, 3).map((department : Department) => (
                    <DepartmentCard department={department}/>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <button
                    onClick={() => window.location.href = '/courses'}
                    className="cursor-pointer rounded-md hover:opacity-80 px-8 py-3 bg-emerald-700 text-white font-medium transition"
                >
                    View All Courses
                </button>
            </div>
        </section>
    )
}

export default CoursesSection