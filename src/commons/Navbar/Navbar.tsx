"use client";
import Link from "next/link";
import Brand from "@/styles/icons/Brand";
import ButtonLogOut from "../Buttons/ButtonLogOut";
import styles from "./navbar.module.scss";

const Navbar = () => {
    return (
        <div className={styles.containerNavbar}>
            <Link className={styles.containerBrand} href={"/home"}>
                <h3>Journally APP</h3>
                <span>
                    __
                    <Brand color="#FFFFFF" width={"24"} height={"24"} />
                </span>
            </Link>
            <ButtonLogOut />
        </div>
    );
};

export default Navbar;
