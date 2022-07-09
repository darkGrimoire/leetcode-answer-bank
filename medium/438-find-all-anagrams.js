/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let result = []
  let pHash = Array(26).fill(0)
  let sHash = Array(26).fill(0)

  // guards
  if (p.length > s.length) return result

  // first window
  for (let i = 0; i < p.length; i++) {
    pHash[hash(p[i])]++
    sHash[hash(s[i])]++
  }

  if (isEqual(sHash, pHash)) result.push(0)

  // slide window with stride 1
  for (let i = p.length; i < s.length; i++) {
    sHash[hash(s[i])]++
    sHash[hash(s[i - p.length])]--

    if (isEqual(sHash, pHash)) result.push(i - p.length + 1)
  }

  return result
};

function hash(char) {
  return char.charCodeAt() - 'a'.charCodeAt()
}

function isEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}