import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/provider/Credentials";
import RegisterForm from "./components/RegisterForm";

const Register = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/home");
    }

    return <RegisterForm />;
};

export default Register;
