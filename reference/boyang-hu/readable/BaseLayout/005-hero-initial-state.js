function hs() {
    const a = document.getElementById("main"),
        t = document.querySelectorAll(".hero-title"),
        e = document.querySelectorAll(".hero-subtitle");
    if (a && T.set(a, {
            opacity: 0
        }), t.length && T.set(t, {
            y: "10vh",
            opacity: 0
        }), e.length && T.set(e, {
            y: "15vh",
            opacity: 0
        }), !Wr) {
        Yr({
            skipHeroBg: !0
        });
        return
    }
    Wr = !1;
    const r = document.getElementById("hero-bg-image");
    r && T.set(r, {
        opacity: 0,
        scale: 1.2
    }), Yr()
}

