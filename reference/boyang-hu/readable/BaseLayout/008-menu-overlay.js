function _s() {
    window.scrollTo(0, 0);
    const a = document.getElementById("burger-wrapper"),
        t = document.getElementById("close-menu"),
        e = document.getElementById("close-sidebar"),
        r = Array.from(document.querySelectorAll(".open-filters")),
        i = document.getElementById("page-content"),
        n = document.getElementById("menu-overlay"),
        s = document.getElementById("sidebar-overlay");
    let o = null,
        u = null;
    n?.toggleAttribute("inert", !0), s?.toggleAttribute("inert", !0);
    const l = f => {
            i?.toggleAttribute("inert", f)
        },
        c = f => {
            f && f.currentTarget === a && (o = a);
            const p = document.querySelector("header"),
                g = document.getElementById("menu-burger");
            p?.classList.toggle("open"), g?.classList.toggle("open"), n?.classList.toggle("active");
            const y = g?.classList.contains("open") ?? !1;
            a?.setAttribute("aria-expanded", String(y)), a?.setAttribute("aria-label", y ? "Close menu" : "Open menu"), n?.toggleAttribute("inert", !y), l(y), y ? window.setTimeout(() => {
                n?.querySelector(".main-menu a, nav a")?.focus()
            }, 250) : o && window.setTimeout(() => o?.focus(), 250), window.setTimeout(() => {
                if (y) {
                    const w = document.querySelectorAll("#portfolio .item-wrap"),
                        b = document.querySelectorAll(".hero-title"),
                        v = document.querySelectorAll(".hero-subtitle"),
                        k = document.getElementById("hero-bg-wrapper"),
                        S = T.timeline();
                    document.querySelectorAll("#portfolio .item .item-wrap").forEach((x, P) => {
                        S.to(x, {
                            duration: .2,
                            y: -150,
                            opacity: 0,
                            ease: "power1.in"
                        }, P * .05)
                    }), w.length && T.set(w, {
                        y: -200,
                        opacity: 0,
                        delay: .4
                    }), b.length && T.to(b, {
                        duration: .3,
                        y: -100,
                        opacity: 0,
                        delay: .1,
                        ease: "power2.in"
                    }), v.length && T.to(v, {
                        duration: .3,
                        y: -100,
                        opacity: 0,
                        delay: .15,
                        ease: "power2.in"
                    }), (b.length || v.length) && T.set([...b, ...v], {
                        y: 100,
                        opacity: 0,
                        delay: .5
                    }), k && T.to(k, {
                        duration: .3,
                        opacity: 0,
                        delay: .15,
                        ease: "power2.in"
                    }), T.to("footer, #page-bottom, #project-nav, .row", {
                        duration: .3,
                        y: -50,
                        opacity: 0,
                        delay: .1,
                        ease: "power2.in"
                    }), T.set("footer, #page-bottom, #project-nav, .row", {
                        y: 50,
                        opacity: 0,
                        delay: .4
                    });
                    const E = T.timeline();
                    E.set(".menu-timeline", {
                        y: 100,
                        opacity: 0
                    }), document.querySelectorAll(".menu-timeline").forEach((x, P) => {
                        E.to(x, {
                            duration: .5,
                            y: 0,
                            opacity: 1,
                            delay: .5,
                            ease: "power3.out"
                        }, P * .1)
                    })
                } else {
                    const w = document.querySelectorAll("#portfolio .item-wrap"),
                        b = document.querySelectorAll(".hero-title"),
                        v = document.querySelectorAll(".hero-subtitle"),
                        k = document.getElementById("hero-bg-wrapper"),
                        S = T.timeline();
                    document.querySelectorAll(".menu-timeline").forEach((x, P) => {
                        S.to(x, {
                            duration: .25,
                            y: -100,
                            opacity: 0,
                            ease: "power1.out"
                        }, P * .05)
                    }), b.length && T.to(b, {
                        duration: .3,
                        y: 0,
                        opacity: 1,
                        delay: .5,
                        ease: "power2.out"
                    }), v.length && T.to(v, {
                        duration: .3,
                        y: 0,
                        opacity: 1,
                        delay: .55,
                        ease: "power2.out"
                    }), k && T.to(k, {
                        duration: .6,
                        opacity: 1,
                        delay: .35,
                        ease: "power2.out"
                    });
                    const E = T.timeline();
                    w.length && E.set(w, {
                        y: 200,
                        opacity: 0
                    }), document.querySelectorAll("#portfolio .item .item-wrap").forEach((x, P) => {
                        E.to(x, {
                            duration: .5,
                            y: 0,
                            opacity: 1,
                            delay: .5,
                            ease: "power3.out"
                        }, P * .05)
                    }), w.length && T.to(w, {
                        duration: .3,
                        y: 0,
                        opacity: 1,
                        delay: .8,
                        ease: "power3.out"
                    }), T.to("footer, #page-bottom, #project-nav, .row", {
                        duration: .3,
                        y: 0,
                        opacity: 1,
                        delay: .75,
                        ease: "power2.out"
                    })
                }
            }, 20)
        },
        h = f => {
            f && r.includes(f.currentTarget) && (u = f.currentTarget), s?.classList.toggle("active");
            const p = s?.classList.contains("active") ?? !1;
            r.forEach(g => {
                g.setAttribute("aria-expanded", String(p)), g.setAttribute("aria-label", p ? "Close categories" : "Open categories")
            }), s?.toggleAttribute("inert", !p), l(p), p ? window.setTimeout(() => {
                s?.querySelector("#filters a, #filters button")?.focus()
            }, 250) : u && window.setTimeout(() => u?.focus(), 250), window.setTimeout(() => {
                if (p) {
                    const g = document.querySelector("#main.project");
                    T.to(".item-content", {
                        duration: .6,
                        scale: .8,
                        opacity: .2,
                        ease: "power2.inOut"
                    }), g && T.to(g, {
                        duration: .6,
                        scale: .95,
                        opacity: .2,
                        ease: "power2.inOut"
                    });
                    const y = T.timeline();
                    y.set(".sidebar-timeline", {
                        y: 60,
                        opacity: 0
                    }), document.querySelectorAll(".sidebar-timeline").forEach((w, b) => {
                        y.to(w, {
                            duration: .5,
                            y: 0,
                            opacity: 1,
                            delay: .3,
                            ease: "power3.out"
                        }, b * .1)
                    })
                } else {
                    const g = document.querySelector("#main.project");
                    T.to(".item-content", {
                        duration: .6,
                        scale: 1,
                        opacity: 1,
                        delay: .1,
                        ease: "power2.inOut"
                    }), g && T.to(g, {
                        duration: .6,
                        scale: 1,
                        opacity: 1,
                        delay: .1,
                        ease: "power2.inOut"
                    });
                    const y = T.timeline();
                    document.querySelectorAll(".sidebar-timeline").forEach((w, b) => {
                        y.to(w, {
                            duration: .25,
                            y: -60,
                            opacity: 0,
                            ease: "power1.out"
                        }, b * .05)
                    })
                }
            }, 20)
        },
        d = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
        _ = () => n?.classList.contains("active") ? n : s?.classList.contains("active") ? s : null,
        m = f => {
            const p = _();
            if (!p) return;
            if (f.key === "Escape") {
                p === n ? c() : p === s && h();
                return
            }
            if (f.key !== "Tab") return;
            const g = Array.from(p.querySelectorAll(d)).filter(v => v.tabIndex !== -1 && v.offsetParent !== null);
            if (g.length === 0) {
                f.preventDefault();
                return
            }
            const y = g[0],
                w = g[g.length - 1],
                b = document.activeElement;
            f.shiftKey && (b === y || !p.contains(b)) ? (f.preventDefault(), w.focus()) : !f.shiftKey && (b === w || !p.contains(b)) && (f.preventDefault(), y.focus())
        };
    return a?.addEventListener("click", c), t?.addEventListener("click", c), r.forEach(f => f.addEventListener("click", h)), e?.addEventListener("click", h), document.addEventListener("keydown", m), () => {
        a?.removeEventListener("click", c), t?.removeEventListener("click", c), r.forEach(f => f.removeEventListener("click", h)), e?.removeEventListener("click", h), document.removeEventListener("keydown", m)
    }
}
const ps = "modulepreload",
    ms = function(a) {
        return "/" + a
    },
    Vr = {},
    Ye = function(t, e, r) {
        let i = Promise.resolve();
        if (e && e.length > 0) {
            let s = function(l) {
                return Promise.all(l.map(c => Promise.resolve(c).then(h => ({
                    status: "fulfilled",
                    value: h
                }), h => ({
                    status: "rejected",
                    reason: h
                }))))
            };
            document.getElementsByTagName("link");
            const o = document.querySelector("meta[property=csp-nonce]"),
                u = o?.nonce || o?.getAttribute("nonce");
            i = s(e.map(l => {
                if (l = ms(l), l in Vr) return;
                Vr[l] = !0;
                const c = l.endsWith(".css"),
                    h = c ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${l}"]${h}`)) return;
                const d = document.createElement("link");
                if (d.rel = c ? "stylesheet" : ps, c || (d.as = "script"), d.crossOrigin = "", d.href = l, u && d.setAttribute("nonce", u), document.head.appendChild(d), c) return new Promise((_, m) => {
                    d.addEventListener("load", _), d.addEventListener("error", () => m(new Error(`Unable to preload CSS for ${l}`)))
                })
            }))
        }

        function n(s) {
            const o = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (o.payload = s, window.dispatchEvent(o), !o.defaultPrevented) throw s
        }
        return i.then(s => {
            for (const o of s || []) o.status === "rejected" && n(o.reason);
            return t().catch(n)
        })
    };
