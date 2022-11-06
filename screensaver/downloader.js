const { createCanvas } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

class Circle {
	r = Math.max(Math.random()*250, 50);
	x = Math.random()*4096;
	y = Math.random()*2160;

	h = (Math.random()*36|0)*10

	draw(){
		C.beginPath();
		C.arc(this.x, this.y, this.r, 0, 2*π, false);
		C.fillStyle = `hsl(${this.h} 100% 50%)`;
		C.fill();
	}
}

const circles = new Array(1200).fill(0).map(() => new Circle);

circles.forEach(e => e.draw())

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		let name = `${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		circles[frame%1200].draw()

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
	for await (const name of createFrames(1200)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
})()