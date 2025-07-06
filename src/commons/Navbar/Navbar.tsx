"use client";
import Link from "next/link";
import styles from "./navbar.module.scss";
import Brand from "@/styles/icons/Brand";

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
        </div>
    );
};

export default Navbar;
