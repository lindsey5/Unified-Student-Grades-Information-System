import { useState } from "react"
import { AddButton, DeleteButton, EditButton } from "../../../components/Button"
import SubjectModal from "./components/SubjectModal";
import useFetch from "../../../hooks/useFetch";
import EmeraldTable from "../../../components/Table";
import { formatDateTime } from "../../../utils/dateUtils";
import { Pagination } from "@mui/material";
import { SearchField } from "../../../components/Textfield";

const Subjects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data : subjectsData } = useFetch(`/api/subjects?page=${page}&searchTerm=${searchTerm}`);
    const [selectedSubject, setSelectedSubject] = useState<Subject>()

    const handleClose = () => {
        setIsModalOpen(false)
        setSelectedSubject(undefined)
    }

    const handleEdit = (subject : Subject) => {
        setIsModalOpen(true)
        setSelectedSubject(subject)
    }

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font-bold text-emerald-700">Subjects</h1>
                <AddButton onClick={() => setIsModalOpen(true)} label="Add Subject" />
            </div>

            <div className="w-full sm:w-1/2">
                <SearchField
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by subject or code..."
                />
            </div>
            

            <EmeraldTable 
                columns={['#', 'Subject', 'Code', 'Created At', 'Actions']}
                data={subjectsData?.subjects.map((subject : Subject, index : number) => ({
                    '#': index + 1,
                    'Subject': subject.name,
                    'Code' : subject.code,
                    'Created At' : formatDateTime(subject.createdAt),
                    'Actions' : (
                        <div className="flex gap-2">
                            <EditButton
                                onClick={() => handleEdit(subject)}
                            />
                            <DeleteButton onClick={() => {}} />
                        </div>
                    ),
                })) || []}
                
            />

            <SubjectModal 
                isOpen={isModalOpen}
                onClose={handleClose}
                subject={selectedSubject}
            />

            {subjectsData?.subjects.length > 0 && <Pagination
                page={page}
                count={subjectsData?.totalPages || 1}
                onChange={handleChange}
                color="primary"
            />}
        </div>
    )
}

export default Subjects