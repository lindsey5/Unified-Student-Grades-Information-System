import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Upload, Check } from "lucide-react";
import { EmeraldTextField } from "../../../../components/Textfield";
import { confirmDialog, errorAlert } from "../../../../utils/swal";
import { postData, updateData } from "../../../../utils/api";
import LoadingScreen from "../../../../components/LoadingScreen";

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department?: Department;
}

const DepartmentModal = ({ isOpen, onClose, department }: AddDepartmentModalProps) => {
  const [departmentName, setDepartmentName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDepartmentName(department?.name || "");
    setImage(department?.image.imageUrl || null);
  }, [department]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDepartment = async () => {
    const action = department ? "update" : "add";

    // 👇 confirmDialog now has a title + submessage
    if (await confirmDialog(
      "Are you sure?", 
      `Do you really want to ${action} this department?`
    )) {
      if (!departmentName || !image) {
        errorAlert("Missing Information", "Please provide both department name and image.");
        return;
      }

      setLoading(true);

      const response = !department
        ? await postData("/api/departments", { name: departmentName, image })
        : await updateData(`/api/departments/${department._id}`, { name: departmentName, image });

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
          {department ? "Edit Department" : "Add Department"}
        </h2>

        {/* Department Name */}
        <EmeraldTextField
          label="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Upload Button */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            id="upload-image"
            className="hidden"
            onChange={handleImage}
          />
          <label
            htmlFor="upload-image"
            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md cursor-pointer text-emerald-700 hover:bg-emerald-50 transition"
          >
            <Upload size={18} />
            <span>Upload Image</span>
          </label>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mb-4 flex justify-center">
            <img
              src={image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md border"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
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

export default DepartmentModal;
