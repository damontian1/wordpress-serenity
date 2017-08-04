!function(e, t) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", [ "jquery" ], function(i) {
        return t(e, i);
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery);
}(window, function(e, t) {
    "use strict";
    function i(i, o, r) {
        function l(e, t, s) {
            var n, o = "$()." + i + '("' + t + '")';
            return e.each(function(e, l) {
                var c = r.data(l, i);
                if (c) {
                    var h = c[t];
                    if (h && "_" != t.charAt(0)) {
                        var d = h.apply(c, s);
                        n = void 0 === n ? d : n;
                    } else a(o + " is not a valid method");
                } else a(i + " not initialized. Cannot call methods, i.e. " + o);
            }), void 0 !== n ? n : e;
        }
        function c(e, t) {
            e.each(function(e, s) {
                var n = r.data(s, i);
                n ? (n.option(t), n._init()) : (n = new o(s, t), r.data(s, i, n));
            });
        }
        (r = r || t || e.jQuery) && (o.prototype.option || (o.prototype.option = function(e) {
            r.isPlainObject(e) && (this.options = r.extend(!0, this.options, e));
        }), r.fn[i] = function(e) {
            return "string" == typeof e ? l(this, e, n.call(arguments, 1)) : (c(this, e), this);
        }, s(r));
    }
    function s(e) {
        !e || e && e.bridget || (e.bridget = i);
    }
    var n = Array.prototype.slice, o = e.console, a = void 0 === o ? function() {} : function(e) {
        o.error(e);
    };
    return s(t || e.jQuery), i;
}), function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t();
}("undefined" != typeof window ? window : this, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, s = i[e] = i[e] || [];
            return -1 == s.indexOf(t) && s.push(t), this;
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[e] = i[e] || {})[t] = !0, this;
        }
    }, t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var s = i.indexOf(t);
            return -1 != s && i.splice(s, 1), this;
        }
    }, t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var s = 0, n = i[s];
            t = t || [];
            for (var o = this._onceEvents && this._onceEvents[e]; n; ) {
                var a = o && o[n];
                a && (this.off(e, n), delete o[n]), n.apply(this, t), n = i[s += a ? 0 : 1];
            }
            return this;
        }
    }, e;
}), function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return t();
    }) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t();
}(window, function() {
    "use strict";
    function e(e) {
        var t = parseFloat(e);
        return -1 == e.indexOf("%") && !isNaN(t) && t;
    }
    function t() {}
    function i() {
        for (var e = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, t = 0; t < c; t++) e[l[t]] = 0;
        return e;
    }
    function s(e) {
        var t = getComputedStyle(e);
        return t || r("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), 
        t;
    }
    function n() {
        if (!h) {
            h = !0;
            var t = document.createElement("div");
            t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", 
            t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(t);
            var n = s(t);
            o.isBoxSizeOuter = a = 200 == e(n.width), i.removeChild(t);
        }
    }
    function o(t) {
        if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
            var o = s(t);
            if ("none" == o.display) return i();
            var r = {};
            r.width = t.offsetWidth, r.height = t.offsetHeight;
            for (var h = r.isBorderBox = "border-box" == o.boxSizing, d = 0; d < c; d++) {
                var u = l[d], p = o[u], f = parseFloat(p);
                r[u] = isNaN(f) ? 0 : f;
            }
            var m = r.paddingLeft + r.paddingRight, g = r.paddingTop + r.paddingBottom, v = r.marginLeft + r.marginRight, w = r.marginTop + r.marginBottom, y = r.borderLeftWidth + r.borderRightWidth, b = r.borderTopWidth + r.borderBottomWidth, _ = h && a, x = e(o.width);
            !1 !== x && (r.width = x + (_ ? 0 : m + y));
            var S = e(o.height);
            return !1 !== S && (r.height = S + (_ ? 0 : g + b)), r.innerWidth = r.width - (m + y), 
            r.innerHeight = r.height - (g + b), r.outerWidth = r.width + v, r.outerHeight = r.height + w, 
            r;
        }
    }
    var a, r = "undefined" == typeof console ? t : function(e) {
        console.error(e);
    }, l = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ], c = l.length, h = !1;
    return o;
}), function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t();
}(window, function() {
    "use strict";
    var e = function() {
        var e = window.Element.prototype;
        if (e.matches) return "matches";
        if (e.matchesSelector) return "matchesSelector";
        for (var t = [ "webkit", "moz", "ms", "o" ], i = 0; i < t.length; i++) {
            var s = t[i] + "MatchesSelector";
            if (e[s]) return s;
        }
    }();
    return function(t, i) {
        return t[e](i);
    };
}), function(e, t) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", [ "desandro-matches-selector/matches-selector" ], function(i) {
        return t(e, i);
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector);
}(window, function(e, t) {
    var i = {};
    i.extend = function(e, t) {
        for (var i in t) e[i] = t[i];
        return e;
    }, i.modulo = function(e, t) {
        return (e % t + t) % t;
    }, i.makeArray = function(e) {
        var t = [];
        if (Array.isArray(e)) t = e; else if (e && "object" == typeof e && "number" == typeof e.length) for (var i = 0; i < e.length; i++) t.push(e[i]); else t.push(e);
        return t;
    }, i.removeFrom = function(e, t) {
        var i = e.indexOf(t);
        -1 != i && e.splice(i, 1);
    }, i.getParent = function(e, i) {
        for (;e.parentNode && e != document.body; ) if (e = e.parentNode, t(e, i)) return e;
    }, i.getQueryElement = function(e) {
        return "string" == typeof e ? document.querySelector(e) : e;
    }, i.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
    }, i.filterFindElements = function(e, s) {
        var n = [];
        return (e = i.makeArray(e)).forEach(function(e) {
            if (e instanceof HTMLElement) if (s) {
                t(e, s) && n.push(e);
                for (var i = e.querySelectorAll(s), o = 0; o < i.length; o++) n.push(i[o]);
            } else n.push(e);
        }), n;
    }, i.debounceMethod = function(e, t, i) {
        var s = e.prototype[t], n = t + "Timeout";
        e.prototype[t] = function() {
            var e = this[n];
            e && clearTimeout(e);
            var t = arguments, o = this;
            this[n] = setTimeout(function() {
                s.apply(o, t), delete o[n];
            }, i || 100);
        };
    }, i.docReady = function(e) {
        var t = document.readyState;
        "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e);
    }, i.toDashed = function(e) {
        return e.replace(/(.)([A-Z])/g, function(e, t, i) {
            return t + "-" + i;
        }).toLowerCase();
    };
    var s = e.console;
    return i.htmlInit = function(t, n) {
        i.docReady(function() {
            var o = i.toDashed(n), a = "data-" + o, r = document.querySelectorAll("[" + a + "]"), l = document.querySelectorAll(".js-" + o), c = i.makeArray(r).concat(i.makeArray(l)), h = a + "-options", d = e.jQuery;
            c.forEach(function(e) {
                var i, o = e.getAttribute(a) || e.getAttribute(h);
                try {
                    i = o && JSON.parse(o);
                } catch (t) {
                    return void (s && s.error("Error parsing " + a + " on " + e.className + ": " + t));
                }
                var r = new t(e, i);
                d && d.data(e, n, r);
            });
        });
    }, i;
}), function(e, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", [ "ev-emitter/ev-emitter", "get-size/get-size" ], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, 
    e.Outlayer.Item = t(e.EvEmitter, e.getSize));
}(window, function(e, t) {
    "use strict";
    function i(e) {
        for (var t in e) return !1;
        return null, !0;
    }
    function s(e, t) {
        e && (this.element = e, this.layout = t, this.position = {
            x: 0,
            y: 0
        }, this._create());
    }
    var n = document.documentElement.style, o = "string" == typeof n.transition ? "transition" : "WebkitTransition", a = "string" == typeof n.transform ? "transform" : "WebkitTransform", r = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[o], l = {
        transform: a,
        transition: o,
        transitionDuration: o + "Duration",
        transitionProperty: o + "Property",
        transitionDelay: o + "Delay"
    }, c = s.prototype = Object.create(e.prototype);
    c.constructor = s, c._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        });
    }, c.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
    }, c.getSize = function() {
        this.size = t(this.element);
    }, c.css = function(e) {
        var t = this.element.style;
        for (var i in e) t[l[i] || i] = e[i];
    }, c.getPosition = function() {
        var e = getComputedStyle(this.element), t = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), s = e[t ? "left" : "right"], n = e[i ? "top" : "bottom"], o = this.layout.size, a = -1 != s.indexOf("%") ? parseFloat(s) / 100 * o.width : parseInt(s, 10), r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * o.height : parseInt(n, 10);
        a = isNaN(a) ? 0 : a, r = isNaN(r) ? 0 : r, a -= t ? o.paddingLeft : o.paddingRight, 
        r -= i ? o.paddingTop : o.paddingBottom, this.position.x = a, this.position.y = r;
    }, c.layoutPosition = function() {
        var e = this.layout.size, t = {}, i = this.layout._getOption("originLeft"), s = this.layout._getOption("originTop"), n = i ? "paddingLeft" : "paddingRight", o = i ? "left" : "right", a = i ? "right" : "left", r = this.position.x + e[n];
        t[o] = this.getXValue(r), t[a] = "";
        var l = s ? "paddingTop" : "paddingBottom", c = s ? "top" : "bottom", h = s ? "bottom" : "top", d = this.position.y + e[l];
        t[c] = this.getYValue(d), t[h] = "", this.css(t), this.emitEvent("layout", [ this ]);
    }, c.getXValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px";
    }, c.getYValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px";
    }, c._transitionTo = function(e, t) {
        this.getPosition();
        var i = this.position.x, s = this.position.y, n = parseInt(e, 10), o = parseInt(t, 10), a = n === this.position.x && o === this.position.y;
        if (this.setPosition(e, t), !a || this.isTransitioning) {
            var r = e - i, l = t - s, c = {};
            c.transform = this.getTranslate(r, l), this.transition({
                to: c,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            });
        } else this.layoutPosition();
    }, c.getTranslate = function(e, t) {
        var i = this.layout._getOption("originLeft"), s = this.layout._getOption("originTop");
        return e = i ? e : -e, t = s ? t : -t, "translate3d(" + e + "px, " + t + "px, 0)";
    }, c.goTo = function(e, t) {
        this.setPosition(e, t), this.layoutPosition();
    }, c.moveTo = c._transitionTo, c.setPosition = function(e, t) {
        this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10);
    }, c._nonTransition = function(e) {
        this.css(e.to), e.isCleaning && this._removeStyles(e.to);
        for (var t in e.onTransitionEnd) e.onTransitionEnd[t].call(this);
    }, c.transition = function(e) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var t = this._transn;
            for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
            for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
            if (e.from) {
                this.css(e.from);
                this.element.offsetHeight;
                null;
            }
            this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0;
        } else this._nonTransition(e);
    };
    var h = "opacity," + function(e) {
        return e.replace(/([A-Z])/g, function(e) {
            return "-" + e.toLowerCase();
        });
    }(a);
    c.enableTransition = function() {
        if (!this.isTransitioning) {
            var e = this.layout.options.transitionDuration;
            e = "number" == typeof e ? e + "ms" : e, this.css({
                transitionProperty: h,
                transitionDuration: e,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(r, this, !1);
        }
    }, c.onwebkitTransitionEnd = function(e) {
        this.ontransitionend(e);
    }, c.onotransitionend = function(e) {
        this.ontransitionend(e);
    };
    var d = {
        "-webkit-transform": "transform"
    };
    c.ontransitionend = function(e) {
        if (e.target === this.element) {
            var t = this._transn, s = d[e.propertyName] || e.propertyName;
            delete t.ingProperties[s], i(t.ingProperties) && this.disableTransition(), s in t.clean && (this.element.style[e.propertyName] = "", 
            delete t.clean[s]), s in t.onEnd && (t.onEnd[s].call(this), delete t.onEnd[s]), 
            this.emitEvent("transitionEnd", [ this ]);
        }
    }, c.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(r, this, !1), this.isTransitioning = !1;
    }, c._removeStyles = function(e) {
        var t = {};
        for (var i in e) t[i] = "";
        this.css(t);
    };
    var u = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return c.removeTransitionStyles = function() {
        this.css(u);
    }, c.stagger = function(e) {
        e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms";
    }, c.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [ this ]);
    }, c.remove = function() {
        o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem();
        }), this.hide()) : this.removeElem();
    }, c.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var e = this.layout.options, t = {};
        t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, 
        this.transition({
            from: e.hiddenStyle,
            to: e.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        });
    }, c.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal");
    }, c.getHideRevealTransitionEndProperty = function(e) {
        var t = this.layout.options[e];
        if (t.opacity) return "opacity";
        for (var i in t) return i;
    }, c.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var e = this.layout.options, t = {};
        t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, 
        this.transition({
            from: e.visibleStyle,
            to: e.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        });
    }, c.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"));
    }, c.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        });
    }, s;
}), function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item" ], function(i, s, n, o) {
        return t(e, i, s, n, o);
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item);
}(window, function(e, t, i, s, n) {
    "use strict";
    function o(e, t) {
        var i = s.getQueryElement(e);
        if (i) {
            this.element = i, c && (this.$element = c(this.element)), this.options = s.extend({}, this.constructor.defaults), 
            this.option(t);
            var n = ++d;
            this.element.outlayerGUID = n, u[n] = this, this._create(), this._getOption("initLayout") && this.layout();
        } else l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || e));
    }
    function a(e) {
        function t() {
            e.apply(this, arguments);
        }
        return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t;
    }
    function r(e) {
        if ("number" == typeof e) return e;
        var t = e.match(/(^\d*\.?\d*)(\w*)/), i = t && t[1], s = t && t[2];
        return i.length ? (i = parseFloat(i)) * (f[s] || 1) : 0;
    }
    var l = e.console, c = e.jQuery, h = function() {}, d = 0, u = {};
    o.namespace = "outlayer", o.Item = n, o.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var p = o.prototype;
    s.extend(p, t.prototype), p.option = function(e) {
        s.extend(this.options, e);
    }, p._getOption = function(e) {
        var t = this.constructor.compatOptions[e];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[e];
    }, o.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, p._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), s.extend(this.element.style, this.options.containerStyle), 
        this._getOption("resize") && this.bindResize();
    }, p.reloadItems = function() {
        this.items = this._itemize(this.element.children);
    }, p._itemize = function(e) {
        for (var t = this._filterFindItemElements(e), i = this.constructor.Item, s = [], n = 0; n < t.length; n++) {
            var o = new i(t[n], this);
            s.push(o);
        }
        return s;
    }, p._filterFindItemElements = function(e) {
        return s.filterFindElements(e, this.options.itemSelector);
    }, p.getItemElements = function() {
        return this.items.map(function(e) {
            return e.element;
        });
    }, p.layout = function() {
        this._resetLayout(), this._manageStamps();
        var e = this._getOption("layoutInstant"), t = void 0 !== e ? e : !this._isLayoutInited;
        this.layoutItems(this.items, t), this._isLayoutInited = !0;
    }, p._init = p.layout, p._resetLayout = function() {
        this.getSize();
    }, p.getSize = function() {
        this.size = i(this.element);
    }, p._getMeasurement = function(e, t) {
        var s, n = this.options[e];
        n ? ("string" == typeof n ? s = this.element.querySelector(n) : n instanceof HTMLElement && (s = n), 
        this[e] = s ? i(s)[t] : n) : this[e] = 0;
    }, p.layoutItems = function(e, t) {
        e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout();
    }, p._getItemsForLayout = function(e) {
        return e.filter(function(e) {
            return !e.isIgnored;
        });
    }, p._layoutItems = function(e, t) {
        if (this._emitCompleteOnItems("layout", e), e && e.length) {
            var i = [];
            e.forEach(function(e) {
                var s = this._getItemLayoutPosition(e);
                s.item = e, s.isInstant = t || e.isLayoutInstant, i.push(s);
            }, this), this._processLayoutQueue(i);
        }
    }, p._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        };
    }, p._processLayoutQueue = function(e) {
        this.updateStagger(), e.forEach(function(e, t) {
            this._positionItem(e.item, e.x, e.y, e.isInstant, t);
        }, this);
    }, p.updateStagger = function() {
        var e = this.options.stagger;
        {
            if (null !== e && void 0 !== e) return this.stagger = r(e), this.stagger;
            this.stagger = 0;
        }
    }, p._positionItem = function(e, t, i, s, n) {
        s ? e.goTo(t, i) : (e.stagger(n * this.stagger), e.moveTo(t, i));
    }, p._postLayout = function() {
        this.resizeContainer();
    }, p.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
        }
    }, p._getContainerSize = h, p._setContainerMeasure = function(e, t) {
        if (void 0 !== e) {
            var i = this.size;
            i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), 
            e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px";
        }
    }, p._emitCompleteOnItems = function(e, t) {
        function i() {
            n.dispatchEvent(e + "Complete", null, [ t ]);
        }
        function s() {
            ++a == o && i();
        }
        var n = this, o = t.length;
        if (t && o) {
            var a = 0;
            t.forEach(function(t) {
                t.once(e, s);
            });
        } else i();
    }, p.dispatchEvent = function(e, t, i) {
        var s = t ? [ t ].concat(i) : i;
        if (this.emitEvent(e, s), c) if (this.$element = this.$element || c(this.element), 
        t) {
            var n = c.Event(t);
            n.type = e, this.$element.trigger(n, i);
        } else this.$element.trigger(e, i);
    }, p.ignore = function(e) {
        var t = this.getItem(e);
        t && (t.isIgnored = !0);
    }, p.unignore = function(e) {
        var t = this.getItem(e);
        t && delete t.isIgnored;
    }, p.stamp = function(e) {
        (e = this._find(e)) && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this));
    }, p.unstamp = function(e) {
        (e = this._find(e)) && e.forEach(function(e) {
            s.removeFrom(this.stamps, e), this.unignore(e);
        }, this);
    }, p._find = function(e) {
        if (e) return "string" == typeof e && (e = this.element.querySelectorAll(e)), e = s.makeArray(e);
    }, p._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
    }, p._getBoundingRect = function() {
        var e = this.element.getBoundingClientRect(), t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        };
    }, p._manageStamp = h, p._getElementOffset = function(e) {
        var t = e.getBoundingClientRect(), s = this._boundingRect, n = i(e);
        return {
            left: t.left - s.left - n.marginLeft,
            top: t.top - s.top - n.marginTop,
            right: s.right - t.right - n.marginRight,
            bottom: s.bottom - t.bottom - n.marginBottom
        };
    }, p.handleEvent = s.handleEvent, p.bindResize = function() {
        e.addEventListener("resize", this), this.isResizeBound = !0;
    }, p.unbindResize = function() {
        e.removeEventListener("resize", this), this.isResizeBound = !1;
    }, p.onresize = function() {
        this.resize();
    }, s.debounceMethod(o, "onresize", 100), p.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
    }, p.needsResizeLayout = function() {
        var e = i(this.element);
        return this.size && e && e.innerWidth !== this.size.innerWidth;
    }, p.addItems = function(e) {
        var t = this._itemize(e);
        return t.length && (this.items = this.items.concat(t)), t;
    }, p.appended = function(e) {
        var t = this.addItems(e);
        t.length && (this.layoutItems(t, !0), this.reveal(t));
    }, p.prepended = function(e) {
        var t = this._itemize(e);
        if (t.length) {
            var i = this.items.slice(0);
            this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), 
            this.reveal(t), this.layoutItems(i);
        }
    }, p.reveal = function(e) {
        if (this._emitCompleteOnItems("reveal", e), e && e.length) {
            var t = this.updateStagger();
            e.forEach(function(e, i) {
                e.stagger(i * t), e.reveal();
            });
        }
    }, p.hide = function(e) {
        if (this._emitCompleteOnItems("hide", e), e && e.length) {
            var t = this.updateStagger();
            e.forEach(function(e, i) {
                e.stagger(i * t), e.hide();
            });
        }
    }, p.revealItemElements = function(e) {
        var t = this.getItems(e);
        this.reveal(t);
    }, p.hideItemElements = function(e) {
        var t = this.getItems(e);
        this.hide(t);
    }, p.getItem = function(e) {
        for (var t = 0; t < this.items.length; t++) {
            var i = this.items[t];
            if (i.element == e) return i;
        }
    }, p.getItems = function(e) {
        var t = [];
        return (e = s.makeArray(e)).forEach(function(e) {
            var i = this.getItem(e);
            i && t.push(i);
        }, this), t;
    }, p.remove = function(e) {
        var t = this.getItems(e);
        this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function(e) {
            e.remove(), s.removeFrom(this.items, e);
        }, this);
    }, p.destroy = function() {
        var e = this.element.style;
        e.height = "", e.position = "", e.width = "", this.items.forEach(function(e) {
            e.destroy();
        }), this.unbindResize();
        var t = this.element.outlayerGUID;
        delete u[t], delete this.element.outlayerGUID, c && c.removeData(this.element, this.constructor.namespace);
    }, o.data = function(e) {
        var t = (e = s.getQueryElement(e)) && e.outlayerGUID;
        return t && u[t];
    }, o.create = function(e, t) {
        var i = a(o);
        return i.defaults = s.extend({}, o.defaults), s.extend(i.defaults, t), i.compatOptions = s.extend({}, o.compatOptions), 
        i.namespace = e, i.data = o.data, i.Item = a(n), s.htmlInit(i, e), c && c.bridget && c.bridget(e, i), 
        i;
    };
    var f = {
        ms: 1,
        s: 1e3
    };
    return o.Item = n, o;
}), function(e, t) {
    "function" == typeof define && define.amd ? define("isotope/js/item", [ "outlayer/outlayer" ], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer")) : (e.Isotope = e.Isotope || {}, 
    e.Isotope.Item = t(e.Outlayer));
}(window, function(e) {
    "use strict";
    function t() {
        e.Item.apply(this, arguments);
    }
    var i = t.prototype = Object.create(e.Item.prototype), s = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, s.call(this), this.sortData = {};
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var e = this.layout.options.getSortData, t = this.layout._sorters;
            for (var i in e) {
                var s = t[i];
                this.sortData[i] = s(this.element, this);
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() {
        n.apply(this, arguments), this.css({
            display: ""
        });
    }, t;
}), function(e, t) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", [ "get-size/get-size", "outlayer/outlayer" ], t) : "object" == typeof module && module.exports ? module.exports = t(require("get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {}, 
    e.Isotope.LayoutMode = t(e.getSize, e.Outlayer));
}(window, function(e, t) {
    "use strict";
    function i(e) {
        this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, 
        this.items = e.filteredItems, this.size = e.size);
    }
    var s = i.prototype;
    return [ "_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption" ].forEach(function(e) {
        s[e] = function() {
            return t.prototype[e].apply(this.isotope, arguments);
        };
    }), s.needsVerticalResizeLayout = function() {
        var t = e(this.isotope.element);
        return this.isotope.size && t && t.innerHeight != this.isotope.size.innerHeight;
    }, s._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments);
    }, s.getColumnWidth = function() {
        this.getSegmentSize("column", "Width");
    }, s.getRowHeight = function() {
        this.getSegmentSize("row", "Height");
    }, s.getSegmentSize = function(e, t) {
        var i = e + t, s = "outer" + t;
        if (this._getMeasurement(i, s), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[s] || this.isotope.size["inner" + t];
        }
    }, s.getFirstItemSize = function() {
        var t = this.isotope.filteredItems[0];
        return t && t.element && e(t.element);
    }, s.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments);
    }, s.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size;
    }, i.modes = {}, i.create = function(e, t) {
        function n() {
            i.apply(this, arguments);
        }
        return n.prototype = Object.create(s), n.prototype.constructor = n, t && (n.options = t), 
        n.prototype.namespace = e, i.modes[e] = n, n;
    }, i;
}), function(e, t) {
    "function" == typeof define && define.amd ? define("masonry/masonry", [ "outlayer/outlayer", "get-size/get-size" ], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize);
}(window, function(e, t) {
    var i = e.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var s = i.prototype;
    return s._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
        this.measureColumns(), this.colYs = [];
        for (var e = 0; e < this.cols; e++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0;
    }, s.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var e = this.items[0], i = e && e.element;
            this.columnWidth = i && t(i).outerWidth || this.containerWidth;
        }
        var s = this.columnWidth += this.gutter, n = this.containerWidth + this.gutter, o = n / s, a = s - n % s, r = a && a < 1 ? "round" : "floor";
        o = Math[r](o), this.cols = Math.max(o, 1);
    }, s.getContainerWidth = function() {
        var e = this._getOption("fitWidth") ? this.element.parentNode : this.element, i = t(e);
        this.containerWidth = i && i.innerWidth;
    }, s._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = e.size.outerWidth % this.columnWidth, i = t && t < 1 ? "round" : "ceil", s = Math[i](e.size.outerWidth / this.columnWidth);
        s = Math.min(s, this.cols);
        for (var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](s, e), o = {
            x: this.columnWidth * n.col,
            y: n.y
        }, a = n.y + e.size.outerHeight, r = s + n.col, l = n.col; l < r; l++) this.colYs[l] = a;
        return o;
    }, s._getTopColPosition = function(e) {
        var t = this._getTopColGroup(e), i = Math.min.apply(Math, t);
        return {
            col: t.indexOf(i),
            y: i
        };
    }, s._getTopColGroup = function(e) {
        if (e < 2) return this.colYs;
        for (var t = [], i = this.cols + 1 - e, s = 0; s < i; s++) t[s] = this._getColGroupY(s, e);
        return t;
    }, s._getColGroupY = function(e, t) {
        if (t < 2) return this.colYs[e];
        var i = this.colYs.slice(e, e + t);
        return Math.max.apply(Math, i);
    }, s._getHorizontalColPosition = function(e, t) {
        var i = this.horizontalColIndex % this.cols;
        i = e > 1 && i + e > this.cols ? 0 : i;
        var s = t.size.outerWidth && t.size.outerHeight;
        return this.horizontalColIndex = s ? i + e : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, e)
        };
    }, s._manageStamp = function(e) {
        var i = t(e), s = this._getElementOffset(e), n = this._getOption("originLeft") ? s.left : s.right, o = n + i.outerWidth, a = Math.floor(n / this.columnWidth);
        a = Math.max(0, a);
        var r = Math.floor(o / this.columnWidth);
        r -= o % this.columnWidth ? 0 : 1, r = Math.min(this.cols - 1, r);
        for (var l = (this._getOption("originTop") ? s.top : s.bottom) + i.outerHeight, c = a; c <= r; c++) this.colYs[c] = Math.max(l, this.colYs[c]);
    }, s._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var e = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), 
        e;
    }, s._getContainerFitWidth = function() {
        for (var e = 0, t = this.cols; --t && 0 === this.colYs[t]; ) e++;
        return (this.cols - e) * this.columnWidth - this.gutter;
    }, s.needsResizeLayout = function() {
        var e = this.containerWidth;
        return this.getContainerWidth(), e != this.containerWidth;
    }, i;
}), function(e, t) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", [ "../layout-mode", "masonry/masonry" ], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode"), require("masonry-layout")) : t(e.Isotope.LayoutMode, e.Masonry);
}(window, function(e, t) {
    "use strict";
    var i = e.create("masonry"), s = i.prototype, n = {
        _getElementOffset: !0,
        layout: !0,
        _getMeasurement: !0
    };
    for (var o in t.prototype) n[o] || (s[o] = t.prototype[o]);
    var a = s.measureColumns;
    s.measureColumns = function() {
        this.items = this.isotope.filteredItems, a.call(this);
    };
    var r = s._getOption;
    return s._getOption = function(e) {
        return "fitWidth" == e ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : r.apply(this.isotope, arguments);
    }, i;
}), function(e, t) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", [ "../layout-mode" ], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode);
}(window, function(e) {
    "use strict";
    var t = e.create("fitRows"), i = t.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth");
    }, i._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = e.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && t + this.x > i && (this.x = 0, this.y = this.maxY);
        var s = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight), this.x += t, 
        s;
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        };
    }, t;
}), function(e, t) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", [ "../layout-mode" ], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode);
}(window, function(e) {
    "use strict";
    var t = e.create("vertical", {
        horizontalAlignment: 0
    }), i = t.prototype;
    return i._resetLayout = function() {
        this.y = 0;
    }, i._getItemLayoutPosition = function(e) {
        e.getSize();
        var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
        return this.y += e.size.outerHeight, {
            x: t,
            y: i
        };
    }, i._getContainerSize = function() {
        return {
            height: this.y
        };
    }, t;
}), function(e, t) {
    "function" == typeof define && define.amd ? define([ "outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical" ], function(i, s, n, o, a, r) {
        return t(e, i, s, n, o, a, r);
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : e.Isotope = t(e, e.Outlayer, e.getSize, e.matchesSelector, e.fizzyUIUtils, e.Isotope.Item, e.Isotope.LayoutMode);
}(window, function(e, t, i, s, n, o, a) {
    function r(e, t) {
        return function(i, s) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n], a = i.sortData[o], r = s.sortData[o];
                if (a > r || a < r) {
                    var l = (void 0 !== t[o] ? t[o] : t) ? 1 : -1;
                    return (a > r ? 1 : -1) * l;
                }
            }
            return 0;
        };
    }
    var l = e.jQuery, c = String.prototype.trim ? function(e) {
        return e.trim();
    } : function(e) {
        return e.replace(/^\s+|\s+$/g, "");
    }, h = t.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0
    });
    h.Item = o, h.LayoutMode = a;
    var d = h.prototype;
    d._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), 
        this.modes = {}, this.filteredItems = this.items, this.sortHistory = [ "original-order" ];
        for (var e in a.modes) this._initLayoutMode(e);
    }, d.reloadItems = function() {
        this.itemGUID = 0, t.prototype.reloadItems.call(this);
    }, d._itemize = function() {
        for (var e = t.prototype._itemize.apply(this, arguments), i = 0; i < e.length; i++) e[i].id = this.itemGUID++;
        return this._updateItemsSortData(e), e;
    }, d._initLayoutMode = function(e) {
        var t = a.modes[e], i = this.options[e] || {};
        this.options[e] = t.options ? n.extend(t.options, i) : i, this.modes[e] = new t(this);
    }, d.layout = function() {
        this._isLayoutInited || !this._getOption("initLayout") ? this._layout() : this.arrange();
    }, d._layout = function() {
        var e = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), 
        this._isLayoutInited = !0;
    }, d.arrange = function(e) {
        this.option(e), this._getIsInstant();
        var t = this._filter(this.items);
        this.filteredItems = t.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [ t ]) : this._hideReveal(t), 
        this._sort(), this._layout();
    }, d._init = d.arrange, d._hideReveal = function(e) {
        this.reveal(e.needReveal), this.hide(e.needHide);
    }, d._getIsInstant = function() {
        var e = this._getOption("layoutInstant"), t = void 0 !== e ? e : !this._isLayoutInited;
        return this._isInstant = t, t;
    }, d._bindArrangeComplete = function() {
        function e() {
            t && i && s && n.dispatchEvent("arrangeComplete", null, [ n.filteredItems ]);
        }
        var t, i, s, n = this;
        this.once("layoutComplete", function() {
            t = !0, e();
        }), this.once("hideComplete", function() {
            i = !0, e();
        }), this.once("revealComplete", function() {
            s = !0, e();
        });
    }, d._filter = function(e) {
        var t = this.options.filter;
        t = t || "*";
        for (var i = [], s = [], n = [], o = this._getFilterTest(t), a = 0; a < e.length; a++) {
            var r = e[a];
            if (!r.isIgnored) {
                var l = o(r);
                l && i.push(r), l && r.isHidden ? s.push(r) : l || r.isHidden || n.push(r);
            }
        }
        return {
            matches: i,
            needReveal: s,
            needHide: n
        };
    }, d._getFilterTest = function(e) {
        return l && this.options.isJQueryFiltering ? function(t) {
            return l(t.element).is(e);
        } : "function" == typeof e ? function(t) {
            return e(t.element);
        } : function(t) {
            return s(t.element, e);
        };
    }, d.updateSortData = function(e) {
        var t;
        e ? (e = n.makeArray(e), t = this.getItems(e)) : t = this.items, this._getSorters(), 
        this._updateItemsSortData(t);
    }, d._getSorters = function() {
        var e = this.options.getSortData;
        for (var t in e) {
            var i = e[t];
            this._sorters[t] = u(i);
        }
    }, d._updateItemsSortData = function(e) {
        for (var t = e && e.length, i = 0; t && i < t; i++) e[i].updateSortData();
    };
    var u = function() {
        function e(e) {
            if ("string" != typeof e) return e;
            var i = c(e).split(" "), s = i[0], n = s.match(/^\[(.+)\]$/), o = t(n && n[1], s), a = h.sortDataParsers[i[1]];
            return e = a ? function(e) {
                return e && a(o(e));
            } : function(e) {
                return e && o(e);
            };
        }
        function t(e, t) {
            return e ? function(t) {
                return t.getAttribute(e);
            } : function(e) {
                var i = e.querySelector(t);
                return i && i.textContent;
            };
        }
        return e;
    }();
    h.sortDataParsers = {
        parseInt: function(e) {
            return parseInt(e, 10);
        },
        parseFloat: function(e) {
            return parseFloat(e);
        }
    }, d._sort = function() {
        if (this.options.sortBy) {
            var e = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(e) || (this.sortHistory = e.concat(this.sortHistory));
            var t = r(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(t);
        }
    }, d._getIsSameSortBy = function(e) {
        for (var t = 0; t < e.length; t++) if (e[t] != this.sortHistory[t]) return !1;
        return !0;
    }, d._mode = function() {
        var e = this.options.layoutMode, t = this.modes[e];
        if (!t) throw new Error("No layout mode: " + e);
        return t.options = this.options[e], t;
    }, d._resetLayout = function() {
        t.prototype._resetLayout.call(this), this._mode()._resetLayout();
    }, d._getItemLayoutPosition = function(e) {
        return this._mode()._getItemLayoutPosition(e);
    }, d._manageStamp = function(e) {
        this._mode()._manageStamp(e);
    }, d._getContainerSize = function() {
        return this._mode()._getContainerSize();
    }, d.needsResizeLayout = function() {
        return this._mode().needsResizeLayout();
    }, d.appended = function(e) {
        var t = this.addItems(e);
        if (t.length) {
            var i = this._filterRevealAdded(t);
            this.filteredItems = this.filteredItems.concat(i);
        }
    }, d.prepended = function(e) {
        var t = this._itemize(e);
        if (t.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(t);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), 
            this.items = t.concat(this.items);
        }
    }, d._filterRevealAdded = function(e) {
        var t = this._filter(e);
        return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), 
        t.matches;
    }, d.insert = function(e) {
        var t = this.addItems(e);
        if (t.length) {
            var i, s, n = t.length;
            for (i = 0; i < n; i++) s = t[i], this.element.appendChild(s.element);
            var o = this._filter(t).matches;
            for (i = 0; i < n; i++) t[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete t[i].isLayoutInstant;
            this.reveal(o);
        }
    };
    var p = d.remove;
    return d.remove = function(e) {
        e = n.makeArray(e);
        var t = this.getItems(e);
        p.call(this, e);
        for (var i = t && t.length, s = 0; i && s < i; s++) {
            var o = t[s];
            n.removeFrom(this.filteredItems, o);
        }
    }, d.shuffle = function() {
        for (var e = 0; e < this.items.length; e++) this.items[e].sortData.random = Math.random();
        this.options.sortBy = "random", this._sort(), this._layout();
    }, d._noTransition = function(e, t) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var s = e.apply(this, t);
        return this.options.transitionDuration = i, s;
    }, d.getFilteredItemElements = function() {
        return this.filteredItems.map(function(e) {
            return e.element;
        });
    }, h;
}), function(e, t) {
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : e.Fresco = t(jQuery);
}(this, function($) {
    function baseToString(e) {
        return "string" == typeof e ? e : null == e ? "" : e + "";
    }
    function Timers() {
        return this.initialize.apply(this, _slice.call(arguments));
    }
    function getURIData(e) {
        var t = {
            type: "image"
        };
        return $.each(Types, function(i, s) {
            var n = s.data(e);
            n && (t = n, t.type = i, t.url = e);
        }), t;
    }
    function detectExtension(e) {
        var t = (e || "").replace(/\?.*/g, "").match(/\.([^.]{3,4})$/);
        return t ? t[1].toLowerCase() : null;
    }
    function View() {
        this.initialize.apply(this, _slice.call(arguments));
    }
    function Thumbnail() {
        this.initialize.apply(this, _slice.call(arguments));
    }
    var Fresco = {};
    $.extend(Fresco, {
        version: "2.2.2"
    }), Fresco.Skins = {
        fresco: {}
    };
    var Bounds = {
        viewport: function() {
            var e = {
                width: $(window).width()
            };
            if (Browser.MobileSafari || Browser.Android && Browser.Gecko) {
                var t = document.documentElement.clientWidth / window.innerWidth;
                e.height = window.innerHeight * t;
            } else e.height = $(window).height();
            return e;
        }
    }, Browser = function(e) {
        function t(t) {
            var i = new RegExp(t + "([\\d.]+)").exec(e);
            return !i || parseFloat(i[1]);
        }
        return {
            IE: !(!window.attachEvent || -1 !== e.indexOf("Opera")) && t("MSIE "),
            Opera: e.indexOf("Opera") > -1 && (!!window.opera && opera.version && parseFloat(opera.version()) || 7.55),
            WebKit: e.indexOf("AppleWebKit/") > -1 && t("AppleWebKit/"),
            Gecko: e.indexOf("Gecko") > -1 && -1 === e.indexOf("KHTML") && t("rv:"),
            MobileSafari: !!e.match(/Apple.*Mobile.*Safari/),
            Chrome: e.indexOf("Chrome") > -1 && t("Chrome/"),
            ChromeMobile: e.indexOf("CrMo") > -1 && t("CrMo/"),
            Android: e.indexOf("Android") > -1 && t("Android "),
            IEMobile: e.indexOf("IEMobile") > -1 && t("IEMobile/")
        };
    }(navigator.userAgent), _slice = Array.prototype.slice, _ = {
        isElement: function(e) {
            return e && 1 == e.nodeType;
        },
        String: {
            capitalize: function(e) {
                return (e = baseToString(e)) && e.charAt(0).toUpperCase() + e.slice(1);
            }
        }
    };
    !function() {
        function e(e) {
            var t;
            if (e.originalEvent.wheelDelta ? t = e.originalEvent.wheelDelta / 120 : e.originalEvent.detail && (t = -e.originalEvent.detail / 3), 
            t) {
                var i = $.Event("fresco:mousewheel");
                $(e.target).trigger(i, t), i.isPropagationStopped() && e.stopPropagation(), i.isDefaultPrevented() && e.preventDefault();
            }
        }
        $(document.documentElement).on("mousewheel DOMMouseScroll", e);
    }();
    var Fit = {
        within: function(e, t) {
            for (var i = $.extend({
                height: !0,
                width: !0
            }, arguments[2] || {}), s = $.extend({}, t), n = 1, o = 5, a = {
                width: i.width,
                height: i.height
            }; o > 0 && (a.width && s.width > e.width || a.height && s.height > e.height); ) {
                var r = 1, l = 1;
                a.width && s.width > e.width && (r = e.width / s.width), a.height && s.height > e.height && (l = e.height / s.height);
                n = Math.min(r, l);
                s = {
                    width: Math.round(t.width * n),
                    height: Math.round(t.height * n)
                }, o--;
            }
            return s.width = Math.max(s.width, 0), s.height = Math.max(s.height, 0), s;
        }
    };
    $.extend($.easing, {
        frescoEaseInCubic: function(e, t, i, s, n) {
            return s * (t /= n) * t * t + i;
        },
        frescoEaseInSine: function(e, t, i, s, n) {
            return -s * Math.cos(t / n * (Math.PI / 2)) + s + i;
        },
        frescoEaseOutSine: function(e, t, i, s, n) {
            return s * Math.sin(t / n * (Math.PI / 2)) + i;
        }
    });
    var Support = function() {
        function e(e) {
            return i(e, "prefix");
        }
        function t(e, t) {
            for (var i in e) if (void 0 !== s.style[e[i]]) return "prefix" != t || e[i];
            return !1;
        }
        function i(e, i) {
            var s = e.charAt(0).toUpperCase() + e.substr(1);
            return t((e + " " + n.join(s + " ") + s).split(" "), i);
        }
        var s = document.createElement("div"), n = "Webkit Moz O ms Khtml".split(" ");
        return {
            canvas: function() {
                var e = document.createElement("canvas");
                return !(!e.getContext || !e.getContext("2d"));
            }(),
            css: {
                animation: i("animation"),
                transform: i("transform"),
                prefixed: e
            },
            svg: !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            touch: function() {
                try {
                    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
                } catch (e) {
                    return !1;
                }
            }()
        };
    }();
    Support.detectMobileTouch = function() {
        Support.mobileTouch = Support.touch && (Browser.MobileSafari || Browser.Android || Browser.IEMobile || Browser.ChromeMobile || !/^(Win|Mac|Linux)/.test(navigator.platform));
    }, Support.detectMobileTouch();
    var ImageReady = function() {
        return this.initialize.apply(this, Array.prototype.slice.call(arguments));
    };
    $.extend(ImageReady.prototype, {
        supports: {
            naturalWidth: function() {
                return "naturalWidth" in new Image();
            }()
        },
        initialize: function(e, t, i) {
            return this.img = $(e)[0], this.successCallback = t, this.errorCallback = i, this.isLoaded = !1, 
            this.options = $.extend({
                method: "naturalWidth",
                pollFallbackAfter: 1e3
            }, arguments[3] || {}), this.supports.naturalWidth && "onload" != this.options.method ? this.img.complete && "undefined" != $.type(this.img.naturalWidth) ? void setTimeout($.proxy(function() {
                this.img.naturalWidth > 0 ? this.success() : this.error();
            }, this)) : ($(this.img).bind("error", $.proxy(function() {
                setTimeout($.proxy(function() {
                    this.error();
                }, this));
            }, this)), this.intervals = [ [ 1e3, 10 ], [ 2e3, 50 ], [ 4e3, 100 ], [ 2e4, 500 ] ], 
            this._ipos = 0, this._time = 0, this._delay = this.intervals[this._ipos][1], void this.poll()) : void setTimeout($.proxy(this.fallback, this));
        },
        poll: function() {
            this._polling = setTimeout($.proxy(function() {
                if (this.img.naturalWidth > 0) this.success(); else {
                    if (this._time += this._delay, this.options.pollFallbackAfter && this._time >= this.options.pollFallbackAfter && !this._usedPollFallback && (this._usedPollFallback = !0, 
                    this.fallback()), this._time > this.intervals[this._ipos][0]) {
                        if (!this.intervals[this._ipos + 1]) return void this.error();
                        this._ipos++, this._delay = this.intervals[this._ipos][1];
                    }
                    this.poll();
                }
            }, this), this._delay);
        },
        fallback: function() {
            var e = new Image();
            this._fallbackImg = e, e.onload = $.proxy(function() {
                e.onload = function() {}, this.supports.naturalWidth || (this.img.naturalWidth = e.width, 
                this.img.naturalHeight = e.height), this.success();
            }, this), e.onerror = $.proxy(this.error, this), e.src = this.img.src;
        },
        abort: function() {
            this._fallbackImg && (this._fallbackImg.onload = function() {}), this._polling && (clearTimeout(this._polling), 
            this._polling = null);
        },
        success: function() {
            this._calledSuccess || (this._calledSuccess = !0, this.isLoaded = !0, this.successCallback(this));
        },
        error: function() {
            this._calledError || (this._calledError = !0, this.abort(), this.errorCallback && this.errorCallback(this));
        }
    }), $.extend(Timers.prototype, {
        initialize: function() {
            this._timers = {};
        },
        set: function(e, t, i) {
            this._timers[e] = setTimeout(t, i);
        },
        get: function(e) {
            return this._timers[e];
        },
        clear: function(e) {
            e ? this._timers[e] && (clearTimeout(this._timers[e]), delete this._timers[e]) : this.clearAll();
        },
        clearAll: function() {
            $.each(this._timers, function(e, t) {
                clearTimeout(t);
            }), this._timers = {};
        }
    });
    var Type = {
        isVideo: function(e) {
            return /^(youtube|vimeo)$/.test(e);
        }
    }, Types = {
        image: {
            extensions: "bmp gif jpeg jpg png webp",
            detect: function(e) {
                return $.inArray(detectExtension(e), this.extensions.split(" ")) > -1;
            },
            data: function(e) {
                return !!this.detect() && {
                    extension: detectExtension(e)
                };
            }
        },
        vimeo: {
            detect: function(e) {
                var t = /(vimeo\.com)\/([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(e);
                return !(!t || !t[2]) && t[2];
            },
            data: function(e) {
                var t = this.detect(e);
                return !!t && {
                    id: t
                };
            }
        },
        youtube: {
            detect: function(e) {
                var t = /(youtube\.com|youtu\.be)\/watch\?(?=.*vi?=([a-zA-Z0-9-_]+))(?:\S+)?$/.exec(e);
                return t && t[2] ? t[2] : !(!(t = /(youtube\.com|youtu\.be)\/(vi?\/|u\/|embed\/)?([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(e)) || !t[3]) && t[3];
            },
            data: function(e) {
                var t = this.detect(e);
                return !!t && {
                    id: t
                };
            }
        }
    }, VimeoThumbnail = function() {
        var e = function() {
            return this.initialize.apply(this, _slice.call(arguments));
        };
        $.extend(e.prototype, {
            initialize: function(e, t, i) {
                this.url = e, this.successCallback = t, this.errorCallback = i, this.load();
            },
            load: function() {
                var e = t.get(this.url);
                if (e) return this.successCallback(e.data.url);
                var i = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":", s = getURIData(this.url).id;
                this._xhr = $.getJSON(i + "//vimeo.com/api/oembed.json?url=" + i + "//vimeo.com/" + s + "&callback=?", $.proxy(function(e) {
                    if (e && e.thumbnail_url) {
                        var e = {
                            url: e.thumbnail_url
                        };
                        t.set(this.url, e), this.successCallback(e.url);
                    } else this.errorCallback();
                }, this));
            },
            abort: function() {
                this._xhr && (this._xhr.abort(), this._xhr = null);
            }
        });
        var t = {
            cache: [],
            get: function(e) {
                for (var t = null, i = 0; i < this.cache.length; i++) this.cache[i] && this.cache[i].url == e && (t = this.cache[i]);
                return t;
            },
            set: function(e, t) {
                this.remove(e), this.cache.push({
                    url: e,
                    data: t
                });
            },
            remove: function(e) {
                for (var t = 0; t < this.cache.length; t++) this.cache[t] && this.cache[t].url == e && delete this.cache[t];
            }
        };
        return e;
    }(), VimeoReady = function() {
        var e = function() {
            return this.initialize.apply(this, _slice.call(arguments));
        };
        $.extend(e.prototype, {
            initialize: function(e, t) {
                this.url = e, this.callback = t, this.load();
            },
            load: function() {
                var e = t.get(this.url);
                if (e) return this.callback(e.data);
                var i = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":", s = getURIData(this.url).id;
                this._xhr = $.getJSON(i + "//vimeo.com/api/oembed.json?url=" + i + "//vimeo.com/" + s + "&maxwidth=9999999&maxheight=9999999&callback=?", $.proxy(function(e) {
                    var i = {
                        dimensions: {
                            width: e.width,
                            height: e.height
                        }
                    };
                    t.set(this.url, i), this.callback && this.callback(i);
                }, this));
            },
            abort: function() {
                this._xhr && (this._xhr.abort(), this._xhr = null);
            }
        });
        var t = {
            cache: [],
            get: function(e) {
                for (var t = null, i = 0; i < this.cache.length; i++) this.cache[i] && this.cache[i].url == e && (t = this.cache[i]);
                return t;
            },
            set: function(e, t) {
                this.remove(e), this.cache.push({
                    url: e,
                    data: t
                });
            },
            remove: function(e) {
                for (var t = 0; t < this.cache.length; t++) this.cache[t] && this.cache[t].url == e && delete this.cache[t];
            }
        };
        return e;
    }(), Options = {
        defaults: {
            effects: {
                content: {
                    show: 0,
                    hide: 0
                },
                spinner: {
                    show: 150,
                    hide: 150
                },
                window: {
                    show: 440,
                    hide: 300
                },
                thumbnail: {
                    show: 300,
                    delay: 150
                },
                thumbnails: {
                    slide: 0
                }
            },
            keyboard: {
                left: !0,
                right: !0,
                esc: !0
            },
            loadedMethod: "naturalWidth",
            loop: !1,
            onClick: "previous-next",
            overflow: !1,
            overlay: {
                close: !0
            },
            preload: [ 1, 2 ],
            position: !0,
            skin: "fresco",
            spinner: !0,
            spinnerDelay: 300,
            sync: !0,
            thumbnails: "horizontal",
            ui: "outside",
            uiDelay: 3e3,
            vimeo: {
                autoplay: 1,
                api: 1,
                title: 1,
                byline: 1,
                portrait: 0,
                loop: 0
            },
            youtube: {
                autoplay: 1,
                controls: 1,
                enablejsapi: 1,
                hd: 1,
                iv_load_policy: 3,
                loop: 0,
                modestbranding: 1,
                rel: 0,
                vq: "hd1080"
            },
            initialTypeOptions: {
                image: {},
                vimeo: {
                    width: 1280
                },
                youtube: {
                    width: 1280,
                    height: 720
                }
            }
        },
        create: function(e, t, i) {
            e = e || {}, i = i || {}, e.skin = e.skin || this.defaults.skin;
            var s = e.skin ? $.extend({}, Fresco.Skins[e.skin] || Fresco.Skins[this.defaults.skin]) : {}, n = $.extend(!0, {}, this.defaults, s);
            n.initialTypeOptions && (t && n.initialTypeOptions[t] && (n = $.extend(!0, {}, n.initialTypeOptions[t], n)), 
            delete n.initialTypeOptions);
            var o = $.extend(!0, {}, n, e);
            if (Support.mobileTouch && "inside" == o.ui && (o.ui = "outside"), (!o.effects || Browser.IE && Browser.IE < 9) && (o.effects = {}, 
            $.each(this.defaults.effects, function(e, t) {
                $.each(o.effects[e] = $.extend({}, t), function(t) {
                    o.effects[e][t] = 0;
                });
            }), o.spinner = !1), o.keyboard && ("boolean" == $.type(o.keyboard) && (o.keyboard = {}, 
            $.each(this.defaults.keyboard, function(e, t) {
                o.keyboard[e] = !0;
            })), ("vimeo" == t || "youtube" == t) && $.extend(o.keyboard, {
                left: !1,
                right: !1
            })), !o.overflow || Support.mobileTouch ? o.overflow = {
                x: !1,
                y: !1
            } : "boolean" == $.type(o.overflow) && (o.overflow = {
                x: !1,
                y: !0
            }), ("vimeo" == t || "youtube" == t) && (o.overlap = !1), (Browser.IE && Browser.IE < 9 || Support.mobileTouch) && (o.thumbnail = !1, 
            o.thumbnails = !1), "youtube" != t && (o.width && !o.maxWidth && (o.maxWidth = o.width), 
            o.height && !o.maxHeight && (o.maxHeight = o.height)), !o.thumbnail && "boolean" != $.type(o.thumbnail)) {
                var a = !1;
                switch (t) {
                  case "youtube":
                    a = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":" + "//img.youtube.com/vi/" + i.id + "/0.jpg";
                    break;

                  case "image":
                  case "vimeo":
                    a = !0;
                }
                o.thumbnail = a;
            }
            return o;
        }
    }, Overlay = {
        initialize: function() {
            this.build(), this.visible = !1;
        },
        build: function() {
            this.element = $("<div>").addClass("fr-overlay").hide().append($("<div>").addClass("fr-overlay-background")), 
            this.element.on("click", $.proxy(function() {
                var e = Pages.page;
                e && e.view && e.view.options.overlay && !e.view.options.overlay.close || Window.hide();
            }, this)), Support.mobileTouch && this.element.addClass("fr-mobile-touch"), this.element.on("fresco:mousewheel", function(e) {
                e.preventDefault();
            });
        },
        setSkin: function(e) {
            this.skin && this.element.removeClass("fr-overlay-skin-" + this.skin), this.element.addClass("fr-overlay-skin-" + e), 
            this.skin = e;
        },
        attach: function() {
            $(document.body).append(this.element);
        },
        detach: function() {
            this.element.detach();
        },
        show: function(e, t) {
            if (this.visible) e && e(); else {
                this.visible = !0, this.attach(), this.max();
                var i = Pages.page && Pages.page.view.options.effects.window.show || 0, s = ("number" == $.type(t) ? t : i) || 0;
                this.element.stop(!0).fadeTo(s, 1, e);
            }
        },
        hide: function(e, t) {
            if (this.visible) {
                var i = Pages.page && Pages.page.view.options.effects.window.hide || 0, s = ("number" == $.type(t) ? t : i) || 0;
                this.element.stop(!0).fadeOut(s || 0, $.proxy(function() {
                    this.detach(), this.visible = !1, e && e();
                }, this));
            } else e && e();
        },
        getScrollDimensions: function() {
            var e = {};
            return $.each([ "width", "height" ], function(t, i) {
                var s = i.substr(0, 1).toUpperCase() + i.substr(1), n = document.documentElement;
                e[i] = (Browser.IE ? Math.max(n["offset" + s], n["scroll" + s]) : Browser.WebKit ? document.body["scroll" + s] : n["scroll" + s]) || 0;
            }), e;
        },
        max: function() {
            var e;
            if (Browser.MobileSafari && Browser.WebKit && Browser.WebKit < 533.18 && (e = this.getScrollDimensions(), 
            this.element.css(e)), Browser.IE && Browser.IE < 9) {
                var t = Bounds.viewport();
                this.element.css({
                    height: t.height,
                    width: t.width
                });
            }
            Support.mobileTouch && !e && this.element.css({
                height: this.getScrollDimensions().height
            });
        }
    }, Window = {
        initialize: function() {
            this.queues = [], this.queues.hide = $({}), this.pages = [], this._tracking = [], 
            this._first = !0, this.timers = new Timers(), this.build(), this.setSkin(Options.defaults.skin);
        },
        build: function() {
            if (this.element = $("<div>").addClass("fr-window fr-measured").hide().append(this._box = $("<div>").addClass("fr-box").append(this._pages = $("<div>").addClass("fr-pages"))).append(this._thumbnails = $("<div>").addClass("fr-thumbnails")), 
            Overlay.initialize(), Pages.initialize(this._pages), Thumbnails.initialize(this._thumbnails), 
            Spinner.initialize(), UI.initialize(), this.element.addClass("fr" + (Support.mobileTouch ? "" : "-no") + "-mobile-touch"), 
            this.element.addClass("fr" + (Support.svg ? "" : "-no") + "-svg"), Browser.IE) for (var e = 7; 9 >= e; e++) Browser.IE < e && this.element.addClass("fr-ltIE" + e);
            this.element.on("fresco:mousewheel", function(e) {
                e.preventDefault();
            });
        },
        attach: function() {
            this._attached || ($(document.body).append(this.element), this._attached = !0);
        },
        detach: function() {
            this._attached && (this.element.detach(), this._attached = !1);
        },
        setSkin: function(e) {
            this._skin && this.element.removeClass("fr-window-skin-" + this._skin), this.element.addClass("fr-window-skin-" + e), 
            Overlay.setSkin(e), this._skin = e;
        },
        setShowingType: function(e) {
            this._showingType != e && (this._showingType && (this.element.removeClass("fr-showing-type-" + this._showingType), 
            Type.isVideo(this._showingType) && this.element.removeClass("fr-showing-type-video")), 
            this.element.addClass("fr-showing-type-" + e), Type.isVideo(e) && this.element.addClass("fr-showing-type-video"), 
            this._showingType = e);
        },
        startObservingResize: function() {
            this._onWindowResizeHandler || $(window).on("resize orientationchange", this._onWindowResizeHandler = $.proxy(this._onWindowResize, this));
        },
        stopObservingResize: function() {
            this._onWindowResizeHandler && ($(window).off("resize orientationchange", this._onWindowResizeHandler), 
            this._onWindowResizeHandler = null);
        },
        _onScroll: function() {
            Support.mobileTouch && this.timers.set("scroll", $.proxy(this.adjustToScroll, this), 0);
        },
        _onWindowResize: function() {
            var e;
            (e = Pages.page) && (Thumbnails.fitToViewport(), this.updateBoxDimensions(), e.fitToBox(), 
            UI.update(), UI.adjustPrevNext(null, 0), Spinner.center(), Overlay.max(), UI._onWindowResize(), 
            this._onScroll());
        },
        adjustToScroll: function() {
            Support.mobileTouch && this.element.css({
                top: $(window).scrollTop()
            });
        },
        getBoxDimensions: function() {
            return this._boxDimensions;
        },
        updateBoxDimensions: function() {
            if (Pages.page) {
                var e = Bounds.viewport(), t = Thumbnails.getDimensions(), i = "horizontal" == Thumbnails._orientation;
                this._boxDimensions = {
                    width: i ? e.width : e.width - t.width,
                    height: i ? e.height - t.height : e.height
                }, this._boxPosition = {
                    top: 0,
                    left: i ? 0 : t.width
                }, this._box.css($.extend({}, this._boxDimensions, this._boxPosition));
            }
        },
        show: function(e, t) {
            if (this.visible) e && e(); else {
                this.visible = !0, this.opening = !0, this.attach(), this.timers.clear("show-window"), 
                this.timers.clear("hide-overlay"), this.adjustToScroll();
                var i = ("number" == $.type(t) ? t : Pages.page && Pages.page.view.options.effects.window.show) || 0, s = 2;
                Overlay[Pages.page && Pages.page.view.options.overlay ? "show" : "hide"](function() {
                    e && --s < 1 && e();
                }, i), this.timers.set("show-window", $.proxy(function() {
                    this._show($.proxy(function() {
                        this.opening = !1, e && --s < 1 && e();
                    }, this), i);
                }, this), i > 1 ? Math.min(.5 * i, 50) : 1);
            }
        },
        _show: function(e, t) {
            var i = ("number" == $.type(t) ? t : Pages.page && Pages.page.view.options.effects.window.show) || 0;
            this.element.stop(!0).fadeTo(i, 1, e);
        },
        hide: function(e) {
            if (this.view) {
                var t = this.queues.hide;
                t.queue([]), this.timers.clear("show-window"), this.timers.clear("hide-overlay");
                var i = Pages.page ? Pages.page.view.options.effects.window.hide : 0;
                t.queue($.proxy(function(e) {
                    Pages.stop(), Spinner.hide(), e();
                }, this)), t.queue($.proxy(function(e) {
                    UI.disable(), UI.hide(null, i), Keyboard.disable(), e();
                }, this)), t.queue($.proxy(function(e) {
                    var t = 2;
                    this._hide(function() {
                        --t < 1 && e();
                    }, i), this.timers.set("hide-overlay", $.proxy(function() {
                        Overlay.hide(function() {
                            --t < 1 && e();
                        }, i);
                    }, this), i > 1 ? Math.min(.5 * i, 150) : 1), this._first = !0;
                }, this)), t.queue($.proxy(function(e) {
                    this._reset(), this.stopObservingResize(), Pages.removeAll(), Thumbnails.clear(), 
                    this.timers.clear(), this._position = -1;
                    var t = Pages.page && Pages.page.view.options.afterHide;
                    "function" == $.type(t) && t.call(Fresco), this.view = null, this.opening = !1, 
                    this.closing = !1, this.detach(), e();
                }, this)), "function" == $.type(e) && t.queue($.proxy(function(t) {
                    e(), t();
                }, this));
            }
        },
        _hide: function(e, t) {
            var i = ("number" == $.type(t) ? t : Pages.page && Pages.page.view.options.effects.window.hide) || 0;
            this.element.stop(!0).fadeOut(i, e);
        },
        load: function(e, t) {
            this.views = e, this.attach(), Thumbnails.load(e), Pages.load(e), this.startObservingResize(), 
            t && this.setPosition(t);
        },
        setPosition: function(e, t) {
            this._position = e, this.view = this.views[e - 1], this.stopHideQueue(), this.page = Pages.show(e, $.proxy(function() {
                t && t();
            }, this));
        },
        stopHideQueue: function() {
            this.queues.hide.queue([]);
        },
        _reset: function() {
            this.visible = !1, UI.hide(null, 0), UI.reset();
        },
        mayPrevious: function() {
            return this.view && this.view.options.loop && this.views && this.views.length > 1 || 1 != this._position;
        },
        previous: function(e) {
            var t = this.mayPrevious();
            (e || t) && this.setPosition(this.getSurroundingIndexes().previous);
        },
        mayNext: function() {
            var e = this.views && this.views.length > 1;
            return this.view && this.view.options.loop && e || e && 1 != this.getSurroundingIndexes().next;
        },
        next: function(e) {
            var t = this.mayNext();
            (e || t) && this.setPosition(this.getSurroundingIndexes().next);
        },
        getSurroundingIndexes: function() {
            if (!this.views) return {};
            var e = this._position, t = this.views.length;
            return {
                previous: 1 >= e ? t : e - 1,
                next: e >= t ? 1 : e + 1
            };
        }
    }, Keyboard = {
        enabled: !1,
        keyCode: {
            left: 37,
            right: 39,
            esc: 27
        },
        enable: function(e) {
            this.disable(), e && ($(document).on("keydown", this._onKeyDownHandler = $.proxy(this.onKeyDown, this)).on("keyup", this._onKeyUpHandler = $.proxy(this.onKeyUp, this)), 
            this.enabled = e);
        },
        disable: function() {
            this.enabled = !1, this._onKeyUpHandler && ($(document).off("keyup", this._onKeyUpHandler).off("keydown", this._onKeyDownHandler), 
            this._onKeyUpHandler = this._onKeyDownHandler = null);
        },
        onKeyDown: function(e) {
            if (this.enabled) {
                var t = this.getKeyByKeyCode(e.keyCode);
                if (t && (!t || !this.enabled || this.enabled[t])) switch (e.preventDefault(), e.stopPropagation(), 
                t) {
                  case "left":
                    Window.previous();
                    break;

                  case "right":
                    Window.next();
                }
            }
        },
        onKeyUp: function(e) {
            if (this.enabled) {
                var t = this.getKeyByKeyCode(e.keyCode);
                if (t && (!t || !this.enabled || this.enabled[t])) switch (t) {
                  case "esc":
                    Window.hide();
                }
            }
        },
        getKeyByKeyCode: function(e) {
            for (var t in this.keyCode) if (this.keyCode[t] == e) return t;
            return null;
        }
    }, Page = function() {
        function e() {
            return this.initialize.apply(this, _slice.call(arguments));
        }
        var t = 0, i = {}, s = $("<div>").addClass("fr-stroke fr-stroke-top fr-stroke-horizontal").append($("<div>").addClass("fr-stroke-color")).add($("<div>").addClass("fr-stroke fr-stroke-bottom fr-stroke-horizontal").append($("<div>").addClass("fr-stroke-color"))).add($("<div>").addClass("fr-stroke fr-stroke-left fr-stroke-vertical").append($("<div>").addClass("fr-stroke-color"))).add($("<div>").addClass("fr-stroke fr-stroke-right fr-stroke-vertical").append($("<div>").addClass("fr-stroke-color")));
        return $.extend(e.prototype, {
            initialize: function(e, i, s) {
                this.view = e, this.dimensions = {
                    width: 0,
                    height: 0
                }, this.uid = t++, this._position = i, this._total = s, this._fullClick = !1, this._visible = !1, 
                this.queues = {}, this.queues.showhide = $({});
            },
            create: function() {
                if (!this._created) {
                    Pages.element.append(this.element = $("<div>").addClass("fr-page").append(this.container = $("<div>").addClass("fr-container")).css({
                        opacity: 0
                    }).hide());
                    var e = this.view.options.position && this._total > 1;
                    if (e && this.element.addClass("fr-has-position"), (this.view.caption || e) && (this.element.append(this.info = $("<div>").addClass("fr-info").append($("<div>").addClass("fr-info-background")).append(s.clone(!0)).append(this.infoPadder = $("<div>").addClass("fr-info-padder"))), 
                    e && (this.element.addClass("fr-has-position"), this.infoPadder.append(this.pos = $("<div>").addClass("fr-position").append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total)))), 
                    this.view.caption && this.infoPadder.append(this.caption = $("<div>").addClass("fr-caption").html(this.view.caption))), 
                    this.container.append(this.background = $("<div>").addClass("fr-content-background")).append(this.content = $("<div>").addClass("fr-content")), 
                    "image" == this.view.type && (this.content.append(this.image = $("<img>").addClass("fr-content-element").attr({
                        src: this.view.url
                    })), this.content.append(s.clone(!0))), e && "outside" == this.view.options.ui && this.container.append(this.positionOutside = $("<div>").addClass("fr-position-outside").append($("<div>").addClass("fr-position-background")).append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total))), 
                    "inside" == this.view.options.ui) {
                        this.content.append(this.previousInside = $("<div>").addClass("fr-side fr-side-previous fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this.nextInside = $("<div>").addClass("fr-side fr-side-next fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this.closeInside = $("<div>").addClass("fr-close fr-toggle-ui").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), 
                        (this.view.caption || e && this.view.grouped.caption) && (this.content.append(this.infoInside = $("<div>").addClass("fr-info fr-toggle-ui").append($("<div>").addClass("fr-info-background")).append(s.clone(!0)).append(this.infoPadderInside = $("<div>").addClass("fr-info-padder"))), 
                        e && this.infoPadderInside.append(this.posInside = $("<div>").addClass("fr-position").append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total))), 
                        this.view.caption && this.infoPadderInside.append(this.captionInside = $("<div>").addClass("fr-caption").html(this.view.caption))), 
                        this.view.caption || !e || this.view.grouped.caption || this.content.append(this.positionInside = $("<div>").addClass("fr-position-inside fr-toggle-ui").append($("<div>").addClass("fr-position-background")).append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total)));
                        var t = this.view.options.loop && this._total > 1 || 1 != this._position, i = this.view.options.loop && this._total > 1 || this._position < this._total;
                        this.previousInside[(t ? "remove" : "add") + "Class"]("fr-side-disabled"), this.nextInside[(i ? "remove" : "add") + "Class"]("fr-side-disabled");
                    }
                    $.each([ "x", "y" ], $.proxy(function(e, t) {
                        this.view.options.overflow[t] && this.element.addClass("fr-overflow-" + t);
                    }, this)), this.element.addClass("fr-type-" + this.view.type), Type.isVideo(this.view.type) && this.element.addClass("fr-type-video"), 
                    this._total < 2 && this.element.addClass("fr-no-sides"), this._created = !0;
                }
            },
            _getSurroundingPages: function() {
                var e;
                if (!(e = this.view.options.preload)) return [];
                for (var t = [], i = Math.max(1, this._position - e[0]), s = Math.min(this._position + e[1], this._total), n = this._position, o = n; s >= o; o++) (a = Pages.pages[o - 1])._position != n && t.push(a);
                for (o = n; o >= i; o--) {
                    var a = Pages.pages[o - 1];
                    a._position != n && t.push(a);
                }
                return t;
            },
            preloadSurroundingImages: function() {
                var e = this._getSurroundingPages();
                $.each(e, $.proxy(function(e, t) {
                    t.preload();
                }, this));
            },
            preload: function() {
                this.preloading || this.preloaded || "image" != this.view.type || !this.view.options.preload || this.loaded || (this.create(), 
                this.preloading = !0, this.preloadReady = new ImageReady(this.image[0], $.proxy(function(e) {
                    this.loaded = !0, i[this.view.url] = !0, this.preloading = !1, this.preloaded = !0, 
                    this.dimensions = {
                        width: e.img.naturalWidth,
                        height: e.img.naturalHeight
                    };
                }, this), null, {
                    method: "naturalWidth"
                }));
            },
            load: function(e, t) {
                if (this.create(), this.loaded) e && e(); else switch (this.abort(), this.loading = !0, 
                this.view.options.spinner && (this._spinnerDelay = setTimeout($.proxy(function() {
                    Spinner.show();
                }, this), this.view.options.spinnerDelay || 0)), this.view.type) {
                  case "image":
                    if (this.error) return void (e && e());
                    this.imageReady = new ImageReady(this.image[0], $.proxy(function(t) {
                        this._markAsLoaded(), this.setDimensions({
                            width: t.img.naturalWidth,
                            height: t.img.naturalHeight
                        }), e && e();
                    }, this), $.proxy(function() {
                        this._markAsLoaded(), this.image.hide(), this.content.prepend(this.error = $("<div>").addClass("fr-error fr-content-element").append($("<div>").addClass("fr-error-icon"))), 
                        this.element.addClass("fr-has-error"), this.setDimensions({
                            width: this.error.outerWidth(),
                            height: this.error.outerHeight()
                        }), this.error.css({
                            width: "100%",
                            height: "100%"
                        }), e && e();
                    }, this), {
                        method: this.view.options.loadedMethod
                    });
                    break;

                  case "vimeo":
                    this.vimeoReady = new VimeoReady(this.view.url, $.proxy(function(t) {
                        this._markAsLoaded(), this.setDimensions({
                            width: t.dimensions.width,
                            height: t.dimensions.height
                        }), e && e();
                    }, this));
                    break;

                  case "youtube":
                    this._markAsLoaded(), this.setDimensions({
                        width: this.view.options.width,
                        height: this.view.options.height
                    }), e && e();
                }
            },
            setDimensions: function(e) {
                if (this.dimensions = e, this.view.options.maxWidth || this.view.options.maxHeight) {
                    var t = this.view.options, i = {
                        width: t.maxWidth ? t.maxWidth : this.dimensions.width,
                        height: t.maxHeight ? t.maxHeight : this.dimensions.height
                    };
                    this.dimensions = Fit.within(i, this.dimensions);
                }
            },
            _markAsLoaded: function() {
                this._abortSpinnerDelay(), this.loading = !1, this.loaded = !0, i[this.view.url] = !0, 
                Spinner.hide(null, null, this._position);
            },
            isVideo: function() {
                return Type.isVideo(this.view.type);
            },
            insertVideo: function(e) {
                if (!this.playerIframe && this.isVideo()) {
                    var t = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":", i = $.extend({}, this.view.options[this.view.type] || {}), s = $.param(i), n = {
                        vimeo: t + "//player.vimeo.com/video/{id}?{queryString}",
                        youtube: t + "//www.youtube.com/embed/{id}?{queryString}"
                    }[this.view.type].replace("{id}", this.view._data.id).replace("{queryString}", s);
                    this.content.prepend(this.playerIframe = $("<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen>").addClass("fr-content-element").attr({
                        src: n,
                        height: this._contentDimensions.height,
                        width: this._contentDimensions.width,
                        frameborder: 0
                    })), e && e();
                } else e && e();
            },
            raise: function() {
                var e = Pages.element[0].lastChild;
                e && e == this.element[0] || Pages.element.append(this.element);
            },
            show: function(e) {
                var t = this.queues.showhide;
                t.queue([]), t.queue($.proxy(function(e) {
                    var t = this.view.options.spinner && !i[this.view.url];
                    Spinner._visible && !t && Spinner.hide(), Pages.stopInactive(), e();
                }, this)), t.queue($.proxy(function(e) {
                    this.updateUI(), UI.set(this._ui), e();
                }, this)), t.queue($.proxy(function(e) {
                    Keyboard.enable(this.view.options.keyboard), e();
                }, this)), t.queue($.proxy(function(e) {
                    Spinner.setSkin(this.view.options.skin), this.load($.proxy(function() {
                        this.preloadSurroundingImages(), e();
                    }, this));
                }, this)), t.queue($.proxy(function(e) {
                    this.raise(), Window.setSkin(this.view.options.skin), UI.enable(), this.fitToBox(), 
                    Window.adjustToScroll(), e();
                }, this)), this.isVideo() && t.queue($.proxy(function(e) {
                    this.insertVideo($.proxy(function() {
                        e();
                    }));
                }, this)), this.view.options.sync || t.queue($.proxy(function(e) {
                    Pages.hideInactive(e);
                }, this)), t.queue($.proxy(function(e) {
                    var t = 3, i = this.view.options.effects.content.show;
                    Window.setShowingType(this.view.type), Window.visible || (i = this.view.options.effects.window.show, 
                    "function" == $.type(this.view.options.onShow) && this.view.options.onShow.call(Fresco)), 
                    this.view.options.sync && (t++, Pages.hideInactive(function() {
                        --t < 1 && e();
                    })), Window.show(function() {
                        --t < 1 && e();
                    }, this.view.options.effects.window.show), this._show(function() {
                        --t < 1 && e();
                    }, i), UI.adjustPrevNext(function() {
                        --t < 1 && e();
                    }, Window._first ? 0 : i), Window._first ? (UI.show(null, 0), Window._first = !1) : UI.show(null, 0);
                    var s = this.view.options.afterPosition;
                    "function" == $.type(s) && s.call(Fresco, this._position);
                }, this)), t.queue($.proxy(function(t) {
                    this._visible = !0, e && e(), t();
                }, this));
            },
            _show: function(e, t) {
                var i = Window.visible ? "number" == $.type(t) ? t : this.view.options.effects.content.show : 0;
                this.element.stop(!0).show().fadeTo(i || 0, 1, e);
            },
            hide: function(e, t) {
                if (this.element) {
                    this.removeVideo(), this.abort();
                    var i = "number" == $.type(t) ? t : this.view.options.effects.content.hide;
                    this.isVideo() && (i = 0), this.element.stop(!0).fadeTo(i, 0, "frescoEaseInCubic", $.proxy(function() {
                        this.element.hide(), this._visible = !1, Pages.removeTracking(this._position), e && e();
                    }, this));
                } else e && e();
            },
            stop: function() {
                this.queues.showhide.queue([]), this.element && this.element.stop(!0), this.abort();
            },
            removeVideo: function() {
                this.playerIframe && (this.playerIframe[0].src = "//about:blank", this.playerIframe.remove(), 
                this.playerIframe = null);
            },
            remove: function() {
                this.stop(), this.removeVideo(), this.element && this.element.remove(), this._track && (Pages.removeTracking(this._position), 
                this._track = !1), this.preloadReady && (this.preloadReady.abort(), this.preloadReady = null, 
                this.preloading = null, this.preloaded = null), this._visible = !1, this.removed = !0;
            },
            abort: function() {
                this.imageReady && (this.imageReady.abort(), this.imageReady = null), this.vimeoReady && (this.vimeoReady.abort(), 
                this.vimeoReady = null), this._abortSpinnerDelay(), this.loading = !1;
            },
            _abortSpinnerDelay: function() {
                this._spinnerDelay && (clearTimeout(this._spinnerDelay), this._spinnerDelay = null);
            },
            _getInfoHeight: function(e) {
                var t = this.view.options.position && this._total > 1;
                switch (this._ui) {
                  case "fullclick":
                  case "inside":
                    if (!this.view.caption && !t) return 0;
                    break;

                  case "outside":
                    if (!this.view.caption) return 0;
                }
                var i = "inside" == this._ui ? this.infoInside : this.info;
                "outside" == this._ui && (e = Math.min(e, Window._boxDimensions.width));
                var s, n = i[0].style.width;
                return ("inside" == this._ui || "fullclick" == this._ui) && (n = "100%"), i.css({
                    width: e + "px"
                }), s = parseFloat(i.outerHeight()), i.css({
                    width: n
                }), s;
            },
            _whileVisible: function(e, t) {
                var i = [], s = Window.element.add(this.element);
                t && (s = s.add(t)), $.each(s, function(e, t) {
                    $(t).is(":visible") || i.push($(t).show());
                });
                var n = this.element.hasClass("fr-no-caption");
                this.element.removeClass("fr-no-caption");
                var o = this.element.hasClass("fr-has-caption");
                this.element.addClass("fr-has-caption"), Window.element.css({
                    visibility: "hidden"
                }), e(), Window.element.css({
                    visibility: "visible"
                }), n && this.element.addClass("fr-no-caption"), o || this.element.removeClass("fr-has-caption"), 
                $.each(i, function(e, t) {
                    t.hide();
                });
            },
            updateForced: function() {
                this.create(), this._fullClick = this.view.options.fullClick, this._noOverflow = !1, 
                parseInt(this.element.css("min-width")) > 0 && (this._fullClick = !0), parseInt(this.element.css("min-height")) > 0 && (this._noOverflow = !0);
            },
            updateUI: function(e) {
                this.updateForced();
                var e = this._fullClick ? "fullclick" : this.view.options.ui;
                this._ui && this.element.removeClass("fr-ui-" + this._ui), this.element.addClass("fr-ui-" + e), 
                this._ui = e;
            },
            fitToBox: function() {
                if (this.content) {
                    var e = (this.element, $.extend({}, Window.getBoxDimensions())), t = $.extend({}, this.dimensions), i = this.container;
                    this.updateUI();
                    var s = {
                        left: parseInt(i.css("padding-left")),
                        top: parseInt(i.css("padding-top"))
                    };
                    if ("outside" == this._ui && this._positionOutside) {
                        var n = 0;
                        this._whileVisible($.proxy(function() {
                            this._positionOutside.is(":visible") && (n = this._positionOutside.outerWidth(!0));
                        }, this)), n > s.left && (s.left = n);
                    }
                    e.width -= 2 * s.left, e.height -= 2 * s.top;
                    var o, a = {
                        width: !0,
                        height: !!this._noOverflow || !this.view.options.overflow.y
                    }, r = Fit.within(e, t, a), l = $.extend({}, r), c = (this.content, 0), h = "inside" == this._ui, d = h ? this.infoInside : this.info, u = h ? this.captionInside : this.caption, p = h ? this.posInside : this.pos, f = !!u;
                    switch (this._ui) {
                      case "outside":
                        var m = $.extend({}, l);
                        this.caption && (g = this.caption, this._whileVisible($.proxy(function() {
                            for (var t = 0; 2 > t; ) {
                                c = this._getInfoHeight(l.width);
                                var i = e.height - l.height;
                                c > i && (l = Fit.within({
                                    width: l.width,
                                    height: Math.max(l.height - (c - i), 0)
                                }, l, a)), t++;
                            }
                            c = this._getInfoHeight(l.width);
                            (!this.view.options.overflow.y && c + l.height > e.height || d && "none" == d.css("display") || c >= .5 * l.height) && (f = !1, 
                            c = 0, l = m);
                        }, this), g)), d && d.css({
                            width: l.width + "px"
                        }), o = {
                            width: l.width,
                            height: l.height + c
                        };
                        break;

                      case "inside":
                        if (this.caption) {
                            var g = u;
                            this._whileVisible($.proxy(function() {
                                (c = this._getInfoHeight(l.width)) >= .45 * l.height && (f = !1, c = 0);
                            }, this), g);
                        }
                        o = l;
                        break;

                      case "fullclick":
                        var v = [];
                        u && v.push(u), this._whileVisible($.proxy(function() {
                            if ((u || p) && d.css({
                                width: "100%"
                            }), c = this._getInfoHeight(Window._boxDimensions.width), u && c > .5 * e.height) if (f = !1, 
                            p) {
                                var t = this.caption.is(":visible");
                                this.caption.hide(), c = this._getInfoHeight(Window._boxDimensions.width), t && this.caption.show();
                            } else c = 0;
                            l = Fit.within({
                                width: e.width,
                                height: Math.max(0, e.height - c)
                            }, l, a), o = l;
                        }, this), v), this.content.css({
                            "padding-bottom": 0
                        });
                    }
                    u && u[f ? "show" : "hide"](), this.element[(f ? "remove" : "add") + "Class"]("fr-no-caption"), 
                    this.element[(f ? "add" : "remove") + "Class"]("fr-has-caption"), this.content.css(l), 
                    this.background.css(o), this.playerIframe && this.playerIframe.attr(l), this.overlap = {
                        y: o.height + ("fullclick" == this._ui ? c : 0) - Window._boxDimensions.height,
                        x: 0
                    }, this._track = !this._noOverflow && this.view.options.overflow.y && this.overlap.y > 0, 
                    this._infoHeight = c, this._padding = s, this._contentDimensions = l, this._backgroundDimensions = o, 
                    Pages[(this._track ? "set" : "remove") + "Tracking"](this._position), this.position();
                }
            },
            position: function() {
                if (this.content) {
                    var e = this._contentDimensions, t = this._backgroundDimensions, i = {
                        top: .5 * Window._boxDimensions.height - .5 * t.height,
                        left: .5 * Window._boxDimensions.width - .5 * t.width
                    }, s = {
                        top: i.top + e.height,
                        left: i.left
                    }, n = 0, o = "inside" == this._ui ? this.infoInside : this.info;
                    switch (this._ui) {
                      case "fullclick":
                        i.top = .5 * (Window._boxDimensions.height - this._infoHeight) - .5 * t.height, 
                        s = {
                            top: Window._boxDimensions.height - this._infoHeight,
                            left: 0,
                            bottom: "auto"
                        }, n = this._infoHeight;
                        break;

                      case "inside":
                        s = {
                            top: "auto",
                            left: 0,
                            bottom: 0
                        };
                    }
                    if (this.overlap.y > 0) {
                        var a = Pages.getXYP();
                        switch (i.top = 0 - a.y * this.overlap.y, this._ui) {
                          case "outside":
                          case "fullclick":
                            s.top = Window._boxDimensions.height - this._infoHeight;
                            break;

                          case "inside":
                            var r = i.top + e.height - Window._boxDimensions.height, l = -1 * i.top;
                            if (s.bottom = r, this.closeInside.css({
                                top: l
                            }), this._total > 1) {
                                var c = Window.element.is(":visible");
                                c || Window.element.show();
                                var h = this.previousInside.attr("style");
                                this.previousInside.removeAttr("style");
                                var d = parseInt(this.previousInside.css("margin-top"));
                                this.previousInside.attr({
                                    style: h
                                }), c || Window.element.hide();
                                var u = this.previousInside.add(this.nextInside), p = .5 * this.overlap.y;
                                u.css({
                                    "margin-top": d + (l - p)
                                }), this.positionInside && this.positionInside.css({
                                    bottom: r
                                });
                            }
                        }
                    } else "inside" == this._ui && this.element.find(".fr-info, .fr-side, .fr-close, .fr-position-inside").removeAttr("style");
                    o && o.css(s), this.container.css({
                        bottom: n
                    }), this.content.css(i), this.background.css(i);
                }
            }
        }), e;
    }(), Pages = {
        initialize: function(e) {
            this.element = e, this.pages = [], this.uid = 1, this._tracking = [];
        },
        load: function(e) {
            this.views = e, this.removeAll(), $.each(e, $.proxy(function(e, t) {
                this.pages.push(new Page(t, e + 1, this.views.length));
            }, this));
        },
        show: function(e, t) {
            var i = this.pages[e - 1];
            this.page && this.page.uid == i.uid || (this.page = i, Thumbnails.show(e), Window.updateBoxDimensions(), 
            i.show($.proxy(function() {
                t && t();
            }, this)));
        },
        getPositionInActivePageGroup: function(e) {
            var t = 0;
            return $.each(this.pages, function(i, s) {
                s.view.element && s.view.element == e && (t = i + 1);
            }), t;
        },
        getLoadingCount: function() {
            var e = 0;
            return $.each(this.pages, function(t, i) {
                i.loading && e++;
            }), e;
        },
        removeAll: function() {
            $.each(this.pages, function(e, t) {
                t.remove();
            }), this.pages = [];
        },
        hideInactive: function(e, t) {
            var i = [];
            $.each(this.pages, $.proxy(function(e, t) {
                t.uid != this.page.uid && i.push(t);
            }, this));
            var s = 0 + i.length;
            return 1 > s ? e && e() : $.each(i, function(i, n) {
                n.hide(function() {
                    e && --s < 1 && e();
                }, t);
            }), i.length;
        },
        stopInactive: function() {
            $.each(this.pages, $.proxy(function(e, t) {
                t.uid != this.page.uid && t.stop();
            }, this));
        },
        stop: function() {
            $.each(this.pages, function(e, t) {
                t.stop();
            });
        },
        handleTracking: function(e) {
            Browser.IE && Browser.IE < 9 ? (this.setXY({
                x: e.pageX,
                y: e.pageY
            }), this.updatePositions()) : this._tracking_timer = setTimeout($.proxy(function() {
                this.setXY({
                    x: e.pageX,
                    y: e.pageY
                }), this.updatePositions();
            }, this), 30);
        },
        clearTrackingTimer: function() {
            this._tracking_timer && (clearTimeout(this._tracking_timer), this._tracking_timer = null);
        },
        startTracking: function() {
            Support.mobileTouch || this._handleTracking || $(document.documentElement).on("mousemove", this._handleTracking = $.proxy(this.handleTracking, this));
        },
        stopTracking: function() {
            !Support.mobileTouch && this._handleTracking && ($(document.documentElement).off("mousemove", this._handleTracking), 
            this._handleTracking = null, this.clearTrackingTimer());
        },
        setTracking: function(e) {
            this.isTracking(e) || (this._tracking.push(this.pages[e - 1]), 1 == this._tracking.length && this.startTracking());
        },
        clearTracking: function() {
            this._tracking = [];
        },
        removeTracking: function(e) {
            this._tracking = $.grep(this._tracking, function(t) {
                return t._position != e;
            }), this._tracking.length < 1 && this.stopTracking();
        },
        isTracking: function(e) {
            var t = !1;
            return $.each(this._tracking, function(i, s) {
                return s._position == e ? (t = !0, !1) : void 0;
            }), t;
        },
        setXY: function(e) {
            this._xy = e;
        },
        getXYP: function(e) {
            var t = Pages.page, i = $.extend({}, Window._boxDimensions);
            (e = $.extend({}, this._xy)).y -= $(window).scrollTop(), t && ("outside" == t._ui || "fullclick" == t._ui) && t._infoHeight > 0 && (i.height -= t._infoHeight), 
            e.y -= Window._boxPosition.top;
            var s = {
                x: 0,
                y: Math.min(Math.max(e.y / i.height, 0), 1)
            }, n = {
                x: "width",
                y: "height"
            }, o = {};
            return $.each("y".split(" "), $.proxy(function(e, t) {
                o[t] = Math.min(Math.max(20 / i[n[t]], 0), 1), s[t] *= 1 + 2 * o[t], s[t] -= o[t], 
                s[t] = Math.min(Math.max(s[t], 0), 1);
            }, this)), this.setXYP(s), this._xyp;
        },
        setXYP: function(e) {
            this._xyp = e;
        },
        updatePositions: function() {
            this._tracking.length < 1 || $.each(this._tracking, function(e, t) {
                t.position();
            });
        }
    };
    $.extend(View.prototype, {
        initialize: function(object) {
            var options = arguments[1] || {}, data = {};
            if ("string" == $.type(object)) object = {
                url: object
            }; else if (object && 1 == object.nodeType) {
                var element = $(object);
                object = {
                    element: element[0],
                    url: element.attr("href"),
                    caption: element.data("fresco-caption"),
                    group: element.data("fresco-group"),
                    extension: element.data("fresco-extension"),
                    type: element.data("fresco-type"),
                    options: element.data("fresco-options") && eval("({" + element.data("fresco-options") + "})") || {}
                };
            }
            if (object && (object.extension || (object.extension = detectExtension(object.url)), 
            !object.type)) {
                var data = getURIData(object.url);
                object._data = data, object.type = data.type;
            }
            return object._data || (object._data = getURIData(object.url)), object && object.options ? object.options = $.extend(!0, $.extend({}, options), $.extend({}, object.options)) : object.options = $.extend({}, options), 
            object.options = Options.create(object.options, object.type, object._data), $.extend(this, object), 
            this;
        }
    });
    var Spinner = {
        supported: Support.css.transform && Support.css.animation,
        initialize: function(e) {
            this.element = $("<div>").addClass("fr-spinner").hide();
            for (var t = 1; 12 >= t; t++) this.element.append($("<div>").addClass("fr-spin-" + t));
            this.element.on("click", $.proxy(function() {
                Window.hide();
            }, this)), this.element.on("fresco:mousewheel", function(e) {
                e.preventDefault();
            });
        },
        setSkin: function(e) {
            this.supported && (this._skin && this.element.removeClass("fr-spinner-skin-" + this._skin), 
            this.updateDimensions(), this.element.addClass("fr-spinner-skin-" + e), this._skin = e);
        },
        updateDimensions: function() {
            var e = this._attached;
            e || this.attach(), this._dimensions = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, e || this.detach();
        },
        attach: function() {
            this._attached || ($(document.body).append(this.element), this._attached = !0);
        },
        detach: function() {
            this._attached && (this.element.detach(), this._attached = !1);
        },
        show: function(e, t) {
            this._visible = !0, this.attach(), this.center();
            var i = Pages.page && Pages.page.view.options.effects.spinner.show || 0, s = ("number" == $.type(t) ? t : i) || 0;
            this.element.stop(!0).fadeTo(s, 1, e);
        },
        hide: function(e, t, i) {
            this._visible = !1;
            var s = Pages.page && Pages.page.view.options.effects.spinner.hide || 0, n = ("number" == $.type(t) ? t : s) || 0;
            this.element.stop(!0).fadeOut(n || 0, $.proxy(function() {
                this.detach(), e && e();
            }, this));
        },
        center: function() {
            if (this.supported) {
                this._dimensions || this.updateDimensions();
                var e = Pages.page, t = 0;
                e && "fullclick" == e._ui && e._whileVisible(function() {
                    t = e._getInfoHeight(Window._boxDimensions.width);
                }), this.element.css({
                    top: Window._boxPosition.top + .5 * Window._boxDimensions.height - .5 * this._dimensions.height - .5 * t,
                    left: Window._boxPosition.left + .5 * Window._boxDimensions.width - .5 * this._dimensions.width
                });
            }
        }
    }, _Fresco = {
        _disabled: !1,
        _fallback: !0,
        initialize: function() {
            Window.initialize(), this._disabled || this.startDelegating();
        },
        startDelegating: function() {
            this._delegateHandler || $(document.documentElement).on("click", ".fresco[href]", this._delegateHandler = $.proxy(this.delegate, this)).on("click", this._setClickXYHandler = $.proxy(this.setClickXY, this));
        },
        stopDelegating: function() {
            this._delegateHandler && ($(document.documentElement).off("click", ".fresco[href]", this._delegateHandler).off("click", this._setClickXYHandler), 
            this._setClickXYHandler = null, this._delegateHandler = null);
        },
        setClickXY: function(e) {
            Pages.setXY({
                x: e.pageX,
                y: e.pageY
            });
        },
        delegate: function(e) {
            if (!this._disabled) {
                e.stopPropagation(), e.preventDefault();
                var t = e.currentTarget;
                this.setClickXY(e), _Fresco.show(t);
            }
        },
        show: function(object) {
            if (this._disabled) this.showFallback.apply(_Fresco, _slice.call(arguments)); else {
                var options = arguments[1] || {}, position = arguments[2];
                arguments[1] && "number" == $.type(arguments[1]) && (position = arguments[1], options = {});
                var views = [], object_type, isElement = _.isElement(object);
                switch (object_type = $.type(object)) {
                  case "string":
                  case "object":
                    var view = new View(object, options), _dgo = "data-fresco-group-options";
                    if (view.group) {
                        if (isElement) {
                            var elements = $('.fresco[data-fresco-group="' + $(object).data("fresco-group") + '"]'), groupOptions = {};
                            elements.filter("[" + _dgo + "]").each(function(i, element) {
                                $.extend(groupOptions, eval("({" + ($(element).attr(_dgo) || "") + "})"));
                            }), elements.each(function(e, t) {
                                position || t != object || (position = e + 1), views.push(new View(t, $.extend({}, groupOptions, options)));
                            });
                        }
                    } else {
                        var groupOptions = {};
                        isElement && $(object).is("[" + _dgo + "]") && ($.extend(groupOptions, eval("({" + ($(object).attr(_dgo) || "") + "})")), 
                        view = new View(object, $.extend({}, groupOptions, options))), views.push(view);
                    }
                    break;

                  case "array":
                    $.each(object, function(e, t) {
                        var i = new View(t, options);
                        views.push(i);
                    });
                }
                var groupExtend = {
                    grouped: {
                        caption: !1
                    }
                }, firstUI = views[0].options.ui;
                $.each(views, function(e, t) {
                    t.caption && (groupExtend.grouped.caption = !0), e > 0 && t.options.ui != firstUI && (t.options.ui = firstUI);
                }), $.each(views, function(e, t) {
                    t = $.extend(t, groupExtend);
                }), (!position || 1 > position) && (position = 1), position > views.length && (position = views.length);
                var positionInAPG;
                isElement && (positionInAPG = Pages.getPositionInActivePageGroup(object)) ? Window.setPosition(positionInAPG) : Window.load(views, position);
            }
        },
        showFallback: function() {
            function e(t) {
                var i = $.type(t);
                if ("string" == i) s = t; else if ("array" == i && t[0]) s = e(t[0]); else if (_.isElement(t) && $(t).attr("href")) var s = $(t).attr("href"); else s = !!t.url && t.url;
                return s;
            }
            return function(t) {
                if (this._fallback) {
                    var i = e(t);
                    i && (window.location.href = i);
                }
            };
        }()
    };
    $.extend(Fresco, {
        show: function(e) {
            return _Fresco.show.apply(_Fresco, _slice.call(arguments)), this;
        },
        hide: function() {
            return Window.hide(), this;
        },
        disable: function() {
            return _Fresco.stopDelegating(), _Fresco._disabled = !0, this;
        },
        enable: function() {
            return _Fresco._disabled = !1, _Fresco.startDelegating(), this;
        },
        fallback: function(e) {
            return _Fresco._fallback = e, this;
        },
        setDefaultSkin: function(e) {
            return Options.defaults.skin = e, this;
        }
    }), (Browser.IE && Browser.IE < 7 || "number" == $.type(Browser.Android) && Browser.Android < 3 || Browser.MobileSafari && "number" == $.type(Browser.WebKit) && Browser.WebKit < 533.18) && (_Fresco.show = _Fresco.showFallback);
    var Thumbnails = {
        initialize: function(e) {
            this.element = e, this._thumbnails = [], this._orientation = "vertical", this._vars = {
                thumbnail: {},
                thumbnailFrame: {},
                thumbnails: {}
            }, this.build(), this.startObserving();
        },
        build: function() {
            this.element.append(this.wrapper = $("<div>").addClass("fr-thumbnails-wrapper").append(this._slider = $("<div>").addClass("fr-thumbnails-slider").append(this._previous = $("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-previous").append(this._previous_button = $("<div>").addClass("fr-thumbnails-side-button").append($("<div>").addClass("fr-thumbnails-side-button-background")).append($("<div>").addClass("fr-thumbnails-side-button-icon")))).append(this._thumbs = $("<div>").addClass("fr-thumbnails-thumbs").append(this._slide = $("<div>").addClass("fr-thumbnails-slide"))).append(this._next = $("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-next").append(this._next_button = $("<div>").addClass("fr-thumbnails-side-button").append($("<div>").addClass("fr-thumbnails-side-button-background")).append($("<div>").addClass("fr-thumbnails-side-button-icon"))))));
        },
        startObserving: function() {
            this._slider.delegate(".fr-thumbnail", "click", $.proxy(function(e) {
                e.stopPropagation();
                var t = $(e.target).closest(".fr-thumbnail")[0], i = t && $(t).data("fr-position");
                i && (this.setActive(i), Window.setPosition(i));
            }, this)), this._slider.bind("click", function(e) {
                e.stopPropagation();
            }), this._previous.bind("click", $.proxy(this.previousPage, this)), this._next.bind("click", $.proxy(this.nextPage, this));
        },
        load: function(e) {
            this.clear();
            var t = "horizontal", i = !1;
            $.each(e, $.proxy(function(e, s) {
                "vertical" == s.options.thumbnails && (t = "vertical"), s.options.thumbnails || (i = !0);
            }, this)), this.setOrientation(t), this._disabledGroup = i, $.each(e, $.proxy(function(e, t) {
                this._thumbnails.push(new Thumbnail(t, e + 1));
            }, this)), this.fitToViewport();
        },
        clear: function() {
            $.each(this._thumbnails, function(e, t) {
                t.remove();
            }), this._thumbnails = [], this._position = -1, this._page = -1;
        },
        setOrientation: function(e) {
            this._orientation && Window.element.removeClass("fr-thumbnails-" + this._orientation), 
            Window.element.addClass("fr-thumbnails-" + e), this._orientation = e;
        },
        disable: function() {
            Window.element.removeClass("fr-thumbnails-enabled").addClass("fr-thumbnails-disabled"), 
            this._disabled = !0;
        },
        enable: function() {
            Window.element.removeClass("fr-thumbnails-disabled").addClass("fr-thumbnails-enabled"), 
            this._disabled = !1;
        },
        enabled: function() {
            return !this._disabled;
        },
        disabled: function() {
            return this._disabled;
        },
        updateVars: function() {
            var e = Window.element, t = this._vars, i = "horizontal" == this._orientation, s = i ? "top" : "left", n = i ? "left" : "top", o = i ? "bottom" : "left", a = i ? "top" : "right", r = i ? "width" : "height", l = i ? "height" : "width", c = {
                left: "right",
                right: "left",
                top: "bottom",
                bottom: "top"
            };
            this.element.removeClass("fr-thumbnails-measured");
            var h = e.is(":visible");
            if (h || e.show(), this.disabled() && this.enable(), !this.element.is(":visible") || this._thumbnails.length < 2 || this._disabledGroup) return this.disable(), 
            $.extend(this._vars.thumbnails, {
                width: 0,
                height: 0
            }), h || e.hide(), void this.element.addClass("fr-thumbnails-measured");
            this.enable();
            var d = this._previous, u = this._next, p = this._thumbs, f = Bounds.viewport(), m = this.element["inner" + _.String.capitalize(l)](), g = parseInt(this._thumbs.css("padding-" + s)) || 0, v = Math.max(m - 2 * g, 0), w = parseInt(this._thumbs.css("padding-" + n)) || 0, y = (parseInt(this.element.css("margin-" + o)) || 0) + (parseInt(this.element.css("margin-" + a)) || 0);
            $.extend(t.thumbnails, {
                height: m + y,
                width: f[i ? "width" : "height"],
                paddingTop: g
            }), $.extend(t.thumbnail, {
                height: v,
                width: v
            }), $.extend(t.thumbnailFrame, {
                width: v + 2 * w,
                height: m
            }), t.sides = {
                previous: {
                    width: u["inner" + _.String.capitalize(r)](),
                    marginLeft: parseInt(d.css("margin-" + n)) || 0,
                    marginRight: parseInt(d.css("margin-" + c[n])) || 0
                },
                next: {
                    width: u["inner" + _.String.capitalize(r)](),
                    marginLeft: parseInt(u.css("margin-" + n)) || 0,
                    marginRight: parseInt(u.css("margin-" + c[n])) || 0
                }
            };
            var b = f[r], x = t.thumbnailFrame.width, p = this._thumbnails.length;
            t.thumbnails.width = b, t.sides.enabled = p * x / b > 1;
            var S = b, C = t.sides, T = C.previous, k = C.next, E = T.marginLeft + T.width + T.marginRight + k.marginLeft + k.width + k.marginRight;
            t.sides.enabled && (S -= E);
            var P = p * x;
            (S = Math.floor(S / x) * x) > P && (S = P);
            var z = S + (t.sides.enabled ? E : 0);
            t.ipp = S / x, this._mode = "page", t.ipp <= 1 && (S = b, z = b, t.sides.enabled = !1, 
            this._mode = "center"), t.pages = Math.ceil(p * x / S), t.wrapper = {
                width: z + 1,
                height: m
            }, t.thumbs = {
                width: S,
                height: m
            }, t.slide = {
                width: p * x + 1,
                height: m
            }, h || e.hide(), this.element.addClass("fr-thumbnails-measured");
        },
        hide: function() {
            this.disable(), this.thumbnails.hide(), this._visible = !1;
        },
        getDimensions: function() {
            var e = "horizontal" == this._orientation;
            return {
                width: e ? this._vars.thumbnails.width : this._vars.thumbnails.height,
                height: e ? this._vars.thumbnails.height : this._vars.thumbnails.width
            };
        },
        fitToViewport: function() {
            if (this.updateVars(), !this.disabled()) {
                var e = $.extend({}, this._vars), t = "horizontal" == this._orientation;
                $.each(this._thumbnails, function(e, t) {
                    t.resize();
                }), this._previous[e.sides.enabled ? "show" : "hide"](), this._next[e.sides.enabled ? "show" : "hide"](), 
                this._thumbs.css({
                    width: e.thumbs[t ? "width" : "height"],
                    height: e.thumbs[t ? "height" : "width"]
                }), this._slide.css({
                    width: e.slide[t ? "width" : "height"],
                    height: e.slide[t ? "height" : "width"]
                });
                var i = {
                    width: e.wrapper[t ? "width" : "height"],
                    height: e.wrapper[t ? "height" : "width"]
                };
                i["margin-" + (t ? "left" : "top")] = Math.round(-.5 * e.wrapper.width) + "px", 
                i["margin-" + (t ? "top" : "left")] = 0, this.wrapper.css(i), this._position && this.moveTo(this._position, !0);
            }
        },
        moveToPage: function(e) {
            if (!(1 > e || e > this._vars.pages || e == this._page)) {
                var t = this._vars.ipp * (e - 1) + 1;
                this.moveTo(t);
            }
        },
        previousPage: function() {
            this.moveToPage(this._page - 1);
        },
        nextPage: function() {
            this.moveToPage(this._page + 1);
        },
        show: function(e) {
            var t = this._position < 0;
            1 > e && (e = 1);
            var i = this._thumbnails.length;
            e > i && (e = i), this._position = e, this.setActive(e), ("page" != this._mode || this._page != Math.ceil(e / this._vars.ipp)) && this.moveTo(e, t);
        },
        moveTo: function(e, t) {
            if (this.updateVars(), !this.disabled()) {
                var i, s = "horizontal" == this._orientation, n = .5 * Bounds.viewport()[s ? "width" : "height"], o = this._vars.thumbnailFrame.width;
                if ("page" == this._mode) {
                    r = Math.ceil(e / this._vars.ipp);
                    this._page = r, i = o * (this._page - 1) * this._vars.ipp * -1;
                    var a = "fr-thumbnails-side-button-disabled";
                    this._previous_button[(2 > r ? "add" : "remove") + "Class"](a), this._next_button[(r >= this._vars.pages ? "add" : "remove") + "Class"](a);
                } else i = n + -1 * (o * (e - 1) + .5 * o);
                var r = Pages.page, l = {}, c = {};
                l[s ? "top" : "left"] = 0, c[s ? "left" : "top"] = i + "px", this._slide.stop(!0).css(l).animate(c, t ? 0 : r ? r.view.options.effects.thumbnails.slide || 0 : 0, $.proxy(function() {
                    this.loadCurrentPage();
                }, this));
            }
        },
        loadCurrentPage: function() {
            var e, t;
            if (this._position && this._vars.thumbnailFrame.width && !(this._thumbnails.length < 1)) {
                if ("page" == this._mode) {
                    if (this._page < 1) return;
                    e = (this._page - 1) * this._vars.ipp + 1, t = Math.min(e - 1 + this._vars.ipp, this._thumbnails.length);
                } else {
                    var i = (this._orientation, Math.ceil(this._vars.thumbnails.width / this._vars.thumbnailFrame.width));
                    e = Math.max(Math.floor(Math.max(this._position - .5 * i, 0)), 1), t = Math.ceil(Math.min(this._position + .5 * i)), 
                    this._thumbnails.length < t && (t = this._thumbnails.length);
                }
                for (var s = e; t >= s; s++) this._thumbnails[s - 1].load();
            }
        },
        setActive: function(e) {
            this._slide.find(".fr-thumbnail-active").removeClass("fr-thumbnail-active");
            var t = e && this._thumbnails[e - 1];
            t && t.activate();
        },
        refresh: function() {
            this._position && this.setPosition(this._position);
        }
    };
    $.extend(Thumbnail.prototype, {
        initialize: function(e, t) {
            this.view = e, this._dimension = {}, this._position = t, this.preBuild();
        },
        preBuild: function() {
            this.thumbnail = $("<div>").addClass("fr-thumbnail").data("fr-position", this._position);
        },
        build: function() {
            if (!this.thumbnailFrame) {
                var e = this.view.options;
                Thumbnails._slide.append(this.thumbnailFrame = $("<div>").addClass("fr-thumbnail-frame").append(this.thumbnail.append(this.thumbnailWrapper = $("<div>").addClass("fr-thumbnail-wrapper")))), 
                "image" == this.view.type && this.thumbnail.addClass("fr-load-thumbnail").data("thumbnail", {
                    view: this.view,
                    src: e.thumbnail || this.view.url
                });
                var t = e.thumbnail && e.thumbnail.icon;
                t && this.thumbnail.append($("<div>").addClass("fr-thumbnail-icon fr-thumbnail-icon-" + t));
                this.thumbnail.append($("<div>").addClass("fr-thumbnail-overlay").append($("<div>").addClass("fr-thumbnail-overlay-background")).append(this.loading = $("<div>").addClass("fr-thumbnail-loading").append($("<div>").addClass("fr-thumbnail-loading-background")).append(this.spinner = $("<div>").addClass("fr-thumbnail-spinner").hide().append($("<div>").addClass("fr-thumbnail-spinner-spin")))).append($("<div>").addClass("fr-thumbnail-overlay-border"))), 
                this.thumbnail.append($("<div>").addClass("fr-thumbnail-state")), this.resize();
            }
        },
        remove: function() {
            this.thumbnailFrame && (this.thumbnailFrame.remove(), this.thumbnailFrame = null, 
            this.image = null), this.ready && (this.ready.abort(), this.ready = null), this.vimeoThumbnail && (this.vimeoThumbnail.abort(), 
            this.vimeoThumbnail = null), this._loading = !1, this._removed = !0, this.view = null, 
            this._clearDelay();
        },
        load: function() {
            if (!(this._loaded || this._loading || this._removed)) {
                this.thumbnailWrapper || this.build(), this._loading = !0;
                var e = this.view.options.thumbnail, t = e && "boolean" == $.type(e) ? this.view.url : e || this.view.url;
                if (this._url = t, t) if ("vimeo" == this.view.type) if (t == e) this._url = t, 
                this._load(this._url); else switch (this.view.type) {
                  case "vimeo":
                    this.vimeoThumbnail = new VimeoThumbnail(this.view.url, $.proxy(function(e) {
                        this._url = e, this._load(e);
                    }, this), $.proxy(function() {
                        this._error();
                    }, this));
                } else this._load(this._url);
            }
        },
        activate: function() {
            this.thumbnail.addClass("fr-thumbnail-active");
        },
        _load: function(e) {
            this.thumbnailWrapper.prepend(this.image = $("<img>").addClass("fr-thumbnail-image").attr({
                src: e
            }).css({
                opacity: 1e-4
            })), this.fadeInSpinner(), this.ready = new ImageReady(this.image[0], $.proxy(function(e) {
                var t = e.img;
                this.thumbnailFrame && this._loading && (this._loaded = !0, this._loading = !1, 
                this._dimensions = {
                    width: t.naturalWidth,
                    height: t.naturalHeight
                }, this.resize(), this.show());
            }, this), $.proxy(function() {
                this._error();
            }, this), {
                method: this.view.options.loadedMethod
            });
        },
        _error: function() {
            this._loaded = !0, this._loading = !1, this.thumbnail.addClass("fr-thumbnail-error"), 
            this.image && this.image.hide(), this.thumbnailWrapper.append($("<div>").addClass("fr-thumbnail-image")), 
            this.show();
        },
        fadeInSpinner: function() {
            if (Spinner.supported && this.view.options.spinner) {
                this._clearDelay();
                var e = this.view.options.effects.thumbnail;
                this._delay = setTimeout($.proxy(function() {
                    this.spinner.stop(!0).fadeTo(e.show || 0, 1);
                }, this), this.view.options.spinnerDelay || 0);
            }
        },
        show: function() {
            this._clearDelay();
            var e = this.view.options.effects.thumbnail;
            this.loading.stop(!0).delay(e.delay).fadeTo(e.show, 0);
        },
        _clearDelay: function() {
            this._delay && (clearTimeout(this._delay), this._delay = null);
        },
        resize: function() {
            if (this.thumbnailFrame) {
                var e = "horizontal" == Thumbnails._orientation;
                if (this.thumbnailFrame.css({
                    width: Thumbnails._vars.thumbnailFrame[e ? "width" : "height"],
                    height: Thumbnails._vars.thumbnailFrame[e ? "height" : "width"]
                }), this.thumbnailFrame.css({
                    top: e ? 0 : Thumbnails._vars.thumbnailFrame.width * (this._position - 1),
                    left: e ? Thumbnails._vars.thumbnailFrame.width * (this._position - 1) : 0
                }), this.thumbnailWrapper) {
                    var t = Thumbnails._vars.thumbnail;
                    if (this.thumbnail.css({
                        width: t.width,
                        height: t.height,
                        "margin-top": Math.round(-.5 * t.height),
                        "margin-left": Math.round(-.5 * t.width),
                        "margin-bottom": 0,
                        "margin-right": 0
                    }), this._dimensions) {
                        var i, s = {
                            width: t.width,
                            height: t.height
                        }, n = Math.max(s.width, s.height), o = $.extend({}, this._dimensions);
                        if (o.width > s.width && o.height > s.height) {
                            var a = 1, r = 1;
                            (i = Fit.within(s, o)).width < s.width && (a = s.width / i.width), i.height < s.height && (r = s.height / i.height);
                            var l = Math.max(a, r);
                            l > 1 && (i.width *= l, i.height *= l), $.each("width height".split(" "), function(e, t) {
                                i[t] = Math.round(i[t]);
                            });
                        } else i = Fit.within(this._dimensions, o.width < s.width || o.height < s.height ? {
                            width: n,
                            height: n
                        } : s);
                        var c = Math.round(.5 * s.width - .5 * i.width), h = Math.round(.5 * s.height - .5 * i.height);
                        this.image.removeAttr("style").css($.extend({}, i, {
                            top: h,
                            left: c
                        }));
                    }
                }
            }
        }
    });
    var UI = {
        _modes: [ "fullclick", "outside", "inside" ],
        _ui: !1,
        _validClickTargetSelector: [ ".fr-content-element", ".fr-content", ".fr-content > .fr-stroke", ".fr-content > .fr-stroke .fr-stroke-color" ].join(", "),
        initialize: function(e) {
            $.each(this._modes, $.proxy(function(e, t) {
                this[t].initialize();
            }, this)), Window.element.addClass("fr-ui-inside-hidden fr-ui-fullclick-hidden");
        },
        set: function(e) {
            this._ui && (Window.element.removeClass("fr-window-ui-" + this._ui), Overlay.element.removeClass("fr-overlay-ui-" + this._ui)), 
            Window.element.addClass("fr-window-ui-" + e), Overlay.element.addClass("fr-overlay-ui-" + e), 
            this._enabled && this._ui && this._ui != e && (this[this._ui].disable(), this[e].enable(), 
            UI[e].show()), this._ui = e;
        },
        _onWindowResize: function() {
            Support.mobileTouch && this.show();
        },
        enable: function() {
            $.each(this._modes, $.proxy(function(e, t) {
                UI[t][t == this._ui ? "enable" : "disable"]();
            }, this)), this._enabled = !0;
        },
        disable: function() {
            $.each(this._modes, $.proxy(function(e, t) {
                UI[t].disable();
            }, this)), this._enabled = !1;
        },
        adjustPrevNext: function(e, t) {
            UI[this._ui].adjustPrevNext(e, t);
        },
        show: function(e, t) {
            UI[this._ui].show(e, t);
        },
        hide: function(e, t) {
            UI[this._ui].hide(e, t);
        },
        reset: function() {
            $.each(this._modes, $.proxy(function(e, t) {
                UI[t].reset();
            }, this));
        },
        update: function() {
            var e = Pages.page;
            e && this.set(e._ui);
        }
    };
    return UI.fullclick = {
        initialize: function() {
            this.build(), this._scrollLeft = -1;
        },
        build: function() {
            Window._box.append(this._previous = $("<div>").addClass("fr-side fr-side-previous fr-side-previous-fullclick fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._next = $("<div>").addClass("fr-side fr-side-next fr-side-next-fullclick fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._close = $("<div>").addClass("fr-close fr-close-fullclick").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), 
            Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).hide(), 
            this._close.on("click", $.proxy(function(e) {
                e.preventDefault(), Window.hide();
            }, this)), this._previous.on("click", $.proxy(function(e) {
                Window.previous(), this._onMouseMove(e);
            }, this)), this._next.on("click", $.proxy(function(e) {
                Window.next(), this._onMouseMove(e);
            }, this));
        },
        enable: function() {
            this.bind();
        },
        disable: function() {
            this.unbind();
        },
        reset: function() {
            Window.timers.clear("ui-fullclick"), this._x = -1, this._y = -1, this._scrollLeft = -1, 
            this.resetPrevNext(), this._onMouseLeave();
        },
        resetPrevNext: function() {
            this._previous.add(this._next).stop(!0).removeAttr("style");
        },
        bind: function() {
            this._onMouseUpHandler || (this.unbind(), Window._pages.on("mouseup", ".fr-container", this._onMouseUpHandler = $.proxy(this._onMouseUp, this)), 
            Support.mobileTouch || (Window.element.on("mouseenter", this._showHandler = $.proxy(this.show, this)).on("mouseleave", this._hideHandler = $.proxy(this.hide, this)), 
            Window.element.on("mousemove", this._mousemoveHandler = $.proxy(function(e) {
                var t = e.pageX, i = e.pageY;
                this._hoveringSideButton || i == this._y && t == this._x || (this._x = t, this._y = i, 
                this.show(), this.startTimer());
            }, this)), Window._pages.on("mousemove", ".fr-container", this._onMouseMoveHandler = $.proxy(this._onMouseMove, this)).on("mouseleave", ".fr-container", this._onMouseLeaveHandler = $.proxy(this._onMouseLeave, this)).on("mouseenter", ".fr-container", this._onMouseEnterHandler = $.proxy(this._onMouseEnter, this)), 
            Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = $.proxy(this._onSideMouseEnter, this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = $.proxy(this._onSideMouseLeave, this)), 
            $(window).on("scroll", this._onScrollHandler = $.proxy(this._onScroll, this))));
        },
        unbind: function() {
            this._onMouseUpHandler && (Window._pages.off("mouseup", ".fr-container", this._onMouseUpHandler), 
            this._onMouseUpHandler = null, this._showHandler && (Window.element.off("mouseenter", this._showHandler).off("mouseleave", this._hideHandler).off("mousemove", this._mousemoveHandler), 
            Window._pages.off("mousemove", ".fr-container", this._onMouseMoveHandler).off("mouseleave", ".fr-container", this._onMouseLeaveHandler).off("mouseenter", ".fr-container", this._onMouseEnterHandler), 
            Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), 
            $(window).off("scroll", this._onScrollHandler), this._showHandler = null));
        },
        adjustPrevNext: function(e, t) {
            var i = Pages.page;
            if (i) {
                var s = Window.element.is(":visible");
                s || Window.element.show();
                var n = this._previous.attr("style");
                this._previous.removeAttr("style");
                var o = parseInt(this._previous.css("margin-top"));
                this._previous.attr({
                    style: n
                }), s || Window.element.hide();
                var a = i._infoHeight || 0, r = this._previous.add(this._next), l = {
                    "margin-top": o - .5 * a
                }, c = "number" == $.type(t) ? t : Pages.page && Pages.page.view.options.effects.content.show || 0;
                this.opening && (c = 0), r.stop(!0).animate(l, c, e), this._previous[(Window.mayPrevious() ? "remove" : "add") + "Class"]("fr-side-disabled"), 
                this._next[(Window.mayNext() ? "remove" : "add") + "Class"]("fr-side-disabled"), 
                r[(i._total < 2 ? "add" : "remove") + "Class"]("fr-side-hidden"), e && e();
            } else e && e();
        },
        _onScroll: function() {
            this._scrollLeft = $(window).scrollLeft();
        },
        _onMouseMove: function(e) {
            if (!Support.mobileTouch) {
                var t = this._getEventSide(e), i = _.String.capitalize(t), s = !!t && Window["may" + i]();
                if (t != this._hoveringSide || s != this._mayClickHoveringSide) switch (this._hoveringSide = t, 
                this._mayClickHoveringSide = s, Window._box[(s ? "add" : "remove") + "Class"]("fr-hovering-clickable"), 
                t) {
                  case "previous":
                    Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
                    break;

                  case "next":
                    Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous");
                }
            }
        },
        _onMouseLeave: function(e) {
            Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), 
            this._hoveringSide = !1;
        },
        _onMouseUp: function(e) {
            if (!(e.which > 1)) {
                if (1 == Pages.pages.length) return void Window.hide();
                var t = this._getEventSide(e);
                Window[t](), this._onMouseMove(e);
            }
        },
        _onMouseEnter: function(e) {
            this._onMouseMove(e);
        },
        _getEventSide: function(e) {
            var t = (this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(), 
            e.pageX - Window._boxPosition.left - this._scrollLeft);
            return .5 * Window._boxDimensions.width > t ? "previous" : "next";
        },
        _onSideMouseEnter: function(e) {
            this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(e), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)](), 
            this.clearTimer();
        },
        _onSideMouseLeave: function(e) {
            this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1, 
            this.startTimer();
        },
        show: function(e) {
            return this._visible ? (this.startTimer(), void ("function" == $.type(e) && e())) : (this._visible = !0, 
            this.startTimer(), Window.element.addClass("fr-visible-fullclick-ui").removeClass("fr-hidden-fullclick-ui"), 
            Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).show(), 
            void ("function" == $.type(e) && e()));
        },
        hide: function(e) {
            var t = Pages.page && Pages.page.view.type;
            return !this._visible || t && ("youtube" == t || "vimeo" == t) ? void ("function" == $.type(e) && e()) : (this._visible = !1, 
            Window.element.removeClass("fr-visible-fullclick-ui").addClass("fr-hidden-fullclick-ui"), 
            void ("function" == $.type(e) && e()));
        },
        clearTimer: function() {
            Support.mobileTouch || Window.timers.clear("ui-fullclick");
        },
        startTimer: function() {
            Support.mobileTouch || (this.clearTimer(), Window.timers.set("ui-fullclick", $.proxy(function() {
                this.hide();
            }, this), Window.view ? Window.view.options.uiDelay : 0));
        }
    }, UI.inside = {
        initialize: function() {},
        enable: function() {
            this.bind();
        },
        disable: function() {
            this.unbind();
        },
        bind: function() {
            this._onMouseUpHandler || (this.unbind(), Window._pages.on("mouseup", ".fr-content", this._onMouseUpHandler = $.proxy(this._onMouseUp, this)), 
            Window._pages.on("click", ".fr-content .fr-close", $.proxy(function(e) {
                e.preventDefault(), Window.hide();
            }, this)).on("click", ".fr-content .fr-side-previous", $.proxy(function(e) {
                Window.previous(), this._onMouseMove(e);
            }, this)).on("click", ".fr-content .fr-side-next", $.proxy(function(e) {
                Window.next(), this._onMouseMove(e);
            }, this)), Window.element.on("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler = $.proxy(this._delegateOverlayClose, this)), 
            Support.mobileTouch || (Window.element.on("mouseenter", ".fr-content", this._showHandler = $.proxy(this.show, this)).on("mouseleave", ".fr-content", this._hideHandler = $.proxy(this.hide, this)), 
            Window.element.on("mousemove", ".fr-content", this._mousemoveHandler = $.proxy(function(e) {
                var t = e.pageX, i = e.pageY;
                this._hoveringSideButton || i == this._y && t == this._x || (this._x = t, this._y = i, 
                this.show(), this.startTimer());
            }, this)), Window._pages.on("mousemove", ".fr-info, .fr-close", $.proxy(function(e) {
                e.stopPropagation(), this._onMouseLeave(e);
            }, this)), Window._pages.on("mousemove", ".fr-info", $.proxy(function(e) {
                this.clearTimer();
            }, this)), Window._pages.on("mousemove", ".fr-content", this._onMouseMoveHandler = $.proxy(this._onMouseMove, this)).on("mouseleave", ".fr-content", this._onMouseLeaveHandler = $.proxy(this._onMouseLeave, this)).on("mouseenter", ".fr-content", this._onMouseEnterHandler = $.proxy(this._onMouseEnter, this)), 
            Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = $.proxy(this._onSideMouseEnter, this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = $.proxy(this._onSideMouseLeave, this)), 
            $(window).on("scroll", this._onScrollHandler = $.proxy(this._onScroll, this))));
        },
        unbind: function() {
            this._onMouseUpHandler && (Window._pages.off("mouseup", ".fr-content", this._onMouseUpHandler), 
            this._onMouseUpHandler = null, Window._pages.off("click", ".fr-content .fr-close").off("click", ".fr-content .fr-side-previous").off("click", ".fr-content .fr-side-next"), 
            Window.element.off("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler), 
            this._showHandler && (Window.element.off("mouseenter", ".fr-content", this._showHandler).off("mouseleave", ".fr-content", this._hideHandler).off("mousemove", ".fr-content", this._mousemoveHandler), 
            Window._pages.off("mousemove", ".fr-info, .fr-close"), Window._pages.off("mousemove", ".fr-info"), 
            Window._pages.off("mousemove", ".fr-content-element", this._onMouseMoveHandler).off("mouseleave", ".fr-content", this._onMouseLeaveHandler).off("mouseenter", ".fr-content", this._onMouseEnterHandler), 
            Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), 
            $(window).off("scroll", this._onScrollHandler), this._showHandler = null));
        },
        reset: function() {
            Window.timers.clear("ui-fullclick"), this._x = -1, this._y = -1, this._scrollLeft = -1, 
            this._hoveringSide = !1, this._onMouseLeave();
        },
        adjustPrevNext: function(e) {
            e && e();
        },
        _onScroll: function() {
            this._scrollLeft = $(window).scrollLeft();
        },
        _delegateOverlayClose: function(e) {
            var t = Pages.page;
            t && t.view.options.overlay && !t.view.options.overlay.close || $(e.target).is(".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper") && (e.preventDefault(), 
            e.stopPropagation(), Window.hide());
        },
        _onMouseMove: function(e) {
            if (!Support.mobileTouch) {
                var t = this._getEventSide(e), i = _.String.capitalize(t), s = !!t && Window["may" + i]();
                if ((1 == Pages.pages.length || Pages.page && "close" == Pages.page.view.options.onClick) && (t = !1), 
                t != this._hoveringSide || s != this._mayClickHoveringSide) if (this._hoveringSide = t, 
                this._mayClickHoveringSide = s, t) switch (Window._box[(s ? "add" : "remove") + "Class"]("fr-hovering-clickable"), 
                t) {
                  case "previous":
                    Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
                    break;

                  case "next":
                    Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous");
                } else Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next");
            }
        },
        _onMouseLeave: function(e) {
            Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), 
            this._hoveringSide = !1;
        },
        _onMouseUp: function(e) {
            if (!(e.which > 1) && $(e.target).is(UI._validClickTargetSelector)) {
                if (1 == Pages.pages.length || Pages.page && "close" == Pages.page.view.options.onClick) return void Window.hide();
                var t = this._getEventSide(e);
                Window[t](), this._onMouseMove(e);
            }
        },
        _onMouseEnter: function(e) {
            this._onMouseMove(e);
        },
        _getEventSide: function(e) {
            var t = (this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(), 
            e.pageX - Window._boxPosition.left - this._scrollLeft);
            return .5 * Window._boxDimensions.width > t ? "previous" : "next";
        },
        _onSideMouseEnter: function(e) {
            this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(e), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)](), 
            this.clearTimer();
        },
        _onSideMouseLeave: function(e) {
            this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1, 
            this.startTimer();
        },
        show: function(e) {
            return this._visible ? (this.startTimer(), void ("function" == $.type(e) && e())) : (this._visible = !0, 
            this.startTimer(), Window.element.addClass("fr-visible-inside-ui").removeClass("fr-hidden-inside-ui"), 
            void ("function" == $.type(e) && e()));
        },
        hide: function(e) {
            return this._visible ? (this._visible = !1, Window.element.removeClass("fr-visible-inside-ui").addClass("fr-hidden-inside-ui"), 
            void ("function" == $.type(e) && e())) : void ("function" == $.type(e) && e());
        },
        clearTimer: function() {
            Support.mobileTouch || Window.timers.clear("ui-inside");
        },
        startTimer: function() {
            Support.mobileTouch || (this.clearTimer(), Window.timers.set("ui-inside", $.proxy(function() {
                this.hide();
            }, this), Window.view ? Window.view.options.uiDelay : 0));
        }
    }, UI.outside = {
        initialize: function() {
            this.build(), this._scrollLeft = -1;
        },
        build: function() {
            Window._box.append(this._previous = $("<div>").addClass("fr-side fr-side-previous fr-side-previous-outside").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._next = $("<div>").addClass("fr-side fr-side-next fr-side-next-outside").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._close = $("<div>").addClass("fr-close fr-close-outside").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), 
            Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).hide(), 
            this._close.on("click", $.proxy(function(e) {
                e.preventDefault(), Window.hide();
            }, this)), this._previous.on("click", $.proxy(function(e) {
                Window.previous(), this._onMouseMove(e);
            }, this)), this._next.on("click", $.proxy(function(e) {
                Window.next(), this._onMouseMove(e);
            }, this));
        },
        enable: function() {
            this.bind();
        },
        disable: function() {
            this.unbind();
        },
        reset: function() {
            Window.timers.clear("ui-outside"), this._x = -1, this._y = -1, this._scrollLeft = -1, 
            this._onMouseLeave();
        },
        bind: function() {
            this._onMouseUpHandler || (this.unbind(), Window.element.on("mouseup", ".fr-content", this._onMouseUpHandler = $.proxy(this._onMouseUp, this)), 
            Window.element.on("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler = $.proxy(this._delegateOverlayClose, this)), 
            Support.mobileTouch || (Window._pages.on("mousemove", ".fr-content", this._onMouseMoveHandler = $.proxy(this._onMouseMove, this)).on("mouseleave", ".fr-content", this._onMouseLeaveHandler = $.proxy(this._onMouseLeave, this)).on("mouseenter", ".fr-content", this._onMouseEnterHandler = $.proxy(this._onMouseEnter, this)), 
            Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = $.proxy(this._onSideMouseEnter, this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = $.proxy(this._onSideMouseLeave, this)), 
            $(window).on("scroll", this._onScrollHandler = $.proxy(this._onScroll, this))));
        },
        unbind: function() {
            this._onMouseUpHandler && (Window.element.off("mouseup", ".fr-content", this._onMouseUpHandler), 
            this._onMouseUpHandler = null, Window.element.off("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler), 
            this._onMouseMoveHandler && (Window._pages.off("mousemove", ".fr-content", this._onMouseMoveHandler).off("mouseleave", ".fr-content", this._onMouseLeaveHandler).off("mouseenter", ".fr-content", this._onMouseEnterHandler), 
            Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), 
            $(window).off("scroll", this._onScrollHandler), this._onMouseMoveHandler = null));
        },
        adjustPrevNext: function(e, t) {
            var i = Pages.page;
            if (i) {
                var s = this._previous.add(this._next);
                this._previous[(Window.mayPrevious() ? "remove" : "add") + "Class"]("fr-side-disabled"), 
                this._next[(Window.mayNext() ? "remove" : "add") + "Class"]("fr-side-disabled"), 
                s[(i._total < 2 ? "add" : "remove") + "Class"]("fr-side-hidden"), e && e();
            } else e && e();
        },
        _onScroll: function() {
            this._scrollLeft = $(window).scrollLeft();
        },
        _delegateOverlayClose: function(e) {
            var t = Pages.page;
            t && t.view.options.overlay && !t.view.options.overlay.close || $(e.target).is(".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper") && (e.preventDefault(), 
            e.stopPropagation(), Window.hide());
        },
        _onMouseMove: function(e) {
            if (!Support.mobileTouch) {
                var t = this._getEventSide(e), i = _.String.capitalize(t), s = !!t && Window["may" + i]();
                if ((1 == Pages.pages.length || Pages.page && "close" == Pages.page.view.options.onClick) && (t = !1), 
                t != this._hoveringSide || s != this._mayClickHoveringSide) if (this._hoveringSide = t, 
                this._mayClickHoveringSide = s, t) switch (Window._box[(s ? "add" : "remove") + "Class"]("fr-hovering-clickable"), 
                t) {
                  case "previous":
                    Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
                    break;

                  case "next":
                    Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous");
                } else Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next");
            }
        },
        _onMouseLeave: function(e) {
            Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), 
            this._hoveringSide = !1;
        },
        _onMouseUp: function(e) {
            if (!(e.which > 1) && $(e.target).is(UI._validClickTargetSelector)) {
                if (1 == Pages.pages.length || Pages.page && "close" == Pages.page.view.options.onClick) return void Window.hide();
                var t = this._getEventSide(e);
                Window[t](), this._onMouseMove(e);
            }
        },
        _onMouseEnter: function(e) {
            this._onMouseMove(e);
        },
        _getEventSide: function(e) {
            var t = (this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(), 
            e.pageX - Window._boxPosition.left - this._scrollLeft);
            return .5 * Window._boxDimensions.width > t ? "previous" : "next";
        },
        show: function() {
            Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).show();
        },
        hide: function() {},
        _onSideMouseEnter: function(e) {
            this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(e), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)]();
        },
        _onSideMouseLeave: function(e) {
            this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1;
        },
        clearTimer: function() {}
    }, $(document).ready(function(e) {
        _Fresco.initialize();
    }), Fresco;
}), function() {
    function e() {}
    function t(e, t) {
        for (var i = e.length; i--; ) if (e[i].listener === t) return i;
        return -1;
    }
    function i(e) {
        return function() {
            return this[e].apply(this, arguments);
        };
    }
    var s = e.prototype, n = this, o = n.EventEmitter;
    s.getListeners = function(e) {
        var t, i, s = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (i in s) s.hasOwnProperty(i) && e.test(i) && (t[i] = s[i]);
        } else t = s[e] || (s[e] = []);
        return t;
    }, s.flattenListeners = function(e) {
        var t, i = [];
        for (t = 0; t < e.length; t += 1) i.push(e[t].listener);
        return i;
    }, s.getListenersAsObject = function(e) {
        var t, i = this.getListeners(e);
        return i instanceof Array && ((t = {})[e] = i), t || i;
    }, s.addListener = function(e, i) {
        var s, n = this.getListenersAsObject(e), o = "object" == typeof i;
        for (s in n) n.hasOwnProperty(s) && -1 === t(n[s], i) && n[s].push(o ? i : {
            listener: i,
            once: !1
        });
        return this;
    }, s.on = i("addListener"), s.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        });
    }, s.once = i("addOnceListener"), s.defineEvent = function(e) {
        return this.getListeners(e), this;
    }, s.defineEvents = function(e) {
        for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
        return this;
    }, s.removeListener = function(e, i) {
        var s, n, o = this.getListenersAsObject(e);
        for (n in o) o.hasOwnProperty(n) && -1 !== (s = t(o[n], i)) && o[n].splice(s, 1);
        return this;
    }, s.off = i("removeListener"), s.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t);
    }, s.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t);
    }, s.manipulateListeners = function(e, t, i) {
        var s, n, o = e ? this.removeListener : this.addListener, a = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp) for (s = i.length; s--; ) o.call(this, t, i[s]); else for (s in t) t.hasOwnProperty(s) && (n = t[s]) && ("function" == typeof n ? o.call(this, s, n) : a.call(this, s, n));
        return this;
    }, s.removeEvent = function(e) {
        var t, i = typeof e, s = this._getEvents();
        if ("string" === i) delete s[e]; else if ("object" === i) for (t in s) s.hasOwnProperty(t) && e.test(t) && delete s[t]; else delete this._events;
        return this;
    }, s.removeAllListeners = i("removeEvent"), s.emitEvent = function(e, t) {
        var i, s, n, o = this.getListenersAsObject(e);
        for (n in o) if (o.hasOwnProperty(n)) for (s = o[n].length; s--; ) !0 === (i = o[n][s]).once && this.removeListener(e, i.listener), 
        i.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, i.listener);
        return this;
    }, s.trigger = i("emitEvent"), s.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t);
    }, s.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e, this;
    }, s._getOnceReturnValue = function() {
        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue;
    }, s._getEvents = function() {
        return this._events || (this._events = {});
    }, e.noConflict = function() {
        return n.EventEmitter = o, e;
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return e;
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e;
}.call(this), function(e) {
    function t(t) {
        var i = e.event;
        return i.target = i.target || i.srcElement || t, i;
    }
    var i = document.documentElement, s = function() {};
    i.addEventListener ? s = function(e, t, i) {
        e.addEventListener(t, i, !1);
    } : i.attachEvent && (s = function(e, i, s) {
        e[i + s] = s.handleEvent ? function() {
            var i = t(e);
            s.handleEvent.call(s, i);
        } : function() {
            var i = t(e);
            s.call(e, i);
        }, e.attachEvent("on" + i, e[i + s]);
    });
    var n = function() {};
    i.removeEventListener ? n = function(e, t, i) {
        e.removeEventListener(t, i, !1);
    } : i.detachEvent && (n = function(e, t, i) {
        e.detachEvent("on" + t, e[t + i]);
        try {
            delete e[t + i];
        } catch (s) {
            e[t + i] = void 0;
        }
    });
    var o = {
        bind: s,
        unbind: n
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o;
}(this), function(e, t) {
    "function" == typeof define && define.amd ? define([ "eventEmitter/EventEmitter", "eventie/eventie" ], function(i, s) {
        return t(e, i, s);
    }) : "object" == typeof exports ? module.exports = t(e, require("eventEmitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie);
}(this, function(e, t, i) {
    function s(e, t) {
        for (var i in t) e[i] = t[i];
        return e;
    }
    function n(e) {
        return "[object Array]" === u.call(e);
    }
    function o(e) {
        var t = [];
        if (n(e)) t = e; else if ("number" == typeof e.length) for (var i = 0, s = e.length; i < s; i++) t.push(e[i]); else t.push(e);
        return t;
    }
    function a(e, t, i) {
        if (!(this instanceof a)) return new a(e, t);
        "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), 
        this.options = s({}, this.options), "function" == typeof t ? i = t : s(this.options, t), 
        i && this.on("always", i), this.getImages(), c && (this.jqDeferred = new c.Deferred());
        var n = this;
        setTimeout(function() {
            n.check();
        });
    }
    function r(e) {
        this.img = e;
    }
    function l(e) {
        this.src = e, p[e] = this;
    }
    var c = e.jQuery, h = e.console, d = void 0 !== h, u = Object.prototype.toString;
    a.prototype = new t(), a.prototype.options = {}, a.prototype.getImages = function() {
        this.images = [];
        for (var e = 0, t = this.elements.length; e < t; e++) {
            var i = this.elements[e];
            "IMG" === i.nodeName && this.addImage(i);
            for (var s = i.querySelectorAll("img"), n = 0, o = s.length; n < o; n++) {
                var a = s[n];
                this.addImage(a);
            }
        }
    }, a.prototype.addImage = function(e) {
        var t = new r(e);
        this.images.push(t);
    }, a.prototype.check = function() {
        function e(e, n) {
            return t.options.debug && d && h.log("confirm", e, n), t.progress(e), ++i === s && t.complete(), 
            !0;
        }
        var t = this, i = 0, s = this.images.length;
        if (this.hasAnyBroken = !1, s) for (var n = 0; n < s; n++) {
            var o = this.images[n];
            o.on("confirm", e), o.check();
        } else this.complete();
    }, a.prototype.progress = function(e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function() {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e);
        });
    }, a.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function() {
            if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                var i = t.hasAnyBroken ? "reject" : "resolve";
                t.jqDeferred[i](t);
            }
        });
    }, c && (c.fn.imagesLoaded = function(e, t) {
        return new a(this, e, t).jqDeferred.promise(c(this));
    }), r.prototype = new t(), r.prototype.check = function() {
        var e = p[this.img.src] || new l(this.img.src);
        if (e.isConfirmed) this.confirm(e.isLoaded, "cached was confirmed"); else if (this.img.complete && void 0 !== this.img.naturalWidth) this.confirm(0 !== this.img.naturalWidth, "naturalWidth"); else {
            var t = this;
            e.on("confirm", function(e, i) {
                return t.confirm(e.isLoaded, i), !0;
            }), e.check();
        }
    }, r.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emit("confirm", this, t);
    };
    var p = {};
    return l.prototype = new t(), l.prototype.check = function() {
        if (!this.isChecked) {
            var e = new Image();
            i.bind(e, "load", this), i.bind(e, "error", this), e.src = this.src, this.isChecked = !0;
        }
    }, l.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
    }, l.prototype.onload = function(e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e);
    }, l.prototype.onerror = function(e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e);
    }, l.prototype.confirm = function(e, t) {
        this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t);
    }, l.prototype.unbindProxyEvents = function(e) {
        i.unbind(e.target, "load", this), i.unbind(e.target, "error", this);
    }, a;
}), function(e) {
    "use strict";
    function t(t, i) {
        this.$target = e(t), this.opts = e.extend({}, l, i, this.$target.data()), void 0 === this.isOpen && this._init();
    }
    var i, s, n, o, a, r, l = {
        loadingNotice: "Loading image",
        errorNotice: "The image could not be loaded",
        errorDuration: 2500,
        linkAttribute: "href",
        preventClicks: !0,
        beforeShow: e.noop,
        beforeHide: e.noop,
        onShow: e.noop,
        onHide: e.noop,
        onMove: e.noop
    };
    t.prototype._init = function() {
        this.$link = this.$target.find("a"), this.$image = this.$target.find("img"), this.$flyout = e('<div class="easyzoom-flyout" />'), 
        this.$notice = e('<div class="easyzoom-notice" />'), this.$target.on({
            "mousemove.easyzoom touchmove.easyzoom": e.proxy(this._onMove, this),
            "mouseleave.easyzoom touchend.easyzoom": e.proxy(this._onLeave, this),
            "mouseenter.easyzoom touchstart.easyzoom": e.proxy(this._onEnter, this)
        }), this.opts.preventClicks && this.$target.on("click.easyzoom", function(e) {
            e.preventDefault();
        });
    }, t.prototype.show = function(e, t) {
        var a, r, l, c, h = this;
        if (!1 !== this.opts.beforeShow.call(this)) {
            if (!this.isReady) return this._loadImage(this.$link.attr(this.opts.linkAttribute), function() {
                (h.isMouseOver || !t) && h.show(e);
            });
            this.$target.append(this.$flyout), a = this.$target.width(), r = this.$target.height(), 
            l = this.$flyout.width(), c = this.$flyout.height(), i = this.$zoom.width() - l, 
            s = this.$zoom.height() - c, 0 > i && (i = 0), 0 > s && (s = 0), n = i / a, o = s / r, 
            this.isOpen = !0, this.opts.onShow.call(this), e && this._move(e);
        }
    }, t.prototype._onEnter = function(e) {
        var t = e.originalEvent.touches;
        this.isMouseOver = !0, t && 1 != t.length || (e.preventDefault(), this.show(e, !0));
    }, t.prototype._onMove = function(e) {
        this.isOpen && (e.preventDefault(), this._move(e));
    }, t.prototype._onLeave = function() {
        this.isMouseOver = !1, this.isOpen && this.hide();
    }, t.prototype._onLoad = function(e) {
        e.currentTarget.width && (this.isReady = !0, this.$notice.detach(), this.$flyout.html(this.$zoom), 
        this.$target.removeClass("is-loading").addClass("is-ready"), e.data.call && e.data());
    }, t.prototype._onError = function() {
        var e = this;
        this.$notice.text(this.opts.errorNotice), this.$target.removeClass("is-loading").addClass("is-error"), 
        this.detachNotice = setTimeout(function() {
            e.$notice.detach(), e.detachNotice = null;
        }, this.opts.errorDuration);
    }, t.prototype._loadImage = function(t, i) {
        var s = new Image();
        this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)), 
        this.$zoom = e(s).on("error", e.proxy(this._onError, this)).on("load", i, e.proxy(this._onLoad, this)), 
        s.style.position = "absolute", s.src = t;
    }, t.prototype._move = function(e) {
        if (0 === e.type.indexOf("touch")) {
            var t = e.touches || e.originalEvent.touches;
            a = t[0].pageX, r = t[0].pageY;
        } else a = e.pageX || a, r = e.pageY || r;
        var l = this.$target.offset(), c = r - l.top, h = a - l.left, d = Math.ceil(c * o), u = Math.ceil(h * n);
        if (0 > u || 0 > d || u > i || d > s) this.hide(); else {
            var p = -1 * d, f = -1 * u;
            this.$zoom.css({
                top: p,
                left: f
            }), this.opts.onMove.call(this, p, f);
        }
    }, t.prototype.hide = function() {
        this.isOpen && !1 !== this.opts.beforeHide.call(this) && (this.$flyout.detach(), 
        this.isOpen = !1, this.opts.onHide.call(this));
    }, t.prototype.swap = function(t, i, s) {
        this.hide(), this.isReady = !1, this.detachNotice && clearTimeout(this.detachNotice), 
        this.$notice.parent().length && this.$notice.detach(), this.$target.removeClass("is-loading is-ready is-error"), 
        this.$image.attr({
            src: t,
            srcset: e.isArray(s) ? s.join() : s
        }), this.$link.attr(this.opts.linkAttribute, i);
    }, t.prototype.teardown = function() {
        this.hide(), this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"), 
        this.detachNotice && clearTimeout(this.detachNotice), delete this.$link, delete this.$zoom, 
        delete this.$image, delete this.$notice, delete this.$flyout, delete this.isOpen, 
        delete this.isReady;
    }, e.fn.easyZoom = function(i) {
        return this.each(function() {
            var s = e.data(this, "easyZoom");
            s ? void 0 === s.isOpen && s._init() : e.data(this, "easyZoom", new t(this, i));
        });
    }, "function" == typeof define && define.amd ? define(function() {
        return t;
    }) : "undefined" != typeof module && module.exports && (module.exports = t);
}(jQuery), function(e) {
    "function" == typeof define && define.amd && define.amd.jQuery ? define([ "jquery" ], e) : e(jQuery);
}(function(e) {
    function t(t) {
        return !t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = c), 
        void 0 !== t.click && void 0 === t.tap && (t.tap = t.click), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), 
        this.each(function() {
            var s = e(this), n = s.data(T);
            n || (n = new i(this, t), s.data(T, n));
        });
    }
    function i(t, i) {
        function k(t) {
            if (!(re() || e(t.target).closest(i.excludedElements, Ne).length > 0)) {
                var s, n = t.originalEvent ? t.originalEvent : t, o = C ? n.touches[0] : n;
                return Fe = b, C ? Ve = n.touches.length : t.preventDefault(), $e = 0, Oe = null, 
                je = null, He = 0, We = 0, Ae = 0, De = 1, Re = 0, qe = ue(), Be = me(), oe(), !C || Ve === i.fingers || i.fingers === w || B() ? (ce(0, o), 
                Ye = Ce(), 2 == Ve && (ce(1, n.touches[1]), We = Ae = we(qe[0].start, qe[1].start)), 
                (i.swipeStatus || i.pinchStatus) && (s = $(n, Fe))) : s = !1, !1 === s ? (Fe = S, 
                $(n, Fe), s) : (le(!0), null);
            }
        }
        function E(e) {
            var t = e.originalEvent ? e.originalEvent : e;
            if (Fe !== x && Fe !== S && !ae()) {
                var s, n = he(C ? t.touches[0] : t);
                if (Ge = Ce(), C && (Ve = t.touches.length), Fe = _, 2 == Ve && (0 == We ? (ce(1, t.touches[1]), 
                We = Ae = we(qe[0].start, qe[1].start)) : (he(t.touches[1]), Ae = we(qe[0].end, qe[1].end), 
                je = be(qe[0].end, qe[1].end)), De = ye(We, Ae), Re = Math.abs(We - Ae)), Ve === i.fingers || i.fingers === w || !C || B()) {
                    if (Oe = Se(n.start, n.end), R(e, Oe), $e = _e(n.start, n.end), He = ve(), pe(Oe, $e), 
                    (i.swipeStatus || i.pinchStatus) && (s = $(t, Fe)), !i.triggerOnTouchEnd || i.triggerOnTouchLeave) {
                        var o = !0;
                        if (i.triggerOnTouchLeave) {
                            var a = Te(this);
                            o = ke(n.end, a);
                        }
                        !i.triggerOnTouchEnd && o ? Fe = L(_) : i.triggerOnTouchLeave && !o && (Fe = L(x)), 
                        Fe != S && Fe != x || $(t, Fe);
                    }
                } else $(t, Fe = S);
                !1 === s && $(t, Fe = S);
            }
        }
        function P(e) {
            var t = e.originalEvent;
            return C && t.touches.length > 0 ? (ne(), !0) : (ae() && (Ve = Ue), e.preventDefault(), 
            Ge = Ce(), He = ve(), W() ? $(t, Fe = S) : i.triggerOnTouchEnd || 0 == i.triggerOnTouchEnd && Fe === _ ? $(t, Fe = x) : !i.triggerOnTouchEnd && X() ? O(t, Fe = x, p) : Fe === _ && $(t, Fe = S), 
            le(!1), null);
        }
        function z() {
            Ve = 0, Ge = 0, Ye = 0, We = 0, Ae = 0, De = 1, oe(), le(!1);
        }
        function I(e) {
            var t = e.originalEvent;
            i.triggerOnTouchLeave && $(t, Fe = L(x));
        }
        function M() {
            Ne.unbind(Pe, k), Ne.unbind(Le, z), Ne.unbind(ze, E), Ne.unbind(Ie, P), Me && Ne.unbind(Me, I), 
            le(!1);
        }
        function L(e) {
            var t = e, s = D(), n = H(), o = W();
            return !s || o ? t = S : !n || e != _ || i.triggerOnTouchEnd && !i.triggerOnTouchLeave ? !n && e == x && i.triggerOnTouchLeave && (t = S) : t = x, 
            t;
        }
        function $(e, t) {
            var i = void 0;
            return q() || V() ? i = O(e, t, d) : (N() || B()) && !1 !== i && (i = O(e, t, u)), 
            ie() && !1 !== i ? i = O(e, t, f) : se() && !1 !== i ? i = O(e, t, m) : te() && !1 !== i && (i = O(e, t, p)), 
            t === S && z(e), t === x && (C ? 0 == e.touches.length && z(e) : z(e)), i;
        }
        function O(t, c, h) {
            var g = void 0;
            if (h == d) {
                if (Ne.trigger("swipeStatus", [ c, Oe || null, $e || 0, He || 0, Ve ]), i.swipeStatus && !1 === (g = i.swipeStatus.call(Ne, t, c, Oe || null, $e || 0, He || 0, Ve))) return !1;
                if (c == x && F()) {
                    if (Ne.trigger("swipe", [ Oe, $e, He, Ve ]), i.swipe && !1 === (g = i.swipe.call(Ne, t, Oe, $e, He, Ve))) return !1;
                    switch (Oe) {
                      case s:
                        Ne.trigger("swipeLeft", [ Oe, $e, He, Ve ]), i.swipeLeft && (g = i.swipeLeft.call(Ne, t, Oe, $e, He, Ve));
                        break;

                      case n:
                        Ne.trigger("swipeRight", [ Oe, $e, He, Ve ]), i.swipeRight && (g = i.swipeRight.call(Ne, t, Oe, $e, He, Ve));
                        break;

                      case o:
                        Ne.trigger("swipeUp", [ Oe, $e, He, Ve ]), i.swipeUp && (g = i.swipeUp.call(Ne, t, Oe, $e, He, Ve));
                        break;

                      case a:
                        Ne.trigger("swipeDown", [ Oe, $e, He, Ve ]), i.swipeDown && (g = i.swipeDown.call(Ne, t, Oe, $e, He, Ve));
                    }
                }
            }
            if (h == u) {
                if (Ne.trigger("pinchStatus", [ c, je || null, Re || 0, He || 0, Ve, De ]), i.pinchStatus && !1 === (g = i.pinchStatus.call(Ne, t, c, je || null, Re || 0, He || 0, Ve, De))) return !1;
                if (c == x && j()) switch (je) {
                  case r:
                    Ne.trigger("pinchIn", [ je || null, Re || 0, He || 0, Ve, De ]), i.pinchIn && (g = i.pinchIn.call(Ne, t, je || null, Re || 0, He || 0, Ve, De));
                    break;

                  case l:
                    Ne.trigger("pinchOut", [ je || null, Re || 0, He || 0, Ve, De ]), i.pinchOut && (g = i.pinchOut.call(Ne, t, je || null, Re || 0, He || 0, Ve, De));
                }
            }
            return h == p ? c !== S && c !== x || (clearTimeout(Qe), U() && !Z() ? (Ke = Ce(), 
            Qe = setTimeout(e.proxy(function() {
                Ke = null, Ne.trigger("tap", [ t.target ]), i.tap && (g = i.tap.call(Ne, t, t.target));
            }, this), i.doubleTapThreshold)) : (Ke = null, Ne.trigger("tap", [ t.target ]), 
            i.tap && (g = i.tap.call(Ne, t, t.target)))) : h == f ? c !== S && c !== x || (clearTimeout(Qe), 
            Ke = null, Ne.trigger("doubletap", [ t.target ]), i.doubleTap && (g = i.doubleTap.call(Ne, t, t.target))) : h == m && (c !== S && c !== x || (clearTimeout(Qe), 
            Ke = null, Ne.trigger("longtap", [ t.target ]), i.longTap && (g = i.longTap.call(Ne, t, t.target)))), 
            g;
        }
        function H() {
            var e = !0;
            return null !== i.threshold && (e = $e >= i.threshold), e;
        }
        function W() {
            var e = !1;
            return null !== i.cancelThreshold && null !== Oe && (e = fe(Oe) - $e >= i.cancelThreshold), 
            e;
        }
        function A() {
            return null === i.pinchThreshold || Re >= i.pinchThreshold;
        }
        function D() {
            return !i.maxTimeThreshold || !(He >= i.maxTimeThreshold);
        }
        function R(e, t) {
            if (i.allowPageScroll === c || B()) e.preventDefault(); else {
                var r = i.allowPageScroll === h;
                switch (t) {
                  case s:
                    (i.swipeLeft && r || !r && i.allowPageScroll != g) && e.preventDefault();
                    break;

                  case n:
                    (i.swipeRight && r || !r && i.allowPageScroll != g) && e.preventDefault();
                    break;

                  case o:
                    (i.swipeUp && r || !r && i.allowPageScroll != v) && e.preventDefault();
                    break;

                  case a:
                    (i.swipeDown && r || !r && i.allowPageScroll != v) && e.preventDefault();
                }
            }
        }
        function j() {
            var e = Y(), t = G(), i = A();
            return e && t && i;
        }
        function B() {
            return !!(i.pinchStatus || i.pinchIn || i.pinchOut);
        }
        function N() {
            return !(!j() || !B());
        }
        function F() {
            var e = D(), t = H(), i = Y(), s = G();
            return !W() && s && i && t && e;
        }
        function V() {
            return !!(i.swipe || i.swipeStatus || i.swipeLeft || i.swipeRight || i.swipeUp || i.swipeDown);
        }
        function q() {
            return !(!F() || !V());
        }
        function Y() {
            return Ve === i.fingers || i.fingers === w || !C;
        }
        function G() {
            return 0 !== qe[0].end.x;
        }
        function X() {
            return !!i.tap;
        }
        function U() {
            return !!i.doubleTap;
        }
        function K() {
            return !!i.longTap;
        }
        function Q() {
            if (null == Ke) return !1;
            var e = Ce();
            return U() && e - Ke <= i.doubleTapThreshold;
        }
        function Z() {
            return Q();
        }
        function J() {
            return (1 === Ve || !C) && (isNaN($e) || 0 === $e);
        }
        function ee() {
            return He > i.longTapThreshold && $e < y;
        }
        function te() {
            return !(!J() || !X());
        }
        function ie() {
            return !(!Q() || !U());
        }
        function se() {
            return !(!ee() || !K());
        }
        function ne() {
            Xe = Ce(), Ue = event.touches.length + 1;
        }
        function oe() {
            Xe = 0, Ue = 0;
        }
        function ae() {
            var e = !1;
            return Xe && Ce() - Xe <= i.fingerReleaseThreshold && (e = !0), e;
        }
        function re() {
            return !(!0 !== Ne.data(T + "_intouch"));
        }
        function le(e) {
            !0 === e ? (Ne.bind(ze, E), Ne.bind(Ie, P), Me && Ne.bind(Me, I)) : (Ne.unbind(ze, E, !1), 
            Ne.unbind(Ie, P, !1), Me && Ne.unbind(Me, I, !1)), Ne.data(T + "_intouch", !0 === e);
        }
        function ce(e, t) {
            var i = void 0 !== t.identifier ? t.identifier : 0;
            return qe[e].identifier = i, qe[e].start.x = qe[e].end.x = t.pageX || t.clientX, 
            qe[e].start.y = qe[e].end.y = t.pageY || t.clientY, qe[e];
        }
        function he(e) {
            var t = de(void 0 !== e.identifier ? e.identifier : 0);
            return t.end.x = e.pageX || e.clientX, t.end.y = e.pageY || e.clientY, t;
        }
        function de(e) {
            for (var t = 0; t < qe.length; t++) if (qe[t].identifier == e) return qe[t];
        }
        function ue() {
            for (var e = [], t = 0; t <= 5; t++) e.push({
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                },
                identifier: 0
            });
            return e;
        }
        function pe(e, t) {
            t = Math.max(t, fe(e)), Be[e].distance = t;
        }
        function fe(e) {
            if (Be[e]) return Be[e].distance;
        }
        function me() {
            var e = {};
            return e[s] = ge(s), e[n] = ge(n), e[o] = ge(o), e[a] = ge(a), e;
        }
        function ge(e) {
            return {
                direction: e,
                distance: 0
            };
        }
        function ve() {
            return Ge - Ye;
        }
        function we(e, t) {
            var i = Math.abs(e.x - t.x), s = Math.abs(e.y - t.y);
            return Math.round(Math.sqrt(i * i + s * s));
        }
        function ye(e, t) {
            return (t / e * 1).toFixed(2);
        }
        function be() {
            return De < 1 ? l : r;
        }
        function _e(e, t) {
            return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)));
        }
        function xe(e, t) {
            var i = e.x - t.x, s = t.y - e.y, n = Math.atan2(s, i), o = Math.round(180 * n / Math.PI);
            return o < 0 && (o = 360 - Math.abs(o)), o;
        }
        function Se(e, t) {
            var i = xe(e, t);
            return i <= 45 && i >= 0 ? s : i <= 360 && i >= 315 ? s : i >= 135 && i <= 225 ? n : i > 45 && i < 135 ? a : o;
        }
        function Ce() {
            return new Date().getTime();
        }
        function Te(t) {
            var i = (t = e(t)).offset();
            return {
                left: i.left,
                right: i.left + t.outerWidth(),
                top: i.top,
                bottom: i.top + t.outerHeight()
            };
        }
        function ke(e, t) {
            return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom;
        }
        var Ee = C || !i.fallbackToMouseEvents, Pe = Ee ? "touchstart" : "mousedown", ze = Ee ? "touchmove" : "mousemove", Ie = Ee ? "touchend" : "mouseup", Me = Ee ? null : "mouseleave", Le = "touchcancel", $e = 0, Oe = null, He = 0, We = 0, Ae = 0, De = 1, Re = 0, je = 0, Be = null, Ne = e(t), Fe = "start", Ve = 0, qe = null, Ye = 0, Ge = 0, Xe = 0, Ue = 0, Ke = 0, Qe = null;
        try {
            Ne.bind(Pe, k), Ne.bind(Le, z);
        } catch (t) {
            e.error("events not supported " + Pe + "," + Le + " on jQuery.swipe");
        }
        this.enable = function() {
            return Ne.bind(Pe, k), Ne.bind(Le, z), Ne;
        }, this.disable = function() {
            return M(), Ne;
        }, this.destroy = function() {
            return M(), Ne.data(T, null), Ne;
        }, this.option = function(t, s) {
            if (void 0 !== i[t]) {
                if (void 0 === s) return i[t];
                i[t] = s;
            } else e.error("Option " + t + " does not exist on jQuery.swipe.options");
            return null;
        };
    }
    var s = "left", n = "right", o = "up", a = "down", r = "in", l = "out", c = "none", h = "auto", d = "swipe", u = "pinch", p = "tap", f = "doubletap", m = "longtap", g = "horizontal", v = "vertical", w = "all", y = 10, b = "start", _ = "move", x = "end", S = "cancel", C = "ontouchstart" in window, T = "TouchSwipe", k = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe"
    };
    e.fn.swipe = function(i) {
        var s = e(this), n = s.data(T);
        if (n && "string" == typeof i) {
            if (n[i]) return n[i].apply(this, Array.prototype.slice.call(arguments, 1));
            e.error("Method " + i + " does not exist on jQuery.swipe");
        } else if (!(n || "object" != typeof i && i)) return t.apply(this, arguments);
        return s;
    }, e.fn.swipe.defaults = k, e.fn.swipe.phases = {
        PHASE_START: b,
        PHASE_MOVE: _,
        PHASE_END: x,
        PHASE_CANCEL: S
    }, e.fn.swipe.directions = {
        LEFT: s,
        RIGHT: n,
        UP: o,
        DOWN: a,
        IN: r,
        OUT: l
    }, e.fn.swipe.pageScroll = {
        NONE: c,
        HORIZONTAL: g,
        VERTICAL: v,
        AUTO: h
    }, e.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: w
    };
}), function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var i = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var s = document.createElement("div"), n = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
            s.className = "fit-vids-style", s.id = "fit-vids-style", s.style.display = "none", 
            s.innerHTML = "&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>", 
            n.parentNode.insertBefore(s, n);
        }
        return t && e.extend(i, t), this.each(function() {
            var t = [ "iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed" ];
            i.customSelector && t.push(i.customSelector);
            var s = e(this).find(t.join(","));
            (s = s.not("object object")).each(function() {
                var t = e(this);
                if (!("embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
                    var i = ("object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height()) / (isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10));
                    if (!t.attr("id")) {
                        var s = "fitvid" + Math.floor(999999 * Math.random());
                        t.attr("id", s);
                    }
                    t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * i + "%"), 
                    t.removeAttr("height").removeAttr("width");
                }
            });
        });
    };
}(window.jQuery || window.Zepto), function() {
    "use strict";
    var e, t = function(s, o) {
        function a(e) {
            return Math.floor(e);
        }
        function r() {
            var e = x.params.autoplay, t = x.slides.eq(x.activeIndex);
            t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || x.params.autoplay), 
            x.autoplayTimeoutId = setTimeout(function() {
                x.params.loop ? (x.fixLoop(), x._slideNext(), x.emit("onAutoplay", x)) : x.isEnd ? o.autoplayStopOnLast ? x.stopAutoplay() : (x._slideTo(0), 
                x.emit("onAutoplay", x)) : (x._slideNext(), x.emit("onAutoplay", x));
            }, e);
        }
        function l(t, i) {
            var s = e(t.target);
            if (!s.is(i)) if ("string" == typeof i) s = s.parents(i); else if (i.nodeType) {
                var n;
                return s.parents().each(function(e, t) {
                    t === i && (n = i);
                }), n ? i : void 0;
            }
            if (0 !== s.length) return s[0];
        }
        function c(e, t) {
            t = t || {};
            var i = new (window.MutationObserver || window.WebkitMutationObserver)(function(e) {
                e.forEach(function(e) {
                    x.onResize(!0), x.emit("onObserverUpdate", x, e);
                });
            });
            i.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }), x.observers.push(i);
        }
        function h(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = e.keyCode || e.charCode;
            if (!x.params.allowSwipeToNext && (x.isHorizontal() && 39 === t || !x.isHorizontal() && 40 === t)) return !1;
            if (!x.params.allowSwipeToPrev && (x.isHorizontal() && 37 === t || !x.isHorizontal() && 38 === t)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === t || 39 === t || 38 === t || 40 === t) {
                    var i = !1;
                    if (x.container.parents("." + x.params.slideClass).length > 0 && 0 === x.container.parents("." + x.params.slideActiveClass).length) return;
                    var s = {
                        left: window.pageXOffset,
                        top: window.pageYOffset
                    }, n = window.innerWidth, o = window.innerHeight, a = x.container.offset();
                    x.rtl && (a.left = a.left - x.container[0].scrollLeft);
                    for (var r = [ [ a.left, a.top ], [ a.left + x.width, a.top ], [ a.left, a.top + x.height ], [ a.left + x.width, a.top + x.height ] ], l = 0; l < r.length; l++) {
                        var c = r[l];
                        c[0] >= s.left && c[0] <= s.left + n && c[1] >= s.top && c[1] <= s.top + o && (i = !0);
                    }
                    if (!i) return;
                }
                x.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 
                (39 === t && !x.rtl || 37 === t && x.rtl) && x.slideNext(), (37 === t && !x.rtl || 39 === t && x.rtl) && x.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 
                40 === t && x.slideNext(), 38 === t && x.slidePrev());
            }
        }
        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = 0, i = x.rtl ? -1 : 1, s = u(e);
            if (x.params.mousewheelForceToAxis) if (x.isHorizontal()) {
                if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;
                t = s.pixelX * i;
            } else {
                if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;
                t = s.pixelY;
            } else t = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * i : -s.pixelY;
            if (0 !== t) {
                if (x.params.mousewheelInvert && (t = -t), x.params.freeMode) {
                    var n = x.getWrapperTranslate() + t * x.params.mousewheelSensitivity, o = x.isBeginning, a = x.isEnd;
                    if (n >= x.minTranslate() && (n = x.minTranslate()), n <= x.maxTranslate() && (n = x.maxTranslate()), 
                    x.setWrapperTransition(0), x.setWrapperTranslate(n), x.updateProgress(), x.updateActiveIndex(), 
                    (!o && x.isBeginning || !a && x.isEnd) && x.updateClasses(), x.params.freeModeSticky ? (clearTimeout(x.mousewheel.timeout), 
                    x.mousewheel.timeout = setTimeout(function() {
                        x.slideReset();
                    }, 300)) : x.params.lazyLoading && x.lazy && x.lazy.load(), x.emit("onScroll", x, e), 
                    x.params.autoplay && x.params.autoplayDisableOnInteraction && x.stopAutoplay(), 
                    0 === n || n === x.maxTranslate()) return;
                } else {
                    if (new window.Date().getTime() - x.mousewheel.lastScrollTime > 60) if (t < 0) if (x.isEnd && !x.params.loop || x.animating) {
                        if (x.params.mousewheelReleaseOnEdges) return !0;
                    } else x.slideNext(), x.emit("onScroll", x, e); else if (x.isBeginning && !x.params.loop || x.animating) {
                        if (x.params.mousewheelReleaseOnEdges) return !0;
                    } else x.slidePrev(), x.emit("onScroll", x, e);
                    x.mousewheel.lastScrollTime = new window.Date().getTime();
                }
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1;
            }
        }
        function u(e) {
            var t = 0, i = 0, s = 0, n = 0;
            return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), 
            "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), 
            "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, n = 10 * i, 
            "deltaY" in e && (n = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || n) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, 
            n *= 40) : (s *= 800, n *= 800)), s && !t && (t = s < 1 ? -1 : 1), n && !i && (i = n < 1 ? -1 : 1), 
            {
                spinX: t,
                spinY: i,
                pixelX: s,
                pixelY: n
            };
        }
        function p(t, i) {
            t = e(t);
            var s, n, o, a = x.rtl ? -1 : 1;
            s = t.attr("data-swiper-parallax") || "0", n = t.attr("data-swiper-parallax-x"), 
            o = t.attr("data-swiper-parallax-y"), n || o ? (n = n || "0", o = o || "0") : x.isHorizontal() ? (n = s, 
            o = "0") : (o = s, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * i * a + "%" : n * i * a + "px", 
            o = o.indexOf("%") >= 0 ? parseInt(o, 10) * i + "%" : o * i + "px", t.transform("translate3d(" + n + ", " + o + ",0px)");
        }
        function f(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), 
            e;
        }
        if (!(this instanceof t)) return new t(s, o);
        var m = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            },
            flip: {
                slideShadows: !0,
                limitRotation: !0
            },
            cube: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            },
            fade: {
                crossFade: !1
            },
            parallax: !1,
            zoom: !1,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: !0,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: "container",
            hashnav: !1,
            hashnavWatchState: !1,
            history: !1,
            replaceState: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            normalizeSlideIndex: !0,
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            paginationClickableClass: "swiper-pagination-clickable",
            paginationModifierClass: "swiper-pagination-",
            lazyLoadingClass: "swiper-lazy",
            lazyStatusLoadingClass: "swiper-lazy-loading",
            lazyStatusLoadedClass: "swiper-lazy-loaded",
            lazyPreloaderClass: "swiper-lazy-preloader",
            notificationClass: "swiper-notification",
            preloaderClass: "preloader",
            zoomContainerClass: "swiper-zoom-container",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, g = o && o.virtualTranslate;
        o = o || {};
        var v = {};
        for (var w in o) if ("object" != typeof o[w] || null === o[w] || (o[w].nodeType || o[w] === window || o[w] === document || void 0 !== i && o[w] instanceof i || "undefined" != typeof jQuery && o[w] instanceof jQuery)) v[w] = o[w]; else {
            v[w] = {};
            for (var y in o[w]) v[w][y] = o[w][y];
        }
        for (var b in m) if (void 0 === o[b]) o[b] = m[b]; else if ("object" == typeof o[b]) for (var _ in m[b]) void 0 === o[b][_] && (o[b][_] = m[b][_]);
        var x = this;
        if (x.params = o, x.originalParams = v, x.classNames = [], void 0 !== e && void 0 !== i && (e = i), 
        (void 0 !== e || (e = void 0 === i ? window.Dom7 || window.Zepto || window.jQuery : i)) && (x.$ = e, 
        x.currentBreakpoint = void 0, x.getActiveBreakpoint = function() {
            if (!x.params.breakpoints) return !1;
            var e, t = !1, i = [];
            for (e in x.params.breakpoints) x.params.breakpoints.hasOwnProperty(e) && i.push(e);
            i.sort(function(e, t) {
                return parseInt(e, 10) > parseInt(t, 10);
            });
            for (var s = 0; s < i.length; s++) (e = i[s]) >= window.innerWidth && !t && (t = e);
            return t || "max";
        }, x.setBreakpoint = function() {
            var e = x.getActiveBreakpoint();
            if (e && x.currentBreakpoint !== e) {
                var t = e in x.params.breakpoints ? x.params.breakpoints[e] : x.originalParams, i = x.params.loop && t.slidesPerView !== x.params.slidesPerView;
                for (var s in t) x.params[s] = t[s];
                x.currentBreakpoint = e, i && x.destroyLoop && x.reLoop(!0);
            }
        }, x.params.breakpoints && x.setBreakpoint(), x.container = e(s), 0 !== x.container.length)) {
            if (x.container.length > 1) {
                var S = [];
                return x.container.each(function() {
                    S.push(new t(this, o));
                }), S;
            }
            x.container[0].swiper = x, x.container.data("swiper", x), x.classNames.push(x.params.containerModifierClass + x.params.direction), 
            x.params.freeMode && x.classNames.push(x.params.containerModifierClass + "free-mode"), 
            x.support.flexbox || (x.classNames.push(x.params.containerModifierClass + "no-flexbox"), 
            x.params.slidesPerColumn = 1), x.params.autoHeight && x.classNames.push(x.params.containerModifierClass + "autoheight"), 
            (x.params.parallax || x.params.watchSlidesVisibility) && (x.params.watchSlidesProgress = !0), 
            x.params.touchReleaseOnEdges && (x.params.resistanceRatio = 0), [ "cube", "coverflow", "flip" ].indexOf(x.params.effect) >= 0 && (x.support.transforms3d ? (x.params.watchSlidesProgress = !0, 
            x.classNames.push(x.params.containerModifierClass + "3d")) : x.params.effect = "slide"), 
            "slide" !== x.params.effect && x.classNames.push(x.params.containerModifierClass + x.params.effect), 
            "cube" === x.params.effect && (x.params.resistanceRatio = 0, x.params.slidesPerView = 1, 
            x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.centeredSlides = !1, 
            x.params.spaceBetween = 0, x.params.virtualTranslate = !0, x.params.setWrapperSize = !1), 
            "fade" !== x.params.effect && "flip" !== x.params.effect || (x.params.slidesPerView = 1, 
            x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.watchSlidesProgress = !0, 
            x.params.spaceBetween = 0, x.params.setWrapperSize = !1, void 0 === g && (x.params.virtualTranslate = !0)), 
            x.params.grabCursor && x.support.touch && (x.params.grabCursor = !1), x.wrapper = x.container.children("." + x.params.wrapperClass), 
            x.params.pagination && (x.paginationContainer = e(x.params.pagination), x.params.uniqueNavElements && "string" == typeof x.params.pagination && x.paginationContainer.length > 1 && 1 === x.container.find(x.params.pagination).length && (x.paginationContainer = x.container.find(x.params.pagination)), 
            "bullets" === x.params.paginationType && x.params.paginationClickable ? x.paginationContainer.addClass(x.params.paginationModifierClass + "clickable") : x.params.paginationClickable = !1, 
            x.paginationContainer.addClass(x.params.paginationModifierClass + x.params.paginationType)), 
            (x.params.nextButton || x.params.prevButton) && (x.params.nextButton && (x.nextButton = e(x.params.nextButton), 
            x.params.uniqueNavElements && "string" == typeof x.params.nextButton && x.nextButton.length > 1 && 1 === x.container.find(x.params.nextButton).length && (x.nextButton = x.container.find(x.params.nextButton))), 
            x.params.prevButton && (x.prevButton = e(x.params.prevButton), x.params.uniqueNavElements && "string" == typeof x.params.prevButton && x.prevButton.length > 1 && 1 === x.container.find(x.params.prevButton).length && (x.prevButton = x.container.find(x.params.prevButton)))), 
            x.isHorizontal = function() {
                return "horizontal" === x.params.direction;
            }, x.rtl = x.isHorizontal() && ("rtl" === x.container[0].dir.toLowerCase() || "rtl" === x.container.css("direction")), 
            x.rtl && x.classNames.push(x.params.containerModifierClass + "rtl"), x.rtl && (x.wrongRTL = "-webkit-box" === x.wrapper.css("display")), 
            x.params.slidesPerColumn > 1 && x.classNames.push(x.params.containerModifierClass + "multirow"), 
            x.device.android && x.classNames.push(x.params.containerModifierClass + "android"), 
            x.container.addClass(x.classNames.join(" ")), x.translate = 0, x.progress = 0, x.velocity = 0, 
            x.lockSwipeToNext = function() {
                x.params.allowSwipeToNext = !1, !1 === x.params.allowSwipeToPrev && x.params.grabCursor && x.unsetGrabCursor();
            }, x.lockSwipeToPrev = function() {
                x.params.allowSwipeToPrev = !1, !1 === x.params.allowSwipeToNext && x.params.grabCursor && x.unsetGrabCursor();
            }, x.lockSwipes = function() {
                x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !1, x.params.grabCursor && x.unsetGrabCursor();
            }, x.unlockSwipeToNext = function() {
                x.params.allowSwipeToNext = !0, !0 === x.params.allowSwipeToPrev && x.params.grabCursor && x.setGrabCursor();
            }, x.unlockSwipeToPrev = function() {
                x.params.allowSwipeToPrev = !0, !0 === x.params.allowSwipeToNext && x.params.grabCursor && x.setGrabCursor();
            }, x.unlockSwipes = function() {
                x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !0, x.params.grabCursor && x.setGrabCursor();
            }, x.setGrabCursor = function(e) {
                x.container[0].style.cursor = "move", x.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", 
                x.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", x.container[0].style.cursor = e ? "grabbing" : "grab";
            }, x.unsetGrabCursor = function() {
                x.container[0].style.cursor = "";
            }, x.params.grabCursor && x.setGrabCursor(), x.imagesToLoad = [], x.imagesLoaded = 0, 
            x.loadImage = function(e, t, i, s, n, o) {
                function a() {
                    o && o();
                }
                var r;
                e.complete && n ? a() : t ? ((r = new window.Image()).onload = a, r.onerror = a, 
                s && (r.sizes = s), i && (r.srcset = i), t && (r.src = t)) : a();
            }, x.preloadImages = function() {
                function e() {
                    void 0 !== x && null !== x && (void 0 !== x.imagesLoaded && x.imagesLoaded++, x.imagesLoaded === x.imagesToLoad.length && (x.params.updateOnImagesReady && x.update(), 
                    x.emit("onImagesReady", x)));
                }
                x.imagesToLoad = x.container.find("img");
                for (var t = 0; t < x.imagesToLoad.length; t++) x.loadImage(x.imagesToLoad[t], x.imagesToLoad[t].currentSrc || x.imagesToLoad[t].getAttribute("src"), x.imagesToLoad[t].srcset || x.imagesToLoad[t].getAttribute("srcset"), x.imagesToLoad[t].sizes || x.imagesToLoad[t].getAttribute("sizes"), !0, e);
            }, x.autoplayTimeoutId = void 0, x.autoplaying = !1, x.autoplayPaused = !1, x.startAutoplay = function() {
                return void 0 === x.autoplayTimeoutId && (!!x.params.autoplay && (!x.autoplaying && (x.autoplaying = !0, 
                x.emit("onAutoplayStart", x), void r())));
            }, x.stopAutoplay = function(e) {
                x.autoplayTimeoutId && (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), 
                x.autoplaying = !1, x.autoplayTimeoutId = void 0, x.emit("onAutoplayStop", x));
            }, x.pauseAutoplay = function(e) {
                x.autoplayPaused || (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplayPaused = !0, 
                0 === e ? (x.autoplayPaused = !1, r()) : x.wrapper.transitionEnd(function() {
                    x && (x.autoplayPaused = !1, x.autoplaying ? r() : x.stopAutoplay());
                }));
            }, x.minTranslate = function() {
                return -x.snapGrid[0];
            }, x.maxTranslate = function() {
                return -x.snapGrid[x.snapGrid.length - 1];
            }, x.updateAutoHeight = function() {
                var e = [], t = 0;
                if ("auto" !== x.params.slidesPerView && x.params.slidesPerView > 1) for (n = 0; n < Math.ceil(x.params.slidesPerView); n++) {
                    var i = x.activeIndex + n;
                    if (i > x.slides.length) break;
                    e.push(x.slides.eq(i)[0]);
                } else e.push(x.slides.eq(x.activeIndex)[0]);
                for (n = 0; n < e.length; n++) if (void 0 !== e[n]) {
                    var s = e[n].offsetHeight;
                    t = s > t ? s : t;
                }
                t && x.wrapper.css("height", t + "px");
            }, x.updateContainerSize = function() {
                var e, t;
                e = void 0 !== x.params.width ? x.params.width : x.container[0].clientWidth, t = void 0 !== x.params.height ? x.params.height : x.container[0].clientHeight, 
                0 === e && x.isHorizontal() || 0 === t && !x.isHorizontal() || (e = e - parseInt(x.container.css("padding-left"), 10) - parseInt(x.container.css("padding-right"), 10), 
                t = t - parseInt(x.container.css("padding-top"), 10) - parseInt(x.container.css("padding-bottom"), 10), 
                x.width = e, x.height = t, x.size = x.isHorizontal() ? x.width : x.height);
            }, x.updateSlidesSize = function() {
                x.slides = x.wrapper.children("." + x.params.slideClass), x.snapGrid = [], x.slidesGrid = [], 
                x.slidesSizesGrid = [];
                var e, t = x.params.spaceBetween, i = -x.params.slidesOffsetBefore, s = 0, n = 0;
                if (void 0 !== x.size) {
                    "string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * x.size), 
                    x.virtualSize = -t, x.rtl ? x.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : x.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var o;
                    x.params.slidesPerColumn > 1 && (o = Math.floor(x.slides.length / x.params.slidesPerColumn) === x.slides.length / x.params.slidesPerColumn ? x.slides.length : Math.ceil(x.slides.length / x.params.slidesPerColumn) * x.params.slidesPerColumn, 
                    "auto" !== x.params.slidesPerView && "row" === x.params.slidesPerColumnFill && (o = Math.max(o, x.params.slidesPerView * x.params.slidesPerColumn)));
                    var r, l = x.params.slidesPerColumn, c = o / l, h = c - (x.params.slidesPerColumn * c - x.slides.length);
                    for (e = 0; e < x.slides.length; e++) {
                        r = 0;
                        var d = x.slides.eq(e);
                        if (x.params.slidesPerColumn > 1) {
                            var u, p, f;
                            "column" === x.params.slidesPerColumnFill ? (f = e - (p = Math.floor(e / l)) * l, 
                            (p > h || p === h && f === l - 1) && ++f >= l && (f = 0, p++), u = p + f * o / l, 
                            d.css({
                                "-webkit-box-ordinal-group": u,
                                "-moz-box-ordinal-group": u,
                                "-ms-flex-order": u,
                                "-webkit-order": u,
                                order: u
                            })) : p = e - (f = Math.floor(e / c)) * c, d.css("margin-" + (x.isHorizontal() ? "top" : "left"), 0 !== f && x.params.spaceBetween && x.params.spaceBetween + "px").attr("data-swiper-column", p).attr("data-swiper-row", f);
                        }
                        "none" !== d.css("display") && ("auto" === x.params.slidesPerView ? (r = x.isHorizontal() ? d.outerWidth(!0) : d.outerHeight(!0), 
                        x.params.roundLengths && (r = a(r))) : (r = (x.size - (x.params.slidesPerView - 1) * t) / x.params.slidesPerView, 
                        x.params.roundLengths && (r = a(r)), x.isHorizontal() ? x.slides[e].style.width = r + "px" : x.slides[e].style.height = r + "px"), 
                        x.slides[e].swiperSlideSize = r, x.slidesSizesGrid.push(r), x.params.centeredSlides ? (i = i + r / 2 + s / 2 + t, 
                        0 === e && (i = i - x.size / 2 - t), Math.abs(i) < .001 && (i = 0), n % x.params.slidesPerGroup == 0 && x.snapGrid.push(i), 
                        x.slidesGrid.push(i)) : (n % x.params.slidesPerGroup == 0 && x.snapGrid.push(i), 
                        x.slidesGrid.push(i), i = i + r + t), x.virtualSize += r + t, s = r, n++);
                    }
                    x.virtualSize = Math.max(x.virtualSize, x.size) + x.params.slidesOffsetAfter;
                    var m;
                    if (x.rtl && x.wrongRTL && ("slide" === x.params.effect || "coverflow" === x.params.effect) && x.wrapper.css({
                        width: x.virtualSize + x.params.spaceBetween + "px"
                    }), x.support.flexbox && !x.params.setWrapperSize || (x.isHorizontal() ? x.wrapper.css({
                        width: x.virtualSize + x.params.spaceBetween + "px"
                    }) : x.wrapper.css({
                        height: x.virtualSize + x.params.spaceBetween + "px"
                    })), x.params.slidesPerColumn > 1 && (x.virtualSize = (r + x.params.spaceBetween) * o, 
                    x.virtualSize = Math.ceil(x.virtualSize / x.params.slidesPerColumn) - x.params.spaceBetween, 
                    x.isHorizontal() ? x.wrapper.css({
                        width: x.virtualSize + x.params.spaceBetween + "px"
                    }) : x.wrapper.css({
                        height: x.virtualSize + x.params.spaceBetween + "px"
                    }), x.params.centeredSlides)) {
                        for (m = [], e = 0; e < x.snapGrid.length; e++) x.snapGrid[e] < x.virtualSize + x.snapGrid[0] && m.push(x.snapGrid[e]);
                        x.snapGrid = m;
                    }
                    if (!x.params.centeredSlides) {
                        for (m = [], e = 0; e < x.snapGrid.length; e++) x.snapGrid[e] <= x.virtualSize - x.size && m.push(x.snapGrid[e]);
                        x.snapGrid = m, Math.floor(x.virtualSize - x.size) - Math.floor(x.snapGrid[x.snapGrid.length - 1]) > 1 && x.snapGrid.push(x.virtualSize - x.size);
                    }
                    0 === x.snapGrid.length && (x.snapGrid = [ 0 ]), 0 !== x.params.spaceBetween && (x.isHorizontal() ? x.rtl ? x.slides.css({
                        marginLeft: t + "px"
                    }) : x.slides.css({
                        marginRight: t + "px"
                    }) : x.slides.css({
                        marginBottom: t + "px"
                    })), x.params.watchSlidesProgress && x.updateSlidesOffset();
                }
            }, x.updateSlidesOffset = function() {
                for (var e = 0; e < x.slides.length; e++) x.slides[e].swiperSlideOffset = x.isHorizontal() ? x.slides[e].offsetLeft : x.slides[e].offsetTop;
            }, x.updateSlidesProgress = function(e) {
                if (void 0 === e && (e = x.translate || 0), 0 !== x.slides.length) {
                    void 0 === x.slides[0].swiperSlideOffset && x.updateSlidesOffset();
                    var t = -e;
                    x.rtl && (t = e), x.slides.removeClass(x.params.slideVisibleClass);
                    for (var i = 0; i < x.slides.length; i++) {
                        var s = x.slides[i], n = (t + (x.params.centeredSlides ? x.minTranslate() : 0) - s.swiperSlideOffset) / (s.swiperSlideSize + x.params.spaceBetween);
                        if (x.params.watchSlidesVisibility) {
                            var o = -(t - s.swiperSlideOffset), a = o + x.slidesSizesGrid[i];
                            (o >= 0 && o < x.size || a > 0 && a <= x.size || o <= 0 && a >= x.size) && x.slides.eq(i).addClass(x.params.slideVisibleClass);
                        }
                        s.progress = x.rtl ? -n : n;
                    }
                }
            }, x.updateProgress = function(e) {
                void 0 === e && (e = x.translate || 0);
                var t = x.maxTranslate() - x.minTranslate(), i = x.isBeginning, s = x.isEnd;
                0 === t ? (x.progress = 0, x.isBeginning = x.isEnd = !0) : (x.progress = (e - x.minTranslate()) / t, 
                x.isBeginning = x.progress <= 0, x.isEnd = x.progress >= 1), x.isBeginning && !i && x.emit("onReachBeginning", x), 
                x.isEnd && !s && x.emit("onReachEnd", x), x.params.watchSlidesProgress && x.updateSlidesProgress(e), 
                x.emit("onProgress", x, x.progress);
            }, x.updateActiveIndex = function() {
                var e, t, i, s = x.rtl ? x.translate : -x.translate;
                for (t = 0; t < x.slidesGrid.length; t++) void 0 !== x.slidesGrid[t + 1] ? s >= x.slidesGrid[t] && s < x.slidesGrid[t + 1] - (x.slidesGrid[t + 1] - x.slidesGrid[t]) / 2 ? e = t : s >= x.slidesGrid[t] && s < x.slidesGrid[t + 1] && (e = t + 1) : s >= x.slidesGrid[t] && (e = t);
                x.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), (i = Math.floor(e / x.params.slidesPerGroup)) >= x.snapGrid.length && (i = x.snapGrid.length - 1), 
                e !== x.activeIndex && (x.snapIndex = i, x.previousIndex = x.activeIndex, x.activeIndex = e, 
                x.updateClasses(), x.updateRealIndex());
            }, x.updateRealIndex = function() {
                x.realIndex = x.slides.eq(x.activeIndex).attr("data-swiper-slide-index") || x.activeIndex;
            }, x.updateClasses = function() {
                x.slides.removeClass(x.params.slideActiveClass + " " + x.params.slideNextClass + " " + x.params.slidePrevClass + " " + x.params.slideDuplicateActiveClass + " " + x.params.slideDuplicateNextClass + " " + x.params.slideDuplicatePrevClass);
                var t = x.slides.eq(x.activeIndex);
                t.addClass(x.params.slideActiveClass), o.loop && (t.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass));
                var i = t.next("." + x.params.slideClass).addClass(x.params.slideNextClass);
                x.params.loop && 0 === i.length && (i = x.slides.eq(0)).addClass(x.params.slideNextClass);
                var s = t.prev("." + x.params.slideClass).addClass(x.params.slidePrevClass);
                if (x.params.loop && 0 === s.length && (s = x.slides.eq(-1)).addClass(x.params.slidePrevClass), 
                o.loop && (i.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass), 
                s.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass)), 
                x.paginationContainer && x.paginationContainer.length > 0) {
                    var n, a = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length;
                    if (x.params.loop ? ((n = Math.ceil((x.activeIndex - x.loopedSlides) / x.params.slidesPerGroup)) > x.slides.length - 1 - 2 * x.loopedSlides && (n -= x.slides.length - 2 * x.loopedSlides), 
                    n > a - 1 && (n -= a), n < 0 && "bullets" !== x.params.paginationType && (n = a + n)) : n = void 0 !== x.snapIndex ? x.snapIndex : x.activeIndex || 0, 
                    "bullets" === x.params.paginationType && x.bullets && x.bullets.length > 0 && (x.bullets.removeClass(x.params.bulletActiveClass), 
                    x.paginationContainer.length > 1 ? x.bullets.each(function() {
                        e(this).index() === n && e(this).addClass(x.params.bulletActiveClass);
                    }) : x.bullets.eq(n).addClass(x.params.bulletActiveClass)), "fraction" === x.params.paginationType && (x.paginationContainer.find("." + x.params.paginationCurrentClass).text(n + 1), 
                    x.paginationContainer.find("." + x.params.paginationTotalClass).text(a)), "progress" === x.params.paginationType) {
                        var r = (n + 1) / a, l = r, c = 1;
                        x.isHorizontal() || (c = r, l = 1), x.paginationContainer.find("." + x.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + c + ")").transition(x.params.speed);
                    }
                    "custom" === x.params.paginationType && x.params.paginationCustomRender && (x.paginationContainer.html(x.params.paginationCustomRender(x, n + 1, a)), 
                    x.emit("onPaginationRendered", x, x.paginationContainer[0]));
                }
                x.params.loop || (x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.isBeginning ? (x.prevButton.addClass(x.params.buttonDisabledClass), 
                x.params.a11y && x.a11y && x.a11y.disable(x.prevButton)) : (x.prevButton.removeClass(x.params.buttonDisabledClass), 
                x.params.a11y && x.a11y && x.a11y.enable(x.prevButton))), x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.isEnd ? (x.nextButton.addClass(x.params.buttonDisabledClass), 
                x.params.a11y && x.a11y && x.a11y.disable(x.nextButton)) : (x.nextButton.removeClass(x.params.buttonDisabledClass), 
                x.params.a11y && x.a11y && x.a11y.enable(x.nextButton))));
            }, x.updatePagination = function() {
                if (x.params.pagination && x.paginationContainer && x.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === x.params.paginationType) {
                        for (var t = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length, i = 0; i < t; i++) x.params.paginationBulletRender ? e += x.params.paginationBulletRender(x, i, x.params.bulletClass) : e += "<" + x.params.paginationElement + ' class="' + x.params.bulletClass + '"></' + x.params.paginationElement + ">";
                        x.paginationContainer.html(e), x.bullets = x.paginationContainer.find("." + x.params.bulletClass), 
                        x.params.paginationClickable && x.params.a11y && x.a11y && x.a11y.initPagination();
                    }
                    "fraction" === x.params.paginationType && (e = x.params.paginationFractionRender ? x.params.paginationFractionRender(x, x.params.paginationCurrentClass, x.params.paginationTotalClass) : '<span class="' + x.params.paginationCurrentClass + '"></span> / <span class="' + x.params.paginationTotalClass + '"></span>', 
                    x.paginationContainer.html(e)), "progress" === x.params.paginationType && (e = x.params.paginationProgressRender ? x.params.paginationProgressRender(x, x.params.paginationProgressbarClass) : '<span class="' + x.params.paginationProgressbarClass + '"></span>', 
                    x.paginationContainer.html(e)), "custom" !== x.params.paginationType && x.emit("onPaginationRendered", x, x.paginationContainer[0]);
                }
            }, x.update = function(e) {
                function t() {
                    x.rtl, x.translate;
                    i = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate()), x.setWrapperTranslate(i), 
                    x.updateActiveIndex(), x.updateClasses();
                }
                if (x.updateContainerSize(), x.updateSlidesSize(), x.updateProgress(), x.updatePagination(), 
                x.updateClasses(), x.params.scrollbar && x.scrollbar && x.scrollbar.set(), e) {
                    var i;
                    x.controller && x.controller.spline && (x.controller.spline = void 0), x.params.freeMode ? (t(), 
                    x.params.autoHeight && x.updateAutoHeight()) : (("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0)) || t();
                } else x.params.autoHeight && x.updateAutoHeight();
            }, x.onResize = function(e) {
                x.params.breakpoints && x.setBreakpoint();
                var t = x.params.allowSwipeToPrev, i = x.params.allowSwipeToNext;
                x.params.allowSwipeToPrev = x.params.allowSwipeToNext = !0, x.updateContainerSize(), 
                x.updateSlidesSize(), ("auto" === x.params.slidesPerView || x.params.freeMode || e) && x.updatePagination(), 
                x.params.scrollbar && x.scrollbar && x.scrollbar.set(), x.controller && x.controller.spline && (x.controller.spline = void 0);
                var s = !1;
                if (x.params.freeMode) {
                    var n = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate());
                    x.setWrapperTranslate(n), x.updateActiveIndex(), x.updateClasses(), x.params.autoHeight && x.updateAutoHeight();
                } else x.updateClasses(), s = ("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0);
                x.params.lazyLoading && !s && x.lazy && x.lazy.load(), x.params.allowSwipeToPrev = t, 
                x.params.allowSwipeToNext = i;
            }, x.touchEventsDesktop = {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            }, window.navigator.pointerEnabled ? x.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled && (x.touchEventsDesktop = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            }), x.touchEvents = {
                start: x.support.touch || !x.params.simulateTouch ? "touchstart" : x.touchEventsDesktop.start,
                move: x.support.touch || !x.params.simulateTouch ? "touchmove" : x.touchEventsDesktop.move,
                end: x.support.touch || !x.params.simulateTouch ? "touchend" : x.touchEventsDesktop.end
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === x.params.touchEventsTarget ? x.container : x.wrapper).addClass("swiper-wp8-" + x.params.direction), 
            x.initEvents = function(e) {
                var t = e ? "off" : "on", i = e ? "removeEventListener" : "addEventListener", s = "container" === x.params.touchEventsTarget ? x.container[0] : x.wrapper[0], n = x.support.touch ? s : document, a = !!x.params.nested;
                if (x.browser.ie) s[i](x.touchEvents.start, x.onTouchStart, !1), n[i](x.touchEvents.move, x.onTouchMove, a), 
                n[i](x.touchEvents.end, x.onTouchEnd, !1); else {
                    if (x.support.touch) {
                        var r = !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s[i](x.touchEvents.start, x.onTouchStart, r), s[i](x.touchEvents.move, x.onTouchMove, a), 
                        s[i](x.touchEvents.end, x.onTouchEnd, r);
                    }
                    (o.simulateTouch && !x.device.ios && !x.device.android || o.simulateTouch && !x.support.touch && x.device.ios) && (s[i]("mousedown", x.onTouchStart, !1), 
                    document[i]("mousemove", x.onTouchMove, a), document[i]("mouseup", x.onTouchEnd, !1));
                }
                window[i]("resize", x.onResize), x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.nextButton[t]("click", x.onClickNext), 
                x.params.a11y && x.a11y && x.nextButton[t]("keydown", x.a11y.onEnterKey)), x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.prevButton[t]("click", x.onClickPrev), 
                x.params.a11y && x.a11y && x.prevButton[t]("keydown", x.a11y.onEnterKey)), x.params.pagination && x.params.paginationClickable && (x.paginationContainer[t]("click", "." + x.params.bulletClass, x.onClickIndex), 
                x.params.a11y && x.a11y && x.paginationContainer[t]("keydown", "." + x.params.bulletClass, x.a11y.onEnterKey)), 
                (x.params.preventClicks || x.params.preventClicksPropagation) && s[i]("click", x.preventClicks, !0);
            }, x.attachEvents = function() {
                x.initEvents();
            }, x.detachEvents = function() {
                x.initEvents(!0);
            }, x.allowClick = !0, x.preventClicks = function(e) {
                x.allowClick || (x.params.preventClicks && e.preventDefault(), x.params.preventClicksPropagation && x.animating && (e.stopPropagation(), 
                e.stopImmediatePropagation()));
            }, x.onClickNext = function(e) {
                e.preventDefault(), x.isEnd && !x.params.loop || x.slideNext();
            }, x.onClickPrev = function(e) {
                e.preventDefault(), x.isBeginning && !x.params.loop || x.slidePrev();
            }, x.onClickIndex = function(t) {
                t.preventDefault();
                var i = e(this).index() * x.params.slidesPerGroup;
                x.params.loop && (i += x.loopedSlides), x.slideTo(i);
            }, x.updateClickedSlide = function(t) {
                var i = l(t, "." + x.params.slideClass), s = !1;
                if (i) for (var n = 0; n < x.slides.length; n++) x.slides[n] === i && (s = !0);
                if (!i || !s) return x.clickedSlide = void 0, void (x.clickedIndex = void 0);
                if (x.clickedSlide = i, x.clickedIndex = e(i).index(), x.params.slideToClickedSlide && void 0 !== x.clickedIndex && x.clickedIndex !== x.activeIndex) {
                    var o, a = x.clickedIndex;
                    if (x.params.loop) {
                        if (x.animating) return;
                        o = e(x.clickedSlide).attr("data-swiper-slide-index"), x.params.centeredSlides ? a < x.loopedSlides - x.params.slidesPerView / 2 || a > x.slides.length - x.loopedSlides + x.params.slidesPerView / 2 ? (x.fixLoop(), 
                        a = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + o + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), 
                        setTimeout(function() {
                            x.slideTo(a);
                        }, 0)) : x.slideTo(a) : a > x.slides.length - x.params.slidesPerView ? (x.fixLoop(), 
                        a = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + o + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), 
                        setTimeout(function() {
                            x.slideTo(a);
                        }, 0)) : x.slideTo(a);
                    } else x.slideTo(a);
                }
            };
            var C, T, k, E, P, z, I, M, L, $, O = "input, select, textarea, button, video", H = Date.now(), W = [];
            x.animating = !1, x.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var A, D;
            x.onTouchStart = function(t) {
                if (t.originalEvent && (t = t.originalEvent), (A = "touchstart" === t.type) || !("which" in t) || 3 !== t.which) if (x.params.noSwiping && l(t, "." + x.params.noSwipingClass)) x.allowClick = !0; else if (!x.params.swipeHandler || l(t, x.params.swipeHandler)) {
                    var i = x.touches.currentX = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, s = x.touches.currentY = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY;
                    if (!(x.device.ios && x.params.iOSEdgeSwipeDetection && i <= x.params.iOSEdgeSwipeThreshold)) {
                        if (C = !0, T = !1, k = !0, P = void 0, D = void 0, x.touches.startX = i, x.touches.startY = s, 
                        E = Date.now(), x.allowClick = !0, x.updateContainerSize(), x.swipeDirection = void 0, 
                        x.params.threshold > 0 && (M = !1), "touchstart" !== t.type) {
                            var n = !0;
                            e(t.target).is(O) && (n = !1), document.activeElement && e(document.activeElement).is(O) && document.activeElement.blur(), 
                            n && t.preventDefault();
                        }
                        x.emit("onTouchStart", x, t);
                    }
                }
            }, x.onTouchMove = function(t) {
                if (t.originalEvent && (t = t.originalEvent), !A || "mousemove" !== t.type) {
                    if (t.preventedByNestedSwiper) return x.touches.startX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, 
                    void (x.touches.startY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY);
                    if (x.params.onlyExternal) return x.allowClick = !1, void (C && (x.touches.startX = x.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, 
                    x.touches.startY = x.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, 
                    E = Date.now()));
                    if (A && x.params.touchReleaseOnEdges && !x.params.loop) if (x.isHorizontal()) {
                        if (x.touches.currentX < x.touches.startX && x.translate <= x.maxTranslate() || x.touches.currentX > x.touches.startX && x.translate >= x.minTranslate()) return;
                    } else if (x.touches.currentY < x.touches.startY && x.translate <= x.maxTranslate() || x.touches.currentY > x.touches.startY && x.translate >= x.minTranslate()) return;
                    if (A && document.activeElement && t.target === document.activeElement && e(t.target).is(O)) return T = !0, 
                    void (x.allowClick = !1);
                    if (k && x.emit("onTouchMove", x, t), !(t.targetTouches && t.targetTouches.length > 1)) {
                        if (x.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, 
                        x.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, 
                        void 0 === P) {
                            var i;
                            x.isHorizontal() && x.touches.currentY === x.touches.startY || !x.isHorizontal() && x.touches.currentX !== x.touches.startX ? P = !1 : (i = 180 * Math.atan2(Math.abs(x.touches.currentY - x.touches.startY), Math.abs(x.touches.currentX - x.touches.startX)) / Math.PI, 
                            P = x.isHorizontal() ? i > x.params.touchAngle : 90 - i > x.params.touchAngle);
                        }
                        if (P && x.emit("onTouchMoveOpposite", x, t), void 0 === D && x.browser.ieTouch && (x.touches.currentX === x.touches.startX && x.touches.currentY === x.touches.startY || (D = !0)), 
                        C) if (P) C = !1; else if (D || !x.browser.ieTouch) {
                            x.allowClick = !1, x.emit("onSliderMove", x, t), t.preventDefault(), x.params.touchMoveStopPropagation && !x.params.nested && t.stopPropagation(), 
                            T || (o.loop && x.fixLoop(), I = x.getWrapperTranslate(), x.setWrapperTransition(0), 
                            x.animating && x.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), 
                            x.params.autoplay && x.autoplaying && (x.params.autoplayDisableOnInteraction ? x.stopAutoplay() : x.pauseAutoplay()), 
                            $ = !1, !x.params.grabCursor || !0 !== x.params.allowSwipeToNext && !0 !== x.params.allowSwipeToPrev || x.setGrabCursor(!0)), 
                            T = !0;
                            var s = x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY;
                            s *= x.params.touchRatio, x.rtl && (s = -s), x.swipeDirection = s > 0 ? "prev" : "next", 
                            z = s + I;
                            var n = !0;
                            if (s > 0 && z > x.minTranslate() ? (n = !1, x.params.resistance && (z = x.minTranslate() - 1 + Math.pow(-x.minTranslate() + I + s, x.params.resistanceRatio))) : s < 0 && z < x.maxTranslate() && (n = !1, 
                            x.params.resistance && (z = x.maxTranslate() + 1 - Math.pow(x.maxTranslate() - I - s, x.params.resistanceRatio))), 
                            n && (t.preventedByNestedSwiper = !0), !x.params.allowSwipeToNext && "next" === x.swipeDirection && z < I && (z = I), 
                            !x.params.allowSwipeToPrev && "prev" === x.swipeDirection && z > I && (z = I), x.params.threshold > 0) {
                                if (!(Math.abs(s) > x.params.threshold || M)) return void (z = I);
                                if (!M) return M = !0, x.touches.startX = x.touches.currentX, x.touches.startY = x.touches.currentY, 
                                z = I, void (x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY);
                            }
                            x.params.followFinger && ((x.params.freeMode || x.params.watchSlidesProgress) && x.updateActiveIndex(), 
                            x.params.freeMode && (0 === W.length && W.push({
                                position: x.touches[x.isHorizontal() ? "startX" : "startY"],
                                time: E
                            }), W.push({
                                position: x.touches[x.isHorizontal() ? "currentX" : "currentY"],
                                time: new window.Date().getTime()
                            })), x.updateProgress(z), x.setWrapperTranslate(z));
                        }
                    }
                }
            }, x.onTouchEnd = function(t) {
                if (t.originalEvent && (t = t.originalEvent), k && x.emit("onTouchEnd", x, t), k = !1, 
                C) {
                    x.params.grabCursor && T && C && (!0 === x.params.allowSwipeToNext || !0 === x.params.allowSwipeToPrev) && x.setGrabCursor(!1);
                    var i = Date.now(), s = i - E;
                    if (x.allowClick && (x.updateClickedSlide(t), x.emit("onTap", x, t), s < 300 && i - H > 300 && (L && clearTimeout(L), 
                    L = setTimeout(function() {
                        x && (x.params.paginationHide && x.paginationContainer.length > 0 && !e(t.target).hasClass(x.params.bulletClass) && x.paginationContainer.toggleClass(x.params.paginationHiddenClass), 
                        x.emit("onClick", x, t));
                    }, 300)), s < 300 && i - H < 300 && (L && clearTimeout(L), x.emit("onDoubleTap", x, t))), 
                    H = Date.now(), setTimeout(function() {
                        x && (x.allowClick = !0);
                    }, 0), C && T && x.swipeDirection && 0 !== x.touches.diff && z !== I) {
                        C = T = !1;
                        var n;
                        if (n = x.params.followFinger ? x.rtl ? x.translate : -x.translate : -z, x.params.freeMode) {
                            if (n < -x.minTranslate()) return void x.slideTo(x.activeIndex);
                            if (n > -x.maxTranslate()) return void (x.slides.length < x.snapGrid.length ? x.slideTo(x.snapGrid.length - 1) : x.slideTo(x.slides.length - 1));
                            if (x.params.freeModeMomentum) {
                                if (W.length > 1) {
                                    var o = W.pop(), a = W.pop(), r = o.position - a.position, l = o.time - a.time;
                                    x.velocity = r / l, x.velocity = x.velocity / 2, Math.abs(x.velocity) < x.params.freeModeMinimumVelocity && (x.velocity = 0), 
                                    (l > 150 || new window.Date().getTime() - o.time > 300) && (x.velocity = 0);
                                } else x.velocity = 0;
                                x.velocity = x.velocity * x.params.freeModeMomentumVelocityRatio, W.length = 0;
                                var c = 1e3 * x.params.freeModeMomentumRatio, h = x.velocity * c, d = x.translate + h;
                                x.rtl && (d = -d);
                                var u, p = !1, f = 20 * Math.abs(x.velocity) * x.params.freeModeMomentumBounceRatio;
                                if (d < x.maxTranslate()) x.params.freeModeMomentumBounce ? (d + x.maxTranslate() < -f && (d = x.maxTranslate() - f), 
                                u = x.maxTranslate(), p = !0, $ = !0) : d = x.maxTranslate(); else if (d > x.minTranslate()) x.params.freeModeMomentumBounce ? (d - x.minTranslate() > f && (d = x.minTranslate() + f), 
                                u = x.minTranslate(), p = !0, $ = !0) : d = x.minTranslate(); else if (x.params.freeModeSticky) {
                                    var m, g = 0;
                                    for (g = 0; g < x.snapGrid.length; g += 1) if (x.snapGrid[g] > -d) {
                                        m = g;
                                        break;
                                    }
                                    d = Math.abs(x.snapGrid[m] - d) < Math.abs(x.snapGrid[m - 1] - d) || "next" === x.swipeDirection ? x.snapGrid[m] : x.snapGrid[m - 1], 
                                    x.rtl || (d = -d);
                                }
                                if (0 !== x.velocity) c = x.rtl ? Math.abs((-d - x.translate) / x.velocity) : Math.abs((d - x.translate) / x.velocity); else if (x.params.freeModeSticky) return void x.slideReset();
                                x.params.freeModeMomentumBounce && p ? (x.updateProgress(u), x.setWrapperTransition(c), 
                                x.setWrapperTranslate(d), x.onTransitionStart(), x.animating = !0, x.wrapper.transitionEnd(function() {
                                    x && $ && (x.emit("onMomentumBounce", x), x.setWrapperTransition(x.params.speed), 
                                    x.setWrapperTranslate(u), x.wrapper.transitionEnd(function() {
                                        x && x.onTransitionEnd();
                                    }));
                                })) : x.velocity ? (x.updateProgress(d), x.setWrapperTransition(c), x.setWrapperTranslate(d), 
                                x.onTransitionStart(), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function() {
                                    x && x.onTransitionEnd();
                                }))) : x.updateProgress(d), x.updateActiveIndex();
                            }
                            (!x.params.freeModeMomentum || s >= x.params.longSwipesMs) && (x.updateProgress(), 
                            x.updateActiveIndex());
                        } else {
                            var v, w = 0, y = x.slidesSizesGrid[0];
                            for (v = 0; v < x.slidesGrid.length; v += x.params.slidesPerGroup) void 0 !== x.slidesGrid[v + x.params.slidesPerGroup] ? n >= x.slidesGrid[v] && n < x.slidesGrid[v + x.params.slidesPerGroup] && (w = v, 
                            y = x.slidesGrid[v + x.params.slidesPerGroup] - x.slidesGrid[v]) : n >= x.slidesGrid[v] && (w = v, 
                            y = x.slidesGrid[x.slidesGrid.length - 1] - x.slidesGrid[x.slidesGrid.length - 2]);
                            var b = (n - x.slidesGrid[w]) / y;
                            if (s > x.params.longSwipesMs) {
                                if (!x.params.longSwipes) return void x.slideTo(x.activeIndex);
                                "next" === x.swipeDirection && (b >= x.params.longSwipesRatio ? x.slideTo(w + x.params.slidesPerGroup) : x.slideTo(w)), 
                                "prev" === x.swipeDirection && (b > 1 - x.params.longSwipesRatio ? x.slideTo(w + x.params.slidesPerGroup) : x.slideTo(w));
                            } else {
                                if (!x.params.shortSwipes) return void x.slideTo(x.activeIndex);
                                "next" === x.swipeDirection && x.slideTo(w + x.params.slidesPerGroup), "prev" === x.swipeDirection && x.slideTo(w);
                            }
                        }
                    } else C = T = !1;
                }
            }, x._slideTo = function(e, t) {
                return x.slideTo(e, t, !0, !0);
            }, x.slideTo = function(e, t, i, s) {
                void 0 === i && (i = !0), void 0 === e && (e = 0), e < 0 && (e = 0), x.snapIndex = Math.floor(e / x.params.slidesPerGroup), 
                x.snapIndex >= x.snapGrid.length && (x.snapIndex = x.snapGrid.length - 1);
                var n = -x.snapGrid[x.snapIndex];
                if (x.params.autoplay && x.autoplaying && (s || !x.params.autoplayDisableOnInteraction ? x.pauseAutoplay(t) : x.stopAutoplay()), 
                x.updateProgress(n), x.params.normalizeSlideIndex) for (var o = 0; o < x.slidesGrid.length; o++) -Math.floor(100 * n) >= Math.floor(100 * x.slidesGrid[o]) && (e = o);
                return !(!x.params.allowSwipeToNext && n < x.translate && n < x.minTranslate()) && (!(!x.params.allowSwipeToPrev && n > x.translate && n > x.maxTranslate() && (x.activeIndex || 0) !== e) && (void 0 === t && (t = x.params.speed), 
                x.previousIndex = x.activeIndex || 0, x.activeIndex = e, x.updateRealIndex(), x.rtl && -n === x.translate || !x.rtl && n === x.translate ? (x.params.autoHeight && x.updateAutoHeight(), 
                x.updateClasses(), "slide" !== x.params.effect && x.setWrapperTranslate(n), !1) : (x.updateClasses(), 
                x.onTransitionStart(i), 0 === t || x.browser.lteIE9 ? (x.setWrapperTranslate(n), 
                x.setWrapperTransition(0), x.onTransitionEnd(i)) : (x.setWrapperTranslate(n), x.setWrapperTransition(t), 
                x.animating || (x.animating = !0, x.wrapper.transitionEnd(function() {
                    x && x.onTransitionEnd(i);
                }))), !0)));
            }, x.onTransitionStart = function(e) {
                void 0 === e && (e = !0), x.params.autoHeight && x.updateAutoHeight(), x.lazy && x.lazy.onTransitionStart(), 
                e && (x.emit("onTransitionStart", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeStart", x), 
                x.activeIndex > x.previousIndex ? x.emit("onSlideNextStart", x) : x.emit("onSlidePrevStart", x)));
            }, x.onTransitionEnd = function(e) {
                x.animating = !1, x.setWrapperTransition(0), void 0 === e && (e = !0), x.lazy && x.lazy.onTransitionEnd(), 
                e && (x.emit("onTransitionEnd", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeEnd", x), 
                x.activeIndex > x.previousIndex ? x.emit("onSlideNextEnd", x) : x.emit("onSlidePrevEnd", x))), 
                x.params.history && x.history && x.history.setHistory(x.params.history, x.activeIndex), 
                x.params.hashnav && x.hashnav && x.hashnav.setHash();
            }, x.slideNext = function(e, t, i) {
                if (x.params.loop) {
                    if (x.animating) return !1;
                    x.fixLoop();
                    x.container[0].clientLeft;
                    return x.slideTo(x.activeIndex + x.params.slidesPerGroup, t, e, i);
                }
                return x.slideTo(x.activeIndex + x.params.slidesPerGroup, t, e, i);
            }, x._slideNext = function(e) {
                return x.slideNext(!0, e, !0);
            }, x.slidePrev = function(e, t, i) {
                if (x.params.loop) {
                    if (x.animating) return !1;
                    x.fixLoop();
                    x.container[0].clientLeft;
                    return x.slideTo(x.activeIndex - 1, t, e, i);
                }
                return x.slideTo(x.activeIndex - 1, t, e, i);
            }, x._slidePrev = function(e) {
                return x.slidePrev(!0, e, !0);
            }, x.slideReset = function(e, t, i) {
                return x.slideTo(x.activeIndex, t, e);
            }, x.disableTouchControl = function() {
                return x.params.onlyExternal = !0, !0;
            }, x.enableTouchControl = function() {
                return x.params.onlyExternal = !1, !0;
            }, x.setWrapperTransition = function(e, t) {
                x.wrapper.transition(e), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTransition(e), 
                x.params.parallax && x.parallax && x.parallax.setTransition(e), x.params.scrollbar && x.scrollbar && x.scrollbar.setTransition(e), 
                x.params.control && x.controller && x.controller.setTransition(e, t), x.emit("onSetTransition", x, e);
            }, x.setWrapperTranslate = function(e, t, i) {
                var s = 0, n = 0;
                x.isHorizontal() ? s = x.rtl ? -e : e : n = e, x.params.roundLengths && (s = a(s), 
                n = a(n)), x.params.virtualTranslate || (x.support.transforms3d ? x.wrapper.transform("translate3d(" + s + "px, " + n + "px, 0px)") : x.wrapper.transform("translate(" + s + "px, " + n + "px)")), 
                x.translate = x.isHorizontal() ? s : n;
                var o = x.maxTranslate() - x.minTranslate();
                (0 === o ? 0 : (e - x.minTranslate()) / o) !== x.progress && x.updateProgress(e), 
                t && x.updateActiveIndex(), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTranslate(x.translate), 
                x.params.parallax && x.parallax && x.parallax.setTranslate(x.translate), x.params.scrollbar && x.scrollbar && x.scrollbar.setTranslate(x.translate), 
                x.params.control && x.controller && x.controller.setTranslate(x.translate, i), x.emit("onSetTranslate", x, x.translate);
            }, x.getTranslate = function(e, t) {
                var i, s, n, o;
                return void 0 === t && (t = "x"), x.params.virtualTranslate ? x.rtl ? -x.translate : x.translate : (n = window.getComputedStyle(e, null), 
                window.WebKitCSSMatrix ? ((s = n.transform || n.webkitTransform).split(",").length > 6 && (s = s.split(", ").map(function(e) {
                    return e.replace(",", ".");
                }).join(", ")), o = new window.WebKitCSSMatrix("none" === s ? "" : s)) : i = (o = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), 
                "x" === t && (s = window.WebKitCSSMatrix ? o.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), 
                "y" === t && (s = window.WebKitCSSMatrix ? o.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), 
                x.rtl && s && (s = -s), s || 0);
            }, x.getWrapperTranslate = function(e) {
                return void 0 === e && (e = x.isHorizontal() ? "x" : "y"), x.getTranslate(x.wrapper[0], e);
            }, x.observers = [], x.initObservers = function() {
                if (x.params.observeParents) for (var e = x.container.parents(), t = 0; t < e.length; t++) c(e[t]);
                c(x.container[0], {
                    childList: !1
                }), c(x.wrapper[0], {
                    attributes: !1
                });
            }, x.disconnectObservers = function() {
                for (var e = 0; e < x.observers.length; e++) x.observers[e].disconnect();
                x.observers = [];
            }, x.createLoop = function() {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove();
                var t = x.wrapper.children("." + x.params.slideClass);
                "auto" !== x.params.slidesPerView || x.params.loopedSlides || (x.params.loopedSlides = t.length), 
                x.loopedSlides = parseInt(x.params.loopedSlides || x.params.slidesPerView, 10), 
                x.loopedSlides = x.loopedSlides + x.params.loopAdditionalSlides, x.loopedSlides > t.length && (x.loopedSlides = t.length);
                var i, s = [], n = [];
                for (t.each(function(i, o) {
                    var a = e(this);
                    i < x.loopedSlides && n.push(o), i < t.length && i >= t.length - x.loopedSlides && s.push(o), 
                    a.attr("data-swiper-slide-index", i);
                }), i = 0; i < n.length; i++) x.wrapper.append(e(n[i].cloneNode(!0)).addClass(x.params.slideDuplicateClass));
                for (i = s.length - 1; i >= 0; i--) x.wrapper.prepend(e(s[i].cloneNode(!0)).addClass(x.params.slideDuplicateClass));
            }, x.destroyLoop = function() {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove(), 
                x.slides.removeAttr("data-swiper-slide-index");
            }, x.reLoop = function(e) {
                var t = x.activeIndex - x.loopedSlides;
                x.destroyLoop(), x.createLoop(), x.updateSlidesSize(), e && x.slideTo(t + x.loopedSlides, 0, !1);
            }, x.fixLoop = function() {
                var e;
                x.activeIndex < x.loopedSlides ? (e = x.slides.length - 3 * x.loopedSlides + x.activeIndex, 
                e += x.loopedSlides, x.slideTo(e, 0, !1, !0)) : ("auto" === x.params.slidesPerView && x.activeIndex >= 2 * x.loopedSlides || x.activeIndex > x.slides.length - 2 * x.params.slidesPerView) && (e = -x.slides.length + x.activeIndex + x.loopedSlides, 
                e += x.loopedSlides, x.slideTo(e, 0, !1, !0));
            }, x.appendSlide = function(e) {
                if (x.params.loop && x.destroyLoop(), "object" == typeof e && e.length) for (var t = 0; t < e.length; t++) e[t] && x.wrapper.append(e[t]); else x.wrapper.append(e);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0);
            }, x.prependSlide = function(e) {
                x.params.loop && x.destroyLoop();
                var t = x.activeIndex + 1;
                if ("object" == typeof e && e.length) {
                    for (var i = 0; i < e.length; i++) e[i] && x.wrapper.prepend(e[i]);
                    t = x.activeIndex + e.length;
                } else x.wrapper.prepend(e);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), 
                x.slideTo(t, 0, !1);
            }, x.removeSlide = function(e) {
                x.params.loop && (x.destroyLoop(), x.slides = x.wrapper.children("." + x.params.slideClass));
                var t, i = x.activeIndex;
                if ("object" == typeof e && e.length) {
                    for (var s = 0; s < e.length; s++) t = e[s], x.slides[t] && x.slides.eq(t).remove(), 
                    t < i && i--;
                    i = Math.max(i, 0);
                } else t = e, x.slides[t] && x.slides.eq(t).remove(), t < i && i--, i = Math.max(i, 0);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), 
                x.params.loop ? x.slideTo(i + x.loopedSlides, 0, !1) : x.slideTo(i, 0, !1);
            }, x.removeAllSlides = function() {
                for (var e = [], t = 0; t < x.slides.length; t++) e.push(t);
                x.removeSlide(e);
            }, x.effects = {
                fade: {
                    setTranslate: function() {
                        for (var e = 0; e < x.slides.length; e++) {
                            var t = x.slides.eq(e), i = -t[0].swiperSlideOffset;
                            x.params.virtualTranslate || (i -= x.translate);
                            var s = 0;
                            x.isHorizontal() || (s = i, i = 0);
                            var n = x.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                            t.css({
                                opacity: n
                            }).transform("translate3d(" + i + "px, " + s + "px, 0px)");
                        }
                    },
                    setTransition: function(e) {
                        if (x.slides.transition(e), x.params.virtualTranslate && 0 !== e) {
                            var t = !1;
                            x.slides.transitionEnd(function() {
                                if (!t && x) {
                                    t = !0, x.animating = !1;
                                    for (var e = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], i = 0; i < e.length; i++) x.wrapper.trigger(e[i]);
                                }
                            });
                        }
                    }
                },
                flip: {
                    setTranslate: function() {
                        for (var t = 0; t < x.slides.length; t++) {
                            var i = x.slides.eq(t), s = i[0].progress;
                            x.params.flip.limitRotation && (s = Math.max(Math.min(i[0].progress, 1), -1));
                            var n = -180 * s, o = 0, a = -i[0].swiperSlideOffset, r = 0;
                            if (x.isHorizontal() ? x.rtl && (n = -n) : (r = a, a = 0, o = -n, n = 0), i[0].style.zIndex = -Math.abs(Math.round(s)) + x.slides.length, 
                            x.params.flip.slideShadows) {
                                var l = x.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"), c = x.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                0 === l.length && (l = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), 
                                i.append(l)), 0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), 
                                i.append(c)), l.length && (l[0].style.opacity = Math.max(-s, 0)), c.length && (c[0].style.opacity = Math.max(s, 0));
                            }
                            i.transform("translate3d(" + a + "px, " + r + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
                        }
                    },
                    setTransition: function(t) {
                        if (x.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), 
                        x.params.virtualTranslate && 0 !== t) {
                            var i = !1;
                            x.slides.eq(x.activeIndex).transitionEnd(function() {
                                if (!i && x && e(this).hasClass(x.params.slideActiveClass)) {
                                    i = !0, x.animating = !1;
                                    for (var t = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], s = 0; s < t.length; s++) x.wrapper.trigger(t[s]);
                                }
                            });
                        }
                    }
                },
                cube: {
                    setTranslate: function() {
                        var t, i = 0;
                        x.params.cube.shadow && (x.isHorizontal() ? (0 === (t = x.wrapper.find(".swiper-cube-shadow")).length && (t = e('<div class="swiper-cube-shadow"></div>'), 
                        x.wrapper.append(t)), t.css({
                            height: x.width + "px"
                        })) : 0 === (t = x.container.find(".swiper-cube-shadow")).length && (t = e('<div class="swiper-cube-shadow"></div>'), 
                        x.container.append(t)));
                        for (var s = 0; s < x.slides.length; s++) {
                            var n = x.slides.eq(s), o = 90 * s, a = Math.floor(o / 360);
                            x.rtl && (o = -o, a = Math.floor(-o / 360));
                            var r = Math.max(Math.min(n[0].progress, 1), -1), l = 0, c = 0, h = 0;
                            s % 4 == 0 ? (l = 4 * -a * x.size, h = 0) : (s - 1) % 4 == 0 ? (l = 0, h = 4 * -a * x.size) : (s - 2) % 4 == 0 ? (l = x.size + 4 * a * x.size, 
                            h = x.size) : (s - 3) % 4 == 0 && (l = -x.size, h = 3 * x.size + 4 * x.size * a), 
                            x.rtl && (l = -l), x.isHorizontal() || (c = l, l = 0);
                            var d = "rotateX(" + (x.isHorizontal() ? 0 : -o) + "deg) rotateY(" + (x.isHorizontal() ? o : 0) + "deg) translate3d(" + l + "px, " + c + "px, " + h + "px)";
                            if (r <= 1 && r > -1 && (i = 90 * s + 90 * r, x.rtl && (i = 90 * -s - 90 * r)), 
                            n.transform(d), x.params.cube.slideShadows) {
                                var u = x.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"), p = x.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
                                0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), 
                                n.append(u)), 0 === p.length && (p = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), 
                                n.append(p)), u.length && (u[0].style.opacity = Math.max(-r, 0)), p.length && (p[0].style.opacity = Math.max(r, 0));
                            }
                        }
                        if (x.wrapper.css({
                            "-webkit-transform-origin": "50% 50% -" + x.size / 2 + "px",
                            "-moz-transform-origin": "50% 50% -" + x.size / 2 + "px",
                            "-ms-transform-origin": "50% 50% -" + x.size / 2 + "px",
                            "transform-origin": "50% 50% -" + x.size / 2 + "px"
                        }), x.params.cube.shadow) if (x.isHorizontal()) t.transform("translate3d(0px, " + (x.width / 2 + x.params.cube.shadowOffset) + "px, " + -x.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + x.params.cube.shadowScale + ")"); else {
                            var f = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90), m = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2), g = x.params.cube.shadowScale, v = x.params.cube.shadowScale / m, w = x.params.cube.shadowOffset;
                            t.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (x.height / 2 + w) + "px, " + -x.height / 2 / v + "px) rotateX(-90deg)");
                        }
                        var y = x.isSafari || x.isUiWebView ? -x.size / 2 : 0;
                        x.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (x.isHorizontal() ? 0 : i) + "deg) rotateY(" + (x.isHorizontal() ? -i : 0) + "deg)");
                    },
                    setTransition: function(e) {
                        x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), 
                        x.params.cube.shadow && !x.isHorizontal() && x.container.find(".swiper-cube-shadow").transition(e);
                    }
                },
                coverflow: {
                    setTranslate: function() {
                        for (var t = x.translate, i = x.isHorizontal() ? -t + x.width / 2 : -t + x.height / 2, s = x.isHorizontal() ? x.params.coverflow.rotate : -x.params.coverflow.rotate, n = x.params.coverflow.depth, o = 0, a = x.slides.length; o < a; o++) {
                            var r = x.slides.eq(o), l = x.slidesSizesGrid[o], c = (i - r[0].swiperSlideOffset - l / 2) / l * x.params.coverflow.modifier, h = x.isHorizontal() ? s * c : 0, d = x.isHorizontal() ? 0 : s * c, u = -n * Math.abs(c), p = x.isHorizontal() ? 0 : x.params.coverflow.stretch * c, f = x.isHorizontal() ? x.params.coverflow.stretch * c : 0;
                            Math.abs(f) < .001 && (f = 0), Math.abs(p) < .001 && (p = 0), Math.abs(u) < .001 && (u = 0), 
                            Math.abs(h) < .001 && (h = 0), Math.abs(d) < .001 && (d = 0);
                            var m = "translate3d(" + f + "px," + p + "px," + u + "px)  rotateX(" + d + "deg) rotateY(" + h + "deg)";
                            if (r.transform(m), r[0].style.zIndex = 1 - Math.abs(Math.round(c)), x.params.coverflow.slideShadows) {
                                var g = x.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"), v = x.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                0 === g.length && (g = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), 
                                r.append(g)), 0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), 
                                r.append(v)), g.length && (g[0].style.opacity = c > 0 ? c : 0), v.length && (v[0].style.opacity = -c > 0 ? -c : 0);
                            }
                        }
                        x.browser.ie && (x.wrapper[0].style.perspectiveOrigin = i + "px 50%");
                    },
                    setTransition: function(e) {
                        x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
                    }
                }
            }, x.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function(t, i) {
                    if (void 0 !== t && (void 0 === i && (i = !0), 0 !== x.slides.length)) {
                        var s = x.slides.eq(t), n = s.find("." + x.params.lazyLoadingClass + ":not(." + x.params.lazyStatusLoadedClass + "):not(." + x.params.lazyStatusLoadingClass + ")");
                        !s.hasClass(x.params.lazyLoadingClass) || s.hasClass(x.params.lazyStatusLoadedClass) || s.hasClass(x.params.lazyStatusLoadingClass) || (n = n.add(s[0])), 
                        0 !== n.length && n.each(function() {
                            var t = e(this);
                            t.addClass(x.params.lazyStatusLoadingClass);
                            var n = t.attr("data-background"), o = t.attr("data-src"), a = t.attr("data-srcset"), r = t.attr("data-sizes");
                            x.loadImage(t[0], o || n, a, r, !1, function() {
                                if (n ? (t.css("background-image", 'url("' + n + '")'), t.removeAttr("data-background")) : (a && (t.attr("srcset", a), 
                                t.removeAttr("data-srcset")), r && (t.attr("sizes", r), t.removeAttr("data-sizes")), 
                                o && (t.attr("src", o), t.removeAttr("data-src"))), t.addClass(x.params.lazyStatusLoadedClass).removeClass(x.params.lazyStatusLoadingClass), 
                                s.find("." + x.params.lazyPreloaderClass + ", ." + x.params.preloaderClass).remove(), 
                                x.params.loop && i) {
                                    var e = s.attr("data-swiper-slide-index");
                                    if (s.hasClass(x.params.slideDuplicateClass)) {
                                        var l = x.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + x.params.slideDuplicateClass + ")");
                                        x.lazy.loadImageInSlide(l.index(), !1);
                                    } else {
                                        var c = x.wrapper.children("." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        x.lazy.loadImageInSlide(c.index(), !1);
                                    }
                                }
                                x.emit("onLazyImageReady", x, s[0], t[0]);
                            }), x.emit("onLazyImageLoad", x, s[0], t[0]);
                        });
                    }
                },
                load: function() {
                    var t, i = x.params.slidesPerView;
                    if ("auto" === i && (i = 0), x.lazy.initialImageLoaded || (x.lazy.initialImageLoaded = !0), 
                    x.params.watchSlidesVisibility) x.wrapper.children("." + x.params.slideVisibleClass).each(function() {
                        x.lazy.loadImageInSlide(e(this).index());
                    }); else if (i > 1) for (t = x.activeIndex; t < x.activeIndex + i; t++) x.slides[t] && x.lazy.loadImageInSlide(t); else x.lazy.loadImageInSlide(x.activeIndex);
                    if (x.params.lazyLoadingInPrevNext) if (i > 1 || x.params.lazyLoadingInPrevNextAmount && x.params.lazyLoadingInPrevNextAmount > 1) {
                        var s = x.params.lazyLoadingInPrevNextAmount, n = i, o = Math.min(x.activeIndex + n + Math.max(s, n), x.slides.length), a = Math.max(x.activeIndex - Math.max(n, s), 0);
                        for (t = x.activeIndex + i; t < o; t++) x.slides[t] && x.lazy.loadImageInSlide(t);
                        for (t = a; t < x.activeIndex; t++) x.slides[t] && x.lazy.loadImageInSlide(t);
                    } else {
                        var r = x.wrapper.children("." + x.params.slideNextClass);
                        r.length > 0 && x.lazy.loadImageInSlide(r.index());
                        var l = x.wrapper.children("." + x.params.slidePrevClass);
                        l.length > 0 && x.lazy.loadImageInSlide(l.index());
                    }
                },
                onTransitionStart: function() {
                    x.params.lazyLoading && (x.params.lazyLoadingOnTransitionStart || !x.params.lazyLoadingOnTransitionStart && !x.lazy.initialImageLoaded) && x.lazy.load();
                },
                onTransitionEnd: function() {
                    x.params.lazyLoading && !x.params.lazyLoadingOnTransitionStart && x.lazy.load();
                }
            }, x.scrollbar = {
                isTouched: !1,
                setDragPosition: function(e) {
                    var t = x.scrollbar, i = (x.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - t.track.offset()[x.isHorizontal() ? "left" : "top"] - t.dragSize / 2, s = -x.minTranslate() * t.moveDivider, n = -x.maxTranslate() * t.moveDivider;
                    i < s ? i = s : i > n && (i = n), i = -i / t.moveDivider, x.updateProgress(i), x.setWrapperTranslate(i, !0);
                },
                dragStart: function(e) {
                    var t = x.scrollbar;
                    t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), 
                    clearTimeout(t.dragTimeout), t.track.transition(0), x.params.scrollbarHide && t.track.css("opacity", 1), 
                    x.wrapper.transition(100), t.drag.transition(100), x.emit("onScrollbarDragStart", x);
                },
                dragMove: function(e) {
                    var t = x.scrollbar;
                    t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), 
                    x.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), x.emit("onScrollbarDragMove", x));
                },
                dragEnd: function(e) {
                    var t = x.scrollbar;
                    t.isTouched && (t.isTouched = !1, x.params.scrollbarHide && (clearTimeout(t.dragTimeout), 
                    t.dragTimeout = setTimeout(function() {
                        t.track.css("opacity", 0), t.track.transition(400);
                    }, 1e3)), x.emit("onScrollbarDragEnd", x), x.params.scrollbarSnapOnRelease && x.slideReset());
                },
                draggableEvents: function() {
                    return !1 !== x.params.simulateTouch || x.support.touch ? x.touchEvents : x.touchEventsDesktop;
                }(),
                enableDraggable: function() {
                    var t = x.scrollbar, i = x.support.touch ? t.track : document;
                    e(t.track).on(t.draggableEvents.start, t.dragStart), e(i).on(t.draggableEvents.move, t.dragMove), 
                    e(i).on(t.draggableEvents.end, t.dragEnd);
                },
                disableDraggable: function() {
                    var t = x.scrollbar, i = x.support.touch ? t.track : document;
                    e(t.track).off(x.draggableEvents.start, t.dragStart), e(i).off(x.draggableEvents.move, t.dragMove), 
                    e(i).off(x.draggableEvents.end, t.dragEnd);
                },
                set: function() {
                    if (x.params.scrollbar) {
                        var t = x.scrollbar;
                        t.track = e(x.params.scrollbar), x.params.uniqueNavElements && "string" == typeof x.params.scrollbar && t.track.length > 1 && 1 === x.container.find(x.params.scrollbar).length && (t.track = x.container.find(x.params.scrollbar)), 
                        t.drag = t.track.find(".swiper-scrollbar-drag"), 0 === t.drag.length && (t.drag = e('<div class="swiper-scrollbar-drag"></div>'), 
                        t.track.append(t.drag)), t.drag[0].style.width = "", t.drag[0].style.height = "", 
                        t.trackSize = x.isHorizontal() ? t.track[0].offsetWidth : t.track[0].offsetHeight, 
                        t.divider = x.size / x.virtualSize, t.moveDivider = t.divider * (t.trackSize / x.size), 
                        t.dragSize = t.trackSize * t.divider, x.isHorizontal() ? t.drag[0].style.width = t.dragSize + "px" : t.drag[0].style.height = t.dragSize + "px", 
                        t.divider >= 1 ? t.track[0].style.display = "none" : t.track[0].style.display = "", 
                        x.params.scrollbarHide && (t.track[0].style.opacity = 0);
                    }
                },
                setTranslate: function() {
                    if (x.params.scrollbar) {
                        var e, t = x.scrollbar, i = (x.translate, t.dragSize);
                        e = (t.trackSize - t.dragSize) * x.progress, x.rtl && x.isHorizontal() ? (e = -e) > 0 ? (i = t.dragSize - e, 
                        e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e) : e < 0 ? (i = t.dragSize + e, 
                        e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e), x.isHorizontal() ? (x.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"), 
                        t.drag[0].style.width = i + "px") : (x.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"), 
                        t.drag[0].style.height = i + "px"), x.params.scrollbarHide && (clearTimeout(t.timeout), 
                        t.track[0].style.opacity = 1, t.timeout = setTimeout(function() {
                            t.track[0].style.opacity = 0, t.track.transition(400);
                        }, 1e3));
                    }
                },
                setTransition: function(e) {
                    x.params.scrollbar && x.scrollbar.drag.transition(e);
                }
            }, x.controller = {
                LinearSpline: function(e, t) {
                    this.x = e, this.y = t, this.lastIndex = e.length - 1;
                    var i, s;
                    this.x.length;
                    this.interpolate = function(e) {
                        return e ? (s = n(this.x, e), i = s - 1, (e - this.x[i]) * (this.y[s] - this.y[i]) / (this.x[s] - this.x[i]) + this.y[i]) : 0;
                    };
                    var n = function() {
                        var e, t, i;
                        return function(s, n) {
                            for (t = -1, e = s.length; e - t > 1; ) s[i = e + t >> 1] <= n ? t = i : e = i;
                            return e;
                        };
                    }();
                },
                getInterpolateFunction: function(e) {
                    x.controller.spline || (x.controller.spline = x.params.loop ? new x.controller.LinearSpline(x.slidesGrid, e.slidesGrid) : new x.controller.LinearSpline(x.snapGrid, e.snapGrid));
                },
                setTranslate: function(e, i) {
                    function s(t) {
                        e = t.rtl && "horizontal" === t.params.direction ? -x.translate : x.translate, "slide" === x.params.controlBy && (x.controller.getInterpolateFunction(t), 
                        o = -x.controller.spline.interpolate(-e)), o && "container" !== x.params.controlBy || (n = (t.maxTranslate() - t.minTranslate()) / (x.maxTranslate() - x.minTranslate()), 
                        o = (e - x.minTranslate()) * n + t.minTranslate()), x.params.controlInverse && (o = t.maxTranslate() - o), 
                        t.updateProgress(o), t.setWrapperTranslate(o, !1, x), t.updateActiveIndex();
                    }
                    var n, o, a = x.params.control;
                    if (x.isArray(a)) for (var r = 0; r < a.length; r++) a[r] !== i && a[r] instanceof t && s(a[r]); else a instanceof t && i !== a && s(a);
                },
                setTransition: function(e, i) {
                    function s(t) {
                        t.setWrapperTransition(e, x), 0 !== e && (t.onTransitionStart(), t.wrapper.transitionEnd(function() {
                            o && (t.params.loop && "slide" === x.params.controlBy && t.fixLoop(), t.onTransitionEnd());
                        }));
                    }
                    var n, o = x.params.control;
                    if (x.isArray(o)) for (n = 0; n < o.length; n++) o[n] !== i && o[n] instanceof t && s(o[n]); else o instanceof t && i !== o && s(o);
                }
            }, x.hashnav = {
                onHashCange: function(e, t) {
                    var i = document.location.hash.replace("#", "");
                    i !== x.slides.eq(x.activeIndex).attr("data-hash") && x.slideTo(x.wrapper.children("." + x.params.slideClass + '[data-hash="' + i + '"]').index());
                },
                attachEvents: function(t) {
                    var i = t ? "off" : "on";
                    e(window)[i]("hashchange", x.hashnav.onHashCange);
                },
                setHash: function() {
                    if (x.hashnav.initialized && x.params.hashnav) if (x.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + x.slides.eq(x.activeIndex).attr("data-hash") || ""); else {
                        var e = x.slides.eq(x.activeIndex), t = e.attr("data-hash") || e.attr("data-history");
                        document.location.hash = t || "";
                    }
                },
                init: function() {
                    if (x.params.hashnav && !x.params.history) {
                        x.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (e) {
                            for (var t = 0, i = x.slides.length; t < i; t++) {
                                var s = x.slides.eq(t);
                                if ((s.attr("data-hash") || s.attr("data-history")) === e && !s.hasClass(x.params.slideDuplicateClass)) {
                                    var n = s.index();
                                    x.slideTo(n, 0, x.params.runCallbacksOnInit, !0);
                                }
                            }
                            x.params.hashnavWatchState && x.hashnav.attachEvents();
                        }
                    }
                },
                destroy: function() {
                    x.params.hashnavWatchState && x.hashnav.attachEvents(!0);
                }
            }, x.history = {
                init: function() {
                    if (x.params.history) {
                        if (!window.history || !window.history.pushState) return x.params.history = !1, 
                        void (x.params.hashnav = !0);
                        x.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, x.params.runCallbacksOnInit), 
                        x.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState));
                    }
                },
                setHistoryPopState: function() {
                    x.history.paths = x.history.getPathValues(), x.history.scrollToSlide(x.params.speed, x.history.paths.value, !1);
                },
                getPathValues: function() {
                    var e = window.location.pathname.slice(1).split("/"), t = e.length;
                    return {
                        key: e[t - 2],
                        value: e[t - 1]
                    };
                },
                setHistory: function(e, t) {
                    if (x.history.initialized && x.params.history) {
                        var i = x.slides.eq(t), s = this.slugify(i.attr("data-history"));
                        window.location.pathname.includes(e) || (s = e + "/" + s), x.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s);
                    }
                },
                slugify: function(e) {
                    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
                },
                scrollToSlide: function(e, t, i) {
                    if (t) for (var s = 0, n = x.slides.length; s < n; s++) {
                        var o = x.slides.eq(s);
                        if (this.slugify(o.attr("data-history")) === t && !o.hasClass(x.params.slideDuplicateClass)) {
                            var a = o.index();
                            x.slideTo(a, e, i);
                        }
                    } else x.slideTo(0, e, i);
                }
            }, x.disableKeyboardControl = function() {
                x.params.keyboardControl = !1, e(document).off("keydown", h);
            }, x.enableKeyboardControl = function() {
                x.params.keyboardControl = !0, e(document).on("keydown", h);
            }, x.mousewheel = {
                event: !1,
                lastScrollTime: new window.Date().getTime()
            }, x.params.mousewheelControl && (x.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var e = "onwheel" in document;
                if (!e) {
                    var t = document.createElement("div");
                    t.setAttribute("onwheel", "return;"), e = "function" == typeof t.onwheel;
                }
                return !e && document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "") && (e = document.implementation.hasFeature("Events.wheel", "3.0")), 
                e;
            }() ? "wheel" : "mousewheel"), x.disableMousewheelControl = function() {
                if (!x.mousewheel.event) return !1;
                var t = x.container;
                return "container" !== x.params.mousewheelEventsTarged && (t = e(x.params.mousewheelEventsTarged)), 
                t.off(x.mousewheel.event, d), !0;
            }, x.enableMousewheelControl = function() {
                if (!x.mousewheel.event) return !1;
                var t = x.container;
                return "container" !== x.params.mousewheelEventsTarged && (t = e(x.params.mousewheelEventsTarged)), 
                t.on(x.mousewheel.event, d), !0;
            }, x.parallax = {
                setTranslate: function() {
                    x.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        p(this, x.progress);
                    }), x.slides.each(function() {
                        var t = e(this);
                        t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            p(this, Math.min(Math.max(t[0].progress, -1), 1));
                        });
                    });
                },
                setTransition: function(t) {
                    void 0 === t && (t = x.params.speed), x.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var i = e(this), s = parseInt(i.attr("data-swiper-parallax-duration"), 10) || t;
                        0 === t && (s = 0), i.transition(s);
                    });
                }
            }, x.zoom = {
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    slide: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    image: void 0,
                    imageWrap: void 0,
                    zoomMax: x.params.zoomMax
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                },
                getDistanceBetweenTouches: function(e) {
                    if (e.targetTouches.length < 2) return 1;
                    var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, s = e.targetTouches[1].pageX, n = e.targetTouches[1].pageY;
                    return Math.sqrt(Math.pow(s - t, 2) + Math.pow(n - i, 2));
                },
                onGestureStart: function(t) {
                    var i = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
                        i.gesture.scaleStart = i.getDistanceBetweenTouches(t);
                    }
                    i.gesture.slide && i.gesture.slide.length || (i.gesture.slide = e(this), 0 === i.gesture.slide.length && (i.gesture.slide = x.slides.eq(x.activeIndex)), 
                    i.gesture.image = i.gesture.slide.find("img, svg, canvas"), i.gesture.imageWrap = i.gesture.image.parent("." + x.params.zoomContainerClass), 
                    i.gesture.zoomMax = i.gesture.imageWrap.attr("data-swiper-zoom") || x.params.zoomMax, 
                    0 !== i.gesture.imageWrap.length) ? (i.gesture.image.transition(0), i.isScaling = !0) : i.gesture.image = void 0;
                },
                onGestureChange: function(e) {
                    var t = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                        t.gesture.scaleMove = t.getDistanceBetweenTouches(e);
                    }
                    t.gesture.image && 0 !== t.gesture.image.length && (x.support.gestures ? t.scale = e.scale * t.currentScale : t.scale = t.gesture.scaleMove / t.gesture.scaleStart * t.currentScale, 
                    t.scale > t.gesture.zoomMax && (t.scale = t.gesture.zoomMax - 1 + Math.pow(t.scale - t.gesture.zoomMax + 1, .5)), 
                    t.scale < x.params.zoomMin && (t.scale = x.params.zoomMin + 1 - Math.pow(x.params.zoomMin - t.scale + 1, .5)), 
                    t.gesture.image.transform("translate3d(0,0,0) scale(" + t.scale + ")"));
                },
                onGestureEnd: function(e) {
                    var t = x.zoom;
                    !x.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || t.gesture.image && 0 !== t.gesture.image.length && (t.scale = Math.max(Math.min(t.scale, t.gesture.zoomMax), x.params.zoomMin), 
                    t.gesture.image.transition(x.params.speed).transform("translate3d(0,0,0) scale(" + t.scale + ")"), 
                    t.currentScale = t.scale, t.isScaling = !1, 1 === t.scale && (t.gesture.slide = void 0));
                },
                onTouchStart: function(e, t) {
                    var i = e.zoom;
                    i.gesture.image && 0 !== i.gesture.image.length && (i.image.isTouched || ("android" === e.device.os && t.preventDefault(), 
                    i.image.isTouched = !0, i.image.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, 
                    i.image.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY));
                },
                onTouchMove: function(e) {
                    var t = x.zoom;
                    if (t.gesture.image && 0 !== t.gesture.image.length && (x.allowClick = !1, t.image.isTouched && t.gesture.slide)) {
                        t.image.isMoved || (t.image.width = t.gesture.image[0].offsetWidth, t.image.height = t.gesture.image[0].offsetHeight, 
                        t.image.startX = x.getTranslate(t.gesture.imageWrap[0], "x") || 0, t.image.startY = x.getTranslate(t.gesture.imageWrap[0], "y") || 0, 
                        t.gesture.slideWidth = t.gesture.slide[0].offsetWidth, t.gesture.slideHeight = t.gesture.slide[0].offsetHeight, 
                        t.gesture.imageWrap.transition(0));
                        var i = t.image.width * t.scale, s = t.image.height * t.scale;
                        if (!(i < t.gesture.slideWidth && s < t.gesture.slideHeight)) {
                            if (t.image.minX = Math.min(t.gesture.slideWidth / 2 - i / 2, 0), t.image.maxX = -t.image.minX, 
                            t.image.minY = Math.min(t.gesture.slideHeight / 2 - s / 2, 0), t.image.maxY = -t.image.minY, 
                            t.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, 
                            t.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, 
                            !t.image.isMoved && !t.isScaling) {
                                if (x.isHorizontal() && Math.floor(t.image.minX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x < t.image.touchesStart.x || Math.floor(t.image.maxX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x > t.image.touchesStart.x) return void (t.image.isTouched = !1);
                                if (!x.isHorizontal() && Math.floor(t.image.minY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y < t.image.touchesStart.y || Math.floor(t.image.maxY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y > t.image.touchesStart.y) return void (t.image.isTouched = !1);
                            }
                            e.preventDefault(), e.stopPropagation(), t.image.isMoved = !0, t.image.currentX = t.image.touchesCurrent.x - t.image.touchesStart.x + t.image.startX, 
                            t.image.currentY = t.image.touchesCurrent.y - t.image.touchesStart.y + t.image.startY, 
                            t.image.currentX < t.image.minX && (t.image.currentX = t.image.minX + 1 - Math.pow(t.image.minX - t.image.currentX + 1, .8)), 
                            t.image.currentX > t.image.maxX && (t.image.currentX = t.image.maxX - 1 + Math.pow(t.image.currentX - t.image.maxX + 1, .8)), 
                            t.image.currentY < t.image.minY && (t.image.currentY = t.image.minY + 1 - Math.pow(t.image.minY - t.image.currentY + 1, .8)), 
                            t.image.currentY > t.image.maxY && (t.image.currentY = t.image.maxY - 1 + Math.pow(t.image.currentY - t.image.maxY + 1, .8)), 
                            t.velocity.prevPositionX || (t.velocity.prevPositionX = t.image.touchesCurrent.x), 
                            t.velocity.prevPositionY || (t.velocity.prevPositionY = t.image.touchesCurrent.y), 
                            t.velocity.prevTime || (t.velocity.prevTime = Date.now()), t.velocity.x = (t.image.touchesCurrent.x - t.velocity.prevPositionX) / (Date.now() - t.velocity.prevTime) / 2, 
                            t.velocity.y = (t.image.touchesCurrent.y - t.velocity.prevPositionY) / (Date.now() - t.velocity.prevTime) / 2, 
                            Math.abs(t.image.touchesCurrent.x - t.velocity.prevPositionX) < 2 && (t.velocity.x = 0), 
                            Math.abs(t.image.touchesCurrent.y - t.velocity.prevPositionY) < 2 && (t.velocity.y = 0), 
                            t.velocity.prevPositionX = t.image.touchesCurrent.x, t.velocity.prevPositionY = t.image.touchesCurrent.y, 
                            t.velocity.prevTime = Date.now(), t.gesture.imageWrap.transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)");
                        }
                    }
                },
                onTouchEnd: function(e, t) {
                    var i = e.zoom;
                    if (i.gesture.image && 0 !== i.gesture.image.length) {
                        if (!i.image.isTouched || !i.image.isMoved) return i.image.isTouched = !1, void (i.image.isMoved = !1);
                        i.image.isTouched = !1, i.image.isMoved = !1;
                        var s = 300, n = 300, o = i.velocity.x * s, a = i.image.currentX + o, r = i.velocity.y * n, l = i.image.currentY + r;
                        0 !== i.velocity.x && (s = Math.abs((a - i.image.currentX) / i.velocity.x)), 0 !== i.velocity.y && (n = Math.abs((l - i.image.currentY) / i.velocity.y));
                        var c = Math.max(s, n);
                        i.image.currentX = a, i.image.currentY = l;
                        var h = i.image.width * i.scale, d = i.image.height * i.scale;
                        i.image.minX = Math.min(i.gesture.slideWidth / 2 - h / 2, 0), i.image.maxX = -i.image.minX, 
                        i.image.minY = Math.min(i.gesture.slideHeight / 2 - d / 2, 0), i.image.maxY = -i.image.minY, 
                        i.image.currentX = Math.max(Math.min(i.image.currentX, i.image.maxX), i.image.minX), 
                        i.image.currentY = Math.max(Math.min(i.image.currentY, i.image.maxY), i.image.minY), 
                        i.gesture.imageWrap.transition(c).transform("translate3d(" + i.image.currentX + "px, " + i.image.currentY + "px,0)");
                    }
                },
                onTransitionEnd: function(e) {
                    var t = e.zoom;
                    t.gesture.slide && e.previousIndex !== e.activeIndex && (t.gesture.image.transform("translate3d(0,0,0) scale(1)"), 
                    t.gesture.imageWrap.transform("translate3d(0,0,0)"), t.gesture.slide = t.gesture.image = t.gesture.imageWrap = void 0, 
                    t.scale = t.currentScale = 1);
                },
                toggleZoom: function(t, i) {
                    var s = t.zoom;
                    if (s.gesture.slide || (s.gesture.slide = t.clickedSlide ? e(t.clickedSlide) : t.slides.eq(t.activeIndex), 
                    s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + t.params.zoomContainerClass)), 
                    s.gesture.image && 0 !== s.gesture.image.length) {
                        var n, o, a, r, l, c, h, d, u, p, f, m, g, v, w, y;
                        void 0 === s.image.touchesStart.x && i ? (n = "touchend" === i.type ? i.changedTouches[0].pageX : i.pageX, 
                        o = "touchend" === i.type ? i.changedTouches[0].pageY : i.pageY) : (n = s.image.touchesStart.x, 
                        o = s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, 
                        s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), 
                        s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-swiper-zoom") || t.params.zoomMax, 
                        i ? (w = s.gesture.slide[0].offsetWidth, y = s.gesture.slide[0].offsetHeight, a = s.gesture.slide.offset().left + w / 2 - n, 
                        r = s.gesture.slide.offset().top + y / 2 - o, h = s.gesture.image[0].offsetWidth, 
                        d = s.gesture.image[0].offsetHeight, u = h * s.scale, p = d * s.scale, g = -(f = Math.min(w / 2 - u / 2, 0)), 
                        v = -(m = Math.min(y / 2 - p / 2, 0)), l = a * s.scale, c = r * s.scale, l < f && (l = f), 
                        l > g && (l = g), c < m && (c = m), c > v && (c = v)) : (l = 0, c = 0), s.gesture.imageWrap.transition(300).transform("translate3d(" + l + "px, " + c + "px,0)"), 
                        s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"));
                    }
                },
                attachEvents: function(t) {
                    var i = t ? "off" : "on";
                    if (x.params.zoom) {
                        x.slides;
                        var s = !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        x.support.gestures ? (x.slides[i]("gesturestart", x.zoom.onGestureStart, s), x.slides[i]("gesturechange", x.zoom.onGestureChange, s), 
                        x.slides[i]("gestureend", x.zoom.onGestureEnd, s)) : "touchstart" === x.touchEvents.start && (x.slides[i](x.touchEvents.start, x.zoom.onGestureStart, s), 
                        x.slides[i](x.touchEvents.move, x.zoom.onGestureChange, s), x.slides[i](x.touchEvents.end, x.zoom.onGestureEnd, s)), 
                        x[i]("touchStart", x.zoom.onTouchStart), x.slides.each(function(t, s) {
                            e(s).find("." + x.params.zoomContainerClass).length > 0 && e(s)[i](x.touchEvents.move, x.zoom.onTouchMove);
                        }), x[i]("touchEnd", x.zoom.onTouchEnd), x[i]("transitionEnd", x.zoom.onTransitionEnd), 
                        x.params.zoomToggle && x.on("doubleTap", x.zoom.toggleZoom);
                    }
                },
                init: function() {
                    x.zoom.attachEvents();
                },
                destroy: function() {
                    x.zoom.attachEvents(!0);
                }
            }, x._plugins = [];
            for (var R in x.plugins) {
                var j = x.plugins[R](x, x.params[R]);
                j && x._plugins.push(j);
            }
            return x.callPlugins = function(e) {
                for (var t = 0; t < x._plugins.length; t++) e in x._plugins[t] && x._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }, x.emitterEventListeners = {}, x.emit = function(e) {
                x.params[e] && x.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var t;
                if (x.emitterEventListeners[e]) for (t = 0; t < x.emitterEventListeners[e].length; t++) x.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                x.callPlugins && x.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }, x.on = function(e, t) {
                return e = f(e), x.emitterEventListeners[e] || (x.emitterEventListeners[e] = []), 
                x.emitterEventListeners[e].push(t), x;
            }, x.off = function(e, t) {
                var i;
                if (e = f(e), void 0 === t) return x.emitterEventListeners[e] = [], x;
                if (x.emitterEventListeners[e] && 0 !== x.emitterEventListeners[e].length) {
                    for (i = 0; i < x.emitterEventListeners[e].length; i++) x.emitterEventListeners[e][i] === t && x.emitterEventListeners[e].splice(i, 1);
                    return x;
                }
            }, x.once = function(e, t) {
                e = f(e);
                var i = function() {
                    t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), x.off(e, i);
                };
                return x.on(e, i), x;
            }, x.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e;
                },
                addRole: function(e, t) {
                    return e.attr("role", t), e;
                },
                addLabel: function(e, t) {
                    return e.attr("aria-label", t), e;
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e;
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e;
                },
                onEnterKey: function(t) {
                    13 === t.keyCode && (e(t.target).is(x.params.nextButton) ? (x.onClickNext(t), x.isEnd ? x.a11y.notify(x.params.lastSlideMessage) : x.a11y.notify(x.params.nextSlideMessage)) : e(t.target).is(x.params.prevButton) && (x.onClickPrev(t), 
                    x.isBeginning ? x.a11y.notify(x.params.firstSlideMessage) : x.a11y.notify(x.params.prevSlideMessage)), 
                    e(t.target).is("." + x.params.bulletClass) && e(t.target)[0].click());
                },
                liveRegion: e('<span class="' + x.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var t = x.a11y.liveRegion;
                    0 !== t.length && (t.html(""), t.html(e));
                },
                init: function() {
                    x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.a11y.makeFocusable(x.nextButton), 
                    x.a11y.addRole(x.nextButton, "button"), x.a11y.addLabel(x.nextButton, x.params.nextSlideMessage)), 
                    x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.a11y.makeFocusable(x.prevButton), 
                    x.a11y.addRole(x.prevButton, "button"), x.a11y.addLabel(x.prevButton, x.params.prevSlideMessage)), 
                    e(x.container).append(x.a11y.liveRegion);
                },
                initPagination: function() {
                    x.params.pagination && x.params.paginationClickable && x.bullets && x.bullets.length && x.bullets.each(function() {
                        var t = e(this);
                        x.a11y.makeFocusable(t), x.a11y.addRole(t, "button"), x.a11y.addLabel(t, x.params.paginationBulletMessage.replace(/{{index}}/, t.index() + 1));
                    });
                },
                destroy: function() {
                    x.a11y.liveRegion && x.a11y.liveRegion.length > 0 && x.a11y.liveRegion.remove();
                }
            }, x.init = function() {
                x.params.loop && x.createLoop(), x.updateContainerSize(), x.updateSlidesSize(), 
                x.updatePagination(), x.params.scrollbar && x.scrollbar && (x.scrollbar.set(), x.params.scrollbarDraggable && x.scrollbar.enableDraggable()), 
                "slide" !== x.params.effect && x.effects[x.params.effect] && (x.params.loop || x.updateProgress(), 
                x.effects[x.params.effect].setTranslate()), x.params.loop ? x.slideTo(x.params.initialSlide + x.loopedSlides, 0, x.params.runCallbacksOnInit) : (x.slideTo(x.params.initialSlide, 0, x.params.runCallbacksOnInit), 
                0 === x.params.initialSlide && (x.parallax && x.params.parallax && x.parallax.setTranslate(), 
                x.lazy && x.params.lazyLoading && (x.lazy.load(), x.lazy.initialImageLoaded = !0))), 
                x.attachEvents(), x.params.observer && x.support.observer && x.initObservers(), 
                x.params.preloadImages && !x.params.lazyLoading && x.preloadImages(), x.params.zoom && x.zoom && x.zoom.init(), 
                x.params.autoplay && x.startAutoplay(), x.params.keyboardControl && x.enableKeyboardControl && x.enableKeyboardControl(), 
                x.params.mousewheelControl && x.enableMousewheelControl && x.enableMousewheelControl(), 
                x.params.hashnavReplaceState && (x.params.replaceState = x.params.hashnavReplaceState), 
                x.params.history && x.history && x.history.init(), x.params.hashnav && x.hashnav && x.hashnav.init(), 
                x.params.a11y && x.a11y && x.a11y.init(), x.emit("onInit", x);
            }, x.cleanupStyles = function() {
                x.container.removeClass(x.classNames.join(" ")).removeAttr("style"), x.wrapper.removeAttr("style"), 
                x.slides && x.slides.length && x.slides.removeClass([ x.params.slideVisibleClass, x.params.slideActiveClass, x.params.slideNextClass, x.params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), 
                x.paginationContainer && x.paginationContainer.length && x.paginationContainer.removeClass(x.params.paginationHiddenClass), 
                x.bullets && x.bullets.length && x.bullets.removeClass(x.params.bulletActiveClass), 
                x.params.prevButton && e(x.params.prevButton).removeClass(x.params.buttonDisabledClass), 
                x.params.nextButton && e(x.params.nextButton).removeClass(x.params.buttonDisabledClass), 
                x.params.scrollbar && x.scrollbar && (x.scrollbar.track && x.scrollbar.track.length && x.scrollbar.track.removeAttr("style"), 
                x.scrollbar.drag && x.scrollbar.drag.length && x.scrollbar.drag.removeAttr("style"));
            }, x.destroy = function(e, t) {
                x.detachEvents(), x.stopAutoplay(), x.params.scrollbar && x.scrollbar && x.params.scrollbarDraggable && x.scrollbar.disableDraggable(), 
                x.params.loop && x.destroyLoop(), t && x.cleanupStyles(), x.disconnectObservers(), 
                x.params.zoom && x.zoom && x.zoom.destroy(), x.params.keyboardControl && x.disableKeyboardControl && x.disableKeyboardControl(), 
                x.params.mousewheelControl && x.disableMousewheelControl && x.disableMousewheelControl(), 
                x.params.a11y && x.a11y && x.a11y.destroy(), x.params.history && !x.params.replaceState && window.removeEventListener("popstate", x.history.setHistoryPopState), 
                x.params.hashnav && x.hashnav && x.hashnav.destroy(), x.emit("onDestroy"), !1 !== e && (x = null);
            }, x.init(), x;
        }
    };
    t.prototype = {
        isSafari: function() {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0;
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e);
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function() {
                var e = document.createElement("div");
                return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length;
            }()
        },
        device: function() {
            var e = navigator.userAgent, t = e.match(/(Android);?[\s\/]+([\d.]+)?/), i = e.match(/(iPad).*OS\s([\d_]+)/), s = e.match(/(iPod)(.*OS\s([\d_]+))?/), n = !i && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: i || n || s,
                android: t
            };
        }(),
        support: {
            touch: window.Modernizr && !0 === Modernizr.touch || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
            }(),
            transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i++) if (t[i] in e) return !0;
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window;
            }(),
            passiveListener: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0;
                        }
                    });
                    window.addEventListener("testPassiveListener", null, t);
                } catch (e) {}
                return e;
            }(),
            gestures: function() {
                return "ongesturestart" in window;
            }()
        },
        plugins: {}
    };
    for (var i = (function() {
        var e = function(e) {
            var t = this, i = 0;
            for (i = 0; i < e.length; i++) t[i] = e[i];
            return t.length = e.length, this;
        }, t = function(t, i) {
            var s = [], n = 0;
            if (t && !i && t instanceof e) return t;
            if (t) if ("string" == typeof t) {
                var o, a, r = t.trim();
                if (r.indexOf("<") >= 0 && r.indexOf(">") >= 0) {
                    var l = "div";
                    for (0 === r.indexOf("<li") && (l = "ul"), 0 === r.indexOf("<tr") && (l = "tbody"), 
                    0 !== r.indexOf("<td") && 0 !== r.indexOf("<th") || (l = "tr"), 0 === r.indexOf("<tbody") && (l = "table"), 
                    0 === r.indexOf("<option") && (l = "select"), (a = document.createElement(l)).innerHTML = t, 
                    n = 0; n < a.childNodes.length; n++) s.push(a.childNodes[n]);
                } else for (o = i || "#" !== t[0] || t.match(/[ .<>:~]/) ? (i || document).querySelectorAll(t) : [ document.getElementById(t.split("#")[1]) ], 
                n = 0; n < o.length; n++) o[n] && s.push(o[n]);
            } else if (t.nodeType || t === window || t === document) s.push(t); else if (t.length > 0 && t[0].nodeType) for (n = 0; n < t.length; n++) s.push(t[n]);
            return new e(s);
        };
        return e.prototype = {
            addClass: function(e) {
                if (void 0 === e) return this;
                for (var t = e.split(" "), i = 0; i < t.length; i++) for (var s = 0; s < this.length; s++) this[s].classList.add(t[i]);
                return this;
            },
            removeClass: function(e) {
                for (var t = e.split(" "), i = 0; i < t.length; i++) for (var s = 0; s < this.length; s++) this[s].classList.remove(t[i]);
                return this;
            },
            hasClass: function(e) {
                return !!this[0] && this[0].classList.contains(e);
            },
            toggleClass: function(e) {
                for (var t = e.split(" "), i = 0; i < t.length; i++) for (var s = 0; s < this.length; s++) this[s].classList.toggle(t[i]);
                return this;
            },
            attr: function(e, t) {
                if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                for (var i = 0; i < this.length; i++) if (2 === arguments.length) this[i].setAttribute(e, t); else for (var s in e) this[i][s] = e[s], 
                this[i].setAttribute(s, e[s]);
                return this;
            },
            removeAttr: function(e) {
                for (var t = 0; t < this.length; t++) this[t].removeAttribute(e);
                return this;
            },
            data: function(e, t) {
                if (void 0 !== t) {
                    for (var i = 0; i < this.length; i++) {
                        var s = this[i];
                        s.dom7ElementDataStorage || (s.dom7ElementDataStorage = {}), s.dom7ElementDataStorage[e] = t;
                    }
                    return this;
                }
                if (this[0]) {
                    var n = this[0].getAttribute("data-" + e);
                    return n || (this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0);
                }
            },
            transform: function(e) {
                for (var t = 0; t < this.length; t++) {
                    var i = this[t].style;
                    i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e;
                }
                return this;
            },
            transition: function(e) {
                "string" != typeof e && (e += "ms");
                for (var t = 0; t < this.length; t++) {
                    var i = this[t].style;
                    i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e;
                }
                return this;
            },
            on: function(e, i, s, n) {
                function o(e) {
                    var n = e.target;
                    if (t(n).is(i)) s.call(n, e); else for (var o = t(n).parents(), a = 0; a < o.length; a++) t(o[a]).is(i) && s.call(o[a], e);
                }
                var a, r, l = e.split(" ");
                for (a = 0; a < this.length; a++) if ("function" == typeof i || !1 === i) for ("function" == typeof i && (s = arguments[1], 
                n = arguments[2] || !1), r = 0; r < l.length; r++) this[a].addEventListener(l[r], s, n); else for (r = 0; r < l.length; r++) this[a].dom7LiveListeners || (this[a].dom7LiveListeners = []), 
                this[a].dom7LiveListeners.push({
                    listener: s,
                    liveListener: o
                }), this[a].addEventListener(l[r], o, n);
                return this;
            },
            off: function(e, t, i, s) {
                for (var n = e.split(" "), o = 0; o < n.length; o++) for (var a = 0; a < this.length; a++) if ("function" == typeof t || !1 === t) "function" == typeof t && (i = arguments[1], 
                s = arguments[2] || !1), this[a].removeEventListener(n[o], i, s); else if (this[a].dom7LiveListeners) for (var r = 0; r < this[a].dom7LiveListeners.length; r++) this[a].dom7LiveListeners[r].listener === i && this[a].removeEventListener(n[o], this[a].dom7LiveListeners[r].liveListener, s);
                return this;
            },
            once: function(e, t, i, s) {
                function n(a) {
                    i(a), o.off(e, t, n, s);
                }
                var o = this;
                "function" == typeof t && (t = !1, i = arguments[1], s = arguments[2]), o.on(e, t, n, s);
            },
            trigger: function(e, t) {
                for (var i = 0; i < this.length; i++) {
                    var s;
                    try {
                        s = new window.CustomEvent(e, {
                            detail: t,
                            bubbles: !0,
                            cancelable: !0
                        });
                    } catch (i) {
                        (s = document.createEvent("Event")).initEvent(e, !0, !0), s.detail = t;
                    }
                    this[i].dispatchEvent(s);
                }
                return this;
            },
            transitionEnd: function(e) {
                function t(o) {
                    if (o.target === this) for (e.call(this, o), i = 0; i < s.length; i++) n.off(s[i], t);
                }
                var i, s = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], n = this;
                if (e) for (i = 0; i < s.length; i++) n.on(s[i], t);
                return this;
            },
            width: function() {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null;
            },
            outerWidth: function(e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
            },
            height: function() {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null;
            },
            outerHeight: function(e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null;
            },
            offset: function() {
                if (this.length > 0) {
                    var e = this[0], t = e.getBoundingClientRect(), i = document.body, s = e.clientTop || i.clientTop || 0, n = e.clientLeft || i.clientLeft || 0, o = window.pageYOffset || e.scrollTop, a = window.pageXOffset || e.scrollLeft;
                    return {
                        top: t.top + o - s,
                        left: t.left + a - n
                    };
                }
                return null;
            },
            css: function(e, t) {
                var i;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (i = 0; i < this.length; i++) for (var s in e) this[i].style[s] = e[s];
                        return this;
                    }
                    if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e);
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (i = 0; i < this.length; i++) this[i].style[e] = t;
                    return this;
                }
                return this;
            },
            each: function(e) {
                for (var t = 0; t < this.length; t++) e.call(this[t], t, this[t]);
                return this;
            },
            html: function(e) {
                if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
                for (var t = 0; t < this.length; t++) this[t].innerHTML = e;
                return this;
            },
            text: function(e) {
                if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                for (var t = 0; t < this.length; t++) this[t].textContent = e;
                return this;
            },
            is: function(i) {
                if (!this[0]) return !1;
                var s, n;
                if ("string" == typeof i) {
                    var o = this[0];
                    if (o === document) return i === document;
                    if (o === window) return i === window;
                    if (o.matches) return o.matches(i);
                    if (o.webkitMatchesSelector) return o.webkitMatchesSelector(i);
                    if (o.mozMatchesSelector) return o.mozMatchesSelector(i);
                    if (o.msMatchesSelector) return o.msMatchesSelector(i);
                    for (s = t(i), n = 0; n < s.length; n++) if (s[n] === this[0]) return !0;
                    return !1;
                }
                if (i === document) return this[0] === document;
                if (i === window) return this[0] === window;
                if (i.nodeType || i instanceof e) {
                    for (s = i.nodeType ? [ i ] : i, n = 0; n < s.length; n++) if (s[n] === this[0]) return !0;
                    return !1;
                }
                return !1;
            },
            index: function() {
                if (this[0]) {
                    for (var e = this[0], t = 0; null !== (e = e.previousSibling); ) 1 === e.nodeType && t++;
                    return t;
                }
            },
            eq: function(t) {
                if (void 0 === t) return this;
                var i, s = this.length;
                return t > s - 1 ? new e([]) : t < 0 ? (i = s + t, new e(i < 0 ? [] : [ this[i] ])) : new e([ this[t] ]);
            },
            append: function(t) {
                var i, s;
                for (i = 0; i < this.length; i++) if ("string" == typeof t) {
                    var n = document.createElement("div");
                    for (n.innerHTML = t; n.firstChild; ) this[i].appendChild(n.firstChild);
                } else if (t instanceof e) for (s = 0; s < t.length; s++) this[i].appendChild(t[s]); else this[i].appendChild(t);
                return this;
            },
            prepend: function(t) {
                var i, s;
                for (i = 0; i < this.length; i++) if ("string" == typeof t) {
                    var n = document.createElement("div");
                    for (n.innerHTML = t, s = n.childNodes.length - 1; s >= 0; s--) this[i].insertBefore(n.childNodes[s], this[i].childNodes[0]);
                } else if (t instanceof e) for (s = 0; s < t.length; s++) this[i].insertBefore(t[s], this[i].childNodes[0]); else this[i].insertBefore(t, this[i].childNodes[0]);
                return this;
            },
            insertBefore: function(e) {
                for (var i = t(e), s = 0; s < this.length; s++) if (1 === i.length) i[0].parentNode.insertBefore(this[s], i[0]); else if (i.length > 1) for (var n = 0; n < i.length; n++) i[n].parentNode.insertBefore(this[s].cloneNode(!0), i[n]);
            },
            insertAfter: function(e) {
                for (var i = t(e), s = 0; s < this.length; s++) if (1 === i.length) i[0].parentNode.insertBefore(this[s], i[0].nextSibling); else if (i.length > 1) for (var n = 0; n < i.length; n++) i[n].parentNode.insertBefore(this[s].cloneNode(!0), i[n].nextSibling);
            },
            next: function(i) {
                return new e(this.length > 0 ? i ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(i) ? [ this[0].nextElementSibling ] : [] : this[0].nextElementSibling ? [ this[0].nextElementSibling ] : [] : []);
            },
            nextAll: function(i) {
                var s = [], n = this[0];
                if (!n) return new e([]);
                for (;n.nextElementSibling; ) {
                    var o = n.nextElementSibling;
                    i ? t(o).is(i) && s.push(o) : s.push(o), n = o;
                }
                return new e(s);
            },
            prev: function(i) {
                return new e(this.length > 0 ? i ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(i) ? [ this[0].previousElementSibling ] : [] : this[0].previousElementSibling ? [ this[0].previousElementSibling ] : [] : []);
            },
            prevAll: function(i) {
                var s = [], n = this[0];
                if (!n) return new e([]);
                for (;n.previousElementSibling; ) {
                    var o = n.previousElementSibling;
                    i ? t(o).is(i) && s.push(o) : s.push(o), n = o;
                }
                return new e(s);
            },
            parent: function(e) {
                for (var i = [], s = 0; s < this.length; s++) e ? t(this[s].parentNode).is(e) && i.push(this[s].parentNode) : i.push(this[s].parentNode);
                return t(t.unique(i));
            },
            parents: function(e) {
                for (var i = [], s = 0; s < this.length; s++) for (var n = this[s].parentNode; n; ) e ? t(n).is(e) && i.push(n) : i.push(n), 
                n = n.parentNode;
                return t(t.unique(i));
            },
            find: function(t) {
                for (var i = [], s = 0; s < this.length; s++) for (var n = this[s].querySelectorAll(t), o = 0; o < n.length; o++) i.push(n[o]);
                return new e(i);
            },
            children: function(i) {
                for (var s = [], n = 0; n < this.length; n++) for (var o = this[n].childNodes, a = 0; a < o.length; a++) i ? 1 === o[a].nodeType && t(o[a]).is(i) && s.push(o[a]) : 1 === o[a].nodeType && s.push(o[a]);
                return new e(t.unique(s));
            },
            remove: function() {
                for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this;
            },
            add: function() {
                var e, i, s = this;
                for (e = 0; e < arguments.length; e++) {
                    var n = t(arguments[e]);
                    for (i = 0; i < n.length; i++) s[s.length] = n[i], s.length++;
                }
                return s;
            }
        }, t.fn = e.prototype, t.unique = function(e) {
            for (var t = [], i = 0; i < e.length; i++) -1 === t.indexOf(e[i]) && t.push(e[i]);
            return t;
        }, t;
    }()), s = [ "jQuery", "Zepto", "Dom7" ], n = 0; n < s.length; n++) window[s[n]] && function(e) {
        e.fn.swiper = function(i) {
            var s;
            return e(this).each(function() {
                var e = new t(this, i);
                s || (s = e);
            }), s;
        };
    }(window[s[n]]);
    var o;
    (o = void 0 === i ? window.Dom7 || window.Zepto || window.jQuery : i) && ("transitionEnd" in o.fn || (o.fn.transitionEnd = function(e) {
        function t(o) {
            if (o.target === this) for (e.call(this, o), i = 0; i < s.length; i++) n.off(s[i], t);
        }
        var i, s = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], n = this;
        if (e) for (i = 0; i < s.length; i++) n.on(s[i], t);
        return this;
    }), "transform" in o.fn || (o.fn.transform = function(e) {
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e;
        }
        return this;
    }), "transition" in o.fn || (o.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e;
        }
        return this;
    }), "outerWidth" in o.fn || (o.fn.outerWidth = function(e) {
        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
    })), window.Swiper = t;
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper;
}), function(e) {
    void 0 === e.fn.each2 && e.extend(e.fn, {
        each2: function(t) {
            for (var i = e([ 0 ]), s = -1, n = this.length; ++s < n && (i.context = i[0] = this[s]) && !1 !== t.call(i[0], s, i); ) ;
            return this;
        }
    });
}(jQuery), function(e, t) {
    "use strict";
    function i(t) {
        var i = e(document.createTextNode(""));
        t.before(i), i.before(t), i.remove();
    }
    function s(e) {
        function t(e) {
            return j[e] || e;
        }
        return e.replace(/[^\u0000-\u007E]/g, t);
    }
    function n(e, t) {
        for (var i = 0, s = t.length; s > i; i += 1) if (a(e, t[i])) return i;
        return -1;
    }
    function o() {
        var t = e(R);
        t.appendTo("body");
        var i = {
            width: t.width() - t[0].clientWidth,
            height: t.height() - t[0].clientHeight
        };
        return t.remove(), i;
    }
    function a(e, i) {
        return e === i || e !== t && i !== t && (null !== e && null !== i && (e.constructor === String ? e + "" == i + "" : i.constructor === String && i + "" == e + ""));
    }
    function r(t, i) {
        var s, n, o;
        if (null === t || t.length < 1) return [];
        for (n = 0, o = (s = t.split(i)).length; o > n; n += 1) s[n] = e.trim(s[n]);
        return s;
    }
    function l(e) {
        return e.outerWidth(!1) - e.width();
    }
    function c(i) {
        var s = "keyup-change-value";
        i.on("keydown", function() {
            e.data(i, s) === t && e.data(i, s, i.val());
        }), i.on("keyup", function() {
            var n = e.data(i, s);
            n !== t && i.val() !== n && (e.removeData(i, s), i.trigger("keyup-change"));
        });
    }
    function h(i) {
        i.on("mousemove", function(i) {
            var s = A;
            (s === t || s.x !== i.pageX || s.y !== i.pageY) && e(i.target).trigger("mousemove-filtered", i);
        });
    }
    function d(e, i, s) {
        s = s || t;
        var n;
        return function() {
            var t = arguments;
            window.clearTimeout(n), n = window.setTimeout(function() {
                i.apply(s, t);
            }, e);
        };
    }
    function u(e, t) {
        var i = d(e, function(e) {
            t.trigger("scroll-debounced", e);
        });
        t.on("scroll", function(e) {
            n(e.target, t.get()) >= 0 && i(e);
        });
    }
    function p(e) {
        e[0] !== document.activeElement && window.setTimeout(function() {
            var t, i = e[0], s = e.val().length;
            e.focus(), (i.offsetWidth > 0 || i.offsetHeight > 0) && i === document.activeElement && (i.setSelectionRange ? i.setSelectionRange(s, s) : i.createTextRange && ((t = i.createTextRange()).collapse(!1), 
            t.select()));
        }, 0);
    }
    function f(t) {
        var i = 0, s = 0;
        if ("selectionStart" in (t = e(t)[0])) i = t.selectionStart, s = t.selectionEnd - i; else if ("selection" in document) {
            t.focus();
            var n = document.selection.createRange();
            s = document.selection.createRange().text.length, n.moveStart("character", -t.value.length), 
            i = n.text.length - s;
        }
        return {
            offset: i,
            length: s
        };
    }
    function m(e) {
        e.preventDefault(), e.stopPropagation();
    }
    function g(e) {
        e.preventDefault(), e.stopImmediatePropagation();
    }
    function v(t) {
        if (!O) {
            var i = t[0].currentStyle || window.getComputedStyle(t[0], null);
            (O = e(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: i.fontSize,
                fontFamily: i.fontFamily,
                fontStyle: i.fontStyle,
                fontWeight: i.fontWeight,
                letterSpacing: i.letterSpacing,
                textTransform: i.textTransform,
                whiteSpace: "nowrap"
            })).attr("class", "select2-sizer"), e("body").append(O);
        }
        return O.text(t.val()), O.width();
    }
    function w(t, i, s) {
        var n, o, a = [];
        (n = e.trim(t.attr("class"))) && (n = "" + n, e(n.split(/\s+/)).each2(function() {
            0 === this.indexOf("select2-") && a.push(this);
        })), (n = e.trim(i.attr("class"))) && (n = "" + n, e(n.split(/\s+/)).each2(function() {
            0 !== this.indexOf("select2-") && (o = s(this)) && a.push(o);
        })), t.attr("class", a.join(" "));
    }
    function y(e, t, i, n) {
        var o = s(e.toUpperCase()).indexOf(s(t.toUpperCase())), a = t.length;
        return 0 > o ? void i.push(n(e)) : (i.push(n(e.substring(0, o))), i.push("<span class='select2-match'>"), 
        i.push(n(e.substring(o, o + a))), i.push("</span>"), void i.push(n(e.substring(o + a, e.length))));
    }
    function b(e) {
        var t = {
            "\\": "&#92;",
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#47;"
        };
        return String(e).replace(/[&<>"'\/\\]/g, function(e) {
            return t[e];
        });
    }
    function _(i) {
        var s, n = null, o = i.quietMillis || 100, a = i.url, r = this;
        return function(l) {
            window.clearTimeout(s), s = window.setTimeout(function() {
                var s = i.data, o = a, c = i.transport || e.fn.select2.ajaxDefaults.transport, h = {
                    type: i.type || "GET",
                    cache: i.cache || !1,
                    jsonpCallback: i.jsonpCallback || t,
                    dataType: i.dataType || "json"
                }, d = e.extend({}, e.fn.select2.ajaxDefaults.params, h);
                s = s ? s.call(r, l.term, l.page, l.context) : null, o = "function" == typeof o ? o.call(r, l.term, l.page, l.context) : o, 
                n && "function" == typeof n.abort && n.abort(), i.params && (e.isFunction(i.params) ? e.extend(d, i.params.call(r)) : e.extend(d, i.params)), 
                e.extend(d, {
                    url: o,
                    dataType: i.dataType,
                    data: s,
                    success: function(e) {
                        var t = i.results(e, l.page, l);
                        l.callback(t);
                    },
                    error: function(e, t, i) {
                        var s = {
                            hasError: !0,
                            jqXHR: e,
                            textStatus: t,
                            errorThrown: i
                        };
                        l.callback(s);
                    }
                }), n = c.call(r, d);
            }, o);
        };
    }
    function x(t) {
        var i, s, n = t, o = function(e) {
            return "" + e.text;
        };
        e.isArray(n) && (s = n, n = {
            results: s
        }), !1 === e.isFunction(n) && (s = n, n = function() {
            return s;
        });
        var a = n();
        return a.text && (o = a.text, e.isFunction(o) || (i = a.text, o = function(e) {
            return e[i];
        })), function(t) {
            var i, s = t.term, a = {
                results: []
            };
            return "" === s ? void t.callback(n()) : (i = function(n, a) {
                var r, l;
                if ((n = n[0]).children) {
                    r = {};
                    for (l in n) n.hasOwnProperty(l) && (r[l] = n[l]);
                    r.children = [], e(n.children).each2(function(e, t) {
                        i(t, r.children);
                    }), (r.children.length || t.matcher(s, o(r), n)) && a.push(r);
                } else t.matcher(s, o(n), n) && a.push(n);
            }, e(n().results).each2(function(e, t) {
                i(t, a.results);
            }), void t.callback(a));
        };
    }
    function S(i) {
        var s = e.isFunction(i);
        return function(n) {
            var o = n.term, a = {
                results: []
            }, r = s ? i(n) : i;
            e.isArray(r) && (e(r).each(function() {
                var e = this.text !== t, i = e ? this.text : this;
                ("" === o || n.matcher(o, i)) && a.results.push(e ? this : {
                    id: this,
                    text: this
                });
            }), n.callback(a));
        };
    }
    function C(t, i) {
        if (e.isFunction(t)) return !0;
        if (!t) return !1;
        if ("string" == typeof t) return !0;
        throw new Error(i + " must be a string, function, or falsy value");
    }
    function T(t, i) {
        if (e.isFunction(t)) {
            var s = Array.prototype.slice.call(arguments, 2);
            return t.apply(i, s);
        }
        return t;
    }
    function k(t) {
        var i = 0;
        return e.each(t, function(e, t) {
            t.children ? i += k(t.children) : i++;
        }), i;
    }
    function E(e, i, s, n) {
        var o, r, l, c, h, d = e, u = !1;
        if (!n.createSearchChoice || !n.tokenSeparators || n.tokenSeparators.length < 1) return t;
        for (;;) {
            for (r = -1, l = 0, c = n.tokenSeparators.length; c > l && (h = n.tokenSeparators[l], 
            !((r = e.indexOf(h)) >= 0)); l++) ;
            if (0 > r) break;
            if (o = e.substring(0, r), e = e.substring(r + h.length), o.length > 0 && (o = n.createSearchChoice.call(this, o, i)) !== t && null !== o && n.id(o) !== t && null !== n.id(o)) {
                for (u = !1, l = 0, c = i.length; c > l; l++) if (a(n.id(o), n.id(i[l]))) {
                    u = !0;
                    break;
                }
                u || s(o);
            }
        }
        return d !== e ? e : void 0;
    }
    function P() {
        var t = this;
        e.each(arguments, function(e, i) {
            t[i].remove(), t[i] = null;
        });
    }
    function z(t, i) {
        var s = function() {};
        return s.prototype = new t(), s.prototype.constructor = s, s.prototype.parent = t.prototype, 
        s.prototype = e.extend(s.prototype, i), s;
    }
    if (window.Select2 === t) {
        var I, M, L, $, O, H, W, A = {
            x: 0,
            y: 0
        }, D = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function(e) {
                switch (e = e.which ? e.which : e) {
                  case D.LEFT:
                  case D.RIGHT:
                  case D.UP:
                  case D.DOWN:
                    return !0;
                }
                return !1;
            },
            isControl: function(e) {
                switch (e.which) {
                  case D.SHIFT:
                  case D.CTRL:
                  case D.ALT:
                    return !0;
                }
                return !!e.metaKey;
            },
            isFunctionKey: function(e) {
                return (e = e.which ? e.which : e) >= 112 && 123 >= e;
            }
        }, R = "<div class='select2-measure-scrollbar'></div>", j = {
            "Ⓐ": "A",
            "Ａ": "A",
            "À": "A",
            "Á": "A",
            "Â": "A",
            "Ầ": "A",
            "Ấ": "A",
            "Ẫ": "A",
            "Ẩ": "A",
            "Ã": "A",
            "Ā": "A",
            "Ă": "A",
            "Ằ": "A",
            "Ắ": "A",
            "Ẵ": "A",
            "Ẳ": "A",
            "Ȧ": "A",
            "Ǡ": "A",
            "Ä": "A",
            "Ǟ": "A",
            "Ả": "A",
            "Å": "A",
            "Ǻ": "A",
            "Ǎ": "A",
            "Ȁ": "A",
            "Ȃ": "A",
            "Ạ": "A",
            "Ậ": "A",
            "Ặ": "A",
            "Ḁ": "A",
            "Ą": "A",
            "Ⱥ": "A",
            "Ɐ": "A",
            "Ꜳ": "AA",
            "Æ": "AE",
            "Ǽ": "AE",
            "Ǣ": "AE",
            "Ꜵ": "AO",
            "Ꜷ": "AU",
            "Ꜹ": "AV",
            "Ꜻ": "AV",
            "Ꜽ": "AY",
            "Ⓑ": "B",
            "Ｂ": "B",
            "Ḃ": "B",
            "Ḅ": "B",
            "Ḇ": "B",
            "Ƀ": "B",
            "Ƃ": "B",
            "Ɓ": "B",
            "Ⓒ": "C",
            "Ｃ": "C",
            "Ć": "C",
            "Ĉ": "C",
            "Ċ": "C",
            "Č": "C",
            "Ç": "C",
            "Ḉ": "C",
            "Ƈ": "C",
            "Ȼ": "C",
            "Ꜿ": "C",
            "Ⓓ": "D",
            "Ｄ": "D",
            "Ḋ": "D",
            "Ď": "D",
            "Ḍ": "D",
            "Ḑ": "D",
            "Ḓ": "D",
            "Ḏ": "D",
            "Đ": "D",
            "Ƌ": "D",
            "Ɗ": "D",
            "Ɖ": "D",
            "Ꝺ": "D",
            "Ǳ": "DZ",
            "Ǆ": "DZ",
            "ǲ": "Dz",
            "ǅ": "Dz",
            "Ⓔ": "E",
            "Ｅ": "E",
            "È": "E",
            "É": "E",
            "Ê": "E",
            "Ề": "E",
            "Ế": "E",
            "Ễ": "E",
            "Ể": "E",
            "Ẽ": "E",
            "Ē": "E",
            "Ḕ": "E",
            "Ḗ": "E",
            "Ĕ": "E",
            "Ė": "E",
            "Ë": "E",
            "Ẻ": "E",
            "Ě": "E",
            "Ȅ": "E",
            "Ȇ": "E",
            "Ẹ": "E",
            "Ệ": "E",
            "Ȩ": "E",
            "Ḝ": "E",
            "Ę": "E",
            "Ḙ": "E",
            "Ḛ": "E",
            "Ɛ": "E",
            "Ǝ": "E",
            "Ⓕ": "F",
            "Ｆ": "F",
            "Ḟ": "F",
            "Ƒ": "F",
            "Ꝼ": "F",
            "Ⓖ": "G",
            "Ｇ": "G",
            "Ǵ": "G",
            "Ĝ": "G",
            "Ḡ": "G",
            "Ğ": "G",
            "Ġ": "G",
            "Ǧ": "G",
            "Ģ": "G",
            "Ǥ": "G",
            "Ɠ": "G",
            "Ꞡ": "G",
            "Ᵹ": "G",
            "Ꝿ": "G",
            "Ⓗ": "H",
            "Ｈ": "H",
            "Ĥ": "H",
            "Ḣ": "H",
            "Ḧ": "H",
            "Ȟ": "H",
            "Ḥ": "H",
            "Ḩ": "H",
            "Ḫ": "H",
            "Ħ": "H",
            "Ⱨ": "H",
            "Ⱶ": "H",
            "Ɥ": "H",
            "Ⓘ": "I",
            "Ｉ": "I",
            "Ì": "I",
            "Í": "I",
            "Î": "I",
            "Ĩ": "I",
            "Ī": "I",
            "Ĭ": "I",
            "İ": "I",
            "Ï": "I",
            "Ḯ": "I",
            "Ỉ": "I",
            "Ǐ": "I",
            "Ȉ": "I",
            "Ȋ": "I",
            "Ị": "I",
            "Į": "I",
            "Ḭ": "I",
            "Ɨ": "I",
            "Ⓙ": "J",
            "Ｊ": "J",
            "Ĵ": "J",
            "Ɉ": "J",
            "Ⓚ": "K",
            "Ｋ": "K",
            "Ḱ": "K",
            "Ǩ": "K",
            "Ḳ": "K",
            "Ķ": "K",
            "Ḵ": "K",
            "Ƙ": "K",
            "Ⱪ": "K",
            "Ꝁ": "K",
            "Ꝃ": "K",
            "Ꝅ": "K",
            "Ꞣ": "K",
            "Ⓛ": "L",
            "Ｌ": "L",
            "Ŀ": "L",
            "Ĺ": "L",
            "Ľ": "L",
            "Ḷ": "L",
            "Ḹ": "L",
            "Ļ": "L",
            "Ḽ": "L",
            "Ḻ": "L",
            "Ł": "L",
            "Ƚ": "L",
            "Ɫ": "L",
            "Ⱡ": "L",
            "Ꝉ": "L",
            "Ꝇ": "L",
            "Ꞁ": "L",
            "Ǉ": "LJ",
            "ǈ": "Lj",
            "Ⓜ": "M",
            "Ｍ": "M",
            "Ḿ": "M",
            "Ṁ": "M",
            "Ṃ": "M",
            "Ɱ": "M",
            "Ɯ": "M",
            "Ⓝ": "N",
            "Ｎ": "N",
            "Ǹ": "N",
            "Ń": "N",
            "Ñ": "N",
            "Ṅ": "N",
            "Ň": "N",
            "Ṇ": "N",
            "Ņ": "N",
            "Ṋ": "N",
            "Ṉ": "N",
            "Ƞ": "N",
            "Ɲ": "N",
            "Ꞑ": "N",
            "Ꞥ": "N",
            "Ǌ": "NJ",
            "ǋ": "Nj",
            "Ⓞ": "O",
            "Ｏ": "O",
            "Ò": "O",
            "Ó": "O",
            "Ô": "O",
            "Ồ": "O",
            "Ố": "O",
            "Ỗ": "O",
            "Ổ": "O",
            "Õ": "O",
            "Ṍ": "O",
            "Ȭ": "O",
            "Ṏ": "O",
            "Ō": "O",
            "Ṑ": "O",
            "Ṓ": "O",
            "Ŏ": "O",
            "Ȯ": "O",
            "Ȱ": "O",
            "Ö": "O",
            "Ȫ": "O",
            "Ỏ": "O",
            "Ő": "O",
            "Ǒ": "O",
            "Ȍ": "O",
            "Ȏ": "O",
            "Ơ": "O",
            "Ờ": "O",
            "Ớ": "O",
            "Ỡ": "O",
            "Ở": "O",
            "Ợ": "O",
            "Ọ": "O",
            "Ộ": "O",
            "Ǫ": "O",
            "Ǭ": "O",
            "Ø": "O",
            "Ǿ": "O",
            "Ɔ": "O",
            "Ɵ": "O",
            "Ꝋ": "O",
            "Ꝍ": "O",
            "Ƣ": "OI",
            "Ꝏ": "OO",
            "Ȣ": "OU",
            "Ⓟ": "P",
            "Ｐ": "P",
            "Ṕ": "P",
            "Ṗ": "P",
            "Ƥ": "P",
            "Ᵽ": "P",
            "Ꝑ": "P",
            "Ꝓ": "P",
            "Ꝕ": "P",
            "Ⓠ": "Q",
            "Ｑ": "Q",
            "Ꝗ": "Q",
            "Ꝙ": "Q",
            "Ɋ": "Q",
            "Ⓡ": "R",
            "Ｒ": "R",
            "Ŕ": "R",
            "Ṙ": "R",
            "Ř": "R",
            "Ȑ": "R",
            "Ȓ": "R",
            "Ṛ": "R",
            "Ṝ": "R",
            "Ŗ": "R",
            "Ṟ": "R",
            "Ɍ": "R",
            "Ɽ": "R",
            "Ꝛ": "R",
            "Ꞧ": "R",
            "Ꞃ": "R",
            "Ⓢ": "S",
            "Ｓ": "S",
            "ẞ": "S",
            "Ś": "S",
            "Ṥ": "S",
            "Ŝ": "S",
            "Ṡ": "S",
            "Š": "S",
            "Ṧ": "S",
            "Ṣ": "S",
            "Ṩ": "S",
            "Ș": "S",
            "Ş": "S",
            "Ȿ": "S",
            "Ꞩ": "S",
            "Ꞅ": "S",
            "Ⓣ": "T",
            "Ｔ": "T",
            "Ṫ": "T",
            "Ť": "T",
            "Ṭ": "T",
            "Ț": "T",
            "Ţ": "T",
            "Ṱ": "T",
            "Ṯ": "T",
            "Ŧ": "T",
            "Ƭ": "T",
            "Ʈ": "T",
            "Ⱦ": "T",
            "Ꞇ": "T",
            "Ꜩ": "TZ",
            "Ⓤ": "U",
            "Ｕ": "U",
            "Ù": "U",
            "Ú": "U",
            "Û": "U",
            "Ũ": "U",
            "Ṹ": "U",
            "Ū": "U",
            "Ṻ": "U",
            "Ŭ": "U",
            "Ü": "U",
            "Ǜ": "U",
            "Ǘ": "U",
            "Ǖ": "U",
            "Ǚ": "U",
            "Ủ": "U",
            "Ů": "U",
            "Ű": "U",
            "Ǔ": "U",
            "Ȕ": "U",
            "Ȗ": "U",
            "Ư": "U",
            "Ừ": "U",
            "Ứ": "U",
            "Ữ": "U",
            "Ử": "U",
            "Ự": "U",
            "Ụ": "U",
            "Ṳ": "U",
            "Ų": "U",
            "Ṷ": "U",
            "Ṵ": "U",
            "Ʉ": "U",
            "Ⓥ": "V",
            "Ｖ": "V",
            "Ṽ": "V",
            "Ṿ": "V",
            "Ʋ": "V",
            "Ꝟ": "V",
            "Ʌ": "V",
            "Ꝡ": "VY",
            "Ⓦ": "W",
            "Ｗ": "W",
            "Ẁ": "W",
            "Ẃ": "W",
            "Ŵ": "W",
            "Ẇ": "W",
            "Ẅ": "W",
            "Ẉ": "W",
            "Ⱳ": "W",
            "Ⓧ": "X",
            "Ｘ": "X",
            "Ẋ": "X",
            "Ẍ": "X",
            "Ⓨ": "Y",
            "Ｙ": "Y",
            "Ỳ": "Y",
            "Ý": "Y",
            "Ŷ": "Y",
            "Ỹ": "Y",
            "Ȳ": "Y",
            "Ẏ": "Y",
            "Ÿ": "Y",
            "Ỷ": "Y",
            "Ỵ": "Y",
            "Ƴ": "Y",
            "Ɏ": "Y",
            "Ỿ": "Y",
            "Ⓩ": "Z",
            "Ｚ": "Z",
            "Ź": "Z",
            "Ẑ": "Z",
            "Ż": "Z",
            "Ž": "Z",
            "Ẓ": "Z",
            "Ẕ": "Z",
            "Ƶ": "Z",
            "Ȥ": "Z",
            "Ɀ": "Z",
            "Ⱬ": "Z",
            "Ꝣ": "Z",
            "ⓐ": "a",
            "ａ": "a",
            "ẚ": "a",
            "à": "a",
            "á": "a",
            "â": "a",
            "ầ": "a",
            "ấ": "a",
            "ẫ": "a",
            "ẩ": "a",
            "ã": "a",
            "ā": "a",
            "ă": "a",
            "ằ": "a",
            "ắ": "a",
            "ẵ": "a",
            "ẳ": "a",
            "ȧ": "a",
            "ǡ": "a",
            "ä": "a",
            "ǟ": "a",
            "ả": "a",
            "å": "a",
            "ǻ": "a",
            "ǎ": "a",
            "ȁ": "a",
            "ȃ": "a",
            "ạ": "a",
            "ậ": "a",
            "ặ": "a",
            "ḁ": "a",
            "ą": "a",
            "ⱥ": "a",
            "ɐ": "a",
            "ꜳ": "aa",
            "æ": "ae",
            "ǽ": "ae",
            "ǣ": "ae",
            "ꜵ": "ao",
            "ꜷ": "au",
            "ꜹ": "av",
            "ꜻ": "av",
            "ꜽ": "ay",
            "ⓑ": "b",
            "ｂ": "b",
            "ḃ": "b",
            "ḅ": "b",
            "ḇ": "b",
            "ƀ": "b",
            "ƃ": "b",
            "ɓ": "b",
            "ⓒ": "c",
            "ｃ": "c",
            "ć": "c",
            "ĉ": "c",
            "ċ": "c",
            "č": "c",
            "ç": "c",
            "ḉ": "c",
            "ƈ": "c",
            "ȼ": "c",
            "ꜿ": "c",
            "ↄ": "c",
            "ⓓ": "d",
            "ｄ": "d",
            "ḋ": "d",
            "ď": "d",
            "ḍ": "d",
            "ḑ": "d",
            "ḓ": "d",
            "ḏ": "d",
            "đ": "d",
            "ƌ": "d",
            "ɖ": "d",
            "ɗ": "d",
            "ꝺ": "d",
            "ǳ": "dz",
            "ǆ": "dz",
            "ⓔ": "e",
            "ｅ": "e",
            "è": "e",
            "é": "e",
            "ê": "e",
            "ề": "e",
            "ế": "e",
            "ễ": "e",
            "ể": "e",
            "ẽ": "e",
            "ē": "e",
            "ḕ": "e",
            "ḗ": "e",
            "ĕ": "e",
            "ė": "e",
            "ë": "e",
            "ẻ": "e",
            "ě": "e",
            "ȅ": "e",
            "ȇ": "e",
            "ẹ": "e",
            "ệ": "e",
            "ȩ": "e",
            "ḝ": "e",
            "ę": "e",
            "ḙ": "e",
            "ḛ": "e",
            "ɇ": "e",
            "ɛ": "e",
            "ǝ": "e",
            "ⓕ": "f",
            "ｆ": "f",
            "ḟ": "f",
            "ƒ": "f",
            "ꝼ": "f",
            "ⓖ": "g",
            "ｇ": "g",
            "ǵ": "g",
            "ĝ": "g",
            "ḡ": "g",
            "ğ": "g",
            "ġ": "g",
            "ǧ": "g",
            "ģ": "g",
            "ǥ": "g",
            "ɠ": "g",
            "ꞡ": "g",
            "ᵹ": "g",
            "ꝿ": "g",
            "ⓗ": "h",
            "ｈ": "h",
            "ĥ": "h",
            "ḣ": "h",
            "ḧ": "h",
            "ȟ": "h",
            "ḥ": "h",
            "ḩ": "h",
            "ḫ": "h",
            "ẖ": "h",
            "ħ": "h",
            "ⱨ": "h",
            "ⱶ": "h",
            "ɥ": "h",
            "ƕ": "hv",
            "ⓘ": "i",
            "ｉ": "i",
            "ì": "i",
            "í": "i",
            "î": "i",
            "ĩ": "i",
            "ī": "i",
            "ĭ": "i",
            "ï": "i",
            "ḯ": "i",
            "ỉ": "i",
            "ǐ": "i",
            "ȉ": "i",
            "ȋ": "i",
            "ị": "i",
            "į": "i",
            "ḭ": "i",
            "ɨ": "i",
            "ı": "i",
            "ⓙ": "j",
            "ｊ": "j",
            "ĵ": "j",
            "ǰ": "j",
            "ɉ": "j",
            "ⓚ": "k",
            "ｋ": "k",
            "ḱ": "k",
            "ǩ": "k",
            "ḳ": "k",
            "ķ": "k",
            "ḵ": "k",
            "ƙ": "k",
            "ⱪ": "k",
            "ꝁ": "k",
            "ꝃ": "k",
            "ꝅ": "k",
            "ꞣ": "k",
            "ⓛ": "l",
            "ｌ": "l",
            "ŀ": "l",
            "ĺ": "l",
            "ľ": "l",
            "ḷ": "l",
            "ḹ": "l",
            "ļ": "l",
            "ḽ": "l",
            "ḻ": "l",
            "ſ": "l",
            "ł": "l",
            "ƚ": "l",
            "ɫ": "l",
            "ⱡ": "l",
            "ꝉ": "l",
            "ꞁ": "l",
            "ꝇ": "l",
            "ǉ": "lj",
            "ⓜ": "m",
            "ｍ": "m",
            "ḿ": "m",
            "ṁ": "m",
            "ṃ": "m",
            "ɱ": "m",
            "ɯ": "m",
            "ⓝ": "n",
            "ｎ": "n",
            "ǹ": "n",
            "ń": "n",
            "ñ": "n",
            "ṅ": "n",
            "ň": "n",
            "ṇ": "n",
            "ņ": "n",
            "ṋ": "n",
            "ṉ": "n",
            "ƞ": "n",
            "ɲ": "n",
            "ŉ": "n",
            "ꞑ": "n",
            "ꞥ": "n",
            "ǌ": "nj",
            "ⓞ": "o",
            "ｏ": "o",
            "ò": "o",
            "ó": "o",
            "ô": "o",
            "ồ": "o",
            "ố": "o",
            "ỗ": "o",
            "ổ": "o",
            "õ": "o",
            "ṍ": "o",
            "ȭ": "o",
            "ṏ": "o",
            "ō": "o",
            "ṑ": "o",
            "ṓ": "o",
            "ŏ": "o",
            "ȯ": "o",
            "ȱ": "o",
            "ö": "o",
            "ȫ": "o",
            "ỏ": "o",
            "ő": "o",
            "ǒ": "o",
            "ȍ": "o",
            "ȏ": "o",
            "ơ": "o",
            "ờ": "o",
            "ớ": "o",
            "ỡ": "o",
            "ở": "o",
            "ợ": "o",
            "ọ": "o",
            "ộ": "o",
            "ǫ": "o",
            "ǭ": "o",
            "ø": "o",
            "ǿ": "o",
            "ɔ": "o",
            "ꝋ": "o",
            "ꝍ": "o",
            "ɵ": "o",
            "ƣ": "oi",
            "ȣ": "ou",
            "ꝏ": "oo",
            "ⓟ": "p",
            "ｐ": "p",
            "ṕ": "p",
            "ṗ": "p",
            "ƥ": "p",
            "ᵽ": "p",
            "ꝑ": "p",
            "ꝓ": "p",
            "ꝕ": "p",
            "ⓠ": "q",
            "ｑ": "q",
            "ɋ": "q",
            "ꝗ": "q",
            "ꝙ": "q",
            "ⓡ": "r",
            "ｒ": "r",
            "ŕ": "r",
            "ṙ": "r",
            "ř": "r",
            "ȑ": "r",
            "ȓ": "r",
            "ṛ": "r",
            "ṝ": "r",
            "ŗ": "r",
            "ṟ": "r",
            "ɍ": "r",
            "ɽ": "r",
            "ꝛ": "r",
            "ꞧ": "r",
            "ꞃ": "r",
            "ⓢ": "s",
            "ｓ": "s",
            "ß": "s",
            "ś": "s",
            "ṥ": "s",
            "ŝ": "s",
            "ṡ": "s",
            "š": "s",
            "ṧ": "s",
            "ṣ": "s",
            "ṩ": "s",
            "ș": "s",
            "ş": "s",
            "ȿ": "s",
            "ꞩ": "s",
            "ꞅ": "s",
            "ẛ": "s",
            "ⓣ": "t",
            "ｔ": "t",
            "ṫ": "t",
            "ẗ": "t",
            "ť": "t",
            "ṭ": "t",
            "ț": "t",
            "ţ": "t",
            "ṱ": "t",
            "ṯ": "t",
            "ŧ": "t",
            "ƭ": "t",
            "ʈ": "t",
            "ⱦ": "t",
            "ꞇ": "t",
            "ꜩ": "tz",
            "ⓤ": "u",
            "ｕ": "u",
            "ù": "u",
            "ú": "u",
            "û": "u",
            "ũ": "u",
            "ṹ": "u",
            "ū": "u",
            "ṻ": "u",
            "ŭ": "u",
            "ü": "u",
            "ǜ": "u",
            "ǘ": "u",
            "ǖ": "u",
            "ǚ": "u",
            "ủ": "u",
            "ů": "u",
            "ű": "u",
            "ǔ": "u",
            "ȕ": "u",
            "ȗ": "u",
            "ư": "u",
            "ừ": "u",
            "ứ": "u",
            "ữ": "u",
            "ử": "u",
            "ự": "u",
            "ụ": "u",
            "ṳ": "u",
            "ų": "u",
            "ṷ": "u",
            "ṵ": "u",
            "ʉ": "u",
            "ⓥ": "v",
            "ｖ": "v",
            "ṽ": "v",
            "ṿ": "v",
            "ʋ": "v",
            "ꝟ": "v",
            "ʌ": "v",
            "ꝡ": "vy",
            "ⓦ": "w",
            "ｗ": "w",
            "ẁ": "w",
            "ẃ": "w",
            "ŵ": "w",
            "ẇ": "w",
            "ẅ": "w",
            "ẘ": "w",
            "ẉ": "w",
            "ⱳ": "w",
            "ⓧ": "x",
            "ｘ": "x",
            "ẋ": "x",
            "ẍ": "x",
            "ⓨ": "y",
            "ｙ": "y",
            "ỳ": "y",
            "ý": "y",
            "ŷ": "y",
            "ỹ": "y",
            "ȳ": "y",
            "ẏ": "y",
            "ÿ": "y",
            "ỷ": "y",
            "ẙ": "y",
            "ỵ": "y",
            "ƴ": "y",
            "ɏ": "y",
            "ỿ": "y",
            "ⓩ": "z",
            "ｚ": "z",
            "ź": "z",
            "ẑ": "z",
            "ż": "z",
            "ž": "z",
            "ẓ": "z",
            "ẕ": "z",
            "ƶ": "z",
            "ȥ": "z",
            "ɀ": "z",
            "ⱬ": "z",
            "ꝣ": "z",
            "Ά": "Α",
            "Έ": "Ε",
            "Ή": "Η",
            "Ί": "Ι",
            "Ϊ": "Ι",
            "Ό": "Ο",
            "Ύ": "Υ",
            "Ϋ": "Υ",
            "Ώ": "Ω",
            "ά": "α",
            "έ": "ε",
            "ή": "η",
            "ί": "ι",
            "ϊ": "ι",
            "ΐ": "ι",
            "ό": "ο",
            "ύ": "υ",
            "ϋ": "υ",
            "ΰ": "υ",
            "ω": "ω",
            "ς": "σ"
        };
        H = e(document), $ = function() {
            var e = 1;
            return function() {
                return e++;
            };
        }(), I = z(Object, {
            bind: function(e) {
                var t = this;
                return function() {
                    e.apply(t, arguments);
                };
            },
            init: function(i) {
                var s, n, a = ".select2-results";
                this.opts = i = this.prepareOpts(i), this.id = i.id, i.element.data("select2") !== t && null !== i.element.data("select2") && i.element.data("select2").destroy(), 
                this.container = this.createContainer(), this.liveRegion = e("<span>", {
                    role: "status",
                    "aria-live": "polite"
                }).addClass("select2-hidden-accessible").appendTo(document.body), this.containerId = "s2id_" + (i.element.attr("id") || "autogen" + $()), 
                this.containerEventName = this.containerId.replace(/([.])/g, "_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), 
                this.container.attr("id", this.containerId), this.container.attr("title", i.element.attr("title")), 
                this.body = e("body"), w(this.container, this.opts.element, this.opts.adaptContainerCssClass), 
                this.container.attr("style", i.element.attr("style")), this.container.css(T(i.containerCss, this.opts.element)), 
                this.container.addClass(T(i.containerCssClass, this.opts.element)), this.elementTabIndex = this.opts.element.attr("tabindex"), 
                this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", m), 
                this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), 
                w(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(T(i.dropdownCssClass, this.opts.element)), 
                this.dropdown.data("select2", this), this.dropdown.on("click", m), this.results = s = this.container.find(a), 
                this.search = n = this.container.find("input.select2-input"), this.queryCount = 0, 
                this.resultsPage = 0, this.context = null, this.initContainer(), this.container.on("click", m), 
                h(this.results), this.dropdown.on("mousemove-filtered", a, this.bind(this.highlightUnderEvent)), 
                this.dropdown.on("touchstart touchmove touchend", a, this.bind(function(e) {
                    this._touchEvent = !0, this.highlightUnderEvent(e);
                })), this.dropdown.on("touchmove", a, this.bind(this.touchMoved)), this.dropdown.on("touchstart touchend", a, this.bind(this.clearTouchMoved)), 
                this.dropdown.on("click", this.bind(function() {
                    this._touchEvent && (this._touchEvent = !1, this.selectHighlighted());
                })), u(80, this.results), this.dropdown.on("scroll-debounced", a, this.bind(this.loadMoreIfNeeded)), 
                e(this.container).on("change", ".select2-input", function(e) {
                    e.stopPropagation();
                }), e(this.dropdown).on("change", ".select2-input", function(e) {
                    e.stopPropagation();
                }), e.fn.mousewheel && s.mousewheel(function(e, t, i, n) {
                    var o = s.scrollTop();
                    n > 0 && 0 >= o - n ? (s.scrollTop(0), m(e)) : 0 > n && s.get(0).scrollHeight - s.scrollTop() + n <= s.height() && (s.scrollTop(s.get(0).scrollHeight - s.height()), 
                    m(e));
                }), c(n), n.on("keyup-change input paste", this.bind(this.updateResults)), n.on("focus", function() {
                    n.addClass("select2-focused");
                }), n.on("blur", function() {
                    n.removeClass("select2-focused");
                }), this.dropdown.on("mouseup", a, this.bind(function(t) {
                    e(t.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(t), 
                    this.selectHighlighted(t));
                })), this.dropdown.on("click mouseup mousedown touchstart touchend focusin", function(e) {
                    e.stopPropagation();
                }), this.nextSearchTerm = t, e.isFunction(this.opts.initSelection) && (this.initSelection(), 
                this.monitorSource()), null !== i.maximumInputLength && this.search.attr("maxlength", i.maximumInputLength);
                var r = i.element.prop("disabled");
                r === t && (r = !1), this.enable(!r);
                var l = i.element.prop("readonly");
                l === t && (l = !1), this.readonly(l), W = W || o(), this.autofocus = i.element.prop("autofocus"), 
                i.element.prop("autofocus", !1), this.autofocus && this.focus(), this.search.attr("placeholder", i.searchInputPlaceholder);
            },
            destroy: function() {
                var e = this.opts.element, i = e.data("select2"), s = this;
                this.close(), e.length && e[0].detachEvent && e.each(function() {
                    this.detachEvent("onpropertychange", s._sync);
                }), this.propertyObserver && (this.propertyObserver.disconnect(), this.propertyObserver = null), 
                this._sync = null, i !== t && (i.container.remove(), i.liveRegion.remove(), i.dropdown.remove(), 
                e.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), 
                this.elementTabIndex ? e.attr({
                    tabindex: this.elementTabIndex
                }) : e.removeAttr("tabindex"), e.show()), P.call(this, "container", "liveRegion", "dropdown", "results", "search");
            },
            optionToData: function(e) {
                return e.is("option") ? {
                    id: e.prop("value"),
                    text: e.text(),
                    element: e.get(),
                    css: e.attr("class"),
                    disabled: e.prop("disabled"),
                    locked: a(e.attr("locked"), "locked") || a(e.data("locked"), !0)
                } : e.is("optgroup") ? {
                    text: e.attr("label"),
                    children: [],
                    element: e.get(),
                    css: e.attr("class")
                } : void 0;
            },
            prepareOpts: function(i) {
                var s, n, o, l, c = this;
                if ("select" === (s = i.element).get(0).tagName.toLowerCase() && (this.select = n = i.element), 
                n && e.each([ "id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags" ], function() {
                    if (this in i) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
                }), "function" != typeof (i = e.extend({}, {
                    populateResults: function(s, n, o) {
                        var a, r = this.opts.id, l = this.liveRegion;
                        (a = function(s, n, h) {
                            var d, u, p, f, m, g, v, w, y, b, _ = [];
                            for (d = 0, u = (s = i.sortResults(s, n, o)).length; u > d; d += 1) p = s[d], m = !0 === p.disabled, 
                            f = !m && r(p) !== t, g = p.children && p.children.length > 0, (v = e("<li></li>")).addClass("select2-results-dept-" + h), 
                            v.addClass("select2-result"), v.addClass(f ? "select2-result-selectable" : "select2-result-unselectable"), 
                            m && v.addClass("select2-disabled"), g && v.addClass("select2-result-with-children"), 
                            v.addClass(c.opts.formatResultCssClass(p)), v.attr("role", "presentation"), (w = e(document.createElement("div"))).addClass("select2-result-label"), 
                            w.attr("id", "select2-result-label-" + $()), w.attr("role", "option"), (b = i.formatResult(p, w, o, c.opts.escapeMarkup)) !== t && (w.html(b), 
                            v.append(w)), g && ((y = e("<ul></ul>")).addClass("select2-result-sub"), a(p.children, y, h + 1), 
                            v.append(y)), v.data("select2-data", p), _.push(v[0]);
                            n.append(_), l.text(i.formatMatches(s.length));
                        })(n, s, 0);
                    }
                }, e.fn.select2.defaults, i)).id && (o = i.id, i.id = function(e) {
                    return e[o];
                }), e.isArray(i.element.data("select2Tags"))) {
                    if ("tags" in i) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + i.element.attr("id");
                    i.tags = i.element.data("select2Tags");
                }
                if (n ? (i.query = this.bind(function(e) {
                    var i, n, o, a = {
                        results: [],
                        more: !1
                    }, r = e.term;
                    o = function(t, i) {
                        var s;
                        t.is("option") ? e.matcher(r, t.text(), t) && i.push(c.optionToData(t)) : t.is("optgroup") && (s = c.optionToData(t), 
                        t.children().each2(function(e, t) {
                            o(t, s.children);
                        }), s.children.length > 0 && i.push(s));
                    }, i = s.children(), this.getPlaceholder() !== t && i.length > 0 && (n = this.getPlaceholderOption()) && (i = i.not(n)), 
                    i.each2(function(e, t) {
                        o(t, a.results);
                    }), e.callback(a);
                }), i.id = function(e) {
                    return e.id;
                }) : "query" in i || ("ajax" in i ? ((l = i.element.data("ajax-url")) && l.length > 0 && (i.ajax.url = l), 
                i.query = _.call(i.element, i.ajax)) : "data" in i ? i.query = x(i.data) : "tags" in i && (i.query = S(i.tags), 
                i.createSearchChoice === t && (i.createSearchChoice = function(t) {
                    return {
                        id: e.trim(t),
                        text: e.trim(t)
                    };
                }), i.initSelection === t && (i.initSelection = function(t, s) {
                    var n = [];
                    e(r(t.val(), i.separator)).each(function() {
                        var t = {
                            id: this,
                            text: this
                        }, s = i.tags;
                        e.isFunction(s) && (s = s()), e(s).each(function() {
                            return a(this.id, t.id) ? (t = this, !1) : void 0;
                        }), n.push(t);
                    }), s(n);
                }))), "function" != typeof i.query) throw "query function not defined for Select2 " + i.element.attr("id");
                if ("top" === i.createSearchChoicePosition) i.createSearchChoicePosition = function(e, t) {
                    e.unshift(t);
                }; else if ("bottom" === i.createSearchChoicePosition) i.createSearchChoicePosition = function(e, t) {
                    e.push(t);
                }; else if ("function" != typeof i.createSearchChoicePosition) throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";
                return i;
            },
            monitorSource: function() {
                var i, s = this.opts.element, n = this;
                s.on("change.select2", this.bind(function() {
                    !0 !== this.opts.element.data("select2-change-triggered") && this.initSelection();
                })), this._sync = this.bind(function() {
                    var e = s.prop("disabled");
                    e === t && (e = !1), this.enable(!e);
                    var i = s.prop("readonly");
                    i === t && (i = !1), this.readonly(i), w(this.container, this.opts.element, this.opts.adaptContainerCssClass), 
                    this.container.addClass(T(this.opts.containerCssClass, this.opts.element)), w(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), 
                    this.dropdown.addClass(T(this.opts.dropdownCssClass, this.opts.element));
                }), s.length && s[0].attachEvent && s.each(function() {
                    this.attachEvent("onpropertychange", n._sync);
                }), (i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver) !== t && (this.propertyObserver && (delete this.propertyObserver, 
                this.propertyObserver = null), this.propertyObserver = new i(function(t) {
                    e.each(t, n._sync);
                }), this.propertyObserver.observe(s.get(0), {
                    attributes: !0,
                    subtree: !1
                }));
            },
            triggerSelect: function(t) {
                var i = e.Event("select2-selecting", {
                    val: this.id(t),
                    object: t,
                    choice: t
                });
                return this.opts.element.trigger(i), !i.isDefaultPrevented();
            },
            triggerChange: function(t) {
                t = t || {}, t = e.extend({}, t, {
                    type: "change",
                    val: this.val()
                }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(t), 
                this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), 
                this.opts.blurOnChange && this.opts.element.blur();
            },
            isInterfaceEnabled: function() {
                return !0 === this.enabledInterface;
            },
            enableInterface: function() {
                var e = this._enabled && !this._readonly, t = !e;
                return e !== this.enabledInterface && (this.container.toggleClass("select2-container-disabled", t), 
                this.close(), this.enabledInterface = e, !0);
            },
            enable: function(e) {
                e === t && (e = !0), this._enabled !== e && (this._enabled = e, this.opts.element.prop("disabled", !e), 
                this.enableInterface());
            },
            disable: function() {
                this.enable(!1);
            },
            readonly: function(e) {
                e === t && (e = !1), this._readonly !== e && (this._readonly = e, this.opts.element.prop("readonly", e), 
                this.enableInterface());
            },
            opened: function() {
                return !!this.container && this.container.hasClass("select2-dropdown-open");
            },
            positionDropdown: function() {
                var t, i, s, n, o, a = this.dropdown, r = this.container.offset(), l = this.container.outerHeight(!1), c = this.container.outerWidth(!1), h = a.outerHeight(!1), d = e(window), u = d.width(), p = d.height(), f = d.scrollLeft() + u, m = d.scrollTop() + p, g = r.top + l, v = r.left, w = m >= g + h, y = r.top - h >= d.scrollTop(), b = a.outerWidth(!1), _ = f >= v + b;
                a.hasClass("select2-drop-above") ? (i = !0, !y && w && (s = !0, i = !1)) : (i = !1, 
                !w && y && (s = !0, i = !0)), s && (a.hide(), r = this.container.offset(), l = this.container.outerHeight(!1), 
                c = this.container.outerWidth(!1), h = a.outerHeight(!1), f = d.scrollLeft() + u, 
                m = d.scrollTop() + p, g = r.top + l, v = r.left, b = a.outerWidth(!1), _ = f >= v + b, 
                a.show(), this.focusSearch()), this.opts.dropdownAutoWidth ? (o = e(".select2-results", a)[0], 
                a.addClass("select2-drop-auto-width"), a.css("width", ""), b = a.outerWidth(!1) + (o.scrollHeight === o.clientHeight ? 0 : W.width), 
                b > c ? c = b : b = c, h = a.outerHeight(!1), _ = f >= v + b) : this.container.removeClass("select2-drop-auto-width"), 
                "static" !== this.body.css("position") && (t = this.body.offset(), g -= t.top, v -= t.left), 
                _ || (v = r.left + this.container.outerWidth(!1) - b), n = {
                    left: v,
                    width: c
                }, i ? (n.top = r.top - h, n.bottom = "auto", this.container.addClass("select2-drop-above"), 
                a.addClass("select2-drop-above")) : (n.top = g, n.bottom = "auto", this.container.removeClass("select2-drop-above"), 
                a.removeClass("select2-drop-above")), n = e.extend(n, T(this.opts.dropdownCss, this.opts.element)), 
                a.css(n);
            },
            shouldOpen: function() {
                var t;
                return !this.opened() && (!1 !== this._enabled && !0 !== this._readonly && (t = e.Event("select2-opening"), 
                this.opts.element.trigger(t), !t.isDefaultPrevented()));
            },
            clearDropdownAlignmentPreference: function() {
                this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above");
            },
            open: function() {
                return !!this.shouldOpen() && (this.opening(), H.on("mousemove.select2Event", function(e) {
                    A.x = e.pageX, A.y = e.pageY;
                }), !0);
            },
            opening: function() {
                var t, s = this.containerEventName, n = "scroll." + s, o = "resize." + s, a = "orientationchange." + s;
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), 
                this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body.children().last()[0] && this.dropdown.detach().appendTo(this.body), 
                0 == (t = e("#select2-drop-mask")).length && ((t = e(document.createElement("div"))).attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), 
                t.hide(), t.appendTo(this.body), t.on("mousedown touchstart click", function(s) {
                    i(t);
                    var n, o = e("#select2-drop");
                    o.length > 0 && ((n = o.data("select2")).opts.selectOnBlur && n.selectHighlighted({
                        noFocus: !0
                    }), n.close(), s.preventDefault(), s.stopPropagation());
                })), this.dropdown.prev()[0] !== t[0] && this.dropdown.before(t), e("#select2-drop").removeAttr("id"), 
                this.dropdown.attr("id", "select2-drop"), t.show(), this.positionDropdown(), this.dropdown.show(), 
                this.positionDropdown(), this.dropdown.addClass("select2-drop-active");
                var r = this;
                this.container.parents().add(window).each(function() {
                    e(this).on(o + " " + n + " " + a, function() {
                        r.opened() && r.positionDropdown();
                    });
                });
            },
            close: function() {
                if (this.opened()) {
                    var t = this.containerEventName, i = "scroll." + t, s = "resize." + t, n = "orientationchange." + t;
                    this.container.parents().add(window).each(function() {
                        e(this).off(i).off(s).off(n);
                    }), this.clearDropdownAlignmentPreference(), e("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), 
                    this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), 
                    this.results.empty(), H.off("mousemove.select2Event"), this.clearSearch(), this.search.removeClass("select2-active"), 
                    this.opts.element.trigger(e.Event("select2-close"));
                }
            },
            externalSearch: function(e) {
                this.open(), this.search.val(e), this.updateResults(!1);
            },
            clearSearch: function() {},
            getMaximumSelectionSize: function() {
                return T(this.opts.maximumSelectionSize, this.opts.element);
            },
            ensureHighlightVisible: function() {
                var t, i, s, n, o, a, r, l, c = this.results;
                if (!(0 > (i = this.highlight()))) {
                    if (0 == i) return void c.scrollTop(0);
                    t = this.findHighlightableChoices().find(".select2-result-label"), n = (l = ((s = e(t[i])).offset() || {}).top || 0) + s.outerHeight(!0), 
                    i === t.length - 1 && (r = c.find("li.select2-more-results")).length > 0 && (n = r.offset().top + r.outerHeight(!0)), 
                    n > (o = c.offset().top + c.outerHeight(!0)) && c.scrollTop(c.scrollTop() + (n - o)), 
                    0 > (a = l - c.offset().top) && "none" != s.css("display") && c.scrollTop(c.scrollTop() + a);
                }
            },
            findHighlightableChoices: function() {
                return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)");
            },
            moveHighlight: function(t) {
                for (var i = this.findHighlightableChoices(), s = this.highlight(); s > -1 && s < i.length; ) {
                    var n = e(i[s += t]);
                    if (n.hasClass("select2-result-selectable") && !n.hasClass("select2-disabled") && !n.hasClass("select2-selected")) {
                        this.highlight(s);
                        break;
                    }
                }
            },
            highlight: function(t) {
                var i, s, o = this.findHighlightableChoices();
                return 0 === arguments.length ? n(o.filter(".select2-highlighted")[0], o.get()) : (t >= o.length && (t = o.length - 1), 
                0 > t && (t = 0), this.removeHighlight(), (i = e(o[t])).addClass("select2-highlighted"), 
                this.search.attr("aria-activedescendant", i.find(".select2-result-label").attr("id")), 
                this.ensureHighlightVisible(), this.liveRegion.text(i.text()), void ((s = i.data("select2-data")) && this.opts.element.trigger({
                    type: "select2-highlight",
                    val: this.id(s),
                    choice: s
                })));
            },
            removeHighlight: function() {
                this.results.find(".select2-highlighted").removeClass("select2-highlighted");
            },
            touchMoved: function() {
                this._touchMoved = !0;
            },
            clearTouchMoved: function() {
                this._touchMoved = !1;
            },
            countSelectableResults: function() {
                return this.findHighlightableChoices().length;
            },
            highlightUnderEvent: function(t) {
                var i = e(t.target).closest(".select2-result-selectable");
                if (i.length > 0 && !i.is(".select2-highlighted")) {
                    var s = this.findHighlightableChoices();
                    this.highlight(s.index(i));
                } else 0 == i.length && this.removeHighlight();
            },
            loadMoreIfNeeded: function() {
                var e = this.results, t = e.find("li.select2-more-results"), i = this.resultsPage + 1, s = this, n = this.search.val(), o = this.context;
                0 !== t.length && t.offset().top - e.offset().top - e.height() <= this.opts.loadMorePadding && (t.addClass("select2-active"), 
                this.opts.query({
                    element: this.opts.element,
                    term: n,
                    page: i,
                    context: o,
                    matcher: this.opts.matcher,
                    callback: this.bind(function(a) {
                        s.opened() && (s.opts.populateResults.call(this, e, a.results, {
                            term: n,
                            page: i,
                            context: o
                        }), s.postprocessResults(a, !1, !1), !0 === a.more ? (t.detach().appendTo(e).text(T(s.opts.formatLoadMore, s.opts.element, i + 1)), 
                        window.setTimeout(function() {
                            s.loadMoreIfNeeded();
                        }, 10)) : t.remove(), s.positionDropdown(), s.resultsPage = i, s.context = a.context, 
                        this.opts.element.trigger({
                            type: "select2-loaded",
                            items: a
                        }));
                    })
                }));
            },
            tokenize: function() {},
            updateResults: function(i) {
                function s() {
                    c.removeClass("select2-active"), u.positionDropdown(), h.find(".select2-no-results,.select2-selection-limit,.select2-searching").length ? u.liveRegion.text(h.text()) : u.liveRegion.text(u.opts.formatMatches(h.find(".select2-result-selectable").length));
                }
                function n(e) {
                    h.html(e), s();
                }
                var o, r, l, c = this.search, h = this.results, d = this.opts, u = this, p = c.val(), f = e.data(this.container, "select2-last-term");
                if ((!0 === i || !f || !a(p, f)) && (e.data(this.container, "select2-last-term", p), 
                !0 === i || !1 !== this.showSearchInput && this.opened())) {
                    l = ++this.queryCount;
                    var m = this.getMaximumSelectionSize();
                    if (m >= 1 && (o = this.data(), e.isArray(o) && o.length >= m && C(d.formatSelectionTooBig, "formatSelectionTooBig"))) return void n("<li class='select2-selection-limit'>" + T(d.formatSelectionTooBig, d.element, m) + "</li>");
                    if (c.val().length < d.minimumInputLength) return n(C(d.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + T(d.formatInputTooShort, d.element, c.val(), d.minimumInputLength) + "</li>" : ""), 
                    void (i && this.showSearch && this.showSearch(!0));
                    if (d.maximumInputLength && c.val().length > d.maximumInputLength) return void n(C(d.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + T(d.formatInputTooLong, d.element, c.val(), d.maximumInputLength) + "</li>" : "");
                    d.formatSearching && 0 === this.findHighlightableChoices().length && n("<li class='select2-searching'>" + T(d.formatSearching, d.element) + "</li>"), 
                    c.addClass("select2-active"), this.removeHighlight(), (r = this.tokenize()) != t && null != r && c.val(r), 
                    this.resultsPage = 1, d.query({
                        element: d.element,
                        term: c.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: d.matcher,
                        callback: this.bind(function(o) {
                            var r;
                            if (l == this.queryCount) {
                                if (!this.opened()) return void this.search.removeClass("select2-active");
                                if (o.hasError !== t && C(d.formatAjaxError, "formatAjaxError")) return void n("<li class='select2-ajax-error'>" + T(d.formatAjaxError, d.element, o.jqXHR, o.textStatus, o.errorThrown) + "</li>");
                                if (this.context = o.context === t ? null : o.context, this.opts.createSearchChoice && "" !== c.val() && (r = this.opts.createSearchChoice.call(u, c.val(), o.results)) !== t && null !== r && u.id(r) !== t && null !== u.id(r) && 0 === e(o.results).filter(function() {
                                    return a(u.id(this), u.id(r));
                                }).length && this.opts.createSearchChoicePosition(o.results, r), 0 === o.results.length && C(d.formatNoMatches, "formatNoMatches")) return void n("<li class='select2-no-results'>" + T(d.formatNoMatches, d.element, c.val()) + "</li>");
                                h.empty(), u.opts.populateResults.call(this, h, o.results, {
                                    term: c.val(),
                                    page: this.resultsPage,
                                    context: null
                                }), !0 === o.more && C(d.formatLoadMore, "formatLoadMore") && (h.append("<li class='select2-more-results'>" + d.escapeMarkup(T(d.formatLoadMore, d.element, this.resultsPage)) + "</li>"), 
                                window.setTimeout(function() {
                                    u.loadMoreIfNeeded();
                                }, 10)), this.postprocessResults(o, i), s(), this.opts.element.trigger({
                                    type: "select2-loaded",
                                    items: o
                                });
                            }
                        })
                    });
                }
            },
            cancel: function() {
                this.close();
            },
            blur: function() {
                this.opts.selectOnBlur && this.selectHighlighted({
                    noFocus: !0
                }), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), 
                this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
            },
            focusSearch: function() {
                p(this.search);
            },
            selectHighlighted: function(e) {
                if (this._touchMoved) this.clearTouchMoved(); else {
                    var t = this.highlight(), i = this.results.find(".select2-highlighted").closest(".select2-result").data("select2-data");
                    i ? (this.highlight(t), this.onSelect(i, e)) : e && e.noFocus && this.close();
                }
            },
            getPlaceholder: function() {
                var e;
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((e = this.getPlaceholderOption()) !== t ? e.text() : t);
            },
            getPlaceholderOption: function() {
                if (this.select) {
                    var i = this.select.children("option").first();
                    if (this.opts.placeholderOption !== t) return "first" === this.opts.placeholderOption && i || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select);
                    if ("" === e.trim(i.text()) && "" === i.val()) return i;
                }
            },
            initContainerWidth: function() {
                function i() {
                    var i, s, n, o, a, r;
                    if ("off" === this.opts.width) return null;
                    if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if ((i = this.opts.element.attr("style")) !== t) for (s = i.split(";"), o = 0, a = s.length; a > o; o += 1) if (r = s[o].replace(/\s/g, ""), 
                        null !== (n = r.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i)) && n.length >= 1) return n[1];
                        return "resolve" === this.opts.width ? (i = this.opts.element.css("width"), i.indexOf("%") > 0 ? i : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null;
                    }
                    return e.isFunction(this.opts.width) ? this.opts.width() : this.opts.width;
                }
                var s = i.call(this);
                null !== s && this.container.css("width", s);
            }
        }), M = z(I, {
            createContainer: function() {
                return e(document.createElement("div")).attr({
                    class: "select2-container"
                }).html([ "<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>", "</a>", "<label for='' class='select2-offscreen'></label>", "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <label for='' class='select2-offscreen'></label>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'", "       aria-autocomplete='list' />", "   </div>", "   <ul class='select2-results' role='listbox'>", "   </ul>", "</div>" ].join(""));
            },
            enableInterface: function() {
                this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled());
            },
            opening: function() {
                var i, s, n;
                this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), 
                !1 !== this.showSearchInput && this.search.val(this.focusser.val()), this.opts.shouldFocusInput(this) && (this.search.focus(), 
                i = this.search.get(0), i.createTextRange ? ((s = i.createTextRange()).collapse(!1), 
                s.select()) : i.setSelectionRange && (n = this.search.val().length, i.setSelectionRange(n, n))), 
                "" === this.search.val() && this.nextSearchTerm != t && (this.search.val(this.nextSearchTerm), 
                this.search.select()), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), 
                this.opts.element.trigger(e.Event("select2-open"));
            },
            close: function() {
                this.opened() && (this.parent.close.apply(this, arguments), this.focusser.prop("disabled", !1), 
                this.opts.shouldFocusInput(this) && this.focusser.focus());
            },
            focus: function() {
                this.opened() ? this.close() : (this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus());
            },
            isFocused: function() {
                return this.container.hasClass("select2-container-active");
            },
            cancel: function() {
                this.parent.cancel.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus();
            },
            destroy: function() {
                e("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")), 
                this.parent.destroy.apply(this, arguments), P.call(this, "selection", "focusser");
            },
            initContainer: function() {
                var t, s, n = this.container, o = this.dropdown, a = $();
                this.opts.minimumResultsForSearch < 0 ? this.showSearch(!1) : this.showSearch(!0), 
                this.selection = t = n.find(".select2-choice"), this.focusser = n.find(".select2-focusser"), 
                t.find(".select2-chosen").attr("id", "select2-chosen-" + a), this.focusser.attr("aria-labelledby", "select2-chosen-" + a), 
                this.results.attr("id", "select2-results-" + a), this.search.attr("aria-owns", "select2-results-" + a), 
                this.focusser.attr("id", "s2id_autogen" + a), s = e("label[for='" + this.opts.element.attr("id") + "']"), 
                this.focusser.prev().text(s.text()).attr("for", this.focusser.attr("id"));
                var r = this.opts.element.attr("title");
                this.opts.element.attr("title", r || s.text()), this.focusser.attr("tabindex", this.elementTabIndex), 
                this.search.attr("id", this.focusser.attr("id") + "_search"), this.search.prev().text(e("label[for='" + this.focusser.attr("id") + "']").text()).attr("for", this.search.attr("id")), 
                this.search.on("keydown", this.bind(function(e) {
                    if (this.isInterfaceEnabled() && 229 != e.keyCode) {
                        if (e.which === D.PAGE_UP || e.which === D.PAGE_DOWN) return void m(e);
                        switch (e.which) {
                          case D.UP:
                          case D.DOWN:
                            return this.moveHighlight(e.which === D.UP ? -1 : 1), void m(e);

                          case D.ENTER:
                            return this.selectHighlighted(), void m(e);

                          case D.TAB:
                            return void this.selectHighlighted({
                                noFocus: !0
                            });

                          case D.ESC:
                            return this.cancel(e), void m(e);
                        }
                    }
                })), this.search.on("blur", this.bind(function() {
                    document.activeElement === this.body.get(0) && window.setTimeout(this.bind(function() {
                        this.opened() && this.search.focus();
                    }), 0);
                })), this.focusser.on("keydown", this.bind(function(e) {
                    if (this.isInterfaceEnabled() && e.which !== D.TAB && !D.isControl(e) && !D.isFunctionKey(e) && e.which !== D.ESC) {
                        if (!1 === this.opts.openOnEnter && e.which === D.ENTER) return void m(e);
                        if (e.which == D.DOWN || e.which == D.UP || e.which == D.ENTER && this.opts.openOnEnter) {
                            if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
                            return this.open(), void m(e);
                        }
                        return e.which == D.DELETE || e.which == D.BACKSPACE ? (this.opts.allowClear && this.clear(), 
                        void m(e)) : void 0;
                    }
                })), c(this.focusser), this.focusser.on("keyup-change input", this.bind(function(e) {
                    if (this.opts.minimumResultsForSearch >= 0) {
                        if (e.stopPropagation(), this.opened()) return;
                        this.open();
                    }
                })), t.on("mousedown touchstart", "abbr", this.bind(function(e) {
                    this.isInterfaceEnabled() && (this.clear(), g(e), this.close(), this.selection.focus());
                })), t.on("mousedown touchstart", this.bind(function(s) {
                    i(t), this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), 
                    this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), m(s);
                })), o.on("mousedown touchstart", this.bind(function() {
                    this.opts.shouldFocusInput(this) && this.search.focus();
                })), t.on("focus", this.bind(function(e) {
                    m(e);
                })), this.focusser.on("focus", this.bind(function() {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), 
                    this.container.addClass("select2-container-active");
                })).on("blur", this.bind(function() {
                    this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(e.Event("select2-blur")));
                })), this.search.on("focus", this.bind(function() {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), 
                    this.container.addClass("select2-container-active");
                })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), 
                this.setPlaceholder();
            },
            clear: function(t) {
                var i = this.selection.data("select2-data");
                if (i) {
                    var s = e.Event("select2-clearing");
                    if (this.opts.element.trigger(s), s.isDefaultPrevented()) return;
                    var n = this.getPlaceholderOption();
                    this.opts.element.val(n ? n.val() : ""), this.selection.find(".select2-chosen").empty(), 
                    this.selection.removeData("select2-data"), this.setPlaceholder(), !1 !== t && (this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(i),
                        choice: i
                    }), this.triggerChange({
                        removed: i
                    }));
                }
            },
            initSelection: function() {
                if (this.isPlaceholderOptionSelected()) this.updateSelection(null), this.close(), 
                this.setPlaceholder(); else {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element, function(i) {
                        i !== t && null !== i && (e.updateSelection(i), e.close(), e.setPlaceholder(), e.nextSearchTerm = e.opts.nextSearchTerm(i, e.search.val()));
                    });
                }
            },
            isPlaceholderOptionSelected: function() {
                var e;
                return this.getPlaceholder() !== t && ((e = this.getPlaceholderOption()) !== t && e.prop("selected") || "" === this.opts.element.val() || this.opts.element.val() === t || null === this.opts.element.val());
            },
            prepareOpts: function() {
                var t = this.parent.prepareOpts.apply(this, arguments), i = this;
                return "select" === t.element.get(0).tagName.toLowerCase() ? t.initSelection = function(e, t) {
                    var s = e.find("option").filter(function() {
                        return this.selected && !this.disabled;
                    });
                    t(i.optionToData(s));
                } : "data" in t && (t.initSelection = t.initSelection || function(i, s) {
                    var n = i.val(), o = null;
                    t.query({
                        matcher: function(e, i, s) {
                            var r = a(n, t.id(s));
                            return r && (o = s), r;
                        },
                        callback: e.isFunction(s) ? function() {
                            s(o);
                        } : e.noop
                    });
                }), t;
            },
            getPlaceholder: function() {
                return this.select && this.getPlaceholderOption() === t ? t : this.parent.getPlaceholder.apply(this, arguments);
            },
            setPlaceholder: function() {
                var e = this.getPlaceholder();
                if (this.isPlaceholderOptionSelected() && e !== t) {
                    if (this.select && this.getPlaceholderOption() === t) return;
                    this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(e)), this.selection.addClass("select2-default"), 
                    this.container.removeClass("select2-allowclear");
                }
            },
            postprocessResults: function(e, t, i) {
                var s = 0, n = this;
                if (this.findHighlightableChoices().each2(function(e, t) {
                    return a(n.id(t.data("select2-data")), n.opts.element.val()) ? (s = e, !1) : void 0;
                }), !1 !== i && (!0 === t && s >= 0 ? this.highlight(s) : this.highlight(0)), !0 === t) {
                    var o = this.opts.minimumResultsForSearch;
                    o >= 0 && this.showSearch(k(e.results) >= o);
                }
            },
            showSearch: function(t) {
                this.showSearchInput !== t && (this.showSearchInput = t, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !t), 
                this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !t), e(this.dropdown, this.container).toggleClass("select2-with-searchbox", t));
            },
            onSelect: function(e, t) {
                if (this.triggerSelect(e)) {
                    var i = this.opts.element.val(), s = this.data();
                    this.opts.element.val(this.id(e)), this.updateSelection(e), this.opts.element.trigger({
                        type: "select2-selected",
                        val: this.id(e),
                        choice: e
                    }), this.nextSearchTerm = this.opts.nextSearchTerm(e, this.search.val()), this.close(), 
                    t && t.noFocus || !this.opts.shouldFocusInput(this) || this.focusser.focus(), a(i, this.id(e)) || this.triggerChange({
                        added: e,
                        removed: s
                    });
                }
            },
            updateSelection: function(e) {
                var i, s, n = this.selection.find(".select2-chosen");
                this.selection.data("select2-data", e), n.empty(), null !== e && (i = this.opts.formatSelection(e, n, this.opts.escapeMarkup)), 
                i !== t && n.append(i), (s = this.opts.formatSelectionCssClass(e, n)) !== t && n.addClass(s), 
                this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== t && this.container.addClass("select2-allowclear");
            },
            val: function() {
                var e, i = !1, s = null, n = this, o = this.data();
                if (0 === arguments.length) return this.opts.element.val();
                if (e = arguments[0], arguments.length > 1 && (i = arguments[1]), this.select) this.select.val(e).find("option").filter(function() {
                    return this.selected;
                }).each2(function(e, t) {
                    return s = n.optionToData(t), !1;
                }), this.updateSelection(s), this.setPlaceholder(), i && this.triggerChange({
                    added: s,
                    removed: o
                }); else {
                    if (!e && 0 !== e) return void this.clear(i);
                    if (this.opts.initSelection === t) throw new Error("cannot call val() if initSelection() is not defined");
                    this.opts.element.val(e), this.opts.initSelection(this.opts.element, function(e) {
                        n.opts.element.val(e ? n.id(e) : ""), n.updateSelection(e), n.setPlaceholder(), 
                        i && n.triggerChange({
                            added: e,
                            removed: o
                        });
                    });
                }
            },
            clearSearch: function() {
                this.search.val(""), this.focusser.val("");
            },
            data: function(e) {
                var i, s = !1;
                return 0 === arguments.length ? ((i = this.selection.data("select2-data")) == t && (i = null), 
                i) : (arguments.length > 1 && (s = arguments[1]), void (e ? (i = this.data(), this.opts.element.val(e ? this.id(e) : ""), 
                this.updateSelection(e), s && this.triggerChange({
                    added: e,
                    removed: i
                })) : this.clear(s)));
            }
        }), L = z(I, {
            createContainer: function() {
                return e(document.createElement("div")).attr({
                    class: "select2-container select2-container-multi"
                }).html([ "<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <label for='' class='select2-offscreen'></label>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>" ].join(""));
            },
            prepareOpts: function() {
                var t = this.parent.prepareOpts.apply(this, arguments), i = this;
                return "select" === t.element.get(0).tagName.toLowerCase() ? t.initSelection = function(e, t) {
                    var s = [];
                    e.find("option").filter(function() {
                        return this.selected && !this.disabled;
                    }).each2(function(e, t) {
                        s.push(i.optionToData(t));
                    }), t(s);
                } : "data" in t && (t.initSelection = t.initSelection || function(i, s) {
                    var n = r(i.val(), t.separator), o = [];
                    t.query({
                        matcher: function(i, s, r) {
                            var l = e.grep(n, function(e) {
                                return a(e, t.id(r));
                            }).length;
                            return l && o.push(r), l;
                        },
                        callback: e.isFunction(s) ? function() {
                            for (var e = [], i = 0; i < n.length; i++) for (var r = n[i], l = 0; l < o.length; l++) {
                                var c = o[l];
                                if (a(r, t.id(c))) {
                                    e.push(c), o.splice(l, 1);
                                    break;
                                }
                            }
                            s(e);
                        } : e.noop
                    });
                }), t;
            },
            selectChoice: function(e) {
                var t = this.container.find(".select2-search-choice-focus");
                t.length && e && e[0] == t[0] || (t.length && this.opts.element.trigger("choice-deselected", t), 
                t.removeClass("select2-search-choice-focus"), e && e.length && (this.close(), e.addClass("select2-search-choice-focus"), 
                this.opts.element.trigger("choice-selected", e)));
            },
            destroy: function() {
                e("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")), 
                this.parent.destroy.apply(this, arguments), P.call(this, "searchContainer", "selection");
            },
            initContainer: function() {
                var t, i = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"), this.selection = t = this.container.find(i);
                var s = this;
                this.selection.on("click", ".select2-search-choice:not(.select2-locked)", function() {
                    s.search[0].focus(), s.selectChoice(e(this));
                }), this.search.attr("id", "s2id_autogen" + $()), this.search.prev().text(e("label[for='" + this.opts.element.attr("id") + "']").text()).attr("for", this.search.attr("id")), 
                this.search.on("input paste", this.bind(function() {
                    this.search.attr("placeholder") && 0 == this.search.val().length || this.isInterfaceEnabled() && (this.opened() || this.open());
                })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function(e) {
                    if (this.isInterfaceEnabled()) {
                        ++this.keydowns;
                        var i = t.find(".select2-search-choice-focus"), s = i.prev(".select2-search-choice:not(.select2-locked)"), n = i.next(".select2-search-choice:not(.select2-locked)"), o = f(this.search);
                        if (i.length && (e.which == D.LEFT || e.which == D.RIGHT || e.which == D.BACKSPACE || e.which == D.DELETE || e.which == D.ENTER)) {
                            var a = i;
                            return e.which == D.LEFT && s.length ? a = s : e.which == D.RIGHT ? a = n.length ? n : null : e.which === D.BACKSPACE ? this.unselect(i.first()) && (this.search.width(10), 
                            a = s.length ? s : n) : e.which == D.DELETE ? this.unselect(i.first()) && (this.search.width(10), 
                            a = n.length ? n : null) : e.which == D.ENTER && (a = null), this.selectChoice(a), 
                            m(e), void (a && a.length || this.open());
                        }
                        if ((e.which === D.BACKSPACE && 1 == this.keydowns || e.which == D.LEFT) && 0 == o.offset && !o.length) return this.selectChoice(t.find(".select2-search-choice:not(.select2-locked)").last()), 
                        void m(e);
                        if (this.selectChoice(null), this.opened()) switch (e.which) {
                          case D.UP:
                          case D.DOWN:
                            return this.moveHighlight(e.which === D.UP ? -1 : 1), void m(e);

                          case D.ENTER:
                            return this.selectHighlighted(), void m(e);

                          case D.TAB:
                            return this.selectHighlighted({
                                noFocus: !0
                            }), void this.close();

                          case D.ESC:
                            return this.cancel(e), void m(e);
                        }
                        if (e.which !== D.TAB && !D.isControl(e) && !D.isFunctionKey(e) && e.which !== D.BACKSPACE && e.which !== D.ESC) {
                            if (e.which === D.ENTER) {
                                if (!1 === this.opts.openOnEnter) return;
                                if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
                            }
                            this.open(), (e.which === D.PAGE_UP || e.which === D.PAGE_DOWN) && m(e), e.which === D.ENTER && m(e);
                        }
                    }
                })), this.search.on("keyup", this.bind(function() {
                    this.keydowns = 0, this.resizeSearch();
                })), this.search.on("blur", this.bind(function(t) {
                    this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), 
                    this.selectChoice(null), this.opened() || this.clearSearch(), t.stopImmediatePropagation(), 
                    this.opts.element.trigger(e.Event("select2-blur"));
                })), this.container.on("click", i, this.bind(function(t) {
                    this.isInterfaceEnabled() && (e(t.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), 
                    this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), 
                    this.open(), this.focusSearch(), t.preventDefault()));
                })), this.container.on("focus", i, this.bind(function() {
                    this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), 
                    this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), 
                    this.clearPlaceholder());
                })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), 
                this.clearSearch();
            },
            enableInterface: function() {
                this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled());
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), 
                this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element, function(i) {
                        i !== t && null !== i && (e.updateSelection(i), e.close(), e.clearSearch());
                    });
                }
            },
            clearSearch: function() {
                var e = this.getPlaceholder(), i = this.getMaxSearchWidth();
                e !== t && 0 === this.getVal().length && !1 === this.search.hasClass("select2-focused") ? (this.search.val(e).addClass("select2-default"), 
                this.search.width(i > 0 ? i : this.container.css("width"))) : this.search.val("").width(10);
            },
            clearPlaceholder: function() {
                this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default");
            },
            opening: function() {
                this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), 
                this.focusSearch(), "" === this.search.val() && this.nextSearchTerm != t && (this.search.val(this.nextSearchTerm), 
                this.search.select()), this.updateResults(!0), this.opts.shouldFocusInput(this) && this.search.focus(), 
                this.opts.element.trigger(e.Event("select2-open"));
            },
            close: function() {
                this.opened() && this.parent.close.apply(this, arguments);
            },
            focus: function() {
                this.close(), this.search.focus();
            },
            isFocused: function() {
                return this.search.hasClass("select2-focused");
            },
            updateSelection: function(t) {
                var i = [], s = [], o = this;
                e(t).each(function() {
                    n(o.id(this), i) < 0 && (i.push(o.id(this)), s.push(this));
                }), t = s, this.selection.find(".select2-search-choice").remove(), e(t).each(function() {
                    o.addSelectedChoice(this);
                }), o.postprocessResults();
            },
            tokenize: function() {
                var e = this.search.val();
                null != (e = this.opts.tokenizer.call(this, e, this.data(), this.bind(this.onSelect), this.opts)) && e != t && (this.search.val(e), 
                e.length > 0 && this.open());
            },
            onSelect: function(e, i) {
                this.triggerSelect(e) && "" !== e.text && (this.addSelectedChoice(e), this.opts.element.trigger({
                    type: "selected",
                    val: this.id(e),
                    choice: e
                }), this.nextSearchTerm = this.opts.nextSearchTerm(e, this.search.val()), this.clearSearch(), 
                this.updateResults(), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(e, !1, !0 === this.opts.closeOnSelect), 
                this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), 
                this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() ? this.updateResults(!0) : this.nextSearchTerm != t && (this.search.val(this.nextSearchTerm), 
                this.updateResults(), this.search.select()), this.positionDropdown()) : (this.close(), 
                this.search.width(10)), this.triggerChange({
                    added: e
                }), i && i.noFocus || this.focusSearch());
            },
            cancel: function() {
                this.close(), this.focusSearch();
            },
            addSelectedChoice: function(i) {
                var s, n, o = !i.locked, a = e("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"), r = e("<li class='select2-search-choice select2-locked'><div></div></li>"), l = o ? a : r, c = this.id(i), h = this.getVal();
                (s = this.opts.formatSelection(i, l.find("div"), this.opts.escapeMarkup)) != t && l.find("div").replaceWith("<div>" + s + "</div>"), 
                (n = this.opts.formatSelectionCssClass(i, l.find("div"))) != t && l.addClass(n), 
                o && l.find(".select2-search-choice-close").on("mousedown", m).on("click dblclick", this.bind(function(t) {
                    this.isInterfaceEnabled() && (this.unselect(e(t.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), 
                    m(t), this.close(), this.focusSearch());
                })).on("focus", this.bind(function() {
                    this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), 
                    this.dropdown.addClass("select2-drop-active"));
                })), l.data("select2-data", i), l.insertBefore(this.searchContainer), h.push(c), 
                this.setVal(h);
            },
            unselect: function(t) {
                var i, s, o = this.getVal();
                if (0 === (t = t.closest(".select2-search-choice")).length) throw "Invalid argument: " + t + ". Must be .select2-search-choice";
                if (i = t.data("select2-data")) {
                    var a = e.Event("select2-removing");
                    if (a.val = this.id(i), a.choice = i, this.opts.element.trigger(a), a.isDefaultPrevented()) return !1;
                    for (;(s = n(this.id(i), o)) >= 0; ) o.splice(s, 1), this.setVal(o), this.select && this.postprocessResults();
                    return t.remove(), this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(i),
                        choice: i
                    }), this.triggerChange({
                        removed: i
                    }), !0;
                }
            },
            postprocessResults: function(e, t, i) {
                var s = this.getVal(), o = this.results.find(".select2-result"), a = this.results.find(".select2-result-with-children"), r = this;
                o.each2(function(e, t) {
                    n(r.id(t.data("select2-data")), s) >= 0 && (t.addClass("select2-selected"), t.find(".select2-result-selectable").addClass("select2-selected"));
                }), a.each2(function(e, t) {
                    t.is(".select2-result-selectable") || 0 !== t.find(".select2-result-selectable:not(.select2-selected)").length || t.addClass("select2-selected");
                }), -1 == this.highlight() && !1 !== i && r.highlight(0), !this.opts.createSearchChoice && !o.filter(".select2-result:not(.select2-selected)").length > 0 && (!e || e && !e.more && 0 === this.results.find(".select2-no-results").length) && C(r.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + T(r.opts.formatNoMatches, r.opts.element, r.search.val()) + "</li>");
            },
            getMaxSearchWidth: function() {
                return this.selection.width() - l(this.search);
            },
            resizeSearch: function() {
                var e, t, i, s, n = l(this.search);
                e = v(this.search) + 10, t = this.search.offset().left, e > (s = (i = this.selection.width()) - (t - this.selection.offset().left) - n) && (s = i - n), 
                40 > s && (s = i - n), 0 >= s && (s = e), this.search.width(Math.floor(s));
            },
            getVal: function() {
                var e;
                return this.select ? (e = this.select.val(), null === e ? [] : e) : (e = this.opts.element.val(), 
                r(e, this.opts.separator));
            },
            setVal: function(t) {
                var i;
                this.select ? this.select.val(t) : (i = [], e(t).each(function() {
                    n(this, i) < 0 && i.push(this);
                }), this.opts.element.val(0 === i.length ? "" : i.join(this.opts.separator)));
            },
            buildChangeDetails: function(e, t) {
                for (var t = t.slice(0), e = e.slice(0), i = 0; i < t.length; i++) for (var s = 0; s < e.length; s++) a(this.opts.id(t[i]), this.opts.id(e[s])) && (t.splice(i, 1), 
                i > 0 && i--, e.splice(s, 1), s--);
                return {
                    added: t,
                    removed: e
                };
            },
            val: function(i, s) {
                var n, o = this;
                if (0 === arguments.length) return this.getVal();
                if ((n = this.data()).length || (n = []), !i && 0 !== i) return this.opts.element.val(""), 
                this.updateSelection([]), this.clearSearch(), void (s && this.triggerChange({
                    added: this.data(),
                    removed: n
                }));
                if (this.setVal(i), this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), 
                s && this.triggerChange(this.buildChangeDetails(n, this.data())); else {
                    if (this.opts.initSelection === t) throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function(t) {
                        var i = e.map(t, o.id);
                        o.setVal(i), o.updateSelection(t), o.clearSearch(), s && o.triggerChange(o.buildChangeDetails(n, o.data()));
                    });
                }
                this.clearSearch();
            },
            onSortStart: function() {
                if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0), this.searchContainer.hide();
            },
            onSortEnd: function() {
                var t = [], i = this;
                this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), 
                this.resizeSearch(), this.selection.find(".select2-search-choice").each(function() {
                    t.push(i.opts.id(e(this).data("select2-data")));
                }), this.setVal(t), this.triggerChange();
            },
            data: function(t, i) {
                var s, n, o = this;
                return 0 === arguments.length ? this.selection.children(".select2-search-choice").map(function() {
                    return e(this).data("select2-data");
                }).get() : (n = this.data(), t || (t = []), s = e.map(t, function(e) {
                    return o.opts.id(e);
                }), this.setVal(s), this.updateSelection(t), this.clearSearch(), void (i && this.triggerChange(this.buildChangeDetails(n, this.data()))));
            }
        }), e.fn.select2 = function() {
            var i, s, o, a, r, l = Array.prototype.slice.call(arguments, 0), c = [ "val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search" ], h = [ "opened", "isFocused", "container", "dropdown" ], d = [ "val", "data" ], u = {
                search: "externalSearch"
            };
            return this.each(function() {
                if (0 === l.length || "object" == typeof l[0]) i = 0 === l.length ? {} : e.extend({}, l[0]), 
                i.element = e(this), "select" === i.element.get(0).tagName.toLowerCase() ? r = i.element.prop("multiple") : (r = i.multiple || !1, 
                "tags" in i && (i.multiple = r = !0)), (s = r ? new window.Select2.class.multi() : new window.Select2.class.single()).init(i); else {
                    if ("string" != typeof l[0]) throw "Invalid arguments to select2 plugin: " + l;
                    if (n(l[0], c) < 0) throw "Unknown method: " + l[0];
                    if (a = t, (s = e(this).data("select2")) === t) return;
                    if (o = l[0], "container" === o ? a = s.container : "dropdown" === o ? a = s.dropdown : (u[o] && (o = u[o]), 
                    a = s[o].apply(s, l.slice(1))), n(l[0], h) >= 0 || n(l[0], d) >= 0 && 1 == l.length) return !1;
                }
            }), a === t ? this : a;
        }, e.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function(e, t, i, s) {
                var n = [];
                return y(e.text, i.term, n, s), n.join("");
            },
            formatSelection: function(e, i, s) {
                return e ? s(e.text) : t;
            },
            sortResults: function(e) {
                return e;
            },
            formatResultCssClass: function(e) {
                return e.css;
            },
            formatSelectionCssClass: function() {
                return t;
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function(e) {
                return e == t ? null : e.id;
            },
            matcher: function(e, t) {
                return s("" + t).toUpperCase().indexOf(s("" + e).toUpperCase()) >= 0;
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: E,
            escapeMarkup: b,
            blurOnChange: !1,
            selectOnBlur: !1,
            adaptContainerCssClass: function(e) {
                return e;
            },
            adaptDropdownCssClass: function() {
                return null;
            },
            nextSearchTerm: function() {
                return t;
            },
            searchInputPlaceholder: "",
            createSearchChoicePosition: "top",
            shouldFocusInput: function(e) {
                return !("ontouchstart" in window || navigator.msMaxTouchPoints > 0) || !(e.opts.minimumResultsForSearch < 0);
            }
        }, e.fn.select2.locales = [], e.fn.select2.locales.en = {
            formatMatches: function(e) {
                return 1 === e ? "One result is available, press enter to select it." : e + " results are available, use up and down arrow keys to navigate.";
            },
            formatNoMatches: function() {
                return "No matches found";
            },
            formatAjaxError: function() {
                return "Loading failed";
            },
            formatInputTooShort: function(e, t) {
                var i = t - e.length;
                return "Please enter " + i + " or more character" + (1 == i ? "" : "s");
            },
            formatInputTooLong: function(e, t) {
                var i = e.length - t;
                return "Please delete " + i + " character" + (1 == i ? "" : "s");
            },
            formatSelectionTooBig: function(e) {
                return "You can only select " + e + " item" + (1 == e ? "" : "s");
            },
            formatLoadMore: function() {
                return "Loading more results…";
            },
            formatSearching: function() {
                return "Searching…";
            }
        }, e.extend(e.fn.select2.defaults, e.fn.select2.locales.en), e.fn.select2.ajaxDefaults = {
            transport: e.ajax,
            params: {
                type: "GET",
                cache: !1,
                dataType: "json"
            }
        }, window.Select2 = {
            query: {
                ajax: _,
                local: x,
                tags: S
            },
            util: {
                debounce: d,
                markMatch: y,
                escapeMarkup: b,
                stripDiacritics: s
            },
            class: {
                abstract: I,
                single: M,
                multi: L
            }
        };
    }
}(jQuery), function(e, t, i) {
    "use strict";
    var s, n, o, a, r, l, c, h, d, u, p, f, m, g, v, w, y, b, _, x, S, C, T, k, E;
    b = {
        paneClass: "pane",
        sliderClass: "slider",
        contentClass: "content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    }, m = "scroll", l = "mousedown", c = "mousemove", d = "mousewheel", h = "mouseup", 
    f = "resize", r = "drag", v = "up", p = "panedown", o = "DOMMouseScroll", a = "down", 
    w = "wheel", g = "touchmove", s = "Microsoft Internet Explorer" === t.navigator.appName && /msie 7./i.test(t.navigator.appVersion) && t.ActiveXObject, 
    n = null, C = t.requestAnimationFrame, y = t.cancelAnimationFrame, k = i.createElement("div").style, 
    E = function() {
        var e, t, i, s;
        for (e = i = 0, s = (t = [ "t", "webkitT", "MozT", "msT", "OT" ]).length; s > i; e = ++i) if (t[e], 
        t[e] + "ransform" in k) return t[e].substr(0, t[e].length - 1);
        return !1;
    }(), T = function(e) {
        return !1 !== E && ("" === E ? e : E + e.charAt(0).toUpperCase() + e.substr(1));
    }("transform"), x = !1 !== T, _ = function() {
        var e, t, s;
        return e = i.createElement("div"), t = e.style, t.position = "absolute", t.width = "100px", 
        t.height = "100px", t.overflow = m, t.top = "-9999px", i.body.appendChild(e), s = e.offsetWidth - e.clientWidth, 
        i.body.removeChild(e), s;
    }, S = function() {
        var e, i, s;
        return i = t.navigator.userAgent, !!(e = /(?=.+Mac OS X)(?=.+Firefox)/.test(i)) && ((s = /Firefox\/\d{2}\./.exec(i)) && (s = s[0].replace(/\D+/g, "")), 
        e && +s > 23);
    }, u = function() {
        function u(s, o) {
            this.el = s, this.options = o, n || (n = _()), this.$el = e(this.el), this.doc = e(this.options.documentContext || i), 
            this.win = e(this.options.windowContext || t), this.$content = this.$el.children("." + o.contentClass), 
            this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], 
            this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), 
            this.createEvents(), this.addEvents(), this.reset();
        }
        return u.prototype.preventScrolling = function(e, t) {
            if (this.isActive) if (e.type === o) (t === a && e.originalEvent.detail > 0 || t === v && e.originalEvent.detail < 0) && e.preventDefault(); else if (e.type === d) {
                if (!e.originalEvent || !e.originalEvent.wheelDelta) return;
                (t === a && e.originalEvent.wheelDelta < 0 || t === v && e.originalEvent.wheelDelta > 0) && e.preventDefault();
            }
        }, u.prototype.nativeScrolling = function() {
            this.$content.css({
                WebkitOverflowScrolling: "touch"
            }), this.iOSNativeScrolling = !0, this.isActive = !0;
        }, u.prototype.updateScrollValues = function() {
            var e;
            e = this.content, this.maxScrollTop = e.scrollHeight - e.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, 
            this.contentScrollTop = e.scrollTop, this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, 
            this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop);
        }, u.prototype.setOnScrollStyles = function() {
            var e, t = this;
            x ? (e = {}, e[T] = "translate(0, " + this.sliderTop + "px)") : e = {
                top: this.sliderTop
            }, C ? this.scrollRAF || (this.scrollRAF = C(function() {
                t.scrollRAF = null, t.slider.css(e);
            })) : this.slider.css(e);
        }, u.prototype.createEvents = function() {
            var e = this;
            this.events = {
                down: function(t) {
                    return e.isBeingDragged = !0, e.offsetY = t.pageY - e.slider.offset().top, e.pane.addClass("active"), 
                    e.doc.bind(c, e.events[r]).bind(h, e.events[v]), !1;
                },
                drag: function(t) {
                    return e.sliderY = t.pageY - e.$el.offset().top - e.offsetY, e.scroll(), e.contentScrollTop >= e.maxScrollTop && e.prevScrollTop !== e.maxScrollTop ? e.$el.trigger("scrollend") : 0 === e.contentScrollTop && 0 !== e.prevScrollTop && e.$el.trigger("scrolltop"), 
                    !1;
                },
                up: function() {
                    return e.isBeingDragged = !1, e.pane.removeClass("active"), e.doc.unbind(c, e.events[r]).unbind(h, e.events[v]), 
                    !1;
                },
                resize: function() {
                    e.reset();
                },
                panedown: function(t) {
                    return e.sliderY = (t.offsetY || t.originalEvent.layerY) - .5 * e.sliderHeight, 
                    e.scroll(), e.events.down(t), !1;
                },
                scroll: function(t) {
                    e.updateScrollValues(), e.isBeingDragged || (e.iOSNativeScrolling || (e.sliderY = e.sliderTop, 
                    e.setOnScrollStyles()), null != t && (e.contentScrollTop >= e.maxScrollTop ? (e.options.preventPageScrolling && e.preventScrolling(t, a), 
                    e.prevScrollTop !== e.maxScrollTop && e.$el.trigger("scrollend")) : 0 === e.contentScrollTop && (e.options.preventPageScrolling && e.preventScrolling(t, v), 
                    0 !== e.prevScrollTop && e.$el.trigger("scrolltop"))));
                },
                wheel: function(t) {
                    var i;
                    if (null != t) return (i = t.delta || t.wheelDelta || t.originalEvent && t.originalEvent.wheelDelta || -t.detail || t.originalEvent && -t.originalEvent.detail) && (e.sliderY += -i / 3), 
                    e.scroll(), !1;
                }
            };
        }, u.prototype.addEvents = function() {
            var e;
            this.removeEvents(), e = this.events, this.options.disableResize || this.win.bind(f, e[f]), 
            this.iOSNativeScrolling || (this.slider.bind(l, e[a]), this.pane.bind(l, e[p]).bind(d + " " + o, e[w])), 
            this.$content.bind(m + " " + d + " " + o + " " + g, e[m]);
        }, u.prototype.removeEvents = function() {
            var e;
            e = this.events, this.win.unbind(f, e[f]), this.iOSNativeScrolling || (this.slider.unbind(), 
            this.pane.unbind()), this.$content.unbind(m + " " + d + " " + o + " " + g, e[m]);
        }, u.prototype.generate = function() {
            var e, i, s, o, a;
            return s = this.options, o = s.paneClass, a = s.sliderClass, s.contentClass, this.$el.find("." + o).length || this.$el.find("." + a).length || this.$el.append('<div class="' + o + '"><div class="' + a + '" /></div>'), 
            this.pane = this.$el.children("." + o), this.slider = this.pane.find("." + a), 0 === n && S() ? (i = t.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/\D+/g, ""), 
            e = {
                right: -14,
                paddingRight: +i + 14
            }) : n && (e = {
                right: -n
            }, this.$el.addClass("has-scrollbar")), null != e && this.$content.css(e), this;
        }, u.prototype.restore = function() {
            this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents();
        }, u.prototype.reset = function() {
            var e, t, i, o, a, r, l, c, h, d;
            return this.iOSNativeScrolling ? void (this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), 
            this.stopped && this.restore(), e = this.content, i = e.style, o = i.overflowY, 
            s && this.$content.css({
                height: this.$content.height()
            }), t = e.scrollHeight + n, (h = parseInt(this.$el.css("max-height"), 10)) > 0 && (this.$el.height(""), 
            this.$el.height(e.scrollHeight > h ? h : e.scrollHeight)), r = this.pane.outerHeight(!1), 
            c = parseInt(this.pane.css("top"), 10), a = parseInt(this.pane.css("bottom"), 10), 
            l = r + c + a, d = Math.round(l / t * l), d < this.options.sliderMinHeight ? d = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && d > this.options.sliderMaxHeight && (d = this.options.sliderMaxHeight), 
            o === m && i.overflowX !== m && (d += n), this.maxSliderTop = l - d, this.contentHeight = t, 
            this.paneHeight = r, this.paneOuterHeight = l, this.sliderHeight = d, this.slider.height(d), 
            this.events.scroll(), this.pane.show(), this.isActive = !0, e.scrollHeight === e.clientHeight || this.pane.outerHeight(!0) >= e.scrollHeight && o !== m ? (this.pane.hide(), 
            this.isActive = !1) : this.el.clientHeight === e.scrollHeight && o === m ? this.slider.hide() : this.slider.show(), 
            this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible" : ""
            }), this);
        }, u.prototype.scroll = function() {
            return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), 
            this.$content.scrollTop((this.paneHeight - this.contentHeight + n) * this.sliderY / this.maxSliderTop * -1), 
            this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), 
            this) : void 0;
        }, u.prototype.scrollBottom = function(e) {
            return this.isActive ? (this.reset(), this.$content.scrollTop(this.contentHeight - this.$content.height() - e).trigger(d), 
            this) : void 0;
        }, u.prototype.scrollTop = function(e) {
            return this.isActive ? (this.reset(), this.$content.scrollTop(+e).trigger(d), this) : void 0;
        }, u.prototype.scrollTo = function(e) {
            return this.isActive ? (this.reset(), this.scrollTop(this.$el.find(e).get(0).offsetTop), 
            this) : void 0;
        }, u.prototype.stop = function() {
            return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, 
            this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this;
        }, u.prototype.destroy = function() {
            return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), 
            s && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), 
            this.$content.css({
                right: ""
            })), this;
        }, u.prototype.flash = function() {
            var e = this;
            if (!this.iOSNativeScrolling && this.isActive) return this.reset(), this.pane.addClass("flashed"), 
            setTimeout(function() {
                e.pane.removeClass("flashed");
            }, this.options.flashDelay), this;
        }, u;
    }(), e.fn.nanoScroller = function(t) {
        return this.each(function() {
            var i, s;
            if ((s = this.nanoscroller) || (i = e.extend({}, b, t), this.nanoscroller = s = new u(this, i)), 
            t && "object" == typeof t) {
                if (e.extend(s.options, t), null != t.scrollBottom) return s.scrollBottom(t.scrollBottom);
                if (null != t.scrollTop) return s.scrollTop(t.scrollTop);
                if (t.scrollTo) return s.scrollTo(t.scrollTo);
                if ("bottom" === t.scroll) return s.scrollBottom(0);
                if ("top" === t.scroll) return s.scrollTop(0);
                if (t.scroll && t.scroll instanceof e) return s.scrollTo(t.scroll);
                if (t.stop) return s.stop();
                if (t.destroy) return s.destroy();
                if (t.flash) return s.flash();
            }
            return s.reset();
        });
    }, e.fn.nanoScroller.Constructor = u;
}(jQuery, window, document), function(e, t, i, s) {
    function n(t, i) {
        this.element = t, this.options = e.extend({}, a, i), this._defaults = a, this._name = o, 
        this.init();
    }
    var o = "stellar", a = {
        scrollProperty: "scroll",
        positionProperty: "position",
        horizontalScrolling: !0,
        verticalScrolling: !0,
        horizontalOffset: 0,
        verticalOffset: 0,
        responsive: !1,
        parallaxBackgrounds: !0,
        parallaxElements: !0,
        hideDistantElements: !0,
        hideElement: function(e) {
            e.hide();
        },
        showElement: function(e) {
            e.show();
        }
    }, r = {
        scroll: {
            getLeft: function(e) {
                return e.scrollLeft();
            },
            setLeft: function(e, t) {
                e.scrollLeft(t);
            },
            getTop: function(e) {
                return e.scrollTop();
            },
            setTop: function(e, t) {
                e.scrollTop(t);
            }
        },
        position: {
            getLeft: function(e) {
                return -1 * parseInt(e.css("left"), 10);
            },
            getTop: function(e) {
                return -1 * parseInt(e.css("top"), 10);
            }
        },
        margin: {
            getLeft: function(e) {
                return -1 * parseInt(e.css("margin-left"), 10);
            },
            getTop: function(e) {
                return -1 * parseInt(e.css("margin-top"), 10);
            }
        },
        transform: {
            getLeft: function(e) {
                var t = getComputedStyle(e[0])[c];
                return "none" !== t ? -1 * parseInt(t.match(/(-?[0-9]+)/g)[4], 10) : 0;
            },
            getTop: function(e) {
                var t = getComputedStyle(e[0])[c];
                return "none" !== t ? -1 * parseInt(t.match(/(-?[0-9]+)/g)[5], 10) : 0;
            }
        }
    }, l = {
        position: {
            setLeft: function(e, t) {
                e.css("left", t);
            },
            setTop: function(e, t) {
                e.css("top", t);
            }
        },
        transform: {
            setPosition: function(e, t, i, s, n) {
                e[0].style[c] = "translate3d(" + (t - i) + "px, " + (s - n) + "px, 0)";
            }
        }
    }, c = function() {
        var t, i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/, s = e("script")[0].style, n = "";
        for (t in s) if (i.test(t)) {
            n = t.match(i)[0];
            break;
        }
        return "WebkitOpacity" in s && (n = "Webkit"), "KhtmlOpacity" in s && (n = "Khtml"), 
        function(e) {
            return n + (n.length > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e);
        };
    }()("transform"), h = e("<div />", {
        style: "background:#fff"
    }).css("background-position-x") !== s, d = h ? function(e, t, i) {
        e.css({
            "background-position-x": t,
            "background-position-y": i
        });
    } : function(e, t, i) {
        e.css("background-position", t + " " + i);
    }, u = h ? function(e) {
        return [ e.css("background-position-x"), e.css("background-position-y") ];
    } : function(e) {
        return e.css("background-position").split(" ");
    }, p = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
        setTimeout(e, 1e3 / 60);
    };
    n.prototype = {
        init: function() {
            this.options.name = o + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), 
            this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), 
            this._detectViewport(), this.refresh({
                firstLoad: !0
            }), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop();
        },
        _defineElements: function() {
            this.element === i.body && (this.element = t), this.$scrollElement = e(this.element), 
            this.$element = this.element === t ? e("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== s ? e(this.options.viewportElement) : this.$scrollElement[0] === t || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent();
        },
        _defineGetters: function() {
            var e = this, t = r[e.options.scrollProperty];
            this._getScrollLeft = function() {
                return t.getLeft(e.$scrollElement);
            }, this._getScrollTop = function() {
                return t.getTop(e.$scrollElement);
            };
        },
        _defineSetters: function() {
            var t = this, i = r[t.options.scrollProperty], s = l[t.options.positionProperty], n = i.setLeft, o = i.setTop;
            this._setScrollLeft = "function" == typeof n ? function(e) {
                n(t.$scrollElement, e);
            } : e.noop, this._setScrollTop = "function" == typeof o ? function(e) {
                o(t.$scrollElement, e);
            } : e.noop, this._setPosition = s.setPosition || function(e, i, n, o, a) {
                t.options.horizontalScrolling && s.setLeft(e, i, n), t.options.verticalScrolling && s.setTop(e, o, a);
            };
        },
        _handleWindowLoadAndResize: function() {
            var i = this, s = e(t);
            i.options.responsive && s.bind("load." + this.name, function() {
                i.refresh();
            }), s.bind("resize." + this.name, function() {
                i._detectViewport(), i.options.responsive && i.refresh();
            });
        },
        refresh: function(i) {
            var s = this, n = s._getScrollLeft(), o = s._getScrollTop();
            i && i.firstLoad || this._reset(), this._setScrollLeft(0), this._setScrollTop(0), 
            this._setOffsets(), this._findParticles(), this._findBackgrounds(), i && i.firstLoad && /WebKit/.test(navigator.userAgent) && e(t).load(function() {
                var e = s._getScrollLeft(), t = s._getScrollTop();
                s._setScrollLeft(e + 1), s._setScrollTop(t + 1), s._setScrollLeft(e), s._setScrollTop(t);
            }), this._setScrollLeft(n), this._setScrollTop(o);
        },
        _detectViewport: function() {
            var e = this.$viewportElement.offset(), t = null !== e && e !== s;
            this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), 
            this.viewportOffsetTop = t ? e.top : 0, this.viewportOffsetLeft = t ? e.left : 0;
        },
        _findParticles: function() {
            var t = this;
            if (this._getScrollLeft(), this._getScrollTop(), this.particles !== s) for (var i = this.particles.length - 1; i >= 0; i--) this.particles[i].$element.data("stellar-elementIsActive", s);
            this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function() {
                var i, n, o, a, r, l, c, h, d, u = e(this), p = 0, f = 0, m = 0, g = 0;
                if (u.data("stellar-elementIsActive")) {
                    if (u.data("stellar-elementIsActive") !== this) return;
                } else u.data("stellar-elementIsActive", this);
                t.options.showElement(u), u.data("stellar-startingLeft") ? (u.css("left", u.data("stellar-startingLeft")), 
                u.css("top", u.data("stellar-startingTop"))) : (u.data("stellar-startingLeft", u.css("left")), 
                u.data("stellar-startingTop", u.css("top"))), o = u.position().left, a = u.position().top, 
                r = "auto" === u.css("margin-left") ? 0 : parseInt(u.css("margin-left"), 10), l = "auto" === u.css("margin-top") ? 0 : parseInt(u.css("margin-top"), 10), 
                h = u.offset().left - r, d = u.offset().top - l, u.parents().each(function() {
                    var t = e(this);
                    return !0 === t.data("stellar-offset-parent") ? (p = m, f = g, c = t, !1) : (m += t.position().left, 
                    void (g += t.position().top));
                }), i = u.data("stellar-horizontal-offset") !== s ? u.data("stellar-horizontal-offset") : c !== s && c.data("stellar-horizontal-offset") !== s ? c.data("stellar-horizontal-offset") : t.horizontalOffset, 
                n = u.data("stellar-vertical-offset") !== s ? u.data("stellar-vertical-offset") : c !== s && c.data("stellar-vertical-offset") !== s ? c.data("stellar-vertical-offset") : t.verticalOffset, 
                t.particles.push({
                    $element: u,
                    $offsetParent: c,
                    isFixed: "fixed" === u.css("position"),
                    horizontalOffset: i,
                    verticalOffset: n,
                    startingPositionLeft: o,
                    startingPositionTop: a,
                    startingOffsetLeft: h,
                    startingOffsetTop: d,
                    parentOffsetLeft: p,
                    parentOffsetTop: f,
                    stellarRatio: u.data("stellar-ratio") !== s ? u.data("stellar-ratio") : 1,
                    width: u.outerWidth(!0),
                    height: u.outerHeight(!0),
                    isHidden: !1
                });
            });
        },
        _findBackgrounds: function() {
            var t, i = this, n = this._getScrollLeft(), o = this._getScrollTop();
            this.backgrounds = [], this.options.parallaxBackgrounds && (t = this.$element.find("[data-stellar-background-ratio]"), 
            this.$element.data("stellar-background-ratio") && (t = t.add(this.$element)), t.each(function() {
                var t, a, r, l, c, h, p, f = e(this), m = u(f), g = 0, v = 0, w = 0, y = 0;
                if (f.data("stellar-backgroundIsActive")) {
                    if (f.data("stellar-backgroundIsActive") !== this) return;
                } else f.data("stellar-backgroundIsActive", this);
                f.data("stellar-backgroundStartingLeft") ? d(f, f.data("stellar-backgroundStartingLeft"), f.data("stellar-backgroundStartingTop")) : (f.data("stellar-backgroundStartingLeft", m[0]), 
                f.data("stellar-backgroundStartingTop", m[1])), r = "auto" === f.css("margin-left") ? 0 : parseInt(f.css("margin-left"), 10), 
                l = "auto" === f.css("margin-top") ? 0 : parseInt(f.css("margin-top"), 10), c = f.offset().left - r - n, 
                h = f.offset().top - l - o, f.parents().each(function() {
                    var t = e(this);
                    return !0 === t.data("stellar-offset-parent") ? (g = w, v = y, p = t, !1) : (w += t.position().left, 
                    void (y += t.position().top));
                }), t = f.data("stellar-horizontal-offset") !== s ? f.data("stellar-horizontal-offset") : p !== s && p.data("stellar-horizontal-offset") !== s ? p.data("stellar-horizontal-offset") : i.horizontalOffset, 
                a = f.data("stellar-vertical-offset") !== s ? f.data("stellar-vertical-offset") : p !== s && p.data("stellar-vertical-offset") !== s ? p.data("stellar-vertical-offset") : i.verticalOffset, 
                i.backgrounds.push({
                    $element: f,
                    $offsetParent: p,
                    isFixed: "fixed" === f.css("background-attachment"),
                    horizontalOffset: t,
                    verticalOffset: a,
                    startingValueLeft: m[0],
                    startingValueTop: m[1],
                    startingBackgroundPositionLeft: isNaN(parseInt(m[0], 10)) ? 0 : parseInt(m[0], 10),
                    startingBackgroundPositionTop: isNaN(parseInt(m[1], 10)) ? 0 : parseInt(m[1], 10),
                    startingPositionLeft: f.position().left,
                    startingPositionTop: f.position().top,
                    startingOffsetLeft: c,
                    startingOffsetTop: h,
                    parentOffsetLeft: g,
                    parentOffsetTop: v,
                    stellarRatio: f.data("stellar-background-ratio") === s ? 1 : f.data("stellar-background-ratio")
                });
            }));
        },
        _reset: function() {
            var e, t, i, s, n;
            for (n = this.particles.length - 1; n >= 0; n--) e = this.particles[n], t = e.$element.data("stellar-startingLeft"), 
            i = e.$element.data("stellar-startingTop"), this._setPosition(e.$element, t, t, i, i), 
            this.options.showElement(e.$element), e.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
            for (n = this.backgrounds.length - 1; n >= 0; n--) (s = this.backgrounds[n]).$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), 
            d(s.$element, s.startingValueLeft, s.startingValueTop);
        },
        destroy: function() {
            this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), 
            this._animationLoop = e.noop, e(t).unbind("load." + this.name).unbind("resize." + this.name);
        },
        _setOffsets: function() {
            var i = this, s = e(t);
            s.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), 
            "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), 
            s.bind("resize.horizontal-" + this.name, function() {
                i.horizontalOffset = i.options.horizontalOffset();
            })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), 
            s.bind("resize.vertical-" + this.name, function() {
                i.verticalOffset = i.options.verticalOffset();
            })) : this.verticalOffset = this.options.verticalOffset;
        },
        _repositionElements: function() {
            var e, t, i, s, n, o, a, r, l, c, h = this._getScrollLeft(), u = this._getScrollTop(), p = !0, f = !0;
            if (this.currentScrollLeft !== h || this.currentScrollTop !== u || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
                for (this.currentScrollLeft = h, this.currentScrollTop = u, this.currentWidth = this.viewportWidth, 
                this.currentHeight = this.viewportHeight, c = this.particles.length - 1; c >= 0; c--) e = this.particles[c], 
                t = e.isFixed ? 1 : 0, this.options.horizontalScrolling ? (o = (h + e.horizontalOffset + this.viewportOffsetLeft + e.startingPositionLeft - e.startingOffsetLeft + e.parentOffsetLeft) * -(e.stellarRatio + t - 1) + e.startingPositionLeft, 
                r = o - e.startingPositionLeft + e.startingOffsetLeft) : (o = e.startingPositionLeft, 
                r = e.startingOffsetLeft), this.options.verticalScrolling ? (a = (u + e.verticalOffset + this.viewportOffsetTop + e.startingPositionTop - e.startingOffsetTop + e.parentOffsetTop) * -(e.stellarRatio + t - 1) + e.startingPositionTop, 
                l = a - e.startingPositionTop + e.startingOffsetTop) : (a = e.startingPositionTop, 
                l = e.startingOffsetTop), this.options.hideDistantElements && (f = !this.options.horizontalScrolling || r + e.width > (e.isFixed ? 0 : h) && r < (e.isFixed ? 0 : h) + this.viewportWidth + this.viewportOffsetLeft, 
                p = !this.options.verticalScrolling || l + e.height > (e.isFixed ? 0 : u) && l < (e.isFixed ? 0 : u) + this.viewportHeight + this.viewportOffsetTop), 
                f && p ? (e.isHidden && (this.options.showElement(e.$element), e.isHidden = !1), 
                this._setPosition(e.$element, o, e.startingPositionLeft, a, e.startingPositionTop)) : e.isHidden || (this.options.hideElement(e.$element), 
                e.isHidden = !0);
                for (c = this.backgrounds.length - 1; c >= 0; c--) i = this.backgrounds[c], t = i.isFixed ? 0 : 1, 
                s = this.options.horizontalScrolling ? (h + i.horizontalOffset - this.viewportOffsetLeft - i.startingOffsetLeft + i.parentOffsetLeft - i.startingBackgroundPositionLeft) * (t - i.stellarRatio) + "px" : i.startingValueLeft, 
                n = this.options.verticalScrolling ? (u + i.verticalOffset - this.viewportOffsetTop - i.startingOffsetTop + i.parentOffsetTop - i.startingBackgroundPositionTop) * (t - i.stellarRatio) + "px" : i.startingValueTop, 
                d(i.$element, s, n);
            }
        },
        _handleScrollEvent: function() {
            var e = this, t = !1, i = function() {
                e._repositionElements(), t = !1;
            }, s = function() {
                t || (p(i), t = !0);
            };
            this.$scrollElement.bind("scroll." + this.name, s), s();
        },
        _startAnimationLoop: function() {
            var e = this;
            this._animationLoop = function() {
                p(e._animationLoop), e._repositionElements();
            }, this._animationLoop();
        }
    }, e.fn[o] = function(t) {
        var i = arguments;
        return t === s || "object" == typeof t ? this.each(function() {
            e.data(this, "plugin_" + o) || e.data(this, "plugin_" + o, new n(this, t));
        }) : "string" == typeof t && "_" !== t[0] && "init" !== t ? this.each(function() {
            var s = e.data(this, "plugin_" + o);
            s instanceof n && "function" == typeof s[t] && s[t].apply(s, Array.prototype.slice.call(i, 1)), 
            "destroy" === t && e.data(this, "plugin_" + o, null);
        }) : void 0;
    }, e[o] = function() {
        var i = e(t);
        return i.stellar.apply(i, Array.prototype.slice.call(arguments, 0));
    }, e[o].scrollProperty = r, e[o].positionProperty = l, t.Stellar = n;
}(jQuery, this, document), function(e) {
    function t(e) {
        var t = e.length, s = i.type(e);
        return "function" !== s && !i.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === s || 0 === t || "number" == typeof t && t > 0 && t - 1 in e));
    }
    if (!e.jQuery) {
        var i = function(e, t) {
            return new i.fn.init(e, t);
        };
        i.isWindow = function(e) {
            return null != e && e == e.window;
        }, i.type = function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[a.call(e)] || "object" : typeof e;
        }, i.isArray = Array.isArray || function(e) {
            return "array" === i.type(e);
        }, i.isPlainObject = function(e) {
            var t;
            if (!e || "object" !== i.type(e) || e.nodeType || i.isWindow(e)) return !1;
            try {
                if (e.constructor && !o.call(e, "constructor") && !o.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            for (t in e) ;
            return void 0 === t || o.call(e, t);
        }, i.each = function(e, i, s) {
            var n = 0, o = e.length, a = t(e);
            if (s) {
                if (a) for (;o > n && !1 !== i.apply(e[n], s); n++) ; else for (n in e) if (!1 === i.apply(e[n], s)) break;
            } else if (a) for (;o > n && !1 !== i.call(e[n], n, e[n]); n++) ; else for (n in e) if (!1 === i.call(e[n], n, e[n])) break;
            return e;
        }, i.data = function(e, t, n) {
            if (void 0 === n) {
                var o = (a = e[i.expando]) && s[a];
                if (void 0 === t) return o;
                if (o && t in o) return o[t];
            } else if (void 0 !== t) {
                var a = e[i.expando] || (e[i.expando] = ++i.uuid);
                return s[a] = s[a] || {}, s[a][t] = n, n;
            }
        }, i.removeData = function(e, t) {
            var n = e[i.expando], o = n && s[n];
            o && i.each(t, function(e, t) {
                delete o[t];
            });
        }, i.extend = function() {
            var e, t, s, n, o, a, r = arguments[0] || {}, l = 1, c = arguments.length, h = !1;
            for ("boolean" == typeof r && (h = r, r = arguments[l] || {}, l++), "object" != typeof r && "function" !== i.type(r) && (r = {}), 
            l === c && (r = this, l--); c > l; l++) if (null != (o = arguments[l])) for (n in o) e = r[n], 
            s = o[n], r !== s && (h && s && (i.isPlainObject(s) || (t = i.isArray(s))) ? (t ? (t = !1, 
            a = e && i.isArray(e) ? e : []) : a = e && i.isPlainObject(e) ? e : {}, r[n] = i.extend(h, a, s)) : void 0 !== s && (r[n] = s));
            return r;
        }, i.queue = function(e, s, n) {
            if (e) {
                s = (s || "fx") + "queue";
                var o = i.data(e, s);
                return n ? (!o || i.isArray(n) ? o = i.data(e, s, function(e, i) {
                    var s = i || [];
                    return null != e && (t(Object(e)) ? function(e, t) {
                        for (var i = +t.length, s = 0, n = e.length; i > s; ) e[n++] = t[s++];
                        if (i !== i) for (;void 0 !== t[s]; ) e[n++] = t[s++];
                        e.length = n;
                    }(s, "string" == typeof e ? [ e ] : e) : [].push.call(s, e)), s;
                }(n)) : o.push(n), o) : o || [];
            }
        }, i.dequeue = function(e, t) {
            i.each(e.nodeType ? [ e ] : e, function(e, s) {
                t = t || "fx";
                var n = i.queue(s, t), o = n.shift();
                "inprogress" === o && (o = n.shift()), o && ("fx" === t && n.unshift("inprogress"), 
                o.call(s, function() {
                    i.dequeue(s, t);
                }));
            });
        }, i.fn = i.prototype = {
            init: function(e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.");
            },
            offset: function() {
                var t = this[0].getBoundingClientRect();
                return {
                    top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                };
            },
            position: function() {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position; ) e = e.offsetParent;
                    return e || document;
                }
                var t = this[0], e = e.apply(t), s = this.offset(), n = /^(?:body|html)$/i.test(e.nodeName) ? {
                    top: 0,
                    left: 0
                } : i(e).offset();
                return s.top -= parseFloat(t.style.marginTop) || 0, s.left -= parseFloat(t.style.marginLeft) || 0, 
                e.style && (n.top += parseFloat(e.style.borderTopWidth) || 0, n.left += parseFloat(e.style.borderLeftWidth) || 0), 
                {
                    top: s.top - n.top,
                    left: s.left - n.left
                };
            }
        };
        var s = {};
        i.expando = "velocity" + new Date().getTime(), i.uuid = 0;
        for (var n = {}, o = n.hasOwnProperty, a = n.toString, r = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < r.length; l++) n["[object " + r[l] + "]"] = r[l].toLowerCase();
        i.fn.init.prototype = i.fn, e.Velocity = {
            Utilities: i
        };
    }
}(window), function(e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e();
}(function() {
    return function(e, t, i, s) {
        function n(e) {
            for (var t = -1, i = e ? e.length : 0, s = []; ++t < i; ) {
                var n = e[t];
                n && s.push(n);
            }
            return s;
        }
        function o(e) {
            return m.isWrapped(e) ? e = [].slice.call(e) : m.isNode(e) && (e = [ e ]), e;
        }
        function a(e) {
            var t = u.data(e, "velocity");
            return null === t ? s : t;
        }
        function r(e) {
            return function(t) {
                return Math.round(t * e) * (1 / e);
            };
        }
        function l(e, i, s, n) {
            function o(e, t) {
                return 1 - 3 * t + 3 * e;
            }
            function a(e, t) {
                return 3 * t - 6 * e;
            }
            function r(e) {
                return 3 * e;
            }
            function l(e, t, i) {
                return ((o(t, i) * e + a(t, i)) * e + r(t)) * e;
            }
            function c(e, t, i) {
                return 3 * o(t, i) * e * e + 2 * a(t, i) * e + r(t);
            }
            function h(t, i) {
                for (var n = 0; m > n; ++n) {
                    var o = c(i, e, s);
                    if (0 === o) return i;
                    i -= (l(i, e, s) - t) / o;
                }
                return i;
            }
            function d() {
                for (var t = 0; y > t; ++t) S[t] = l(t * b, e, s);
            }
            function u(t, i, n) {
                var o, a, r = 0;
                do {
                    a = i + (n - i) / 2, o = l(a, e, s) - t, o > 0 ? n = a : i = a;
                } while (Math.abs(o) > v && ++r < w);
                return a;
            }
            function p(t) {
                for (var i = 0, n = 1, o = y - 1; n != o && S[n] <= t; ++n) i += b;
                var a = i + (t - S[--n]) / (S[n + 1] - S[n]) * b, r = c(a, e, s);
                return r >= g ? h(t, a) : 0 == r ? a : u(t, i, i + b);
            }
            function f() {
                C = !0, (e != i || s != n) && d();
            }
            var m = 4, g = .001, v = 1e-7, w = 10, y = 11, b = 1 / (y - 1), _ = "Float32Array" in t;
            if (4 !== arguments.length) return !1;
            for (var x = 0; 4 > x; ++x) if ("number" != typeof arguments[x] || isNaN(arguments[x]) || !isFinite(arguments[x])) return !1;
            e = Math.min(e, 1), s = Math.min(s, 1), e = Math.max(e, 0), s = Math.max(s, 0);
            var S = _ ? new Float32Array(y) : new Array(y), C = !1, T = function(t) {
                return C || f(), e === i && s === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(p(t), i, n);
            };
            T.getControlPoints = function() {
                return [ {
                    x: e,
                    y: i
                }, {
                    x: s,
                    y: n
                } ];
            };
            var k = "generateBezier(" + [ e, i, s, n ] + ")";
            return T.toString = function() {
                return k;
            }, T;
        }
        function c(e, t) {
            var i = e;
            return m.isString(e) ? y.Easings[e] || (i = !1) : i = m.isArray(e) && 1 === e.length ? r.apply(null, e) : m.isArray(e) && 2 === e.length ? b.apply(null, e.concat([ t ])) : !(!m.isArray(e) || 4 !== e.length) && l.apply(null, e), 
            !1 === i && (i = y.Easings[y.defaults.easing] ? y.defaults.easing : w), i;
        }
        function h(e) {
            if (e) for (var t = new Date().getTime(), i = 0, n = y.State.calls.length; n > i; i++) if (y.State.calls[i]) {
                var o = y.State.calls[i], r = o[0], l = o[2], c = o[3];
                c || (c = y.State.calls[i][3] = t - 16);
                for (var p = Math.min((t - c) / l.duration, 1), f = 0, g = r.length; g > f; f++) {
                    var v = r[f], w = v.element;
                    if (a(w)) {
                        var b = !1;
                        if (l.display !== s && null !== l.display && "none" !== l.display) {
                            if ("flex" === l.display) {
                                var x = [ "-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex" ];
                                u.each(x, function(e, t) {
                                    _.setPropertyValue(w, "display", t);
                                });
                            }
                            _.setPropertyValue(w, "display", l.display);
                        }
                        l.visibility && "hidden" !== l.visibility && _.setPropertyValue(w, "visibility", l.visibility);
                        for (var C in v) if ("element" !== C) {
                            var T, k = v[C], E = m.isString(k.easing) ? y.Easings[k.easing] : k.easing;
                            if (T = 1 === p ? k.endValue : k.startValue + (k.endValue - k.startValue) * E(p), 
                            k.currentValue = T, _.Hooks.registered[C]) {
                                var P = _.Hooks.getRoot(C), z = a(w).rootPropertyValueCache[P];
                                z && (k.rootPropertyValue = z);
                            }
                            var I = _.setPropertyValue(w, C, k.currentValue + (0 === parseFloat(T) ? "" : k.unitType), k.rootPropertyValue, k.scrollData);
                            _.Hooks.registered[C] && (a(w).rootPropertyValueCache[P] = _.Normalizations.registered[P] ? _.Normalizations.registered[P]("extract", null, I[1]) : I[1]), 
                            "transform" === I[0] && (b = !0);
                        }
                        l.mobileHA && a(w).transformCache.translate3d === s && (a(w).transformCache.translate3d = "(0px, 0px, 0px)", 
                        b = !0), b && _.flushTransformCache(w);
                    }
                }
                l.display !== s && "none" !== l.display && (y.State.calls[i][2].display = !1), l.visibility && "hidden" !== l.visibility && (y.State.calls[i][2].visibility = !1), 
                l.progress && l.progress.call(o[1], o[1], p, Math.max(0, c + l.duration - t), c), 
                1 === p && d(i);
            }
            y.State.isTicking && S(h);
        }
        function d(e, t) {
            if (!y.State.calls[e]) return !1;
            for (var i = y.State.calls[e][0], n = y.State.calls[e][1], o = y.State.calls[e][2], r = y.State.calls[e][4], l = !1, c = 0, h = i.length; h > c; c++) {
                var d = i[c].element;
                if (t || o.loop || ("none" === o.display && _.setPropertyValue(d, "display", o.display), 
                "hidden" === o.visibility && _.setPropertyValue(d, "visibility", o.visibility)), 
                (u.queue(d)[1] === s || !/\.velocityQueueEntryFlag/i.test(u.queue(d)[1])) && a(d)) {
                    a(d).isAnimating = !1, a(d).rootPropertyValueCache = {};
                    var p = !1;
                    u.each(_.Lists.transforms3D, function(e, t) {
                        var i = /^scale/.test(t) ? 1 : 0, n = a(d).transformCache[t];
                        a(d).transformCache[t] !== s && new RegExp("^\\(" + i + "[^.]").test(n) && (p = !0, 
                        delete a(d).transformCache[t]);
                    }), o.mobileHA && (p = !0, delete a(d).transformCache.translate3d), p && _.flushTransformCache(d), 
                    _.Values.removeClass(d, "velocity-animating");
                }
                if (!t && o.complete && !o.loop && c === h - 1) try {
                    o.complete.call(n, n);
                } catch (e) {
                    setTimeout(function() {
                        throw e;
                    }, 1);
                }
                r && !0 !== o.loop && r(n), !0 !== o.loop || t || (u.each(a(d).tweensContainer, function(e, t) {
                    /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360);
                }), y(d, "reverse", {
                    loop: !0,
                    delay: o.delay
                })), !1 !== o.queue && u.dequeue(d, o.queue);
            }
            y.State.calls[e] = !1;
            for (var f = 0, m = y.State.calls.length; m > f; f++) if (!1 !== y.State.calls[f]) {
                l = !0;
                break;
            }
            !1 === l && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = []);
        }
        var u, p = function() {
            if (i.documentMode) return i.documentMode;
            for (var e = 7; e > 4; e--) {
                var t = i.createElement("div");
                if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, 
                e;
            }
            return s;
        }(), f = function() {
            var e = 0;
            return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                var i, s = new Date().getTime();
                return i = Math.max(0, 16 - (s - e)), e = s + i, setTimeout(function() {
                    t(s + i);
                }, i);
            };
        }(), m = {
            isString: function(e) {
                return "string" == typeof e;
            },
            isArray: Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            },
            isFunction: function(e) {
                return "[object Function]" === Object.prototype.toString.call(e);
            },
            isNode: function(e) {
                return e && e.nodeType;
            },
            isNodeList: function(e) {
                return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== s && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0);
            },
            isWrapped: function(e) {
                return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e));
            },
            isSVG: function(e) {
                return t.SVGElement && e instanceof SVGElement;
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0;
            }
        }, g = !1;
        if (e.fn && e.fn.jquery ? (u = e, g = !0) : u = t.Velocity.Utilities, 8 >= p && !g) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        {
            if (!(7 >= p)) {
                var v = 400, w = "swing", y = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: t.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: i.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: u,
                    Sequences: {},
                    Easings: {},
                    Promise: t.Promise,
                    defaults: {
                        queue: "",
                        duration: v,
                        easing: w,
                        begin: null,
                        complete: null,
                        progress: null,
                        display: s,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function(e) {
                        u.data(e, "velocity", {
                            isSVG: m.isSVG(e),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        });
                    },
                    animate: null,
                    hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 0,
                        patch: 0
                    },
                    debug: !1
                };
                t.pageYOffset !== s ? (y.State.scrollAnchor = t, y.State.scrollPropertyLeft = "pageXOffset", 
                y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = i.documentElement || i.body.parentNode || i.body, 
                y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop");
                var b = function() {
                    function e(e) {
                        return -e.tension * e.x - e.friction * e.v;
                    }
                    function t(t, i, s) {
                        var n = {
                            x: t.x + s.dx * i,
                            v: t.v + s.dv * i,
                            tension: t.tension,
                            friction: t.friction
                        };
                        return {
                            dx: n.v,
                            dv: e(n)
                        };
                    }
                    function i(i, s) {
                        var n = {
                            dx: i.v,
                            dv: e(i)
                        }, o = t(i, .5 * s, n), a = t(i, .5 * s, o), r = t(i, s, a), l = 1 / 6 * (n.dx + 2 * (o.dx + a.dx) + r.dx), c = 1 / 6 * (n.dv + 2 * (o.dv + a.dv) + r.dv);
                        return i.x = i.x + l * s, i.v = i.v + c * s, i;
                    }
                    return function e(t, s, n) {
                        var o, a, r, l = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        }, c = [ 0 ], h = 0;
                        for (t = parseFloat(t) || 500, s = parseFloat(s) || 20, n = n || null, l.tension = t, 
                        l.friction = s, (o = null !== n) ? (h = e(t, s), a = h / n * .016) : a = .016; r = i(r || l, a), 
                        c.push(1 + r.x), h += 16, Math.abs(r.x) > 1e-4 && Math.abs(r.v) > 1e-4; ) ;
                        return o ? function(e) {
                            return c[e * (c.length - 1) | 0];
                        } : h;
                    };
                }();
                y.Easings = {
                    linear: function(e) {
                        return e;
                    },
                    swing: function(e) {
                        return .5 - Math.cos(e * Math.PI) / 2;
                    },
                    spring: function(e) {
                        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
                    }
                }, u.each([ [ "ease", [ .25, .1, .25, 1 ] ], [ "ease-in", [ .42, 0, 1, 1 ] ], [ "ease-out", [ 0, 0, .58, 1 ] ], [ "ease-in-out", [ .42, 0, .58, 1 ] ], [ "easeInSine", [ .47, 0, .745, .715 ] ], [ "easeOutSine", [ .39, .575, .565, 1 ] ], [ "easeInOutSine", [ .445, .05, .55, .95 ] ], [ "easeInQuad", [ .55, .085, .68, .53 ] ], [ "easeOutQuad", [ .25, .46, .45, .94 ] ], [ "easeInOutQuad", [ .455, .03, .515, .955 ] ], [ "easeInCubic", [ .55, .055, .675, .19 ] ], [ "easeOutCubic", [ .215, .61, .355, 1 ] ], [ "easeInOutCubic", [ .645, .045, .355, 1 ] ], [ "easeInQuart", [ .895, .03, .685, .22 ] ], [ "easeOutQuart", [ .165, .84, .44, 1 ] ], [ "easeInOutQuart", [ .77, 0, .175, 1 ] ], [ "easeInQuint", [ .755, .05, .855, .06 ] ], [ "easeOutQuint", [ .23, 1, .32, 1 ] ], [ "easeInOutQuint", [ .86, 0, .07, 1 ] ], [ "easeInExpo", [ .95, .05, .795, .035 ] ], [ "easeOutExpo", [ .19, 1, .22, 1 ] ], [ "easeInOutExpo", [ 1, 0, 0, 1 ] ], [ "easeInCirc", [ .6, .04, .98, .335 ] ], [ "easeOutCirc", [ .075, .82, .165, 1 ] ], [ "easeInOutCirc", [ .785, .135, .15, .86 ] ] ], function(e, t) {
                    y.Easings[t[0]] = l.apply(null, t[1]);
                });
                var _ = y.CSS = {
                    RegEx: {
                        isHex: /^#([A-f\d]{3}){1,2}$/i,
                        valueUnwrap: /^[A-z]+\((.*)\)$/i,
                        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                    },
                    Lists: {
                        colors: [ "fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor" ],
                        transformsBase: [ "translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ" ],
                        transforms3D: [ "transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY" ]
                    },
                    Hooks: {
                        templates: {
                            textShadow: [ "Color X Y Blur", "black 0px 0px 0px" ],
                            boxShadow: [ "Color X Y Blur Spread", "black 0px 0px 0px 0px" ],
                            clip: [ "Top Right Bottom Left", "0px 0px 0px 0px" ],
                            backgroundPosition: [ "X Y", "0% 0%" ],
                            transformOrigin: [ "X Y Z", "50% 50% 0px" ],
                            perspectiveOrigin: [ "X Y", "50% 50%" ]
                        },
                        registered: {},
                        register: function() {
                            for (n = 0; n < _.Lists.colors.length; n++) _.Hooks.templates[_.Lists.colors[n]] = [ "Red Green Blue Alpha", "255 255 255 1" ];
                            var e, t, i;
                            if (p) for (e in _.Hooks.templates) {
                                i = (t = _.Hooks.templates[e])[0].split(" ");
                                var s = t[1].match(_.RegEx.valueSplit);
                                "Color" === i[0] && (i.push(i.shift()), s.push(s.shift()), _.Hooks.templates[e] = [ i.join(" "), s.join(" ") ]);
                            }
                            for (e in _.Hooks.templates) {
                                i = (t = _.Hooks.templates[e])[0].split(" ");
                                for (var n in i) {
                                    var o = e + i[n], a = n;
                                    _.Hooks.registered[o] = [ e, a ];
                                }
                            }
                        },
                        getRoot: function(e) {
                            var t = _.Hooks.registered[e];
                            return t ? t[0] : e;
                        },
                        cleanRootPropertyValue: function(e, t) {
                            return _.RegEx.valueUnwrap.test(t) && (t = t.match(_.Hooks.RegEx.valueUnwrap)[1]), 
                            _.Values.isCSSNullValue(t) && (t = _.Hooks.templates[e][1]), t;
                        },
                        extractValue: function(e, t) {
                            var i = _.Hooks.registered[e];
                            if (i) {
                                var s = i[0], n = i[1];
                                return (t = _.Hooks.cleanRootPropertyValue(s, t)).toString().match(_.RegEx.valueSplit)[n];
                            }
                            return t;
                        },
                        injectValue: function(e, t, i) {
                            var s = _.Hooks.registered[e];
                            if (s) {
                                var n, o = s[0], a = s[1];
                                return i = _.Hooks.cleanRootPropertyValue(o, i), n = i.toString().match(_.RegEx.valueSplit), 
                                n[a] = t, n.join(" ");
                            }
                            return i;
                        }
                    },
                    Normalizations: {
                        registered: {
                            clip: function(e, t, i) {
                                switch (e) {
                                  case "name":
                                    return "clip";

                                  case "extract":
                                    var s;
                                    return _.RegEx.wrappedValueAlreadyExtracted.test(i) ? s = i : (s = i.toString().match(_.RegEx.valueUnwrap), 
                                    s = s ? s[1].replace(/,(\s+)?/g, " ") : i), s;

                                  case "inject":
                                    return "rect(" + i + ")";
                                }
                            },
                            opacity: function(e, t, i) {
                                if (8 >= p) switch (e) {
                                  case "name":
                                    return "filter";

                                  case "extract":
                                    var s = i.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return i = s ? s[1] / 100 : 1;

                                  case "inject":
                                    return t.style.zoom = 1, parseFloat(i) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(i), 10) + ")";
                                } else switch (e) {
                                  case "name":
                                    return "opacity";

                                  case "extract":
                                  case "inject":
                                    return i;
                                }
                            }
                        },
                        register: function() {
                            9 >= p || y.State.isGingerbread || (_.Lists.transformsBase = _.Lists.transformsBase.concat(_.Lists.transforms3D));
                            for (e = 0; e < _.Lists.transformsBase.length; e++) !function() {
                                var t = _.Lists.transformsBase[e];
                                _.Normalizations.registered[t] = function(e, i, n) {
                                    switch (e) {
                                      case "name":
                                        return "transform";

                                      case "extract":
                                        return a(i) === s || a(i).transformCache[t] === s ? /^scale/i.test(t) ? 1 : 0 : a(i).transformCache[t].replace(/[()]/g, "");

                                      case "inject":
                                        var o = !1;
                                        switch (t.substr(0, t.length - 1)) {
                                          case "translate":
                                            o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);
                                            break;

                                          case "scal":
                                          case "scale":
                                            y.State.isAndroid && a(i).transformCache[t] === s && 1 > n && (n = 1), o = !/(\d)$/i.test(n);
                                            break;

                                          case "skew":
                                            o = !/(deg|\d)$/i.test(n);
                                            break;

                                          case "rotate":
                                            o = !/(deg|\d)$/i.test(n);
                                        }
                                        return o || (a(i).transformCache[t] = "(" + n + ")"), a(i).transformCache[t];
                                    }
                                };
                            }();
                            for (var e = 0; e < _.Lists.colors.length; e++) !function() {
                                var t = _.Lists.colors[e];
                                _.Normalizations.registered[t] = function(e, i, n) {
                                    switch (e) {
                                      case "name":
                                        return t;

                                      case "extract":
                                        var o;
                                        if (_.RegEx.wrappedValueAlreadyExtracted.test(n)) o = n; else {
                                            var a, r = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                            /^[A-z]+$/i.test(n) ? a = r[n] !== s ? r[n] : r.black : _.RegEx.isHex.test(n) ? a = "rgb(" + _.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (a = r.black), 
                                            o = (a || n).toString().match(_.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                                        }
                                        return 8 >= p || 3 !== o.split(" ").length || (o += " 1"), o;

                                      case "inject":
                                        return 8 >= p ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), 
                                        (8 >= p ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                                    }
                                };
                            }();
                        }
                    },
                    Names: {
                        camelCase: function(e) {
                            return e.replace(/-(\w)/g, function(e, t) {
                                return t.toUpperCase();
                            });
                        },
                        SVGAttribute: function(e) {
                            var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                            return (p || y.State.isAndroid && !y.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e);
                        },
                        prefixCheck: function(e) {
                            if (y.State.prefixMatches[e]) return [ y.State.prefixMatches[e], !0 ];
                            for (var t = [ "", "Webkit", "Moz", "ms", "O" ], i = 0, s = t.length; s > i; i++) {
                                var n;
                                if (n = 0 === i ? e : t[i] + e.replace(/^\w/, function(e) {
                                    return e.toUpperCase();
                                }), m.isString(y.State.prefixElement.style[n])) return y.State.prefixMatches[e] = n, 
                                [ n, !0 ];
                            }
                            return [ e, !1 ];
                        }
                    },
                    Values: {
                        hexToRgb: function(e) {
                            var t, i = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                            return e = e.replace(i, function(e, t, i, s) {
                                return t + t + i + i + s + s;
                            }), t = s.exec(e), t ? [ parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16) ] : [ 0, 0, 0 ];
                        },
                        isCSSNullValue: function(e) {
                            return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e);
                        },
                        getUnitType: function(e) {
                            return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px";
                        },
                        getDisplayType: function(e) {
                            var t = e.tagName.toString().toLowerCase();
                            return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : "block";
                        },
                        addClass: function(e, t) {
                            e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t;
                        },
                        removeClass: function(e, t) {
                            e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                        }
                    },
                    getPropertyValue: function(e, i, n, o) {
                        function r(e, i) {
                            function n() {
                                c && _.setPropertyValue(e, "display", "none");
                            }
                            var l = 0;
                            if (8 >= p) l = u.css(e, i); else {
                                var c = !1;
                                if (/^(width|height)$/.test(i) && 0 === _.getPropertyValue(e, "display") && (c = !0, 
                                _.setPropertyValue(e, "display", _.Values.getDisplayType(e))), !o) {
                                    if ("height" === i && "border-box" !== _.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                        var h = e.offsetHeight - (parseFloat(_.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(_.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(_.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(_.getPropertyValue(e, "paddingBottom")) || 0);
                                        return n(), h;
                                    }
                                    if ("width" === i && "border-box" !== _.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                        var d = e.offsetWidth - (parseFloat(_.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(_.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(_.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(_.getPropertyValue(e, "paddingRight")) || 0);
                                        return n(), d;
                                    }
                                }
                                var f;
                                f = a(e) === s ? t.getComputedStyle(e, null) : a(e).computedStyle ? a(e).computedStyle : a(e).computedStyle = t.getComputedStyle(e, null), 
                                (p || y.State.isFirefox) && "borderColor" === i && (i = "borderTopColor"), ("" === (l = 9 === p && "filter" === i ? f.getPropertyValue(i) : f[i]) || null === l) && (l = e.style[i]), 
                                n();
                            }
                            if ("auto" === l && /^(top|right|bottom|left)$/i.test(i)) {
                                var m = r(e, "position");
                                ("fixed" === m || "absolute" === m && /top|left/i.test(i)) && (l = u(e).position()[i] + "px");
                            }
                            return l;
                        }
                        var l;
                        if (_.Hooks.registered[i]) {
                            var c = i, h = _.Hooks.getRoot(c);
                            n === s && (n = _.getPropertyValue(e, _.Names.prefixCheck(h)[0])), _.Normalizations.registered[h] && (n = _.Normalizations.registered[h]("extract", e, n)), 
                            l = _.Hooks.extractValue(c, n);
                        } else if (_.Normalizations.registered[i]) {
                            var d, f;
                            "transform" !== (d = _.Normalizations.registered[i]("name", e)) && (f = r(e, _.Names.prefixCheck(d)[0]), 
                            _.Values.isCSSNullValue(f) && _.Hooks.templates[i] && (f = _.Hooks.templates[i][1])), 
                            l = _.Normalizations.registered[i]("extract", e, f);
                        }
                        return /^[\d-]/.test(l) || (l = a(e) && a(e).isSVG && _.Names.SVGAttribute(i) ? /^(height|width)$/i.test(i) ? e.getBBox()[i] : e.getAttribute(i) : r(e, _.Names.prefixCheck(i)[0])), 
                        _.Values.isCSSNullValue(l) && (l = 0), y.debug >= 2 && console.log("Get " + i + ": " + l), 
                        l;
                    },
                    setPropertyValue: function(e, i, s, n, o) {
                        var r = i;
                        if ("scroll" === i) o.container ? o.container["scroll" + o.direction] = s : "Left" === o.direction ? t.scrollTo(s, o.alternateValue) : t.scrollTo(o.alternateValue, s); else if (_.Normalizations.registered[i] && "transform" === _.Normalizations.registered[i]("name", e)) _.Normalizations.registered[i]("inject", e, s), 
                        r = "transform", s = a(e).transformCache[i]; else {
                            if (_.Hooks.registered[i]) {
                                var l = i, c = _.Hooks.getRoot(i);
                                n = n || _.getPropertyValue(e, c), s = _.Hooks.injectValue(l, s, n), i = c;
                            }
                            if (_.Normalizations.registered[i] && (s = _.Normalizations.registered[i]("inject", e, s), 
                            i = _.Normalizations.registered[i]("name", e)), r = _.Names.prefixCheck(i)[0], 8 >= p) try {
                                e.style[r] = s;
                            } catch (e) {
                                y.debug && console.log("Browser does not support [" + s + "] for [" + r + "]");
                            } else a(e) && a(e).isSVG && _.Names.SVGAttribute(i) ? e.setAttribute(i, s) : e.style[r] = s;
                            y.debug >= 2 && console.log("Set " + i + " (" + r + "): " + s);
                        }
                        return [ r, s ];
                    },
                    flushTransformCache: function(e) {
                        function t(t) {
                            return parseFloat(_.getPropertyValue(e, t));
                        }
                        var i = "";
                        if ((p || y.State.isAndroid && !y.State.isChrome) && a(e).isSVG) {
                            var s = {
                                translate: [ t("translateX"), t("translateY") ],
                                skewX: [ t("skewX") ],
                                skewY: [ t("skewY") ],
                                scale: 1 !== t("scale") ? [ t("scale"), t("scale") ] : [ t("scaleX"), t("scaleY") ],
                                rotate: [ t("rotateZ"), 0, 0 ]
                            };
                            u.each(a(e).transformCache, function(e) {
                                /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), 
                                s[e] && (i += e + "(" + s[e].join(" ") + ") ", delete s[e]);
                            });
                        } else {
                            var n, o;
                            u.each(a(e).transformCache, function(t) {
                                return n = a(e).transformCache[t], "transformPerspective" === t ? (o = n, !0) : (9 === p && "rotateZ" === t && (t = "rotate"), 
                                void (i += t + n + " "));
                            }), o && (i = "perspective" + o + " " + i);
                        }
                        _.setPropertyValue(e, "transform", i);
                    }
                };
                _.Hooks.register(), _.Normalizations.register(), y.hook = function(e, t, i) {
                    var n = s;
                    return e = o(e), u.each(e, function(e, o) {
                        if (a(o) === s && y.init(o), i === s) n === s && (n = y.CSS.getPropertyValue(o, t)); else {
                            var r = y.CSS.setPropertyValue(o, t, i);
                            "transform" === r[0] && y.CSS.flushTransformCache(o), n = r;
                        }
                    }), n;
                };
                var x = function() {
                    function e() {
                        return l ? E.promise || null : p;
                    }
                    function r() {
                        function e(e) {
                            function p(e, t) {
                                var i = s, n = s, o = s;
                                return m.isArray(e) ? (i = e[0], !m.isArray(e[1]) && /^[\d-]/.test(e[1]) || m.isFunction(e[1]) || _.RegEx.isHex.test(e[1]) ? o = e[1] : (m.isString(e[1]) && !_.RegEx.isHex.test(e[1]) || m.isArray(e[1])) && (n = t ? e[1] : c(e[1], l.duration), 
                                e[2] !== s && (o = e[2]))) : i = e, t || (n = n || l.easing), m.isFunction(i) && (i = i.call(r, T, C)), 
                                m.isFunction(o) && (o = o.call(r, T, C)), [ i || 0, n, o ];
                            }
                            function f(e, t) {
                                var i, s;
                                return s = (t || 0).toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                                    return i = e, "";
                                }), i || (i = _.Values.getUnitType(e)), [ s, i ];
                            }
                            if (l.begin && 0 === T) try {
                                l.begin.call(g, g);
                            } catch (e) {
                                setTimeout(function() {
                                    throw e;
                                }, 1);
                            }
                            if ("scroll" === P) {
                                var v, x, S, k = /^x$/i.test(l.axis) ? "Left" : "Top", z = parseFloat(l.offset) || 0;
                                l.container ? m.isWrapped(l.container) || m.isNode(l.container) ? (l.container = l.container[0] || l.container, 
                                v = l.container["scroll" + k], S = v + u(r).position()[k.toLowerCase()] + z) : l.container = null : (v = y.State.scrollAnchor[y.State["scrollProperty" + k]], 
                                x = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === k ? "Top" : "Left")]], 
                                S = u(r).offset()[k.toLowerCase()] + z), d = {
                                    scroll: {
                                        rootPropertyValue: !1,
                                        startValue: v,
                                        currentValue: v,
                                        endValue: S,
                                        unitType: "",
                                        easing: l.easing,
                                        scrollData: {
                                            container: l.container,
                                            direction: k,
                                            alternateValue: x
                                        }
                                    },
                                    element: r
                                }, y.debug && console.log("tweensContainer (scroll): ", d.scroll, r);
                            } else if ("reverse" === P) {
                                if (!a(r).tweensContainer) return void u.dequeue(r, l.queue);
                                "none" === a(r).opts.display && (a(r).opts.display = "auto"), "hidden" === a(r).opts.visibility && (a(r).opts.visibility = "visible"), 
                                a(r).opts.loop = !1, a(r).opts.begin = null, a(r).opts.complete = null, b.easing || delete l.easing, 
                                b.duration || delete l.duration, l = u.extend({}, a(r).opts, l);
                                L = u.extend(!0, {}, a(r).tweensContainer);
                                for (var I in L) if ("element" !== I) {
                                    var M = L[I].startValue;
                                    L[I].startValue = L[I].currentValue = L[I].endValue, L[I].endValue = M, m.isEmptyObject(b) || (L[I].easing = l.easing), 
                                    y.debug && console.log("reverse tweensContainer (" + I + "): " + JSON.stringify(L[I]), r);
                                }
                                d = L;
                            } else if ("start" === P) {
                                var L;
                                a(r).tweensContainer && !0 === a(r).isAnimating && (L = a(r).tweensContainer), u.each(w, function(e, t) {
                                    if (RegExp("^" + _.Lists.colors.join("$|^") + "$").test(e)) {
                                        var i = p(t, !0), n = i[0], o = i[1], a = i[2];
                                        if (_.RegEx.isHex.test(n)) {
                                            for (var r = [ "Red", "Green", "Blue" ], l = _.Values.hexToRgb(n), c = a ? _.Values.hexToRgb(a) : s, h = 0; h < r.length; h++) w[e + r[h]] = [ l[h], o, c ? c[h] : c ];
                                            delete w[e];
                                        }
                                    }
                                });
                                for (var H in w) {
                                    var W = p(w[H]), A = W[0], D = W[1], R = W[2];
                                    H = _.Names.camelCase(H);
                                    var j = _.Hooks.getRoot(H), B = !1;
                                    if (a(r).isSVG || !1 !== _.Names.prefixCheck(j)[1] || _.Normalizations.registered[j] !== s) {
                                        (l.display !== s && null !== l.display && "none" !== l.display || l.visibility && "hidden" !== l.visibility) && /opacity|filter/.test(H) && !R && 0 !== A && (R = 0), 
                                        l._cacheValues && L && L[H] ? (R === s && (R = L[H].endValue + L[H].unitType), B = a(r).rootPropertyValueCache[j]) : _.Hooks.registered[H] ? R === s ? (B = _.getPropertyValue(r, j), 
                                        R = _.getPropertyValue(r, H, B)) : B = _.Hooks.templates[j][1] : R === s && (R = _.getPropertyValue(r, H));
                                        var N, F, V, q = !1;
                                        if (N = f(H, R), R = N[0], V = N[1], N = f(H, A), A = N[0].replace(/^([+-\/*])=/, function(e, t) {
                                            return q = t, "";
                                        }), F = N[1], R = parseFloat(R) || 0, A = parseFloat(A) || 0, "%" === F && (/^(fontSize|lineHeight)$/.test(H) ? (A /= 100, 
                                        F = "em") : /^scale/.test(H) ? (A /= 100, F = "") : /(Red|Green|Blue)$/i.test(H) && (A = A / 100 * 255, 
                                        F = "")), /[\/*]/.test(q)) F = V; else if (V !== F && 0 !== R) if (0 === A) F = V; else {
                                            o = o || function() {
                                                var e = {
                                                    myParent: r.parentNode || i.body,
                                                    position: _.getPropertyValue(r, "position"),
                                                    fontSize: _.getPropertyValue(r, "fontSize")
                                                }, s = e.position === $.lastPosition && e.myParent === $.lastParent, n = e.fontSize === $.lastFontSize;
                                                $.lastParent = e.myParent, $.lastPosition = e.position, $.lastFontSize = e.fontSize;
                                                var o = 100, l = {};
                                                if (n && s) l.emToPx = $.lastEmToPx, l.percentToPxWidth = $.lastPercentToPxWidth, 
                                                l.percentToPxHeight = $.lastPercentToPxHeight; else {
                                                    var c = a(r).isSVG ? i.createElementNS("http://www.w3.org/2000/svg", "rect") : i.createElement("div");
                                                    y.init(c), e.myParent.appendChild(c), u.each([ "overflow", "overflowX", "overflowY" ], function(e, t) {
                                                        y.CSS.setPropertyValue(c, t, "hidden");
                                                    }), y.CSS.setPropertyValue(c, "position", e.position), y.CSS.setPropertyValue(c, "fontSize", e.fontSize), 
                                                    y.CSS.setPropertyValue(c, "boxSizing", "content-box"), u.each([ "minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height" ], function(e, t) {
                                                        y.CSS.setPropertyValue(c, t, o + "%");
                                                    }), y.CSS.setPropertyValue(c, "paddingLeft", o + "em"), l.percentToPxWidth = $.lastPercentToPxWidth = (parseFloat(_.getPropertyValue(c, "width", null, !0)) || 1) / o, 
                                                    l.percentToPxHeight = $.lastPercentToPxHeight = (parseFloat(_.getPropertyValue(c, "height", null, !0)) || 1) / o, 
                                                    l.emToPx = $.lastEmToPx = (parseFloat(_.getPropertyValue(c, "paddingLeft")) || 1) / o, 
                                                    e.myParent.removeChild(c);
                                                }
                                                return null === $.remToPx && ($.remToPx = parseFloat(_.getPropertyValue(i.body, "fontSize")) || 16), 
                                                null === $.vwToPx && ($.vwToPx = parseFloat(t.innerWidth) / 100, $.vhToPx = parseFloat(t.innerHeight) / 100), 
                                                l.remToPx = $.remToPx, l.vwToPx = $.vwToPx, l.vhToPx = $.vhToPx, y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), r), 
                                                l;
                                            }();
                                            var Y = /margin|padding|left|right|width|text|word|letter/i.test(H) || /X$/.test(H) || "x" === H ? "x" : "y";
                                            switch (V) {
                                              case "%":
                                                R *= "x" === Y ? o.percentToPxWidth : o.percentToPxHeight;
                                                break;

                                              case "px":
                                                break;

                                              default:
                                                R *= o[V + "ToPx"];
                                            }
                                            switch (F) {
                                              case "%":
                                                R *= 1 / ("x" === Y ? o.percentToPxWidth : o.percentToPxHeight);
                                                break;

                                              case "px":
                                                break;

                                              default:
                                                R *= 1 / o[F + "ToPx"];
                                            }
                                        }
                                        switch (q) {
                                          case "+":
                                            A = R + A;
                                            break;

                                          case "-":
                                            A = R - A;
                                            break;

                                          case "*":
                                            A *= R;
                                            break;

                                          case "/":
                                            A = R / A;
                                        }
                                        d[H] = {
                                            rootPropertyValue: B,
                                            startValue: R,
                                            currentValue: R,
                                            endValue: A,
                                            unitType: F,
                                            easing: D
                                        }, y.debug && console.log("tweensContainer (" + H + "): " + JSON.stringify(d[H]), r);
                                    } else y.debug && console.log("Skipping [" + j + "] due to a lack of browser support.");
                                }
                                d.element = r;
                            }
                            d.element && (_.Values.addClass(r, "velocity-animating"), O.push(d), "" === l.queue && (a(r).tweensContainer = d, 
                            a(r).opts = l), a(r).isAnimating = !0, T === C - 1 ? (y.State.calls.length > 1e4 && (y.State.calls = n(y.State.calls)), 
                            y.State.calls.push([ O, g, l, null, E.resolver ]), !1 === y.State.isTicking && (y.State.isTicking = !0, 
                            h())) : T++);
                        }
                        var o, r = this, l = u.extend({}, y.defaults, b), d = {};
                        if (a(r) === s && y.init(r), parseFloat(l.delay) && !1 !== l.queue && u.queue(r, l.queue, function(e) {
                            y.velocityQueueEntryFlag = !0, a(r).delayTimer = {
                                setTimeout: setTimeout(e, parseFloat(l.delay)),
                                next: e
                            };
                        }), !0 === y.mock) l.duration = 1; else switch (l.duration.toString().toLowerCase()) {
                          case "fast":
                            l.duration = 200;
                            break;

                          case "normal":
                            l.duration = v;
                            break;

                          case "slow":
                            l.duration = 600;
                            break;

                          default:
                            l.duration = parseFloat(l.duration) || 1;
                        }
                        l.easing = c(l.easing, l.duration), l.begin && !m.isFunction(l.begin) && (l.begin = null), 
                        l.progress && !m.isFunction(l.progress) && (l.progress = null), l.complete && !m.isFunction(l.complete) && (l.complete = null), 
                        l.display !== s && null !== l.display && (l.display = l.display.toString().toLowerCase(), 
                        "auto" === l.display && (l.display = y.CSS.Values.getDisplayType(r))), l.visibility && (l.visibility = l.visibility.toString().toLowerCase()), 
                        l.mobileHA = l.mobileHA && y.State.isMobile && !y.State.isGingerbread, !1 === l.queue ? l.delay ? setTimeout(e, l.delay) : e() : u.queue(r, l.queue, function(t, i) {
                            return !0 === i ? (E.promise && E.resolver(g), !0) : (y.velocityQueueEntryFlag = !0, 
                            void e(t));
                        }), "" !== l.queue && "fx" !== l.queue || "inprogress" === u.queue(r)[0] || u.dequeue(r);
                    }
                    var l, p, f, g, w, b, S = arguments[0] && (u.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || m.isString(arguments[0].properties));
                    if (m.isWrapped(this) ? (l = !1, f = 0, g = this, p = this) : (l = !0, f = 1, g = S ? arguments[0].elements : arguments[0]), 
                    g = o(g)) {
                        S ? (w = arguments[0].properties, b = arguments[0].options) : (w = arguments[f], 
                        b = arguments[f + 1]);
                        var C = g.length, T = 0;
                        if ("stop" !== w && !u.isPlainObject(b)) {
                            b = {};
                            for (var k = f + 1; k < arguments.length; k++) m.isArray(arguments[k]) || !/fast|normal|slow/i.test(arguments[k].toString()) && !/^\d/.test(arguments[k]) ? m.isString(arguments[k]) || m.isArray(arguments[k]) ? b.easing = arguments[k] : m.isFunction(arguments[k]) && (b.complete = arguments[k]) : b.duration = arguments[k];
                        }
                        var E = {
                            promise: null,
                            resolver: null,
                            rejecter: null
                        };
                        l && y.Promise && (E.promise = new y.Promise(function(e, t) {
                            E.resolver = e, E.rejecter = t;
                        }));
                        var P;
                        switch (w) {
                          case "scroll":
                            P = "scroll";
                            break;

                          case "reverse":
                            P = "reverse";
                            break;

                          case "stop":
                            u.each(g, function(e, t) {
                                a(t) && a(t).delayTimer && (clearTimeout(a(t).delayTimer.setTimeout), a(t).delayTimer.next && a(t).delayTimer.next(), 
                                delete a(t).delayTimer);
                            });
                            var z = [];
                            return u.each(y.State.calls, function(e, t) {
                                t && u.each(t[1], function(i, n) {
                                    var o = m.isString(b) ? b : "";
                                    return b !== s && t[2].queue !== o || void u.each(g, function(t, i) {
                                        i === n && (b !== s && (u.each(u.queue(i, o), function(e, t) {
                                            m.isFunction(t) && t(null, !0);
                                        }), u.queue(i, o, [])), a(i) && "" === o && u.each(a(i).tweensContainer, function(e, t) {
                                            t.endValue = t.currentValue;
                                        }), z.push(e));
                                    });
                                });
                            }), u.each(z, function(e, t) {
                                d(t, !0);
                            }), E.promise && E.resolver(g), e();

                          default:
                            if (!u.isPlainObject(w) || m.isEmptyObject(w)) {
                                if (m.isString(w) && y.Sequences[w]) {
                                    var I = (W = u.extend({}, b)).duration, M = W.delay || 0;
                                    return !0 === W.backwards && (g = g.reverse()), u.each(g, function(e, t) {
                                        parseFloat(W.stagger) ? W.delay = M + parseFloat(W.stagger) * e : m.isFunction(W.stagger) && (W.delay = M + W.stagger.call(t, e, C)), 
                                        W.drag && (W.duration = parseFloat(I) || (/^(callout|transition)/.test(w) ? 1e3 : v), 
                                        W.duration = Math.max(W.duration * (W.backwards ? 1 - e / C : (e + 1) / C), .75 * W.duration, 200)), 
                                        y.Sequences[w].call(t, t, W || {}, e, C, g, E.promise ? E : s);
                                    }), e();
                                }
                                var L = "Velocity: First argument (" + w + ") was not a property map, a known action, or a registered sequence. Aborting.";
                                return E.promise ? E.rejecter(new Error(L)) : console.log(L), e();
                            }
                            P = "start";
                        }
                        var $ = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        }, O = [];
                        u.each(g, function(e, t) {
                            m.isNode(t) && r.call(t);
                        });
                        var H, W = u.extend({}, y.defaults, b);
                        if (W.loop = parseInt(W.loop), H = 2 * W.loop - 1, W.loop) for (var A = 0; H > A; A++) {
                            var D = {
                                delay: W.delay
                            };
                            A === H - 1 && (D.display = W.display, D.visibility = W.visibility, D.complete = W.complete), 
                            x(g, "reverse", D);
                        }
                        return e();
                    }
                };
                (y = u.extend(x, y)).animate = x;
                var S = t.requestAnimationFrame || f;
                return y.State.isMobile || i.hidden === s || i.addEventListener("visibilitychange", function() {
                    i.hidden ? (S = function(e) {
                        return setTimeout(function() {
                            e(!0);
                        }, 16);
                    }, h()) : S = t.requestAnimationFrame || f;
                }), e.Velocity = y, e !== t && (e.fn.velocity = x, e.fn.velocity.defaults = y.defaults), 
                u.each([ "Down", "Up" ], function(e, t) {
                    y.Sequences["slide" + t] = function(e, i, n, o, a, r) {
                        var l = u.extend({}, i), c = l.begin, h = l.complete, d = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        }, p = {};
                        l.display === s && (l.display = "Down" === t ? "inline" === y.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), 
                        l.begin = function() {
                            c && c.call(a, a), p.overflow = e.style.overflow, e.style.overflow = "hidden";
                            for (var i in d) {
                                p[i] = e.style[i];
                                var s = y.CSS.getPropertyValue(e, i);
                                d[i] = "Down" === t ? [ s, 0 ] : [ 0, s ];
                            }
                        }, l.complete = function() {
                            for (var t in p) e.style[t] = p[t];
                            h && h.call(a, a), r && r.resolver(a);
                        }, y(e, d, l);
                    };
                }), u.each([ "In", "Out" ], function(e, t) {
                    y.Sequences["fade" + t] = function(e, i, n, o, a, r) {
                        var l = u.extend({}, i), c = {
                            opacity: "In" === t ? 1 : 0
                        }, h = l.complete;
                        l.complete = n !== o - 1 ? l.begin = null : function() {
                            h && h.call(a, a), r && r.resolver(a);
                        }, l.display === s && (l.display = "In" === t ? "auto" : "none"), y(this, c, l);
                    };
                }), y;
            }
            jQuery.fn.velocity = jQuery.fn.animate;
        }
    }(window.jQuery || window.Zepto || window, window, document);
}), function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.salvattore = t();
}(this, function() {
    return window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var e = window.styleMedia || window.media;
        if (!e) {
            var t = document.createElement("style"), i = document.getElementsByTagName("script")[0], s = null;
            t.type = "text/css", t.id = "matchmediajs-test", i.parentNode.insertBefore(t, i), 
            s = "getComputedStyle" in window && window.getComputedStyle(t, null) || t.currentStyle, 
            e = {
                matchMedium: function(e) {
                    var i = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                    return t.styleSheet ? t.styleSheet.cssText = i : t.textContent = i, "1px" === s.width;
                }
            };
        }
        return function(t) {
            return {
                matches: e.matchMedium(t || "all"),
                media: t || "all"
            };
        };
    }()), function() {
        "use strict";
        if (window.matchMedia && window.matchMedia("all").addListener) return !1;
        var e = window.matchMedia, t = e("only all").matches, i = !1, s = 0, n = [], o = function(t) {
            clearTimeout(s), s = setTimeout(function() {
                for (var t = 0, i = n.length; t < i; t++) {
                    var s = n[t].mql, o = n[t].listeners || [], a = e(s.media).matches;
                    if (a !== s.matches) {
                        s.matches = a;
                        for (var r = 0, l = o.length; r < l; r++) o[r].call(window, s);
                    }
                }
            }, 30);
        };
        window.matchMedia = function(s) {
            var a = e(s), r = [], l = 0;
            return a.addListener = function(e) {
                t && (i || (i = !0, window.addEventListener("resize", o, !0)), 0 === l && (l = n.push({
                    mql: a,
                    listeners: r
                })), r.push(e));
            }, a.removeListener = function(e) {
                for (var t = 0, i = r.length; t < i; t++) r[t] === e && r.splice(t, 1);
            }, a;
        };
    }(), function() {
        "use strict";
        for (var e = 0, t = [ "ms", "moz", "webkit", "o" ], i = 0; i < t.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"], 
        window.cancelAnimationFrame = window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, i) {
            var s = new Date().getTime(), n = Math.max(0, 16 - (s - e)), o = window.setTimeout(function() {
                t(s + n);
            }, n);
            return e = s + n, o;
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e);
        });
    }(), "function" != typeof window.CustomEvent && function() {
        "use strict";
        function e(e, t) {
            t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
        }
        e.prototype = window.Event.prototype, window.CustomEvent = e;
    }(), function(e, t, i) {
        "use strict";
        var s = {}, n = [], o = [], a = [], r = function(e, t, i) {
            e.dataset ? e.dataset[t] = i : e.setAttribute("data-" + t, i);
        };
        return s.obtainGridSettings = function(t) {
            var i = e.getComputedStyle(t, ":before").getPropertyValue("content").slice(1, -1), s = i.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/), n = 1, o = [];
            return s ? (n = s[1], o = (o = s[2]) ? o.split(".") : [ "column" ]) : (s = i.match(/^\s*\.(.+)\s+(\d+)\s*$/)) && (o = s[1], 
            (n = s[2]) && (n = n.split("."))), {
                numberOfColumns: n,
                columnClasses: o
            };
        }, s.addColumns = function(e, i) {
            for (var n, o = s.obtainGridSettings(e), a = o.numberOfColumns, l = o.columnClasses, c = new Array(+a), h = t.createDocumentFragment(), d = a; 0 != d--; ) n = "[data-columns] > *:nth-child(" + a + "n-" + d + ")", 
            c.push(i.querySelectorAll(n));
            c.forEach(function(e) {
                var i = t.createElement("div"), s = t.createDocumentFragment();
                i.className = l.join(" "), Array.prototype.forEach.call(e, function(e) {
                    s.appendChild(e);
                }), i.appendChild(s), h.appendChild(i);
            }), e.appendChild(h), r(e, "columns", a);
        }, s.removeColumns = function(i) {
            var s = t.createRange();
            s.selectNodeContents(i);
            var n = Array.prototype.filter.call(s.extractContents().childNodes, function(t) {
                return t instanceof e.HTMLElement;
            }), o = n.length, a = n[0].childNodes.length, l = new Array(a * o);
            Array.prototype.forEach.call(n, function(e, t) {
                Array.prototype.forEach.call(e.children, function(e, i) {
                    l[i * o + t] = e;
                });
            });
            var c = t.createElement("div");
            return r(c, "columns", 0), l.filter(function(e) {
                return !!e;
            }).forEach(function(e) {
                c.appendChild(e);
            }), c;
        }, s.recreateColumns = function(t) {
            e.requestAnimationFrame(function() {
                s.addColumns(t, s.removeColumns(t));
                var e = new CustomEvent("columnsChange");
                t.dispatchEvent(e);
            });
        }, s.mediaQueryChange = function(e) {
            e.matches && Array.prototype.forEach.call(n, s.recreateColumns);
        }, s.getCSSRules = function(e) {
            var t;
            try {
                t = e.sheet.cssRules || e.sheet.rules;
            } catch (e) {
                return [];
            }
            return t || [];
        }, s.getStylesheets = function() {
            var e = Array.prototype.slice.call(t.querySelectorAll("style"));
            return e.forEach(function(t, i) {
                "text/css" !== t.type && "" !== t.type && e.splice(i, 1);
            }), Array.prototype.concat.call(e, Array.prototype.slice.call(t.querySelectorAll("link[rel='stylesheet']")));
        }, s.mediaRuleHasColumnsSelector = function(e) {
            var t, i;
            try {
                t = e.length;
            } catch (e) {
                t = 0;
            }
            for (;t--; ) if ((i = e[t]).selectorText && i.selectorText.match(/\[data-columns\](.*)::?before$/)) return !0;
            return !1;
        }, s.scanMediaQueries = function() {
            var t = [];
            if (e.matchMedia) {
                s.getStylesheets().forEach(function(e) {
                    Array.prototype.forEach.call(s.getCSSRules(e), function(e) {
                        try {
                            e.media && e.cssRules && s.mediaRuleHasColumnsSelector(e.cssRules) && t.push(e);
                        } catch (e) {}
                    });
                });
                var i = o.filter(function(e) {
                    return -1 === t.indexOf(e);
                });
                a.filter(function(e) {
                    return -1 !== i.indexOf(e.rule);
                }).forEach(function(e) {
                    e.mql.removeListener(s.mediaQueryChange);
                }), a = a.filter(function(e) {
                    return -1 === i.indexOf(e.rule);
                }), t.filter(function(e) {
                    return -1 == o.indexOf(e);
                }).forEach(function(t) {
                    var i = e.matchMedia(t.media.mediaText);
                    i.addListener(s.mediaQueryChange), a.push({
                        rule: t,
                        mql: i
                    });
                }), o.length = 0, o = t;
            }
        }, s.rescanMediaQueries = function() {
            s.scanMediaQueries(), Array.prototype.forEach.call(n, s.recreateColumns);
        }, s.nextElementColumnIndex = function(e, t) {
            var i, s, n = e.children, o = n.length, a = 0, r = 0;
            for (s = 0; s < o; s++) i = n[s].children.length + (t[s].children || t[s].childNodes).length, 
            0 === a && (a = i), i < a && (r = s, a = i);
            return r;
        }, s.createFragmentsList = function(e) {
            for (var i = new Array(e), s = 0; s !== e; ) i[s] = t.createDocumentFragment(), 
            s++;
            return i;
        }, s.appendElements = function(e, t) {
            var i = e.children, n = i.length, o = s.createFragmentsList(n);
            Array.prototype.forEach.call(t, function(t) {
                var i = s.nextElementColumnIndex(e, o);
                o[i].appendChild(t);
            }), Array.prototype.forEach.call(i, function(e, t) {
                e.appendChild(o[t]);
            });
        }, s.prependElements = function(e, i) {
            var n = e.children, o = n.length, a = s.createFragmentsList(o), r = o - 1;
            i.forEach(function(e) {
                var t = a[r];
                t.insertBefore(e, t.firstChild), 0 === r ? r = o - 1 : r--;
            }), Array.prototype.forEach.call(n, function(e, t) {
                e.insertBefore(a[t], e.firstChild);
            });
            for (var l = t.createDocumentFragment(), c = i.length % o; 0 != c--; ) l.appendChild(e.lastChild);
            e.insertBefore(l, e.firstChild);
        }, s.registerGrid = function(i) {
            if ("none" !== e.getComputedStyle(i).display) {
                var o = t.createRange();
                o.selectNodeContents(i);
                var a = t.createElement("div");
                a.appendChild(o.extractContents()), r(a, "columns", 0), s.addColumns(i, a), n.push(i);
            }
        }, s.init = function() {
            var e = t.createElement("style");
            e.innerHTML = "[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}", 
            t.head.appendChild(e);
            var i = t.querySelectorAll("[data-columns]");
            Array.prototype.forEach.call(i, s.registerGrid), s.scanMediaQueries();
        }, s.init(), {
            appendElements: s.appendElements,
            prependElements: s.prependElements,
            registerGrid: s.registerGrid,
            recreateColumns: s.recreateColumns,
            rescanMediaQueries: s.rescanMediaQueries,
            init: s.init,
            append_elements: s.appendElements,
            prepend_elements: s.prependElements,
            register_grid: s.registerGrid,
            recreate_columns: s.recreateColumns,
            rescan_media_queries: s.rescanMediaQueries
        };
    }(window, window.document);
}), jQuery(document).ready(function(e) {
    "use strict";
    function t() {
        e(".st-container").removeClass("slide-from-right"), e(".st-container").addClass("slide-from-left"), 
        e(".st-container").addClass("st-menu-open"), r = !0, l = !0, e(".st-menu.slide-from-left").addClass("open"), 
        e("body").addClass("offcanvas_open offcanvas_from_left"), e(".nano").nanoScroller();
    }
    function i() {
        e(".st-container").removeClass("slide-from-left"), e(".st-container").addClass("slide-from-right"), 
        e(".st-container").addClass("st-menu-open"), r = !0, c = !0, e(".st-menu.slide-from-right").addClass("open"), 
        e("body").addClass("offcanvas_open offcanvas_from_right"), e(".nano").nanoScroller();
    }
    function s() {
        !0 === r && (e(".st-container").removeClass("slide-from-left"), e(".st-container").removeClass("slide-from-right"), 
        e(".st-container").removeClass("st-menu-open"), r = !1, l = !1, c = !1, e(".st-menu").removeClass("open"), 
        e("body").removeClass("offcanvas_open offcanvas_from_left offcanvas_from_right"));
    }
    function n(t) {
        var i = e(t).attr("data-src");
        e(t).one("load", function() {}).each(function() {
            e(t).attr("src", i), e(t).css("opacity", "1");
        });
    }
    function o() {
        return e(window).innerWidth() > 1024 ? (p = 3, e(".blog-isotop-container").css({
            margin: "0 -1.5%"
        })) : e(window).innerWidth() <= 640 ? (p = 1, e(".blog-isotop-container").css({
            margin: "0 -30px"
        })) : (p = 2, e(".blog-isotop-container").css({
            margin: "0 -1.5%"
        })), (u = e(".blog-isotop-container").width()) % p > 0 && (u += p - u % p), e(".blog-isotope").css("width", u), 
        p;
    }
    function a() {
        return v = e(window).innerWidth() > 1584 ? 5 : e(window).innerWidth() <= 480 ? 1 : e(window).innerWidth() <= 901 ? 2 : e(window).innerWidth() <= 1248 ? 3 : 4, 
        e(".items_per_row_3").length > 0 && e(window).innerWidth() > 1248 && (v = 3), e(".items_per_row_4").length > 0 && e(window).innerWidth() > 1584 && (v = 4), 
        (g = e(".portfolio-isotope-container").width()) % v > 0 && (g += v - g % v), e(".portfolio-isotope").css("width", g), 
        v;
    }
    e(".content-area").fitVids();
    var r = !1, l = !1, c = !1;
    e(window).innerWidth();
    !function() {
        e(".main-navigation > ul > .menu-item").mouseenter(function() {
            if (e(this).children(".sub-menu").length > 0) {
                var t = e(this).children(".sub-menu"), i = parseInt(e(window).outerWidth()) - parseInt(t.outerWidth()) - parseInt(t.offset().left);
                i < 0 && t.css("left", i - 30 + "px");
            }
        });
    }(), e(".woocommerce-tabs .panel:first-child").addClass("current"), e(".woocommerce-tabs ul.tabs li a").off("click").on("click", function() {
        var t = e(this), i = t.attr("href");
        return t.parent().siblings().removeClass("active").end().addClass("active"), e(".woocommerce-tabs").find(i).siblings(".panel").filter(":visible").fadeOut(500, function() {
            e(".woocommerce-tabs").find(i).siblings(".panel").removeClass("current"), e(".woocommerce-tabs").find(i).addClass("current").fadeIn(500);
        }), !1;
    }), e(".add_to_cart_button").one("click", function() {
        var t, i, s = e(this);
        t = s.attr("class"), t = t.replace("add_to_cart_button", ""), i = s.attr("style"), 
        s.parent().on("DOMNodeInserted", function(s) {
            s.stopPropagation(), e(s.target).is(".added_to_cart") && (e(s.target).addClass(t).removeClass("added_to_cart").addClass("added_to_cart_button"), 
            e(s.target).attr("style", i));
        });
    }), e(".woocommerce-product-search .search-field, .search-form .search-field").val("");
    var h = e("body").find(".site-search").find('input[type="search"]');
    e(".search-button").on("click", function() {
        e(document).height();
        var t = e(".site-search .search-form"), i = e(".site-search .woocommerce-product-search");
        e(".site-search .woocommerce-product-search").length > 0 ? (e(".site-search .woocommerce-product-search .search-field").val(""), 
        i.find(".submit_icon").length || i.append('<div class="submit_icon"><i class="spk-icon-search"></i></div>'), 
        i.css("margin-left", -e(window).width() / 4), e(".site-search").addClass("open"), 
        e(".site-search").on("click", function(t) {
            "searchsubmit" != e(t.target).attr("id") && "search-field" != e(t.target).attr("class") && e(".site-search").removeClass("open");
        })) : (e(".site-search .widget_search .search-field").val(""), t.find(".submit_icon").length || t.append('<div class="submit_icon"><i class="spk-icon-search"></i></div>'), 
        t.css("margin-left", -e(window).width() / 4), e(".site-search").addClass("open"), 
        e(".site-search").on("click", function(t) {
            "search-submit" != e(t.target).attr("class") && "search-field" != e(t.target).attr("class") && e(".site-search").removeClass("open");
        })), e(window).width() > 1024 && (console.log("x"), h.focus());
    }), e.fn.visible = function(t) {
        var i = e(this), s = e(window), n = s.scrollTop(), o = n + s.height(), a = i.offset().top, r = a + i.height(), l = !0 === t ? r : a;
        return (!0 === t ? a : r) <= o && l >= n;
    }, e("section.related").each(function(t, i) {
        e(i).visible(!0) && e(i).addClass("on_screen");
    }), e(".offcanvas-menu-button, .open-offcanvas").click(function() {
        i();
    }), e("#button_offcanvas_sidebar_left").click(function() {
        t();
    }), e("#st-container").on("click", ".st-pusher-after", function(e) {
        s();
    }), e(".st-pusher-after").swipe({
        swipeLeft: function(e, t, i, n, o) {
            s();
        },
        swipeRight: function(e, t, i, n, o) {
            s();
        },
        tap: function(e, t, i, n, o) {
            s();
        },
        threshold: 0
    }), e(".mobile-navigation .menu-item-has-children").append('<div class="more"><i class="fa fa-plus-circle"></i></div>'), 
    e(".mobile-navigation").on("click", ".more", function(t) {
        t.stopPropagation(), e(this).parent().toggleClass("current").children(".sub-menu").toggleClass("open"), 
        e(this).html('<i class="fa fa-plus-circle"></i>' == e(this).html() ? '<i class="fa fa-minus-circle"></i>' : '<i class="fa fa-plus-circle"></i>'), 
        e(".nano").nanoScroller();
    }), e(".mobile-navigation").on("click", "a", function(t) {
        "#" === e(this).attr("href") || "" === e(this).attr("href") ? e(this).parent().children(".more").trigger("click") : s();
    }), e("#products-grid li img").each(function() {
        n(this);
    }), e(".related.products li img").each(function() {
        n(this);
    }), e(".upsells.products li img").each(function() {
        n(this);
    }), e(".add_to_cart_button").on("click", function() {
        e(this).parents("li.animate").addClass("product_added_to_cart");
    }), e(".woocommerce-review-link").off("click").on("click", function() {
        e(".tabs li a").each(function() {
            "#tab-reviews" == e(this).attr("href") && e(this).trigger("click");
        });
        var t = 0;
        e("#wpadminbar").length > 0 && (t += e("#wpadminbar").outerHeight()), e(".getbowtied_theme_explorer_wrapper").length > 0 && e(".getbowtied_theme_explorer_wrapper").is("visible") && (t += e(".getbowtied_theme_explorer_wrapper").outerHeight());
        var i = e(".woocommerce-tabs").offset().top - t;
        return e("html, body").animate({
            scrollTop: i
        }, 1e3), !1;
    }), e(".add_to_wishlist").on("click", function() {
        e(this).parents(".yith-wcwl-add-button").addClass("show_overlay");
    }), e(".account-tab-list").on("click", ".account-tab-link", function() {
        if (e(".account-tab-link").hasClass("registration_disabled")) return !1;
        var t = e(this), i = t.attr("href");
        return t.parent().siblings().find(".account-tab-link").removeClass("current"), t.addClass("current"), 
        e(".account-forms").find(e(i)).siblings().stop().fadeOut(function() {
            e(".account-forms").find(e(i)).fadeIn();
        }), !1;
    }), e(".account-tab-link-register").on("click", function() {
        return e(".login-form").stop().fadeOut(function() {
            e(".register-form").fadeIn();
        }), !1;
    }), e(".account-tab-link-login").on("click", function() {
        return e(".register-form").stop().fadeOut(function() {
            e(".login-form").fadeIn();
        }), !1;
    });
    e(window).width();
    if (function() {
        e(".product_layout_classic .product-images-layout .fresco"), e(".product_layout_classic .product-images-layout .fresco").attr("href"), 
        1 != getbowtied_scripts_vars.product_lightbox && (e(".product-images-wrapper .product_images .product-image a").css({
            cursor: "default"
        }), e(".product-images-layout .fresco, .product-images-layout-mobile .fresco, .woocommerce-product-gallery__wrapper .fresco").on("click", function() {
            return !1;
        }));
    }(), e(".gallery").each(function() {
        var t = e(this);
        t.find(".gallery-item").each(function() {
            var i = e(this);
            i.find(".fresco").attr("data-fresco-group", t.attr("id")), i.find(".gallery-caption").length > 0 && i.find(".fresco").attr("data-fresco-caption", i.find(".gallery-caption").text());
        });
    }), function() {
        e(window).innerWidth() > 1023 && e(".orderby, .big-select").select2({
            allowClear: !0,
            minimumResultsForSearch: 1 / 0
        });
    }(), e(".gallery-item").each(function() {
        var t = e(this);
        t.find(".gallery-caption").length > 0 && t.append('<span class="gallery-caption-trigger">i</span>');
    }), e(".gallery-caption-trigger").on("mouseenter", function() {
        e(this).siblings(".gallery-caption").addClass("show");
    }), e(".gallery-caption-trigger").on("mouseleave", function() {
        e(this).siblings(".gallery-caption").removeClass("show");
    }), e(".trigger-footer-widget-icon").on("click", function() {
        var t = e(this).parent();
        t.fadeOut("1000", function() {
            t.remove(), e(".site-footer-widget-area").fadeIn();
        });
    }), e(".blog-isotop-container").length) {
        var d, u, p;
        w = e(".filters-group .is-checked").attr("data-filter"), p = o(), o();
        var f = function() {
            setTimeout(function() {
                e(".blog-post").removeClass("hidden");
            }, 200);
        };
        !function() {
            var t = imagesLoaded(e(".blog-isotope"));
            t.on("done", function() {
                d = e(".blog-isotope").isotope({
                    itemSelector: ".blog-post",
                    masonry: {
                        columnWidth: ".grid-sizer"
                    }
                }), f();
            }), t.on("fail", function() {
                d = e(".blog-isotope").isotope({
                    itemSelector: ".blog-post",
                    masonry: {
                        columnWidth: ".grid-sizer"
                    }
                }), f();
            });
        }(), e(".filters-group").on("click", "filter-item", function() {
            w = e(this).attr("data-filter"), d.isotope({
                filter: w
            });
        });
    }
    if (e(".hover-effect-text").each(function() {
        var t = e(this);
        t.css("bottom", -t.outerHeight()).attr("data-height", t.outerHeight());
    }), e(".hover-effect-link").mouseenter(function() {
        var t = e(this);
        if (!t.find(".hover-effect-text").is(":empty")) {
            var i = t.find(".hover-effect-text").outerHeight();
            t.find(".hover-effect-title").css("bottom", i), t.find(".hover-effect-text").css("bottom", 0);
        }
    }), e(".hover-effect-link").mouseleave(function() {
        var t = e(this);
        if (!t.find(".hover-effect-text").is(":empty")) {
            var i = t.find(".hover-effect-text").attr("data-height");
            t.find(".hover-effect-title").css("bottom", 28), t.find(".hover-effect-text").css("bottom", -i);
        }
    }), e(".portfolio-isotope-container").length) {
        var m, g, v, w;
        w = e(".filters-group .is-checked").attr("data-filter"), v = a(), a();
        var y = function() {
            setTimeout(function() {
                e(".portfolio-box").removeClass("hidden");
            }, 200);
        };
        !function() {
            var t = imagesLoaded(e(".portfolio-isotope"));
            t.on("done", function() {
                m = e(".portfolio-isotope").isotope({
                    itemSelector: ".portfolio-box",
                    masonry: {
                        columnWidth: ".portfolio-grid-sizer"
                    }
                }), y();
            }), t.on("fail", function() {
                portfolio_wrapper_inner = e(".portfolio-isotope").isotope({
                    itemSelector: ".portfolio-box",
                    masonry: {
                        columnWidth: ".portfolio-grid-sizer"
                    }
                }), y();
            });
        }(), e(".filters-group").on("click", ".filter-item", function() {
            w = e(this).attr("data-filter"), e(this).parents(".portfolio-filters").siblings(".portfolio-isotope").isotope({
                filter: w
            });
        });
    }
    if (e(".topbar-language-switcher").change(function() {
        window.location = e(this).val();
    }), e(window).load(function() {
        setTimeout(function() {
            e(".product_thumbnail.with_second_image").css("background-size", "cover"), e(".product_thumbnail.with_second_image").addClass("second_image_loaded");
        }, 300), e(window).outerWidth() > 1024 && e.stellar({
            horizontalScrolling: !1,
            responsive: !0
        }), setTimeout(function() {
            e(".parallax, .single-post-header-bkg").addClass("loaded");
        }, 150);
    }), e(window).resize(function() {
        function t() {
            n && clearTimeout(n), n = setTimeout(function() {
                e(this).trigger("onEndResizingIsotope");
            }, 100);
        }
        if (e(".site-search-form-wrapper-inner, .site-search .widget_search .search-form").css("margin-left", -e(window).width() / 4), 
        e(".main-navigation > ul > .menu-item > .sub-menu").css("left", "-15px"), e(".blog-isotop-container").length) {
            var i;
            o(), i = o(), p != i && (e(".filters-group .filter-item").each(function() {
                e(this).attr("data-filter") == w && e(this).trigger("click");
            }), p = i, t());
        }
        if (e(".portfolio-isotope-container").length) {
            var s;
            a(), s = a(), v != s && (e(".filters-group .filter-item").each(function() {
                e(this).attr("data-filter") == w && e(this).trigger("click");
            }), v = s, t());
        }
        var n = this.resizeTO;
    }), e(window).bind("onEndResizingIsotope", function() {
        console.log("resizeend"), e(".filters-group .filter-item").each(function() {
            e(this).attr("data-filter") == w && (e(this).trigger("click"), console.log("trigger resize"));
        });
    }), e(window).scroll(function() {
        e(this).scrollTop() > 0 ? e("#page_wrapper.sticky_header .top-headers-wrapper").addClass("on_page_scroll") : e("#page_wrapper.sticky_header .top-headers-wrapper").removeClass("on_page_scroll"), 
        e(window).innerWidth() > 640 && e(".products li").each(function(t, i) {
            e(i).visible(!0) && e(i).addClass("animate");
        }), e("section.related, #site-footer").each(function(t, i) {
            e(i).visible(!0) ? e(i).addClass("on_screen") : e(i).removeClass("on_screen");
        }), e(window).width() > 1024 && e(".single-post-header-overlay").css("opacity", .3 + e(window).scrollTop() / (1.4 * e(window).height()));
    }), e("body").hasClass("woocommerce-wishlist") && e("td.wishlist-empty").length && e("h1.page-title").hide(), 
    e(".widget_layered_nav span.count, .widget_product_categories span.count").each(function() {
        var t = e(this).html();
        t = t.substring(1, t.length - 1), e(this).html(t);
    }), e(".widget_rating_filter ul li a").each(function() {
        var t = e(this).contents().filter(function() {
            return 3 == this.nodeType;
        })[0].nodeValue;
        e(this).contents().filter(function() {
            return 3 == this.nodeType;
        })[0].nodeValue = "", t = t.slice(2, -1), e(this).append('<span class="count">' + t + "</span>");
    }), "form#register".length > 0) {
        var b = window.location.hash;
        b && (e(".account-tab-link").removeClass("current"), e('a[href="' + b + '"]').addClass("current"), 
        b = b.substring(1), e(".account-forms > form").hide(), e("form#" + b).show());
    }
    var _ = e(".cd-top");
    e(window).scroll(function() {
        e(this).scrollTop() > 300 ? _.addClass("cd-is-visible") : _.removeClass("cd-is-visible cd-fade-out"), 
        e(this).scrollTop() > 1200 && _.addClass("cd-fade-out");
    }), _.on("click", function(t) {
        t.preventDefault(), e("body,html").animate({
            scrollTop: 0
        }, 700);
    });
}), jQuery(function(e) {
    "use strict";
    var t = e(".cd-top");
    e(window).scroll(function() {
        e(this).scrollTop() > 300 ? t.addClass("cd-is-visible") : t.removeClass("cd-is-visible cd-fade-out"), 
        e(this).scrollTop() > 1200 && t.addClass("cd-fade-out");
    }), t.on("click", function(t) {
        t.preventDefault(), e("body,html").animate({
            scrollTop: 0
        }, 700);
    });
}), jQuery(document).ready(function(e) {
    e(".blog-sidebar").length > 0 && e(".blog-sidebar").height() > e(".blog-isotop-container").height() && e(".blog-isotop-container").height(e(".blog-sidebar").height() + 100), 
    e(window).resize(function() {
        e(".blog-sidebar").length > 0 && e(".blog-sidebar").height() > e(".blog-isotop-container").height() && e(".blog-isotop-container").height(e(".blog-sidebar").height() + 100);
    }), e(".woocommerce-cart #content table.cart td.actions .coupon #coupon_code").on("focus", function() {
        e(".woocommerce-cart #content table.cart td.actions .coupon").addClass("focus");
    }), e(".woocommerce-cart #content table.cart td.actions .coupon #coupon_code").on("focusout", function() {
        e(".woocommerce-cart #content table.cart td.actions .coupon").removeClass("focus");
    }), e("form.checkout_coupon #coupon_code").on("focus", function() {
        e("form.checkout_coupon .checkout_coupon_inner").addClass("focus");
    }), e("form.checkout_coupon #coupon_code").on("focusout", function() {
        e("form.checkout_coupon .checkout_coupon_inner").removeClass("focus");
    }), e("#wpadminbar").length > 0 && e(window).width() <= 1024 && e(".st-menu").css("top", "32px");
}), jQuery(function(e) {
    var t = e(window).height(), i = e(".shopkeeper-mini-cart .widget.woocommerce.widget_shopping_cart .widget_shopping_cart_content .cart_list.product_list_widget li.mini_cart_item .product-item-bg");
    768 == t ? i.addClass("smaller-vh") : i.removeClass("smaller-vh");
}), jQuery(function(e) {
    "use strict";
    var t = {
        init: function() {
            if ("load_more_button" != getbowtied_scripts_vars.pagination_blog && "infinite_scroll" != getbowtied_scripts_vars.pagination_blog || (e(document).ready(function() {
                e(".posts-navigation").length && (e(".posts-navigation").before('<div class="getbowtied_blog_ajax_load_button"><a getbowtied_blog_ajax_load_more_processing="0">' + getbowtied_scripts_vars.ajax_load_more_locale + "</a></div>"), 
                "infinite_scroll" == getbowtied_scripts_vars.pagination_blog && e(".getbowtied_blog_ajax_load_button").addClass("getbowtied_blog_ajax_load_more_hidden"), 
                0 == e(".posts-navigation a.next").length && e(".getbowtied_blog_ajax_load_button").addClass("getbowtied_blog_ajax_load_more_hidden")), 
                e(".posts-navigation").hide(), e(".blog-posts > .blog-post").addClass("getbowtied_blog_ajax_load_more_item_visible");
            }), e("body").on("click", ".getbowtied_blog_ajax_load_button a", function(i) {
                if (i.preventDefault(), e(".posts-navigation a.next").length) {
                    e(".getbowtied_blog_ajax_load_button a").attr("getbowtied_blog_ajax_load_more_processing", 1);
                    var s = e(".posts-navigation a.next").attr("href");
                    t.onstart(), e(".getbowtied_blog_ajax_load_button").fadeOut(200, function() {
                        e(".posts-navigation").before('<div class="getbowtied_blog_ajax_load_more_loader"><span>' + getbowtied_scripts_vars.ajax_loading_locale + "</span></div>");
                    }), e.get(s, function(i) {
                        e(".posts-navigation").html(e(i).find(".posts-navigation").html());
                        var s = 0;
                        e(i).find(".blog-posts > .blog-post").each(function() {
                            if ("layout-1" == getbowtied_scripts_vars.layout_blog) {
                                s++, e(this).addClass("loaded delay-" + s);
                                var t = document.querySelector("#masonry_grid"), i = document.createElement("li");
                                salvattore.appendElements(t, [ i ]), i.outerHTML = e(this).prop("outerHTML");
                            } else s++, e(this).addClass("loaded delay-" + s), e(".blog-posts > .blog-post:last").after(e(this));
                        }), e(".getbowtied_blog_ajax_load_more_loader").fadeOut(200, function() {
                            e(this).remove(), e(".getbowtied_blog_ajax_load_button").show(), e(".getbowtied_blog_ajax_load_button a").attr("getbowtied_blog_ajax_load_more_processing", 0);
                        }), t.onfinish(), 0 == e(".posts-navigation a.next").length && (e(".getbowtied_blog_ajax_load_button").addClass("finished").removeClass("getbowtied_blog_ajax_load_more_hidden"), 
                        e(".getbowtied_blog_ajax_load_button a").show().html(getbowtied_scripts_vars.ajax_no_more_items_locale).addClass("disabled"));
                    });
                } else e(".getbowtied_blog_ajax_load_button").addClass("finished").removeClass("getbowtied_blog_ajax_load_more_hidden"), 
                e(".getbowtied_blog_ajax_load_button a").show().html(getbowtied_scripts_vars.ajax_no_more_items_locale).addClass("disabled");
            })), "infinite_scroll" == getbowtied_scripts_vars.pagination_blog) {
                var i = Math.abs(0);
                e(window).scroll(function() {
                    e(".blog-posts").length && e(".blog-posts").offset().top + e(".blog-posts").outerHeight() - e(window).scrollTop() - i < e(window).height() && 0 == e(".getbowtied_blog_ajax_load_button a").attr("getbowtied_blog_ajax_load_more_processing") && e(".getbowtied_blog_ajax_load_button a").trigger("click");
                });
            }
        },
        onstart: function() {},
        onfinish: function() {}
    };
    ({
        init: function() {
            e(window).load(function() {
                e("#masonry_grid").addClass("fade-in");
            });
        }
    }).init(), e("body").hasClass("search") || (t.init(), t.onfinish());
}), jQuery(document).ready(function(e) {
    "use strict";
    function t() {
        if (e(".product-images-carousel").length) {
            var t = new Swiper(".product-images-carousel", {
                preventClicks: !1,
                preventClicksPropagation: !0,
                autoHeight: !0,
                preloadImages: !0,
                lazyPreloaderClass: "swiper-lazy-preloader",
                updateOnImagesReady: !0,
                lazyLoading: !0,
                onSlideChangeEnd: function() {
                    s(t.activeIndex);
                }
            }), i = e(".product_thumbnails");
            i.on("click", ".carousel-cell", function(t) {
                s(e(t.currentTarget).index());
            });
            function s(e) {
                t.slideTo(e, 300, !1);
                var s = i.find(".carousel-cell"), n = i.height(), o = s.outerHeight();
                i.find(".is-nav-selected").removeClass("is-nav-selected");
                s.eq(t.activeIndex).addClass("is-nav-selected");
                var a = t.activeIndex * o - (n - o) / 2 - 10;
                i.animate({
                    scrollTop: a
                }, 300);
            }
            var n = e("li.carousel-cell:first-child img").attr("src");
            e(".variations_form").on("change", "select", function() {
                e("li.carousel-cell:first-child img").attr("src") != n && (n = e("li.carousel-cell:first-child img").attr("src"), 
                s(0)), e(".product_layout_3").length > 0 && e(window).width() > 960 && e("html,body").animate({
                    scrollTop: e("#primary").offset().top
                });
            }), e(".variations_form").on("click", ".reset_variations", function() {
                s(0);
            });
        }
    }
    function i() {
        var t = new Swiper(".product_content_wrapper .mobile_gallery", {
            preloadImages: !0,
            lazyPreloaderClass: "swiper-lazy-preloader",
            updateOnImagesReady: !0,
            autoHeight: !0,
            lazyLoading: !0
        }), i = new Swiper(".product_content_wrapper .mobile_gallery_thumbs", {
            centeredSlides: !0,
            freeMode: !0,
            slidesPerView: "auto",
            touchRatio: .5,
            slideToClickedSlide: !0,
            nested: !0,
            grabCursor: !0,
            touchMoveStopPropagation: !0,
            preventClicks: !0
        });
        t.params.control = i, i.params.control = t, e(".variations_form").on("change", "select", function() {
            var i = e(".product_images  .product-image:first-child img").attr("src");
            e(".mobile_gallery .swiper-wrapper .swiper-slide:first-child img").attr("src", i), 
            e(".mobile_gallery_thumbs .swiper-wrapper .swiper-slide:first-child").attr("style", "background-image: url(" + i + ")"), 
            t.slideTo(0);
        }), e(".product-image.mobile > a").on("click", function(t) {
            t.preventDefault(), e(".product-image.featured a.fresco").trigger("click");
        });
    }
    function s() {
        if (e(".product_layout_classic") && e(".carousel-cell.youtube")) {
            var t = e(".product_infos");
            e(window).width() > 640 && e(window).width() < 1024 ? t.css({
                "margin-top": "50px"
            }) : t.css({
                "margin-top": "0"
            });
        }
    }
    var n = e(".product_layout_4 .product-image.mobile").detach();
    e(window).on("load resize", function() {
        e(window).width() >= 1024 && e(".product_layout_4").length > 0 ? e(".product_layout_4 .product-image.mobile").detach() : e(".product_layout_4 .product_images .featured ").after(n);
    }), e(".easyzoom").on("click", ".easyzoom-flyout", function() {
        e(this).siblings(".fresco.zoom").trigger("click");
    }), e(window).on("resize", function() {
        s();
    }), e(window).load(function() {
        t(), s(), i();
    });
}), jQuery(document).ready(function(e) {
    function t() {
        var t = (e(window).width() - e(".cd-quick-view").width()) / 2, i = (e(window).height() - e(".cd-quick-view").height()) / 2;
        e(".cd-quick-view").css({
            top: i,
            left: t
        });
    }
    function i(t, i) {
        e(".cd-close");
        var o = e(".empty-box").find("img");
        !e(".cd-quick-view").hasClass("velocity-animating") && e(".cd-quick-view").hasClass("add-content") ? s(o, t, i, "close") : n(o, t, i);
    }
    function s(t, i, s, n) {
        var a = t.parents("li"), r = t.offset().top - e(window).scrollTop(), l = t.offset().left, c = t.width(), h = (t.height(), 
        e(window).width()), d = (h - i) / 2, u = (e(window).height() - 596) / 2, p = .8 * h < s ? .8 * h : s, f = (h - p) / 2;
        "open" == n ? (e("body").addClass("overlay-layer"), a.addClass("empty-box"), e(".cd-quick-view").css({
            top: r,
            left: l,
            width: c,
            height: 596
        }).velocity({
            top: u + "px",
            left: d + "px",
            width: i + "px"
        }, 1e3, [ 400, 20 ], function() {
            e(".cd-quick-view").addClass("animate-width").velocity({
                left: f + "px",
                width: p + "px"
            }, 300, "ease", function() {
                e(".cd-quick-view").addClass("add-content");
                var t = new Swiper(".cd-quick-view .swiper-container", {
                    pagination: ".swiper-pagination",
                    nextButton: ".swiper-button-next",
                    prevButton: ".swiper-button-prev",
                    preventClick: !0,
                    preventClicksPropagation: !0,
                    grabCursor: !0,
                    onTouchStart: function() {
                        o = !1;
                    },
                    onTouchMove: function() {
                        o = !1;
                    },
                    onTouchEnd: function() {
                        setTimeout(function() {
                            o = !0;
                        }, 300);
                    }
                }), i = e(".cd-quick-view").find(".variations_form"), s = e(".cd-quick-view").find(".variations_form .variations select");
                i.wc_variation_form(), s.change(), i.on("change", "select", function() {
                    t.slideTo(0);
                });
            });
        }).addClass("is-visible")) : e(".cd-quick-view").removeClass("add-content").velocity({
            top: u + "px",
            left: d + "px",
            width: i + "px"
        }, 300, "ease", function() {
            e("body").removeClass("overlay-layer"), e(".cd-quick-view").removeClass("animate-width").velocity({
                top: r,
                left: l,
                width: c
            }, 500, "ease", function() {
                e(".cd-quick-view").removeClass("is-visible"), a.removeClass("empty-box");
            });
        });
    }
    function n(t, i, s) {
        var n = t.parents("li"), o = t.offset().top - e(window).scrollTop(), a = t.offset().left, r = t.width();
        e("body").removeClass("overlay-layer"), n.removeClass("empty-box"), e(".cd-quick-view").velocity("stop").removeClass("add-content animate-width is-visible").css({
            top: o,
            left: a,
            width: r
        });
    }
    var o = !0;
    e(document).on("click", ".getbowtied_product_quick_view_button", function(t) {
        t.preventDefault();
        var i = e(this);
        i.parent().find(".product_thumbnail").addClass("loading");
        var n = e(this).data("product_id"), o = e(this).parents("li").find(".product_thumbnail img");
        e.ajax({
            url: shopkeeper_ajaxurl,
            data: {
                action: "getbowtied_product_quick_view",
                product_id: n
            },
            success: function(t) {
                e(".cd-quick-view").empty().html(t), s(o, 480, 960, "open"), console.log(e(".cd-quick-view .product_infos .woocommerce-product-details__short-description").outerHeight()), 
                e(".cd-quick-view .product_infos .woocommerce-product-details__short-description").outerHeight() >= e(".cd-quick-view").outerHeight() ? e(".cd-quick-view").find(".cd-close").css("right", "40px") : e(".cd-quick-view").find(".cd-close").css("right", "28px");
            },
            error: function(e) {
                console.log(e);
            }
        }).done(function() {
            i.parent().find(".product_thumbnail").removeClass("loading");
        });
    }), e("body").on("click", function(t) {
        (e(t.target).is(".cd-close") || e(t.target).is("body.overlay-layer")) && !0 === o && i(480, 960);
    }), e(document).keyup(function(e) {
        "27" == e.which && i(480, 960);
    }), e(window).on("resize", function() {
        e(".cd-quick-view").hasClass("is-visible") && window.requestAnimationFrame(t);
    });
}), jQuery(document).ready(function(e) {
    1 == getbowtied_scripts_vars.option_minicart && (e("body").on("click", ".shopping-bag-button .tools_button, .product_notification_wrapper", function(t) {
        e(".product_notification_wrapper").parent().hide(), e(window).width() >= 1024 ? (t.preventDefault(), 
        e(".shopkeeper-mini-cart").toggleClass("open"), t.stopPropagation()) : t.stopPropagation();
    }), e("body").on("click", function(t) {
        e(".shopkeeper-mini-cart").hasClass("open") && (e(t.target).is(".shopkeeper-mini-cart") || e(t.target).is(".shopping-bags-button .tools-button") || e(t.target).is(".woocommerce-message") || 0 !== e(".shopkeeper-mini-cart").has(t.target).length || e(".shopkeeper-mini-cart").removeClass("open"));
    }));
    var t = "";
    e("body").on("click", ".ajax_add_to_cart", function() {
        if (e(".woocommerce-message").remove(), e("body").hasClass("woocommerce-wishlist")) var i = e(this).parents("tr").find("img.attachment-shop_thumbnail").attr("src"), s = e(this).parents("tr").find(".product-name a").html(); else var i = e(this).parents("li").find("img.attachment-shop_catalog").attr("src"), s = e(this).parents("li").find(".product-title-link").html();
        console.log(i + " // " + s), t = void 0 !== i && void 0 !== s && '<div class="woocommerce-message"><div class="product_notification_wrapper"><div class="product_notification_background" style="background-image:url(' + i + ')"></div><div class="product_notification_text">&quot;' + s + "&quot;" + addedToCartMessage + "</div></div></div>";
    }), e(document).on("added_to_cart", function(i, s) {
        0 != t && e("#content").append(t);
    });
}), jQuery(function(e) {
    "use strict";
    var t = {
        init: function() {
            if ("load_more_button" != getbowtied_scripts_vars.shop_pagination_type && "infinite_scroll" != getbowtied_scripts_vars.shop_pagination_type || (e(document).ready(function() {
                e(".woocommerce-pagination").length && e("body").hasClass("archive") && (e(".woocommerce-pagination").before('<div class="getbowtied_ajax_load_button"><a getbowtied_ajax_load_more_processing="0">' + getbowtied_scripts_vars.ajax_load_more_locale + "</a></div>"), 
                "infinite_scroll" == getbowtied_scripts_vars.shop_pagination_type && e(".getbowtied_ajax_load_button").addClass("getbowtied_ajax_load_more_hidden"), 
                0 == e(".woocommerce-pagination a.next").length && e(".getbowtied_ajax_load_button").addClass("getbowtied_ajax_load_more_hidden"), 
                e(".woocommerce-pagination").hide());
            }), e("body").on("click", ".getbowtied_ajax_load_button a", function(i) {
                if (i.preventDefault(), e(".woocommerce-pagination a.next").length) {
                    e(".getbowtied_ajax_load_button a").attr("getbowtied_ajax_load_more_processing", 1);
                    var s = e(".woocommerce-pagination a.next").attr("href");
                    t.onstart(), e(".getbowtied_ajax_load_button").fadeOut(200, function() {
                        e(".woocommerce-pagination").before('<div class="getbowtied_ajax_load_more_loader"><span>' + getbowtied_scripts_vars.ajax_loading_locale + "</span></div>");
                    }), e.get(s, function(i) {
                        e(".woocommerce-pagination").html(e(i).find(".woocommerce-pagination").html());
                        var s = 0;
                        e(i).find("ul.products li").each(function() {
                            s++, e(this).find(".product_thumbnail.with_second_image").css("background-size", "cover"), 
                            e(this).find(".product_thumbnail.with_second_image").addClass("second_image_loaded"), 
                            e(this).addClass("ajax-loaded delay-" + s), e("ul.products li:last").after(e(this));
                        }), e(".getbowtied_ajax_load_more_loader").fadeOut(200, function() {
                            e(".getbowtied_ajax_load_button").fadeIn(200), e(".getbowtied_ajax_load_button a").attr("getbowtied_ajax_load_more_processing", 0);
                        }), t.onfinish(), setTimeout(function() {
                            e("ul.products li.hidden").removeClass("hidden").addClass("animate");
                        }, 500), 0 == e(".woocommerce-pagination a.next").length && (e(".getbowtied_ajax_load_button").addClass("finished").removeClass("getbowtied_ajax_load_more_hidden"), 
                        e(".getbowtied_ajax_load_button a").show().html(getbowtied_scripts_vars.ajax_no_more_items_locale).addClass("disabled"));
                    });
                } else e(".getbowtied_ajax_load_button").addClass("finished").removeClass("getbowtied_ajax_load_more_hidden"), 
                e(".getbowtied_ajax_load_button a").show().html(getbowtied_scripts_vars.ajax_no_more_items_locale).addClass("disabled");
            })), "infinite_scroll" == getbowtied_scripts_vars.shop_pagination_type) {
                var i = Math.abs(0);
                e(window).scroll(function() {
                    e("ul.products").length && e("ul.products").offset().top + e("ul.products").outerHeight() - e(window).scrollTop() - i < e(window).height() && 0 == e(".getbowtied_ajax_load_button a").attr("getbowtied_ajax_load_more_processing") && e(".getbowtied_ajax_load_button a").trigger("click");
                });
            }
        },
        onstart: function() {},
        onfinish: function() {}
    };
    t.init(), t.onfinish();
}), jQuery(document).ready(function(e) {
    "use strict";
    e(window).load(function() {
        if (e(".easyzoom").length) if (e(window).width() > 1024) {
            var t = e(".easyzoom").easyZoom({
                loadingNotice: "",
                errorNotice: "",
                preventClicks: !1,
                linkAttribute: "href"
            }).data("easyZoom");
            e(".variations").on("change", "select", function() {
                t.teardown(), t._init();
            });
        } else e(".easyzoom a").click(function(e) {
            e.preventDefault();
        });
    });
}), jQuery(document).ready(function(e) {
    "use strict";
    var t = e(".product-images-controller"), i = e(".product-images-style-2 .product_images .product-image:not(.mobile), .product-images-style-3 .product_images .product-image:not(.mobile)"), s = e(".product-images-style-2 .product-images-controller li a span.dot, .product-images-style-3 .product-images-controller li a span.dot"), n = e(".product-images-wrapper"), o = e(".site-header.sticky").outerHeight();
    e(".product_layout_2").length > 0 && e(".product_layout_2 .product-images-controller").css("top", n.offset().top), 
    e(window).scroll(function() {
        s.addClass("current"), i.each(function() {
            var i = e(this), n = e(' a[href="#' + i.attr("id") + '"]').data("number");
            i.offset().top + i.outerHeight() <= t.offset().top - o ? (s.removeClass("current"), 
            s.eq(n).addClass("current")) : s.eq(n).removeClass("current");
        });
        var n = e(".product_layout_2 .fluid-width-video-wrapper, .product_layout_3 .fluid-width-video-wrapper");
        n.length > 0 && (n.offset().top <= t.offset().top - o ? e("li.video-icon span.dot").addClass("current") : e(".product-images-controller .video-icon .dot").removeClass("current"), 
        n.offset().top + n.outerHeight() <= t.offset().top && e(".product-images-controller .video-icon .dot").removeClass("current"));
    }), e(".single-product").length > 0 && e('a[href*="#controller-navigation-image"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var t = e(this.hash);
            if (t = t.length ? t : e("[name=" + this.hash.slice(1) + "]"), e("#wpadminbar").length > 0) i = e("#wpadminbar").outerHeight(); else var i = "";
            if (t.length) return e("html, body").animate({
                scrollTop: t.offset().top - e(".site-header.sticky").outerHeight() - i
            }, 500), !1;
        }
    }), e(".product-image.video .fluid-width-video-wrapper iframe") && e(".product_layout_2 .product-images-controller .video-icon > a, .product_layout_3 .product-images-controller .video-icon > a").on("click", function(t) {
        e(".product-image.video .fluid-width-video-wrapper iframe")[0].src += "&autoplay=1", 
        t.preventDefault();
    });
}), jQuery(document).ready(function(e) {
    "use strict";
    function t() {
        if (e(".product_layout_3").length > 0) {
            e(".product_layout_3 .product-images-wrapper").width();
            var t = e(".product_layout_3 .product-images-wrapper"), i = e(".product_layout_3 .product_title"), s = e(".product_layout_3 .product-images-wrapper").width() / e(window).width() * 100;
            if (i.css({
                width: e(window).width(),
                left: "auto"
            }), e(window).width() >= 1024) {
                i.css({
                    left: e(".product_layout_3 .product-images-controller").offset().left
                }), i.addClass("for-desktop"), i.css({
                    width: .75 * s + "%"
                });
                var n = e(".product_layout_3 .product-images-controller"), o = e(".product_layout_3 .product-badges"), a = i.outerHeight();
                n.css("top", t.offset().top + a + 40), o.css("top", a + 40);
            } else i.removeClass("for-desktop");
        }
    }
    if (e(".product_layout_2").length > 0 || e(".product_layout_3").length > 0 || e(".product_layout_4").length > 0) {
        var i = e(".product .product_content_wrapper .product_infos").outerHeight(), s = (e(".product .product_content_wrapper .product_infos").position().top, 
        e(".product .product_content_wrapper .product_infos").outerWidth(), e(".product_content_wrapper").offset().top);
        i > e(window).innerHeight() - s && e(window).width() >= 1024 ? e(".product_infos").addClass("long-description") : e(".product_infos").css({
            top: s
        }), e(window).scroll(function() {
            var t = e(window).scrollTop(), i = e("#site-footer").offset().top, n = (e(".product_infos.fixed").offset().top, 
            e(".product_infos.fixed").height());
            e("#site-footer");
            t + n + 200 > i - 40 ? e(".product_infos.fixed:not(.long-description)").css({
                top: -1 * (t + n - i + 40)
            }) : e(".product_infos.fixed:not(.long-description)").css({
                top: s
            });
        });
    }
    t(), e(window).resize(function() {
        t();
    });
}), jQuery(document).ready(function(e) {
    "use strict";
    if (e(window).width() > 1024) {
        var t = e(".product .woocommerce-product-rating .woocommerce-review-link").html(), i = (e(".product .woocommerce_review_link_hover"), 
        e(".product .woocommerce-product-rating")), s = '<div class="woocommerce_review_link_hover">' + t + "</div>";
        void 0 != t && (i.before(s), i.hover(function() {
            e(".woocommerce_review_link_hover").addClass("hovered");
        }, function() {
            e(".woocommerce_review_link_hover").removeClass("hovered");
        }));
    }
}), jQuery(document).ready(function(e) {
    if (e(document).on("click", ".plus-btn", function(t) {
        $input = e(this).prev("input.custom-qty");
        var i = parseInt($input.val());
        $input.val(i + 1).change();
    }), e(document).on("click", ".minus-btn", function(t) {
        $input = e(this).next("input.custom-qty");
        var i = parseInt($input.val());
        i > 1 && $input.val(i - 1).change();
    }), e(window).width() > 1024) {
        var t;
        e(document).on("mousedown", ".plus-btn", function(i) {
            $input = e(this).prev("input.custom-qty");
            var s = parseInt($input.val());
            t = setInterval(function() {
                s++, $input.val(s);
            }, 250);
        }), e(document).on("mousedown", ".minus-btn", function(i) {
            $input = e(this).next("input.custom-qty");
            var s = parseInt($input.val());
            t = setInterval(function() {
                s > 1 && (s--, $input.val(s));
            }, 250);
        }), document.addEventListener("mouseup", function() {
            t && clearInterval(t);
        });
    }
}), jQuery(function(e) {
    "use strict";
    if (e(".wishlist_items_number").length) {
        var t = 0, i = function(e) {
            var t = document.cookie, i = e + "=", s = t.indexOf("; " + i);
            if (-1 == s) {
                if (0 != (s = t.indexOf(i))) return null;
            } else {
                s += 2;
                var n = document.cookie.indexOf(";", s);
                -1 == n && (n = t.length);
            }
            return decodeURIComponent(decodeURIComponent(t.substring(s + i.length, n)));
        }("yith_wcwl_products");
        if (null != i) {
            var s = JSON.parse(i);
            t = Object.keys(s).length;
        } else t = Number(e(".wishlist_items_number").html());
        e("body").on("added_to_wishlist", function() {
            n(++t);
        }), e("body").on("removed_from_wishlist", function() {
            n(--t);
        });
        function n(t) {
            Number.isInteger(t) && t >= 0 && e(".wishlist_items_number").html(t);
        }
        n(t);
    }
}), jQuery(document).ready(function(e) {
    "use strict";
    !function() {
        1 == getbowtied_scripts_vars.catalog_mode && (e("form.cart div.quantity").empty(), 
        e("form.cart button.single_add_to_cart_button").remove());
    }();
}), jQuery(function(e) {
    "use strict";
    e(".shortcode_getbowtied_slider").each(function() {
        new Swiper(e(this), {
            direction: "horizontal",
            loop: !0,
            grabCursor: !0,
            preventClicks: !0,
            preventClicksPropagation: !0,
            autoplay: 1e4,
            speed: 600,
            effect: "slide",
            pagination: e(this).find(".shortcode-slider-pagination"),
            paginationClickable: !0,
            nextButton: e(this).find(".swiper-button-next"),
            prevButton: e(this).find(".swiper-button-prev"),
            parallax: !0
        });
    });
}), jQuery(function(e) {
    "use strict";
    e(window).load(function() {}), e(window).resize(function() {}), e(window).scroll(function() {}), 
    e("a.has-hover-img").mousemove(function(t) {
        var i = e(this).parent().offset(), s = t.pageX - i.left + 20, n = t.pageY - i.top + 10;
        e(this).find("span.menu-hover-img").stop().css({
            left: s,
            top: n
        });
    });
});