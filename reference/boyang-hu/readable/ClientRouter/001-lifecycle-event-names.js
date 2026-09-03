function U(e) {
    e.querySelectorAll("template[shadowrootmode]").forEach(t => {
        const n = t.getAttribute("shadowrootmode"),
            o = t.parentNode;
        if ((n === "closed" || n === "open") && o instanceof HTMLElement) {
            if (o.shadowRoot) {
                t.remove();
                return
            }
            const r = o.attachShadow({
                mode: n
            });
            r.appendChild(t.content), t.remove(), U(r)
        }
    })
}
const ae = () => {
        const e = document.activeElement;
        if (e?.closest(`[${y}]`)) {
            if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) {
                const t = e.selectionStart,
                    n = e.selectionEnd;
                return () => L({
                    activeElement: e,
                    start: t,
                    end: n
                })
            }
            return () => L({
                activeElement: e
            })
        } else return () => L({
            activeElement: null
        })
    },
    L = ({
        activeElement: e,
        start: t,
        end: n
    }) => {
        e && (e.focus(), (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) && (typeof t == "number" && (e.selectionStart = t), typeof n == "number" && (e.selectionEnd = n)))
    },
    ce = (e, t) => {
        const n = e.getAttribute(y),
            o = n && t.head.querySelector(`[${y}="${n}"]`);
        if (o) return o;
        if (e.matches("link[rel=stylesheet]")) {
            const r = e.getAttribute("href");
            return t.head.querySelector(`link[rel=stylesheet][href="${r}"]`)
        }
        return null
    },
    le = e => {
        const t = e.dataset.astroTransitionPersistProps;
        return t == null || t === "false"
    },
    ue = (e, t) => e.getAttribute("props") === t.getAttribute("props"),
    de = e => {
        oe(e), re(e), ie(e);
        const t = ae();
        se(e.body, document.body), t()
    },
    fe = "astro:before-preparation",
    me = "astro:after-preparation",
    he = "astro:before-swap",
    we = "astro:after-swap",
    pe = e => document.dispatchEvent(new Event(e));
