function Ps() {
    if (typeof matchMedia < "u" && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let a = !1;
    const t = [],
        e = document.getElementById("ball"),
        r = document.getElementById("ball-loader");
    if (!e || !r) return;
    T.set(e, {
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        opacity: 1,
        borderWidth: "2px",
        backgroundColor: "rgba(0, 0, 0, 0)"
    }), T.set(r, {
        scale: 1,
        borderWidth: "2px",
        top: 0,
        left: 0
    });
    const i = s => {
        Xr = s.pageX, Gr = s.pageY - window.scrollY
    };
    document.addEventListener("mousemove", i), t.push(() => document.removeEventListener("mousemove", i));
    const n = () => {
        a || (ve += (Xr - ve) * jr, we += (Gr - we) * jr, T.set(e, {
            x: ve,
            y: we
        }))
    };
    return T.ticker.add(n), t.push(() => T.ticker.remove(n)), document.querySelectorAll(".parallax-wrap").forEach(s => {
        const o = () => {
                T.to(s, {
                    duration: .3,
                    scale: 2,
                    overwrite: "auto"
                }), T.to(e, {
                    duration: .3,
                    scale: 2,
                    borderWidth: "1px",
                    opacity: .2,
                    overwrite: "auto"
                }), T.to(r, {
                    duration: .3,
                    scale: 2,
                    borderWidth: "1px",
                    top: 1,
                    left: 1,
                    overwrite: "auto"
                }), T.to(s.children, {
                    duration: .3,
                    scale: .5,
                    overwrite: "auto"
                }), a = !0
            },
            u = () => {
                T.to(s, {
                    duration: .3,
                    scale: 1,
                    overwrite: "auto"
                }), T.to(e, {
                    duration: .3,
                    scale: 1,
                    borderWidth: "2px",
                    opacity: 1,
                    overwrite: "auto"
                }), T.to(r, {
                    duration: .3,
                    scale: 1,
                    borderWidth: "2px",
                    top: 0,
                    left: 0,
                    overwrite: "auto"
                }), T.to(s.children, {
                    duration: .3,
                    scale: 1,
                    x: 0,
                    y: 0,
                    overwrite: "auto"
                }), a = !1
            },
            l = c => {
                const h = s.getBoundingClientRect(),
                    d = window.pageYOffset || document.documentElement.scrollTop,
                    _ = c.pageX - h.left,
                    m = c.pageY - h.top,
                    f = h.left + h.width / 2 + (_ - h.width / 2) / 2,
                    p = h.top + h.height / 2 + (m - h.height / 2 - d) / 2;
                ve = f, we = p, T.to(e, {
                    duration: .3,
                    x: f,
                    y: p,
                    overwrite: "auto"
                });
                const g = s.querySelector(".parallax-element");
                g && T.to(g, {
                    duration: .3,
                    x: (_ - h.width / 2) / h.width * 20,
                    y: (m - h.height / 2 - d) / h.height * 20,
                    ease: "power2.out",
                    overwrite: "auto"
                })
            };
        s.addEventListener("mouseenter", o), s.addEventListener("mouseleave", u), s.addEventListener("mousemove", l), t.push(() => {
            s.removeEventListener("mouseenter", o), s.removeEventListener("mouseleave", u), s.removeEventListener("mousemove", l)
        })
    }), document.querySelectorAll(".hide-ball").forEach(s => {
        const o = () => T.to(e, {
                duration: .2,
                borderWidth: "1px",
                scale: 2,
                opacity: 0,
                overwrite: "auto"
            }),
            u = () => T.to(e, {
                duration: .3,
                borderWidth: "2px",
                scale: 1,
                opacity: 1,
                overwrite: "auto"
            });
        s.addEventListener("mouseenter", o), s.addEventListener("mouseleave", u), t.push(() => {
            s.removeEventListener("mouseenter", o), s.removeEventListener("mouseleave", u)
        })
    }), document.querySelectorAll(".item-content").forEach(s => {
        const o = () => {
                T.to(e, {
                    duration: .2,
                    scale: 1.8,
                    borderWidth: "1px",
                    backgroundColor: "rgba(0, 0, 0, 1)",
                    overwrite: "auto"
                }), T.to(r, {
                    duration: .2,
                    borderWidth: "1px",
                    top: 1,
                    left: 1,
                    overwrite: "auto"
                })
            },
            u = () => {
                T.to(e, {
                    duration: .2,
                    scale: 1,
                    borderWidth: "2px",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    overwrite: "auto"
                }), T.to(r, {
                    duration: .2,
                    borderWidth: "2px",
                    top: 0,
                    left: 0,
                    overwrite: "auto"
                })
            };
        s.addEventListener("mouseenter", o), s.addEventListener("mouseleave", u), t.push(() => {
            s.removeEventListener("mouseenter", o), s.removeEventListener("mouseleave", u)
        })
    }), document.querySelectorAll(".link").forEach(s => {
        const o = () => T.to(e, {
                duration: .2,
                borderWidth: "0px",
                scale: 3,
                backgroundColor: "rgba(0, 0, 0, 1)",
                opacity: .05,
                overwrite: "auto"
            }),
            u = () => T.to(e, {
                duration: .3,
                borderWidth: "2px",
                scale: 1,
                backgroundColor: "rgba(0, 0, 0, 0)",
                opacity: 1,
                overwrite: "auto"
            });
        s.addEventListener("mouseenter", o), s.addEventListener("mouseleave", u), t.push(() => {
            s.removeEventListener("mouseenter", o), s.removeEventListener("mouseleave", u)
        })
    }), () => t.forEach(s => s())
}
const Os = [hs, cs, fs, ds, _s, gs, ys, bs, Ss, Es, ks, Ps];
typeof matchMedia < "u" && matchMedia("(prefers-reduced-motion: reduce)").matches && (T.defaults({
    duration: 0
}), T.globalTimeline.timeScale(100));
let ue = [],
    ir = 0;
const As = () => {
        const a = ++ir;
        for (const t of Os) try {
            const e = t();
            e instanceof Promise ? e.then(r => {
                if (typeof r == "function") {
                    if (a !== ir) {
                        try {
                            r()
                        } catch (i) {
                            console.error("[cleanup failed]", i)
                        }
                        return
                    }
                    ue.push(r)
                }
            }).catch(r => console.error("[init failed]", t.name, r)) : typeof e == "function" && ue.push(e)
        } catch (e) {
            console.error("[init failed]", t.name, e)
        }
    },
    Cs = () => {
        ir++;
        for (let a = ue.length - 1; a >= 0; a--) try {
            ue[a]()
        } catch (t) {
            console.error("[cleanup failed]", t)
        }
        ue = []
    };
document.addEventListener("astro:page-load", As);
document.addEventListener("astro:before-swap", Cs);