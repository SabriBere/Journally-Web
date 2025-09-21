"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Brand from "@/styles/icons/Brand";
import ButtonLogOut from "../Buttons/ButtonLogOut";
import styles from "./navbar.module.scss";
import Tabs from "../Tabs/Tabs";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { data: session, status } = useSession();
    const pathSegment = usePathname();

    return (
        <div className={styles.containerNavbar}>
            <Link className={styles.containerBrand} href={"/home"}>
                <h3>Journally APP</h3>
                <span>
                    __
                    <Brand color="#FFFFFF" width={"24"} height={"24"} />
                </span>
            </Link>
            {status === "authenticated" && pathSegment === `/home` && <Tabs />}
            {status === "authenticated" && <ButtonLogOut />}
        </div>
    );
};

export default Navbar;
