import React from "react";
import { Toaster } from "sonner";

//customizar mejor para diferentes casos
//de momento solo para error
const Toast = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
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
