'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');

var getClasses = require('./utils/get-classes');
var getChildren = require('./utils/get-children');

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Menu, [{
    key: 'toggleMenu',
    value: function toggleMenu(evt) {
      evt.preventDefault();

      // flip the state from open to close and viceversa
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = getClasses(this.props);
      var buttons = getChildren(this.props.children);

      var main = buttons.main && React.cloneElement(buttons.main, this.props.method !== 'hover' && {
        onClick: this.toggleMenu
      } || {});

      return React.createElement(
        'ul',
        {
          className: classes,
          'data-mfb-toggle': this.props.method,
          'data-mfb-state': this.state.isOpen ? 'open' : 'closed'
        },
        React.createElement(
          'li',
          { className: 'mfb-component__wrap' },
          main,
          React.createElement(
            'ul',
            { className: 'mfb-component__list' },
            buttons.child
          )
        )
      );
    }
  }]);

  return Menu;
}(React.Component);

Menu.propTypes = {
  effect: PropTypes.oneOf(['zoomin', 'slidein', 'slidein-spring', 'fountain']).isRequired,
  position: PropTypes.oneOf(['tl', 'tr', 'bl', 'br']).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};


module.exports = Menu;