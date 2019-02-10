'use strict';

var React = require('react');
var PropTypes = require('prop-types');

var getClasses = require('./utils/get-classes');
var getChildren = require('./utils/get-children');

class Menu extends React.Component {
  static propTypes = {
    effect: PropTypes.oneOf(['zoomin', 'slidein', 'slidein-spring', 'fountain'])
      .isRequired,
    position: PropTypes.oneOf(['tl', 'tr', 'bl', 'br']).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  state = {
    isOpen: false,
  };

  toggleMenu(evt) {
    evt.preventDefault();

    // flip the state from open to close and viceversa
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    var classes = getClasses(this.props);
    var buttons = getChildren(this.props.children);

    var main =
      buttons.main &&
      React.cloneElement(
        buttons.main,
        (this.props.method !== 'hover' && {
          onClick: this.toggleMenu,
        }) ||
          {},
      );

    return (
      <ul
        className={classes}
        data-mfb-toggle={this.props.method}
        data-mfb-state={this.state.isOpen ? 'open' : 'closed'}
      >
        <li className="mfb-component__wrap">
          {main}
          <ul className="mfb-component__list">{buttons.child}</ul>
        </li>
      </ul>
    );
  }
}

module.exports = Menu;
