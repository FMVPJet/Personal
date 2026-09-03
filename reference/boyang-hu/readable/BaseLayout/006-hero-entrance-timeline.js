function Yr(a = {}) {
    const t = document.getElementById("main"),
        e = document.getElementById("page-action-holder-left");
    if (t && T.to(t, {
            duration: .2,
            opacity: 1,
            delay: .1,
            ease: "power2.out"
        }), e && T.to(e, {
            duration: .3,
            opacity: 1,
            ease: "power2.out"
        }), !a.skipHeroBg) {
        const o = document.getElementById("hero"),
            u = document.getElementById("hero-bg-image");
        o?.classList.contains("has-image") && u && T.to(u, {
            duration: .7,
            scale: 1.05,
            opacity: 1,
            delay: .6,
            ease: "power2.out"
        })
    }
    const r = document.querySelectorAll(".hero-title"),
        i = document.querySelectorAll(".hero-subtitle");
    r.length && T.to(r, {
        duration: .4,
        y: 0,
        opacity: 1,
        delay: .7,
        ease: "power2.out"
    }), i.length && T.to(i, {
        duration: .4,
        y: 0,
        opacity: 1,
        delay: .75,
        ease: "power2.out"
    });
    const n = document.querySelectorAll("#portfolio .item-wrap"),
        s = T.timeline();
    n.forEach((o, u) => {
        s.to(o, {
            duration: .5,
            y: 0,
            opacity: 1,
            delay: .1,
            ease: "power2.out"
        }, u * .1)
    })
}

