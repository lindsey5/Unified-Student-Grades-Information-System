import { useState } from "react"
import { AddButton, DeleteButton, EditButton } from "../../../components/Button"
import InstructorModal from "./components/InstructorModal";
import useFetch from "../../../hooks/useFetch";
import { useDebounce } from "../../../hooks/useDebounce";
import { SearchField } from "../../../components/Textfield";
import { EmeraldSelect } from "../../../components/Select";
import { MenuItem, Pagination } from "@mui/material";
import EmeraldTable from "../../../components/Table";
import { formatDate } from "../../../utils/dateUtils";

const Instructors = () => {
    const [page, setPage] = useState(1);
    const [department, setDepartment] = useState<string>("All");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const searchDebounce = useDebounce(searchTerm, 500);
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor>();
    const { data : instructorsData } = useFetch(`/api/instructors?page=${page}&limit=${50}&searchTerm=${searchDebounce}&department=${department}`);
    const { data : departmentsData } = useFetch('/api/departments');

    const handleEdit = (instructor : Instructor) => {
        setIsModalOpen(true);
        setSelectedInstructor(instructor);
    }

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedInstructor(undefined)
    }

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font-bold text-emerald-700">Instructors</h1>
                <AddButton onClick={() => setIsModalOpen(true)} label="Add Instructor" />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="w-full md:w-1/2">
                    <SearchField 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder="Search by firstname or lastname"
                    />
                </div>
                <div className="w-full md:w-64">
                    <EmeraldSelect
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        displayEmpty
                        label="Department"
                    >
                    <MenuItem value="All">All</MenuItem>
                    {departmentsData?.departments?.map((d : Department) => (
                        <MenuItem key={d._id} value={d._id}>
                        {d.name}
                        </MenuItem>
                    ))}
                    </EmeraldSelect>
                </div>
            </div>

            <EmeraldTable 
                columns={['Firstname', 'Lastname', 'Department', 'Status', 'Created At', 'Action']}
                data={instructorsData?.instructors.map((i : Instructor) => ({
                    "Firstname": i.firstname,
                    "Lastname": i.lastname,
                    "Department": i.department.name,
                    "Status": (
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                        i.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {i.status.charAt(0).toUpperCase() + i.status.slice(1, i.status.length)}
                    </span>
                    ),
                    "Created At": formatDate(i.createdAt),
                    "Action": (<EditButton onClick={() => handleEdit(i)} />),
                })) || []}
            />

            <InstructorModal 
                isOpen={isModalOpen}
                onClose={handleClose}
                instructor={selectedInstructor}
            />

            {instructorsData?.instructors.length > 0 && <Pagination
                page={page}
                count={instructorsData?.totalPages || 1}
                onChange={handleChange}
                color="primary"
            />}
        </div>
    )
}

export default Instructors