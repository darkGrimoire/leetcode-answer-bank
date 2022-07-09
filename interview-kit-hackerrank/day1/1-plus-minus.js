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
      main();
      break;

    default:
      console.log('No problem inserted')
  }

  let endTime = performance.now()

  console.log(`--- execution time: ${endTime - startTime}ms`)
});

function main() {

}