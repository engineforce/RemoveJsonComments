
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

      if (name.indexOf("removeJsonComments") > -1 && root.removeJsonComments) {
        return root.removeJsonComments;
      }

      throw new Error("Unable to require: " + name);
    }
    factory(browserRequire, {});
  }
})(this, function (require, exports) {

  var removeJsonComments: IRemoveJsonComments = require("../src/removeJsonComments");

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
  });

});