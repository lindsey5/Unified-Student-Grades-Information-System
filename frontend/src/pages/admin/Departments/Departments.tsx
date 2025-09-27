import { useState } from "react";
import AddDepartmentModal from "./components/DepartmentModal";
import useFetch from "../../../hooks/useFetch";
import { formatDate } from "../../../utils/dateUtils";
import { Plus } from "lucide-react";
import { DeleteButton, EditButton } from "../../../components/Button";
import { confirmDialog, successAlert, errorAlert } from "../../../utils/swal";
import { deleteData } from "../../../utils/api";

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
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 flex items-center gap-2 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition cursor-pointer"
      >
        <Plus size={18} />
        <span className="hidden sm:inline">Add Department</span>
      </button>

      <div className="w-full max-h-screen overflow-y-auto bg-white shadow-sm rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead className="bg-emerald-600 text-white text-left text-sm font-medium sticky top-0">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Department Name</th>
              <th className="py-3 px-4">Created At</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.departments.map((department: Department, index: number) => (
              <tr
                key={department._id}
                className="hover:bg-gray-50 transition border-b border-gray-200"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-10 h-10 object-cover rounded"
                      src={department.image.imageUrl}
                      alt="logo"
                    />
                    <span>{department.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{formatDate(department.createdAt)}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <EditButton
                      onClick={() => {
                        setSelectedDepartment(department);
                        setIsModalOpen(true);
                      }}
                    />
                    <DeleteButton onClick={() => handleDelete(department._id as string)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
