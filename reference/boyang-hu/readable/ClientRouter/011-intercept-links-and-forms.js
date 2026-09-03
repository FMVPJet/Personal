function R(e, t) {
    e = e.replace(/#.*/, "");
    const n = t?.ignoreSlowConnection ?? !1;
    if (Oe(e, n))
        if (Q.add(e), document.createElement("link").relList?.supports?.("prefetch") && t?.with !== "fetch") {
            const o = document.createElement("link");
            o.rel = "prefetch", o.setAttribute("href", e), document.head.append(o)
        } else {
            const o = new Headers;
            for (const [r, i] of Object.entries($)) o.set(r, i);
            fetch(e, {
                priority: "low",
                headers: o
            })
        }
}

function Oe(e, t) {
    if (!navigator.onLine || !t && ee()) return !1;
    try {
        const n = new URL(e, location.href);
        return location.origin === n.origin && (location.pathname !== n.pathname || location.search !== n.search) && !Q.has(e)
    } catch {}
    return !1
}

function T(e, t) {
    if (e?.tagName !== "A") return !1;
    const n = e.dataset.astroPrefetch;
    return n === "false" ? !1 : t === "tap" && (n != null || P) && ee() ? !0 : n == null && P || n === "" ? t === Z : n === t
}

function ee() {
    if ("connection" in navigator) {
        const e = navigator.connection;
        return e.saveData || /2g/.test(e.effectiveType)
    }
    return !1
}

function N(e) {
    e();
    let t = !1;
    document.addEventListener("astro:page-load", () => {
        if (!t) {
            t = !0;
            return
        }
        e()
    })
}
let A = null;

function He() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}

function B(e) {
    return e.dataset.astroReload !== void 0
}
const Me = e => e.button && e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey;
(x || He() !== "none") && (document.addEventListener("click", e => {
    let t = e.target;
    if (A = Me(e) ? t : null, e.composed && (t = e.composedPath()[0]), t instanceof Element && (t = t.closest("a, area")), !(t instanceof HTMLAnchorElement) && !(t instanceof SVGAElement) && !(t instanceof HTMLAreaElement)) return;
    const n = t instanceof HTMLElement ? t.target : t.target.baseVal,
        o = t instanceof HTMLElement ? t.href : t.href.baseVal,
        r = new URL(o, location.href).origin;
    B(t) || t.hasAttribute("download") || !t.href || n && n !== "_self" || r !== location.origin || A || e.defaultPrevented || (e.preventDefault(), _(o, {
        history: t.dataset.astroHistory === "replace" ? "replace" : "auto",
        sourceElement: t
    }))
}), document.addEventListener("submit", e => {
    let t = e.target;
    const n = e.submitter,
        o = n && n === A;
    if (A = null, t.tagName !== "FORM" || e.defaultPrevented || B(t) || o) return;
    const r = t,
        i = new FormData(r, n),
        u = typeof r.action == "string" ? r.action : r.getAttribute("action"),
        a = typeof r.method == "string" ? r.method : r.getAttribute("method");
    let c = n?.getAttribute("formaction") ?? u ?? location.pathname;
    const d = n?.getAttribute("formmethod") ?? a ?? "get";
    if (d === "dialog" || location.origin !== new URL(c, location.href).origin) return;
    const l = {
        sourceElement: n ?? r
    };
    if (d === "get") {
        const s = new URLSearchParams(i),
            h = new URL(c);
        h.search = s.toString(), c = h.toString()
    } else l.formData = i;
    e.preventDefault(), _(c, l)
}), ke({
    prefetchAll: !0
}));