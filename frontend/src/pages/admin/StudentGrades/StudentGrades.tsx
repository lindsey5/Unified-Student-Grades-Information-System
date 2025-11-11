import { Navigate, useParams } from "react-router-dom";
import { AddButton, DeleteButton, EditButton } from "../../../components/Button";
import useFetch from "../../../hooks/useFetch";
import SemesterModal from "./components/SemesterModal";
import { memo, useEffect, useMemo, useState } from "react";
import { confirmDialog, errorAlert, successAlert } from "../../../utils/swal";
import { deleteData } from "../../../utils/api";
import { X } from "lucide-react";
import SubjectModal from "./components/StudentSubjectModal";
import EmeraldTable from "../../../components/Table";
import { CircularProgress } from "@mui/material";

const StudentGradesInfoHeader = memo(
  ({ id, semester }: { id: string; semester: Semester }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data: studentData, loading } = useFetch(`/api/students/${id}`);

    if (loading) {
      return (
        <div className="w-full flex justify-center items-center h-32">
          <CircularProgress sx={{ color: "#10b981" }} />
        </div>
      );
    }

    if (!studentData?.student) {
      return <Navigate to="/admin/students" />;
    }

    return (
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-emerald-700 mb-2">
            Student Grades
          </h1>
          <h1 className="text-gray-500">
            Student ID: {studentData?.student.student_id}
          </h1>
          <h1 className="text-gray-500">
            Fullname: {studentData?.student.firstname}{" "}
            {studentData?.student.lastname}
          </h1>
          <h1 className="text-gray-500">Course: {semester?.course.name}</h1>
          <h1 className="text-gray-500">
            Enrollment Status: {semester?.enrollmentStatus}
          </h1>
        </div>
        <AddButton onClick={() => setIsModalOpen(true)} label="Add Semester" />
        {/* Modal */}
        <SemesterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          student={studentData?.student}
        />
      </div>
    );
  }
);

const StudentGrades = () => {
    const { id } = useParams();
    const { data: semestersData, loading: semestersLoading } = useFetch(`/api/semesters/${id}`);
    const [selectedSemester, setSelectedSemester] = useState<Semester>();
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState<boolean>(false);
    const { data: subjectsData, loading: subjectsLoading } = useFetch(`/api/student-subjects/${id}?semester=${selectedSemester?._id}`);
    const [selectedSubject, setSelectedSubject] = useState<StudentSubject>();

    useEffect(
        () => setSelectedSemester(semestersData?.semesters[0]),
        [semestersData]
    );

    const handleModalClose = () => {
        setIsSubjectModalOpen(false);
        setSelectedSubject(undefined);
    };

    const handleDeleteSemester = async (semesterId: string) => {
        if (
        await confirmDialog(
            "Are you sure?",
            "Do you really want to delete this semester?"
        )
        ) {
        const response = await deleteData(`/api/semesters/${semesterId}`);
        if (!response.success) {
            errorAlert("Error", response.message || "Failed to delete semester.");
            return;
        }
        window.location.reload();
        }
    };

    const handleDelete = async (studentSubject: string) => {
        const confirmed = await confirmDialog(
        "Delete Subject",
        "Are you sure you want to delete this subject? This action cannot be undone.",
        "warning",
        "Delete",
        "Cancel"
        );

        if (!confirmed) return;

        const response = await deleteData(
        `/api/student-subjects/${studentSubject}`
        );

        if (response.success) {
        await successAlert(
            "Subject Deleted",
            "The subject has been successfully removed from the system."
        );
        window.location.reload();
        } else {
        errorAlert(
            "Delete Failed",
            response.message ||
            "Something went wrong while deleting the department."
        );
        }
    };

    const totalGWA = useMemo(() => {
      if(!subjectsData?.studentSubjects) return 0
    
      const filteredSubjects = subjectsData.studentSubjects.filter((subject : StudentSubject) => subject.midtermGrade && subject.finalGrade)
      return (filteredSubjects.reduce((acc: number, subject: StudentSubject) => 
        acc +((subject.midtermGrade + subject.finalGrade) / 2), 0) 
      / filteredSubjects.length).toFixed(2)
    }, [subjectsData]); 

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
        {/* Header */}
        <StudentGradesInfoHeader
            id={id || ""}
            semester={selectedSemester as Semester}
        />

        {/* Semester Tabs */}
        <div className="w-full border-b border-gray-200 flex gap-6 overflow-x-auto">
            {semestersLoading ? (
            <div className="w-full flex justify-center items-center h-20">
                <CircularProgress sx={{ color: "#10b981" }} size={24} />
            </div>
            ) : semestersData?.semesters?.length > 0 ? (
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

        {/* Subjects Table */}
        {selectedSemester &&
            (subjectsLoading ? (
            <div className="w-full flex justify-center items-center h-40">
                <CircularProgress sx={{ color: "#10b981" }} />
            </div>
            ) : subjectsData?.studentSubjects?.length > 0 ? (
              <>
              <EmeraldTable
                  columns={["Code", "Subject", "Room", "Time", "Units", "Hours", "Instructor", "Section", "Mid Term", "Final", "GWA", "Actions"]}
                  data={
                  subjectsData?.studentSubjects.map((subject: StudentSubject) => ({
                      Code: subject.subject.code,
                      Subject: subject.subject.name,
                      Room: subject.room,
                      Time: subject.time,
                      Units: subject.units,
                      Hours: subject.hours,
                      Instructor: `${subject.instructor.firstname} ${subject.instructor.lastname}`,
                      Section: subject.section,
                      "Mid Term": subject.midtermGrade,
                      Final: subject.finalGrade,
                      GWA: ((subject.midtermGrade + subject.finalGrade) / 2).toFixed(2),
                      Actions: (
                      <div className="flex gap-3">
                          <EditButton
                          onClick={() => {
                              setIsSubjectModalOpen(true);
                              setSelectedSubject(subject);
                          }}
                          />
                          <DeleteButton
                          onClick={() => handleDelete(subject._id as string)}
                          />
                      </div>
                      ),
                  })) || []
                  }
              />
              <div className="w-full text-right font-semibold text-emerald-700 mb-2">
                Total GWA: {totalGWA}
              </div>
            </>
            ) : (
            <div className="w-full flex justify-center items-center h-40 text-gray-500">
                No subjects found for this semester.
            </div>
            ))}

        {selectedSemester && (
            <div className="w-full flex justify-end">
            <AddButton
                label="Add Subject"
                onClick={() => setIsSubjectModalOpen(true)}
            />
            </div>
        )}

        {/* Subject Modal */}
        <SubjectModal
            isOpen={isSubjectModalOpen}
            onClose={handleModalClose}
            studentId={id || ""}
            semester={selectedSemester}
            studentSubject={selectedSubject}
        />
        </div>
    );
};

export default StudentGrades;
