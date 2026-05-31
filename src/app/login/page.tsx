import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/provider/Credentials";
import LoginForm from "./components/LoginForm";
import packageJson from "../../../package.json";

const Login = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/home");
    }

    return <LoginForm appVersion={packageJson.version} />;
};

export default Login;
