"use client";
import React, { ChangeEvent, useState } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalCollection } from "@/store/homeSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { showError, showSuccess } from "../Toast/toastHelpers";
import { createCollection } from "@/services/collection.service";
import SpinnerDots from "../Spinner/SipnnerDots";
import Close from "@/styles/icons/Close";
import styles from "./modalCreate.module.scss";

const ModalCreateCollection = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const QueryClient = useQueryClient();
    const [nameCollection, setNameCollection] = useState<string>("");
    const isDisabled = !nameCollection.trim();
    const openModalCollection = useSelector(
        (state: RootState) => state.home.openModalCollection
    );

    const { mutateAsync: createCollectionMutation, isPending } = useMutation({
        mutationFn: (body: { collectionName: string; title: string }) =>
            createCollection(body),
        mutationKey: ["createCollection"],
        onSuccess: async () => {
            showSuccess(t("home.toast.created"));
            setNameCollection("");
            dispatch(setOpenModalCollection(false));
            await QueryClient.refetchQueries({
                queryKey: ["getAllCollections"],
            });
        },
        onError: (error: any) => {
            showError(t("home.toast.createCollectionError"));
            dispatch(setOpenModalCollection(false));
        },
    });

    const handlerCreate = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const body = {
                collectionName: nameCollection.trim(),
                title: nameCollection,
            };
            await createCollectionMutation(body);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {openModalCollection && (
                <div className={styles.overlay}>
                    <form
                        className={styles.containerModalCreate}
                        onSubmit={handlerCreate}
                    >
                        <div className={styles.containerTop}>
                            <h2>{t("home.modals.createCollection.title")}</h2>
                            <button
                                type="button"
                                onClick={() =>
                                    dispatch(setOpenModalCollection(false))
                                }
                            >
                                <Close width="24" height="24" color="white" />
                            </button>
                        </div>
                        <div className={styles.containerInput}>
                            <label>{t("home.modals.fields.name")}</label>
                            <input
                                type="text"
                                title={t("home.modals.actions.create")}
                                placeholder={t("home.modals.placeholders.name")}
                                className={styles.inputs}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNameCollection(e.target.value)
                                }
                                value={nameCollection}
                            />
                        </div>
                        <div className={styles.containerButtons}>
                            <button
                                type="button"
                                title={t("home.modals.actions.cancel")}
                                onClick={() =>
                                    dispatch(setOpenModalCollection(false))
                                }
                            >
                                {t("home.modals.actions.cancel")}
                            </button>
                            <button
                                type="submit"
                                className={styles.btnCreate}
                                disabled={isPending || isDisabled}
                            >
                                {!isPending ? t("home.modals.actions.createCollection") : (<SpinnerDots color="#FFFFFF" size={6} />)}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ModalCreateCollection;
