const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(2160, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

let face, hour, minute, second;

C.fillStyle = "white";

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		let name = `${frame < 10000 ? "0" : ""}${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.clearRect(0, 0, 2160, 2160)

		C.beginPath();
		C.arc(1080, 1080, 1078, 0, 2*π);
		C.fill()

		C.drawImage(face, 0, 0)

		C.save();
		C.translate(1080, 1080);
		C.rotate(-3*π/40 + frame/21600*π);
		C.translate(-1080, -1080);
		C.drawImage(hour, 0, 0);
		C.restore();

		C.save();
		C.translate(1080, 1080);
		C.rotate(-9*π/10 + (frame%3600)/1800*π);
		C.translate(-1080, -1080);
		C.drawImage(minute, 0, 0);
		C.restore();

		C.save();
		C.translate(1080, 1080);
		C.rotate(-12*π/30 + (frame%60)/30*π);
		C.translate(-1080, -1080);
		C.drawImage(second, 0, 0);
		C.restore();

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

// Wait for 3 seconds so the images load (probably overkill, but whatever)
console.log("Loading Images")
Promise.all([
	loadImage("assets/face.svg").then((image) => {
		face = image
	}),
	loadImage("assets/hour.svg").then((image) => {
		hour = image
	}),
	loadImage("assets/minute.svg").then((image) => {
		minute = image
	}),
	loadImage("assets/second.svg").then((image) => {
		second = image
	})
]).then(async () => {
	console.time("Total time")
	for await (const name of createFrames(43201)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
})