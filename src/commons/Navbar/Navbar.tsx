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
    const { status } = useSession();
    const pathSegment = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathSegment]);

    const isAuthPage = pathSegment === "/login" || pathSegment === "/register";
    const showAuthenticatedActions =
        status === "authenticated" && !isAuthPage;
    const showTabs = showAuthenticatedActions && pathSegment === `/home`;

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
                    {showAuthenticatedActions && <ButtonLogOut />}
                </div>

                {showAuthenticatedActions && (
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

            {showAuthenticatedActions && isMenuOpen && (
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
