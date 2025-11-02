import { useState } from "react";
import { AddButton, EditButton } from "../../../components/Button";
import AdminModal from "./components/AdminModal";
import useFetch from "../../../hooks/useFetch";
import EmeraldTable from "../../../components/Table";
import { CircularProgress } from "@mui/material";
import { formatDateTime } from "../../../utils/dateUtils";

const Admins = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | undefined>();

    const { data, loading } = useFetch("/api/admins/all"); 

    const handleEdit = (admin: Admin) => {
        setSelectedAdmin(admin);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedAdmin(undefined);
    };

    return (
        <div className="w-full min-h-screen p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold text-emerald-700">Admins</h1>
            <AddButton onClick={() => setIsModalOpen(true)} label="Add Admin" />
        </div>

        {/* Loading / Table */}
        {loading ? (
            <div className="w-full flex justify-center items-center h-64">
            <CircularProgress sx={{ color: "#10b981"  }} />
            </div>
        ) : data?.admins?.length === 0 ? (
            <div className="text-gray-500 w-full h-64 flex items-center justify-center">
            No admins found
            </div>
        ) : (
            <EmeraldTable
            columns={["Firstname", "Lastname", "Email", "Created At", "Action"]}
            data={
                data?.admins?.map((admin: Admin) => ({
                Firstname: admin.firstname,
                Lastname: admin.lastname,
                Email: admin.email,
                "Created At": formatDateTime(admin.createdAt),
                Action: <EditButton onClick={() => handleEdit(admin)} />,
                })) || []
            }
            />
        )}

        {/* Modal */}
        <AdminModal
            isOpen={isModalOpen}
            onClose={handleClose}
            admin={selectedAdmin}
        />
        </div>
    );
};

export default Admins;
