"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Brand from "@/styles/icons/Brand";
import ButtonLogOut from "../Buttons/ButtonLogOut";
import Tabs from "../Tabs/Tabs";
import HamburgerButton from "./HamburgerButton";
import styles from "./navbar.module.scss";
import User from "@/styles/icons/User";
import TooltipWrapper from "../Tooltip/Tooltip";

const Navbar = () => {
    const { data: session, status } = useSession();
    const pathSegment = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathSegment]);

    const isAuthPage = pathSegment === "/login" || pathSegment === "/register";
    const showAuthenticatedActions =
        status === "authenticated" && !isAuthPage;
    const showTabs = showAuthenticatedActions && pathSegment === `/home`;
    const userName = session?.user?.name || session?.user?.email;
    const userTooltip = userName ?? "";

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
                    {showAuthenticatedActions && (
                        <div className={styles.userActions}>
                            {userName && (
                                <TooltipWrapper content={userTooltip}>
                                    <div className={styles.userSummary}>
                                        <User
                                            width="36"
                                            height="36"
                                            color="#f4a534"
                                        />
                                        <span className={styles.userName}>
                                            {userName}
                                        </span>
                                    </div>
                                </TooltipWrapper>
                            )}
                            <ButtonLogOut />
                        </div>
                    )}
                </div>

                {showAuthenticatedActions && (
                    <HamburgerButton
                        className={styles.mobileMenuButton}
                        isOpen={isMenuOpen}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    />
                )}
            </div>

            {showAuthenticatedActions && isMenuOpen && (
                <div className={styles.mobileMenu}>
                    {userName && (
                        <div className={styles.mobileUserSummary}>
                            <User width="38" height="38" color="#f4a534" />
                            <span className={styles.mobileUserName}>
                                {userName}
                            </span>
                        </div>
                    )}
                    {showTabs && (
                        <Tabs stacked onSelect={() => setIsMenuOpen(false)} />
                    )}
                    <ButtonLogOut
                        stacked
                        className={styles.mobileLogout}
                        onSelect={() => setIsMenuOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default Navbar;
