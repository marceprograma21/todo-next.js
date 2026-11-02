import "./globals.css";
import { Fredoka, Patrick_Hand } from "next/font/google";

const titleFont = Fredoka({
    subsets: ["latin"],
    variable: "--font-title",
});

const noteFont = Patrick_Hand({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-note",
});

export const metadata = {
    title: "To-Do List | Marcelo Melo",
    description: "Agrega tus tareas diarias y mantente organizado.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
    <html lang="es" className={`${titleFont.variable} ${noteFont.variable}`}>
    <body>{children}</body>
    </html>
    );
}