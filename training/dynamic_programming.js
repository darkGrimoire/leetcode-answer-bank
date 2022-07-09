const { performance } = require('perf_hooks');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var input = []
rl.on('line', function (line) {
  input.push(line)
})

rl.on('close', function () {
  const prob = input.shift().split(' ').reduce((acc, x) => acc + parseInt(x), 0)

  let startTime = performance.now()

  switch (prob) {
    case 1:
      n = parseInt(input.shift())
      console.log(prob1_fib_memo(n))
      break;

    case 2:
      [m, n] = input.shift().split(' ').map(x => parseInt(x))
      console.log(prob2_gridtv_memo(m, n))
      break;

    case 3:
      targetSum = parseInt(input.shift())
      arrNum = input.shift().split(' ').map(x => parseInt(x))
      console.log(prob3_canSum_memo(targetSum, arrNum))
      break;

    case 4:
      targetSum = parseInt(input.shift())
      arrNum = input.shift().split(' ').map(x => parseInt(x))
      console.log(prob4_howSum_memo(targetSum, arrNum))
      break;

    case 5:
      targetSum = parseInt(input.shift())
      arrNum = input.shift().split(' ').map(x => parseInt(x))
      console.log(prob5_bestSum_memo(targetSum, arrNum))
      break;

    case 6:
      targetWord = input.shift()
      arrWord = input.shift().split(' ')
      console.log(prob6_canConstruct_memo(targetWord, arrWord))
      break;

    case 7:
      targetWord = input.shift()
      arrWord = input.shift().split(' ')
      console.log(prob7_countConstruct_memo(targetWord, arrWord))
      break;

    case 8:
      targetWord = input.shift()
      arrWord = input.shift().split(' ')
      console.log(prob8_allConstruct_memo(targetWord, arrWord))
      break;

    case 1 + 8:
      n = parseInt(input.shift())
      console.log(prob1_fib_tab(n))
      break;

    case 2 + 8:
      [m, n] = input.shift().split(' ').map(x => parseInt(x))
      console.log(prob2_gridtv_tab(m, n))
      break;

    case 3 + 8:
      targetSum = parseInt(input.shift())
      arrNum = input.shift().split(' ').map(x => parseInt(x))
      console.log(prob3_canSum_tab(targetSum, arrNum))
      break;

    case 4 + 8:
      targetSum = parseInt(input.shift())
      arrNum = input.shift().split(' ').map(x => parseInt(x))
      console.log(prob4_howSum_tab(targetSum, arrNum))
      break;

    case 5 + 8:
      targetSum = parseInt(input.shift())
      arrNum = input.shift().split(' ').map(x => parseInt(x))
      console.log(prob5_bestSum_tab(targetSum, arrNum))
      break;

    case 6 + 8:
      targetWord = input.shift()
      arrWord = input.shift().split(' ')
      console.log(prob6_canConstruct_tab(targetWord, arrWord))
      break;

    case 7 + 8:
      targetWord = input.shift()
      arrWord = input.shift().split(' ')
      console.log(prob7_countConstruct_tab(targetWord, arrWord))
      break;

    case 8 + 8:
      targetWord = input.shift()
      arrWord = input.shift().split(' ')
      console.log(prob8_allConstruct_tab(targetWord, arrWord))
      break;

    default:
      console.log('No problem inserted')
  }

  let endTime = performance.now()

  console.log(`--- execution time: ${endTime - startTime}ms`)
});

// characteristics of DP problems: duplicate calculation in a recursive tree
// store calculation so it won't calculate it again next time
// uses hashmaps pretty often for memoization
// n = numbers.length
// m = target


// PROB 1: FIBBONACCI
// example of recursive DP with memo
// time: O(n)
// space: O(n)
function prob1_fib_memo(n, memo = {}) {
  if (n in memo) return memo[n]
  if (n <= 2) return 1
  memo[n] = prob1_fib_memo(n - 1, memo) + prob1_fib_memo(n - 2, memo)
  return memo[n]
}

