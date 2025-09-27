import { Pencil, Plus, Trash2 } from "lucide-react";
import type React from "react";

interface ButtonProps {
  onClick: (e : React.MouseEvent) => void;
  label?: string;
}

export const EditButton = ({ onClick, label = "Edit" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-1 rounded-md text-blue-600 border border-blue-200 hover:bg-blue-50 transition cursor-pointer"
    >
      <Pencil size={16} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export const DeleteButton = ({ onClick, label = "Delete" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-1 rounded-md text-red-600 border border-red-200 hover:bg-red-50 transition cursor-pointer"
    >
      <Trash2 size={16} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export const AddButton = ({ onClick, label = "Add" }: { onClick: () => void, label?: string }) => {
  return (
        <button
            className="mb-4 flex items-center gap-2 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition cursor-pointer"
            onClick={onClick}
        >
            <Plus size={18} />
            <span className="hidden lg:inline">{label}</span>
        </button>
    );
}