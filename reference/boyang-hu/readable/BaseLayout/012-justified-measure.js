async function xs(a, t) {
    a.classList.add("jg-init");
    const e = Array.from(a.querySelectorAll(":scope > .collage-thumb, :scope > a, :scope > figure"));
    if (!e.length) return;
    const r = await Promise.all(e.map(async n => {
            const s = n.querySelector("img");
            if (!s) return {
                el: n,
                ratio: 1
            };
            s.complete || await new Promise(l => {
                s.addEventListener("load", () => l(), {
                    once: !0
                }), s.addEventListener("error", () => l(), {
                    once: !0
                })
            });
            const o = s.naturalWidth || 1,
                u = s.naturalHeight || 1;
            return {
                el: n,
                ratio: o / u
            }
        })),
        i = () => Ts(a, r);
    i(), window.addEventListener("resize", i), t.push(i)
}

