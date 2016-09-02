"use strict";
(function (root, factory) {
    /* istanbul ignore next */
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);
        if (v !== undefined)
            module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
    else {
        // Browser globals (root is window)
        var browserRequire = function (name) {
            throw new Error("Unable to require: " + name);
        };
        root.removeJsonComments = factory(browserRequire, {});
    }
})(this, function (require, exports) {
    function _removeComments(input) {
        while (input) {
            var startCommentIndex = input.indexOf("/*");
            if (startCommentIndex <= -1)
                break;
            var endCommentIndex = input.indexOf("*/");
            if (endCommentIndex <= -1)
                break;
            if (startCommentIndex > -1 && endCommentIndex > -1 && startCommentIndex < endCommentIndex) {
                input = input.substr(0, startCommentIndex) + input.substr(endCommentIndex + 2);
            }
        }
        return input;
        //aValue = aValue.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:^\s*\/\/(?:.*)$)/gm, '$1');
    }
    return _removeComments;
});
