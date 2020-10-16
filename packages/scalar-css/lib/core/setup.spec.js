"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _setup = _interopRequireWildcard(require("./setup"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('src/setup.js', function () {
  it('should throw errors for missing values on the start screen', function () {
    var screen = {
      key: 'start'
    };
    expect(function () {
      (0, _setup.setBaseFontSizePx)(screen, null);
    }).toThrowError("Invalid config for 'start' screen. You must provide a 'baseFontSizePx' value.");
    expect(function () {
      (0, _setup.setBaseLineHeight)(screen, null);
    }).toThrowError("Invalid config for 'start' screen. You must provide a 'baseLineHeight' value.");
  });
  it('should throw errors for an invalid fontScaleId value', function () {
    var screen = {
      key: 'sm',
      fontScaleId: 'bloop'
    };
    expect(function () {
      (0, _setup.setFontScale)(screen, null);
    }).toThrowError("Invalid font scale settings for '".concat(screen.key, "'. You must either provide a 'modularScale' float value, or specify a 'modularScaleId' value that matches one of the default modular scales provided by Scalar CSS."));
  });
  it('should properly set the baseFontSizePx value', function () {
    var prevScreen = {
      key: 'sm',
      baseFontSizePx: 16
    };
    var screen = {
      key: 'md',
      baseFontSizePx: 18
    };
    var actual = (0, _setup.setBaseFontSizePx)(screen, prevScreen);
    expect(actual).toBe(18);
    delete screen.baseFontSizePx;
    actual = (0, _setup.setBaseFontSizePx)(screen, prevScreen);
    expect(actual).toBe(16);
  });
  it('should properly set the baseLineHeight value', function () {
    var prevScreen = {
      key: 'sm',
      baseLineHeight: 1.4
    };
    var screen = {
      key: 'md',
      baseLineHeight: 1.5
    };
    var actual = (0, _setup.setBaseLineHeight)(screen, prevScreen);
    expect(actual).toBe(1.5);
    delete screen.baseLineHeight;
    actual = (0, _setup.setBaseLineHeight)(screen, prevScreen);
    expect(actual).toBe(1.4);
  });
  it('should properly set the verticalRhythm value', function () {
    var vr = {
      key: 'sm',
      verticalRhythm: 0.75
    };
    var noVR = {
      key: 'md',
      baseLineHeight: 2
    };
    var actual = (0, _setup.setVerticalRhythm)(vr);
    expect(actual).toBe(0.75);
    actual = (0, _setup.setVerticalRhythm)(noVR, vr);
    expect(actual).toBe(0.75);
    actual = (0, _setup.setVerticalRhythm)(noVR, {});
    expect(actual).toBe(1);
    actual = (0, _setup.setVerticalRhythm)(noVR, null);
    expect(actual).toBe(1);
  });
  it('should properly set the breakpointEndPx value', function () {
    var screen = {
      key: 'sm',
      breakpointStartPx: 576
    };
    var nextScreen = {
      key: 'md',
      breakpointStartPx: 768
    };
    var actual = (0, _setup.setBreakpointEndPx)(screen, nextScreen);
    expect(actual).toBe(768);
    var endScreen = {
      key: 'end',
      breakpointStartPx: 1440
    };
    var endNextScreen = undefined;
    actual = (0, _setup.setBreakpointEndPx)(endScreen, endNextScreen);
    expect(actual).toBe(1440);
  });
  it('should properly set the fontScale value', function () {
    var customFontScaleScreen = {
      key: 'sm',
      fontScale: 1.3993
    };
    var prevScreen = {
      key: 'sm',
      fontScale: 1.333
    };
    var screen = {
      key: 'md',
      fontScaleId: 'augmentedFourth'
    };
    var actual = (0, _setup.setFontScale)(customFontScaleScreen, prevScreen);
    expect(actual).toBe(1.3993);
    actual = (0, _setup.setFontScale)(screen, prevScreen);
    expect(actual).toBe(1.414);
    delete screen.fontScaleId;
    actual = (0, _setup.setFontScale)(screen, prevScreen);
    expect(actual).toBe(1.333);
  });
  it('should properly generate the context from an empty config', function () {
    var actual = (0, _setup["default"])();
    var start = actual.theme.screens[0];
    expect(start.baseLineHeightPx).toBe(24);
    expect(start.verticalRhythmPx).toBe(12);
    var lg = actual.theme.screens[3];
    expect(lg.baseLineHeightPx).toBe(24);
    expect(lg.verticalRhythmPx).toBe(12);
    expect(lg.fontScaleId).toBe('perfectFourth');
    expect(lg.fontScale).toBe(1.333);
    expect(lg.breakpointEndPx).toBe(1200);
    expect(actual.theme.currentScreen.key).toBe('start');
    expect(actual.theme.defaultScreenKey).toBe('start');
    expect(Object.keys(actual.theme.screensByKey).length).toBe(6);
  });
  it('should properly generate the context from an existing config', function () {
    var config = {
      theme: {
        screens: [{
          key: 'start',
          fontScaleId: 'minorThird',
          breakpointStartPx: 320,
          baseFontSizePx: 14,
          baseLineHeight: 1.4
        }, {
          key: 'sm',
          breakpointStartPx: 576
        }, {
          key: 'md',
          breakpointStartPx: 768,
          baseFontSizePx: 16,
          baseLineHeight: 1.5,
          verticalRhythm: 1
        }, {
          key: 'end',
          breakpointStartPx: 1440
        }]
      }
    };
    var actual = (0, _setup["default"])(config);
    var start = actual.theme.screens[0];
    expect(start.baseLineHeightPx).toBe(19.599999999999998);
    expect(start.verticalRhythmPx).toBe(9.799999999999999);
    var md = actual.theme.screens[2];
    expect(md.baseLineHeightPx).toBe(24);
    expect(md.verticalRhythmPx).toBe(16);
    expect(actual.theme.currentScreen.key).toBe('start');
    expect(actual.theme.defaultScreenKey).toBe('start');
    expect(Object.keys(actual.theme.screensByKey).length).toBe(4);
  });
  it('should properly generate the right root node', function () {
    var startScreen = {
      key: 'start'
    };
    var mdScreen = {
      key: 'md'
    };
    var actual = (0, _setup.setRootCSSNode)(startScreen);
    expect(actual.type).toBe('root');
    expect(actual.nodes.length).toBe(1);
    expect(actual.nodes[0].type).toBe('rule');
    expect(actual.nodes[0].selector).toBe(':root');
    actual = (0, _setup.setRootCSSNode)(mdScreen);
    var atRule = actual.nodes[0];
    expect(actual.type).toBe('root');
    expect(actual.nodes.length).toBe(1);
    expect(atRule.type).toBe('atrule');
    expect(atRule.name).toBe('screen');
    expect(atRule.params).toBe('md');
    expect(atRule.nodes.length).toBe(1);
    expect(atRule.nodes[0].type).toBe('rule');
    expect(atRule.nodes[0].selector).toBe(':root');
  });
});