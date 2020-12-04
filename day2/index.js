const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n').filter(v => v != '')

function parse(v) {
    let match = v.match(/(\d+)-(\d+) (\w): (\S+)/);
    if (match == null) return {};
    let [_, min, max, letter, password] = match;
    let letterMatches = password.match(new RegExp(letter, 'g'));
    let count = letterMatches?.length || 0;
    let letterAtMin = password[min-1];
    let letterAtMax = password[max-1];
    let highlighted = `${password.substring(0, min-1)}[${password[min-1]}]${password.substring(min, max-1)}[${password[max-1]}]${password.substring(max)}`;
    return {min: Number(min), max: Number(max), letter, password, count, letterAtMin, letterAtMax, highlighted};
}
function isValid(v) {
    let m = parse(v);
    if (!m.password) return false;
    return m.min <= m.count && m.count <= m.max;
}
function isValidPartTwo(v) {
    let m = parse(v);
    if (!m.password) return false;
    return m.letter === m.letterAtMin ^ m.letter === m.letterAtMax;
}
function run(input) {
    return input.reduce((ret, line) => {
        if (isValid(line)) ret.valid.push(line);
        else ret.invalid.push(line);
        return ret;
    }, {valid: [], invalid: []})
}
function runPartTwo(input) {
    return input.reduce((ret, line) => {
        if (isValidPartTwo(line)) ret.valid.push(line);
        else ret.invalid.push(line);
        return ret;
    }, {valid: [], invalid: []})
}

let day2Part1 = run(input);
console.log(`${input.length} passwords`);
console.log(`${day2Part1.valid.length} valid passwords, ${day2Part1.invalid.length} invalid passwords`);
console.log(`valid password sample:\n${day2Part1.valid[0]}`);
console.log(`invalid samples:\n`, day2Part1.invalid.slice(0, 3).map(parse));

console.log(`\nPart Two:`)
let day2Part2 = runPartTwo(input);
console.log(`${input.length} passwords`);
console.log(`${day2Part2.valid.length} valid passwords, ${day2Part2.invalid.length} invalid passwords`);
console.log(`valid samples:\n`, day2Part2.valid.slice(0, 2).map(parse));
console.log(`invalid samples:\n`, day2Part2.invalid.slice(0, 2).map(parse));
