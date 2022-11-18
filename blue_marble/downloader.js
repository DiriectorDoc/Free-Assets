const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

function drawSlice(x, y){
	let w = Math.sqrt(1e6 - (y - 1000)**2);
	if(x <= 2000)
		C.drawImage(marble, x*6, y*6, 12000, 6, 2048-w, y+80, w*2, 1);
	else {
		let diff = x-2000;
		C.drawImage(marble, x*6, y*6, 6*(2000-diff), 6, 2048-w, y+80, (2000-diff)*w/1000 + 1, 1);
		C.drawImage(marble, 0, y*6, 6*diff, 6, 2048+w - w*diff/1000 - 1, y+80, w*diff/1000 + 1, 1);
	}
}

let marble, darkness, smogDark, smog, stars, stars2, blue;

const d = 23.4 * π / 180;

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		let name = `${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.drawImage(smog, 0, -frame*4320/4000%2160)
		C.drawImage(smogDark, 0, 0)
		C.drawImage(stars2, 0, 0)
		C.drawImage(stars, 0, 0)
		C.drawImage(darkness, 0, 0)
		C.drawImage(blue, 0, 0)

		for(let i = 0; i < 2000; i++){
			drawSlice(frame, i)
		}

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
	loadImage("assets/Whole_world_-_land_and_oceans_12000.jpg").then((image) => {
		marble = image
	}),
	loadImage("assets/darkness.png").then((image) => {
		darkness = image
	}),
	loadImage("assets/smog darkness.png").then((image) => {
		smogDark = image
	}),
	loadImage("assets/smog.png").then((image) => {
		smog = image
	}),
	loadImage("assets/stars-rounded.png").then((image) => {
		stars = image
	}),
	loadImage("assets/stars-rounded2.png").then((image) => {
		stars2 = image
	}),
	loadImage("assets/subtle blue.png").then((image) => {
		blue = image
	})
]).then(async () => {
	console.time("Total time")
	for await (const name of createFrames(4000)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
}, 3000)