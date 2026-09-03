function fs() {
    const a = document.querySelectorAll(".has-animation");
    if (!a.length) return;
    const t = new IntersectionObserver((e, r) => {
        for (const i of e) {
            if (!i.isIntersecting) continue;
            const n = i.target,
                s = parseInt(n.dataset.delay || "0", 10);
            s > 0 ? window.setTimeout(() => n.classList.add("animate-in"), s) : n.classList.add("animate-in"), r.unobserve(n)
        }
    });
    return a.forEach(e => t.observe(e)), () => t.disconnect()
}
let Wr = !0;

