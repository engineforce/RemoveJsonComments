
"use strict";

declare var define;

(function (root, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    } else {
        // Browser globals (root is window)
        let browserRequire = (name) => {
            throw new Error("Unable to require: " + name);
        }
        root.removeJsonComments = factory(browserRequire, {});
    }
})(this, function (require, exports) {

    
});



