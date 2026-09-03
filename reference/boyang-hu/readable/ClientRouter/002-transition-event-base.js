class W extends Event {
    from;
    to;
    direction;
    navigationType;
    sourceElement;
    info;
    newDocument;
    signal;
    constructor(t, n, o, r, i, u, a, c, d, l) {
        super(t, n), this.from = o, this.to = r, this.direction = i, this.navigationType = u, this.sourceElement = a, this.info = c, this.newDocument = d, this.signal = l, Object.defineProperties(this, {
            from: {
                enumerable: !0
            },
            to: {
                enumerable: !0,
                writable: !0
            },
            direction: {
                enumerable: !0,
                writable: !0
            },
            navigationType: {
                enumerable: !0
            },
            sourceElement: {
                enumerable: !0
            },
            info: {
                enumerable: !0
            },
            newDocument: {
                enumerable: !0,
                writable: !0
            },
            signal: {
                enumerable: !0
            }
        })
    }
}
