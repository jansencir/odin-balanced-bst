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
      return;
    }
  }
}

// let myArray = [1, 2, 3, 4, 5, 6, 7];
// let myArray = [2, 4, 5, 8, 10, 12, 14];
let myArray = [];
let myTree = new Tree(myArray);

myTree.delete();