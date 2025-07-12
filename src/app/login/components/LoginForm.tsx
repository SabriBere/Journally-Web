"use client";
import React from "react";
import InputEmail from "@/commons/Inputs/InputEmail";
import InputPassword from "@/commons/Inputs/InputPassword";

const LoginForm = () => {
    return (
        <div>
            <h3>Iniciar sesión</h3>
            <InputEmail />
            <InputPassword />
            <button type="submit">Iniciar sesión</button>
        </div>
    );
};

export default LoginForm;
