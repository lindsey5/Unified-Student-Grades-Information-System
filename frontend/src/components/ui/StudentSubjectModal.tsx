import { Chip, MenuItem, Modal } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { RedTextField, SearchDropdown } from "../Textfield";
import { confirmDialog, errorAlert } from "../../utils/swal";
import { postData, updateData } from "../../utils/api";
import LoadingScreen from "../LoadingScreen";
import useFetch from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";
import { RedSelect } from "../Select";
import { grades } from "../../contants/grades";
import { RedCheckBox } from "../Checkbox";

interface StudentSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentId: string;
    studentSubject?: StudentSubject;
    semester?: Semester;
}

type ExtendedStudentSubject = Omit<StudentSubject, "subject" | "instructor"> & {
    subject?: Subject;
    instructor?: Instructor;
};

const StudentSubjectModal = ({
    isOpen,
    onClose,
    studentId,
    semester,
    studentSubject,
}: StudentSubjectModalProps) => {
    const [subject, setSubject] = useState<ExtendedStudentSubject>();
    const [loading, setLoading] = useState<boolean>(false);

    const [subjectSearch, setSubjectSearch] = useState<string>("");
    const subjectSearchDebounce = useDebounce(subjectSearch, 500);

    const [instructorSearch, setInstructorSearch] = useState<string>("");
    const instructorSearchDebounce = useDebounce(instructorSearch, 500);

    const { data: subjectsData, loading: subjectsLoading } = useFetch(`/api/subjects?searchTerm=${subjectSearchDebounce}`);
    const { data: instructorsData, loading: instructorsLoading } = useFetch(`/api/instructors?searchTerm=${instructorSearchDebounce}`);

    useEffect(() => {
        setSubject(studentSubject)
    }, [studentSubject, studentId]);

    const handleSaveSubject = async () => {
        const isEdit = Boolean(subject?._id);

        if (
            await confirmDialog(
                "Are you sure?",
                `Do you really want to ${isEdit ? "update" : "add"} this subject?`
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

            const response = isEdit
                ? await updateData(`/api/student-subjects/${subject._id}`, payload)
                : await postData("/api/student-subjects", payload);

            setLoading(false);

            if (!response.success) {
                errorAlert("Error", response.message || `Failed to ${isEdit ? "update" : "save"} subject.`);
                return;
            }

            window.location.reload();
        }
    };

    const handleChange = (field: string, value: any) => {
        setSubject((prev: any) => ({ ...prev, [field]: value }));
    };

    const isEdit = Boolean(subject?._id);

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 1 }}>
            <div className="items-start flex flex-col gap-4 absolute top-1/2 left-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-6">
                
                <LoadingScreen loading={loading} />

                {/* Title */}
                <h2 className="text-lg font-semibold text-red-700">
                    {isEdit ? "Edit Subject" : "Add Subject"}
                </h2>

                <h1>
                    Semester: {semester?.term} - {semester?.schoolYear}
                </h1>

                {/* Subject selection */}
                {!subject?.subject && (
                    <SearchDropdown
                        value={subjectSearch}
                        isLoading={subjectsLoading}
                        placeholder="Search subject"
                        onChange={(e) => setSubjectSearch(e.target.value)}
                        onSelect={(value) => handleChange("subject", value)}
                        options={
                            subjectsData?.subjects.map((s: Subject) => ({
                                label: `${s.code} - ${s.name}`,
                                value: s,
                            })) || []
                        }
                    />
                )}

                {subject?.subject && (
                    <div className="flex gap-5 items-center">
                        <h1 className="text-gray-500">Subject:</h1>
                        <Chip
                            onDelete={() => setSubject((prev) => ({ ...prev!, subject: undefined }))}
                            label={`${subject.subject.code} - ${subject.subject.name}`}
                        />
                    </div>
                )}

                {/* Instructor selection */}
                {!subject?.instructor && (
                    <SearchDropdown
                        value={instructorSearch}
                        isLoading={instructorsLoading}
                        placeholder="Search instructor"
                        onChange={(e) => setInstructorSearch(e.target.value)}
                        onSelect={(value) => handleChange("instructor", value)}
                        options={
                            instructorsData?.instructors.map((i: Instructor) => ({
                                label: `${i.firstname} ${i.lastname} - ${i.department.name}`,
                                value: i,
                            })) || []
                        }
                    />
                )}

                {subject?.instructor && (
                    <div className="flex gap-5 items-center">
                        <h1 className="text-gray-500">Instructor:</h1>
                        <Chip
                            onDelete={() => setSubject((prev) => ({ ...prev!, instructor: undefined }))}
                            label={`${subject.instructor.firstname} ${subject.instructor.lastname} - ${subject.instructor.department.name}`}
                        />
                    </div>
                )}

                {/* Form Grid */}
                <div className="w-full grid grid-cols-2 items-center gap-3">
                    <RedTextField
                        label="Time"
                        value={subject?.time}
                        onChange={(e) => handleChange("time", e.target.value)}
                        placeholder="e.g. 9:00 AM"
                    />

                    <RedTextField
                        label="Room"
                        value={subject?.room || ""}
                        type="number"
                        onChange={(e) => handleChange("room", Number(e.target.value))}
                        placeholder="e.g. 203"
                    />

                    <RedTextField
                        label="Units"
                        value={subject?.units || ""}
                        type="number"
                        onChange={(e) => handleChange("units", Number(e.target.value))}
                        placeholder="e.g. 3"
                    />

                    <RedTextField
                        label="Hours"
                        value={subject?.hours || ""}
                        type="number"
                        onChange={(e) => handleChange("hours", Number(e.target.value))}
                        placeholder="e.g. 6"
                    />

                    <RedTextField
                        label="Section"
                        value={subject?.section || ""}
                        onChange={(e) => handleChange("section", e.target.value)}
                        placeholder="e.g. BSIS-4A"
                    />
                </div>

                {studentSubject && (
                    <>
                        <div className="w-full grid grid-cols-2 gap-3">
                            <RedSelect
                                value={subject?.midtermGrade}
                                disabled={studentSubject?.isFinalized}
                                onChange={(e) => handleChange("midtermGrade", Number(e.target.value))}
                                displayEmpty
                                label="Midterm Grade"
                            >
                                {grades.map((grade) => (
                                    <MenuItem value={grade}>{grade.toFixed(2)}</MenuItem>
                                ))}
                            </RedSelect>

                            <RedSelect
                                value={subject?.finalGrade}
                                disabled={studentSubject?.isFinalized}
                                onChange={(e) => handleChange("finalGrade", Number(e.target.value))}
                                displayEmpty
                                label="Final Grade"
                            >
                                {grades.map((grade) => (
                                    <MenuItem value={grade}>{grade.toFixed(2)}</MenuItem>
                                ))}
                            </RedSelect>
                        </div>

                        {!studentSubject.isFinalized && (
                            <div className="flex justify-end">
                                <RedCheckBox
                                    label="Finalized Grades"
                                    checked={subject?.isFinalized || false}
                                    onChange={(e) => handleChange("isFinalized", e.target.checked)}
                                />
                            </div>
                        )}
                    </>
                )}

                {/* Actions */}
                <div className="w-full flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSaveSubject}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition cursor-pointer"
                    >
                        <Check size={18} />
                        {isEdit ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default memo(StudentSubjectModal);
