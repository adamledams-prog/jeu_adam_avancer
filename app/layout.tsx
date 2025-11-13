import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Zine Star - Le Jeu",
    description: "Jeu collaboratif Zine Star par Adam et Papa",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
