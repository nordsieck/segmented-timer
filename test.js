"use strict";

const lib = require('./lib.js');

function test(output, expected) {
    let [out, exp] = [JSON.stringify(output), JSON.stringify(expected)];
    if (out !== exp) { process.stdout.write("expected: " + exp + " got: " + out + "\n"); return false; }
    return true;
}

function run() {
    let failure = false;
    for (let i in arguments) { if (!arguments[i]) { failure = true; }}
    if (failure) { process.exit(1); }
}

let d1 = new Date(2000, 0, 1, 0, 0, 0);
let d2 = new Date(2000, 0, 1, 0, 0, 55);
let d3 = new Date(2000, 0, 1, 0, 0, 50);
let d4 = new Date(2000, 0, 1, 0, 1, 10);

run(
    test(true, true),

    test(new lib.Timer(70000, 7).segmentedTime(d4), [10000, 10000, 10000, 10000, 10000, 10000, 10000]),
    test(new lib.Timer(70000, 7).start(d1).segmentedTime(d1), [10000, 10000, 10000, 10000, 10000, 10000, 10000]),
    test(new lib.Timer(70000, 7).start(d1).segmentedTime(d2), [0, 0, 0, 0, 0, 5000, 10000]),
    test(new lib.Timer(70000, 7).start(d1).segmentedTime(d3), [0, 0, 0, 0, 0, 10000, 10000]),
    test(new lib.Timer(70000, 7).start(d1).segmentedTime(d4), [0, 0, 0, 0, 0, 0, 0]),
);
