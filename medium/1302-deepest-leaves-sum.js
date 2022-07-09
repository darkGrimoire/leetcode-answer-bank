// https://leetcode.com/problems/deepest-leaves-sum/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// function that returns all children node from a TreeNode in form of TreeNode[]
function getChildren(tree) {
  return [tree.left, tree.right].filter(x => x !== null)
}

// function that returns all children node from an array of TreeNode in form of TreeNode[]
function getAllChildren(trees) {
  let children = trees.map(tree => getChildren(tree))
  return Array.prototype.concat.apply([], children)
}

var deepestLeavesSum = function (root) {
  // proposed solution: check the deepest branch with bfs and then add the leaves
  // deepest branch: when all of the leaves has no child nodes

  let children = getChildren(root)

  while (getAllChildren(children).length !== 0) {
    children = getAllChildren(children)
  }


  return children.reduce((sum, node) => sum + node.val, 0)
};