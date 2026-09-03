function ws(a) {
    if (!Array.from(a.querySelectorAll(":scope > .slide")).length) return;
    a.classList.add("ns-init", "ns-scroll");
    const e = document.createElement("div");
    e.className = "owl-prev ns-zone ns-prev";
    const r = document.createElement("div");
    r.className = "owl-next ns-zone ns-next", a.appendChild(e), a.appendChild(r), e.addEventListener("click", () => {
        a.scrollBy({
            left: -a.clientWidth / 3,
            behavior: "smooth"
        })
    }), r.addEventListener("click", () => {
        a.scrollBy({
            left: a.clientWidth / 3,
            behavior: "smooth"
        })
    })
}
const Ur = 300,
    re = 10;
async function bs() {
    const a = document.querySelectorAll("#justified-grid, .justified-gallery");
    if (!a.length) return;
    const t = [];
    for (const e of Array.from(a)) e.classList.contains("jg-init") || await xs(e, t);
    return () => t.forEach(e => window.removeEventListener("resize", e))
}
