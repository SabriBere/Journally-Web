import React from "react";
import LoginForm from "./components/LoginForm";
import packageJson from "../../../package.json";

const Login = () => {
    return <LoginForm appVersion={packageJson.version} />;
};

export default Login;
