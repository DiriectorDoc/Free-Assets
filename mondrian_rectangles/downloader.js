(async function(){const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

const GRAY = "#A1ACB3",
	RED = "#ED1B24",
	YELLOW = "#F0EB22",
	BLUE = "#0299ED";

C.strokeStyle = "black";
C.lineWidth = 10;

class HLine {
	y;
	start;
	stop;

	constructor(y, start_stop, stop){
		this.y = y;
		this.stop = stop ?? start_stop ?? 4096;
		this.start = stop ? start_stop : 0
	}

	draw(){
		C.beginPath()
		C.moveTo(this.start, this.y)
		C.lineTo(this.stop, this.y)
		C.stroke()
	}
}

class VLine {
	x;
	start;
	stop;

	constructor(x, start_stop, stop){
		this.x = x;
		this.stop = stop ?? start_stop ?? 2160;
		this.start = stop ? start_stop : 0
	}

	draw(){
		C.beginPath()
		C.moveTo(this.x, this.start)
		C.lineTo(this.x, this.stop)
		C.stroke()
	}
}

class Rect {
	x;
	y;
	w;
	h;
	colour1;
	colour2 = [,"black", "white", RED, GRAY, YELLOW, BLUE][Math.random()*7|0];
	d;
	o = Math.random()*300|0;

	constructor(x, y, w, h, colour, d){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.colour1 = colour;
		this.d = d;
	}

	draw(f){
		C.fillStyle = this.colour1;
		C.fillRect(this.x, this.y, this.w, this.h)
		if(this.colour2 && this.colour2 != this.colour1){
			C.fillStyle = this.colour2;
			C.fillRect(this.x, this.y, this.w * (this.d == 1 ? 1 : clamp(s(f + this.o), 0, 1)), this.h * (this.d == 1 ? clamp(s(f + this.o), 0, 1) : 1))
		}
	}
}

function s(x){
	return 0.8506508083520399*Math.sin(x*π/150) + .5
}

const lines = [
		new HLine(123,1094,1777),
		new HLine(347,1777,2847),
		new HLine(532),
		new HLine(989,1094,2847),
		new HLine(1360,2323),
		new HLine(1704,1777,4096),
		new HLine(1843,1357),
		new HLine(2014,1357,2847),
		new VLine(968),
		new VLine(1094,1360),
		new VLine(1357,1360,2160),
		new VLine(1367,123,532),
		new VLine(1777,2014),
		new VLine(2323),
		new VLine(2847),
		new VLine(2995,532,1704),
		new VLine(3128),
		new VLine(700,1360,1843),
		new HLine(989,968),
		new HLine(1118,3128,4096),
		new HLine(266,3128,4096),
		new VLine(484,989),
		new VLine(3612,532,1704)
	],
	rects = [
		new Rect(968, 0, 126, 532, "black", 1),
		new Rect(1094, 989, 683, 371, "black", 1),
		new Rect(2323, 989, 524, 715, "black", 1),
		new Rect(3128, 1118, 484, 586, "black", 2),
		new Rect(1357, 2014, 966, 146, "black", 2),
		new Rect(1777, 0, 546, 347, "white", 2),
		new Rect(1367, 123, 410, 409, "white", 2),
		new Rect(968, 532, 126, 828, "white", 1),
		new Rect(2995, 532, 133, 1172, "white", 2),
		new Rect(1777, 989, 546, 371, "white", 2),
		new Rect(1777, 1360, 546, 344, "white", 2),
		new Rect(2847, 1704, 281, 456, "white", 1),
		new Rect(968, 1843, 389, 317, "white", 1),
		new Rect(700, 1360, 268, 483, "white", 1),
		new Rect(484, 532, 484, 457, "white", 1),
		new Rect(3128, 266, 968, 266, "white", 1),
		new Rect(3612, 1118, 484, 586, "white", 1),
		new Rect(1094, 0, 683, 123, GRAY, 2),
		new Rect(2323, 0, 524, 347, GRAY, 1),
		new Rect(2323, 532, 524, 457, GRAY, 2),
		new Rect(968, 1360, 389, 483, GRAY, 2),
		new Rect(2323, 2014, 524, 146, GRAY, 2),
		new Rect(0, 1360, 700, 483, GRAY, 2),
		new Rect(3612, 532, 484, 586, GRAY, 1),
		new Rect(1094, 123, 273, 409, RED, 1),
		new Rect(2847, 532, 148, 1172, RED, 1),
		new Rect(1357, 1360, 420, 654, RED, 1),
		new Rect(0, 1843, 968, 317, RED, 1),
		new Rect(484, 0, 484, 532, RED, 2),
		new Rect(3128, 0, 968, 266, RED, 2),
		new Rect(2847, 0, 281, 532, YELLOW, 1),
		new Rect(1777, 347, 546, 185, YELLOW, 1),
		new Rect(1777, 532, 546, 457, YELLOW, 2),
		new Rect(2323, 1704, 524, 310, YELLOW, 1),
		new Rect(0, 532, 484, 457, YELLOW, 2),
		new Rect(3128, 1704, 968, 456, YELLOW, 2),
		new Rect(2323, 347, 524, 185, BLUE, 2),
		new Rect(1094, 532, 683, 457, BLUE, 1),
		new Rect(1777, 1704, 546, 310, BLUE, 2),
		new Rect(0, 989, 968, 371, BLUE, 2),
		new Rect(0, 0, 484, 532, BLUE, 1),
		new Rect(3128, 532, 484, 586, BLUE, 2),
	];

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		console.log(`Drawing frame ${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`)

		C.fillStyle = "white";
		C.fillRect(0, 0, 4096, 2160)

		rects.forEach(e => e.draw(frame))
		lines.forEach(e => e.draw())

		C.fillStyle = "black";
		C.fillRect(0, 0, 4096, 20)
		C.fillRect(0, 0, 20, 2160)
		C.fillRect(4076, 0, 4096, 2160)
		C.fillRect(0, 2140, 4096, 2160)

		await new Promise(resolve => {
			const out = fs.createWriteStream(`${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`)
			const stream = canvas.createPNGStream()
			stream.pipe(out)
			out.on('finish', resolve)
		})

		yield `${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`
	}
}

for await (const name of createFrames(300)) {
	console.log(`Frame ${name} created`);
}
})()