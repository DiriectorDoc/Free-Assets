const { createCanvas } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

const coords = [[1,1],[1,-1],[-1,-1],[-1,1]];

let frame = 0;

function mulberry32(a) {
	return function() {
		let t = a += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
}

const getRand = mulberry32(6969696969);

class Confetto {
	θ = getRand()*π*2;
	offsets = Array(4).fill(0).map(e => [getRand()/2 - .5/3, getRand()/2 - .5/3]);
	offsets2 = Array(4).fill(0).map(e => [getRand()/2 - .5/3, getRand()/2 - .5/3]);
	size = getRand()*7+5;
	fillStyle = `hsl(${getRand()*360} 100% 50%)`;
	rc = (getRand()*3 + 1)*2;
	ix = getRand()*4096 * this.rc;
	iy = 2160 * this.rc*3;
	ex = this.ix + (600*getRand() - 1200)*this.rc;
	fc = 1;
	fo = getRand()*3600;
	pc = Math.round(getRand()*2 + 2.5);
	po = getRand()*2*π;

	get x(){
		return (((frame + this.fo)*this.fc)%3600)/3600 * this.ex + this.ix
	}
	get y(){
		return (((frame + this.fo)*this.fc)%3600 - 600)/3600 * this.iy
	}

	draw(period){
		C.beginPath()
		C.fillStyle = this.fillStyle;
		coords.forEach((e, i) => {
			let {θ, offsets, offsets2, size, pc} = this,

				p = pc*period + this.po,

				x = e[0] + offsets[i][0],
				y = e[1] + offsets[i][1],
				newx = x*Math.cos(θ) - y*Math.sin(θ),
				newy = x*Math.sin(θ) + y*Math.cos(θ),

				transposed = [Math.cos(p)*newx + offsets2[i][0], Math.sin(p + π*(x+1)/2)/5 * newy + newy + offsets2[i][1]];
			C.lineTo((transposed[0]*Math.cos(θ) - transposed[1]*Math.sin(θ))*size + this.x, (transposed[0]*Math.sin(θ) + transposed[1]*Math.cos(θ))*size + this.y)
		})
		C.closePath()
		C.fill()
	}
}

const confetti = Array(16000).fill(0).map(_ => new Confetto).sort((a, b) => a.size - b.size);

async function* createFrames(frames){
	for(let f = 0; f < frames; f++){
		frame = f;
		let name = `b${f < 1000 ? "0" : ""}${f < 100 ? "0" : ""}${f < 10 ? "0" : ""}${f}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		// C.clearRect(0, 0, 4096, 2160)

		C.fillStyle = "black";
		C.fillRect(0, 0, 4096, 2160)

		let p = f*π/120;

		for(let c of confetti){
			c.draw(p)
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

(async () => {
	console.time("Total time")
	for await (const name of createFrames(3601)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
})()