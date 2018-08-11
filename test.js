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

run(
    test(true, true),
);
