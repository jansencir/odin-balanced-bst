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
    // Sort and remove duplicates in the original array;
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
    // Build tree will take in an array and build the tree with it

    if (start > end) {
      return null;
    }
    // Find the middle of the array (root)
    let mid = Math.floor((start + end) / 2);
    // console.log(mid);
    // Create a root element by passing array at mid index into the Node class
    let root = new Node(array[mid]);
    // Recursion:
    // --Set the left node to buildTree, and pass in the array with the start being start, and end being mid-1
    root.left = this.buildTree(array, start, mid - 1);
    // --Set the right node to buildTree, and pass in the array with the start being mid+1, and the end being end
    root.right = this.buildTree(array, mid + 1, end);
    // Return the root;
    return root;
  }

  insert(value, node = this.tree) {
    // Add the value as a Node to an empty array
    if (!this.tree) {
      console.log("Here");
      return this.tree = new Node(value);
    }

    // Take the value, and TREE as input (the first one will be this.root)
    // Turn the value into a new Node
    // Take the tree and find the root
    // If value === nodeRoot { then it exists already }
    // If nodeRoot === null { then it means we've reached a suitable location for the node Insert or it's empty }
    // Else if the value is less than the nodeRoot, go left by calling insert(value, node.left);
    // Else if the value is greater than the nodeRoot, go left by calling insert(value, node.right);

    // If an empty node is reached, insert the value there
    if (node === null) {
      console.log("Null");
      return new Node(value);
    }

    // If the value exists, return, else traverse the tree for a suitable insert node
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
    // If the tree is empty, don't bother
    if (node === null) {
      console.log("Empty");
      return node;
    }

    // Traverse the tree
    // --If (value is less than the current node) {go left recursively}
    console.log(node.root);
    if (value < node.root) {
      console.log("Less than");
      node.left = this.delete(value, node.left);
    }
    // --If (value is greater than the current node) {go right recursively}
    else if (value > node.root) {
      console.log("Greater than");
      node.right = this.delete(value, node.right);
    }
    // --Else, you've hit the value (this also catches if there is no value)
    else {
      // ----node at this point refers to the value
      console.log("We found it");
      console.log(node);
      // ----Check if the node has 0 children
      // ----If (node.left === null) {return root.right}
      if (!node.left) {
        console.log(node);
        // console.log(node.right);
        return node.right;
      }
      // ----If (node.right === null) {return root.left}
      else if (!node.right) {
        // console.log(node.left);
        return node.left;
      }
      // 222: Work on this
      // ----For nodes with 2 children
      // ----node.value = this.moveLeftChild(node.right);
      // ----node.right = delete(node.right, node.root);
      node.root = this.moveLeftChild(node.right);
      node.right = this.delete(node.root, node.right);
    }
    // Return the node
    return node;
  }

  moveLeftChild(root) {
    // Right child gets passed in as the root
    // Grab the data of the right child
    let leftValue = root.root;
    // While the left child of root is not null (contains a value)
    while (root.left != null) { 
      // Set the data of the right child to the data of the left child
      leftValue = root.left.root;
      // Set the root (right child) to the left child
      root = root.left;
    }
    return leftValue;
  }

  // Find the node of a given value
  find(value, node = this.tree) {
    // If the value is null, then we've reached the end and didn't find the value, return value
    // if: Recursively traverse the BST until you've reached the value
    // else: return node
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
    // BFS goes down the tree level by level, from left to right
    // Ex: The dummy tree would return 4 2 6 1 3 5 7

    // Use a queue to do a level order traversal
    // --Add the children to the queue, first the left child, then the right
    // --Repeat until there are no children left
    // Create an array, insert the root node, then insert left child, then right child
    // --For every node you hit, add its left and right child to the end of the array
    // --Print the node (callback)
    // --Remove the first element after adding its children (if any)

    // Create an array
    let queue = [this.tree];

    // While the length of queue greater than zero
    // Log the first item of the queue's root
    // If there is a left child, add that child to queue
    // If there is a right child, add that child to queue
    // Repeat this until it's empty
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
    // Take in the Node as an argument (first call is on this.tree)
    // Base: If the root is null {return}
    // Print the data in the root node
    // Recursively call self on the left child
    // Recursively call self on the right child

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
  }
}

let myArray = [1, 2, 3, 4, 5, 6, 7];
// let myArray = [2, 4, 5, 8, 10, 12, 14];
// let myArray = [];
let myTree = new Tree(myArray);

myTree.inOrder();

// Dummy tree
// ------4
// ----2---6
// ---1-3-5-7


// let testArray = [];
// console.log(testArray);

// testArray.push(1);
// console.log(testArray);

// testArray.push(2);
// console.log(testArray);

// testArray.push(3);
// console.log(testArray);

// testArray.shift();
// console.log(testArray);

// testArray.shift();
// console.log(testArray);