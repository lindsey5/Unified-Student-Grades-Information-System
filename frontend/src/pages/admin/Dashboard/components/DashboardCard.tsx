import React from "react";
import useFetch from "../../../../hooks/useFetch";
import { Users, BookOpen, GraduationCap, Building2 } from "lucide-react"; 

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
    return (
        <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl shadow-sm hover:shadow-md hover:from-emerald-100 hover:to-emerald-200 transition-all duration-200">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500 text-white shadow">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-emerald-700">{title}</p>
                <h2 className="text-xl font-bold text-emerald-900">{value}</h2>
            </div>
        </div>
    );
};

export const TotalStudentCard = () => {
    const { data } = useFetch("/api/students/total");

    return (
        <DashboardCard
            title="Total Students"
            value={data?.total || 0}
            icon={<GraduationCap size={20} />}
        />
    );
};

export const TotalCoursesCard = () => {
    const { data } = useFetch("/api/courses/total");

    return (
        <DashboardCard
            title="Total Courses"
            value={data?.total || 0}
            icon={<BookOpen size={20} />}
        />
    );
};

export const TotalInstuctorsCard = () => {
    const { data } = useFetch("/api/instructors/total");

    return (
        <DashboardCard
            title="Total Instructors"
            value={data?.total || 0}
            icon={<Users size={20} />}
        />
    );
};

export const TotalDepartmentsCard = () => {
    const { data } = useFetch("/api/departments/total");

    return (
        <DashboardCard
            title="Total Departments"
            value={data?.total || 0}
            icon={<Building2 size={20} />} 
        />
    );
};
