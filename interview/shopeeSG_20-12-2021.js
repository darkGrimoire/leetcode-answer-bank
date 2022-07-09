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
  const prob = parseInt(input.shift())

  let startTime = performance.now()

  switch (prob) {
    case 1:
      const friendships = [
        ['Alex', 'Claire'],
        ['Phil', 'Jay'],
        ['Joe', 'Luke'],
        ['Gloria', 'Mitchell'],
        ['Alex', 'Haley'],
        ['Gloria', 'Lily'],
        ['Haley', 'Phil'],
        ['Mitchell', 'Luke'],
        ['Jay', 'Claire'],
        ['Lily', 'Manny'],
      ];
      console.log(prob1_shortestFriends_bfs(friendships, 'Alex', 'Jay')) // 2
      console.log(prob1_shortestFriends_bfs(friendships, 'Alex', 'Manny')) // -1
      console.log(prob1_shortestFriends_bfs(friendships, 'Joe', 'Manny')) // 5
      break;

    case 2:
      console.log(prob2_parseArray('[]')) // []
      console.log(prob2_parseArray('[5]')) // [5]
      console.log(prob2_parseArray('[1,20,300]')) // [1,20,300]
      console.log(prob2_parseArray('[1,[2,[1,20,300]],3]')) // nested arrays; [1,[2,[1,20,300]],3]
      break;

    default:
      console.log('No problem inserted')
  }

  let endTime = performance.now()

  console.log(`--- execution time: ${endTime - startTime}ms`)
});

function getUniqueNodes(edgeList) {
  return [...new Set(edgeList.flatMap(x => x))]
}

function edgeList2AdjList(edgeList) {
  const adjList = new Map()

  // let nodes = getUniqueNodes(edgeList)

  // nodes.forEach(node => adjList.set(node, []))
  // edgeList.forEach(edge => {
  //   const [origin, dest] = edge

  //   adjList.get(origin).push(dest)
  //   adjList.get(dest).push(origin)
  // })

  edgeList.forEach(edge => {
    const [origin, dest] = edge

    if (!adjList.has(origin)) adjList.set(origin, [])
    if (!adjList.has(dest)) adjList.set(dest, [])

    adjList.get(origin).push(dest)
    adjList.get(dest).push(origin)
  })

  return adjList
}

// PROB 1: shortestFriends
// given edge list of friendships, calculate shortest distance from X to Y
// INSHORT: shortest distance is the depth of BFS
// time: O(V+E) / O(b^d)
// space: O(V) / O(b^d)
function prob1_shortestFriends_bfs(friendships, source, target) {
  // convert into adjacency list
  const adjList = edgeList2AdjList(friendships)

  const queue = [source]
  const visited = new Set()

  let shortestDistance = 0

  while (queue.length !== 0) {
    let levelSize = queue.length

    while (levelSize-- !== 0) {
      const curSource = queue.shift()

      const dests = adjList.get(curSource)

      for (const dest of dests) {
        if (dest === target) {
          return shortestDistance + 1
        }

        if (!visited.has(dest)) {
          visited.add(dest)
          queue.push(dest)
        }
      }
    }

    shortestDistance++
  }

  return -1
}

// PROB 2: parse array of positive integers
// assume: array is always valid
// time: O(n)
// space: O(n)
function prob2_parseArray(word) {
  const DELIMITER = ','
  const OPENING = '['
  const CLOSING = ']'

  let stack = []
  let buffer = ''

  for (let char of word) {
    // if opening: push to the stack
    if (char === OPENING) stack.unshift(char)

    // if closing: push remaining buffer, then
    // pop all elements into an array until reaches opening
    // then, push again the resulting array
    else if (char === CLOSING) {
      if (buffer) {
        let num = parseInt(buffer)
        stack.unshift(num)
        buffer = ''
      }

      let arr = []
      let el = stack.shift()

      while (el !== OPENING) {
        arr.unshift(el)
        el = stack.shift()
      }

      stack.unshift(arr)
    }

    // if delimiter: push remaining buffer to stack
    else if (char === DELIMITER) {
      if (!buffer) continue

      let num = parseInt(buffer)
      stack.unshift(num)
      buffer = ''
    }

    // if number, adds to the buffer
    else buffer += char
  }

  // returns the top of the stack
  return stack.shift()
}