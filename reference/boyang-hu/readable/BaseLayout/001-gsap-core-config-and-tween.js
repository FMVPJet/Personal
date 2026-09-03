var st = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
            lineHeight: ""
        }
    },
    le = {
        duration: .5,
        overwrite: !1,
        delay: 0
    },
    nr, G, M, ct = 1e8,
    C = 1 / ct,
    Ve = Math.PI * 2,
    Ui = Ve / 4,
    Xi = 0,
    $r = Math.sqrt,
    Gi = Math.cos,
    ji = Math.sin,
    X = function(t) {
        return typeof t == "string"
    },
    F = function(t) {
        return typeof t == "function"
    },
    vt = function(t) {
        return typeof t == "number"
    },
    sr = function(t) {
        return typeof t > "u"
    },
    pt = function(t) {
        return typeof t == "object"
    },
    K = function(t) {
        return t !== !1
    },
    or = function() {
        return typeof window < "u"
    },
    ye = function(t) {
        return F(t) || X(t)
    },
    Kr = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {},
    H = Array.isArray,
    Hi = /random\([^)]+\)/g,
    $i = /,\s*/g,
    Tr = /(?:-?\.?\d|\.)+/gi,
    Qr = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Vt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    Re = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    Zr = /[+-]=-?[.\d]+/,
    Ki = /[^,'"\[\]\s]+/gi,
    Qi = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    R, ht, Ue, ar, ot = {},
    Se = {},
    Jr, ti = function(t) {
        return (Se = Ht(t, ot)) && tt
    },
    ur = function(t, e) {
        return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
    },
    ce = function(t, e) {
        return !e && console.warn(t)
    },
    ei = function(t, e) {
        return t && (ot[t] = e) && Se && (Se[t] = e) || ot
    },
    fe = function() {
        return 0
    },
    Zi = {
        suppressEvents: !0,
        isStart: !0,
        kill: !1
    },
    be = {
        suppressEvents: !0,
        kill: !1
    },
    Ji = {
        suppressEvents: !0
    },
    lr = {},
    St = [],
    Xe = {},
    ri, et = {},
    Ie = {},
    Sr = 30,
    xe = [],
    cr = "",
    fr = function(t) {
        var e = t[0],
            r, i;
        if (pt(e) || F(e) || (t = [t]), !(r = (e._gsap || {}).harness)) {
            for (i = xe.length; i-- && !xe[i].targetTest(e););
            r = xe[i]
        }
        for (i = t.length; i--;) t[i] && (t[i]._gsap || (t[i]._gsap = new Si(t[i], r))) || t.splice(i, 1);
        return t
    },
    zt = function(t) {
        return t._gsap || fr(ft(t))[0]._gsap
    },
    ii = function(t, e, r) {
        return (r = t[e]) && F(r) ? t[e]() : sr(r) && t.getAttribute && t.getAttribute(e) || r
    },
    Q = function(t, e) {
        return (t = t.split(",")).forEach(e) || t
    },
    W = function(t) {
        return Math.round(t * 1e5) / 1e5 || 0
    },
    D = function(t) {
        return Math.round(t * 1e7) / 1e7 || 0
    },
    Xt = function(t, e) {
        var r = e.charAt(0),
            i = parseFloat(e.substr(2));
        return t = parseFloat(t), r === "+" ? t + i : r === "-" ? t - i : r === "*" ? t * i : t / i
    },
    tn = function(t, e) {
        for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r;);
        return i < r
    },
    Ee = function() {
        var t = St.length,
            e = St.slice(0),
            r, i;
        for (Xe = {}, St.length = 0, r = 0; r < t; r++) i = e[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0)
    },
    hr = function(t) {
        return !!(t._initted || t._startAt || t.add)
    },
    ni = function(t, e, r, i) {
        St.length && !G && Ee(), t.render(e, r, !!(G && e < 0 && hr(t))), St.length && !G && Ee()
    },
    si = function(t) {
        var e = parseFloat(t);
        return (e || e === 0) && (t + "").match(Ki).length < 2 ? e : X(t) ? t.trim() : t
    },
    oi = function(t) {
        return t
    },
    at = function(t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t
    },
    en = function(t) {
        return function(e, r) {
            for (var i in r) i in e || i === "duration" && t || i === "ease" || (e[i] = r[i])
        }
    },
    Ht = function(t, e) {
        for (var r in e) t[r] = e[r];
        return t
    },
    Er = function a(t, e) {
        for (var r in e) r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = pt(e[r]) ? a(t[r] || (t[r] = {}), e[r]) : e[r]);
        return t
    },
    ke = function(t, e) {
        var r = {},
            i;
        for (i in t) i in e || (r[i] = t[i]);
        return r
    },
    se = function(t) {
        var e = t.parent || R,
            r = t.keyframes ? en(H(t.keyframes)) : at;
        if (K(t.inherit))
            for (; e;) r(t, e.vars.defaults), e = e.parent || e._dp;
        return t
    },
    rn = function(t, e) {
        for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r];);
        return r < 0
    },
    ai = function(t, e, r, i, n) {
        var s = t[i],
            o;
        if (n)
            for (o = e[n]; s && s[n] > o;) s = s._prev;
        return s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = s, e.parent = e._dp = t, e
    },
    Le = function(t, e, r, i) {
        r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
        var n = e._prev,
            s = e._next;
        n ? n._next = s : t[r] === e && (t[r] = s), s ? s._prev = n : t[i] === e && (t[i] = n), e._next = e._prev = e.parent = null
    },
    kt = function(t, e) {
        t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0
    },
    Bt = function(t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
            for (var r = t; r;) r._dirty = 1, r = r.parent;
        return t
    },
    nn = function(t) {
        for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
        return t
    },
    Ge = function(t, e, r, i) {
        return t._startAt && (G ? t._startAt.revert(be) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, i))
    },
    sn = function a(t) {
        return !t || t._ts && a(t.parent)
    },
    kr = function(t) {
        return t._repeat ? $t(t._tTime, t = t.duration() + t._rDelay) * t : 0
    },
    $t = function(t, e) {
        var r = Math.floor(t = D(t / e));
        return t && r === t ? r - 1 : r
    },
    Pe = function(t, e) {
        return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    },
    Me = function(t) {
        return t._end = D(t._start + (t._tDur / Math.abs(t._ts || t._rts || C) || 0))
    },
    De = function(t, e) {
        var r = t._dp;
        return r && r.smoothChildTiming && t._ts && (t._start = D(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Me(t), r._dirty || Bt(r, t)), t
    },
    ui = function(t, e) {
        var r;
        if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (r = Pe(t.rawTime(), e), (!e._dur || ge(0, e.totalDuration(), r) - e._tTime > C) && e.render(r, !0)), Bt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
            if (t._dur < t.duration())
                for (r = t; r._dp;) r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
            t._zTime = -C
        }
    },
    dt = function(t, e, r, i) {
        return e.parent && kt(e), e._start = D((vt(r) ? r : r || t !== R ? lt(t, r, e) : t._time) + e._delay), e._end = D(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), ai(t, e, "_first", "_last", t._sort ? "_start" : 0), je(e) || (t._recent = e), i || ui(t, e), t._ts < 0 && De(t, t._tTime), t
    },
    li = function(t, e) {
        return (ot.ScrollTrigger || ur("scrollTrigger", e)) && ot.ScrollTrigger.create(e, t)
    },
    ci = function(t, e, r, i, n) {
        if (_r(t, e, n), !t._initted) return 1;
        if (!r && t._pt && !G && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && ri !== rt.frame) return St.push(t), t._lazy = [n, i], 1
    },
    on = function a(t) {
        var e = t.parent;
        return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || a(e))
    },
    je = function(t) {
        var e = t.data;
        return e === "isFromStart" || e === "isStart"
    },
    an = function(t, e, r, i) {
        var n = t.ratio,
            s = e < 0 || !e && (!t._start && on(t) && !(!t._initted && je(t)) || (t._ts < 0 || t._dp._ts < 0) && !je(t)) ? 0 : 1,
            o = t._rDelay,
            u = 0,
            l, c, h;
        if (o && t._repeat && (u = ge(0, t._tDur, e), c = $t(u, o), t._yoyo && c & 1 && (s = 1 - s), c !== $t(t._tTime, o) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || G || i || t._zTime === C || !e && t._zTime) {
            if (!t._initted && ci(t, e, i, r, u)) return;
            for (h = t._zTime, t._zTime = e || (r ? C : 0), r || (r = e && !h), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = u, l = t._pt; l;) l.r(s, l.d), l = l._next;
            e < 0 && Ge(t, e, r, !0), t._onUpdate && !r && it(t, "onUpdate"), u && t._repeat && !r && t.parent && it(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && kt(t, 1), !r && !G && (it(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
        } else t._zTime || (t._zTime = e)
    },
    un = function(t, e, r) {
        var i;
        if (r > e)
            for (i = t._first; i && i._start <= r;) {
                if (i.data === "isPause" && i._start > e) return i;
                i = i._next
            } else
                for (i = t._last; i && i._start >= r;) {
                    if (i.data === "isPause" && i._start < e) return i;
                    i = i._prev
                }
    },
    Kt = function(t, e, r, i) {
        var n = t._repeat,
            s = D(e) || 0,
            o = t._tTime / t._tDur;
        return o && !i && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : D(s * (n + 1) + t._rDelay * n) : s, o > 0 && !i && De(t, t._tTime = t._tDur * o), t.parent && Me(t), r || Bt(t.parent, t), t
    },
    Pr = function(t) {
        return t instanceof $ ? Bt(t) : Kt(t, t._dur)
    },
    ln = {
        _start: 0,
        endTime: fe,
        totalDuration: fe
    },
    lt = function a(t, e, r) {
        var i = t.labels,
            n = t._recent || ln,
            s = t.duration() >= ct ? n.endTime(!1) : t._dur,
            o, u, l;
        return X(e) && (isNaN(e) || e in i) ? (u = e.charAt(0), l = e.substr(-1) === "%", o = e.indexOf("="), u === "<" || u === ">" ? (o >= 0 && (e = e.replace(/=/, "")), (u === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (l ? (o < 0 ? n : r).totalDuration() / 100 : 1)) : o < 0 ? (e in i || (i[e] = s), i[e]) : (u = parseFloat(e.charAt(o - 1) + e.substr(o + 1)), l && r && (u = u / 100 * (H(r) ? r[0] : r).totalDuration()), o > 1 ? a(t, e.substr(0, o - 1), r) + u : s + u)) : e == null ? s : +e
    },
    oe = function(t, e, r) {
        var i = vt(e[1]),
            n = (i ? 2 : 1) + (t < 2 ? 0 : 1),
            s = e[n],
            o, u;
        if (i && (s.duration = e[1]), s.parent = r, t) {
            for (o = s, u = r; u && !("immediateRender" in o);) o = u.vars.defaults || {}, u = K(u.vars.inherit) && u.parent;
            s.immediateRender = K(o.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1]
        }
        return new Y(e[0], s, e[n + 1])
    },
    At = function(t, e) {
        return t || t === 0 ? e(t) : e
    },
    ge = function(t, e, r) {
        return r < t ? t : r > e ? e : r
    },
    j = function(t, e) {
        return !X(t) || !(e = Qi.exec(t)) ? "" : e[1]
    },
    cn = function(t, e, r) {
        return At(r, function(i) {
            return ge(t, e, i)
        })
    },
    He = [].slice,
    fi = function(t, e) {
        return t && pt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && pt(t[0])) && !t.nodeType && t !== ht
    },
    fn = function(t, e, r) {
        return r === void 0 && (r = []), t.forEach(function(i) {
            var n;
            return X(i) && !e || fi(i, 1) ? (n = r).push.apply(n, ft(i)) : r.push(i)
        }) || r
    },
    ft = function(t, e, r) {
        return M && !e && M.selector ? M.selector(t) : X(t) && !r && (Ue || !Qt()) ? He.call((e || ar).querySelectorAll(t), 0) : H(t) ? fn(t, r) : fi(t) ? He.call(t, 0) : t ? [t] : []
    },
    $e = function(t) {
        return t = ft(t)[0] || ce("Invalid scope") || {},
            function(e) {
                var r = t.current || t.nativeElement || t;
                return ft(e, r.querySelectorAll ? r : r === t ? ce("Invalid scope") || ar.createElement("div") : t)
            }
    },
    hi = function(t) {
        return t.sort(function() {
            return .5 - Math.random()
        })
    },
    di = function(t) {
        if (F(t)) return t;
        var e = pt(t) ? t : {
                each: t
            },
            r = Ft(e.ease),
            i = e.from || 0,
            n = parseFloat(e.base) || 0,
            s = {},
            o = i > 0 && i < 1,
            u = isNaN(i) || o,
            l = e.axis,
            c = i,
            h = i;
        return X(i) ? c = h = {
                center: .5,
                edges: .5,
                end: 1
            } [i] || 0 : !o && u && (c = i[0], h = i[1]),
            function(d, _, m) {
                var f = (m || e).length,
                    p = s[f],
                    g, y, w, b, v, k, S, E, x;
                if (!p) {
                    if (x = e.grid === "auto" ? 0 : (e.grid || [1, ct])[1], !x) {
                        for (S = -ct; S < (S = m[x++].getBoundingClientRect().left) && x < f;);
                        x < f && x--
                    }
                    for (p = s[f] = [], g = u ? Math.min(x, f) * c - .5 : i % x, y = x === ct ? 0 : u ? f * h / x - .5 : i / x | 0, S = 0, E = ct, k = 0; k < f; k++) w = k % x - g, b = y - (k / x | 0), p[k] = v = l ? Math.abs(l === "y" ? b : w) : $r(w * w + b * b), v > S && (S = v), v < E && (E = v);
                    i === "random" && hi(p), p.max = S - E, p.min = E, p.v = f = (parseFloat(e.amount) || parseFloat(e.each) * (x > f ? f - 1 : l ? l === "y" ? f / x : x : Math.max(x, f / x)) || 0) * (i === "edges" ? -1 : 1), p.b = f < 0 ? n - f : n, p.u = j(e.amount || e.each) || 0, r = r && f < 0 ? Sn(r) : r
                }
                return f = (p[d] - p.min) / p.max || 0, D(p.b + (r ? r(f) : f) * p.v) + p.u
            }
    },
    Ke = function(t) {
        var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
        return function(r) {
            var i = D(Math.round(parseFloat(r) / t) * t * e);
            return (i - i % 1) / e + (vt(r) ? 0 : j(r))
        }
    },
    _i = function(t, e) {
        var r = H(t),
            i, n;
        return !r && pt(t) && (i = r = t.radius || ct, t.values ? (t = ft(t.values), (n = !vt(t[0])) && (i *= i)) : t = Ke(t.increment)), At(e, r ? F(t) ? function(s) {
            return n = t(s), Math.abs(n - s) <= i ? n : s
        } : function(s) {
            for (var o = parseFloat(n ? s.x : s), u = parseFloat(n ? s.y : 0), l = ct, c = 0, h = t.length, d, _; h--;) n ? (d = t[h].x - o, _ = t[h].y - u, d = d * d + _ * _) : d = Math.abs(t[h] - o), d < l && (l = d, c = h);
            return c = !i || l <= i ? t[c] : s, n || c === s || vt(s) ? c : c + j(s)
        } : Ke(t))
    },
    pi = function(t, e, r, i) {
        return At(H(t) ? !e : r === !0 ? !!(r = 0) : !i, function() {
            return H(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * .99)) / r) * r * i) / i
        })
    },
    hn = function() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
        return function(i) {
            return e.reduce(function(n, s) {
                return s(n)
            }, i)
        }
    },
    dn = function(t, e) {
        return function(r) {
            return t(parseFloat(r)) + (e || j(r))
        }
    },
    _n = function(t, e, r) {
        return gi(t, e, 0, 1, r)
    },
    mi = function(t, e, r) {
        return At(r, function(i) {
            return t[~~e(i)]
        })
    },
    pn = function a(t, e, r) {
        var i = e - t;
        return H(t) ? mi(t, a(0, t.length), e) : At(r, function(n) {
            return (i + (n - t) % i) % i + t
        })
    },
    mn = function a(t, e, r) {
        var i = e - t,
            n = i * 2;
        return H(t) ? mi(t, a(0, t.length - 1), e) : At(r, function(s) {
            return s = (n + (s - t) % n) % n || 0, t + (s > i ? n - s : s)
        })
    },
    he = function(t) {
        return t.replace(Hi, function(e) {
            var r = e.indexOf("[") + 1,
                i = e.substring(r || 7, r ? e.indexOf("]") : e.length - 1).split($i);
            return pi(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5)
        })
    },
    gi = function(t, e, r, i, n) {
        var s = e - t,
            o = i - r;
        return At(n, function(u) {
            return r + ((u - t) / s * o || 0)
        })
    },
    gn = function a(t, e, r, i) {
        var n = isNaN(t + e) ? 0 : function(_) {
            return (1 - _) * t + _ * e
        };
        if (!n) {
            var s = X(t),
                o = {},
                u, l, c, h, d;
            if (r === !0 && (i = 1) && (r = null), s) t = {
                p: t
            }, e = {
                p: e
            };
            else if (H(t) && !H(e)) {
                for (c = [], h = t.length, d = h - 2, l = 1; l < h; l++) c.push(a(t[l - 1], t[l]));
                h--, n = function(m) {
                    m *= h;
                    var f = Math.min(d, ~~m);
                    return c[f](m - f)
                }, r = e
            } else i || (t = Ht(H(t) ? [] : {}, t));
            if (!c) {
                for (u in e) dr.call(o, t, u, "get", e[u]);
                n = function(m) {
                    return gr(m, o) || (s ? t.p : t)
                }
            }
        }
        return At(r, n)
    },
    Or = function(t, e, r) {
        var i = t.labels,
            n = ct,
            s, o, u;
        for (s in i) o = i[s] - e, o < 0 == !!r && o && n > (o = Math.abs(o)) && (u = s, n = o);
        return u
    },
    it = function(t, e, r) {
        var i = t.vars,
            n = i[e],
            s = M,
            o = t._ctx,
            u, l, c;
        if (n) return u = i[e + "Params"], l = i.callbackScope || t, r && St.length && Ee(), o && (M = o), c = u ? n.apply(l, u) : n.call(l), M = s, c
    },
    ie = function(t) {
        return kt(t), t.scrollTrigger && t.scrollTrigger.kill(!!G), t.progress() < 1 && it(t, "onInterrupt"), t
    },
    Ut, yi = [],
    vi = function(t) {
        if (t)
            if (t = !t.name && t.default || t, or() || t.headless) {
                var e = t.name,
                    r = F(t),
                    i = e && !r && t.init ? function() {
                        this._props = []
                    } : t,
                    n = {
                        init: fe,
                        render: gr,
                        add: dr,
                        kill: Rn,
                        modifier: Dn,
                        rawVars: 0
                    },
                    s = {
                        targetTest: 0,
                        get: 0,
                        getSetter: mr,
                        aliases: {},
                        register: 0
                    };
                if (Qt(), t !== i) {
                    if (et[e]) return;
                    at(i, at(ke(t, n), s)), Ht(i.prototype, Ht(n, ke(t, s))), et[i.prop = e] = i, t.targetTest && (xe.push(i), lr[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
                }
                ei(e, i), t.register && t.register(tt, i, Z)
            } else yi.push(t)
    },
    A = 255,
    ne = {
        aqua: [0, A, A],
        lime: [0, A, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, A],
        navy: [0, 0, 128],
        white: [A, A, A],
        olive: [128, 128, 0],
        yellow: [A, A, 0],
        orange: [A, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [A, 0, 0],
        pink: [A, 192, 203],
        cyan: [0, A, A],
        transparent: [A, A, A, 0]
    },
    ze = function(t, e, r) {
        return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (r - e) * t * 6 : t < .5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * A + .5 | 0
    },
    wi = function(t, e, r) {
        var i = t ? vt(t) ? [t >> 16, t >> 8 & A, t & A] : 0 : ne.black,
            n, s, o, u, l, c, h, d, _, m;
        if (!i) {
            if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), ne[t]) i = ne[t];
            else if (t.charAt(0) === "#") {
                if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), o = t.charAt(3), t = "#" + n + n + s + s + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9) return i = parseInt(t.substr(1, 6), 16), [i >> 16, i >> 8 & A, i & A, parseInt(t.substr(7), 16) / 255];
                t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & A, t & A]
            } else if (t.substr(0, 3) === "hsl") {
                if (i = m = t.match(Tr), !e) u = +i[0] % 360 / 360, l = +i[1] / 100, c = +i[2] / 100, s = c <= .5 ? c * (l + 1) : c + l - c * l, n = c * 2 - s, i.length > 3 && (i[3] *= 1), i[0] = ze(u + 1 / 3, n, s), i[1] = ze(u, n, s), i[2] = ze(u - 1 / 3, n, s);
                else if (~t.indexOf("=")) return i = t.match(Qr), r && i.length < 4 && (i[3] = 1), i
            } else i = t.match(Tr) || ne.transparent;
            i = i.map(Number)
        }
        return e && !m && (n = i[0] / A, s = i[1] / A, o = i[2] / A, h = Math.max(n, s, o), d = Math.min(n, s, o), c = (h + d) / 2, h === d ? u = l = 0 : (_ = h - d, l = c > .5 ? _ / (2 - h - d) : _ / (h + d), u = h === n ? (s - o) / _ + (s < o ? 6 : 0) : h === s ? (o - n) / _ + 2 : (n - s) / _ + 4, u *= 60), i[0] = ~~(u + .5), i[1] = ~~(l * 100 + .5), i[2] = ~~(c * 100 + .5)), r && i.length < 4 && (i[3] = 1), i
    },
    bi = function(t) {
        var e = [],
            r = [],
            i = -1;
        return t.split(Et).forEach(function(n) {
            var s = n.match(Vt) || [];
            e.push.apply(e, s), r.push(i += s.length + 1)
        }), e.c = r, e
    },
    Ar = function(t, e, r) {
        var i = "",
            n = (t + i).match(Et),
            s = e ? "hsla(" : "rgba(",
            o = 0,
            u, l, c, h;
        if (!n) return t;
        if (n = n.map(function(d) {
                return (d = wi(d, e, 1)) && s + (e ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")"
            }), r && (c = bi(t), u = r.c, u.join(i) !== c.c.join(i)))
            for (l = t.replace(Et, "1").split(Vt), h = l.length - 1; o < h; o++) i += l[o] + (~u.indexOf(o) ? n.shift() || s + "0,0,0,0)" : (c.length ? c : n.length ? n : r).shift());
        if (!l)
            for (l = t.split(Et), h = l.length - 1; o < h; o++) i += l[o] + n[o];
        return i + l[h]
    },
    Et = (function() {
        var a = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
            t;
        for (t in ne) a += "|" + t + "\\b";
        return new RegExp(a + ")", "gi")
    })(),
    yn = /hsl[a]?\(/,
    xi = function(t) {
        var e = t.join(" "),
            r;
        if (Et.lastIndex = 0, Et.test(e)) return r = yn.test(e), t[1] = Ar(t[1], r), t[0] = Ar(t[0], r, bi(t[1])), !0
    },
    de, rt = (function() {
        var a = Date.now,
            t = 500,
            e = 33,
            r = a(),
            i = r,
            n = 1e3 / 240,
            s = n,
            o = [],
            u, l, c, h, d, _, m = function f(p) {
                var g = a() - i,
                    y = p === !0,
                    w, b, v, k;
                if ((g > t || g < 0) && (r += g - e), i += g, v = i - r, w = v - s, (w > 0 || y) && (k = ++h.frame, d = v - h.time * 1e3, h.time = v = v / 1e3, s += w + (w >= n ? 4 : n - w), b = 1), y || (u = l(f)), b)
                    for (_ = 0; _ < o.length; _++) o[_](v, d, k, p)
            };
        return h = {
            time: 0,
            frame: 0,
            tick: function() {
                m(!0)
            },
            deltaRatio: function(p) {
                return d / (1e3 / (p || 60))
            },
            wake: function() {
                Jr && (!Ue && or() && (ht = Ue = window, ar = ht.document || {}, ot.gsap = tt, (ht.gsapVersions || (ht.gsapVersions = [])).push(tt.version), ti(Se || ht.GreenSockGlobals || !ht.gsap && ht || {}), yi.forEach(vi)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && h.sleep(), l = c || function(p) {
                    return setTimeout(p, s - h.time * 1e3 + 1 | 0)
                }, de = 1, m(2))
            },
            sleep: function() {
                (c ? cancelAnimationFrame : clearTimeout)(u), de = 0, l = fe
            },
            lagSmoothing: function(p, g) {
                t = p || 1 / 0, e = Math.min(g || 33, t)
            },
            fps: function(p) {
                n = 1e3 / (p || 240), s = h.time * 1e3 + n
            },
            add: function(p, g, y) {
                var w = g ? function(b, v, k, S) {
                    p(b, v, k, S), h.remove(w)
                } : p;
                return h.remove(p), o[y ? "unshift" : "push"](w), Qt(), w
            },
            remove: function(p, g) {
                ~(g = o.indexOf(p)) && o.splice(g, 1) && _ >= g && _--
            },
            _listeners: o
        }, h
    })(),
    Qt = function() {
        return !de && rt.wake()
    },
    O = {},
    vn = /^[\d.\-M][\d.\-,\s]/,
    wn = /["']/g,
    bn = function(t) {
        for (var e = {}, r = t.substr(1, t.length - 3).split(":"), i = r[0], n = 1, s = r.length, o, u, l; n < s; n++) u = r[n], o = n !== s - 1 ? u.lastIndexOf(",") : u.length, l = u.substr(0, o), e[i] = isNaN(l) ? l.replace(wn, "").trim() : +l, i = u.substr(o + 1).trim();
        return e
    },
    xn = function(t) {
        var e = t.indexOf("(") + 1,
            r = t.indexOf(")"),
            i = t.indexOf("(", e);
        return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r)
    },
    Tn = function(t) {
        var e = (t + "").split("("),
            r = O[e[0]];
        return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [bn(e[1])] : xn(t).split(",").map(si)) : O._CE && vn.test(t) ? O._CE("", t) : r
    },
    Sn = function(t) {
        return function(e) {
            return 1 - t(1 - e)
        }
    },
    Ft = function(t, e) {
        return t && (F(t) ? t : O[t] || Tn(t)) || e
    },
    Nt = function(t, e, r, i) {
        r === void 0 && (r = function(u) {
            return 1 - e(1 - u)
        }), i === void 0 && (i = function(u) {
            return u < .5 ? e(u * 2) / 2 : 1 - e((1 - u) * 2) / 2
        });
        var n = {
                easeIn: e,
                easeOut: r,
                easeInOut: i
            },
            s;
        return Q(t, function(o) {
            O[o] = ot[o] = n, O[s = o.toLowerCase()] = r;
            for (var u in n) O[s + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = O[o + "." + u] = n[u]
        }), n
    },
    Ti = function(t) {
        return function(e) {
            return e < .5 ? (1 - t(1 - e * 2)) / 2 : .5 + t((e - .5) * 2) / 2
        }
    },
    Be = function a(t, e, r) {
        var i = e >= 1 ? e : 1,
            n = (r || (t ? .3 : .45)) / (e < 1 ? e : 1),
            s = n / Ve * (Math.asin(1 / i) || 0),
            o = function(c) {
                return c === 1 ? 1 : i * Math.pow(2, -10 * c) * ji((c - s) * n) + 1
            },
            u = t === "out" ? o : t === "in" ? function(l) {
                return 1 - o(1 - l)
            } : Ti(o);
        return n = Ve / n, u.config = function(l, c) {
            return a(t, l, c)
        }, u
    },
    Fe = function a(t, e) {
        e === void 0 && (e = 1.70158);
        var r = function(s) {
                return s ? --s * s * ((e + 1) * s + e) + 1 : 0
            },
            i = t === "out" ? r : t === "in" ? function(n) {
                return 1 - r(1 - n)
            } : Ti(r);
        return i.config = function(n) {
            return a(t, n)
        }, i
    };
Q("Linear,Quad,Cubic,Quart,Quint,Strong", function(a, t) {
    var e = t < 5 ? t + 1 : t;
    Nt(a + ",Power" + (e - 1), t ? function(r) {
        return Math.pow(r, e)
    } : function(r) {
        return r
    }, function(r) {
        return 1 - Math.pow(1 - r, e)
    }, function(r) {
        return r < .5 ? Math.pow(r * 2, e) / 2 : 1 - Math.pow((1 - r) * 2, e) / 2
    })
});
O.Linear.easeNone = O.none = O.Linear.easeIn;
Nt("Elastic", Be("in"), Be("out"), Be());
(function(a, t) {
    var e = 1 / t,
        r = 2 * e,
        i = 2.5 * e,
        n = function(o) {
            return o < e ? a * o * o : o < r ? a * Math.pow(o - 1.5 / t, 2) + .75 : o < i ? a * (o -= 2.25 / t) * o + .9375 : a * Math.pow(o - 2.625 / t, 2) + .984375
        };
    Nt("Bounce", function(s) {
        return 1 - n(1 - s)
    }, n)
})(7.5625, 2.75);
Nt("Expo", function(a) {
    return Math.pow(2, 10 * (a - 1)) * a + a * a * a * a * a * a * (1 - a)
});
Nt("Circ", function(a) {
    return -($r(1 - a * a) - 1)
});
Nt("Sine", function(a) {
    return a === 1 ? 1 : -Gi(a * Ui) + 1
});
Nt("Back", Fe("in"), Fe("out"), Fe());
O.SteppedEase = O.steps = ot.SteppedEase = {
    config: function(t, e) {
        t === void 0 && (t = 1);
        var r = 1 / t,
            i = t + (e ? 0 : 1),
            n = e ? 1 : 0,
            s = 1 - C;
        return function(o) {
            return ((i * ge(0, s, o) | 0) + n) * r
        }
    }
};
le.ease = O["quad.out"];
Q("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(a) {
    return cr += a + "," + a + "Params,"
});
var Si = function(t, e) {
        this.id = Xi++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : ii, this.set = e ? e.getSetter : mr
    },
    _e = (function() {
        function a(e) {
            this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Kt(this, +e.duration, 1, 1), this.data = e.data, M && (this._ctx = M, M.data.push(this)), de || rt.wake()
        }
        var t = a.prototype;
        return t.delay = function(r) {
            return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay
        }, t.duration = function(r) {
            return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur
        }, t.totalDuration = function(r) {
            return arguments.length ? (this._dirty = 0, Kt(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
        }, t.totalTime = function(r, i) {
            if (Qt(), !arguments.length) return this._tTime;
            var n = this._dp;
            if (n && n.smoothChildTiming && this._ts) {
                for (De(this, r), !n._dp || n.parent || ui(n, this); n && n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
                !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && dt(this._dp, this, this._start - this._delay)
            }
            return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === C || !this._initted && this._dur && r || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), ni(this, r, i)), this
        }, t.time = function(r, i) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + kr(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time
        }, t.totalProgress = function(r, i) {
            return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0
        }, t.progress = function(r, i) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + kr(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0
        }, t.iteration = function(r, i) {
            var n = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (r - 1) * n, i) : this._repeat ? $t(this._tTime, n) + 1 : 1
        }, t.timeScale = function(r, i) {
            if (!arguments.length) return this._rts === -C ? 0 : this._rts;
            if (this._rts === r) return this;
            var n = this.parent && this._ts ? Pe(this.parent._time, this) : this._tTime;
            return this._rts = +r || 0, this._ts = this._ps || r === -C ? 0 : this._rts, this.totalTime(ge(-Math.abs(this._delay), this.totalDuration(), n), i !== !1), Me(this), nn(this)
        }, t.paused = function(r) {
            return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Qt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== C && (this._tTime -= C)))), this) : this._ps
        }, t.startTime = function(r) {
            if (arguments.length) {
                this._start = D(r);
                var i = this.parent || this._dp;
                return i && (i._sort || !this.parent) && dt(i, this, this._start - this._delay), this
            }
            return this._start
        }, t.endTime = function(r) {
            return this._start + (K(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
        }, t.rawTime = function(r) {
            var i = this.parent || this._dp;
            return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Pe(i.rawTime(r), this) : this._tTime : this._tTime
        }, t.revert = function(r) {
            r === void 0 && (r = Ji);
            var i = G;
            return G = r, hr(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), G = i, this
        }, t.globalTime = function(r) {
            for (var i = this, n = arguments.length ? r : i.rawTime(); i;) n = i._start + n / (Math.abs(i._ts) || 1), i = i._dp;
            return !this.parent && this._sat ? this._sat.globalTime(r) : n
        }, t.repeat = function(r) {
            return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, Pr(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
        }, t.repeatDelay = function(r) {
            if (arguments.length) {
                var i = this._time;
                return this._rDelay = r, Pr(this), i ? this.time(i) : this
            }
            return this._rDelay
        }, t.yoyo = function(r) {
            return arguments.length ? (this._yoyo = r, this) : this._yoyo
        }, t.seek = function(r, i) {
            return this.totalTime(lt(this, r), K(i))
        }, t.restart = function(r, i) {
            return this.play().totalTime(r ? -this._delay : 0, K(i)), this._dur || (this._zTime = -C), this
        }, t.play = function(r, i) {
            return r != null && this.seek(r, i), this.reversed(!1).paused(!1)
        }, t.reverse = function(r, i) {
            return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1)
        }, t.pause = function(r, i) {
            return r != null && this.seek(r, i), this.paused(!0)
        }, t.resume = function() {
            return this.paused(!1)
        }, t.reversed = function(r) {
            return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -C : 0)), this) : this._rts < 0
        }, t.invalidate = function() {
            return this._initted = this._act = 0, this._zTime = -C, this
        }, t.isActive = function() {
            var r = this.parent || this._dp,
                i = this._start,
                n;
            return !!(!r || this._ts && this._initted && r.isActive() && (n = r.rawTime(!0)) >= i && n < this.endTime(!0) - C)
        }, t.eventCallback = function(r, i, n) {
            var s = this.vars;
            return arguments.length > 1 ? (i ? (s[r] = i, n && (s[r + "Params"] = n), r === "onUpdate" && (this._onUpdate = i)) : delete s[r], this) : s[r]
        }, t.then = function(r) {
            var i = this,
                n = i._prom;
            return new Promise(function(s) {
                var o = F(r) ? r : oi,
                    u = function() {
                        var c = i.then;
                        i.then = null, n && n(), F(o) && (o = o(i)) && (o.then || o === i) && (i.then = c), s(o), i.then = c
                    };
                i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? u() : i._prom = u
            })
        }, t.kill = function() {
            ie(this)
        }, a
    })();
