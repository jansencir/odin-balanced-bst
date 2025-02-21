// Build a Node class that holds the root data, left child, and right child
class Node {
  constructor(data) {
    this.root = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array = []) {
    this.tree = this.arraySortRemove(array);
  }

  // arraySortRemove(array) sorts and removes duplicates in an array;
  arraySortRemove(array) {
    let sorted = array.sort((a, b) => a - b);
    return sorted.filter((item, index) => sorted.indexOf(item) === index);
  }
}