function De() {
    let e;
    document.body.addEventListener("focusin", o => {
        T(o.target, "hover") && t(o)
    }, {
        passive: !0
    }), document.body.addEventListener("focusout", n, {
        passive: !0
    }), N(() => {
        for (const o of document.getElementsByTagName("a")) E.has(o) || T(o, "hover") && (E.add(o), o.addEventListener("mouseenter", t, {
            passive: !0
        }), o.addEventListener("mouseleave", n, {
            passive: !0
        }))
    });

    function t(o) {
        const r = o.target.href;
        e && clearTimeout(e), e = setTimeout(() => {
            R(r)
        }, 80)
    }

    function n() {
        e && (clearTimeout(e), e = 0)
    }
}

function xe() {
    let e;
    N(() => {
        for (const t of document.getElementsByTagName("a")) E.has(t) || T(t, "viewport") && (E.add(t), e ??= Ie(), e.observe(t))
    })
}

