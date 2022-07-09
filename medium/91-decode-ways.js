/**
 * @param {string} s
 * @return {number}
 */

function decode(s, memo = {}) {
  // basis
  if (s in memo) return memo[s]
  if (s === '') return 1

  let res = 0

  // satuan
  let satuan = s[0]
  if (satuan !== '0') {
    res += decode(s.substr(1), memo)
  }

  // puluhan
  let puluhan = s.substr(0, 2)
  if (parseInt(puluhan) >= 10 && parseInt(puluhan) <= 26) {
    res += decode(s.substr(2), memo)
  }

  // console.log(`${s}:${res}`)

  memo[s] = res
  return res
}

var numDecodings = function (s) {
  // Conditions:
  // - tiap angka bisa dipisah jd satuan kalo angka setelahnya bukan 0
  // - rangenya 1-26
  // - kalo diluar range 10-26, brrti groupingnya satuan

  return decode(s)
};