// time: O(n)
// space: O(n)
function prob1_fib_tab(n) {
  let tab = Array(n + 1).fill(0)

  tab[1] = 1

  for (let i = 0; i <= n; i++) {
    tab[i + 1] += tab[i]
    tab[i + 2] += tab[i]
  }

  return tab[n]
}

// PROB 2: GRID TRAVELER
// how many ways to travel from top-left to right-bottom of a 2D grid?
// can only go down or right
// time: O(n*m)
// space: O(m)
function prob2_gridtv_memo(m, n, memo = {}) {
  if (`${m}:${n}` in memo) return memo[`${m}:${n}`]
  if (m === 0 || n === 0) return 0
  if (m === 1 && n === 1) return 1

  let res = prob2_gridtv_memo(m - 1, n, memo) + prob2_gridtv_memo(m, n - 1, memo)
  memo[`${m}:${n}`] = memo[`${n}:${m}`] = res

  return memo[`${m}:${n}`]
}

// time: O(n*m)
// space: O(n*m)
function prob2_gridtv_tab(m, n) {
  let tab = Array(m + 1).fill().map(() => Array(n + 1).fill(0))

  tab[1][1] = 1

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i + 1 <= m) tab[i + 1][j] += tab[i][j]
      if (j + 1 <= n) tab[i][j + 1] += tab[i][j]
    }
  }

  return tab[m][n]
}

// PROB 3: CANSUM
// is there a combination from array of number can sum up to targetSum
// time: O(n*m)
// space: O(m)
function prob3_canSum_memo(targetSum, arrNum, memo = {}) {
  if (targetSum in memo) return memo[targetSum]
  if (targetSum === 0) return true
  if (targetSum < 0) return false

  for (let num of arrNum) {
    if (prob3_canSum_memo(targetSum - num, arrNum, memo)) {
      memo[targetSum] = true
      return true
    }
  }

  memo[targetSum] = false
  return false
}

// time: O(n*m)
// space: O(n)
function prob3_canSum_tab(targetSum, arrNum) {
  let tab = Array(targetSum + 1).fill(false)

  tab[0] = true

  for (let i = 0; i <= targetSum; i++) {
    if (!tab[i]) continue

    for (let num of arrNum) {
      tab[i + num] = true
    }
  }

  return tab[targetSum]
}

// PROB 4: HOWSUM
// like canSum but what are the combinations used?
// only needs at least one combination
// time: O(n*m^2)
// space: O(m^2)
function prob4_howSum_memo(targetSum, arrNum, memo = {}) {
  if (targetSum in memo) return memo[targetSum]
  if (targetSum === 0) return []
  if (targetSum < 0) return null

  for (let num of arrNum) {
    let combination = prob4_howSum_memo(targetSum - num, arrNum, memo)
    if (combination) {
      memo[targetSum] = [...combination, num]
      return memo[targetSum]
    }
  }

  memo[targetSum] = null
  return null
}

// time: O(n*m^2)
// space: O(m^2)
function prob4_howSum_tab(targetSum, arrNum) {
  let tab = Array(targetSum + 1).fill(null)

  tab[0] = []

  for (let i = 0; i <= targetSum; i++) {
    if (!tab[i]) continue

    for (let num of arrNum) {
      tab[i + num] = [...tab[i], num]
    }

  }

  return tab[targetSum]
}

// PROB 5: BESTSUM
// like howSum but return the shortest combination of numbers used
// time: O(n*m^2)
// space: O(m^2)
function prob5_bestSum_memo(targetSum, arrNum, memo = {}) {
  if (targetSum in memo) return memo[targetSum]
  if (targetSum === 0) return []
  if (targetSum < 0) return null

  let shortestCombination = null

  for (let num of arrNum) {
    let combination = prob5_bestSum_memo(targetSum - num, arrNum, memo)
    if (!combination) continue

    combination = [...combination, num]

    if (!shortestCombination || combination.length < shortestCombination.length) {
      shortestCombination = combination
    }
  }

  memo[targetSum] = shortestCombination
  return shortestCombination
}

