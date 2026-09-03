function vs(a, t) {
    const e = Array.from(a.querySelectorAll(":scope > .slide"));
    if (!e.length) return;
    a.classList.add("ns-init", "ns-fade"), e.forEach((h, d) => h.classList.toggle("ns-active", d === 0));
    const r = document.createElement("div");
    r.className = "owl-prev ns-zone ns-prev";
    const i = document.createElement("div");
    i.className = "owl-next ns-zone ns-next", a.appendChild(r), a.appendChild(i);
    const n = [],
        s = document.createElement("div");
    s.className = "ns-dots";
    for (let h = 0; h < e.length; h++) {
        const d = document.createElement("button");
        d.type = "button", d.className = "ns-dot" + (h === 0 ? " active" : ""), d.addEventListener("click", () => u(h)), s.appendChild(d), n.push(d)
    }
    a.appendChild(s);
    let o = 0;
    const u = h => {
            const d = (h % e.length + e.length) % e.length;
            if (d === o) return;
            const _ = e[o],
                m = e[d];
            o = d, T.to(_, {
                opacity: 0,
                duration: .4,
                ease: "power2.inOut",
                onComplete: () => _.classList.remove("ns-active")
            }), m.classList.add("ns-active"), T.fromTo(m, {
                opacity: 0
            }, {
                opacity: 1,
                duration: .4,
                ease: "power2.inOut"
            }), n.forEach((f, p) => f.classList.toggle("active", p === o))
        },
        l = () => u(o - 1),
        c = () => u(o + 1);
    r.addEventListener("click", l), i.addEventListener("click", c), t.push(() => {
        r.removeEventListener("click", l), i.removeEventListener("click", c)
    })
}

