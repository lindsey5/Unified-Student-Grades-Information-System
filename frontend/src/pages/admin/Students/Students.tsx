import { BookOpen, Plus } from "lucide-react"
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { DeleteButton, EditButton } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const Students = () => {
    const { data } = useFetch("/api/students");
    const navigate = useNavigate();
    
    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
           <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font-bold text-emerald-700">Students</h1>
                <button
                    className="mb-4 flex items-center gap-2 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition cursor-pointer"
                >
                    <Plus size={18} />
                    <span className="hidden lg:inline" onClick={() => navigate('/admin/student')}>Add Student</span>
                </button>
            </div>
            <div className="w-full max-h-screen overflow-y-auto bg-white shadow-sm rounded-lg border border-gray-200">
                <table className="min-w-full border-collapse">
                <thead className="bg-emerald-600 text-white text-left text-sm font-medium sticky top-0">
                    <tr>
                        <th className="py-3 px-4">Fullname</th>
                        <th className="py-3 px-4">Student ID</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Gender</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.students.map((student : Student) => (
                    <tr
                        key={student._id}
                        className="hover:bg-gray-50 transition border-b border-gray-200"
                    >
                        <td className="py-3 px-4">
                            <div className="flex items-center gap-4">
                                <Avatar src={student?.image?.imageUrl}/>
                                {student.firstname} {student.lastname}
                            </div>
                        </td>
                        <td className="py-3 px-4">{student.student_id}</td>
                        <td className="py-3 px-4">{student.email}</td>
                        <td className="py-3 px-4">{student.gender}</td>
                        <td className="py-3 px-4">{student.course.name}</td>
                        <td className="py-3 px-4">
                        <div className="flex gap-2">
                           <button
  className="cursor-pointer flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition text-sm"
>
  <BookOpen size={16} />
  View Grades
</button>
                            <EditButton
                                onClick={() => navigate(`/admin/student/${student._id}`)}
                            />
                            <DeleteButton onClick={() => {}} />
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default Students