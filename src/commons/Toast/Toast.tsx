import React from "react";
import { Toaster } from "sonner";

//customizar mejor para diferentes casos
//de momento solo para error
const Toast = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: "#e74828",
                    color: "#f5e9d1",
                    border: "1px solid #e74828",
                    fontFamily: "var(--font-caveat)",
                    fontSize: 18,
                    letterSpacing: "0.6px",
                },
            }}
            position="top-center"
        />
    );
};

export default Toast;
