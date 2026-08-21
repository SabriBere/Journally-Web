"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

const SessionGuard = () => {
    const { data: session } = useSession();
    const signingOut = useRef(false);

    useEffect(() => {
        if (session?.error !== "RefreshAccessTokenError" || signingOut.current) {
            return;
        }

        signingOut.current = true;
        void signOut({ callbackUrl: "/login", redirect: true });
    }, [session?.error]);

    return null;
};

export default SessionGuard;
