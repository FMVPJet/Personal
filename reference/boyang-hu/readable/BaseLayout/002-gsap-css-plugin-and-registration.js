var Lr, xt, Gt, yr, It, Mr, vr, Wn = function() {
        return typeof window < "u"
    },
    wt = {},
    Rt = 180 / Math.PI,
    jt = Math.PI / 180,
    Yt = Math.atan2,
    Dr = 1e8,
    wr = /([A-Z])/g,
    Yn = /(left|right|width|margin|padding|x)/i,
    Vn = /[\s,\(]\S/,
    _t = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
    },
    Je = function(t, e) {
        return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
    },
    Un = function(t, e) {
        return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
    },
    Xn = function(t, e) {
        return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e)
    },
    Gn = function(t, e) {
        return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e)
    },
    jn = function(t, e) {
        var r = e.s + e.c * t;
        e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
    },
    Di = function(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
    },
    Ri = function(t, e) {
        return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e)
    },
    Hn = function(t, e, r) {
        return t.style[e] = r
    },
    $n = function(t, e, r) {
        return t.style.setProperty(e, r)
    },
    Kn = function(t, e, r) {
        return t._gsap[e] = r
    },
    Qn = function(t, e, r) {
        return t._gsap.scaleX = t._gsap.scaleY = r
    },
    Zn = function(t, e, r, i, n) {
        var s = t._gsap;
        s.scaleX = s.scaleY = r, s.renderTransform(n, s)
    },
    Jn = function(t, e, r, i, n) {
        var s = t._gsap;
        s[e] = r, s.renderTransform(n, s)
    },
    I = "transform",
    J = I + "Origin",
    ts = function a(t, e) {
        var r = this,
            i = this.target,
            n = i.style,
            s = i._gsap;
        if (t in wt && n) {
            if (this.tfm = this.tfm || {}, t !== "transform") t = _t[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(o) {
                return r.tfm[o] = yt(i, o)
            }) : this.tfm[t] = s.x ? s[t] : yt(i, t), t === J && (this.tfm.zOrigin = s.zOrigin);
            else return _t.transform.split(",").forEach(function(o) {
                return a.call(r, o, e)
            });
            if (this.props.indexOf(I) >= 0) return;
            s.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(J, e, "")), t = I
        }(n || e) && this.props.push(t, e, n[t])
    },
    Ii = function(t) {
        t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"))
    },
    es = function() {
        var t = this.props,
            e = this.target,
            r = e.style,
            i = e._gsap,
            n, s;
        for (n = 0; n < t.length; n += 3) t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? r[t[n]] = t[n + 2] : r.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(wr, "-$1").toLowerCase());
        if (this.tfm) {
            for (s in this.tfm) i[s] = this.tfm[s];
            i.svg && (i.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = vr(), (!n || !n.isStart) && !r[I] && (Ii(r), i.zOrigin && r[J] && (r[J] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1)
        }
    },
    zi = function(t, e) {
        var r = {
            target: t,
            props: [],
            revert: es,
            save: ts
        };
        return t._gsap || tt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(i) {
            return r.save(i)
        }), r
    },
    Bi, tr = function(t, e) {
        var r = xt.createElementNS ? xt.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : xt.createElement(t);
        return r && r.style ? r : xt.createElement(t)
    },
    nt = function a(t, e, r) {
        var i = getComputedStyle(t);
        return i[e] || i.getPropertyValue(e.replace(wr, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && a(t, Zt(e) || e, 1) || ""
    },
    Rr = "O,Moz,ms,Ms,Webkit".split(","),
    Zt = function(t, e, r) {
        var i = e || It,
            n = i.style,
            s = 5;
        if (t in n && !r) return t;
        for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Rr[s] + t in n););
        return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Rr[s] : "") + t
    },
    er = function() {
        Wn() && window.document && (Lr = window, xt = Lr.document, Gt = xt.documentElement, It = tr("div") || {
            style: {}
        }, tr("div"), I = Zt(I), J = I + "Origin", It.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Bi = !!Zt("perspective"), vr = tt.core.reverting, yr = 1)
    },
    Ir = function(t) {
        var e = t.ownerSVGElement,
            r = tr("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            i = t.cloneNode(!0),
            n;
        i.style.display = "block", r.appendChild(i), Gt.appendChild(r);
        try {
            n = i.getBBox()
        } catch {}
        return r.removeChild(i), Gt.removeChild(r), n
    },
    zr = function(t, e) {
        for (var r = e.length; r--;)
            if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
    },
    Fi = function(t) {
        var e, r;
        try {
            e = t.getBBox()
        } catch {
            e = Ir(t), r = 1
        }
        return e && (e.width || e.height) || r || (e = Ir(t)), e && !e.width && !e.x && !e.y ? {
            x: +zr(t, ["x", "cx", "x1"]) || 0,
            y: +zr(t, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        } : e
    },
    qi = function(t) {
        return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Fi(t))
    },
    Pt = function(t, e) {
        if (e) {
            var r = t.style,
                i;
            e in wt && e !== J && (e = I), r.removeProperty ? (i = e.substr(0, 2), (i === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), r.removeProperty(i === "--" ? e : e.replace(wr, "-$1").toLowerCase())) : r.removeAttribute(e)
        }
    },
    Tt = function(t, e, r, i, n, s) {
        var o = new Z(t._pt, e, r, 0, 1, s ? Ri : Di);
        return t._pt = o, o.b = i, o.e = n, t._props.push(r), o
    },
    Br = {
        deg: 1,
        rad: 1,
        turn: 1
    },
    rs = {
        grid: 1,
        flex: 1
    },
    Ot = function a(t, e, r, i) {
        var n = parseFloat(r) || 0,
            s = (r + "").trim().substr((n + "").length) || "px",
            o = It.style,
            u = Yn.test(e),
            l = t.tagName.toLowerCase() === "svg",
            c = (l ? "client" : "offset") + (u ? "Width" : "Height"),
            h = 100,
            d = i === "px",
            _ = i === "%",
            m, f, p, g;
        if (i === s || !n || Br[i] || Br[s]) return n;
        if (s !== "px" && !d && (n = a(t, e, r, "px")), g = t.getCTM && qi(t), (_ || s === "%") && (wt[e] || ~e.indexOf("adius"))) return m = g ? t.getBBox()[u ? "width" : "height"] : t[c], W(_ ? n / m * h : n / 100 * m);
        if (o[u ? "width" : "height"] = h + (d ? s : i), f = i !== "rem" && ~e.indexOf("adius") || i === "em" && t.appendChild && !l ? t : t.parentNode, g && (f = (t.ownerSVGElement || {}).parentNode), (!f || f === xt || !f.appendChild) && (f = xt.body), p = f._gsap, p && _ && p.width && u && p.time === rt.time && !p.uncache) return W(n / p.width * h);
        if (_ && (e === "height" || e === "width")) {
            var y = t.style[e];
            t.style[e] = h + i, m = t[c], y ? t.style[e] = y : Pt(t, e)
        } else(_ || s === "%") && !rs[nt(f, "display")] && (o.position = nt(t, "position")), f === t && (o.position = "static"), f.appendChild(It), m = It[c], f.removeChild(It), o.position = "absolute";
        return u && _ && (p = zt(f), p.time = rt.time, p.width = f[c]), W(d ? m * n / h : m && n ? h / m * n : 0)
    },
    yt = function(t, e, r, i) {
        var n;
        return yr || er(), e in _t && e !== "transform" && (e = _t[e], ~e.indexOf(",") && (e = e.split(",")[0])), wt[e] && e !== "transform" ? (n = me(t, i), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : Ce(nt(t, J)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) && (n = Ae[e] && Ae[e](t, e, r) || nt(t, e) || ii(t, e) || (e === "opacity" ? 1 : 0))), r && !~(n + "").trim().indexOf(" ") ? Ot(t, e, n, r) + r : n
    },
    is = function(t, e, r, i) {
        if (!r || r === "none") {
            var n = Zt(e, t, 1),
                s = n && nt(t, n, 1);
            s && s !== r ? (e = n, r = s) : e === "borderColor" && (r = nt(t, "borderTopColor"))
        }
        var o = new Z(this._pt, t.style, e, 0, 1, Ci),
            u = 0,
            l = 0,
            c, h, d, _, m, f, p, g, y, w, b, v;
        if (o.b = r, o.e = i, r += "", i += "", i.substring(0, 6) === "var(--" && (i = nt(t, i.substring(4, i.indexOf(")")))), i === "auto" && (f = t.style[e], t.style[e] = i, i = nt(t, e) || i, f ? t.style[e] = f : Pt(t, e)), c = [r, i], xi(c), r = c[0], i = c[1], d = r.match(Vt) || [], v = i.match(Vt) || [], v.length) {
            for (; h = Vt.exec(i);) p = h[0], y = i.substring(u, h.index), m ? m = (m + 1) % 5 : (y.substr(-5) === "rgba(" || y.substr(-5) === "hsla(") && (m = 1), p !== (f = d[l++] || "") && (_ = parseFloat(f) || 0, b = f.substr((_ + "").length), p.charAt(1) === "=" && (p = Xt(_, p) + b), g = parseFloat(p), w = p.substr((g + "").length), u = Vt.lastIndex - w.length, w || (w = w || st.units[e] || b, u === i.length && (i += w, o.e += w)), b !== w && (_ = Ot(t, e, f, w) || 0), o._pt = {
                _next: o._pt,
                p: y || l === 1 ? y : ",",
                s: _,
                c: g - _,
                m: m && m < 4 || e === "zIndex" ? Math.round : 0
            });
            o.c = u < i.length ? i.substring(u, i.length) : ""
        } else o.r = e === "display" && i === "none" ? Ri : Di;
        return Zr.test(i) && (o.e = 0), this._pt = o, o
    },
    Fr = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    },
    ns = function(t) {
        var e = t.split(" "),
            r = e[0],
            i = e[1] || "50%";
        return (r === "top" || r === "bottom" || i === "left" || i === "right") && (t = r, r = i, i = t), e[0] = Fr[r] || r, e[1] = Fr[i] || i, e.join(" ")
    },
    ss = function(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var r = e.t,
                i = r.style,
                n = e.u,
                s = r._gsap,
                o, u, l;
            if (n === "all" || n === !0) i.cssText = "", u = 1;
            else
                for (n = n.split(","), l = n.length; --l > -1;) o = n[l], wt[o] && (u = 1, o = o === "transformOrigin" ? J : I), Pt(r, o);
            u && (Pt(r, I), s && (s.svg && r.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", me(r, 1), s.uncache = 1, Ii(i)))
        }
    },
    Ae = {
        clearProps: function(t, e, r, i, n) {
            if (n.data !== "isFromStart") {
                var s = t._pt = new Z(t._pt, e, r, 0, 0, ss);
                return s.u = i, s.pr = -10, s.tween = n, t._props.push(r), 1
            }
        }
    },
    pe = [1, 0, 0, 1, 0, 0],
    Ni = {},
    Wi = function(t) {
        return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t
    },
    qr = function(t) {
        var e = nt(t, I);
        return Wi(e) ? pe : e.substr(7).match(Qr).map(W)
    },
    br = function(t, e) {
        var r = t._gsap || zt(t),
            i = t.style,
            n = qr(t),
            s, o, u, l;
        return r.svg && t.getAttribute("transform") ? (u = t.transform.baseVal.consolidate().matrix, n = [u.a, u.b, u.c, u.d, u.e, u.f], n.join(",") === "1,0,0,1,0,0" ? pe : n) : (n === pe && !t.offsetParent && t !== Gt && !r.svg && (u = i.display, i.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (l = 1, o = t.nextElementSibling, Gt.appendChild(t)), n = qr(t), u ? i.display = u : Pt(t, "display"), l && (o ? s.insertBefore(t, o) : s ? s.appendChild(t) : Gt.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n)
    },
    rr = function(t, e, r, i, n, s) {
        var o = t._gsap,
            u = n || br(t, !0),
            l = o.xOrigin || 0,
            c = o.yOrigin || 0,
            h = o.xOffset || 0,
            d = o.yOffset || 0,
            _ = u[0],
            m = u[1],
            f = u[2],
            p = u[3],
            g = u[4],
            y = u[5],
            w = e.split(" "),
            b = parseFloat(w[0]) || 0,
            v = parseFloat(w[1]) || 0,
            k, S, E, x;
        r ? u !== pe && (S = _ * p - m * f) && (E = b * (p / S) + v * (-f / S) + (f * y - p * g) / S, x = b * (-m / S) + v * (_ / S) - (_ * y - m * g) / S, b = E, v = x) : (k = Fi(t), b = k.x + (~w[0].indexOf("%") ? b / 100 * k.width : b), v = k.y + (~(w[1] || w[0]).indexOf("%") ? v / 100 * k.height : v)), i || i !== !1 && o.smooth ? (g = b - l, y = v - c, o.xOffset = h + (g * _ + y * f) - g, o.yOffset = d + (g * m + y * p) - y) : o.xOffset = o.yOffset = 0, o.xOrigin = b, o.yOrigin = v, o.smooth = !!i, o.origin = e, o.originIsAbsolute = !!r, t.style[J] = "0px 0px", s && (Tt(s, o, "xOrigin", l, b), Tt(s, o, "yOrigin", c, v), Tt(s, o, "xOffset", h, o.xOffset), Tt(s, o, "yOffset", d, o.yOffset)), t.setAttribute("data-svg-origin", b + " " + v)
    },
    me = function(t, e) {
        var r = t._gsap || new Si(t);
        if ("x" in r && !e && !r.uncache) return r;
        var i = t.style,
            n = r.scaleX < 0,
            s = "px",
            o = "deg",
            u = getComputedStyle(t),
            l = nt(t, J) || "0",
            c, h, d, _, m, f, p, g, y, w, b, v, k, S, E, x, P, q, z, L, B, U, V, N, ut, Wt, Jt, te, Ct, xr, mt, Lt;
        return c = h = d = f = p = g = y = w = b = 0, _ = m = 1, r.svg = !!(t.getCTM && qi(t)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (i[I] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[I] !== "none" ? u[I] : "")), i.scale = i.rotate = i.translate = "none"), S = br(t, r.svg), r.svg && (r.uncache ? (ut = t.getBBox(), l = r.xOrigin - ut.x + "px " + (r.yOrigin - ut.y) + "px", N = "") : N = !e && t.getAttribute("data-svg-origin"), rr(t, N || l, !!N || r.originIsAbsolute, r.smooth !== !1, S)), v = r.xOrigin || 0, k = r.yOrigin || 0, S !== pe && (q = S[0], z = S[1], L = S[2], B = S[3], c = U = S[4], h = V = S[5], S.length === 6 ? (_ = Math.sqrt(q * q + z * z), m = Math.sqrt(B * B + L * L), f = q || z ? Yt(z, q) * Rt : 0, y = L || B ? Yt(L, B) * Rt + f : 0, y && (m *= Math.abs(Math.cos(y * jt))), r.svg && (c -= v - (v * q + k * L), h -= k - (v * z + k * B))) : (Lt = S[6], xr = S[7], Jt = S[8], te = S[9], Ct = S[10], mt = S[11], c = S[12], h = S[13], d = S[14], E = Yt(Lt, Ct), p = E * Rt, E && (x = Math.cos(-E), P = Math.sin(-E), N = U * x + Jt * P, ut = V * x + te * P, Wt = Lt * x + Ct * P, Jt = U * -P + Jt * x, te = V * -P + te * x, Ct = Lt * -P + Ct * x, mt = xr * -P + mt * x, U = N, V = ut, Lt = Wt), E = Yt(-L, Ct), g = E * Rt, E && (x = Math.cos(-E), P = Math.sin(-E), N = q * x - Jt * P, ut = z * x - te * P, Wt = L * x - Ct * P, mt = B * P + mt * x, q = N, z = ut, L = Wt), E = Yt(z, q), f = E * Rt, E && (x = Math.cos(E), P = Math.sin(E), N = q * x + z * P, ut = U * x + V * P, z = z * x - q * P, V = V * x - U * P, q = N, U = ut), p && Math.abs(p) + Math.abs(f) > 359.9 && (p = f = 0, g = 180 - g), _ = W(Math.sqrt(q * q + z * z + L * L)), m = W(Math.sqrt(V * V + Lt * Lt)), E = Yt(U, V), y = Math.abs(E) > 2e-4 ? E * Rt : 0, b = mt ? 1 / (mt < 0 ? -mt : mt) : 0), r.svg && (N = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !Wi(nt(t, I)), N && t.setAttribute("transform", N))), Math.abs(y) > 90 && Math.abs(y) < 270 && (n ? (_ *= -1, y += f <= 0 ? 180 : -180, f += f <= 0 ? 180 : -180) : (m *= -1, y += y <= 0 ? 180 : -180)), e = e || r.uncache, r.x = c - ((r.xPercent = c && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + s, r.y = h - ((r.yPercent = h && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + s, r.z = d + s, r.scaleX = W(_), r.scaleY = W(m), r.rotation = W(f) + o, r.rotationX = W(p) + o, r.rotationY = W(g) + o, r.skewX = y + o, r.skewY = w + o, r.transformPerspective = b + s, (r.zOrigin = parseFloat(l.split(" ")[2]) || !e && r.zOrigin || 0) && (i[J] = Ce(l)), r.xOffset = r.yOffset = 0, r.force3D = st.force3D, r.renderTransform = r.svg ? as : Bi ? Yi : os, r.uncache = 0, r
    },
    Ce = function(t) {
        return (t = t.split(" "))[0] + " " + t[1]
    },
    We = function(t, e, r) {
        var i = j(e);
        return W(parseFloat(e) + parseFloat(Ot(t, "x", r + "px", i))) + i
    },
    os = function(t, e) {
        e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Yi(t, e)
    },
    Mt = "0deg",
    ee = "0px",
    Dt = ") ",
    Yi = function(t, e) {
        var r = e || this,
            i = r.xPercent,
            n = r.yPercent,
            s = r.x,
            o = r.y,
            u = r.z,
            l = r.rotation,
            c = r.rotationY,
            h = r.rotationX,
            d = r.skewX,
            _ = r.skewY,
            m = r.scaleX,
            f = r.scaleY,
            p = r.transformPerspective,
            g = r.force3D,
            y = r.target,
            w = r.zOrigin,
            b = "",
            v = g === "auto" && t && t !== 1 || g === !0;
        if (w && (h !== Mt || c !== Mt)) {
            var k = parseFloat(c) * jt,
                S = Math.sin(k),
                E = Math.cos(k),
                x;
            k = parseFloat(h) * jt, x = Math.cos(k), s = We(y, s, S * x * -w), o = We(y, o, -Math.sin(k) * -w), u = We(y, u, E * x * -w + w)
        }
        p !== ee && (b += "perspective(" + p + Dt), (i || n) && (b += "translate(" + i + "%, " + n + "%) "), (v || s !== ee || o !== ee || u !== ee) && (b += u !== ee || v ? "translate3d(" + s + ", " + o + ", " + u + ") " : "translate(" + s + ", " + o + Dt), l !== Mt && (b += "rotate(" + l + Dt), c !== Mt && (b += "rotateY(" + c + Dt), h !== Mt && (b += "rotateX(" + h + Dt), (d !== Mt || _ !== Mt) && (b += "skew(" + d + ", " + _ + Dt), (m !== 1 || f !== 1) && (b += "scale(" + m + ", " + f + Dt), y.style[I] = b || "translate(0, 0)"
    },
    as = function(t, e) {
        var r = e || this,
            i = r.xPercent,
            n = r.yPercent,
            s = r.x,
            o = r.y,
            u = r.rotation,
            l = r.skewX,
            c = r.skewY,
            h = r.scaleX,
            d = r.scaleY,
            _ = r.target,
            m = r.xOrigin,
            f = r.yOrigin,
            p = r.xOffset,
            g = r.yOffset,
            y = r.forceCSS,
            w = parseFloat(s),
            b = parseFloat(o),
            v, k, S, E, x;
        u = parseFloat(u), l = parseFloat(l), c = parseFloat(c), c && (c = parseFloat(c), l += c, u += c), u || l ? (u *= jt, l *= jt, v = Math.cos(u) * h, k = Math.sin(u) * h, S = Math.sin(u - l) * -d, E = Math.cos(u - l) * d, l && (c *= jt, x = Math.tan(l - c), x = Math.sqrt(1 + x * x), S *= x, E *= x, c && (x = Math.tan(c), x = Math.sqrt(1 + x * x), v *= x, k *= x)), v = W(v), k = W(k), S = W(S), E = W(E)) : (v = h, E = d, k = S = 0), (w && !~(s + "").indexOf("px") || b && !~(o + "").indexOf("px")) && (w = Ot(_, "x", s, "px"), b = Ot(_, "y", o, "px")), (m || f || p || g) && (w = W(w + m - (m * v + f * S) + p), b = W(b + f - (m * k + f * E) + g)), (i || n) && (x = _.getBBox(), w = W(w + i / 100 * x.width), b = W(b + n / 100 * x.height)), x = "matrix(" + v + "," + k + "," + S + "," + E + "," + w + "," + b + ")", _.setAttribute("transform", x), y && (_.style[I] = x)
    },
    us = function(t, e, r, i, n) {
        var s = 360,
            o = X(n),
            u = parseFloat(n) * (o && ~n.indexOf("rad") ? Rt : 1),
            l = u - i,
            c = i + l + "deg",
            h, d;
        return o && (h = n.split("_")[1], h === "short" && (l %= s, l !== l % (s / 2) && (l += l < 0 ? s : -s)), h === "cw" && l < 0 ? l = (l + s * Dr) % s - ~~(l / s) * s : h === "ccw" && l > 0 && (l = (l - s * Dr) % s - ~~(l / s) * s)), t._pt = d = new Z(t._pt, e, r, i, l, Un), d.e = c, d.u = "deg", t._props.push(r), d
    },
    Nr = function(t, e) {
        for (var r in e) t[r] = e[r];
        return t
    },
    ls = function(t, e, r) {
        var i = Nr({}, r._gsap),
            n = "perspective,force3D,transformOrigin,svgOrigin",
            s = r.style,
            o, u, l, c, h, d, _, m;
        i.svg ? (l = r.getAttribute("transform"), r.setAttribute("transform", ""), s[I] = e, o = me(r, 1), Pt(r, I), r.setAttribute("transform", l)) : (l = getComputedStyle(r)[I], s[I] = e, o = me(r, 1), s[I] = l);
        for (u in wt) l = i[u], c = o[u], l !== c && n.indexOf(u) < 0 && (_ = j(l), m = j(c), h = _ !== m ? Ot(r, u, l, m) : parseFloat(l), d = parseFloat(c), t._pt = new Z(t._pt, o, u, h, d - h, Je), t._pt.u = m || 0, t._props.push(u));
        Nr(o, i)
    };
Q("padding,margin,Width,Radius", function(a, t) {
    var e = "Top",
        r = "Right",
        i = "Bottom",
        n = "Left",
        s = (t < 3 ? [e, r, i, n] : [e + n, e + r, i + r, i + n]).map(function(o) {
            return t < 2 ? a + o : "border" + o + a
        });
    Ae[t > 1 ? "border" + a : a] = function(o, u, l, c, h) {
        var d, _;
        if (arguments.length < 4) return d = s.map(function(m) {
            return yt(o, m, l)
        }), _ = d.join(" "), _.split(d[0]).length === 5 ? d[0] : _;
        d = (c + "").split(" "), _ = {}, s.forEach(function(m, f) {
            return _[m] = d[f] = d[f] || d[(f - 1) / 2 | 0]
        }), o.init(u, _, h)
    }
});
var Vi = {
    name: "css",
    register: er,
    targetTest: function(t) {
        return t.style && t.nodeType
    },
    init: function(t, e, r, i, n) {
        var s = this._props,
            o = t.style,
            u = r.vars.startAt,
            l, c, h, d, _, m, f, p, g, y, w, b, v, k, S, E, x;
        yr || er(), this.styles = this.styles || zi(t), E = this.styles.props, this.tween = r;
        for (f in e)
            if (f !== "autoRound" && (c = e[f], !(et[f] && Ei(f, e, r, i, t, n)))) {
                if (_ = typeof c, m = Ae[f], _ === "function" && (c = c.call(r, i, t, n), _ = typeof c), _ === "string" && ~c.indexOf("random(") && (c = he(c)), m) m(this, t, f, c, r) && (S = 1);
                else if (f.substr(0, 2) === "--") l = (getComputedStyle(t).getPropertyValue(f) + "").trim(), c += "", Et.lastIndex = 0, Et.test(l) || (p = j(l), g = j(c), g ? p !== g && (l = Ot(t, f, l, g) + g) : p && (c += p)), this.add(o, "setProperty", l, c, i, n, 0, 0, f), s.push(f), E.push(f, 0, o[f]);
                else if (_ !== "undefined") {
                    if (u && f in u ? (l = typeof u[f] == "function" ? u[f].call(r, i, t, n) : u[f], X(l) && ~l.indexOf("random(") && (l = he(l)), j(l + "") || l === "auto" || (l += st.units[f] || j(yt(t, f)) || ""), (l + "").charAt(1) === "=" && (l = yt(t, f))) : l = yt(t, f), d = parseFloat(l), y = _ === "string" && c.charAt(1) === "=" && c.substr(0, 2), y && (c = c.substr(2)), h = parseFloat(c), f in _t && (f === "autoAlpha" && (d === 1 && yt(t, "visibility") === "hidden" && h && (d = 0), E.push("visibility", 0, o.visibility), Tt(this, o, "visibility", d ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), f !== "scale" && f !== "transform" && (f = _t[f], ~f.indexOf(",") && (f = f.split(",")[0]))), w = f in wt, w) {
                        if (this.styles.save(f), x = c, _ === "string" && c.substring(0, 6) === "var(--") {
                            if (c = nt(t, c.substring(4, c.indexOf(")"))), c.substring(0, 5) === "calc(") {
                                var P = t.style.perspective;
                                t.style.perspective = c, c = nt(t, "perspective"), P ? t.style.perspective = P : Pt(t, "perspective")
                            }
                            h = parseFloat(c)
                        }
                        if (b || (v = t._gsap, v.renderTransform && !e.parseTransform || me(t, e.parseTransform), k = e.smoothOrigin !== !1 && v.smooth, b = this._pt = new Z(this._pt, o, I, 0, 1, v.renderTransform, v, 0, -1), b.dep = 1), f === "scale") this._pt = new Z(this._pt, v, "scaleY", v.scaleY, (y ? Xt(v.scaleY, y + h) : h) - v.scaleY || 0, Je), this._pt.u = 0, s.push("scaleY", f), f += "X";
                        else if (f === "transformOrigin") {
                            E.push(J, 0, o[J]), c = ns(c), v.svg ? rr(t, c, 0, k, 0, this) : (g = parseFloat(c.split(" ")[2]) || 0, g !== v.zOrigin && Tt(this, v, "zOrigin", v.zOrigin, g), Tt(this, o, f, Ce(l), Ce(c)));
                            continue
                        } else if (f === "svgOrigin") {
                            rr(t, c, 1, k, 0, this);
                            continue
                        } else if (f in Ni) {
                            us(this, v, f, d, y ? Xt(d, y + c) : c);
                            continue
                        } else if (f === "smoothOrigin") {
                            Tt(this, v, "smooth", v.smooth, c);
                            continue
                        } else if (f === "force3D") {
                            v[f] = c;
                            continue
                        } else if (f === "transform") {
                            ls(this, c, t);
                            continue
                        }
                    } else f in o || (f = Zt(f) || f);
                    if (w || (h || h === 0) && (d || d === 0) && !Vn.test(c) && f in o) p = (l + "").substr((d + "").length), h || (h = 0), g = j(c) || (f in st.units ? st.units[f] : p), p !== g && (d = Ot(t, f, l, g)), this._pt = new Z(this._pt, w ? v : o, f, d, (y ? Xt(d, y + h) : h) - d, !w && (g === "px" || f === "zIndex") && e.autoRound !== !1 ? jn : Je), this._pt.u = g || 0, w && x !== c ? (this._pt.b = l, this._pt.e = x, this._pt.r = Gn) : p !== g && g !== "%" && (this._pt.b = l, this._pt.r = Xn);
                    else if (f in o) is.call(this, t, f, l, y ? y + c : c);
                    else if (f in t) this.add(t, f, l || t[f], y ? y + c : c, i, n);
                    else if (f !== "parseTransform") {
                        ur(f, c);
                        continue
                    }
                    w || (f in o ? E.push(f, 0, o[f]) : typeof t[f] == "function" ? E.push(f, 2, t[f]()) : E.push(f, 1, l || t[f])), s.push(f)
                }
            } S && Li(this)
    },
    render: function(t, e) {
        if (e.tween._time || !vr())
            for (var r = e._pt; r;) r.r(t, r.d), r = r._next;
        else e.styles.revert()
    },
    get: yt,
    aliases: _t,
    getSetter: function(t, e, r) {
        var i = _t[e];
        return i && i.indexOf(",") < 0 && (e = i), e in wt && e !== J && (t._gsap.x || yt(t, "x")) ? r && Mr === r ? e === "scale" ? Qn : Kn : (Mr = r || {}) && (e === "scale" ? Zn : Jn) : t.style && !sr(t.style[e]) ? Hn : ~e.indexOf("-") ? $n : mr(t, e)
    },
    core: {
        _removeProperty: Pt,
        _getMatrix: br
    }
};
tt.utils.checkPrefix = Zt;
tt.core.getStyleSaver = zi;
(function(a, t, e, r) {
    var i = Q(a + "," + t + "," + e, function(n) {
        wt[n] = 1
    });
    Q(t, function(n) {
        st.units[n] = "deg", Ni[n] = 1
    }), _t[i[13]] = a + "," + t, Q(r, function(n) {
        var s = n.split(":");
        _t[s[1]] = i[s[0]]
    })
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Q("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(a) {
    st.units[a] = "px"
});
tt.registerPlugin(Vi);
var T = tt.registerPlugin(Vi) || tt;
T.core.Tween;

