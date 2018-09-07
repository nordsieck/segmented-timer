'use strict';

if (typeof(module) != "undefined") { module.exports = { Timer: Timer }; }

// todo: figure out how the timer ending works
function Timer(duration, segments) {
    this.duration = duration;
    this.segments = segments;

    this.running = false;
    this.width = 5; // progress bars
}

Timer.prototype.start = function(now) {
    this.running = true;
    this.startTime = now;
    return this;
};

Timer.prototype.segmentedTime = function(now) {
    let result = [];
    let segmentLen = this.duration / this.segments;

    if (this.running) {
	let left = this.duration - (now - this.startTime);
	let div = left / segmentLen | 0;
	let rem = left % segmentLen;

	for (let i = 0; i < this.segments - div - 1; i++) { result[i] = 0; }
	result[this.segments - div - 1] = rem;
	for (let i = this.segments - div; i < this.segments; i++) { result[i] = segmentLen; }
    } else {
	for (let i = 0; i < this.segments; i++) { result[i] = segmentLen; }
    }

    result.render = function() {
	return result.map(v => `<progress value = "${v}" max = "${segmentLen}"></progress>`).join('<br />');
    };

    return result;
};

Timer.prototype.render = function(now) {
    let left = this.duration;
    if (this.running) { left = now - this.start; }

    let formatted = new Date(left).toISOString().substr(11, 8).replace(/^[0:]+/, "");

    let result = `<div id = "timer">${formatted}</div>`;

    result += this.segmentedTime(now).render();

    result += `<div><button id = "start" type = "submit" value = "start">Start</button>`;
    result += `<button id = "advance" type = "submit" value = "advance">Advance</button></div>`;

    result += `<div>`;
    result += `<label for = "total">Total Time: </label> <input type = "text" id = "total" name = "total" value = "0">`;
    result += `<label for = "segments">Segments: </label> <input type = "text" id = "segments" name = "segments" value = "0">`;
    result += `<label for = "penalty">Penalty: </label>\n<input type = "text" id = "penalty" name = "penalty" value = "3">`;
    result += `</div>`;

    return result;
};
