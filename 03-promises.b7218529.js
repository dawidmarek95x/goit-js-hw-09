!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){r[e]=n},n.parcelRequired7c6=o);var u=o("iU1Pc"),i=function(e){return document.querySelector(e)},a=i(".form"),c=i('[name="delay"]'),f=i('[name="step"]'),l=i('[name="amount"]');function d(n,t){return new Promise((function(r,o){setTimeout((function(){Math.random()>.3?r(e(u).Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))):o(e(u).Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms")))}),t)}))}a.addEventListener("submit",(function(e){e.preventDefault();for(var n=Number(c.value),t=1;t<=Number(l.value);t++)d(t,n).then((function(e){return e})).catch((function(e){return e})),n+=Number(f.value)}))}();
//# sourceMappingURL=03-promises.b7218529.js.map