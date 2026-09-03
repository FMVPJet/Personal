async function J(e, t, n, o, r) {
    const i = Re();
    if (!I() || location.origin !== n.origin) {
        i === m && (m = void 0), location.href = n.href;
        return
    }
    const u = r ? "traverse" : o.history === "replace" ? "replace" : "push";
    if (u !== "traverse" && D({
            scrollX,
            scrollY
        }), V(t, n) && !o.formData && (e !== "back" && n.hash || e === "back" && t.hash)) {
        z(n, t, o, document.title, r), i === m && (m = void 0);
        return
    }
    const a = await be(t, n, e, u, o.sourceElement, o.info, i.controller.signal, o.formData, c);
    if (a.defaultPrevented || a.signal.aborted) {
        i === m && (m = void 0), a.signal.aborted || (location.href = n.href);
        return
    }
    async function c(s) {
        const h = s.to.href,
            b = {
                signal: s.signal
            };
        if (s.formData) {
            b.method = "POST";
            const p = s.sourceElement instanceof HTMLFormElement ? s.sourceElement : s.sourceElement instanceof HTMLElement && "form" in s.sourceElement ? s.sourceElement.form : s.sourceElement?.closest("form");
            b.body = t !== void 0 && Reflect.get(HTMLFormElement.prototype, "attributes", p).getNamedItem("enctype")?.value === "application/x-www-form-urlencoded" ? new URLSearchParams(s.formData) : s.formData
        }
        const f = await Ae(h, b);
        if (f === null) {
            s.preventDefault();
            return
        }
        if (f.redirected) {
            const p = new URL(f.redirected);
            if (p.origin !== s.to.origin) {
                s.preventDefault();
                return
            }
            const te = s.to.hash;
            s.to = p, s.to.hash = te
        }
        if (F ??= new DOMParser, s.newDocument = F.parseFromString(f.html, f.mediaType), s.newDocument.querySelectorAll("noscript").forEach(p => p.remove()), !s.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !s.formData) {
            s.preventDefault();
            return
        }
        const w = Se(s.newDocument);
        w.length && !s.signal.aborted && await Promise.all(w)
    }
    async function d() {
        if (g && g.viewTransition) {
            try {
                g.viewTransition.skipTransition()
            } catch {}
            try {
                await g.viewTransition.updateCallbackDone
            } catch {}
        }
        return g = {
            transitionSkipped: !1
        }
    }
    const l = await d();
    if (a.signal.aborted) {
        i === m && (m = void 0);
        return
    }
    if (document.documentElement.setAttribute(M, a.direction), x) l.viewTransition = document.startViewTransition(async () => await C(a, o, l, r));
    else {
        const s = (async () => {
            await Promise.resolve(), await C(a, o, l, r, G())
        })();
        l.viewTransition = {
            updateCallbackDone: s,
            ready: s,
            finished: new Promise(h => l.viewTransitionFinished = h),
            skipTransition: () => {
                l.transitionSkipped = !0, document.documentElement.removeAttribute(k)
            },
            types: new Set
        }
    }
    l.viewTransition?.updateCallbackDone.finally(async () => {
        await Ee(), K(), Te()
    }), l.viewTransition?.finished.finally(() => {
        l.viewTransition = void 0, l === g && (g = void 0), i === m && (m = void 0), document.documentElement.removeAttribute(M), document.documentElement.removeAttribute(k)
    });
    try {
        await l.viewTransition?.updateCallbackDone
    } catch (s) {
        const h = s;
        console.log("[astro]", h.name, h.message, h.stack)
    }
}
async function _(e, t) {
    await J("forward", S, new URL(e, location.href), t ?? {})
}

function Le(e) {
    if (!I() && e.state) {
        location.reload();
        return
    }
    if (e.state === null) return;
    const t = history.state,
        n = t.index,
        o = n > v ? "forward" : "back";
    v = n, J(o, S, new URL(location.href), {}, t)
}
const X = () => {
    history.state && (scrollX !== history.state.scrollX || scrollY !== history.state.scrollY) && D({
        scrollX,
        scrollY
    })
};
{
    if (x || G() !== "none")
        if (S = new URL(location.href), addEventListener("popstate", Le), addEventListener("load", K), "onscrollend" in window) addEventListener("scrollend", X);
        else {
            let e, t, n, o;
            const r = () => {
                if (o !== history.state?.index) {
                    clearInterval(e), e = void 0;
                    return
                }
                if (t === scrollY && n === scrollX) {
                    clearInterval(e), e = void 0, X();
                    return
                } else t = scrollY, n = scrollX
            };
            addEventListener("scroll", () => {
                e === void 0 && (o = history.state?.index, t = scrollY, n = scrollX, e = window.setInterval(r, 50))
            }, {
                passive: !0
            })
        } for (const e of document.getElementsByTagName("script")) q(e), e.dataset.astroExec = ""
}
const Q = new Set,
    E = new WeakSet;
let P, Z, Y = !1;

function ke(e) {
    Y || (Y = !0, P ??= e?.prefetchAll, Z ??= e?.defaultStrategy ?? "hover", Pe(), De(), xe(), Ne())
}

function Pe() {
    for (const e of ["touchstart", "mousedown"]) document.addEventListener(e, t => {
        T(t.target, "tap") && R(t.target.href, {
            ignoreSlowConnection: !0
        })
    }, {
        passive: !0
    })
}

