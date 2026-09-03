function Es() {
    const a = document.querySelectorAll(".main-subtitle");
    if (!a.length) return;
    T.set(a, {
        yPercent: 100
    });
    const t = [];
    return document.querySelectorAll(".next-project-title").forEach(e => {
        const r = e.querySelector(".main-title"),
            i = e.querySelector(".main-subtitle");
        if (!r || !i) return;
        const n = () => {
                T.killTweensOf([r, i]), T.to(r, {
                    duration: .3,
                    yPercent: -100,
                    ease: "power2.inOut"
                }), T.fromTo(i, {
                    yPercent: 100
                }, {
                    duration: .3,
                    yPercent: 0,
                    ease: "power2.inOut"
                })
            },
            s = () => {
                T.killTweensOf([r, i]), T.to(i, {
                    duration: .3,
                    yPercent: -100,
                    ease: "power2.inOut"
                }), T.fromTo(r, {
                    yPercent: 100
                }, {
                    duration: .3,
                    yPercent: 0,
                    ease: "power2.inOut"
                })
            };
        e.addEventListener("mouseenter", n), e.addEventListener("mouseleave", s), t.push(() => {
            e.removeEventListener("mouseenter", n), e.removeEventListener("mouseleave", s)
        })
    }), () => t.forEach(e => e())
}

