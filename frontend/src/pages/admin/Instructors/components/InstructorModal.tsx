import { Modal, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { EmeraldTextField } from "../../../../components/Textfield";
import { confirmDialog, errorAlert } from "../../../../utils/swal";
import { postData, updateData } from "../../../../utils/api";
import LoadingScreen from "../../../../components/LoadingScreen";
import useFetch from "../../../../hooks/useFetch";
import { EmeraldSelect } from "../../../../components/Select";

interface InstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructor?: Instructor;
}

const InstructorModal = ({ isOpen, onClose, instructor }: InstructorModalProps) => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<Instructor['status']>("active");
  const [loading, setLoading] = useState(false);

  const { data } = useFetch("/api/departments");

  useEffect(() => {
    setFirstname(instructor?.firstname || "");
    setLastname(instructor?.lastname || "");
    setDepartment(instructor?.department._id || "");
    setStatus(instructor?.status || "active");
  }, [instructor]);

  const handleSaveInstructor = async () => {
    const action = instructor ? "update" : "add";

    if (
      await confirmDialog(
        "Are you sure?",
        `Do you really want to ${action} this instructor?`
      )
    ) {
      if (!firstname || !lastname || !department) {
        errorAlert(
          "Missing Information",
          "Please provide firstname, lastname, and department."
        );
        return;
      }

      setLoading(true);

      const payload = {
        firstname,
        lastname,
        department,
        status,
      };

      const response = !instructor
        ? await postData("/api/instructors", payload)
        : await updateData(`/api/instructors/${instructor._id}`, payload);

      if (!response.success) {
        errorAlert("Error", response.message || "Failed to save instructor.");
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
          {instructor ? "Edit Instructor" : "Add Instructor"}
        </h2>

        {/* Firstname */}
        <EmeraldTextField
          label="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Lastname */}
        <EmeraldTextField
          label="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Department */}
        <EmeraldSelect
          label="Department"
          value={department || ""}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {data?.departments.map((dept: Department) => (
            <MenuItem key={dept._id} value={dept._id}>
              {dept.name}
            </MenuItem>
          ))}
        </EmeraldSelect>

        {/* Status */}
        {instructor && <EmeraldSelect
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Instructor['status'])}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </EmeraldSelect>}

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveInstructor}
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

export default InstructorModal;
