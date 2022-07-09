/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  // proposed solution: check the count of each character using map.

  if (s.length !== t.length) return false

  let map = new Map()

  for (let char of t) {
    if (!map.has(char)) map.set(char, 0)

    map.set(char, map.get(char) + 1)
  }

  for (let char of s) {
    if (!map.has(char)) return false

    if (map.get(char) === 0) return false

    map.set(char, map.get(char) - 1)
  }

  return true
};
