function Ss() {
    const a = document.getElementById("portfolio");
    if (!a || !a.classList.contains("title-big")) return;
    let t = document.querySelector(".big-title-caption");
    if (!t) {
        t = document.createElement("div"), t.className = "big-title-caption";
        const u = document.createElement("div");
        u.className = "outer";
        const l = document.createElement("div");
        l.className = "inner", u.appendChild(l), t.appendChild(u), document.body.appendChild(t)
    }
    const e = t.querySelector(".outer .inner");
    if (!e) return;
    e.innerHTML = "", a.querySelectorAll(".item-title-hover").forEach(u => u.remove()), a.querySelectorAll(".item .item-caption").forEach(u => {
        e.appendChild(u)
    });
    const r = Array.from(a.querySelectorAll(":scope > .item")),
        i = Array.from(e.querySelectorAll(".item-caption")),
        n = i.map(u => u.querySelector(".item-title")).filter(Boolean),
        s = i.map(u => u.querySelector(".item-cat")).filter(Boolean),
        o = [];
    return r.forEach((u, l) => {
        const c = i[l];
        if (!c) return;
        const h = c.querySelector(".item-title"),
            d = c.querySelector(".item-cat"),
            _ = u.querySelector("a");
        if (!_ || !h || !d) return;
        const m = () => {
                T.killTweensOf([...n, ...s]), T.set(n, {
                    y: 50,
                    opacity: 0
                }), T.set(s, {
                    y: 30,
                    opacity: 0
                }), T.to(h, {
                    duration: .2,
                    opacity: 1,
                    y: 0,
                    delay: .15,
                    ease: "power2.out"
                }), T.to(d, {
                    duration: .2,
                    opacity: 1,
                    y: 0,
                    delay: .25,
                    ease: "power2.out"
                })
            },
            f = () => {
                T.killTweensOf([h, d]), T.to(h, {
                    duration: .2,
                    opacity: 0,
                    y: -50,
                    ease: "power2.in"
                }), T.to(d, {
                    duration: .2,
                    opacity: 0,
                    y: -30,
                    delay: .05,
                    ease: "power2.in"
                }), T.set(h, {
                    y: 50,
                    opacity: 0,
                    delay: .2
                }), T.set(d, {
                    y: 30,
                    opacity: 0,
                    delay: .25
                })
            },
            p = () => {
                e.classList.add("hover")
            };
        _.addEventListener("mouseenter", m), _.addEventListener("mouseleave", f), _.addEventListener("click", p), o.push(() => {
            _.removeEventListener("mouseenter", m), _.removeEventListener("mouseleave", f), _.removeEventListener("click", p)
        })
    }), () => o.forEach(u => u())
}

