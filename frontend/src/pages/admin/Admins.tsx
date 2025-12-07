import { useState } from "react";
import { AddButton, DeleteButton, EditButton } from "../../components/Button";
import AdminModal from "../../components/ui/Modals/AdminModal";
import useFetch from "../../hooks/useFetch";
import RedTable from "../../components/Table";
import { CircularProgress } from "@mui/material";
import { formatDateTime } from "../../utils/dateUtils";
import { confirmDialog, errorAlert } from "../../utils/swal";
import { deleteData } from "../../utils/api";

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

    const handleDelete = async (id : string) => {
        if(await confirmDialog('Confirm', 'Are you sure do you want to delete this admin?')){
            const response = await deleteData(`/api/admins/${id}`);

            if(!response.success){
                await errorAlert('Failed', response.message || 'Something went wrong.')
                return;
            }

            window.location.reload();
        }

    }

    return (
        <div className="w-full min-h-screen p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-700">Admins</h1>
            <AddButton onClick={() => setIsModalOpen(true)} label="Add Admin" />
        </div>

        {/* Loading / Table */}
        {loading ? (
            <div className="w-full flex justify-center items-center h-64">
            <CircularProgress sx={{ color: "#DC2626" }} />
            </div>
        ) : data?.admins?.length === 0 ? (
            <div className="text-gray-500 w-full h-64 flex items-center justify-center">
            No admins found
            </div>
        ) : (
            <RedTable
            columns={["Firstname", "Lastname", "Email", "Created At", "Action"]}
            data={
                data?.admins?.map((admin: Admin) => ({
                Firstname: admin.firstname,
                Lastname: admin.lastname,
                Email: admin.email,
                "Created At": formatDateTime(admin.createdAt),
                Action: <div className="flex items-center gap-4">
                    <EditButton onClick={() => handleEdit(admin)} />
                    <DeleteButton onClick={() => handleDelete(admin._id)}/>
                </div>,
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
