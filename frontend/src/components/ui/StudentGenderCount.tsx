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
import useFetch from "../../hooks/useFetch";
import { CircularProgress } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentGenderCountChart = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  const { data, loading } = useFetch(
    selectedCourse === "all"
      ? "/api/students/gender-count"
      : `/api/students/gender-count?course=${selectedCourse}`
  );
  const { data: coursesData } = useFetch("/api/courses");

  const chartData = useMemo(() => {
    if (!data?.count) return null;

    return {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "Student Count by Gender",
          data: data.count.map((count : any) => count.total),
          backgroundColor: "#ef4444", // red-500
          borderColor: "#b91c1c", // red-700
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
      
      {/* Course filter */}
      <div className="mb-4 flex flex-col items-start gap-2">
        <h1 className="text-xl font-bold text-red-700">
          Student Count by Gender
        </h1>

        <div className="flex items-center gap-2">
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
          <CircularProgress sx={{ color: "#ef4444" }} /> // red spinner
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default StudentGenderCountChart;
