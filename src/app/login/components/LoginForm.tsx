"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import InputEmail from "@/commons/Inputs/InputEmail";
import InputPassword from "@/commons/Inputs/InputPassword";
import Voyager from "@/commons/Ilustrations/Voyager";
import styles from "./loginForm.module.scss";

const LoginForm = () => {
    const inputEmail = useSelector((state: RootState) => state.user.email);
    const inputPass = useSelector((state: RootState) => state.user.password);
    const isDisabled = !inputEmail || !inputPass;

    const handlerSubmit = async () => {};

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
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
