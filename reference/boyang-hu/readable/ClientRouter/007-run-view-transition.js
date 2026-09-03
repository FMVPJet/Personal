async function C(e, t, n, o, r) {
    async function i(d) {
        function l(f) {
            const w = f.effect;
            return !w || !(w instanceof KeyframeEffect) || !w.target ? !1 : window.getComputedStyle(w.target, w.pseudoElement).animationIterationCount === "infinite"
        }
        const s = document.getAnimations();
        document.documentElement.setAttribute(k, d);
        const b = document.getAnimations().filter(f => !s.includes(f) && !l(f));
        return Promise.allSettled(b.map(f => f.finished))
    }
    const u = async () => {
        if (r === "animate" && !n.transitionSkipped && !e.signal.aborted) try {
            await i("old")
        } catch {}
    }, a = document.title, c = await ve(e, n.viewTransition, u);
    z(c.to, c.from, t, a, o), j(we), r === "animate" && (!n.transitionSkipped && !c.signal.aborted ? i("new").finally(() => n.viewTransitionFinished()) : n.viewTransitionFinished())
}

function Re() {
    return m?.controller.abort(), m = {
        controller: new AbortController
    }
}
