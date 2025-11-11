import useFetch from "../../../hooks/useFetch"
import { GraduationCap } from "lucide-react"
import Card from "./Card"

const DepartmentCard = ({ department }: { department: Department }) => {
    const { data: coursesRes } = useFetch(`/api/courses?department=${department._id}`)

    return (
       <Card>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-emerald-100">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg md:text-xl font-light tracking-wide text-emerald-700">
                    {department.name}
                </h2>
            </div>
            <ul className="space-y-3">
                {coursesRes?.courses.map((course: Course) => (
                    <li key={course._id} className="text-sm md:text-base text-gray-600 font-light leading-relaxed hover:text-emerald-600 transition-colors duration-200">
                        {course.name}
                    </li>
                ))}
            </ul>
        </Card>
    )
}

export default DepartmentCard