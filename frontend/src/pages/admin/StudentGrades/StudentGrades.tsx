import { Navigate, useParams } from "react-router-dom";
import { AddButton } from "../../../components/Button";
import useFetch from "../../../hooks/useFetch";
import SemesterModal from "./components/SemesterModal";
import { memo, useEffect, useState } from "react";
import { confirmDialog, errorAlert } from "../../../utils/swal";
import { deleteData } from "../../../utils/api";
import { Edit3, X } from "lucide-react";
import SubjectModal from "./components/StudentSubjectModal";
import EmeraldTable from "../../../components/Table";

const StudentGradesInfoHeader = memo(({ id, semester } : { id : string, semester : Semester}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data: studentData, loading } = useFetch(`/api/students/${id}`);

    if (!loading && !studentData?.student) {
        return <Navigate to="/admin/students" />;
    }

    return (
        <div className="w-full flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-emerald-700 mb-2">Student Grades</h1>
            <h1 className="text-gray-500">Student ID: {studentData?.student.student_id}</h1>
            <h1 className="text-gray-500">Fullname: {studentData?.student.firstname} {studentData?.student.lastname}</h1>
            <h1 className="text-gray-500">Course: {semester?.course.name}</h1>
        </div>
        <AddButton onClick={() => setIsModalOpen(true)} label="Add Semester" />
        {/* Modal */}
        <SemesterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            student={studentData?.student}
        />
        </div>
    )
})

const StudentGrades = () => {
    const { id } = useParams();
    const { data: semestersData, loading: semestersLoading } = useFetch(`/api/semesters/${id}`);
    const [selectedSemester, setSelectedSemester] = useState<Semester>();
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState<boolean>(false);
    const { data : subjectsData } = useFetch(`/api/student-subjects/${id}?semester=${selectedSemester?._id}`)
    
    useEffect(() => setSelectedSemester(semestersData?.semesters[0]), [semestersData])

    const handleDeleteSemester = async (semesterId: string) => {
        if (await confirmDialog("Are you sure?", "Do you really want to delete this semester?")) {
            const response = await deleteData(`/api/semesters/${semesterId}`);
            if (!response.success) {
                errorAlert("Error", response.message || "Failed to delete semester.");
                return;
            }
            window.location.reload();
        }
    };

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
        {/* Header */}
        <StudentGradesInfoHeader id={id || ""} semester={selectedSemester as Semester}/>

        {/* Semester Tabs */}
        <div className="w-full border-b border-gray-200 flex gap-6 overflow-x-auto">
            {!semestersLoading && semestersData?.semesters?.length > 0 ? (
            semestersData.semesters.map((sem: any) => (
                <div key={sem._id} className="flex items-center">
                <button
                    onClick={() => setSelectedSemester(sem)}
                    className={`cursor-pointer relative pb-2 text-sm font-medium transition ${
                    selectedSemester?._id === sem._id
                        ? "text-emerald-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-emerald-600"
                        : "text-gray-500 hover:text-emerald-600"
                    }`}
                >
                    {sem.term} • {sem.schoolYear}
                </button>
                <X
                    size={14}
                    className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => handleDeleteSemester(sem._id)}
                />
                </div>
            ))
            ) : (
            <p className="text-gray-500 italic">No semesters yet.</p>
            )}
        </div>
        
        {selectedSemester && (
        <EmeraldTable 
            columns={["Code", "Subject", "Room", "Time", "Units", "Hours", "Instructor", "Section", "Mid Term", "Final", "GWA", "Actions"]}
            data={
            subjectsData?.studentSubjects.map((subject: StudentSubject) => ({
                "Code": subject.subject.code,
                "Subject": subject.subject.name,
                "Room": subject.room,
                "Time": subject.time,
                "Units": subject.units,
                "Hours": subject.hours,
                "Instructor": `${subject.instructor.firstname} ${subject.instructor.lastname}`,
                "Section": subject.section,
                "Mid Term": subject.midtermGrade,
                "Final": subject.finalGrade,
                "GWA": ((subject.midtermGrade + subject.finalGrade) / 2).toFixed(2),
                "Actions": (
                <button
                    className="cursor-pointer flex items-center gap-1 px-3 py-1 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition"
                >
                    <Edit3 size={16} />
                    Add Grades
                </button>
                ),
            })) || []
            }
        />
        )}

        {selectedSemester && (
            <div className="w-full flex justify-end">
                <AddButton label="Add Subject" onClick={() => setIsSubjectModalOpen(true)}/>
            </div>
        )}

        <SubjectModal 
            isOpen={isSubjectModalOpen}
            onClose={() => setIsSubjectModalOpen(false)}
            studentId={id || ""}
            semester={selectedSemester}
        />

        </div>
    );
};

export default StudentGrades;
