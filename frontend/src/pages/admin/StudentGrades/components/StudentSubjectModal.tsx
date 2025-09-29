import { Modal } from "@mui/material";
import { useState } from "react";
import { Check } from "lucide-react";
import { EmeraldTextField, SearchDropdown } from "../../../../components/Textfield";
import { confirmDialog, errorAlert } from "../../../../utils/swal";
import { postData } from "../../../../utils/api";
import LoadingScreen from "../../../../components/LoadingScreen";
import useFetch from "../../../../hooks/useFetch";
import { useDebounce } from "../../../../hooks/useDebounce";

interface StudentSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentId: string;
    semester?: Semester;
}

const StudentSubjectModal = ({ isOpen, onClose, studentId, semester }: StudentSubjectModalProps) => {
    const [subject, setSubject] = useState<StudentSubject>();
    const [loading, setLoading] = useState<boolean>(false);

    const [subjectOption, setSubjectOption] = useState<Option | null>(null);
    const [subjectSearch, setSubjectSearch] = useState<string>("");
    const subjectSearchDebounce = useDebounce(subjectSearch, 500);

    const [instructorOption, setInstructorOption] = useState<Option | null>(null);
    const [instructorSearch, setInstructorSearch] = useState<string>("");
    const instructorSearchDebounce = useDebounce(instructorSearch, 500);

    // Fetch subjects & instructors
    const { data: subjectsData } = useFetch(`/api/subjects?searchTerm=${subjectSearchDebounce}`);
    const { data: instructorsData } = useFetch(`/api/instructors?searchTerm=${instructorSearchDebounce}`);

    const handleSaveSubject = async () => {
        if (
        await confirmDialog(
            "Are you sure?",
            "Do you really want to add this subject?"
        )
        ) {
        if (
            !subject?.subject ||
            !subject?.section ||
            !subject?.instructor ||
            !subject?.time ||
            !subject?.room ||
            !subject?.units ||
            !subject?.hours
            ) {
            errorAlert("Missing Information", "Please fill in all required fields.");
            return;
        }

        setLoading(true);

        const payload = {
            ...subject,
            student_id: studentId,
            instructor: subject.instructor._id,
            subject: subject.subject._id,
            room: Number(subject?.room),
            semester: semester?._id,
            midtermGrade: Number(subject?.midtermGrade || 0),
            finalGrade: Number(subject?.finalGrade || 0),
        };

        const response = await postData("/api/student-subjects", payload);

        setLoading(false);

        if (!response.success) {
            errorAlert("Error", response.message || "Failed to save subject.");
            return;
        }

        window.location.reload();
        }
    };

    const handleChange = (field: string, value: any) => {
        setSubject((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 1 }}>
        <div className="absolute top-1/2 left-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-6">
            <LoadingScreen loading={loading} />

            {/* Title */}
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">
            Add Subject
            </h2>

            <h1 className="mb-4">
            Semester: {semester?.term} - {semester?.schoolYear}
            </h1>

            {/* Form Grid */}
            <div className="grid grid-cols-2 items-center gap-3">
            <SearchDropdown
                value={subjectOption}
                onChange={(newValue: Option | null) => {
                setSubjectOption(newValue);
                handleChange("subject", newValue?.value);
                }}
                textOnChange={(e) => setSubjectSearch(e.target.value)}
                label="Subject"
                placeholder="Search subject"
                options={
                subjectSearch
                    ? subjectsData?.subjects.map((s: Subject) => ({
                        label: `${s.code} - ${s.name}`,
                        value: s,
                    })) || []
                    : []
                }
            />

            <EmeraldTextField
                label="Time"
                value={subject?.time}
                onChange={(e) => handleChange("time", e.target.value)}
                placeholder="e.g. 9:00 AM"
            />

            <EmeraldTextField
                label="Room"
                value={subject?.room || ""}
                type="number"
                onChange={(e) => handleChange("room", Number(e.target.value))}
                placeholder="e.g. 203"
            />

            <EmeraldTextField
                label="Units"
                value={subject?.units || ""}
                type="number"
                onChange={(e) => handleChange("units", Number(e.target.value))}
                placeholder="e.g. 3"
            />

            <EmeraldTextField
                label="Hours"
                value={subject?.hours || ""}
                type="number"
                onChange={(e) => handleChange("hours", Number(e.target.value))}
                placeholder="e.g. 6"
            />

            <EmeraldTextField
                label="Section"
                value={subject?.section || ""}
                onChange={(e) => handleChange("section", e.target.value)}
                placeholder="e.g. BSIS-4A"
            />

            <SearchDropdown
                value={instructorOption}
                onChange={(newValue: Option | null) => {
                setInstructorOption(newValue);
                handleChange("instructor", newValue?.value);
                }}
                textOnChange={(e) => setInstructorSearch(e.target.value)}
                label="Instructor"
                placeholder="Search instructor"
                options={
                instructorSearch
                    ? instructorsData?.instructors.map((i: Instructor) => ({
                        label: `${i.firstname} ${i.lastname} - ${i.department.name}`,
                        value: i,
                    })) || []
                    : []
                }
            />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
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

export default StudentSubjectModal;
