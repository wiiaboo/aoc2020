const fs = require('fs');

function parse(fn) {
    return fs.readFileSync(fn, 'utf-8')
        .trim()
        .split('\n\n')
        .filter(v => v != '')
}

let MAX_ROWS = 128;
let MAX_COLS = 8;
function parseGroup(group, consensus=false) {
    let people = group.split('\n');
    let answers = people
        .reduce((r, p) => {
            p.split('')
                .forEach(a => {
                    r[a] == null ? r[a] = 1 : r[a]++;
                });
            
            return r;
        }, {});

    if (consensus) {
        answers = Object.fromEntries(Object.entries(answers)
            .filter(a => a[1] == people.length));
    }

    return {
        // group,
        answers,
    };
}

function partOne(input) {
    let parsed = parse(input).map(g => parseGroup(g));
    // console.log(`Parsed:\n`, parsed)

    let sums = parsed.reduce((s, g) => s += Object.keys(g.answers).length, 0)
    
    console.log(`Sum of yes answers:`, sums)
}

console.log('=== Day 6, Part one ===')
let input = fs.readFileSync('input', 'utf-8')
let testinput = fs.readFileSync('testinput', 'utf-8')
partOne('testinput')
partOne('input')

function partTwo(input) {
    let parsed = parse(input).map(g => parseGroup(g, true));
    // console.log(`Parsed:\n`, parsed)

    let sums = parsed.reduce((s, g) => s += Object.keys(g.answers).length, 0)
    console.log(`Sum of yes answers:`, sums)
}

console.log('=== Day 6, Part two ===')
partTwo('testinput')
partTwo('input')
