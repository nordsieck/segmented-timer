'use strict';

module.exports = {
    Timer: Timer,
}

function Timer(duration, segments, now) {
    this.duration = duration; // milliseconds
    this.segments = segments;
    this.start = now;

    this.running = true;
    this.paused = false;
    this.width = 5; // progress bars

    this.segmentedTime = function(now) {

	let left = this.duration - (now - this.start);
	let segmentLen = this.duration / this.segments;
	let div = left / segmentLen | 0;
	let rem = left % segmentLen;

	let result = [];
	for (let i = 0; i < segments - div - 1; i++) { result[i] = 0; }
	result[segments - div - 1] = rem;
	for (let i = segments - div; i < segments; i++) { result[i] = segmentLen; }

	result.render = function() {
	    return result.map(v => `<progress value = "${v}" max = "${segmentLen}"></progress>`).join('\n');
	};

	return result;
    };
}

function ProgressVal(width, segments, duration, remaining) {}
