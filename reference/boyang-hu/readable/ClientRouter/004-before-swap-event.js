class ye extends W {
    direction;
    viewTransition;
    swap;
    constructor(t, n) {
        super(he, void 0, t.from, t.to, t.direction, t.navigationType, t.sourceElement, t.info, t.newDocument, t.signal), this.direction = t.direction, this.viewTransition = n, this.swap = () => de(this.newDocument), Object.defineProperties(this, {
            direction: {
                enumerable: !0
            },
            viewTransition: {
                enumerable: !0
            },
            swap: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
async function be(e, t, n, o, r, i, u, a, c) {
    const d = new ge(e, t, n, o, r, i, window.document, u, a, c);
    return document.dispatchEvent(d) && (await d.loader(), d.defaultPrevented || (pe(me), d.navigationType !== "traverse" && D({
        scrollX,
        scrollY
    }))), d
}
async function ve(e, t, n) {
    const o = new ye(e, t);
    return document.dispatchEvent(o), n && await n(), o.swap(), o
}
const D = e => {
        history.state && (history.scrollRestoration = "manual", history.replaceState({
            ...history.state,
            ...e
        }, ""))
    },
    x = !!document.startViewTransition,
    I = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
    V = (e, t) => e.pathname === t.pathname && e.search === t.search;
let m, g, S;
const j = e => document.dispatchEvent(new Event(e)),
    K = () => j("astro:page-load"),
    Te = () => {
        let e = document.createElement("div");
        e.setAttribute("aria-live", "assertive"), e.setAttribute("aria-atomic", "true"), e.className = "astro-route-announcer", document.body.append(e), setTimeout(() => {
            let t = document.title || document.querySelector("h1")?.textContent || location.pathname;
            e.textContent = t
        }, 60)
    },
    H = "data-astro-transition-persist",
    M = "data-astro-transition",
    k = "data-astro-transition-fallback";
let F, v = 0;
history.state ? (v = history.state.index, scrollTo({
    left: history.state.scrollX,
    top: history.state.scrollY
})) : I() && (history.replaceState({
    index: v,
    scrollX,
    scrollY
}, ""), history.scrollRestoration = "manual");
