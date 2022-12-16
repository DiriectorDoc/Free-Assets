const { createCanvas } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4196, 2260);
const C = canvas.getContext("2d");

const π = Math.PI;

class Circle {
	r = Math.random()*400+100;
	x = Math.random()*8192;
	y = Math.random()*4320;
	dx = this.x - Math.random()*8192;
	dy = this.x - Math.random()*4320;

	h = (Math.random()*36|0)*10;

	oh =  Math.random()*800|0;
	ox =  Math.random()*3200|0;
	oy =  Math.random()*3200|0;

	d = Math.random() > .5;

	draw(f){
		C.beginPath();
		C.arc(this.x + this.dx*Math[this.d ? "sin" : "cos"]((this.ox+f)*π/1600)/2+.5, this.y + this.dy*Math[this.d ? "cos" : "sin"]((this.oy+f)*π/1600)/2+.5, this.r, 0, 2*π, false);
		C.fillStyle = `hsla(${this.h}, 100%, 50%, ${(Math.sin((this.oh+f)*π/400)/2+.5)*.75})`;
		C.fill();
	}
}

const circles = new Array(100).fill(0).map(() => new Circle);

// C.filter = "blur(48px)";

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		let name = `${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.globalCompositeOperation = "source-over";
		C.fillStyle = "black";
		C.fillRect(0, 0, 4196, 2260)

		C.globalCompositeOperation = "lighter";
		circles.forEach(e => e.draw(frame))

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
	for await (const name of createFrames(3200)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
})()