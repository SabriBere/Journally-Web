"use client";
import React from "react";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.service";
import { converDate } from "@/utils/formatDate";
import { setNewText } from "@/store/editSlice";
import Error from "@/commons/EmptyStates/Error";
import SkeletonEditor from "@/commons/Skeletons/SkeletonEditor";
import styles from "./editor.module.scss";

const Editor = () => {
    const { id } = useParams();
    const convertId = Number(id);
    const dispatch = useDispatch();

    const editText = useSelector((state: RootState) => state.edit.editText);
    const newText = useSelector((state: RootState) => state.edit.newText);
    // const [editTitle, setEditTitle] = useState<boolean>(false);

    const handlerChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setNewText(e.target.value));
    };

    const {
        data: entry,
        isSuccess,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["onePost", convertId],
        queryFn: () => getPostById(convertId as number),
        enabled: !!convertId,
    });

    return (
        <>
            {isLoading && <SkeletonEditor />}
            {isError && (
                <div className={styles.containerError}>
                    <Error />
                </div>
            )}
            {isSuccess && (
                <div className={styles.containerPaper}>
                    <div className={styles.header}>
                        <h1>{entry?.title}</h1>
                        <p>{`${converDate(entry?.created_at)}`}</p>
                    </div>

                    {/* Ver la posibilidad de usar markdown */}
                    {editText === false ? (
                        <div className={styles.text}>
                            <p>{entry?.description}</p>
                        </div>
                    ) : (
                        <textarea
                            placeholder="Escribir..."
                            value={newText}
                            onChange={handlerChangeText}
                            cols={30}
                            rows={15}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Editor;
