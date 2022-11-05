const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

let stars, foreground, overlay;

C.fillStyle = "black";

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		let name = `${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.fillRect(0, 0, 4096, 2160)

		C.save();
		C.translate(2450, 500);
		C.rotate(frame*π/1800);
		C.translate(-2692, -1351);
		C.drawImage(stars, 0, 0);
		C.restore();

		C.drawImage(foreground, 0, 0)
		C.globalAlpha = Math.sin(Math.sin((π*frame)/600)**3 + (1 - 2*Math.sin((π*frame)/1800)**3)*Math.sin((π*frame)/900) + Math.sin((π*frame)/450) + Math.sin((π*frame)/225))/10 + 0.675;
		C.drawImage(overlay, 0, 0)
		C.globalAlpha = 1;

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
	loadImage("Polaris_(star).jpg").then((image) => {
		stars = image
	}),
	loadImage("foreground.png").then((image) => {
		foreground = image
	}),
	loadImage("landscape overlay.png").then((image) => {
		overlay = image
	})
]).then(async () => {
	console.time("Total time")
	for await (const name of createFrames(3600)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
}, 3000)