import { memo, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import EmeraldTable from "../../components/Table";

const GradesInfoHeader = memo(({ semester }: { semester: Semester }) => {
    const { data: studentData, loading } = useFetch(`/api/students/data`);

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
            Your Grades
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
      </div>
    );
  }
);

const Grades = () => {
    const { data: semestersData, loading: semestersLoading } = useFetch(`/api/semesters`);
    const [selectedSemester, setSelectedSemester] = useState<Semester>();
    const { data: subjectsData, loading: subjectsLoading } = useFetch(`/api/student-subjects?semester=${selectedSemester?._id}`);

    useEffect(
        () => setSelectedSemester(semestersData?.semesters[0]),
        [semestersData]
    );

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
        {/* Header */}
        <GradesInfoHeader semester={selectedSemester as Semester}/>

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
            <EmeraldTable
                columns={[
                "Code",
                "Subject",
                "Room",
                "Time",
                "Units",
                "Hours",
                "Instructor",
                "Section",
                "Mid Term",
                "Final",
                "GWA",
                ]}
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
                    GWA: (
                    (subject.midtermGrade + subject.finalGrade) /
                    2
                    ).toFixed(2)
                })) || []
                }
            />
            ) : (
            <div className="w-full flex justify-center items-center h-40 text-gray-500">
                No subjects found for this semester.
            </div>
            ))}
        </div>
    );
};

export default Grades;
