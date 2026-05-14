"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { showError } from "@/commons/Toast/toastHelpers";
import InputEmail from "@/commons/Inputs/InputEmail";
import InputPassword from "@/commons/Inputs/InputPassword";
import Voyager from "@/commons/Ilustrations/Voyager";
import styles from "./loginForm.module.scss";
import Spinner from "@/commons/Spinner/Spinner";

type LoginFormProps = {
    appVersion: string;
};

const LoginForm = ({ appVersion }: LoginFormProps) => {
    const router = useRouter();
    const inputEmail = useSelector((state: RootState) => state.user.email);
    const inputPass = useSelector((state: RootState) => state.user.password);
    const [loading, setLoading] = useState<boolean>(false);
    const isDisabled = !inputEmail || !inputPass;

    const handlerLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: inputEmail,
                password: inputPass,
            });

            //agregar un spinner o pantalla de carga
            if (!res?.ok) {
                showError("Credenciales invalidas");
                return null;
            }

            return router.push(`/home`);
        } catch (error) {
            console.error("Error no capturado", error);
            // showError("Correo o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.containerLoginForm}>
            <form className={styles.loginCard} onSubmit={handlerLogin}>
                <div className={styles.voyagerBg}>
                    <Voyager width="100%" height="100%" />
                </div>
                <div className={styles.formContent}>
                    <h1>Iniciar sesión</h1>
                    <InputEmail />
                    <InputPassword />
                    <button
                        disabled={isDisabled || loading}
                        className={styles.buttonSubmit}
                        type="submit"
                    >
                        {loading ? <Spinner /> : "Iniciar sesión"}
                    </button>
                    <p className={styles.authSwitch}>
                        ¿No tenés cuenta?{" "}
                        <Link href="/register">Registrate</Link>
                    </p>
                    <p className={styles.appVersion}>v{appVersion}</p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
