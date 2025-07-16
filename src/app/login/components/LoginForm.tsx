"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import InputEmail from "@/commons/Inputs/InputEmail";
import InputPassword from "@/commons/Inputs/InputPassword";
import Voyager from "@/commons/Ilustrations/Voyager";
import styles from "./loginForm.module.scss";
const LoginForm = () => {
    const router = useRouter();
    const inputEmail = useSelector((state: RootState) => state.user.email);
    const inputPass = useSelector((state: RootState) => state.user.password);
    //armar un estado de loading
    const isDisabled = !inputEmail || !inputPass;

    const handlerLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                redirect: false,
                user: inputEmail,
                password: inputPass,
            });

            //agregar un spinner o pantalla de carga
            if (!res?.ok) {
                console.log("Error en login");
                //toast de error
                return toast.error("Correo o contraseña incorrectos");
            }

            return router.push(`/home`);
        } catch (error) {
            console.error("Error no capturado", error);
            //toast de error
            return toast.error("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className={styles.containerLoginForm}>
            <h1>Iniciar sesión</h1>
            <div className={styles.loginCard}>
                <div className={styles.voyagerBg}>
                    <Voyager width="200%" height="200%" />
                </div>
                <InputEmail />
                <InputPassword />
                <button
                    disabled={isDisabled}
                    className={styles.buttonSubmit}
                    type="submit"
                    onClick={handlerLogin}
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
