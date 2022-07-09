// https://leetcode.com/problems/valid-parentheses/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // proposed solution: use stack. If it's opening then push to the stack, else check the top of the stack. If it's the same type then pop the stack, else invalid
  const OPENINGS = ['(', '[', '{']
  const CLOSINGS = [')', ']', '}']

  let stack = []



  for (let char of s) {
    if (OPENINGS.includes(char)) {
      stack.unshift(char)
    }
    else {
      let bracketType = CLOSINGS.indexOf(char)

      if (stack[0] === OPENINGS[bracketType]) {
        stack.shift()
      } else {
        return false
      }
    }
  }

  return stack.length === 0
};