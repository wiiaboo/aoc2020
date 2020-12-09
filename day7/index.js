const fs = require('fs');
const AOC_DAY = 7;
function parse(fn) {
    return fs.readFileSync(fn, 'utf-8')
        .trim()
        .split('\n')
        .filter(v => v != '')
}

function parseRules (lines) {
    let re = /(?<key>[\w ]+) bags contain (?<contents>(?<start>\d+|no).+)\./;
    let ctsre = /(?<num>\d+) (?<content>[\w ]+) bags?(?:. )?/;
    let dict = lines.reduce((d, linetext) => {
        let match = re.exec(linetext);
        if (match == null) return d;
        let {key, contents, start} = match.groups;
        d[key] = start === 'no' ? {} :
            contents.split(', ').reduce((cts, ct) => {
                let {num, content} = ctsre.exec(ct).groups;
                cts[content] = Number(num);
                return cts;
            }, {});
        return d;
    }, {});
    return dict;
};

function directFit(dict, name) {
    return Object.keys(dict).filter(e => Object.keys(dict[e]).includes(name));
}
function indirectFit(dict, name) {
    let ret = [];
    let searchQ = [name];
    let quantity = 1;
    let total = 0;
    while (searchQ.length) {
        let searchName = searchQ.pop();
        let searchresult = directFit(dict, searchName);
        ret.push(...searchresult);
        searchQ.push(...searchresult);
    }
    return ret.filter((v,i,a) => a.indexOf(v) === i);
}

function partOne(input) {
    let parsed = parseRules(parse(input));
    // console.log(`Parsed:\n`, parsed)

    console.log(`Direct Fit: `, directFit(parsed, 'shiny gold'));
    console.log(`Indirect Fit: `, indirectFit(parsed, 'shiny gold').length);

    // let sums = parsed.reduce((s, g) => s += Object.keys(g.answers).length, 0)
    
    // console.log(`Sum of yes answers:`, sums)
}

console.log(`=== Day ${AOC_DAY}, Part one ===`)
partOne('testinput')
partOne('input')

function countBagsInside(dict, name) {
    if (dict[name] === undefined) return 0;
    return Object.entries(dict[name])
        .reduce((s, v) => s += v[1] + v[1] * countBagsInside(dict, v[0]), 0);
}

function partTwo(input, name) {
    let parsed = parseRules(parse(input));
    // console.log(`Parsed:\n`, parsed)
    console.log(`Bags contained in "${name}":`, countBagsInside(parsed, name));
}

console.log('=== Day ${AOC_DAY}, Part two ===')
partTwo('testinput', 'shiny gold')
partTwo('testinput2', 'shiny gold')
partTwo('input', 'shiny gold')
