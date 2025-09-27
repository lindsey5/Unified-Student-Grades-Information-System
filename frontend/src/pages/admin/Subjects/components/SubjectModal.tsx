import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { EmeraldTextField } from "../../../../components/Textfield";
import { confirmDialog, errorAlert } from "../../../../utils/swal";
import { postData, updateData } from "../../../../utils/api";
import LoadingScreen from "../../../../components/LoadingScreen";

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: Subject;
}

const SubjectModal = ({ isOpen, onClose, subject }: AddSubjectModalProps) => {
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectCode, setSubjectCode] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSubjectName(subject?.name || "");
    setSubjectCode(subject?.code || "");
  }, [subject]);

  const handleSaveSubject = async () => {
    const action = subject ? "update" : "add";

    if (
      await confirmDialog(
        "Are you sure?",
        `Do you really want to ${action} this subject?`
      )
    ) {
      if (!subjectName || !subjectCode) {
        errorAlert(
          "Missing Information",
          "Please provide both subject name and subject code."
        );
        return;
      }

      setLoading(true);

      const response = !subject
        ? await postData("/api/subjects", {
            name: subjectName,
            code: subjectCode,
          })
        : await updateData(`/api/subjects/${subject._id}`, {
            name: subjectName,
            code: subjectCode,
          });

      if (!response.success) {
        errorAlert("Error", response.message || "Failed to save subject.");
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
          {subject ? "Edit Subject" : "Add Subject"}
        </h2>

        {/* Subject Name */}
        <EmeraldTextField
          label="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Subject Code */}
        <EmeraldTextField
          label="Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSubject}
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

export default SubjectModal;