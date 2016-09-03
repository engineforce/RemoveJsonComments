
"use strict";

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

            if ((name.indexOf("removeJsonComments") > -1 ||
                name.indexOf("remove-json-comments") > -1) && root.removeJsonComments) {
                return root.removeJsonComments;
            }

            if (name.indexOf("strip-json-comments") > -1 && root.stripJsonComments) {
                return root.stripJsonComments;
            }

            throw new Error("Unable to require: " + name);
        }
        factory(browserRequire, {});
    }
})(this, function (require, exports) {

    let removeJsonComments: IRemoveJsonComments = require("../src/removeJsonComments");
    //let removeJsonComments = require("remove-json-comments");
    //let stripJsonComments = require("strip-json-comments");
    //let removeJsonComments = (input) => { return stripJsonComments(input, { whitespace: false }); }

    describe("Default tests", function () {

        beforeEach(function () {
        });

        it("Test JSON.parse() throw error if contains comment", function () {
            let inputText = '{ "a": 1, /* hello world */ "b": 2 }';

            expect(() => {
                JSON.parse(inputText);
            }).toThrowError(/token|invalid|parse/i);

        });

        it("Test remove one comment", function () {
            let inputText = '{ "a": 1, /* hello world */ "b": 2 }';
            inputText = removeJsonComments(inputText);
            let input = JSON.parse(inputText);
            expect(input).toEqual({
                a: 1,
                b: 2,
            })
        });

        it("Test remove multiple comments", function () {
            let inputText = `{ 
                "a": 1, /* hello world */ 
                "b": 2, 
                "c": tr/* comment 2 */ue,
                "d": 33/*, 
                "e": 44 */ 
            }`;
            inputText = removeJsonComments(inputText);
            let input = JSON.parse(inputText);
            expect(input).toEqual({
                a: 1,
                b: 2,
                c: true,
                d: 33
            })
        });

        it("Test remove multiple comments, and ignore comments in the string", function () {
            let inputText = `{ 
                "a": 1, /* hello world */ 
                "b": 2, 
                "c": tr/* comment 2 */ue,
                "d": 33/*, 
                "e": 44 */,
                "f": "String con/*tains fake */comments",
                "g": "String con/*tains fake comments",
                "h": "String contains*/ fake comments"
            }`;
            inputText = removeJsonComments(inputText);
            let input = JSON.parse(inputText);
            expect(input).toEqual({
                a: 1,
                b: 2,
                c: true,
                d: 33,
                f: "String con/*tains fake */comments",
                g: "String con/*tains fake comments",
                h: "String contains*/ fake comments"
            })

        });

        it("Test remove line comments", function () {
            let inputText = `{ 
                "a": 1, /* hello world */ 
                "b": 2, 
                "c": tr/* comment 2 */ue,
                "d": 33/*, 
                "e": 44 */,
                "f": "String con/*tains fake */comments",
                "g": "String con/*tains fake comments",
                "h": "String contains*/ fake comments",
                "i": "With line comment",  //, line comment
                //"j": "line that got commented out,
                "k": 55
            }`;
            inputText = removeJsonComments(inputText);
            let input = JSON.parse(inputText);
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
            let inputText = `{ 
                "a": 1, /* hello world */ 
                "b": 2, 
                "c": tr/* comment 2 */ue,
                "d": 33/*, 
                "e": 44 */,
                "f": "String con/*tains fake */comments",
                "g": "String con/*tains fake comments",
                "h": "String contains*/ fake comments",
                "i": "With line comment",  //, line comment
                //"j": "line that got commented out,
                "k": 55
            }`;
            inputText = removeJsonComments(inputText);
            let input = JSON.parse(inputText);
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