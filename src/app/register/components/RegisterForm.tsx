"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { userRegister } from "@/app/api/actions";
import { showError, showSuccess } from "@/commons/Toast/toastHelpers";
import Voyager from "@/commons/Ilustrations/Voyager";
import Spinner from "@/commons/Spinner/Spinner";
import styles from "./registerForm.module.scss";

const RegisterForm = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                showSuccess("Cuenta creada. Ya podés iniciar sesión.");
                router.push("/login");
                return;
            }

            router.push("/home");
        } catch {
            showError("No se pudo crear la cuenta");
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
                    <h1>Crear cuenta</h1>
                    <label>
                        Nombre
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            autoFocus
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="usuario@email.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                    <label>
                        Contraseña
                        <input
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                    <button
                        disabled={isDisabled}
                        className={styles.buttonSubmit}
                        type="submit"
                    >
                        {loading ? <Spinner /> : "Registrarme"}
                    </button>
                    <p className={styles.authSwitch}>
                        ¿Ya tenés cuenta? <Link href="/login">Iniciá sesión</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
