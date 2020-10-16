// We can't use ES6 imports in postcss-functions yet because it doesn't
// support the ES6 exports format yet
module.exports = function (value) {
  return `calc(var(--rhythm-rem) * ${value})`
}
