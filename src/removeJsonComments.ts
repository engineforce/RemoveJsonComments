
"use strict";

declare var define;

interface IRemoveJsonComments {
    (value: string): string;
}

(function (root, factory) {
    /* istanbul ignore next */
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
    else {
        // Browser globals (root is window)
        let browserRequire = (name) => {
            if (name.indexOf("strip-json-comments") > -1 && root.stripJsonComments) {
                return root.stripJsonComments;
            }
            
            throw new Error("Unable to require: " + name);
        }
        root.removeJsonComments = factory(browserRequire, {});
    }
})(this, function (require, exports) {

    // Find out that this library does everything I need.
    var stripJsonComments = require("strip-json-comments");
    return (input) => stripJsonComments(input, { whitespace: false });

    // function _removeComments(input) {

    //     while (input) {
    //         var startCommentIndex = input.indexOf("/*");

    //         if (startCommentIndex <= -1)
    //             break;

    //         var endCommentIndex = input.indexOf("*/");
    //         if (endCommentIndex <= -1)
    //             break;

    //         if (startCommentIndex > -1 && endCommentIndex > -1 && startCommentIndex < endCommentIndex) {
    //             input = input.substr(0, startCommentIndex) + input.substr(endCommentIndex + 2);
    //         }
    //     }

    //     return input;

    //     //aValue = aValue.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:^\s*\/\/(?:.*)$)/gm, '$1');
    // }

    // return _removeComments;
});



