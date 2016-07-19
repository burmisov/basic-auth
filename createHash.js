/* eslint-disable */

require('babel-register');

var calcMd5 = require('./src/lib/calcMd5').default;

function main(s) {
  console.log(calcMd5(s));
}

main(process.argv[1]);

/* eslint-enable */
