"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertRemUnits = convertRemUnits;
exports["default"] = _default;

var _conversions = require("../util/conversions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getScreen(ctx, screenKey) {
  return ctx.theme.screens[ctx.theme.screensByKey[screenKey]];
}

function updateContext(ctx, screenKey) {
  ctx.theme.currentScreen = _objectSpread({}, getScreen(ctx, screenKey));
}

function resetContext(ctx) {
  ctx.theme.currentScreen = getScreen(ctx, ctx.theme.defaultScreenKey);
}

function convertRemUnits(decl, baseFontSizePx) {
  var pixelValue = decl.value.replace('rem(', '').replace('px)', '');
  var newValue = (0, _conversions.pxToRem)(pixelValue, baseFontSizePx);
  decl.replaceWith({
    prop: decl.prop,
    value: "".concat(newValue, "rem")
  });
}

function _default(ctx) {
  return function (css) {
    css.walkAtRules('screen', function (atRule) {
      if (!(atRule.params in ctx.theme.screensByKey)) {
        throw atRule.error("'@screen ".concat(atRule.params, "' is an invalid breakpoint value. "));
      }

      updateContext(ctx, atRule.params);
      var _ctx$theme$currentScr = ctx.theme.currentScreen,
          breakpointStartPx = _ctx$theme$currentScr.breakpointStartPx,
          baseFontSizePx = _ctx$theme$currentScr.baseFontSizePx;
      atRule.name = 'media';
      atRule.params = "screen and (min-width: ".concat(breakpointStartPx, "px)"); // Convert any rem units for this screen because rems are
      // relative to the baseFontSize of the current screen

      atRule.walkDecls(function (decl) {
        if (decl.value.includes('rem(')) {
          convertRemUnits(decl, baseFontSizePx);
        }
      });
      resetContext(ctx);
    });
  };
}