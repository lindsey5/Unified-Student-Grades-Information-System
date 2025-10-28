import React from "react";
import { CheckCircle, Slash, GraduationCap } from "lucide-react";

type Status = "Active" | "Inactive" | "Graduated";

interface StatusChipProps {
    status: Status;
    size?: "sm" | "md";
}


const STATUS_META: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
    Active: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <CheckCircle className="h-4 w-4" aria-hidden />,
    },
    Inactive: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: <Slash className="h-4 w-4" aria-hidden />,
    },
    Graduated: {
        bg: "bg-violet-100",
        text: "text-violet-800",
        icon: <GraduationCap className="h-4 w-4" aria-hidden />,
    },
};


export default function StatusChip({ status, size = "md" }: StatusChipProps) {
    const meta = STATUS_META[status];

    const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
    const gap = size === "sm" ? "gap-1" : "gap-2";

    return (
        <span
        role="status"
        aria-label={`Status: ${status}`}
        className={`${meta.bg} ${meta.text} inline-flex items-center ${gap} rounded-full font-medium ${padding}`}
        >
        <span className="flex items-center">{meta.icon}</span>
        <span className="select-none">{status}</span>
        </span>
    );
}