const { createCanvas } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;



class Rhombus {
	left;
	type;

	constructor(left, fill){
		this.left = left;
		this.type = fill;
	}

	draw(f){
		let grd;
		if(this.type){
			grd = C.createLinearGradient(-4096+(((f*4) + 2048) % 4096), 0, 4096+(((f*4) + 2048) % 4096), 0);
			grd.addColorStop(0, "hsl(300 100% 10%)")
			grd.addColorStop(.25, "#F0F")
			grd.addColorStop(.5, "hsl(300 100% 10%)")
			grd.addColorStop(.75, "#F0F")
			grd.addColorStop(1, "hsl(300 100% 10%)")
		} else {
			grd = C.createLinearGradient(0-((f*4) % 4096), 0, 8192-((f*4) % 4096), 0);
			grd.addColorStop(0, "hsl(209.88 100% 10%)")
			grd.addColorStop(.25, "#0080FF")
			grd.addColorStop(.5, "hsl(209.88 100% 10%)")
			grd.addColorStop(.75, "#0080FF")
			grd.addColorStop(1, "hsl(209.88 100% 10%)")
		}
		C.fillStyle = grd;
		C.beginPath()
		C.moveTo(...this.left)
		C.lineTo(this.left[0]+50, this.left[1]-86.60254037844386)
		C.lineTo(this.left[0]+100, this.left[1])
		C.lineTo(this.left[0]+50, this.left[1]+86.60254037844386)
		C.closePath()
		C.fill()
	}
}

const f = Array(38).fill(0).map((_, i) => Array(23).fill(0).map((_, j) => new Rhombus([i*110-42, j*183.20508075688772-16.372055], true))).flat(),
	a = Array(39).fill(0).map((_, i) => Array(24).fill(0).map((_, j) => new Rhombus([i*110-97, j*183.20508075688772-16.372055-91.60254037844386], false))).flat();

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		let name = `${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.fillStyle = "black";
		C.fillRect(0, 0, 3840, 2160)

		f.forEach(e => e.draw(frame))
		a.forEach(e => e.draw(frame))

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
	for await (const name of createFrames(1025)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
})()