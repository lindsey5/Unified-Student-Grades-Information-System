import { TotalCoursesCard, TotalDepartmentsCard, TotalInstuctorsCard, TotalStudentCard } from "./components/DashboardCard";
import RecentStudentsTable from "./components/RecentStudentsTable";
import StudentCountChart from "./components/StudentCountChart";

const AdminDashboard = () => {
    return (
        <div className="w-full min-h-screen p-6 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-emerald-700">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TotalStudentCard />
            <TotalCoursesCard />
            <TotalInstuctorsCard />
            <TotalDepartmentsCard />
        </div>

        {/* Chart */}
        <StudentCountChart />
        <RecentStudentsTable />
        </div>
    );
};

export default AdminDashboard;
