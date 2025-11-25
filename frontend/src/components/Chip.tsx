import React from "react";
import { CheckCircle, Slash, GraduationCap, XCircle } from "lucide-react";

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

type GradeStatusChipProps = {
  grade: number;
  size?: "sm" | "md" | "lg";
};

export const GradeStatusChip = ({ grade, size = "md" }: GradeStatusChipProps) => {
    const isPassed = grade <= 3.0;

    const statusConfig = isPassed
        ? {
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-700",
            icon: CheckCircle,
            label: "Passed",
            dotColor: "bg-emerald-500",
        }
        : {
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-700",
            icon: XCircle,
            label: "Failed",
            dotColor: "bg-red-500",
        };

    const sizeConfig = {
        sm: {
        padding: "px-2.5 py-1",
        text: "text-xs",
        icon: 14,
        dot: "w-1.5 h-1.5",
        },
        md: {
        padding: "px-3 py-1.5",
        text: "text-sm",
        icon: 16,
        dot: "w-2 h-2",
        },
        lg: {
        padding: "px-4 py-2",
        text: "text-base",
        icon: 18,
        dot: "w-2.5 h-2.5",
        },
    };

    const sizeSettings = sizeConfig[size];
    const Icon = statusConfig.icon;

    return (
        <span
        className={`
            inline-flex items-center gap-2 rounded-full border
            ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text}
            ${sizeSettings.padding} ${sizeSettings.text}
            font-semibold shadow-sm transition-all hover:shadow-md
        `}
        >
        <Icon size={sizeSettings.icon} className="flex-shrink-0" />
        <span>{statusConfig.label}</span>
        <span className={`${sizeSettings.dot} ${statusConfig.dotColor} rounded-full animate-pulse`}></span>
        </span>
    );
};