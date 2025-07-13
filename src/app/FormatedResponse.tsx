export function FormattedResponse({ text }: { text: string }) {
    // Limpieza básica para evitar saltos en precios
    const cleaned = text
        .replace(/(\d)\n(\d)/g, "$1$2")
        .replace(/\n{2,}/g, "\n\n");

    // Separar por líneas
    const lines = cleaned.split("\n").filter((p) => p.trim() !== "");

    return (
        <div className="whitespace-pre-line">
            {lines.map((line, i) => {
                // Negrita para nombre de producto
                if (/^\d+\.\s/.test(line)) {
                    return (
                        <p key={i} className="mb-2 font-bold">
                            {line}
                        </p>
                    );
                }

                // Itálica para línea con "Paso"
                if (/Paso:/i.test(line)) {
                    return (
                        <p key={i} className="mb-1 italic">
                            {line}
                        </p>
                    );
                }

                // Resto normal
                return (
                    <p key={i} className="mb-1">
                        {line}
                    </p>
                );
            })}
        </div>
    );
}
