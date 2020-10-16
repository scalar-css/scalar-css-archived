"use strict";

var _cosmiconfig = require("cosmiconfig");

var _isResolvable = _interopRequireDefault(require("is-resolvable"));

var _path = _interopRequireDefault(require("path"));

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssFunctions = _interopRequireDefault(require("postcss-functions"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _scalar = _interopRequireDefault(require("./core/scalar"));

var _screen = _interopRequireDefault(require("./core/screen"));

var _setup = _interopRequireDefault(require("./core/setup"));

var _helpers = require("./util/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var scalarName = 'scalar-css';
var scalarFunctions = (0, _postcssFunctions["default"])({
  glob: _path["default"].join(__dirname, 'functions', '*.js')
});
/**
 *
 * @param {String} preset - existing preset, 'default'
 * @param {Array} preset - multiple presets to be merged, ['default', {}]
 * @param {Object} preset - already invoked function: { plugins: [] }
 */

function resolvePreset(_x) {
  return _resolvePreset.apply(this, arguments);
}
/**
 * ScalarCSS will look for configuration first as options passed
 * directly to it, and failing this it will use cosmiconfig to
 * load an external file
 *
 * @param {*} css
 * @param {*} options
 */


function _resolvePreset() {
  _resolvePreset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(preset) {
    var fn, options, sugar;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(typeof preset === 'undefined')) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", Promise.resolve([]));

          case 2:
            if (!preset.plugins) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", Promise.resolve(preset.plugins));

          case 4:
            if (Array.isArray(preset)) {
              fn = preset[0];
              options = preset[1];
            } else {
              fn = preset;
              options = {};
            } // Try loading a preset from node_modules


            if (!(0, _isResolvable["default"])(fn)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", Promise.resolve(require(fn)["default"](options).plugins));

          case 7:
            // Otherwise, try adding some syntactic sugar
            sugar = "@scalar-css/scalar-css-preset-".concat(fn);

            if (!(0, _isResolvable["default"])(sugar)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", Promise.resolve(require(sugar)["default"](options).plugins));

          case 10:
            throw new Error("Cannot load preset \"".concat(fn, "\". Please check your configuration for errors and try again."));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _resolvePreset.apply(this, arguments);
}

function resolveConfig(_x2, _x3, _x4) {
  return _resolveConfig.apply(this, arguments);
}

function _resolveConfig() {
  _resolveConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(pluginConfig, css, result) {
    var inputFile, searchPath, configPath, configExplorer, searchForConfig;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            inputFile = css.source && css.source.input && css.source.input.file;
            searchPath = inputFile ? _path["default"].dirname(inputFile) : process.cwd();
            configPath = null;

            if (!searchPath.includes('node_modules')) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", {});

          case 5:
            if (pluginConfig.configFile) {
              searchPath = null;
              configPath = _path["default"].resolve(process.cwd(), pluginConfig.configFile);
            }

            configExplorer = (0, _cosmiconfig.cosmiconfig)(scalarName);
            searchForConfig = configPath ? configExplorer.load(configPath) : configExplorer.search(searchPath);
            return _context3.abrupt("return", searchForConfig.then(function (cfg) {
              var config = cfg === null ? {} : (0, _helpers.merge)(pluginConfig, cfg.config);
              return Promise.resolve(config);
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _resolveConfig.apply(this, arguments);
}

var plugin = _postcss["default"].plugin(scalarName, function () {
  var pluginConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(css, result) {
      var config, plugins, ctx;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return resolveConfig(pluginConfig, css, result);

            case 2:
              config = _context.sent;
              _context.next = 5;
              return resolvePreset(config.preset, css, result);

            case 5:
              plugins = _context.sent;
              ctx = (0, _setup["default"])(config);
              return _context.abrupt("return", (0, _postcss["default"])([(0, _scalar["default"])(ctx, plugins), (0, _screen["default"])(ctx), scalarFunctions]).process(css, {
                from: css.source.input.file
              }));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x5, _x6) {
      return _ref.apply(this, arguments);
    };
  }();
});

module.exports = plugin;