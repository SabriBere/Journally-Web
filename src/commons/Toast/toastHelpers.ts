import { toast } from "sonner";

export const showSuccess = (message: string) =>
    toast.success(message, {
        style: {
            background: "#28a745",
            color: "#fff",
            border: "1px solid #28a745",
        },
    });

export const showError = (message: string) =>
    toast.error(message, {
        style: {
            background: "#e74828",
            color: "#f5e9d1",
            border: "1px solid #e74828",
        },
    });

export const showWarning = (message: string) =>
    toast(message, {
        style: {
            background: "#ff9800",
            color: "#fff",
            border: "1px solid #ff9800",
        },
    });

export const showInfo = (message: string) =>
    toast(message, {
        style: {
            background: "#007bff",
            color: "#fff",
            border: "1px solid #007bff",
        },
    });
