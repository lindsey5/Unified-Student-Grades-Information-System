import { useState } from "react";
import EmeraldTable from "../../../../components/Table"
import useFetch from "../../../../hooks/useFetch"

const StudentRankingTable = () => {
    const [selectedCourse, setSelectedCourse] = useState<string>('all');
    const { data } = useFetch(`/api/students/ranking?course=${selectedCourse === 'all' ? '' : selectedCourse}`);
    const { data: coursesData } = useFetch("/api/courses");
    
    return (
        <div className="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-emerald-700">Student Rankings</h1>
                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium">Filter by Course:</label>
                    <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                    >
                    <option value="all">All Courses</option>
                    {coursesData?.courses.map((course: Course) => (
                        <option key={course._id} value={course._id}>
                        {course.name}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
            <EmeraldTable 
                classname="h-[500px] overflow-y-auto"
                columns={['Rank', 'Student ID', 'Fullname', 'Year Level', 'Lowest Grade', 'GWA']}
                data={data?.rankings.map((ranking : any, index : number) => ({
                    'Rank' : index + 1,
                    'Student ID' : ranking.student_id,
                    'Fullname' : `${ranking.firstname} ${ranking.lastname}`,
                    'Year Level' : ranking.year_level,
                    'Lowest Grade' : ranking.lowestGrade,
                    'GWA' : ranking.gwa
                })) || []}
            />
        </div>
    )
}

export default StudentRankingTable