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
            if ((name.indexOf("removeJsonComments") > -1 ||
                name.indexOf("remove-json-comments") > -1) && root.removeJsonComments) {
                return root.removeJsonComments;
            }
            if (name.indexOf("strip-json-comments") > -1 && root.stripJsonComments) {
                return root.stripJsonComments;
            }
            throw new Error("Unable to require: " + name);
        };
        factory(browserRequire, {});
    }
})(this, function (require, exports) {
    var removeJsonComments = require("../src/removeJsonComments");
    //let removeJsonComments = require("remove-json-comments");
    //let stripJsonComments = require("strip-json-comments");
    //let removeJsonComments = (input) => { return stripJsonComments(input, { whitespace: false }); }
    describe("Default tests", function () {
        beforeEach(function () {
        });
        it("Test JSON.parse() throw error if contains comment", function () {
            var inputText = '{ "a": 1, /* hello world */ "b": 2 }';
            expect(function () {
                JSON.parse(inputText);
            }).toThrowError(/token|invalid|parse/i);
        });
        it("Test remove one comment", function () {
            var inputText = '{ "a": 1, /* hello world */ "b": 2 }';
            inputText = removeJsonComments(inputText);
            var input = JSON.parse(inputText);
            expect(input).toEqual({
                a: 1,
                b: 2,
            });
        });
        it("Test remove multiple comments", function () {
            var inputText = "{ \n                \"a\": 1, /* hello world */ \n                \"b\": 2, \n                \"c\": tr/* comment 2 */ue,\n                \"d\": 33/*, \n                \"e\": 44 */ \n            }";
            inputText = removeJsonComments(inputText);
            var input = JSON.parse(inputText);
            expect(input).toEqual({
                a: 1,
                b: 2,
                c: true,
                d: 33
            });
        });
        it("Test remove multiple comments, and ignore comments in the string", function () {
            var inputText = "{ \n                \"a\": 1, /* hello world */ \n                \"b\": 2, \n                \"c\": tr/* comment 2 */ue,\n                \"d\": 33/*, \n                \"e\": 44 */,\n                \"f\": \"String con/*tains fake */comments\",\n                \"g\": \"String con/*tains fake comments\",\n                \"h\": \"String contains*/ fake comments\"\n            }";
            inputText = removeJsonComments(inputText);
            var input = JSON.parse(inputText);
            expect(input).toEqual({
                a: 1,
                b: 2,
                c: true,
                d: 33,
                f: "String con/*tains fake */comments",
                g: "String con/*tains fake comments",
                h: "String contains*/ fake comments"
            });
        });
        it("Test remove line comments", function () {
            var inputText = "{ \n                \"a\": 1, /* hello world */ \n                \"b\": 2, \n                \"c\": tr/* comment 2 */ue,\n                \"d\": 33/*, \n                \"e\": 44 */,\n                \"f\": \"String con/*tains fake */comments\",\n                \"g\": \"String con/*tains fake comments\",\n                \"h\": \"String contains*/ fake comments\",\n                \"i\": \"With line comment\",  //, line comment\n                //\"j\": \"line that got commented out,\n                \"k\": 55\n            }";
            inputText = removeJsonComments(inputText);
            var input = JSON.parse(inputText);
            expect(input).toEqual({
                a: 1,
                b: 2,
                c: true,
                d: 33,
                f: "String con/*tains fake */comments",
                g: "String con/*tains fake comments",
                h: "String contains*/ fake comments",
                i: "With line comment",
                k: 55,
            });
        });
        it("Test remove line comments", function () {
            var inputText = "{ \n                \"a\": 1, /* hello world */ \n                \"b\": 2, \n                \"c\": tr/* comment 2 */ue,\n                \"d\": 33/*, \n                \"e\": 44 */,\n                \"f\": \"String con/*tains fake */comments\",\n                \"g\": \"String con/*tains fake comments\",\n                \"h\": \"String contains*/ fake comments\",\n                \"i\": \"With line comment\",  //, line comment\n                //\"j\": \"line that got commented out,\n                \"k\": 55\n            }";
            inputText = removeJsonComments(inputText);
            var input = JSON.parse(inputText);
            expect(input).toEqual({
                a: 1,
                b: 2,
                c: true,
                d: 33,
                f: "String con/*tains fake */comments",
                g: "String con/*tains fake comments",
                h: "String contains*/ fake comments",
                i: "With line comment",
                k: 55,
            });
        });
    });
});
