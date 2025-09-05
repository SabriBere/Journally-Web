"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Brand from "@/styles/icons/Brand";
import ButtonLogOut from "../Buttons/ButtonLogOut";
import styles from "./navbar.module.scss";
import Tabs from "../Tabs/Tabs";

const Navbar = () => {
    const { data: session, status } = useSession();

    return (
        <div className={styles.containerNavbar}>
            <Link className={styles.containerBrand} href={"/home"}>
                <h3>Journally APP</h3>
                <span>
                    __
                    <Brand color="#FFFFFF" width={"24"} height={"24"} />
                </span>
            </Link>
            <Tabs />
            {/* Renderizar solo si hay sesión */}
            {status === "authenticated" && <ButtonLogOut />}
        </div>
    );
};

export default Navbar;
