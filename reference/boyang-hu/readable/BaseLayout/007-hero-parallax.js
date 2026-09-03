function ds() {
    const a = document.getElementById("hero");
    if (!a || !a.classList.contains("has-image")) return;
    const t = document.getElementById("hero-styles"),
        e = document.getElementById("hero-caption"),
        r = document.getElementById("hero-image-parallax"),
        i = document.getElementById("hero-bg-image"),
        n = document.getElementById("hero-bg-wrapper"),
        s = [],
        o = typeof matchMedia < "u" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (t && !o) {
        const u = () => {
            const l = window.scrollY || document.documentElement.scrollTop;
            t.classList.contains("parallax-onscroll") && (e && T.to(e, {
                duration: .1,
                y: l / 4
            }), r && T.to(r, {
                duration: .1,
                y: l / 5
            })), t.classList.contains("opacity-onscroll") && e && (e.style.opacity = String(1 - l / 15 / 40))
        };
        window.addEventListener("scroll", u, {
            passive: !0
        }), s.push(() => window.removeEventListener("scroll", u))
    }
    if (n && i && !o) {
        const u = () => {
            T.set(n, {
                perspective: document.body.clientWidth
            })
        };
        u(), window.addEventListener("resize", u), s.push(() => window.removeEventListener("resize", u));
        const l = c => {
            const h = n.getBoundingClientRect(),
                d = n.clientWidth,
                _ = n.clientHeight,
                m = c.pageX - (h.left + window.scrollX),
                f = c.pageY - (h.top + window.scrollY);
            T.to(i, {
                duration: 1,
                x: (m - d / 2) / d * -30,
                y: (f - _ / 2) / _ * -30
            })
        };
        a.addEventListener("mousemove", l), s.push(() => a.removeEventListener("mousemove", l))
    }
    return () => s.forEach(u => u())
}

