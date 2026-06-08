"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { userRegister } from "@/app/api/actions";
import { showError, showSuccess } from "@/commons/Toast/toastHelpers";
import { cleanAuthInputs } from "@/store/userSlice";
import Voyager from "@/commons/Ilustrations/Voyager";
import Spinner from "@/commons/Spinner/Spinner";
import styles from "./registerForm.module.scss";
import InputEmail from "@/commons/Inputs/InputEmail";
import InputPassword from "@/commons/Inputs/InputPassword";



const RegisterForm = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const email = useSelector((state: RootState) => state.user.email);
    const password = useSelector((state: RootState) => state.user.password);
    const [loading, setLoading] = useState(false);
    const isDisabled = !email || password.length < 8 || loading;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            await userRegister({
                email,
                password,
                userName: userName.trim() || undefined,
            });

            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (!res?.ok) {
                showSuccess(t("auth.toast.accountCreated"));
                dispatch(cleanAuthInputs());
                router.push("/login");
                return;
            }

            router.push("/home");
        } catch {
            showError(t("auth.toast.createAccountError"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.containerRegisterForm}>
            <form className={styles.registerCard} onSubmit={handleSubmit}>
                <div className={styles.voyagerBg}>
                    <Voyager width="100%" height="100%" />
                </div>
                <div className={styles.formContent}>
                    <h1>{t("auth.register.title")}</h1>
                    <label>
                        {t("auth.fields.name")}
                        <input
                            className={styles.inputName}
                            type="text"
                            placeholder={t("auth.placeholders.alias")}
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            autoFocus
                        />
                    </label>
                    <InputEmail />
                    <InputPassword />
                    {/* <label>
                        Email
                        <input
                            type="email"
                            placeholder="usuario@email.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label> */}
                    {/* <label>
                        Contraseña
                        <input
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label> */}
                    <button
                        disabled={isDisabled}
                        className={styles.buttonSubmit}
                        type="submit"
                    >
                        {loading ? <Spinner /> : t("auth.register.submit")}
                    </button>
                    <p className={styles.authSwitch}>
                        {t("auth.register.hasAccount")}{" "}
                        <Link href="/login">{t("auth.register.loginLink")}</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
