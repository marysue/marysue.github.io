class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function add(currNode, val) {
    if (currNode.val > val && currNode.left != null) {
        currNode = currNode.left;
        add(currNode, val);
    } else if (currNode.val < val && currNode.right != null) {
        currNode = currNode.right;
        add(currNode, val);
    } else if (currNode.val > val) {
        let newNode = new Node(val);
        currNode.left = newNode;
    } else {// currNode.val < val {
        let newNode = new Node(val);
        currNode.right = newNode;
    }
}

function breadthFirst(root, val) {
    if (root === null) return "Not found";
    if (root.val === val) return val;

    console.log("Looking at:  ", root.val);
    if (root.val < val && root.right != null) {
        breadthFirst(root.right, val);
    } else if (root.val > val && root.left != null) {
        breadthFirst(root.left, val)
    }
}
function enqueue(queue, val) {
    queue.push(val);
}

function printTree(root) {
    currNode = root;

    while (currNode) {
        console.log(currNode.val)
        prevNode = currNode;
        currNode = currNode.left;
        console.log(currNode.val);
        currNode = currNode.right;
        console.log(currNode.val);
        currNode = prevNode.right;

    }
}

function printBreadthFirst(root) {
    let queue = [];
    queue.push(root);
    while (queue.length) {
        let currNode = queue.shift();
        if (currNode.left != null) queue.push(currNode.left);
        if (currNode.right != null) queue.push(currNode.right);
        console.log(currNode.val);
    }
}

//root
//root.left -> 4
//root.right -> 12

let root = new Node(8);
add(root, 4);
add(root, 12);
add(root, 1);
add(root, 5);
add(root, 3);
add(root, 10);
add(root, 9);
add(root, 15);

//console.log(breadthFirst(root, 10));
//printTree(root);

//printBreadthFirst(root);

function depthFirstSearch(graph, startingNode, targetVal, visited = new Set() ) {
    console.log(`startingNode: ${startingNode}`);
    if (startingNode === targetVal) return true;
    visited.add(startingNode);

    let neighbors = startingNode;
    console.log(`     neighbors: ${graph[startingNode]}`)
    for (let neighbor of graph[startingNode]) {
        if (visited.has(neighbor)) continue;
        console.log(`          neighbor: ${neighbor}`)
        visited.forEach( elt => console.log(`          visited: ${elt}`));

        let retVal = depthFirstSearch(graph, neighbor, targetVal, visited);
        console.log(`          return from depthFirstSearch: ${retVal}`);
        //if (depthFirstSearch(graph, neighbor, targetVal, visited)) {
            if (retVal) {
                console.log(`          returning true from function`);
            return true;
        }

    }
    console.log(`returning false`);
    return false;
}

let graph = {
    'a' : [ 'b', 'c' ],
    'b' : [ 'c', 'd' ],
    'c' : [ 'a' ],
    'd' : [ ]
}

depthFirstSearch(graph, 'a', 'c');
