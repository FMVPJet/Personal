function Ee() {
    let e = Promise.resolve(),
        t = !1;
    for (const n of document.getElementsByTagName("script")) n.dataset.astroExec === void 0 && n.getAttribute("type") === "module" && (t = n.getAttribute("src") === null);
    t && document.body.insertAdjacentHTML("beforeend", '<script type="module" src="data:application/javascript,"/>');
    for (const n of document.getElementsByTagName("script")) {
        if (n.dataset.astroExec === "") continue;
        const o = n.getAttribute("type");
        if (o && o !== "module" && o !== "text/javascript") continue;
        const r = document.createElement("script");
        r.innerHTML = n.innerHTML;
        for (const i of n.attributes) {
            if (i.name === "src") {
                const u = new Promise(a => {
                    r.onload = r.onerror = a
                });
                e = e.then(() => u)
            }
            r.setAttribute(i.name, i.value)
        }
        r.dataset.astroExec = "", n.replaceWith(r)
    }
    return e
}
const z = (e, t, n, o, r) => {
    const i = V(t, e),
        u = document.title;
    document.title = o;
    let a = !1;
    if (e.href !== location.href && !r)
        if (n.history === "replace") {
            const c = history.state;
            history.replaceState({
                ...n.state,
                index: c.index,
                scrollX: c.scrollX,
                scrollY: c.scrollY
            }, "", e.href)
        } else history.pushState({
            ...n.state,
            index: ++v,
            scrollX: 0,
            scrollY: 0
        }, "", e.href);
    if (document.title = u, S = e, i || (scrollTo({
            left: 0,
            top: 0,
            behavior: "instant"
        }), a = !0), r) scrollTo(r.scrollX, r.scrollY);
    else {
        if (e.hash) {
            history.scrollRestoration = "auto";
            const c = history.state;
            location.href = e.href, history.state || (history.replaceState(c, ""), i && window.dispatchEvent(new PopStateEvent("popstate")))
        } else a || scrollTo({
            left: 0,
            top: 0,
            behavior: "instant"
        });
        history.scrollRestoration = "manual"
    }
};

function Se(e) {
    const t = [];
    for (const n of e.querySelectorAll("head link[rel=stylesheet]"))
        if (!document.querySelector(`[${H}="${n.getAttribute(H)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)) {
            const o = document.createElement("link");
            o.setAttribute("rel", "preload"), o.setAttribute("as", "style"), o.setAttribute("href", n.getAttribute("href")), t.push(new Promise(r => {
                ["load", "error"].forEach(i => o.addEventListener(i, r)), document.head.append(o)
            }))
        } return t
}
