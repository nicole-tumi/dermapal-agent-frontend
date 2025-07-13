// src/app/page.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, FormEvent, useRef, useEffect } from "react";
import { FormattedResponse } from "@/app/FormatedResponse";

type Mensaje = { de: "usuario" | "bot"; texto: string };

export default function Page() {
    const { data: session } = useSession();
    const [chat, setChat] = useState<Mensaje[]>([]);
    const [msg, setMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const chatRef = useRef<HTMLDivElement>(null);

    // Scroll automático cuando cambia el chat
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chat]);

    // Si no hay sesión, mostramos botón de login
    if (!session) {
        return (
            <div className="h-full flex items-center justify-center">
                <button
                    onClick={() => signIn("google")}
                    className="bg-[#B284BE] hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2"
                >
                    Login con Google
                </button>
            </div>
        );
    }

    // Función para enviar mensaje
    const enviar = async (e: FormEvent) => {
        e.preventDefault();
        if (!msg) return;
        setLoading(true);

        const userEmail = session.user?.email ?? "";
        const res = await fetch(
            `/api/agent?idagente=${encodeURIComponent(
                userEmail
            )}&msg=${encodeURIComponent(msg)}`
        );
        const texto = await res.text();

        // Actualizar historial
        setChat((c) => [
            ...c,
            { de: "usuario", texto: msg },
            { de: "bot", texto },
        ]);

        setMsg("");
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col p-4">
            <header className="mb-4 flex justify-between items-center">
                <div>
                    <span className="font-medium text-[#46333F]">
                        Bienvenid@, {session.user?.email} 👋✨
                    </span>
                </div>
                <button
                    onClick={() => signOut()}
                    className="border border-[#46333F] text-[#46333F] bg-white font-medium px-4 py-2 rounded hover:bg-[#46333F] hover:text-white transition-colors duration-200 text-sm"
                >
                    Cerrar sesión
                </button>
            </header>

            <div
                ref={chatRef}
                className="flex-1 overflow-y-auto space-y-3 pb-4"
            >
                {chat.map((m, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded max-w-[70%] ${
                            m.de === "usuario"
                                ? "ml-auto bg-[#FFDEAD] text-[#46333F]"
                                : "mr-auto bg-[#EDDBF2] text-left text-[#46333F]"
                        }`}
                    >
                        {m.de === "bot" ? (
                            <FormattedResponse text={m.texto} />
                        ) : (
                            m.texto
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={enviar} className="mt-2 flex gap-2">
                <input
                    className="flex-1 rounded border border-gray-300 bg-white text-[#46333F] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B284BE] focus:border-[#B284BE] transition"
                    placeholder="Escribe tu mensaje…"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    disabled={loading}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#B284BE] hover:opacity-90 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "…" : "Enviar"}
                </button>
            </form>
        </div>
    );
}
