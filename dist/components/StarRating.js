"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StarRating;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var starStyles = {
  fontSize: 26,
  paddingRight: 8,
  marginTop: 6,
  cursor: 'pointer'
};
var styles = {
  inactive: _objectSpread({
    color: 'grey'
  }, starStyles),
  active: _objectSpread({
    color: 'gold'
  }, starStyles)
};

function StarRating(_ref) {
  var rating = _ref.rating,
      hoveredRating = _ref.hoveredRating,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 5 : _ref$max,
      setRating = _ref.setRating,
      setHoveredRating = _ref.setHoveredRating;
  var stars = [];
  var compareRating;
  if (hoveredRating) compareRating = hoveredRating;else if (rating) compareRating = rating;

  var _loop = function _loop(i) {
    stars.push( /*#__PURE__*/_react.default.createElement("i", {
      key: 'star' + i,
      onClick: function onClick() {
        return setRating(i + 1);
      },
      onMouseEnter: function onMouseEnter() {
        return setHoveredRating(i + 1);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoveredRating(null);
      },
      className: "fa fa-star",
      style: i + 1 <= compareRating ? styles.active : styles.inactive
    }));
  };

  for (var i = 0; i < max; i++) {
    _loop(i);
  }

  return /*#__PURE__*/_react.default.createElement("div", null, stars);
}