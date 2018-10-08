'use strict';

var Children = require('react').Children;

var MainButton = require('../main-button');
var ChildButton = require('../child-button');

function isFragment(el) {
  return (
    typeof el.type === 'symbol' && el.type.toString().includes('react.fragment')
  );
}

function isMatching(a, b) {
  return a.type && a.type.name === b.name;
}

function childrenValidator(props, propName, componentName) {
  var children = props[propName];
  var mainButtonCount = 0;
  var childButtonCount = 0;
  var otherCount = 0;
  var msg;

  function countChildren(el) {
    if(isMatching(el, MainButton)){
      return mainButtonCount++;
    }
    if(isMatching(el, ChildButton)){
      return childButtonCount++;
    }
    otherCount++;
  }

  Children.forEach(children, function (child) {
    if (isFragment(child)) {
      child.props.children.forEach(function(child) {
        countChildren(child);
      });
    } else {
      countChildren(child);
    }
  });
  if(mainButtonCount === 0){
    msg = 'Prop `children` must contain a MainButton component in `' + componentName + '`.';
    return new Error(msg);
  }
  if(mainButtonCount > 1){
    msg = 'Prop `children` must contain only 1 MainButton component in `' +
      componentName + '`, but ' + mainButtonCount + ' exist.';
    return new Error(msg);
  }
  if(otherCount){
    msg = 'Prop `children` contains elements other than MainButton and ChildButton ' +
      'components in `' + componentName + '`.';
    return new Error(msg);
  }
}

module.exports = childrenValidator;