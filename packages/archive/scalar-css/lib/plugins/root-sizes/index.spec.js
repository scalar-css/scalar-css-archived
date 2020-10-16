"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _ = _interopRequireWildcard(require("./"));

var _setup = _interopRequireDefault(require("../../scalar-css/src/core/setup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ctx = (0, _setup["default"])({});
var startScreen = ctx.theme.screens[0];
var smScreen = ctx.theme.screens[1];
var mdScreen = ctx.theme.screens[2];
var lgScreen = ctx.theme.screens[3];
var xlScreen = ctx.theme.screens[4];
var endScreen = ctx.theme.screens[5];
describe('@scalar-css/scalar-css-plugin-root-sizes', function () {
  it('should generate our start root size properly', function () {
    var actual = (0, _.calculateRootFontSize)(startScreen);
    var expected = 'clamp(100%, 5vw, 180%)';
    expect(actual).toBe(expected);
  });
  it('should generate our sm root size properly', function () {
    var actual = (0, _.calculateRootFontSize)(smScreen);
    var expected = 'clamp(100%, 2.7777777777777777vw, 133.33333333333334%)';
    expect(actual).toBe(expected);
  });
  it('should generate our md root size properly', function () {
    var actual = (0, _.calculateRootFontSize)(mdScreen);
    var expected = 'clamp(100%, 2.083333333333333vw, 129.16666666666666%)';
    expect(actual).toBe(expected);
  });
  it('should generate our lg root size properly', function () {
    var actual = (0, _.calculateRootFontSize)(lgScreen);
    var expected = 'clamp(100%, 1.6129032258064515vw, 120.96774193548387%)';
    expect(actual).toBe(expected);
  });
  it('should generate our xl root size properly', function () {
    var actual = (0, _.calculateRootFontSize)(xlScreen);
    var expected = 'clamp(125%, 1.6666666666666667vw, 150%)';
    expect(actual).toBe(expected);
  });
  it('should generate our end root size properly', function () {
    var actual = (0, _.calculateRootFontSize)(endScreen, xlScreen);
    var expected = '150%';
    expect(actual).toBe(expected);
  });
  it('should properly generate the html/css properly', function () {
    (0, _["default"])(ctx);
    var rootNode = ctx.theme.screens[0].rootNode.toString();
    var expected = ":root {\n    --baseline: 1.5;\n    --rhythm: 0.75;\n    --baseline-rem: 1.5rem;\n    --rhythm-rem: 0.75rem}\nhtml {\n    line-height: 1.5;\n    font-size: clamp(100%, 5vw, 180%)}";
    expect(rootNode).toBe(expected); // 'md' screen

    rootNode = ctx.theme.screens[2].rootNode.toString();
    expected = "@screen md {\n:root {\n--baseline: 1.5;\n--rhythm: 0.75;\n--baseline-rem: 1.5rem;\n--rhythm-rem: 0.75rem}\nhtml {\nline-height: 1.5;\nfont-size: clamp(100%, 2.083333333333333vw, 129.16666666666666%)\n}\n}";
    expect(rootNode).toBe(expected); // 'end' screen

    rootNode = ctx.theme.screens[5].rootNode.toString();
    expected = "@screen end {\n:root {\n--baseline: 1.5;\n--rhythm: 0.75;\n--baseline-rem: 1.5rem;\n--rhythm-rem: 0.75rem}\nhtml {\nline-height: 1.5;\nfont-size: 150%\n}\n}";
    expect(rootNode).toBe(expected);
  });
});