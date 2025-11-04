import { Modal, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { EmeraldTextField } from "../../../../components/Textfield";
import { confirmDialog, errorAlert } from "../../../../utils/swal";
import { postData, updateData } from "../../../../utils/api";
import LoadingScreen from "../../../../components/LoadingScreen";
import useFetch from "../../../../hooks/useFetch";
import { EmeraldSelect } from "../../../../components/Select";

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: Course;
}

const CourseModal = ({ isOpen, onClose, course }: AddDepartmentModalProps) => {
  const [courseName, setCourseName] = useState<string>("");
  const [courseCode, setCourseCode] = useState<string>('');
  const { data } = useFetch("/api/departments");
  const [department, setDepartment] = useState<string | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCourseName(course?.name || "");
    setDepartment(course?.department?._id || "");
    setCourseCode(course?.code || "");
  }, [course]);

  const handleAddDepartment = async () => {
    const action = course ? "update" : "add";

    if (
      await confirmDialog(
        "Are you sure?",
        `Do you really want to ${action} this course?`
      )
    ) {
      if (!courseName || !department) {
        errorAlert(
          "Missing Information",
          "Please provide both course name and department"
        );
        return;
      }

      setLoading(true);

      const response = !course
        ? await postData("/api/courses", { name: courseName, code: courseCode, department })
        : await updateData(`/api/courses/${course._id}`, {
            name: courseName,
            code: courseCode,
            department,
          });

      if (!response.success) {
        errorAlert("Error", response.message || "Failed to save department.");
        setLoading(false);
        return;
      }

      window.location.reload();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 1 }}>
      <div className="absolute top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-5">
        <LoadingScreen loading={loading} />

        {/* Title */}
        <h2 className="text-lg font-semibold text-emerald-700 mb-4">
          {course ? "Edit Course" : "Add Course"}
        </h2>

        {/* Course Name */}
        <EmeraldTextField
          label="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <EmeraldTextField
          label="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Department Selection */}
        <EmeraldSelect
            label="Department"
            value={department || course?.department?._id || ""}
            onChange={(e) => setDepartment(e.target.value)}
        >
        {data?.departments.map((dept: Department) => (
            <MenuItem key={dept._id} value={dept._id}>
            {dept.name}
            </MenuItem>
        ))}
        </EmeraldSelect>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAddDepartment}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition cursor-pointer"
          >
            <Check size={18} />
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
