function ks() {
    const a = Array.from(document.querySelectorAll("#filters [data-filter]"));
    if (!a.length) return;
    const t = Array.from(document.querySelectorAll("#portfolio > .item"));
    if (!t.length) return;
    let e = "*";
    const r = n => {
            e = n, t.forEach(s => {
                const o = n === "*" || s.matches(n);
                T.killTweensOf(s), o ? (s.style.removeProperty("display"), T.to(s, {
                    duration: .35,
                    opacity: 1,
                    scale: 1,
                    ease: "power2.out"
                })) : T.to(s, {
                    duration: .25,
                    opacity: 0,
                    scale: .92,
                    ease: "power2.in",
                    onComplete: () => {
                        e !== "*" && !s.matches(e) && (s.style.display = "none")
                    }
                })
            })
        },
        i = n => {
            n.preventDefault();
            const s = n.currentTarget,
                o = s.dataset.filter;
            o && (a.forEach(u => {
                const l = u === s;
                u.classList.toggle("active", l), u.setAttribute("aria-pressed", String(l))
            }), r(o), document.getElementById("close-sidebar")?.click())
        };
    return a.forEach(n => n.addEventListener("click", i)), () => {
        a.forEach(n => n.removeEventListener("click", i))
    }
}
let Xr = 0,
    Gr = 0,
    ve = 0,
    we = 0;
const jr = .25;

