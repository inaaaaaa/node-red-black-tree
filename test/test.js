'use struct';

const assert = require('power-assert');
const redBlackTree = require('..');

describe('redBlackTree', function() {
  it('should construct tree.', function() {
    let tree = null;
    for (let i = 0; i < 500; i++) {
      tree = redBlackTree.insert(tree, Math.random());
    }
  });
  it('should construct tree.', function() {
    let tree = null;
    let elements = [5, 32, 51, 23, 63];
    for (let i of elements) {
      tree = redBlackTree.insert(tree, i);
    }
    let expected = {
      color: 1,
      elem: 32,
      left: {
        color: 1,
        elem: 5,
        left: null,
        right: {color: 0, elem: 23, left: null, right: null}},
      right: {
        color: 1,
        elem: 51,
        left: null,
        right: {color: 0, elem: 63, left: null, right: null}}};
    assert.deepEqual(tree, expected);
  });
  it('should check the element is in the set.', function() {
    let tree = null;
    let elements = [5, 32, 51, 23, 63];
    for (let i of elements) {
      tree = redBlackTree.insert(tree, i);
    }
    assert.ok(redBlackTree.member(tree, 51));
    assert.ok(!redBlackTree.member(tree, 300));
  });
});
