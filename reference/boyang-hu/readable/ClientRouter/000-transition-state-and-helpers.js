const $ = {},
    y = "data-astro-transition-persist",
    ne = ["data-astro-transition", "data-astro-transition-fallback"],
    O = new Set;

function q(e) {
    const t = e.src ? new URL(e.src, location.href).href : e.textContent;
    return O.has(t) ? !0 : (O.add(t), !1)
}

function oe(e) {
    for (const t of e.scripts) !t.hasAttribute("data-astro-rerun") && q(t) && (t.dataset.astroExec = "")
}

function re(e) {
    const t = document.documentElement,
        n = [...t.attributes].filter(({
            name: o
        }) => (t.removeAttribute(o), ne.includes(o)));
    [...e.documentElement.attributes, ...n].forEach(({
        name: o,
        value: r
    }) => t.setAttribute(o, r))
}

function ie(e) {
    for (const t of Array.from(document.head.children)) {
        const n = ce(t, e);
        n ? n.remove() : t.remove()
    }
    document.head.append(...e.head.children)
}

function se(e, t) {
    t.replaceWith(e);
    for (const n of t.querySelectorAll(`[${y}]`)) {
        const o = n.getAttribute(y),
            r = e.querySelector(`[${y}="${o}"]`);
        r && (r.replaceWith(n), r.localName === "astro-island" && le(n) && !ue(n, r) && (n.setAttribute("ssr", ""), n.setAttribute("props", r.getAttribute("props"))))
    }
    U(e)
}

