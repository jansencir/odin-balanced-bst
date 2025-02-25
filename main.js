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
    if (tree == null) {
      return;
    }
    this.postOrder(tree.left);
    this.postOrder(tree.right);
    console.log(tree.root);
  }

  // Return the height of a given node
  height(value, tree = this.tree) {
    // Create a variable to hold the "height"
    // "height" refers to the number of edges a node can hit until it reaches the bottom of the tree
    // Declare a variable to hold the height of the Node
    // Recursively make your way to the Node value
    // When that node is hit, make your way to the end of the tree
    // Add 1 to nodeHeight for each node hit after reaching the value
    // Return the height

    // Cannot use recursion as the nodeHeight will be reset
    // Need to use a different approach, possibly a queue

    // Recursion then queue???
    // Recursively move through the tree until you find the value;
    // If (!tree) return 0;
    // If (tree.root === value) Possible make this a base case???
    // --Declare nodeHeight = 0;
    // --Declare queue = [tree];
    // --while (queue.length !== 0)
    // ----Do what you did in levelOrder
    // ----
    // --return nodeHeight;

    // If there is no tree, or you've hit the end, return 0
    if (!tree) {
      console.log("0");
      return;
    }
    if (tree.root === value) {
      // We've found the value

      // Declare a variable to hold the height
      let nodeHeight = 0;
      // Initiate a queue by adding the tree, with value as the root, to the queue
      let queue = [tree];

      // 222: Figure out how this even works
      // While the queue is NOT empty...
      while (queue.length > 0) {
        // Grab the length of the queue
        let levelSize = queue.length;
        // This will process each level of the tree
        for (let i = 0; i < levelSize; i++) {
          // Grab the first Node in the queue
          // Also removes the first Node in the queue
          let node = queue.shift();
          // If a left tree is present, add it to the queue
          if (node.left) {
            queue.push(node.left);
          }
          // If a right node is present, add it to the queue
          if (node.right) {
            queue.push(node.right);
          }
        }
        // Increment height after processing each level of the tree
        nodeHeight++;
      }
      console.log(nodeHeight);
      return nodeHeight;
    }

    // Recursively go through the tree until you hit the node...
    if (value < tree.root) {
      tree.left = this.height(value, tree.left);
    } else if (value > tree.root) {
      tree.right = this.height(value, tree.right);
    }
  }

  // Return the depth of a given node
  depth(value, tree = this.tree, count = 1) {
    // Take in 3 parameters
    // --value: the value being searched for
    // --tree: set to this.tree at first, then changed to left/right during recursion
    // --count: set to 1, will be incremented with each traversal down the tree

    // Base: if the tree is empty, return 0;
    if (!tree) {
      console.log("0, Tree Empty or Value Not Found");
      return;
    }

    // Base: If we hit the value, return count
    if (value === tree.root) {
      console.log(count);
      return;
    }

    // Recursion: Traverse through the tree until we hit the value
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
    // Find the depth of the lowest Node on the Left Sub-Tree
    // Find the depth of the lowest Node on the Right Sub-Tree

    // Recursion
    // Traverse one tree

    // Base: If the tree is empty, it's technically considered balanced
    if (!this.tree) {
      console.log("Empty, but technically balanced");
      return true;
    }

    let leftSubTreeHeight = this.heightTree(this.tree.left);
    let rightSubTreeHeight = this.heightTree(this.tree.right);


    // Create logic to check if it's balanced
    if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) <= 1) {
      console.log("Balanced");
      return true;
    } else {
      console.log("Not Balanced");
      return false;
    }
  }
}

let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// let myArray = [2, 4, 5, 8, 10, 12, 14];
// let myArray = [];
let myTree = new Tree(myArray);

myTree.isBalanced();

// Dummy tree
// ------4
// ----2---6
// ---1-3-5-7

// Dummy Tree 2
// ----------7
// -----3---------10
// --1-----5---8------12
// ---2---4-6---9----11-13


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