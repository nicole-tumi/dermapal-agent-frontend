import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"; // Ajusta según dónde tengas tu config
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const search = new URL(request.url).searchParams;
    const msg = search.get("msg") ?? "";

    // Obtiene la sesión del usuario autenticado
    const session = await getServerSession(authOptions);

    // Si está logueado, usa su correo como ID de agente
    const idagente =
        session?.user?.email?.replace(/[^a-zA-Z0-9]/g, "-") ?? "anon";

    const url = `https://dermapal-agent-167489907647.us-central1.run.app/agent?msg=${encodeURIComponent(
        msg
    )}&idagente=${idagente}`;

    const res = await fetch(url);
    const text = await res.text();

    return new Response(text, {
        status: res.status,
        headers: { "Content-Type": "text/plain" },
    });
}
