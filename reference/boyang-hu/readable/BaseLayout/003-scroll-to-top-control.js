function cs() {
    const a = document.querySelector(".scrolltotop"),
        t = document.querySelector("#page-action-holder-right");
    if (!a || !t) return;
    const e = i => {
            i.preventDefault(), window.scrollY >= 300 ? window.scrollTo({
                top: 0,
                behavior: "smooth"
            }) : window.scrollBy({
                top: window.innerHeight,
                behavior: "smooth"
            })
        },
        r = () => {
            window.scrollY >= 300 ? (a.classList.add("page-up"), a.classList.remove("no-tooltip"), t.classList.remove("no-tooltip"), t.setAttribute("data-tooltip", "Go Top"), a.setAttribute("aria-label", "Back to top")) : (a.classList.remove("page-up"), a.classList.remove("no-tooltip"), t.classList.remove("no-tooltip"), t.setAttribute("data-tooltip", "Scroll Down"), a.setAttribute("aria-label", "Scroll down one screen"))
        };
    return a.addEventListener("click", e), window.addEventListener("scroll", r, {
        passive: !0
    }), r(), () => {
        a.removeEventListener("click", e), window.removeEventListener("scroll", r)
    }
}

