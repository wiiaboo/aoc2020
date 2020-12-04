const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n').filter(v => v != '')

const maxX = input[0].length;
const maxY = input.length;

function traverse(movement = {x: 3, y: 1}) {
    let pos = {x: 0, y: 0};
    const log = [];
    let steps = 0;

    function walk() {
        let move = {
            from: {
                x: pos.x,
                y: pos.y
            },
            to: {
                x: pos.x + movement.x,
                y: Math.min(maxY-1, pos.y + movement.y),
            },
            block: ''
        };
        // if (move.to.x >= maxX) {
        //     move.to.x = (pos.x + movement.x) % maxX;
        // }
        if ((movement.x > 0 && move.from.x === move.to.x) ||
            (movement.y > 0 && move.from.y === move.to.y))
            return false;
        steps++;
        move.to.realX = move.to.x % maxX;
        move.block = input[move.to.y][move.to.realX];
        pos.x = move.to.x;
        pos.y = move.to.y;
        log.push(move);
        return true;
    }
    while (walk()) {
    
        // console.log(`Walked`, movement, log.slice(-1).pop());
    }
    return {pos, log, steps};
}
function countChars(log, char) {
    return log.reduce((count, move) => move.block === char ? ++count : count, 0);
}

console.log('=== Day 3, Part one ===')
let res = traverse();
console.log(`Last position: ${JSON.stringify(res.pos)} | Limit: ${maxX}x${maxY} | Steps: ${res.steps}`)
console.log(`Trees found along the way: ${countChars(res.log, '#')}`);


console.log(`\n=== Day 3, Part two ===`)
const testMovements = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2},
];
console.log(`\n=== Multiplication:`, testMovements.reduce((mult, movement) => {
    let {pos, log, steps} = traverse(movement);
    console.log(`\nResults for movement pattern`, movement);
    console.log(`Last position: ${JSON.stringify(pos)} | Limit: ${maxX}x${maxY} | Steps: ${steps}`)
    console.log(`Trees found along the way: ${countChars(log, '#')}`);
    return mult * countChars(log, '#');
}, 1));
