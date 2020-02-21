var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    format: function(e, n) {
        if ("number" != typeof e) return e;
        var o = new Date(e), r = o.getFullYear(), i = t(o.getMonth() + 1), u = t(o.getDate()), g = t(o.getHours()), a = t(o.getMinutes()), s = t(o.getSeconds());
        return "dt" == n ? [ r, i, u ].join("-") + " " + [ g, a, s ].join(":") : "cn" == n ? r + "年" + i + "月" + u + "日 " : "/" == n ? [ r, i, u ].join("/") : ":" == n ? [ g, a ].join(":") : "[]" == n ? [ r, i, u ] : [ r, i, u ].join("-");
    }
};