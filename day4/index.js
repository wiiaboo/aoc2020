const fs = require('fs');

const passportFields = {
    byr: ['Birth Year', v => /^(19[2-9]\d|200[0-2])$/.test(v)],
    iyr: ['Issue Year', v => /^20(1\d|20)$/.test(v)],
    eyr: ['Expiration Year', v => /^20(2\d|30)$/.test(v)],
    hgt: ['Height', v => /^(1([5-8]\d|9[0-3])cm|(59|6\d|7[0-6])in)$/.test(v)],
    hcl: ['Hair Color', v => /^#[0-9a-f]{6}$/i.test(v)],
    ecl: ['Eye Color', v => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v)],
    pid: ['Passport ID', v => /^\d{9}$/.test(v)],
    cid: ['Country ID'],
};
const optionalFields = ['cid'];
const requiredFields = Object.keys(passportFields).filter(f => !optionalFields.includes(f));

function parsePassportInfo(input) {
    return input.trim()
        .split('\n\n')
        .filter(v => v != '')
        .map(p => {
            // console.log(p)
            return Object.fromEntries(
                p.split(/\s+/g)
                .map(e => e.split(':'))
                .sort((a,b) => {
                    if (a[0] === b[1]) return 0;
                    return Object.keys(passportFields).indexOf(a[0]) < Object.keys(passportFields).indexOf(b[0]) ? -1 : 1; 
                })
                .filter(e => {
                    if (e.length === 2 && e[0] && e[1])
                        return true;
                    console.log(e, p, p.split(/\s+/g));
                    return false;
                })
            )
        });
}

function validatePassport(passport, strict=false) {
    let passKeys = Object.keys(passport);
    let missingRequired = requiredFields.filter(k => !passKeys.includes(k));
    let missingOptional = optionalFields.filter(k => !passKeys.includes(k));
    let missing = missingRequired.length ? missingRequired.concat(missingOptional) : [];
    let invalidFields = !strict ? [] :
        passKeys.filter(f => {
            if (missingRequired.includes(f)) return true;
            // console.log(f, passport);
            return passportFields[f].length > 1 &&
                !passportFields[f][1](passport[f]);
            }).map(f => `${f}: ${passport[f]}`);

    return {
        valid: !missing.length && !invalidFields.length,
        missing,
        missingOptional,
        invalidFields
        // passport
    }
}

function partOne(input) {
    let parsed = parsePassportInfo(input);
    // console.log(`Parsed passports:\n`, parsed)
    
    let validated = parsed.map(p => validatePassport(p));
    // console.log(`Validated passports:\n`, validated)
    let valid = validated.filter(p => p.valid);
    let invalid = validated.filter(p => !p.valid);
    console.log(`Valid passports: ${valid.length}`)
}

console.log('=== Day 4, Part one ===')
let input = fs.readFileSync('input', 'utf-8')
let testinput = fs.readFileSync('testinput', 'utf-8')
partOne(testinput)
partOne(input)

function partTwo(input) {
    let parsed = parsePassportInfo(input);
    // console.log(`Parsed passports:\n`, parsed)
    
    let validated = parsed.map(p => validatePassport(p, true));
    // console.log(`Validated passports:\n`, validated)
    let valid = validated.filter(p => p.valid);
    let invalid = validated.filter(p => !p.valid);
    console.log(`Valid passports: ${valid.length}`)
}

let inputinvalid = fs.readFileSync('testinput2invalid', 'utf-8')
let inputvalid = fs.readFileSync('testinput2valid', 'utf-8')

console.log('=== Day 4, Part two ===')
partTwo(inputinvalid)
partTwo(inputvalid)
partTwo(input)
