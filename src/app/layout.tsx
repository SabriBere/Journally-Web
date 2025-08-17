import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${caveat.variable} ${inter.variable}`}>
            <body className={styles.layout}>
                <header>
                    <Navbar />
                </header>
                {/* generar sidebar flotante */}
                <main className={styles.mainContent}>
                    <Providers>{children}</Providers>
                </main>
                <footer>
                    <Footer />
                </footer>
            </body>
        </html>
    );
}
