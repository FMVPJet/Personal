async function Ae(e, t) {
    try {
        const n = new Headers(t?.headers);
        for (const [a, c] of Object.entries($)) n.set(a, c);
        const o = await fetch(e, {
                ...t,
                headers: n
            }),
            i = (o.headers.get("content-type") ?? "").split(";", 1)[0].trim();
        return i !== "text/html" && i !== "application/xhtml+xml" ? null : {
            html: await o.text(),
            redirected: o.redirected ? o.url : void 0,
            mediaType: i
        }
    } catch {
        return null
    }
}

function G() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}

