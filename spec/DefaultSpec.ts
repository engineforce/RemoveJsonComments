
"use strict";

(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports); if (v !== undefined) module.exports = v;
  }
  else if (typeof define === 'function' && define.amd) {
    define(["require", "exports"], factory);
  } else {
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

  describe("Default tests", function () {

    beforeEach(function () {
    });

    it("Access array item", function () {

    });

  });

});