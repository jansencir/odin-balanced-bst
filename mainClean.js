// Build a Node class that holds the root data, left child, and right child
class Node {
  constructor(data) {
    this.root = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr = []) {
    this.array = this.arraySortRemove(arr);
    this.tree = this.buildTree(this.array, 0, this.array.length - 1);
  }

  // View the tree
  viewTree() {
    console.log(this.tree);
  }

  // arraySortRemove(array) sorts and removes duplicates in an array;
  arraySortRemove(array) {
    return array.sort((a, b) => a - b).filter((item, index) => array.indexOf(item) === index);
  }

  // Build a tree out of the array
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(value, node = this.tree) {
    if (!this.tree) {
      console.log("Here");
      return this.tree = new Node(value);
    }

    if (node === null) {
      console.log("Null");
      return new Node(value);
    }

    if (node.root === value) {
      console.log("Exists");
      return;
    } else if (value < node.root) {
      node.left = this.insert(value, node.left);
    } else if (value > node.root) {
      node.right =  this.insert(value, node.right);
    }
    return node;
  }

  // Delete a given value if it exists in the tree
  delete(value, node = this.tree) {
    if (node === null) {
      console.log("Empty");
      return node;
    }

    console.log(node.root);
    if (value < node.root) {
      node.left = this.delete(value, node.left);
    } else if (value > node.root) {
      node.right = this.delete(value, node.right);
    } else {
      console.log("We found it");
      console.log(node);
      // For nodes with 0 or 1 children
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }
      // For nodes with 2 children
      node.root = this.moveLeftChild(node.right);
      node.right = this.delete(node.root, node.right);
    }
    return node;
  }

  // Used in delete method, shifts left child
  moveLeftChild(root) {
    let leftValue = root.root;
    while (root.left != null) { 
      leftValue = root.left.root;
      root = root.left;
    }
    return leftValue;
  }

  // Find the node of a given value
  find(value, node = this.tree) {
    if (node === null) {
      console.log("Null, we've reached the end");
      return;
    }

    if (value < node.root) {
      node.left = this.find(value, node.left);
    } else if (value > node.root) {
      node.right = this.find(value, node.right);
    } else {
      console.log("Found the node");
      console.log(node);
    }
  }

  // Perform a breadth-first search and return it
  levelOrder() {
    let queue = [this.tree];

    while (queue.length > 0) {
      console.log(queue[0].root);
      if (queue[0].left) {
        queue.push(queue[0].left);
      }
      if (queue[0].right) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }
  }

  // Perform a depth-first search and return it
  preOrder(tree = this.tree) {
    // Root > Left > Right
    if (tree == null) {
      return;
    }
    console.log(tree.root);
    this.preOrder(tree.left);
    this.preOrder(tree.right);
  }

  inOrder(tree = this.tree) {
    // Left > Root > Right
    if (tree === null) {
      return;
    }
    this.inOrder(tree.left);
    console.log(tree.root);
    this.inOrder(tree.right);
  }

  postOrder(tree = this.tree) {
    // Left > Right > Root
    if (tree == null) {
      return;
    }
    this.postOrder(tree.left);
    this.postOrder(tree.right);
    console.log(tree.root);
  }

  // Return the height of a given node
  height(value, tree = this.tree) {
    if (!tree) {
      console.log("0");
      return;
    }
    if (tree.root === value) {
      let nodeHeight = 0;
      let queue = [tree];

      while (queue.length > 0) {
        let levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
          let node = queue.shift();

          if (node.left) {
            queue.push(node.left);
          }
          if (node.right) {
            queue.push(node.right);
          }
        }
        nodeHeight++;
      }
      console.log(nodeHeight);
      return nodeHeight;
    }

    if (value < tree.root) {
      tree.left = this.height(value, tree.left);
    } else if (value > tree.root) {
      tree.right = this.height(value, tree.right);
    }
  }

  // Return the depth of a given node
  depth(value, tree = this.tree, count = 1) {
    if (!tree) {
      console.log("0, Tree Empty or Value Not Found");
      return;
    }

    if (value === tree.root) {
      console.log(count);
      return;
    }

    if (value < tree.root) {
      tree.left = this.depth(value, tree.left, count + 1);
    } else if (value > tree.root) {
      tree.right = this.depth(value, tree.right, count + 1);
    }
  }

  // Method to get the overall height of a tree
  // Used in the isBalanced method to get height of left and right sub-tree from root node
  heightTree(tree) {
    if (tree === null) {
      return 0;
    }
    return 1 + Math.max(this.heightTree(tree.left), this.heightTree(tree.right));
  }

  // Check if the Tree is balanced
  isBalanced() {
    if (!this.tree) {
      console.log("Empty, but technically balanced");
      return true;
    }

    let leftSubTreeHeight = this.heightTree(this.tree.left);
    let rightSubTreeHeight = this.heightTree(this.tree.right);

    if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) <= 1) {
      console.log("Balanced");
      return true;
    } else {
      console.log("Not Balanced");
      return false;
    }
  }

  // Store the nodes in an array
  storeNodes(root, array) {
    if (root === null) {
      return;
    }
    this.storeNodes(root.left, array);
    array.push(root.root);
    this.storeNodes(root.right, array);
  }

  // Rebalance an uneven tree
  rebalance() {
    let nodes = [];
    this.storeNodes(this.tree, nodes);

    this.array = nodes;
    this.tree = this.buildTree(this.array, 0, this.array.length - 1);

    console.log("Tree has been rebalanced");
    console.log(this.array);
    console.log(this.tree);
  }
}