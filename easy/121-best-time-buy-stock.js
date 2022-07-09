// https://leetcode.com/problems/best-time-to-buy-and-sell-stock
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // naive way: choose the minimum day, then choose the maximum day after the minimum index
  // the minimum index must be lower than the maximum index
  // [4,2,6,1,2] conditions where index constraint makes local maxima
  // another naive way: choose the maximum day first, then choose the minimum before it
  // [4,6,1,5] conditions where it also creates local maxima
  // proposed solution: use nested for loop to check maximum profit from all combinations
  // time complexity: n^2
  // ERROR: TLE -> must reduce time complexity
  // proposed solution: instead of checking all combinations, we must think like an ordinary human
  // checks for every price. If the price drops, then we update the minimum price. If the price is high, update the maximum profit.
  // time complexity: n

  let maxProfit = 0
  let minPrice = Number.MAX_VALUE

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i]
      continue
    }

    let profit = prices[i] - minPrice
    if (profit > maxProfit) {
      maxProfit = profit
    }
  }

  return maxProfit
};