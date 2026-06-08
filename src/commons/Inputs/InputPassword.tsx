"use client";
import { useState } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setInputPass } from "@/store/userSlice";
import Eye from "@/styles/icons/Eye";
import EyeClose from "@/styles/icons/EyeClose";
import styles from "./inputPassword.module.scss";
import TooltipWrapper from "../Tooltip/Tooltip";
import { useTranslation } from "react-i18next";

const InputPassword = () => {
    const { t } = useTranslation();
    //Mover al hook de password
    const dispatch = useDispatch();
    const inputPassword = useSelector(
        (state: RootState) => state.user.password
    );
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setInputPass(value));
        // setIsValidPass(passRegex.test(value));
    };

    return (
        <div className={styles.containerInputPassword}>
            <label>{t("auth.fields.password")}</label>
            <span className={styles.inputPass}>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.placeholders.password")}
                    onChange={handleChangePass}
                    value={inputPassword}
                />
                <TooltipWrapper
                    content={
                        showPassword
                            ? t("auth.password.hide")
                            : t("auth.password.show")
                    }
                >
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? (
                            <Eye width="24" height="24" color="#4a4a4a" />
                        ) : (
                            <EyeClose width="24" height="24" color="#4a4a4a" />
                        )}
                    </button>
                </TooltipWrapper>
            </span>
        </div>
    );
};

export default InputPassword;
