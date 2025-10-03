import EmeraldTable from "../../../../components/Table"
import useFetch from "../../../../hooks/useFetch"

const RecentStudentsTable = () => {
    const { data } = useFetch('/api/students/recent');
    
    return (
        <div className="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold text-emerald-700">Recent Created Students</h1>
            <EmeraldTable 
                classname="h-[500px] overflow-y-auto"
                columns={['Student ID', 'Fullname', 'Course', 'Year Level']}
                data={data?.recentStudents.map((student : Student) => ({
                    'Student ID' : student.student_id,
                    'Fullname' : `${student.firstname} ${student.lastname}`,
                    'Course' : student.course,
                    'Year Level' : student.year_level
                })) || []}
            />
        </div>
    )
}

export default RecentStudentsTable