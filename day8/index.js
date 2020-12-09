const fs = require('fs');
const AOC_DAY = 8;
function parse(fn) {
    return fs.readFileSync(fn, 'utf-8')
        .trim()
        .split('\n')
        .filter(v => v != '')
}

function run(parsedLines, fixLoop=false) {
    let visitedLines = [];
    let acc = 0;
    let pointer = 0;
    let replacedInstruction = null;
    while (pointer < parsedLines.length) {
        if (pointer < 0)
            return {error: `Avoiding pointer at ${pointer}`, acc, pointer};
        if (visitedLines.includes(pointer)) {
            if (fixLoop) {
                let prevJmpOrNop = visitedLines.find(n => ['nop', 'jmp'].includes(parsedLines[n].op));
                replacedInstruction
                return 
            }
            return {error: `Potential infinite loop at line ${visitedLines.pop() + 1}`, acc, pointer};
        }
        visitedLines.push(pointer);
        let instruction = parsedLines[pointer];
        if (instruction.op === 'nop') pointer++
        else if (instruction.op === 'acc') {
            pointer++;
            acc += instruction.delta;
        } else if (instruction.op === 'jmp') {
            pointer += instruction.delta;
        }
        // console.log(`${match} | ${visitedLines.length} | ${pointer} ${acc}`);
    }
    return {error: false, acc, replacedInstruction};
}
function parseInstruction(line) {
    let {op, delta} = /(?<op>nop|acc|jmp) (?<delta>[+-]?\d+)/.exec(line).groups;
    return {op, delta: Number(delta)};
}

function partOne(input) {
    console.log(run(parse(input).map(parseInstruction)))
}

console.log(`=== Day ${AOC_DAY}, Part one ===`)

let input = fs.readFileSync('input', 'utf-8')
let testinput = fs.readFileSync('testinput', 'utf-8')
partOne('testinput')
// partOne('input')

function partTwo(input) {
    console.log(run(parse(input).map(parseInstruction)), true);
}

console.log(`=== Day ${AOC_DAY}, Part two ===`)
// partTwo('testinput')
// partTwo('input')
