function Ts(a, t) {
    const e = a.clientWidth;
    if (e <= 0) return;
    const r = [];
    let i = [],
        n = 0;
    for (const o of t) i.push(o), n += o.ratio, n * Ur + (i.length - 1) * re >= e && (r.push({
        items: i,
        sumRatio: n,
        justify: !0
    }), i = [], n = 0);
    i.length && r.push({
        items: i,
        sumRatio: n,
        justify: !1
    });
    let s = 0;
    for (const o of r) {
        let u;
        o.justify ? u = (e - (o.items.length - 1) * re) / o.sumRatio : u = Ur;
        let l = 0;
        for (const c of o.items) {
            const h = u * c.ratio;
            c.el.style.left = `${l}px`, c.el.style.top = `${s}px`, c.el.style.width = `${h}px`, c.el.style.height = `${u}px`, l += h + re
        }
        s += u + re
    }
    a.style.height = `${Math.max(0,s-re)}px`
}

