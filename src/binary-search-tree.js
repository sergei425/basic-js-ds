const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this._root;
  }

  add(data) {
     const newNode = new Node(data);

    if (this._root === null) {
      this._root = newNode;
      return;
    }

    let current = this._root;
    while (true) {
      // Если значение уже существует, не добавляем его
      if (data === current.data) {
        return;
      }

      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  find(data) {
    let current = this._root;

    while (current !== null) {
      if (data === current.data) {
        return current;
      }

      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
     const findNodeWithParent = (node, parent, target) => {
      if (node === null) {
        return { node: null, parent: null, isLeft: false };
      }

      if (target === node.data) {
        return { node, parent, isLeft: parent ? parent.left === node : false };
      }

      if (target < node.data) {
        return findNodeWithParent(node.left, node, target);
      } else {
        return findNodeWithParent(node.right, node, target);
      }
    };

    const { node, parent, isLeft } = findNodeWithParent(this._root, null, data);

    if (node === null) {
      return;
    }

    if (node.left === null && node.right === null) {
      if (parent === null) {
        this._root = null;
      } else if (isLeft) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      return;
    }

    if (node.left === null || node.right === null) {
      const child = node.left || node.right;

      if (parent === null) {
        this._root = child;
      } else if (isLeft) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      return;
    }

    let successorParent = node;
    let successor = node.right;

    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }

    node.data = successor.data;

    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    };
  }

  min() {
    if (this._root === null) {
      return null;
    }

    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }

    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
