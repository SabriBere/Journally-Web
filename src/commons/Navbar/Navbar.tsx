"use client";
import { useEffect, useState } from "react";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathSegment]);

    const showTabs = status === "authenticated" && pathSegment === `/home`;

    return (
        <div className={styles.navbarShell}>
            <div className={styles.containerNavbar}>
                <Link className={styles.containerBrand} href={"/home"}>
                    <h3>Journally APP</h3>
                    <span>
                        __
                        <Brand color="#FFFFFF" width={"24"} height={"24"} />
                    </span>
                </Link>

                {showTabs && (
                    <div className={styles.desktopTabs}>
                        <Tabs />
                    </div>
                )}

                <div className={styles.desktopActions}>
                    {status === "authenticated" && <ButtonLogOut />}
                </div>

                {status === "authenticated" && (
                    <button
                        type="button"
                        className={styles.menuButton}
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                )}
            </div>

            {status === "authenticated" && isMenuOpen && (
                <div className={styles.mobileMenu}>
                    {showTabs && (
                        <Tabs stacked onSelect={() => setIsMenuOpen(false)} />
                    )}
                    <ButtonLogOut className={styles.mobileLogout} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
