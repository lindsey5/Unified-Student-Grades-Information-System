import { useState } from "react";
import { AddButton, DeleteButton, EditButton } from "../../components/Button";
import useFetch from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchField } from "../../components/Textfield";
import { CircularProgress } from "@mui/material";
import RedTable from "../../components/Table";
import RegistrarModal from "../../components/ui/Modals/RegistrarModal";
import { confirmDialog, errorAlert } from "../../utils/swal";
import { deleteData } from "../../utils/api";

const Registrars = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedRegistrar, setSelectedRegistrar] = useState<Registrar>();
    const searchDebounce = useDebounce(searchTerm, 500);

    const { data: registrarsData, loading } = useFetch(`/api/registrars?searchTerm=${searchDebounce}`);

    const handleClose = () => {
        setOpenModal(false);
        setSelectedRegistrar(undefined)
    }

    const handleEdit = (registrar : Registrar) => {
        setOpenModal(true);
        setSelectedRegistrar(registrar)
    }

    const handleDelete = async (id : string) => {
        if(await confirmDialog('Confirm', 'Are you sure do you want to delete this admin?')){
            const response = await deleteData(`/api/registrars/${id}`);

            if(!response.success){
                await errorAlert('Failed', response.message || 'Something went wrong.')
                return;
            }

            window.location.reload();
        }

    }

    return (
        <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-700">School Registrars</h1>
            <AddButton onClick={() => setOpenModal(true)} label="Add Registrar" />
        </div>

        {/* Filters */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-1/2">
            <SearchField
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search by email, firstname or lastname..."
            />
            </div>
        </div>

        {/* Loading, No Data, or Table */}
        {loading ? (
            <div className="w-full flex justify-center items-center h-64">
            <CircularProgress sx={{ color: "#DC2626" }} />
            </div>
        ) : registrarsData?.registrars?.length === 0 ? (
            <div className="w-full flex justify-center items-center h-64 text-gray-500">
            No registrars found
            </div>
        ) : (
            <>
            <RedTable
                columns={[
                "Firstname",
                "Lastname",
                "Email",
                "Created By",
                "Action",
                ]}
                data={
                registrarsData?.registrars.map((r: Registrar) => ({
                    Firstname: r.firstname,
                    Lastname: r.lastname,
                    Email: r.email,
                    "Created By": `${r.createdBy.firstname} ${r.createdBy.lastname}`,
                    Action: <div className="flex items-center gap-4">
                        <EditButton onClick={() => handleEdit(r)} />
                        <DeleteButton onClick={() => handleDelete(r._id || '')}/>
                    </div>,
                })) || []
                }
            />
            </>
        )}

        <RegistrarModal 
            isOpen={openModal}
            onClose={handleClose}
            registrar={selectedRegistrar}
        />

        </div>
    );
};

export default Registrars;
