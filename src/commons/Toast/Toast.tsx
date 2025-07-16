import React from "react";
import { Toaster } from "sonner";

const Toast = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: "#e74828",
                    color: "#f5e9d1", 
                    border: "1px solid #e74828",
                    fontFamily: "var(--font-caveat)",
                    fontSize: 16,
                },
            }}
            position="bottom-center"
        />
    );
};

export default Toast;
