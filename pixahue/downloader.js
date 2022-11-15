const { createCanvas } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

class Rect {

	offset = (Math.random()*36|0)*10;
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
		C.fillStyle = `hsl(${f/4+this.offset}, 100%, 50%)`;
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

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		let name = `${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.fillStyle = "white";
		C.fillRect(0, 0, 4096, 2160)

		rects.forEach(element => {
			element.draw(frame)
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
	for await (const name of createFrames(7200)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
})()