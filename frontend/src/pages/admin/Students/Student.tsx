import { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { Check, ArrowLeft, User, Mail, BookOpen, Users } from "lucide-react";
import { EmeraldTextField } from "../../../components/Textfield";
import { EmeraldSelect } from "../../../components/Select";
import { confirmDialog, errorAlert, successAlert } from "../../../utils/swal";
import LoadingScreen from "../../../components/LoadingScreen";
import useFetch from "../../../hooks/useFetch";
import { postData, updateData } from "../../../utils/api";

const Student = () => {
    const { id } = useParams(); // studentId from params
    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("Male");
    const [course, setCourse] = useState("");
    const [yearLevel, setYearLevel] = useState("");
    const [status, setStatus] = useState("Active");
    const [loading, setLoading] = useState(false);

    const { data: studentData } = useFetch(id ? `/api/students/${id}` : "");
    const { data: coursesData } = useFetch("/api/courses");

    useEffect(() => {
        const s = studentData?.student;
        if (s) {
        setStudentId(s.student_id);
        setEmail(s.email);
        setFirstname(s.firstname);
        setMiddlename(s.middlename || ""); 
        setLastname(s.lastname);
        setGender(s.gender);
        setCourse(s.course?._id || "");
        setYearLevel(s.year_level || "");
        setStatus(s.status || "Active");
        }
    }, [studentData]);

    const handleSave = async () => {
        const action = id ? "update" : "add";
        if (
        await confirmDialog(
            "Are you sure?",
            `Do you really want to ${action} this student?`
        )
        ) {
        if (!studentId || !email || !firstname || !lastname || !course || !yearLevel) {
            errorAlert("Missing Information", "Please fill out all required fields.");
            return;
        }

        setLoading(true);
        const payload = {
            student_id: studentId,
            email,
            firstname,
            middlename, 
            lastname,
            gender,
            course,
            year_level: yearLevel,
            status,
        };

        const response = !id
            ? await postData("/api/students", payload)
            : await updateData(`/api/students/${id}`, payload);

        setLoading(false);

        if (!response.success) {
            errorAlert("Error", response.message || "Failed to save student.");
            return;
        }
        await successAlert(
            `Student ${id ? 'Updated' : 'Saved'}`,
            `The student has been successfully ${id ? 'updated' : 'saved'}.`
        );
        if(!id) navigate(`/admin/students`)
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <LoadingScreen loading={loading} />

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate("/admin/students")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Students</span>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <User size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {id ? "Edit Student" : "New Student"}
                    </h1>
                    <p className="text-sm text-gray-500">
                    {id ? "Update student information" : "Add a new student to the system"}
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto p-6 pt-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl shadow-gray-500/5 overflow-hidden">
            
            {/* Form Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-8 py-6 border-b border-gray-200/50">
                <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <Users size={24} className="text-emerald-600" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Student Information</h2>
                    <p className="text-sm text-gray-600">Please fill in all the required details</p>
                </div>
                </div>
            </div>

            {/* Form Fields */}
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Student ID */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">Student ID</label>
                    <span className="text-red-500">*</span>
                    </div>
                    <EmeraldTextField
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    fullWidth
                    placeholder="Enter student ID"
                    />
                </div>

                {/* Email */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Mail size={16} className="text-purple-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <span className="text-red-500">*</span>
                    </div>
                    <EmeraldTextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    placeholder="student@university.edu"
                    />
                </div>

                {/* First Name */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <User size={16} className="text-green-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                    <span className="text-red-500">*</span>
                    </div>
                    <EmeraldTextField
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    fullWidth
                    placeholder="Enter first name"
                    />
                </div>

                {/* Middle Name */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                        <User size={16} className="text-teal-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">Middle Name</label>
                    </div>
                    <EmeraldTextField
                    value={middlename}
                    onChange={(e) => setMiddlename(e.target.value)}
                    fullWidth
                    placeholder="Enter middle name"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <User size={16} className="text-orange-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                    <span className="text-red-500">*</span>
                    </div>
                    <EmeraldTextField
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    fullWidth
                    placeholder="Enter last name"
                    />
                </div>

                {/* Gender */}
                <div>
                    <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Users size={16} className="text-pink-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">Gender</label>
                    </div>
                    <EmeraldSelect
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    displayEmpty
                    >
                    {["Male", "Female"].map((g) => (
                        <MenuItem key={g} value={g}>
                        {g}
                        </MenuItem>
                    ))}
                    </EmeraldSelect>
                </div>

                {/* Course */}
                <div>
                    <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen size={16} className="text-indigo-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">Course</label>
                    <span className="text-red-500">*</span>
                    </div>
                    <EmeraldSelect
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    displayEmpty
                    >
                    <MenuItem value="" disabled>
                        <span className="text-gray-400">Select a course</span>
                    </MenuItem>
                    {coursesData?.courses?.map((c: Course) => (
                        <MenuItem key={c._id} value={c._id}>
                        {c.name}
                        </MenuItem>
                    ))}
                    </EmeraldSelect>
                </div>

                {/* Year Level */}
                <div>
                    <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <BookOpen size={16} className="text-yellow-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">Year Level</label>
                    <span className="text-red-500">*</span>
                    </div>
                    <EmeraldSelect
                    value={yearLevel}
                    onChange={(e) => setYearLevel(e.target.value)}
                    displayEmpty
                    >
                    <MenuItem value="" disabled>
                        <span className="text-gray-400">Select year level</span>
                    </MenuItem>
                    {[1, 2, 3, 4].map((y) => (
                        <MenuItem key={y} value={y}>
                        Year {y}
                        </MenuItem>
                    ))}
                    </EmeraldSelect>
                </div>

                {/* Status */}
                <div>
                    <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Users size={16} className="text-red-600" />
                    </div>
                    <label className="text-sm font-semibold text-gray-700">Status</label>
                    </div>
                    <EmeraldSelect
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    displayEmpty
                    >
                    {["Active", "Graduated", "Inactive"].map((s) => (
                        <MenuItem key={s} value={s}>
                        {s}
                        </MenuItem>
                    ))}
                    </EmeraldSelect>
                </div>
                </div>

                {/* Required Fields Notice */}
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800 flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Required fields must be completed before saving
                </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50/50 px-8 py-6 border-t border-gray-200/50">
                <div className="flex items-center justify-end gap-4">
                <button
                    onClick={() => navigate("/admin/students")}
                    className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-3 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 font-medium shadow-lg hover:shadow-xl cursor-pointer"
                >
                    <Check size={18} />
                    {id ? "Update Student" : "Create Student"}
                </button>
                </div>
            </div>
            </div>

            {/* Additional Info Card */}
            <div className="mt-6 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-blue-600" />
                </div>
                <div>
                <h3 className="font-semibold text-gray-900 mb-1">Student Management Tips</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Ensure all student information is accurate and up-to-date. The Student ID should be unique 
                    and follow your institution's format. Email addresses will be used for system notifications 
                    and communications.
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Student;
