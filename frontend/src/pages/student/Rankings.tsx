import { useContext, useState } from "react";
import RedTable from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import { RedSelect } from "../../components/Select";
import { CircularProgress, MenuItem, Pagination } from "@mui/material";
import { StudentContext } from "../../contexts/StudentContext";
import { Star } from "lucide-react";

const StudentRankings = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [page, setPage] = useState(1);
  const { data, loading } = useFetch(
    `/api/students/ranking?page=${page}&limit=50&course=${selectedCourse === 'All' ? '' : selectedCourse}`
  );
  const { data: coursesData } = useFetch('/api/courses');
  const { student } = useContext(StudentContext);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="w-full flex flex-col gap-5 min-h-screen p-6">
      <div className="w-full flex justify-between items-center flex-wrap">
        <h1 className="text-2xl font-bold text-red-700">Student Rankings</h1>
        <div className="w-[400px]">
          <RedSelect
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            displayEmpty
            label="Course"
          >
            <MenuItem value="All">All</MenuItem>
            {coursesData?.courses?.map((c: Course) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </RedSelect>
        </div>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center h-64">
          <CircularProgress sx={{ color: "#DC2626" }} /> {/* Red spinner */}
        </div>
      ) : (
        <>
          <RedTable
            columns={['Rank', 'Fullname', 'Year Level', 'Lowest Grade', 'GWA']}
            data={data?.rankings.map((ranking: any, index: number) => ({
              'Rank': (
                <div className="flex items-center gap-1 font-semibold">
                  {student?.student_id === ranking.student_id && (
                    <Star className="w-6 h-6 text-red-600" />
                  )}
                  {index + 1}
                </div>
              ),
              'Fullname': `${ranking.firstname} ${ranking.lastname}`,
              'Year Level': ranking.year_level,
              'Lowest Grade': ranking.lowestGrade,
              'GWA': ranking.gwa
            })) || []}
          />

          {/* Pagination */}
          {data?.rankings.length > 0 && (
            <Pagination
              page={page}
              count={data?.totalPages || 1}
              onChange={handleChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default StudentRankings;