at(_e.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -C,
    _prom: 0,
    _ps: !1,
    _rts: 1
});
var $ = (function(a) {
    Hr(t, a);

    function t(r, i) {
        var n;
        return r === void 0 && (r = {}), n = a.call(this, r) || this, n.labels = {}, n.smoothChildTiming = !!r.smoothChildTiming, n.autoRemoveChildren = !!r.autoRemoveChildren, n._sort = K(r.sortChildren), R && dt(r.parent || R, gt(n), i), r.reversed && n.reverse(), r.paused && n.paused(!0), r.scrollTrigger && li(gt(n), r.scrollTrigger), n
    }
    var e = t.prototype;
    return e.to = function(i, n, s) {
        return oe(0, arguments, this), this
    }, e.from = function(i, n, s) {
        return oe(1, arguments, this), this
    }, e.fromTo = function(i, n, s, o) {
        return oe(2, arguments, this), this
    }, e.set = function(i, n, s) {
        return n.duration = 0, n.parent = this, se(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new Y(i, n, lt(this, s), 1), this
    }, e.call = function(i, n, s) {
        return dt(this, Y.delayedCall(0, i, n), s)
    }, e.staggerTo = function(i, n, s, o, u, l, c) {
        return s.duration = n, s.stagger = s.stagger || o, s.onComplete = l, s.onCompleteParams = c, s.parent = this, new Y(i, s, lt(this, u)), this
    }, e.staggerFrom = function(i, n, s, o, u, l, c) {
        return s.runBackwards = 1, se(s).immediateRender = K(s.immediateRender), this.staggerTo(i, n, s, o, u, l, c)
    }, e.staggerFromTo = function(i, n, s, o, u, l, c, h) {
        return o.startAt = s, se(o).immediateRender = K(o.immediateRender), this.staggerTo(i, n, o, u, l, c, h)
    }, e.render = function(i, n, s) {
        var o = this._time,
            u = this._dirty ? this.totalDuration() : this._tDur,
            l = this._dur,
            c = i <= 0 ? 0 : D(i),
            h = this._zTime < 0 != i < 0 && (this._initted || !l),
            d, _, m, f, p, g, y, w, b, v, k, S;
        if (this !== R && c > u && i >= 0 && (c = u), c !== this._tTime || s || h) {
            if (o !== this._time && l && (c += this._time - o, i += this._time - o), d = c, b = this._start, w = this._ts, g = !w, h && (l || (o = this._zTime), (i || !n) && (this._zTime = i)), this._repeat) {
                if (k = this._yoyo, p = l + this._rDelay, this._repeat < -1 && i < 0) return this.totalTime(p * 100 + i, n, s);
                if (d = D(c % p), c === u ? (f = this._repeat, d = l) : (v = D(c / p), f = ~~v, f && f === v && (d = l, f--), d > l && (d = l)), v = $t(this._tTime, p), !o && this._tTime && v !== f && this._tTime - v * p - this._dur <= 0 && (v = f), k && f & 1 && (d = l - d, S = 1), f !== v && !this._lock) {
                    var E = k && v & 1,
                        x = E === (k && f & 1);
                    if (f < v && (E = !E), o = E ? 0 : c % l ? l : c, this._lock = 1, this.render(o || (S ? 0 : D(f * p)), n, !l)._lock = 0, this._tTime = c, !n && this.parent && it(this, "onRepeat"), this.vars.repeatRefresh && !S && (this.invalidate()._lock = 1, v = f), o && o !== this._time || g !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                    if (l = this._dur, u = this._tDur, x && (this._lock = 2, o = E ? l : -1e-4, this.render(o, !0), this.vars.repeatRefresh && !S && this.invalidate()), this._lock = 0, !this._ts && !g) return this
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (y = un(this, D(o), D(d)), y && (c -= d - (d = y._start))), this._tTime = c, this._time = d, this._act = !!w, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, o = 0), !o && c && l && !n && !v && (it(this, "onStart"), this._tTime !== c)) return this;
            if (d >= o && i >= 0)
                for (_ = this._first; _;) {
                    if (m = _._next, (_._act || d >= _._start) && _._ts && y !== _) {
                        if (_.parent !== this) return this.render(i, n, s);
                        if (_.render(_._ts > 0 ? (d - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (d - _._start) * _._ts, n, s), d !== this._time || !this._ts && !g) {
                            y = 0, m && (c += this._zTime = -C);
                            break
                        }
                    }
                    _ = m
                } else {
                    _ = this._last;
                    for (var P = i < 0 ? i : d; _;) {
                        if (m = _._prev, (_._act || P <= _._end) && _._ts && y !== _) {
                            if (_.parent !== this) return this.render(i, n, s);
                            if (_.render(_._ts > 0 ? (P - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (P - _._start) * _._ts, n, s || G && hr(_)), d !== this._time || !this._ts && !g) {
                                y = 0, m && (c += this._zTime = P ? -C : C);
                                break
                            }
                        }
                        _ = m
                    }
                }
            if (y && !n && (this.pause(), y.render(d >= o ? 0 : -C)._zTime = d >= o ? 1 : -1, this._ts)) return this._start = b, Me(this), this.render(i, n, s);
            this._onUpdate && !n && it(this, "onUpdate", !0), (c === u && this._tTime >= this.totalDuration() || !c && o) && (b === this._start || Math.abs(w) !== Math.abs(this._ts)) && (this._lock || ((i || !l) && (c === u && this._ts > 0 || !c && this._ts < 0) && kt(this, 1), !n && !(i < 0 && !o) && (c || o || !u) && (it(this, c === u && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < u && this.timeScale() > 0) && this._prom())))
        }
        return this
    }, e.add = function(i, n) {
        var s = this;
        if (vt(n) || (n = lt(this, n, i)), !(i instanceof _e)) {
            if (H(i)) return i.forEach(function(o) {
                return s.add(o, n)
            }), this;
            if (X(i)) return this.addLabel(i, n);
            if (F(i)) i = Y.delayedCall(0, i);
            else return this
        }
        return this !== i ? dt(this, i, n) : this
    }, e.getChildren = function(i, n, s, o) {
        i === void 0 && (i = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = -ct);
        for (var u = [], l = this._first; l;) l._start >= o && (l instanceof Y ? n && u.push(l) : (s && u.push(l), i && u.push.apply(u, l.getChildren(!0, n, s)))), l = l._next;
        return u
    }, e.getById = function(i) {
        for (var n = this.getChildren(1, 1, 1), s = n.length; s--;)
            if (n[s].vars.id === i) return n[s]
    }, e.remove = function(i) {
        return X(i) ? this.removeLabel(i) : F(i) ? this.killTweensOf(i) : (i.parent === this && Le(this, i), i === this._recent && (this._recent = this._last), Bt(this))
    }, e.totalTime = function(i, n) {
        return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = D(rt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), a.prototype.totalTime.call(this, i, n), this._forcing = 0, this) : this._tTime
    }, e.addLabel = function(i, n) {
        return this.labels[i] = lt(this, n), this
    }, e.removeLabel = function(i) {
        return delete this.labels[i], this
    }, e.addPause = function(i, n, s) {
        var o = Y.delayedCall(0, n || fe, s);
        return o.data = "isPause", this._hasPause = 1, dt(this, o, lt(this, i))
    }, e.removePause = function(i) {
        var n = this._first;
        for (i = lt(this, i); n;) n._start === i && n.data === "isPause" && kt(n), n = n._next
    }, e.killTweensOf = function(i, n, s) {
        for (var o = this.getTweensOf(i, s), u = o.length; u--;) bt !== o[u] && o[u].kill(i, n);
        return this
    }, e.getTweensOf = function(i, n) {
        for (var s = [], o = ft(i), u = this._first, l = vt(n), c; u;) u instanceof Y ? tn(u._targets, o) && (l ? (!bt || u._initted && u._ts) && u.globalTime(0) <= n && u.globalTime(u.totalDuration()) > n : !n || u.isActive()) && s.push(u) : (c = u.getTweensOf(o, n)).length && s.push.apply(s, c), u = u._next;
        return s
    }, e.tweenTo = function(i, n) {
        n = n || {};
        var s = this,
            o = lt(s, i),
            u = n,
            l = u.startAt,
            c = u.onStart,
            h = u.onStartParams,
            d = u.immediateRender,
            _, m = Y.to(s, at({
                ease: n.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: o,
                overwrite: "auto",
                duration: n.duration || Math.abs((o - (l && "time" in l ? l.time : s._time)) / s.timeScale()) || C,
                onStart: function() {
                    if (s.pause(), !_) {
                        var p = n.duration || Math.abs((o - (l && "time" in l ? l.time : s._time)) / s.timeScale());
                        m._dur !== p && Kt(m, p, 0, 1).render(m._time, !0, !0), _ = 1
                    }
                    c && c.apply(m, h || [])
                }
            }, n));
        return d ? m.render(0) : m
    }, e.tweenFromTo = function(i, n, s) {
        return this.tweenTo(n, at({
            startAt: {
                time: lt(this, i)
            }
        }, s))
    }, e.recent = function() {
        return this._recent
    }, e.nextLabel = function(i) {
        return i === void 0 && (i = this._time), Or(this, lt(this, i))
    }, e.previousLabel = function(i) {
        return i === void 0 && (i = this._time), Or(this, lt(this, i), 1)
    }, e.currentLabel = function(i) {
        return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + C)
    }, e.shiftChildren = function(i, n, s) {
        s === void 0 && (s = 0);
        var o = this._first,
            u = this.labels,
            l;
        for (i = D(i); o;) o._start >= s && (o._start += i, o._end += i), o = o._next;
        if (n)
            for (l in u) u[l] >= s && (u[l] += i);
        return Bt(this)
    }, e.invalidate = function(i) {
        var n = this._first;
        for (this._lock = 0; n;) n.invalidate(i), n = n._next;
        return a.prototype.invalidate.call(this, i)
    }, e.clear = function(i) {
        i === void 0 && (i = !0);
        for (var n = this._first, s; n;) s = n._next, this.remove(n), n = s;
        return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Bt(this)
    }, e.totalDuration = function(i) {
        var n = 0,
            s = this,
            o = s._last,
            u = ct,
            l, c, h;
        if (arguments.length) return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -i : i));
        if (s._dirty) {
            for (h = s.parent; o;) l = o._prev, o._dirty && o.totalDuration(), c = o._start, c > u && s._sort && o._ts && !s._lock ? (s._lock = 1, dt(s, o, c - o._delay, 1)._lock = 0) : u = c, c < 0 && o._ts && (n -= c, (!h && !s._dp || h && h.smoothChildTiming) && (s._start += D(c / s._ts), s._time -= c, s._tTime -= c), s.shiftChildren(-c, !1, -1 / 0), u = 0), o._end > n && o._ts && (n = o._end), o = l;
            Kt(s, s === R && s._time > n ? s._time : n, 1, 1), s._dirty = 0
        }
        return s._tDur
    }, t.updateRoot = function(i) {
        if (R._ts && (ni(R, Pe(i, R)), ri = rt.frame), rt.frame >= Sr) {
            Sr += st.autoSleep || 120;
            var n = R._first;
            if ((!n || !n._ts) && st.autoSleep && rt._listeners.length < 2) {
                for (; n && !n._ts;) n = n._next;
                n || rt.sleep()
            }
        }
    }, t
})(_e);
at($.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var En = function(t, e, r, i, n, s, o) {
        var u = new Z(this._pt, t, e, 0, 1, Ci, null, n),
            l = 0,
            c = 0,
            h, d, _, m, f, p, g, y;
        for (u.b = r, u.e = i, r += "", i += "", (g = ~i.indexOf("random(")) && (i = he(i)), s && (y = [r, i], s(y, t, e), r = y[0], i = y[1]), d = r.match(Re) || []; h = Re.exec(i);) m = h[0], f = i.substring(l, h.index), _ ? _ = (_ + 1) % 5 : f.substr(-5) === "rgba(" && (_ = 1), m !== d[c++] && (p = parseFloat(d[c - 1]) || 0, u._pt = {
            _next: u._pt,
            p: f || c === 1 ? f : ",",
            s: p,
            c: m.charAt(1) === "=" ? Xt(p, m) - p : parseFloat(m) - p,
            m: _ && _ < 4 ? Math.round : 0
        }, l = Re.lastIndex);
        return u.c = l < i.length ? i.substring(l, i.length) : "", u.fp = o, (Zr.test(i) || g) && (u.e = 0), this._pt = u, u
    },
    dr = function(t, e, r, i, n, s, o, u, l, c) {
        F(i) && (i = i(n || 0, t, s));
        var h = t[e],
            d = r !== "get" ? r : F(h) ? l ? t[e.indexOf("set") || !F(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : h,
            _ = F(h) ? l ? Cn : Oi : pr,
            m;
        if (X(i) && (~i.indexOf("random(") && (i = he(i)), i.charAt(1) === "=" && (m = Xt(d, i) + (j(d) || 0), (m || m === 0) && (i = m))), !c || d !== i || Qe) return !isNaN(d * i) && i !== "" ? (m = new Z(this._pt, t, e, +d || 0, i - (d || 0), typeof h == "boolean" ? Mn : Ai, 0, _), l && (m.fp = l), o && m.modifier(o, this, t), this._pt = m) : (!h && !(e in t) && ur(e, i), En.call(this, t, e, d, i, _, u || st.stringFilter, l))
    },
    kn = function(t, e, r, i, n) {
        if (F(t) && (t = ae(t, n, e, r, i)), !pt(t) || t.style && t.nodeType || H(t) || Kr(t)) return X(t) ? ae(t, n, e, r, i) : t;
        var s = {},
            o;
        for (o in t) s[o] = ae(t[o], n, e, r, i);
        return s
    },
    Ei = function(t, e, r, i, n, s) {
        var o, u, l, c;
        if (et[t] && (o = new et[t]).init(n, o.rawVars ? e[t] : kn(e[t], i, n, s, r), r, i, s) !== !1 && (r._pt = u = new Z(r._pt, n, t, 0, 1, o.render, o, 0, o.priority), r !== Ut))
            for (l = r._ptLookup[r._targets.indexOf(n)], c = o._props.length; c--;) l[o._props[c]] = u;
        return o
    },
    bt, Qe, _r = function a(t, e, r) {
        var i = t.vars,
            n = i.ease,
            s = i.startAt,
            o = i.immediateRender,
            u = i.lazy,
            l = i.onUpdate,
            c = i.runBackwards,
            h = i.yoyoEase,
            d = i.keyframes,
            _ = i.autoRevert,
            m = t._dur,
            f = t._startAt,
            p = t._targets,
            g = t.parent,
            y = g && g.data === "nested" ? g.vars.targets : p,
            w = t._overwrite === "auto" && !nr,
            b = t.timeline,
            v = i.easeReverse || h,
            k, S, E, x, P, q, z, L, B, U, V, N, ut;
        if (b && (!d || !n) && (n = "none"), t._ease = Ft(n, le.ease), t._rEase = v && (Ft(v) || t._ease), t._from = !b && !!i.runBackwards, t._from && (t.ratio = 1), !b || d && !i.stagger) {
            if (L = p[0] ? zt(p[0]).harness : 0, N = L && i[L.prop], k = ke(i, lr), f && (f._zTime < 0 && f.progress(1), e < 0 && c && o && !_ ? f.render(-1, !0) : f.revert(c && m ? be : Zi), f._lazy = 0), s) {
                if (kt(t._startAt = Y.set(p, at({
                        data: "isStart",
                        overwrite: !1,
                        parent: g,
                        immediateRender: !0,
                        lazy: !f && K(u),
                        startAt: null,
                        delay: 0,
                        onUpdate: l && function() {
                            return it(t, "onUpdate")
                        },
                        stagger: 0
                    }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (G || !o && !_) && t._startAt.revert(be), o && m && e <= 0 && r <= 0) {
                    e && (t._zTime = e);
                    return
                }
            } else if (c && m && !f) {
                if (e && (o = !1), E = at({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: o && !f && K(u),
                        immediateRender: o,
                        stagger: 0,
                        parent: g
                    }, k), N && (E[L.prop] = N), kt(t._startAt = Y.set(p, E)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (G ? t._startAt.revert(be) : t._startAt.render(-1, !0)), t._zTime = e, !o) a(t._startAt, C, C);
                else if (!e) return
            }
            for (t._pt = t._ptCache = 0, u = m && K(u) || u && !m, S = 0; S < p.length; S++) {
                if (P = p[S], z = P._gsap || fr(p)[S]._gsap, t._ptLookup[S] = U = {}, Xe[z.id] && St.length && Ee(), V = y === p ? S : y.indexOf(P), L && (B = new L).init(P, N || k, t, V, y) !== !1 && (t._pt = x = new Z(t._pt, P, B.name, 0, 1, B.render, B, 0, B.priority), B._props.forEach(function(Wt) {
                        U[Wt] = x
                    }), B.priority && (q = 1)), !L || N)
                    for (E in k) et[E] && (B = Ei(E, k, t, V, P, y)) ? B.priority && (q = 1) : U[E] = x = dr.call(t, P, E, "get", k[E], V, y, 0, i.stringFilter);
                t._op && t._op[S] && t.kill(P, t._op[S]), w && t._pt && (bt = t, R.killTweensOf(P, U, t.globalTime(e)), ut = !t.parent, bt = 0), t._pt && u && (Xe[z.id] = 1)
            }
            q && Li(t), t._onInit && t._onInit(t)
        }
        t._onUpdate = l, t._initted = (!t._op || t._pt) && !ut, d && e <= 0 && b.render(ct, !0, !0)
    },
    Pn = function(t, e, r, i, n, s, o, u) {
        var l = (t._pt && t._ptCache || (t._ptCache = {}))[e],
            c, h, d, _;
        if (!l)
            for (l = t._ptCache[e] = [], d = t._ptLookup, _ = t._targets.length; _--;) {
                if (c = d[_][e], c && c.d && c.d._pt)
                    for (c = c.d._pt; c && c.p !== e && c.fp !== e;) c = c._next;
                if (!c) return Qe = 1, t.vars[e] = "+=0", _r(t, o), Qe = 0, u ? ce(e + " not eligible for reset. Try splitting into individual properties") : 1;
                l.push(c)
            }
        for (_ = l.length; _--;) h = l[_], c = h._pt || h, c.s = (i || i === 0) && !n ? i : c.s + (i || 0) + s * c.c, c.c = r - c.s, h.e && (h.e = W(r) + j(h.e)), h.b && (h.b = c.s + j(h.b))
    },
    On = function(t, e) {
        var r = t[0] ? zt(t[0]).harness : 0,
            i = r && r.aliases,
            n, s, o, u;
        if (!i) return e;
        n = Ht({}, e);
        for (s in i)
            if (s in n)
                for (u = i[s].split(","), o = u.length; o--;) n[u[o]] = n[s];
        return n
    },
    An = function(t, e, r, i) {
        var n = e.ease || i || "power1.inOut",
            s, o;
        if (H(e)) o = r[t] || (r[t] = []), e.forEach(function(u, l) {
            return o.push({
                t: l / (e.length - 1) * 100,
                v: u,
                e: n
            })
        });
        else
            for (s in e) o = r[s] || (r[s] = []), s === "ease" || o.push({
                t: parseFloat(t),
                v: e[s],
                e: n
            })
    },
    ae = function(t, e, r, i, n) {
        return F(t) ? t.call(e, r, i, n) : X(t) && ~t.indexOf("random(") ? he(t) : t
    },
    ki = cr + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",
    Pi = {};
Q(ki + ",id,stagger,delay,duration,paused,scrollTrigger", function(a) {
    return Pi[a] = 1
});
var Y = (function(a) {
    Hr(t, a);

    function t(r, i, n, s) {
        var o;
        typeof i == "number" && (n.duration = i, i = n, n = null), o = a.call(this, s ? i : se(i)) || this;
        var u = o.vars,
            l = u.duration,
            c = u.delay,
            h = u.immediateRender,
            d = u.stagger,
            _ = u.overwrite,
            m = u.keyframes,
            f = u.defaults,
            p = u.scrollTrigger,
            g = i.parent || R,
            y = (H(r) || Kr(r) ? vt(r[0]) : "length" in i) ? [r] : ft(r),
            w, b, v, k, S, E, x, P;
        if (o._targets = y.length ? fr(y) : ce("GSAP target " + r + " not found. https://gsap.com", !st.nullTargetWarn) || [], o._ptLookup = [], o._overwrite = _, m || d || ye(l) || ye(c)) {
            i = o.vars;
            var q = i.easeReverse || i.yoyoEase;
            if (w = o.timeline = new $({
                    data: "nested",
                    defaults: f || {},
                    targets: g && g.data === "nested" ? g.vars.targets : y
                }), w.kill(), w.parent = w._dp = gt(o), w._start = 0, d || ye(l) || ye(c)) {
                if (k = y.length, x = d && di(d), pt(d))
                    for (S in d) ~ki.indexOf(S) && (P || (P = {}), P[S] = d[S]);
                for (b = 0; b < k; b++) v = ke(i, Pi), v.stagger = 0, q && (v.easeReverse = q), P && Ht(v, P), E = y[b], v.duration = +ae(l, gt(o), b, E, y), v.delay = (+ae(c, gt(o), b, E, y) || 0) - o._delay, !d && k === 1 && v.delay && (o._delay = c = v.delay, o._start += c, v.delay = 0), w.to(E, v, x ? x(b, E, y) : 0), w._ease = O.none;
                w.duration() ? l = c = 0 : o.timeline = 0
            } else if (m) {
                se(at(w.vars.defaults, {
                    ease: "none"
                })), w._ease = Ft(m.ease || i.ease || "none");
                var z = 0,
                    L, B, U;
                if (H(m)) m.forEach(function(V) {
                    return w.to(y, V, ">")
                }), w.duration();
                else {
                    v = {};
                    for (S in m) S === "ease" || S === "easeEach" || An(S, m[S], v, m.easeEach);
                    for (S in v)
                        for (L = v[S].sort(function(V, N) {
                                return V.t - N.t
                            }), z = 0, b = 0; b < L.length; b++) B = L[b], U = {
                            ease: B.e,
                            duration: (B.t - (b ? L[b - 1].t : 0)) / 100 * l
                        }, U[S] = B.v, w.to(y, U, z), z += U.duration;
                    w.duration() < l && w.to({}, {
                        duration: l - w.duration()
                    })
                }
            }
            l || o.duration(l = w.duration())
        } else o.timeline = 0;
        return _ === !0 && !nr && (bt = gt(o), R.killTweensOf(y), bt = 0), dt(g, gt(o), n), i.reversed && o.reverse(), i.paused && o.paused(!0), (h || !l && !m && o._start === D(g._time) && K(h) && sn(gt(o)) && g.data !== "nested") && (o._tTime = -C, o.render(Math.max(0, -c) || 0)), p && li(gt(o), p), o
    }
    var e = t.prototype;
    return e.render = function(i, n, s) {
        var o = this._time,
            u = this._tDur,
            l = this._dur,
            c = i < 0,
            h = i > u - C && !c ? u : i < C ? 0 : i,
            d, _, m, f, p, g, y, w;
        if (!l) an(this, i, n, s);
        else if (h !== this._tTime || !i || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c || this._lazy) {
            if (d = h, w = this.timeline, this._repeat) {
                if (f = l + this._rDelay, this._repeat < -1 && c) return this.totalTime(f * 100 + i, n, s);
                if (d = D(h % f), h === u ? (m = this._repeat, d = l) : (p = D(h / f), m = ~~p, m && m === p ? (d = l, m--) : d > l && (d = l)), g = this._yoyo && m & 1, g && (d = l - d), p = $t(this._tTime, f), d === o && !s && this._initted && m === p) return this._tTime = h, this;
                m !== p && this.vars.repeatRefresh && !g && !this._lock && d !== f && this._initted && (this._lock = s = 1, this.render(D(f * m), !0).invalidate()._lock = 0)
            }
            if (!this._initted) {
                if (ci(this, c ? i : d, s, n, h)) return this._tTime = 0, this;
                if (o !== this._time && !(s && this.vars.repeatRefresh && m !== p)) return this;
                if (l !== this._dur) return this.render(i, n, s)
            }
            if (this._rEase) {
                var b = d < o;
                if (b !== this._inv) {
                    var v = b ? o : l - o;
                    this._inv = b, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = o, this._invRecip = v ? (b ? -1 : 1) / v : 0, this._invScale = b ? -this.ratio : 1 - this.ratio, this._invEase = b ? this._rEase : this._ease
                }
                this.ratio = y = this._invRatio + this._invScale * this._invEase((d - this._invTime) * this._invRecip)
            } else this.ratio = y = this._ease(d / l);
            if (this._from && (this.ratio = y = 1 - y), this._tTime = h, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), !o && h && !n && !p && (it(this, "onStart"), this._tTime !== h)) return this;
            for (_ = this._pt; _;) _.r(y, _.d), _ = _._next;
            w && w.render(i < 0 ? i : w._dur * w._ease(d / this._dur), n, s) || this._startAt && (this._zTime = i), this._onUpdate && !n && (c && Ge(this, i, n, s), it(this, "onUpdate")), this._repeat && m !== p && this.vars.onRepeat && !n && this.parent && it(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (c && !this._onUpdate && Ge(this, i, !0, !0), (i || !l) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && kt(this, 1), !n && !(c && !o) && (h || o || g) && (it(this, h === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < u && this.timeScale() > 0) && this._prom()))
        }
        return this
    }, e.targets = function() {
        return this._targets
    }, e.invalidate = function(i) {
        return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), a.prototype.invalidate.call(this, i)
    }, e.resetTo = function(i, n, s, o, u) {
        de || rt.wake(), this._ts || this.play();
        var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
            c;
        return this._initted || _r(this, l), c = this._ease(l / this._dur), Pn(this, i, n, s, o, c, l, u) ? this.resetTo(i, n, s, o, 1) : (De(this, 0), this.parent || ai(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
    }, e.kill = function(i, n) {
        if (n === void 0 && (n = "all"), !i && (!n || n === "all")) return this._lazy = this._pt = 0, this.parent ? ie(this) : this.scrollTrigger && this.scrollTrigger.kill(!!G), this;
        if (this.timeline) {
            var s = this.timeline.totalDuration();
            return this.timeline.killTweensOf(i, n, bt && bt.vars.overwrite !== !0)._first || ie(this), this.parent && s !== this.timeline.totalDuration() && Kt(this, this._dur * this.timeline._tDur / s, 0, 1), this
        }
        var o = this._targets,
            u = i ? ft(i) : o,
            l = this._ptLookup,
            c = this._pt,
            h, d, _, m, f, p, g;
        if ((!n || n === "all") && rn(o, u)) return n === "all" && (this._pt = 0), ie(this);
        for (h = this._op = this._op || [], n !== "all" && (X(n) && (f = {}, Q(n, function(y) {
                return f[y] = 1
            }), n = f), n = On(o, n)), g = o.length; g--;)
            if (~u.indexOf(o[g])) {
                d = l[g], n === "all" ? (h[g] = n, m = d, _ = {}) : (_ = h[g] = h[g] || {}, m = n);
                for (f in m) p = d && d[f], p && ((!("kill" in p.d) || p.d.kill(f) === !0) && Le(this, p, "_pt"), delete d[f]), _ !== "all" && (_[f] = 1)
            } return this._initted && !this._pt && c && ie(this), this
    }, t.to = function(i, n) {
        return new t(i, n, arguments[2])
    }, t.from = function(i, n) {
        return oe(1, arguments)
    }, t.delayedCall = function(i, n, s, o) {
        return new t(n, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: i,
            onComplete: n,
            onReverseComplete: n,
            onCompleteParams: s,
            onReverseCompleteParams: s,
            callbackScope: o
        })
    }, t.fromTo = function(i, n, s) {
        return oe(2, arguments)
    }, t.set = function(i, n) {
        return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(i, n)
    }, t.killTweensOf = function(i, n, s) {
        return R.killTweensOf(i, n, s)
    }, t
})(_e);
at(Y.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
});
Q("staggerTo,staggerFrom,staggerFromTo", function(a) {
    Y[a] = function() {
        var t = new $,
            e = He.call(arguments, 0);
        return e.splice(a === "staggerFromTo" ? 5 : 4, 0, 0), t[a].apply(t, e)
    }
});
var pr = function(t, e, r) {
        return t[e] = r
    },
    Oi = function(t, e, r) {
        return t[e](r)
    },
    Cn = function(t, e, r, i) {
        return t[e](i.fp, r)
    },
    Ln = function(t, e, r) {
        return t.setAttribute(e, r)
    },
    mr = function(t, e) {
        return F(t[e]) ? Oi : sr(t[e]) && t.setAttribute ? Ln : pr
    },
    Ai = function(t, e) {
        return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e)
    },
    Mn = function(t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e)
    },
    Ci = function(t, e) {
        var r = e._pt,
            i = "";
        if (!t && e.b) i = e.b;
        else if (t === 1 && e.e) i = e.e;
        else {
            for (; r;) i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round((r.s + r.c * t) * 1e4) / 1e4) + i, r = r._next;
            i += e.c
        }
        e.set(e.t, e.p, i, e)
    },
    gr = function(t, e) {
        for (var r = e._pt; r;) r.r(t, r.d), r = r._next
    },
    Dn = function(t, e, r, i) {
        for (var n = this._pt, s; n;) s = n._next, n.p === i && n.modifier(t, e, r), n = s
    },
    Rn = function(t) {
        for (var e = this._pt, r, i; e;) i = e._next, e.p === t && !e.op || e.op === t ? Le(this, e, "_pt") : e.dep || (r = 1), e = i;
        return !r
    },
    In = function(t, e, r, i) {
        i.mSet(t, e, i.m.call(i.tween, r, i.mt), i)
    },
    Li = function(t) {
        for (var e = t._pt, r, i, n, s; e;) {
            for (r = e._next, i = n; i && i.pr > e.pr;) i = i._next;
            (e._prev = i ? i._prev : s) ? e._prev._next = e: n = e, (e._next = i) ? i._prev = e : s = e, e = r
        }
        t._pt = n
    },
    Z = (function() {
        function a(e, r, i, n, s, o, u, l, c) {
            this.t = r, this.s = n, this.c = s, this.p = i, this.r = o || Ai, this.d = u || this, this.set = l || pr, this.pr = c || 0, this._next = e, e && (e._prev = this)
        }
        var t = a.prototype;
        return t.modifier = function(r, i, n) {
            this.mSet = this.mSet || this.set, this.set = In, this.m = r, this.mt = n, this.tween = i
        }, a
    })();
Q(cr + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(a) {
    return lr[a] = 1
});
ot.TweenMax = ot.TweenLite = Y;
ot.TimelineLite = ot.TimelineMax = $;
R = new $({
    sortChildren: !1,
    defaults: le,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0
});
st.stringFilter = xi;
var qt = [],
    Te = {},
    zn = [],
    Cr = 0,
    Bn = 0,
    qe = function(t) {
        return (Te[t] || zn).map(function(e) {
            return e()
        })
    },
    Ze = function() {
        var t = Date.now(),
            e = [];
        t - Cr > 2 && (qe("matchMediaInit"), qt.forEach(function(r) {
            var i = r.queries,
                n = r.conditions,
                s, o, u, l;
            for (o in i) s = ht.matchMedia(i[o]).matches, s && (u = 1), s !== n[o] && (n[o] = s, l = 1);
            l && (r.revert(), u && e.push(r))
        }), qe("matchMediaRevert"), e.forEach(function(r) {
            return r.onMatch(r, function(i) {
                return r.add(null, i)
            })
        }), Cr = t, qe("matchMedia"))
    },
    Mi = (function() {
        function a(e, r) {
            this.selector = r && $e(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Bn++, e && this.add(e)
        }
        var t = a.prototype;
        return t.add = function(r, i, n) {
            F(r) && (n = i, i = r, r = F);
            var s = this,
                o = function() {
                    var l = M,
                        c = s.selector,
                        h;
                    return l && l !== s && l.data.push(s), n && (s.selector = $e(n)), M = s, h = i.apply(s, arguments), F(h) && s._r.push(h), M = l, s.selector = c, s.isReverted = !1, h
                };
            return s.last = o, r === F ? o(s, function(u) {
                return s.add(null, u)
            }) : r ? s[r] = o : o
        }, t.ignore = function(r) {
            var i = M;
            M = null, r(this), M = i
        }, t.getTweens = function() {
            var r = [];
            return this.data.forEach(function(i) {
                return i instanceof a ? r.push.apply(r, i.getTweens()) : i instanceof Y && !(i.parent && i.parent.data === "nested") && r.push(i)
            }), r
        }, t.clear = function() {
            this._r.length = this.data.length = 0
        }, t.kill = function(r, i) {
            var n = this;
            if (r ? (function() {
                    for (var o = n.getTweens(), u = n.data.length, l; u--;) l = n.data[u], l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(c) {
                        return o.splice(o.indexOf(c), 1)
                    }));
                    for (o.map(function(c) {
                            return {
                                g: c._dur || c._delay || c._sat && !c._sat.vars.immediateRender ? c.globalTime(0) : -1 / 0,
                                t: c
                            }
                        }).sort(function(c, h) {
                            return h.g - c.g || -1 / 0
                        }).forEach(function(c) {
                            return c.t.revert(r)
                        }), u = n.data.length; u--;) l = n.data[u], l instanceof $ ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof Y) && l.revert && l.revert(r);
                    n._r.forEach(function(c) {
                        return c(r, n)
                    }), n.isReverted = !0
                })() : this.data.forEach(function(o) {
                    return o.kill && o.kill()
                }), this.clear(), i)
                for (var s = qt.length; s--;) qt[s].id === this.id && qt.splice(s, 1)
        }, t.revert = function(r) {
            this.kill(r || {})
        }, a
    })(),
    Fn = (function() {
        function a(e) {
            this.contexts = [], this.scope = e, M && M.data.push(this)
        }
        var t = a.prototype;
        return t.add = function(r, i, n) {
            pt(r) || (r = {
                matches: r
            });
            var s = new Mi(0, n || this.scope),
                o = s.conditions = {},
                u, l, c;
            M && !s.selector && (s.selector = M.selector), this.contexts.push(s), i = s.add("onMatch", i), s.queries = r;
            for (l in r) l === "all" ? c = 1 : (u = ht.matchMedia(r[l]), u && (qt.indexOf(s) < 0 && qt.push(s), (o[l] = u.matches) && (c = 1), u.addListener ? u.addListener(Ze) : u.addEventListener("change", Ze)));
            return c && i(s, function(h) {
                return s.add(null, h)
            }), this
        }, t.revert = function(r) {
            this.kill(r || {})
        }, t.kill = function(r) {
            this.contexts.forEach(function(i) {
                return i.kill(r, !0)
            })
        }, a
    })(),
    Oe = {
        registerPlugin: function() {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
            e.forEach(function(i) {
                return vi(i)
            })
        },
        timeline: function(t) {
            return new $(t)
        },
        getTweensOf: function(t, e) {
            return R.getTweensOf(t, e)
        },
        getProperty: function(t, e, r, i) {
            X(t) && (t = ft(t)[0]);
            var n = zt(t || {}).get,
                s = r ? oi : si;
            return r === "native" && (r = ""), t && (e ? s((et[e] && et[e].get || n)(t, e, r, i)) : function(o, u, l) {
                return s((et[o] && et[o].get || n)(t, o, u, l))
            })
        },
        quickSetter: function(t, e, r) {
            if (t = ft(t), t.length > 1) {
                var i = t.map(function(c) {
                        return tt.quickSetter(c, e, r)
                    }),
                    n = i.length;
                return function(c) {
                    for (var h = n; h--;) i[h](c)
                }
            }
            t = t[0] || {};
            var s = et[e],
                o = zt(t),
                u = o.harness && (o.harness.aliases || {})[e] || e,
                l = s ? function(c) {
                    var h = new s;
                    Ut._pt = 0, h.init(t, r ? c + r : c, Ut, 0, [t]), h.render(1, h), Ut._pt && gr(1, Ut)
                } : o.set(t, u);
            return s ? l : function(c) {
                return l(t, u, r ? c + r : c, o, 1)
            }
        },
        quickTo: function(t, e, r) {
            var i, n = tt.to(t, at((i = {}, i[e] = "+=0.1", i.paused = !0, i.stagger = 0, i), r || {})),
                s = function(u, l, c) {
                    return n.resetTo(e, u, l, c)
                };
            return s.tween = n, s
        },
        isTweening: function(t) {
            return R.getTweensOf(t, !0).length > 0
        },
        defaults: function(t) {
            return t && t.ease && (t.ease = Ft(t.ease, le.ease)), Er(le, t || {})
        },
        config: function(t) {
            return Er(st, t || {})
        },
        registerEffect: function(t) {
            var e = t.name,
                r = t.effect,
                i = t.plugins,
                n = t.defaults,
                s = t.extendTimeline;
            (i || "").split(",").forEach(function(o) {
                return o && !et[o] && !ot[o] && ce(e + " effect requires " + o + " plugin.")
            }), Ie[e] = function(o, u, l) {
                return r(ft(o), at(u || {}, n), l)
            }, s && ($.prototype[e] = function(o, u, l) {
                return this.add(Ie[e](o, pt(u) ? u : (l = u) && {}, this), l)
            })
        },
        registerEase: function(t, e) {
            O[t] = Ft(e)
        },
        parseEase: function(t, e) {
            return arguments.length ? Ft(t, e) : O
        },
        getById: function(t) {
            return R.getById(t)
        },
        exportRoot: function(t, e) {
            t === void 0 && (t = {});
            var r = new $(t),
                i, n;
            for (r.smoothChildTiming = K(t.smoothChildTiming), R.remove(r), r._dp = 0, r._time = r._tTime = R._time, i = R._first; i;) n = i._next, (e || !(!i._dur && i instanceof Y && i.vars.onComplete === i._targets[0])) && dt(r, i, i._start - i._delay), i = n;
            return dt(R, r, 0), r
        },
        context: function(t, e) {
            return t ? new Mi(t, e) : M
        },
        matchMedia: function(t) {
            return new Fn(t)
        },
        matchMediaRefresh: function() {
            return qt.forEach(function(t) {
                var e = t.conditions,
                    r, i;
                for (i in e) e[i] && (e[i] = !1, r = 1);
                r && t.revert()
            }) || Ze()
        },
        addEventListener: function(t, e) {
            var r = Te[t] || (Te[t] = []);
            ~r.indexOf(e) || r.push(e)
        },
        removeEventListener: function(t, e) {
            var r = Te[t],
                i = r && r.indexOf(e);
            i >= 0 && r.splice(i, 1)
        },
        utils: {
            wrap: pn,
            wrapYoyo: mn,
            distribute: di,
            random: pi,
            snap: _i,
            normalize: _n,
            getUnit: j,
            clamp: cn,
            splitColor: wi,
            toArray: ft,
            selector: $e,
            mapRange: gi,
            pipe: hn,
            unitize: dn,
            interpolate: gn,
            shuffle: hi
        },
        install: ti,
        effects: Ie,
        ticker: rt,
        updateRoot: $.updateRoot,
        plugins: et,
        globalTimeline: R,
        core: {
            PropTween: Z,
            globals: ei,
            Tween: Y,
            Timeline: $,
            Animation: _e,
            getCache: zt,
            _removeLinkedListItem: Le,
            reverting: function() {
                return G
            },
            context: function(t) {
                return t && M && (M.data.push(t), t._ctx = M), M
            },
            suppressOverwrites: function(t) {
                return nr = t
            }
        }
    };
Q("to,from,fromTo,delayedCall,set,killTweensOf", function(a) {
    return Oe[a] = Y[a]
});
rt.add($.updateRoot);
Ut = Oe.to({}, {
    duration: 0
});
var qn = function(t, e) {
        for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) r = r._next;
        return r
    },
    Nn = function(t, e) {
        var r = t._targets,
            i, n, s;
        for (i in e)
            for (n = r.length; n--;) s = t._ptLookup[n][i], s && (s = s.d) && (s._pt && (s = qn(s, i)), s && s.modifier && s.modifier(e[i], t, r[n], i))
    },
    Ne = function(t, e) {
        return {
            name: t,
            headless: 1,
            rawVars: 1,
            init: function(i, n, s) {
                s._onInit = function(o) {
                    var u, l;
                    if (X(n) && (u = {}, Q(n, function(c) {
                            return u[c] = 1
                        }), n = u), e) {
                        u = {};
                        for (l in n) u[l] = e(n[l]);
                        n = u
                    }
                    Nn(o, n)
                }
            }
        }
    },
    tt = Oe.registerPlugin({
        name: "attr",
        init: function(t, e, r, i, n) {
            var s, o, u;
            this.tween = r;
            for (s in e) u = t.getAttribute(s) || "", o = this.add(t, "setAttribute", (u || 0) + "", e[s], i, n, 0, 0, s), o.op = s, o.b = u, this._props.push(s)
        },
        render: function(t, e) {
            for (var r = e._pt; r;) G ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next
        }
    }, {
        name: "endArray",
        headless: 1,
        init: function(t, e) {
            for (var r = e.length; r--;) this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1)
        }
    }, Ne("roundProps", Ke), Ne("modifiers"), Ne("snap", _i)) || Oe;
Y.version = $.version = tt.version = "3.15.0";
Jr = 1;
or() && Qt();
O.Power0;
O.Power1;
O.Power2;
O.Power3;
O.Power4;
O.Linear;
O.Quad;
O.Cubic;
O.Quart;
O.Quint;
O.Strong;
O.Elastic;
O.Back;
O.SteppedEase;
O.Bounce;
O.Sine;
O.Expo;
O.Circ;
/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
 */
