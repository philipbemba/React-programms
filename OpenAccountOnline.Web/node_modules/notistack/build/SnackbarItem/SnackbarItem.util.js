'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCollapseClasses = exports.getSnackbarClasses = exports.getTransitionDirection = exports.capitalise = exports.muiClasses = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down'
};

var muiClasses = exports.muiClasses = {
    root: {},
    anchorOriginTopCenter: {},
    anchorOriginBottomCenter: {},
    anchorOriginTopRight: {},
    anchorOriginBottomRight: {},
    anchorOriginTopLeft: {},
    anchorOriginBottomLeft: {}
};

var capitalise = exports.capitalise = function capitalise(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

var getTransitionDirection = exports.getTransitionDirection = function getTransitionDirection(anchorOrigin) {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

/**
 * @param {object} classes
 * @param {object} anchOrigin
 * @param {boolean} arrogant
 * @param {boolean} dense
 * @return {object}
 */
var getSnackbarClasses = exports.getSnackbarClasses = function getSnackbarClasses(classes) {
    // filter classes object and return keys that are allowed in material-ui snackbar classes prop
    var snackbarMuiClasses = Object.keys(classes).filter(function (key) {
        return muiClasses[key] !== undefined;
    }).reduce(function (obj, key) {
        return _extends({}, obj, _defineProperty({}, key, classes[key]));
    }, {});

    return _extends({}, snackbarMuiClasses, {
        root: (0, _classnames2.default)(snackbarMuiClasses.root, classes.wrappedRoot)
    });
};

var getCollapseClasses = exports.getCollapseClasses = function getCollapseClasses(classes, dense) {
    return {
        container: classes.collapseContainer,
        wrapper: (0, _classnames2.default)(classes.collapseWrapper, _defineProperty({}, classes.collapseWrapperDense, dense))
    };
};