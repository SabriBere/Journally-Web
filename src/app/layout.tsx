import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import Providers from "./providers";
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
            <body className="font-body">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
