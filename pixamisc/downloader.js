const { createCanvas } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

class Rect {

	offset = Math.random()*240|0;
	x;
	y;

	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	// 306x128

	draw(f, h){
		if(this.y < -436){
			this.y += 436*10;
			this.x -= 436*10
		}
		let z = Math.sin((f+this.offset)*π/120)**3 * 10,

			/* Random values of HWB */
			w = z < 0 ? z*-1.5 : 0,
			b = z > 0 ? z : 0,
		
			/* Converting HWB to HSL (HWB does not work in the npm canvas package) */
			l = (w + 100 - b)/200,
			s = l && l != 1 ? (1 - b/100 - l)/Math.min(l, 1-l) : 0;
		C.fillStyle = `hsl(${h}, ${s*100}%, ${l*100}%)`;
		C.beginPath();
		C.moveTo(this.x, this.y);
		C.lineTo(this.x + 182, this.y - 182);
		C.lineTo(this.x + 182 + 436, this.y - 182 + 436);
		C.lineTo(this.x + 182 + 436 - 182, this.y - 182 + 436 + 182);
		C.lineTo(this.x + 182 + 436 - 182 - 436, this.y - 182 + 436 + 182 - 436);
		C.fill();
	}
}

const rects = (arr => {
	for(let y = 0; y < 24; y++)
		for(let x = 0; x < 24; x++)
			arr.push(new Rect(x*182*2 - 182*x + 436*y, y*436 - 182*x));
	return arr
})([]);

async function* createFrames(frames, hue){
	for(let frame = 0; frame < frames; frame++){
		let name = `h${hue}_${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.fillStyle = `hsl(${hue}, 100%, 50%)`;
		C.fillRect(0, 0, 4096, 2160)

		rects.forEach(element => {
			element.draw(frame, hue)
			element.x += 436/60;
			element.y -= 436/60;
		});

		/* PUT DRAWING INFO ABOVE */

		await new Promise(resolve => {
			const out = fs.createWriteStream(name)
			const stream = canvas.createPNGStream()
			stream.pipe(out)
			out.on('finish', resolve)
		})

		yield name
	}
}

(async () => {
	console.time("Total time")
	for await (const name of createFrames(1200, 0)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	for await (const name of createFrames(1200, 60)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	for await (const name of createFrames(1200, 120)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	for await (const name of createFrames(1200, 300)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
})()