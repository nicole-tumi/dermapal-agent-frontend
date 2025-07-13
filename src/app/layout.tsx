// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import AuthProvider from "./AuthProvider";

export const metadata = {
    title: "DermaPal ✨",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es">
            <body className="flex h-screen bg-white text-[#46333F]">
                <AuthProvider>
                    <aside className="w-64 bg-[#B284BE] text-white p-4 text-xl font-semibold flex flex-col gap-4">
                        <div className="text-2xl">DermaPal 🧴✨</div>
                        <div className="bg-[#EDDBF2] text-[#46333F] text-sm p-4 rounded-[20px] leading-relaxed">
                            <p className="font-semibold">
                                ¿Qué es DermaPal? 🌸
                            </p>
                            <p className="font-light">
                                DermaPal es un asistente conversacional
                                especializado en cuidado facial que recomienda
                                productos de skincare y facilita la compra según
                                tipo de piel, necesidad y presupuesto.
                            </p>
                        </div>
                    </aside>
                    <main className="flex-1 overflow-auto bg-white p-6">
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
