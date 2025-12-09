import { TotalCoursesCard, TotalDepartmentsCard, TotalInstructorsCard, TotalStudentCard } from "../components/ui/DashboardCard";
import RecentStudentsTable from "../components/ui/RecentStudentsTable";
import StudentCountChart from "../components/ui/StudentCountChart";
import StudentGenderCountChart from "../components/ui/StudentGenderCount";
import StudentRankingTable from "../components/ui/StudentRanking";

const Dashboard = () => {
    return (
        <div className="w-full min-h-screen p-6 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-red-700">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TotalStudentCard />
            <TotalCoursesCard />
            <TotalInstructorsCard />
            <TotalDepartmentsCard />
        </div>

        {/* Chart */}
        <div className="grid md:grid-cols-2 gap-5">
            <StudentCountChart />
            <StudentGenderCountChart />
        </div>
        <StudentRankingTable />
        <RecentStudentsTable />
        </div>
    );
};

export default Dashboard;