// time: O(n*m^2)
// space: O(m^2)
function prob5_bestSum_tab(targetSum, arrNum) {
  let tab = Array(targetSum + 1).fill(null)

  tab[0] = []

  for (let i = 0; i <= targetSum; i++) {
    if (!tab[i]) continue

    for (let num of arrNum) {
      let combination = [...tab[i], num]
      if (!tab[i + num] || combination.length < tab[i + num].length) tab[i + num] = combination
    }
  }

  return tab[targetSum]
}

// PROB 6: CANCONSTRUCT
// can we construct targetWord by concatenating elements from array of strings?
// time: O(n*m^2)
// space: O(m)
function prob6_canConstruct_memo(targetWord, arrWord, memo = {}) {
  if (targetWord in memo) return memo[targetWord]
  if (targetWord === '') return true

  for (let word of arrWord) {
    if (!targetWord.startsWith(word)) continue

    let tailWord = targetWord.slice(word.length)
    if (prob6_canConstruct_memo(tailWord, arrWord, memo)) {
      memo[targetWord] = true
      return memo[targetWord]
    }
  }

  memo[targetWord] = false
  return memo[targetWord]
}

// time: O(n*m^2)
// space: O(m)
// tab[0] means empty string
function prob6_canConstruct_tab(targetWord, arrWord) {
  let tab = Array(targetWord.length + 1).fill(false)

  tab[0] = true

  for (let i = 0; i <= targetWord.length; i++) {
    if (!tab[i]) continue

    for (let word of arrWord) {
      if (targetWord.slice(i, i + word.length) !== word) continue

      tab[i + word.length] = true
    }
  }

  return tab[targetWord.length]
}

// PROB 7: COUNTCONSTRUCT
// how many combinations can we construct the target word from arrWord?
// time: O(n*m^2)
// space: O(m^2)
function prob7_countConstruct_memo(targetWord, arrWord, memo = {}) {
  if (targetWord in memo) return memo[targetWord]
  if (targetWord === '') return 1

  let count = 0

  for (let word of arrWord) {
    if (!targetWord.startsWith(word)) continue

    let tailWord = targetWord.slice(word.length)
    count += prob7_countConstruct_memo(tailWord, arrWord, memo)
  }

  memo[targetWord] = count
  return count
}

// time: O(n*m^2)
// space: O(m)
// tab[0] means empty string
function prob7_countConstruct_tab(targetWord, arrWord) {
  let tab = Array(targetWord.length + 1).fill(0)

  tab[0] = 1

  for (let i = 0; i <= targetWord.length; i++) {
    if (tab[i] === 0) continue

    for (let word of arrWord) {
      if (targetWord.slice(i, i + word.length) !== word) continue

      tab[i + word.length] += tab[i]
    }
  }

  return tab[targetWord.length]
}

// PROB 8: ALLCONSTRUCT
// returns all combinations constructing the target word from arrword
// time: O(n^m)
// space: O(m)
function prob8_allConstruct_memo(targetWord, arrWord, memo = {}) {
  if (targetWord in memo) return memo[targetWord]
  if (targetWord === '') return [[]]

  let allCombinations = []

  for (let word of arrWord) {
    if (!targetWord.startsWith(word)) continue

    let tailWord = targetWord.slice(word.length)
    let combination = prob8_allConstruct_memo(tailWord, arrWord, memo)

    combination = combination.map(x => [word, ...x])
    allCombinations.push(...combination)
  }

  memo[targetWord] = allCombinations
  return allCombinations
}

// time: O(n^m)
// space: O(n^m)
// tab[0] means empty string
function prob8_allConstruct_tab(targetWord, arrWord) {
  let tab = Array(targetWord.length + 1).fill().map(() => Array(0))

  tab[0] = [[]]

  for (let i = 0; i <= targetWord.length; i++) {
    if (tab[i] === []) continue

    for (let word of arrWord) {
      if (targetWord.slice(i, i + word.length) !== word) continue

      let combination = tab[i].map(x => [...x, word])

      tab[i + word.length].push(...combination)
    }
  }

  return tab[targetWord.length]
}