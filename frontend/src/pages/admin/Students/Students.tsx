import { BookOpen } from "lucide-react";
import useFetch from "../../../hooks/useFetch";
import { AddButton, DeleteButton, EditButton } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { MenuItem, Pagination, CircularProgress } from "@mui/material";
import EmeraldTable from "../../../components/Table";
import { useDebounce } from "../../../hooks/useDebounce";
import { useState } from "react";
import { SearchField } from "../../../components/Textfield";
import { EmeraldSelect } from "../../../components/Select";
import { confirmDialog, errorAlert, successAlert } from "../../../utils/swal";
import { deleteData } from "../../../utils/api";
import StatusChip from "../../../components/Chip";

const Students = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const searchDebounce = useDebounce(searchTerm, 200);
    const [selectedCourse, setSelectedCourse] = useState<string>("All");
    const [seleectedStatus, setSelectedStatus] = useState<string>("Active");
    const { data: coursesData } = useFetch("/api/courses");
    const { data, loading } = useFetch(`/api/students?searchTerm=${searchDebounce}&page=${page}&limit=50&course=${selectedCourse}&status=${seleectedStatus}`);

    const navigate = useNavigate();

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleDelete = async (studentId: Student["_id"]) => {
        const confirmed = await confirmDialog(
        "Delete Student",
        "Are you sure you want to delete this student? This action cannot be undone.",
        "warning",
        "Delete",
        "Cancel"
        );

        if (!confirmed) return;

        const response = await deleteData(`/api/students/${studentId}`);

        if (response.success) {
        await successAlert(
            "Student Deleted",
            "The student has been successfully removed from the system."
        );
        window.location.reload();
        } else {
        errorAlert(
            "Delete Failed",
            response.message || "Something went wrong while deleting the student."
        );
        }
    };

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
        <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold text-emerald-700">Students</h1>
            <AddButton onClick={() => navigate("/admin/student")} label="Add Student" />
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-1/2">
            <SearchField
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search by student id, firstname, lastname or email..."
            />
            </div>
            <div className="w-full md:w-64">
            <EmeraldSelect
                value={seleectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                displayEmpty
                label="Status"
            >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Graduated">Graduated</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
            </EmeraldSelect>
            </div>
            <div className="w-full md:w-64">
            <EmeraldSelect
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                displayEmpty
                label="Course"
            >
                <MenuItem value="All">All</MenuItem>
                {coursesData?.courses?.map((c: Course) => (
                <MenuItem key={c._id} value={c._id}>
                    {c.name}
                </MenuItem>
                ))}
            </EmeraldSelect>
            </div>
        </div>

        {/* Loading State */}
        {loading ? (
            <div className="w-full flex justify-center items-center h-64">
            <CircularProgress sx={{ color: "#10b981" }} /> {/* Emerald Spinner */}
            </div>
        ) : (
            <>
            <EmeraldTable
                columns={[
                "Fullname",
                "Student ID",
                "Email",
                "Gender",
                "Course",
                "Year Level",
                "Status",
                "Actions",
                ]}
                data={
                data?.students.map((student: Student) => ({
                    Fullname: `${student.firstname} ${student.middlename} ${student.lastname}`,
                    "Student ID": student.student_id,
                    Email: student.email,
                    Gender: student.gender,
                    Course: student.course.name,
                    "Year Level": student.year_level,
                    Status: <StatusChip status={student.status}/>,
                    Actions: (
                    <div className="flex gap-2">
                        <button
                        className="cursor-pointer flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition text-sm"
                        onClick={() => navigate(`/admin/grades/${student._id}`)}
                        >
                        <BookOpen size={16} />
                        View Grades
                        </button>
                        <EditButton onClick={() => navigate(`/admin/student/${student._id}`)} />
                        <DeleteButton onClick={() => handleDelete(student._id)} />
                    </div>
                    ),
                })) || []
                }
            />

            {/* Pagination */}
            {data?.students.length > 0 && (
                <Pagination
                page={page}
                count={data?.totalPages || 1}
                onChange={handleChange}
                color="primary"
                />
            )}
            </>
        )}
        </div>
    );
};

export default Students;
