// https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // naive way: nested for loops checks all possible indices combination
  // guards: index is the same
  // time complexity: n^2

  //   for (let i=0; i<nums.length; i++){
  //     let firstNum = nums[i]

  //     for (let j=i+1; j<nums.length; j++){
  //       let secondNum = nums[j]

  //       if (firstNum + secondNum === target) {
  //         return [i,j]
  //       }
  //     }
  //   }

  // upgraded solution: use map to store visited number and required number
  // time complexity: n

  let map = new Map()

  for (let i = 0; i < nums.length; i++) {
    let requiredNum = target - nums[i]

    if (map.has(requiredNum)) {
      return [map.get(requiredNum), i]
    } else {
      map.set(nums[i], i)
    }
  }
};