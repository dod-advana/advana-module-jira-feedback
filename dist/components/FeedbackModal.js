"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FeedbackModal;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _themeDefault = _interopRequireDefault(require("@dod-advana/advana-platform-ui/dist/theme-default"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _lab = require("@material-ui/lab");

var _emailValidator = _interopRequireDefault(require("email-validator"));

var _LoadingIndicator = _interopRequireDefault(require("@dod-advana/advana-platform-ui/dist/loading/LoadingIndicator"));

var _Auth = _interopRequireDefault(require("@dod-advana/advana-platform-ui/dist/utilities/Auth"));

var _StarRating = _interopRequireDefault(require("./StarRating"));

var _api = require("../api/api");

require("font-awesome/css/font-awesome.css");

require("bootstrap/dist/css/bootstrap-grid.css");

require("../css/FeedbackModal.css");

var _grey = _interopRequireDefault(require("@material-ui/core/colors/grey"));

var _excluded = ["children", "classes", "onClose", "handleSubmit"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

require('typeface-noto-sans');

require('typeface-montserrat');

var styles = {
  required: {
    color: 'darkred',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 0
  },
  input: {
    width: '100%',
    border: '1px solid lightgrey',
    padding: 8
  },
  textArea: {
    width: '100%',
    height: 150,
    border: '1px solid lightgrey'
  },
  experienceLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  dialog: {
    width: '100%',
    maxWidth: 800 // ...props.dialogStyle,

  },
  mainContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: '#3c4144',
    paddingBottom: 20
  },
  label: {
    height: 15,
    fontSize: 14,
    color: '#555555'
  },
  contentRow: {
    marginBottom: 20,
    maxHeight: 400,
    overflowY: 'auto'
  },
  secondaryButton: {
    marginRight: 10,
    display: 'inline'
  }
};
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    }
  };
});

var classStyles = function classStyles(theme) {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  };
};

var DialogTitle = (0, _styles.withStyles)(classStyles)(function (props) {
  var children = props.children,
      classes = props.classes,
      onClose = props.onClose,
      handleSubmit = props.handleSubmit,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react.default.createElement(_DialogTitle.default, _extends({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h3"
  }, children), onClose ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)) : null);
});
var DialogContent = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      padding: theme.spacing(2)
    }
  };
})(_DialogContent.default);
var DialogActions = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(1)
    }
  };
})(_DialogActions.default);

