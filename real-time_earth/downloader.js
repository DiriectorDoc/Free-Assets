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

let marble, stars;

const grd = C.createLinearGradient(2002.1122687158008, 1099.857394531739, 2093.887731284199, 1060.142605468261);
grd.addColorStop(0, "rgba(0, 0, 0, 0.9)");
grd.addColorStop(1, "rgba(0, 0, 0, 0)");

C.fillStyle = grd;

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		let name = `${frame < 10000 ? "0" : ""}${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.drawImage(stars, 0, 0)

		for(let i = 0; i < 2000; i++){
			drawSlice(frame/21.6, i)
		}

		C.arc(2048, 1080, 1000, 0, π*2)
		C.fill()

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
	loadImage("assets/Stars_in_the_sky_(TK1).png").then((image) => {
		stars = image
	})
]).then(async () => {
	console.time("Total time")
	for await (const name of createFrames(86400)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
}, 3000)