const fs = require('fs');

function parse(fn) {
    return fs.readFileSync(fn, 'utf-8')
        .trim()
        .split('\n')
        .filter(v => v != '')
        .map(parseLine);
}

let MAX_ROWS = 128;
let MAX_COLS = 8;
function parseLine(line) {
    let rowRange = [0,MAX_ROWS-1];
    let rowsAvailable = MAX_ROWS;
    let colRange = [0,MAX_COLS-1];
    let colsAvailable = MAX_COLS;

    for (let c of line) {
        switch (c) {
            case 'F':
                rowRange[1] -= (rowsAvailable /= 2);
                break;
            case 'B':
                rowRange[0] += (rowsAvailable /= 2);
                break;
            case 'L':
                colRange[1] -= (colsAvailable /= 2);
                break;
            case 'R':
                colRange[0] += (colsAvailable /= 2);
                break;
        }
    }
    let row = rowRange.pop(),
        col = colRange.pop(),
        seat = row*8 + col;

    return { line, row, col, seat }
}

function partOne(input) {
    let parsed = parse(input);
    // console.log(`Parsed:\n`, parsed)

    let sorted = parsed.sort((a, b) => a.seat > b.seat);
    
    console.log(`Highest seat ID: ${sorted.pop().seat}`)
}

console.log('=== Day , Part one ===')
let input = fs.readFileSync('input', 'utf-8')
let testinput = fs.readFileSync('testinput', 'utf-8')
partOne('testinput')
partOne('input')

function partTwo(input) {
    let parsed = parse(input);
    // console.log(`Parsed:\n`, parsed)

    let sorted = parsed.sort((a, b) => a.seat < b.seat ? -1 : 1);
    let hole = sorted.find((s, i, a) => {
        let nextSeat = a[i+1];
        if (!nextSeat) return false;
        return (nextSeat.seat - s.seat) - 1;
    });
    if (hole) {
        let mySeat = {
            row: 0,
            col: 0,
            seat: hole.seat+1
        };
        mySeat.row = Math.floor(mySeat.seat / 8)
        mySeat.col = mySeat.seat % 8;
        console.log(`Empty seat found:`, mySeat);
    }

}

console.log('=== Day 4, Part two ===')
partTwo('input')
