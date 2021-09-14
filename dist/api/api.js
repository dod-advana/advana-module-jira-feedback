"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitFeedback = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _window, _window$__env__, _window2, _window2$__env__;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withCredentials = (((_window = window) === null || _window === void 0 ? void 0 : (_window$__env__ = _window.__env__) === null || _window$__env__ === void 0 ? void 0 : _window$__env__.REACT_APP_USE_WITH_CREDENTIALS) || process.env.REACT_APP_USE_WITH_CREDENTIALS) !== 'false';
var REACT_APP_SUBMIT_FEEDBACK_ENDPOINT = ((_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$__env__ = _window2.__env__) === null || _window2$__env__ === void 0 ? void 0 : _window2$__env__.REACT_APP_SUBMIT_FEEDBACK_ENDPOINT) || process.env.REACT_APP_SUBMIT_FEEDBACK_ENDPOINT;

var axiosClient = _axios.default.create({
  withCredentials: withCredentials
});

var submitFeedback = function submitFeedback(data) {
  return axiosClient.post(REACT_APP_SUBMIT_FEEDBACK_ENDPOINT, data);
};

exports.submitFeedback = submitFeedback;