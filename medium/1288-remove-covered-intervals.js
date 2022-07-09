/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function (intervals) {
  intervals.sort((a, b) => {
    return ((a[0] < b[0]) ? -1 : ((a[0] === b[0]) ? 0 : 1))
  })

  let results = []

  // console.log(intervals)

  for (let interval of intervals) {
    if (results.length === 0) {
      results.push(interval)
      continue
    }

    if (isCovered(interval, results.slice(-1)[0])) continue

    if (isCovered(results.slice(-1)[0], interval)) results.pop()

    results.push(interval)
  }

  return results.length
}


function isCovered(i1, i2) {
  if (i2[0] <= i1[0] && i1[1] <= i2[1]) return true

  return false
}