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
      className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 border border-gray-200 rounded-lg transition-all"
    >
      <Pencil size={15} />
      <span className="text-sm">{label}</span>
    </button>
  );
};

export const DeleteButton = ({ onClick, label = "Delete" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-all"
    >
      <Trash2 size={15} />
      <span className="text-sm">{label}</span>
    </button>
  );
};

export const AddButton = ({ onClick, label = "Add" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex items-center gap-2 py-2 px-4 mb-4 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all"
    >
      <Plus size={18} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

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