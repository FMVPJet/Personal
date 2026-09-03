function Ie() {
    const e = new WeakMap;
    return new IntersectionObserver((t, n) => {
        for (const o of t) {
            const r = o.target,
                i = e.get(r);
            o.isIntersecting ? (i && clearTimeout(i), e.set(r, setTimeout(() => {
                n.unobserve(r), e.delete(r), R(r.href)
            }, 300))) : i && (clearTimeout(i), e.delete(r))
        }
    })
}

function Ne() {
    N(() => {
        for (const e of document.getElementsByTagName("a")) T(e, "load") && R(e.href)
    })
}

