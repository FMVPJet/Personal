class ge extends W {
    formData;
    loader;
    constructor(t, n, o, r, i, u, a, c, d, l) {
        super(fe, {
            cancelable: !0
        }, t, n, o, r, i, u, a, c), this.formData = d, this.loader = l.bind(this, this), Object.defineProperties(this, {
            formData: {
                enumerable: !0
            },
            loader: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
