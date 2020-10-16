"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBaseFontSizePx = setBaseFontSizePx;
exports.setBaseLineHeight = setBaseLineHeight;
exports.setVerticalRhythm = setVerticalRhythm;
exports.setBreakpointEndPx = setBreakpointEndPx;
exports.setFontScale = setFontScale;
exports.setRootCSSNode = setRootCSSNode;
exports.replaceFontStackRefs = replaceFontStackRefs;
exports.finalizeScreens = finalizeScreens;
exports["default"] = setup;

var _postcss = _interopRequireDefault(require("postcss"));

var _fontScales = _interopRequireDefault(require("../defaults/fontScales"));

var _fontStacks = _interopRequireDefault(require("../defaults/fontStacks"));

var _helpers = require("../util/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Set the base font size in pixels for the current screen
 *
 * @param {Object} screen
 * @param {Object} prevScreen *
 * @returns {Integer} the base font size in pixels
 */
function setBaseFontSizePx(screen, prevScreen) {
  if (screen.key === 'start' && !screen.baseFontSizePx) {
    throw new Error("Invalid config for '".concat(screen.key, "' screen. You must provide a 'baseFontSizePx' value."));
  }

  return screen.baseFontSizePx ? screen.baseFontSizePx : prevScreen.baseFontSizePx;
}
/**
 * Set the base line-height for the current screen
 *
 * @param {Object} screen
 * @param {Object} prevScreen *
 * @returns {Number} the base line height as a unitless number value
 */


function setBaseLineHeight(screen, prevScreen) {
  if (screen.key === 'start' && !screen.baseLineHeight) {
    throw new Error("Invalid config for '".concat(screen.key, "' screen. You must provide a 'baseLineHeight' value."));
  }

  return screen.baseLineHeight ? screen.baseLineHeight : prevScreen.baseLineHeight;
}
/**
 * Set the vertical rhythm for the current screen
 *
 * If the user hasn't provided a custom vertical rhythm in a unitless
 * number (`screen.verticalRhythm`), then we use half the baseline as a default.
 *
 * @param {Object} screen current screen *
 * @returns {Number} the vertical rhythm in a unitless number value
 */


function setVerticalRhythm(screen, prevScreen) {
  if (screen.verticalRhythm) {
    return screen.verticalRhythm;
  } else if (prevScreen !== null && prevScreen.verticalRhythm) {
    return prevScreen.verticalRhythm;
  }

  return screen.baseLineHeight / 2;
}
/**
 * Set the 'end' value for our current screen's range
 *
 * The 'end' screen is special because our site no longer scales upon
 * hitting this breakpoint, so we set the start/end breakpoints for
 * this screen to the same value
 *
 * @param {Object} screen
 * @param {Object} nextScreen
 * @returns {Integer} the end breakpoint value in pixels
 */


function setBreakpointEndPx(screen, nextScreen) {
  return screen.key === 'end' ? screen.breakpointStartPx : nextScreen.breakpointStartPx;
}
/**
 * Set the font scale for the current screen
 *
 * If the user hasn't specified their own modular scale value on the
 * `screen.fontScale` value, we create it based on a modular scale
 * id they provided (or use the value from the previous screen)
 *
 * @param {Object} screen
 * @param {Object} prevScreen
 * @returns {Number}
 */


function setFontScale(screen, prevScreen) {
  if (screen.fontScale) {
    return screen.fontScale;
  }

  if (screen.fontScaleId && !(screen.fontScaleId in _fontScales["default"])) {
    // @todo add reference URL to default modular scales
    throw new Error("Invalid font scale settings for '".concat(screen.key, "'. You must either provide a 'modularScale' float value, or specify a 'modularScaleId' value that matches one of the default modular scales provided by Scalar CSS."));
  }

  return screen.fontScaleId && screen.fontScaleId in _fontScales["default"] ? _fontScales["default"][screen.fontScaleId] : prevScreen.fontScale;
}
/**
 * Generate a new root css node to attach to our context object. This node
 * is used to insert our generated utility classes and css variables directly
 * from our plugins so that all of the final CSS is output in a single
 * bundle that is organized by screen
 *
 * @param {Object} screen
 */


function setRootCSSNode(screen) {
  var root = _postcss["default"].root({
    after: '\n'
  });

  return screen.key === 'start' ? root.append(':root {}') : root.append(_postcss["default"].parse("@screen ".concat(screen.key, " {\n:root {}\n}")));
}
/**
 * Loop through our theme's font properties, and for any properties
 * that have a child referencing one of our default font stacks,
 * merge the default font stacks' properties in
 *
 * @param {Object} config
 */


function replaceFontStackRefs(config) {
  Object.entries(config.theme.fonts).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        settings = _ref2[1];

    if (settings.fontFamily in _fontStacks["default"]) {
      var stack = _fontStacks["default"][settings.fontFamily];
      config.theme.fonts[id] = _objectSpread(_objectSpread({}, settings), stack);
    }
  });
}
/**
 * Finalize the screen properties by duplicating/merging a few values
 * to allow easier access to properties for calculation purposes in
 * other areas of the framework. If a screen does not have new/existing
 * values set, then we re-use the values from the previous screen.
 *
 * @param {Object} config
 * @returns {Object}
 */


function finalizeScreens(config) {
  config.theme.screens.forEach(function (screen, index) {
    var nextScreen = config.theme.screens[index + 1];
    var prevScreen = index !== 0 ? config.theme.screens[index - 1] : null;
    screen.baseFontSizePx = setBaseFontSizePx(screen, prevScreen);
    screen.baseLineHeight = setBaseLineHeight(screen, prevScreen);
    screen.verticalRhythm = setVerticalRhythm(screen, prevScreen);
    screen.breakpointEndPx = setBreakpointEndPx(screen, nextScreen);
    screen.fontScale = setFontScale(screen, prevScreen);
    screen.baseLineHeightPx = screen.baseLineHeight * screen.baseFontSizePx;
    screen.verticalRhythmPx = screen.verticalRhythm * screen.baseFontSizePx;
    screen.rootNode = setRootCSSNode(screen);
    screen.htmlRoot = screen.key === 'start' ? screen.rootNode : screen.rootNode.nodes[0];
    screen.varsRoot = screen.htmlRoot.nodes[0];
  });
  replaceFontStackRefs(config);
  return config;
}
/**
 * Take our config and build out our custom context that will
 * be used for calculations throughout the rest of the framework
 *
 * @param {Object} defaultConfig Scalar's default config
 * @param {Object} userConfig User's configuration
 *
 * @returns {Object} ctx Finalized context that is used throughout framework
 */


function setup() {
  var userConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // const config = finalizeScreens(merge(defaultConfig, userConfig))
  if ((0, _helpers.objectIsEmpty)(userConfig)) {
    return;
  }

  var config = finalizeScreens(userConfig);
  var ctx = (0, _helpers.merge)(config, {
    theme: {
      currentScreen: config.theme.screens[0],
      defaultScreenKey: config.theme.screens[0].key
    }
  }); // Provide additional, easy access to screen values by their key

  ctx.theme.screensByKey = config.theme.screens.reduce(function (available, screen, index) {
    return _objectSpread(_objectSpread({}, available), {}, _defineProperty({}, screen.key, index));
  }, {});
  return ctx;
}