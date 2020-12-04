const fs = require('fs');
const SUM_GOAL = 2020;

let input = fs.readFileSync('input', 'utf-8').split('\n').filter(v => v != '')
    .map(v => Number(v))
    .sort((a,b) => a === b ? 0 : a > b ? 1 : -1)
function dayOne(input) {
    for (let num in input) {
        let left = input[num];
        let pairs = input.filter((v, i) => i > num && left + v === SUM_GOAL);
        if (pairs.length)
            return pairs.map(pair => [left, pair, left + pair, left * pair]);
    }
    return [];
}

function dayOnePartTwo(input) {
    for (let ai in input) {
        let a = input[ai];
        let bCandidates = input.filter((v, i) => i > ai && a + v < SUM_GOAL);
        for (let bi in bCandidates) {
            let b = bCandidates[bi];
            let triads = bCandidates.filter((v, i) => i > bi && a + b + v === SUM_GOAL);
            if (triads.length)
                return triads.map(v => [a, b, v, a+b+v, a*b*v]);
        }
    }
    return [];
}

console.log(dayOne(input));
console.log(dayOnePartTwo(input));