function FeedbackModal(_ref) {
  var open = _ref.open,
      setOpen = _ref.setOpen,
      handleSubmit = _ref.handleSubmit;

  var displayName = _Auth.default.getUserDisplayName();

  var nameSplits = displayName.split(' ');

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      alert = _useState4[0],
      setAlert = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      hoveredRating = _useState6[0],
      setHoveredRating = _useState6[1];

  var classes = useStyles();

  var onRequestClose = function onRequestClose() {
    setOpen(false);
    setEmailError(false);
  };

  var defaultState = {
    firstName: nameSplits[0] || '',
    lastName: nameSplits[1] || '',
    email: _Auth.default.getUserEmail() || '',
    feedback: '',
    rating: null
  };

  var _useState7 = (0, _react.useState)(defaultState.rating),
      _useState8 = _slicedToArray(_useState7, 2),
      rating = _useState8[0],
      setRating = _useState8[1];

  var _useState9 = (0, _react.useState)(defaultState.firstName),
      _useState10 = _slicedToArray(_useState9, 2),
      firstName = _useState10[0],
      setFirstName = _useState10[1];

  var _useState11 = (0, _react.useState)(defaultState.lastName),
      _useState12 = _slicedToArray(_useState11, 2),
      lastName = _useState12[0],
      setLastName = _useState12[1];

  var _useState13 = (0, _react.useState)(defaultState.email),
      _useState14 = _slicedToArray(_useState13, 2),
      email = _useState14[0],
      setEmail = _useState14[1];

  var _useState15 = (0, _react.useState)(defaultState.feedback),
      _useState16 = _slicedToArray(_useState15, 2),
      feedback = _useState16[0],
      setFeedback = _useState16[1];

  var _useState17 = (0, _react.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      emailError = _useState18[0],
      setEmailError = _useState18[1];

  var _useState19 = (0, _react.useState)(false),
      _useState20 = _slicedToArray(_useState19, 2),
      emailTextFocus = _useState20[0],
      setEmailTextFocus = _useState20[1];

  var handleEmailChange = function handleEmailChange(email) {
    if (_emailValidator.default.validate(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }

    setEmail(email);
  };

  var resetFeedbackForm = function resetFeedbackForm() {
    setFirstName(defaultState.firstName);
    setLastName(defaultState.lastName);
    setEmail(defaultState.email);
    setEmailError(false);
    setFeedback(defaultState.feedback);
    setRating(defaultState.rating);
  };

  var handleSubmitFeedback = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setLoading(true);

              if (!handleSubmit) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return handleSubmit({
                name: "".concat(firstName, " ").concat(lastName),
                email: email,
                feedback: feedback,
                rating: rating
              });

            case 5:
              _context.next = 9;
              break;

            case 7:
              _context.next = 9;
              return (0, _api.submitFeedback)({
                name: "".concat(firstName, " ").concat(lastName),
                email: email,
                feedback: feedback,
                rating: rating
              });

            case 9:
              setAlert({
                title: 'Success!',
                severity: 'success',
                message: 'Thank you for submitting your feedback!'
              });
              resetFeedbackForm();
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              setAlert({
                title: 'Error!',
                severity: 'error',
                message: 'An error has occurred while submitting your feedback. Please try again later.'
              });
              console.error(_context.t0);

            case 17:
              _context.prev = 17;
              setLoading(false);
              setOpen(false);
              return _context.finish(17);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13, 17, 21]]);
    }));

    return function handleSubmitFeedback() {
      return _ref2.apply(this, arguments);
    };
  }();

  var disableSubmit = firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || emailError;
  return /*#__PURE__*/_react.default.createElement(_styles.MuiThemeProvider, {
    theme: _themeDefault.default
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, alert && /*#__PURE__*/_react.default.createElement(_lab.Alert, {
    severity: alert.severity,
    onClose: function onClose() {
      return setAlert(null);
    }
  }, /*#__PURE__*/_react.default.createElement(_lab.AlertTitle, null, alert.title), alert.message), /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    id: "jira-feedback",
    modal: false,
    open: open,
    onRequestClose: onRequestClose,
    contentStyle: styles.dialog,
    autoScrollBodyContent: true,
    PaperProps: {
      style: {
        padding: 20,
        minWidth: 700
      }
    }
  }, /*#__PURE__*/_react.default.createElement(DialogTitle, {
    onClose: onRequestClose
  }, "Help us improve your experience with feedback!"), /*#__PURE__*/_react.default.createElement(DialogContent, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingLeft: 20,
      paddingRight: 20
    }
  }, loading ? /*#__PURE__*/_react.default.createElement(_LoadingIndicator.default, null) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "row m-b-15",
    style: {
      width: '95%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    variant: "outlined",
    value: firstName,
    onChange: function onChange(e) {
      return setFirstName(e.target.value);
    },
    name: "labels",
    label: "First Name",
    style: {
      fontSize: 'small',
      minWidth: '200px',
      width: '100%'
    }
  }), /*#__PURE__*/_react.default.createElement("p", {
    style: styles.required
  }, "*Required")), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6"
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    variant: "outlined",
    value: lastName,
    onChange: function onChange(e) {
      return setLastName(e.target.value);
    },
    name: "labels",
    label: "Last Name",
    style: {
      fontSize: 'small',
      minWidth: '200px',
      width: '100%'
    }
  }), /*#__PURE__*/_react.default.createElement("p", {
    style: styles.required
  }, "*Required"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row m-b-15",
    style: {
      width: '95%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    onFocus: function onFocus() {
      return setEmailTextFocus(true);
    },
    onBlur: function onBlur() {
      return setEmailTextFocus(false);
    },
    variant: "outlined",
    value: email,
    onChange: function onChange(e) {
      return handleEmailChange(e.target.value);
    },
    name: "labels",
    label: "Email",
    style: {
      fontSize: 'small',
      minWidth: '200px',
      width: '100%'
    },
    error: emailError,
    helperText: emailError && !emailTextFocus ? 'Please enter a valid email address.' : ''
  }), /*#__PURE__*/_react.default.createElement("p", {
    style: styles.required
  }, "*Required"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row m-b-15"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: styles.experienceLabel
  }, "Your overall experience?"), /*#__PURE__*/_react.default.createElement(_StarRating.default, {
    rating: rating,
    setRating: setRating,
    hoveredRating: hoveredRating,
    setHoveredRating: setHoveredRating
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    variant: "outlined",
    placeholder: "Provide Feedback Here...",
    multiline: true,
    rows: 5,
    value: feedback,
    onChange: function onChange(e) {
      return setFeedback(e.target.value);
    },
    style: {
      fontSize: 'small',
      minWidth: '200px',
      width: '100%'
    }
  })))))), /*#__PURE__*/_react.default.createElement(DialogActions, {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onRequestClose,
    style: {
      backgroundColor: '#E0E0E0',
      textTransform: 'none',
      padding: '6px 15px',
      fontSize: 16
    }
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    autoFocus: true,
    onClick: handleSubmitFeedback,
    disabled: disableSubmit,
    style: {
      backgroundColor: disableSubmit ? _grey.default[400] : '#E9691D',
      color: 'white',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 15px'
    }
  }, "Submit")))));
}