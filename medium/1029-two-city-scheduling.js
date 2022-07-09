/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function (costs) {
  let sortedCosts = costs.sort(sortBySum, costs)
  // console.log(sortedCosts)

  let sumCost = 0
  let alternativeCosts = {
    a: [],
    b: []
  }
  let visitors = {
    a: 0,
    b: 0
  }

  for (let cost of sortedCosts) {
    let [choosenCost, alternativeCost, city] = cost[0] < cost[1] ? [cost[0], cost[1], 'a'] : [cost[1], cost[0], 'b']

    sumCost += choosenCost
    if (city === 'a') alternativeCosts['b'].push([alternativeCost, choosenCost])
    else if (city === 'b') alternativeCosts['a'].push([alternativeCost, choosenCost])
    visitors[city]++
  }

  console.log(alternativeCosts)

  while (Math.abs(visitors.a - visitors.b) > 0) {
    if (visitors.a > visitors.b) {
      alternativeCost = alternativeCosts.b.shift()
      sumCost = sumCost + alternativeCost[0] - alternativeCost[1]
      visitors.a--
      visitors.b++
    }
    else {
      alternativeCost = alternativeCosts.a.shift()
      sumCost = sumCost + alternativeCost[0] - alternativeCost[1]
      visitors.a++
      visitors.b--
    }
  }
  return sumCost
};

function sortBySum(a, b) {
  let sumA = Math.abs(a[0] - a[1])
  let sumB = Math.abs(b[0] - b[1])

  return sumA > sumB ? 1 : sumA == sumB ? 0 : -1
}