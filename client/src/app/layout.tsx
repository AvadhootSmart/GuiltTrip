import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GuiltTrip",
    description:
        "Your Reality Check for the time you've wasted playing games and watching anime",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased bg-neutral-900`}>
                <main>{children}</main>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
