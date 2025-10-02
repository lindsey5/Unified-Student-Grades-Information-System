import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { formatDateTime } from "../../../utils/dateUtils";
import { AddButton, DeleteButton, EditButton } from "../../../components/Button";
import CourseModal from "./components/Course";
import { SearchField } from "../../../components/Textfield";
import { useDebounce } from "../../../hooks/useDebounce";
import { EmeraldSelect } from "../../../components/Select";
import { MenuItem, CircularProgress } from "@mui/material"; 
import { deleteData } from "../../../utils/api";
import { confirmDialog, errorAlert, successAlert } from "../../../utils/swal";
import EmeraldTable from "../../../components/Table";

const Courses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course>();
    const [department, setDepartment] = useState<string>("All");
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    // fetch with debounced search term
    const { data, loading } = useFetch(
        `/api/courses?searchTerm=${debouncedSearch}&department=${department}`
    );
    const { data: deptData } = useFetch("/api/departments");

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedCourse(undefined);
    };

    const handleDelete = async (courseId: string) => {
        const confirmed = await confirmDialog(
        "Delete Course",
        "Are you sure you want to delete this course? This action cannot be undone.",
        "warning",
        "Delete",
        "Cancel"
        );

        if (!confirmed) return;

        const response = await deleteData(`/api/courses/${courseId}`);

        if (response.success) {
        await successAlert("Course Deleted", "The course has been successfully removed.");
        window.location.reload();
        } else {
        errorAlert("Delete Failed", response.message || "Something went wrong.");
        }
    };

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
        {/* Page Title */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-2xl font-bold text-emerald-700">Courses</h1>
            <AddButton onClick={() => setIsModalOpen(true)} label="Add Course" />
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Search field */}
            <div className="w-full sm:w-1/2">
            <SearchField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
            />
            </div>

            {/* Department Select */}
            <div className="w-full sm:w-1/3">
            <EmeraldSelect
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            >
                <MenuItem value="All">All</MenuItem>
                {deptData?.departments.map((dept: Department) => (
                <MenuItem key={dept._id} value={dept._id}>
                    {dept.name}
                </MenuItem>
                ))}
            </EmeraldSelect>
            </div>
        </div>

        {/* Courses Table / Loading / Empty */}
        {loading ? (
            <div className="w-full flex justify-center items-center py-10">
            <CircularProgress sx={{ color: "#10b981" }} />
            </div>
        ) : data?.courses?.length > 0 ? (
            <EmeraldTable
            columns={["#", "Course", "Department", "Created At", "Actions"]}
            data={data.courses.map((course: Course, index: number) => ({
                "#": index + 1,
                Course: course.name,
                Department: course.department.name,
                "Created At": formatDateTime(course.createdAt),
                Actions: (
                <div className="flex gap-2">
                    <EditButton
                    onClick={() => {
                        setIsModalOpen(true);
                        setSelectedCourse(course);
                    }}
                    />
                    <DeleteButton onClick={() => handleDelete(course._id as string)} />
                </div>
                ),
            }))}
            />
        ) : (
            <p className="text-gray-500 italic">No courses found.</p>
        )}

        {/* Modal */}
        <CourseModal isOpen={isModalOpen} onClose={handleClose} course={selectedCourse} />
        </div>
    );
};

export default Courses;
