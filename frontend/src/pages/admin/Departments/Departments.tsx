import { useState } from "react";
import AddDepartmentModal from "./components/DepartmentModal";
import useFetch from "../../../hooks/useFetch";
import { formatDate } from "../../../utils/dateUtils";
import { AddButton, DeleteButton, EditButton } from "../../../components/Button";
import { confirmDialog, successAlert, errorAlert } from "../../../utils/swal";
import { deleteData } from "../../../utils/api";
import EmeraldTable from "../../../components/Table";

const Departments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useFetch("/api/departments");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleDelete = async (departmentId: string) => {
    const confirmed = await confirmDialog(
      "Delete Department",
      "Are you sure you want to delete this department? This action cannot be undone.",
      "warning",
      "Delete",
      "Cancel"
    );

    if (!confirmed) return;

    const response = await deleteData(`/api/departments/${departmentId}`);

    if (response.success) {
      await successAlert(
        "Department Deleted",
        "The department has been successfully removed from the system."
      );
      window.location.reload();
    } else {
      errorAlert(
        "Delete Failed",
        response.message || "Something went wrong while deleting the department."
      );
    }
  };

  return (
    <div className="w-full min-h-screen p-6 items-start flex flex-col gap-5">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-emerald-700">Departments</h1>

      {/* Add Department Button */}
      <AddButton onClick={() => setIsModalOpen(true)} label="Add Department" />

      <EmeraldTable 
        columns={["#", "Department Name", "Created At", "Actions"]}
        data={data?.departments.map((department: Department, index: number) => ({
          "#": index + 1,
          "Department Name": (
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 object-cover rounded"
                src={department.image.imageUrl}
                alt="logo"
              />
              <span>{department.name}</span>
            </div>
          ),
          "Created At": formatDate(department.createdAt),
          "Actions": (
            <div className="flex gap-2">
              <EditButton
                onClick={() => {
                  setSelectedDepartment(department);
                  setIsModalOpen(true);
                }}
              />
              <DeleteButton onClick={() => handleDelete(department._id as string)} />
            </div>
          ),
        })) || []}
      />

      {/* Add Department Modal */}
      <AddDepartmentModal
        isOpen={isModalOpen}
        onClose={handleClose}
        department={selectedDepartment || undefined}
      />
    </div>
  );
};

export default Departments;
