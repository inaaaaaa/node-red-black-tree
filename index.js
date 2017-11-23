'use strict';

const color = {
  red: 0,
  black: 1,
};

function newTree(color, elem, left, right) {
  return {color: color, elem: elem, left: left, right: right};
}

function isEmpty(tree) {
  return tree === null;
}

function member(tree, x) {
  if (isEmpty(tree)) {
    return false;
  }
  if (x < tree.elem) {
    return member(tree.left, x);
  } else if (x > tree.elem) {
    return member(tree.right, x);
  } else {
    return true;
  }
}

function _match(tree, pattern) {
  if (isEmpty(tree)) {
    return false;
  }
  for (let key of Object.getOwnPropertyNames(pattern)) {
    if (!(key in tree)) {
      return false;
    }
    if (typeof pattern[key] === 'object') {
      if (!_match(tree[key], pattern[key])) {
        return false;
      }
    } else {
      if (tree[key] !== pattern[key]) {
        return false;
      }
    }
  }
  return true;
}

function _makeT(x, y, z, a, b, c, d) {
  let left = newTree(color.black, x.elem, a, b);
  let right = newTree(color.black, z.elem, c, d);
  return newTree(color.red, y.elem, left, right);
}

const pattern0 = {color: color.black, left: {color: color.red, left: {color: color.red}}};
const pattern1 = {color: color.black, left: {color: color.red, right: {color: color.red}}};
const pattern2 = {color: color.black, right: {color: color.red, left: {color: color.red}}};
const pattern3 = {color: color.black, right: {color: color.red, right: {color: color.red}}};

function _balance(tree) {
  if (_match(tree, pattern0)) {
    let [x, y, z] = [tree.left.left, tree.left, tree];
    let [a, b, c, d] = [x.left, x.right, y.right, z.right];
    return _makeT(x, y, z, a, b, c, d);
  } else if (_match(tree, pattern1)) {
    let [x, y, z] = [tree.left, tree.left.right, tree];
    let [a, b, c, d] = [x.left, y.left, y.right, z.right];
    return _makeT(x, y, z, a, b, c, d);
  } else if (_match(tree, pattern2)) {
    let [x, y, z] = [tree, tree.right.left, tree.right];
    let [a, b, c, d] = [x.left, y.left, y.right, z.right];
    return _makeT(x, y, z, a, b, c, d);
  } else if (_match(tree, pattern3)) {
    let [x, y, z] = [tree, tree.right, tree.right.right];
    let [a, b, c, d] = [x.left, y.left, z.left, z.right];
    return _makeT(x, y, z, a, b, c, d);
  } else {
    return tree;
  }
}

function _ins(tree, x) {
  if (isEmpty(tree)) {
    return newTree(color.red, x, null, null);
  }
  if (x < tree.elem) {
    return _balance(newTree(tree.color, tree.elem, _ins(tree.left, x), tree.right));
  } else if (x > tree.elem) {
    return _balance(newTree(tree.color, tree.elem, tree.left, _ins(tree.right, x)));
  } else {
    return tree;
  }
}

function insert(tree, x) {
  let t = _ins(tree, x);
  return newTree(color.black, t.elem, t.left, t.right);
}

function dump(tree) {
  return require('util').inspect(tree, {depth: null});
}

module.exports = {
  newTree: newTree,
  isEmpty: isEmpty,
  member: member,
  insert: insert,
  dump: dump,
};
