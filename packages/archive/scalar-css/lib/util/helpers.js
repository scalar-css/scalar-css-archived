"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;
exports.objectIsEmpty = objectIsEmpty;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Merge a `source` object to a `target` recursively.
 *
 * @see https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
 *
 * @param {Object} target
 * @param {Object} source
 */
function merge(target, source) {
  var isObject = function isObject(obj) {
    return obj && _typeof(obj) === 'object';
  };

  Object.keys(source).forEach(function (key) {
    var targetValue = target[key];
    var sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue;
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = merge(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
}

function objectIsEmpty(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}