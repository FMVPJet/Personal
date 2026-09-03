async function gs() {
    const a = Array.from(document.querySelectorAll("a.image-link"));
    if (!a.length) return;
    await Promise.all(a.map(async r => {
        if (r.dataset.pswpWidth) return;
        const i = r.querySelector("img");
        i && (i.complete || await new Promise(n => {
            const s = () => n();
            i.addEventListener("load", s, {
                once: !0
            }), i.addEventListener("error", s, {
                once: !0
            })
        }), r.dataset.pswpWidth = String(i.naturalWidth || 1280), r.dataset.pswpHeight = String(i.naturalHeight || 800))
    }));
    const [{
        default: t
    }] = await Promise.all([Ye(() => import("./photoswipe-lightbox.esm.4VpeJUsy.js"), []), Ye(() => Promise.resolve({}), __vite__mapDeps([0]))]), e = new t({
        gallery: "body",
        children: "a.image-link",
        pswpModule: () => Ye(() => import("./photoswipe.esm.CKV1Bsxh.js"), []),
        showHideAnimationType: "zoom"
    });
    return e.init(), () => e.destroy()
}

function ys() {
    const a = [];
    if (document.querySelectorAll(".slider").forEach(t => {
            t.classList.contains("ns-init") || vs(t, a)
        }), document.querySelectorAll(".carousel").forEach(t => {
            t.classList.contains("ns-init") || ws(t)
        }), !!a.length) return () => a.forEach(t => t())
}

