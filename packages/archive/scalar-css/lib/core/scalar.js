"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _postcss = _interopRequireDefault(require("postcss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function initializePlugin(ctx, plugin, source) {
  if (Array.isArray(plugin)) {
    var _plugin = _slicedToArray(plugin, 2),
        processor = _plugin[0],
        opts = _plugin[1];

    if (typeof opts === 'undefined' || _typeof(opts) === 'object' && !opts.exclude || typeof opts === 'boolean' && opts === true) {
      return Promise.resolve(processor(ctx, source));
    }
  }

  return Promise.resolve(plugin(ctx, source));
}

function _default(ctx, plugins) {
  return function (css) {
    css.walkAtRules('scalar', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(atRule) {
        var resetPath, debugPath, baseLineColor, rhythmColor;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (atRule.params === 'reset') {
                  resetPath = _path["default"].resolve(__dirname, '../defaults/reset.css');
                  atRule.before(_postcss["default"].parse(_fs["default"].readFileSync(resetPath, 'utf8'), {
                    from: resetPath
                  }));
                  atRule.remove();
                }

                if (atRule.params === 'debug') {
                  debugPath = _path["default"].resolve(__dirname, '../defaults/debug.css');
                  baseLineColor = ctx.options.debug && ctx.options.debug.baselineColor ? ctx.options.debug.baselineColor : 'rgba(255, 0, 0, 0.1)';
                  rhythmColor = ctx.options.debug && ctx.options.debug.rhythmColor ? ctx.options.debug.rhythmColor : 'rgba(255, 0, 0, 0.05)';
                  atRule.before(_postcss["default"].parse(_fs["default"].readFileSync(debugPath, 'utf8'), {
                    from: debugPath
                  }));
                  atRule.before(_postcss["default"].rule({
                    selector: ':root'
                  }).append({
                    prop: '--baseline-color',
                    value: baseLineColor
                  }).append({
                    prop: '--rhythm-color',
                    value: rhythmColor
                  }));
                  atRule.remove();
                }

                if (atRule.params === 'utilities' && Array.isArray(plugins)) {
                  plugins.reduce( /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(prevPromise, plugin) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              return _context.abrupt("return", prevPromise.then(initializePlugin(ctx, plugin, atRule.source)));

                            case 1:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x2, _x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }(), Promise.resolve());
                  atRule.remove();
                }

                ctx.theme.screens.forEach(function (screen) {
                  css.append(screen.rootNode.toString());
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  };
}