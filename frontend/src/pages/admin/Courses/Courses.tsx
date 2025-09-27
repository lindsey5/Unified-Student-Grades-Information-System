import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { formatDate } from "../../../utils/dateUtils";
import { Plus } from "lucide-react";
import { DeleteButton, EditButton } from "../../../components/Button";
import CourseModal from "./components/Course";
import { SearchField } from "../../../components/Textfield";
import { useDebounce } from "../../../hooks/useDebounce";
import { EmeraldSelect } from "../../../components/Select";
import { MenuItem } from "@mui/material";
import { deleteData } from "../../../utils/api";
import { confirmDialog, errorAlert, successAlert } from "../../../utils/swal";

const Courses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course>();
    const [department, setDepartment] = useState<string>("All");
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500); 

    // fetch with debounced search term
    const { data } = useFetch(`/api/courses?searchTerm=${debouncedSearch}&department=${department}`);
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
            await successAlert(
            "Course Deleted",
            "The course has been successfully removed from the system."
            );
            window.location.reload();
        } else {
            errorAlert(
            "Delete Failed",
            response.message || "Something went wrong while deleting the course."
            );
        }
    };

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
            {/* Page Title */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-2xl font-bold text-emerald-700">Courses</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition cursor-pointer"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add Course</span>
                </button>
            </div>

            {/* Actions: Add + Search */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Search field */}
                <div className="w-full sm:w-1/2">
                    <SearchField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search courses..."
                    />
                </div>

                <div className="w-full sm:w-1/3">
                    {/* Department Selection */}
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

            {/* Courses Table */}
            <div className="w-full max-h-screen overflow-y-auto bg-white shadow-sm rounded-lg border border-gray-200">
                <table className="min-w-full border-collapse">
                <thead className="bg-emerald-600 text-white text-left text-sm font-medium sticky top-0">
                    <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Created At</th>
                    <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.courses.map((course: Course, index: number) => (
                    <tr
                        key={course._id}
                        className="hover:bg-gray-50 transition border-b border-gray-200"
                    >
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">{course.name}</td>
                        <td className="py-3 px-4">{course.department.name}</td>
                        <td className="py-3 px-4">{formatDate(course.createdAt)}</td>
                        <td className="py-3 px-4">
                        <div className="flex gap-2">
                            <EditButton
                            onClick={() => {
                                setIsModalOpen(true);
                                setSelectedCourse(course);
                            }}
                            />
                            <DeleteButton onClick={() => handleDelete(course._id as string)} />
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {/* Modal */}
            <CourseModal
                isOpen={isModalOpen}
                onClose={handleClose}
                course={selectedCourse}
            />
        </div>
    );
};

export default Courses;
