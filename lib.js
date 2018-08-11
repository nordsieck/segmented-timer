'use strict';

module.exports = {
    Timer: Timer,
}

function Timer(duration, segments) {
    this.duration = duration;
    this.segments = segments;
    this.accumulated = 0;

    this.running = true;
    this.paused = false;
    this.width = 5; // progress bars

    this.segmentedTime = function() {
	segmentLen = this.duration / this.segments;
	left = this.duration - this.accumulated;

	s = [];
	for (let i = 0; i < segmentLen; i++) {
	    if (left / segmentLen < segments - i - 1) {
		s[i] = 0;
	    }
	}
    };
}

function ProgressVal(width, segments, duration, remaining) {

}

function Render(timer) {

}
