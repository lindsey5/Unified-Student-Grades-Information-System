import { Pencil, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import type React from "react";
import { Link, useLocation } from "react-router-dom";

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
            <span className="inline">{label}</span>
        </button>
    );
}

interface SidebarButtonProps {
  icon: ReactNode;
  label: string;
  to: string;
}

export const SidebarButton = ({ icon, label, to }: SidebarButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 py-2 px-3 rounded-lg transition cursor-pointer
        ${isActive ? "bg-emerald-600 text-white" : "hover:bg-emerald-800"}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};