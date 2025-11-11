import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useFetch from "../../../../hooks/useFetch";
import { CircularProgress } from "@mui/material"; // Spinner

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentCountChart = () => {
    const [selectedCourse, setSelectedCourse] = useState<string>("all");

    const { data, loading } = useFetch(
        selectedCourse === "all"
        ? "/api/students/count"
        : `/api/students/count?course=${selectedCourse}`
    );

    const { data: coursesData } = useFetch("/api/courses");

    const chartData = useMemo(() => {
        if (!data?.data) return null;

        return {
        labels: ["Year 1", "Year 2", "Year 3", "Year 4"],
        datasets: [
            {
            label: "Student Count",
            data: [
                data.data.year1,
                data.data.year2,
                data.data.year3,
                data.data.year4,
            ],
            backgroundColor: "#10b981", 
            borderColor: "#059669", 
            borderWidth: 1,
            borderRadius: 6, 
            },
        ],
        };
    }, [data]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: { position: "top" as const },
        },
        scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
    };

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Course filter dropdown */}
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <h1 className="text-xl font-bold text-emerald-700">
                Student Count Per Year Level
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="text-sm font-medium">Filter by Course:</label>
                <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
                >
                <option value="all">All Courses</option>
                {coursesData?.courses?.map((course: Course) => (
                    <option key={course._id} value={course._id}>
                    {course.name}
                    </option>
                ))}
                </select>
            </div>
        </div>

        {/* Chart */}
        <div className="w-full h-[400px] flex items-center justify-center">
            {loading || !chartData ? (
            <CircularProgress sx={{ color: "#10b981" }} />
            ) : (
            <Bar data={chartData} options={options} />
            )}
        </div>
        </div>
    );
};

export default StudentCountChart;
