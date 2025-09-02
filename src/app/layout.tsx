import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import Providers from "./providers";
import Navbar from "@/commons/Navbar/Navbar";
import Footer from "@/commons/Footer/Footer";
import styles from "./layout.module.scss";
import "./globals.scss";

const caveat = Caveat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-caveat",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Journally App",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    return (
        <html lang="en" className={`${caveat.variable} ${inter.variable}`}>
            <body className={styles.layout}>
                <Providers session={session}>
                    <header>
                        <Navbar />
                    </header>
                    {/* generar sidebar flotante */}
                    <main className={styles.mainContent}>{children}</main>
                    <footer>
                        <Footer />
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
