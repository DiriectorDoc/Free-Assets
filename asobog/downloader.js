const { createCanvas } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(3840, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

const coords = [[1136,704],[1808,436],[2616,684],[2860,1148],[2336,1408],[1500,1468],[980,1096]];

class Square {
	c = [200, 200];
	s = 200;
	ro = Math.random()*360;
	rs = Math.ceil(Math.random()*4);

	d1 = [1920 + (Math.random()*400 - 200), 1080 + (Math.random()*900 - 550)];
	d2 = [100 + Math.random()*100, 1080 + (Math.random()*500 - 250)];

	fo = Math.random()*720;
	fd = Math.ceil(Math.random()*3);

	constructor(type){
		if(this.rs >= 3) this.rs -= 5;
		if(type) this.d2[0] = 3840 - this.d2[0];
	}

	draw(f){
		f /= this.fd;
		this.c = [this.d1[0]-((f + this.fo)%120+1)*(this.d1[0] - this.d2[0])/120, this.d1[1]-((f + this.fo)%120+1)*(this.d1[1] - this.d2[1])/120];
		const r = ((f + this.ro)*this.rs)//%360;

		const a = (f + this.fo)*π/60 - 1.1082215;
		this.s = 211.322442733553*((7 * Math.sin(a))/16 + 7/64 * Math.sin(2 * a) + 1/48 * Math.sin(3 * a) + 1/512 * Math.sin(4 * a) + 0.473210505739258)

		C.beginPath()
		C.moveTo(...Square.f(this.c[0]-this.s/2, this.c[1]-this.s/2, r, ...this.c))
		C.lineTo(...Square.f(this.c[0]+this.s/2, this.c[1]-this.s/2, r, ...this.c))
		C.lineTo(...Square.f(this.c[0]+this.s/2, this.c[1]+this.s/2, r, ...this.c))
		C.lineTo(...Square.f(this.c[0]-this.s/2, this.c[1]+this.s/2, r, ...this.c))
		C.closePath()
		C.fill()
	}

	static f(x2, y2, degrees, x1, y1){
		const rad = degrees * Math.PI / 180;
		return [
			(x2 - x1) * Math.cos(rad) + x1 - (y2 - y1) * Math.sin(rad),
			(x2 - x1) * Math.sin(rad) + y1 + (y2 - y1) * Math.cos(rad)
		]
	}
}

const sqrs = Array(300).fill(0).map((_, i) => new Square(i % 2));

C.fillStyle = "white";

async function* createFrames(frames){
	// starting at 100 to prevent any errors that may arrise when subtracting from 0
	for(let frame = 100; frame < frames + 100; frame++){
		let name = `${(frame - 100) < 1000 ? "0" : ""}${(frame - 100) < 100 ? "0" : ""}${(frame - 100) < 10 ? "0" : ""}${frame - 100}.png`;
		console.log(`Drawing frame ${name}`)

		console.time(name)
		/* PUT DRAWING INFO BELOW */

		C.clearRect(0, 0, 3840, 2160)

		C.beginPath()
		C.fillStyle = "cyan";
		sqrs.forEach(e => e.draw(frame + 30))
		coords.forEach((e, i) => {
			if(i){
				C.lineTo(e[0] + (i % 3 ? Math[(i + 1) % 3 == 1 ? "sin" : "cos"]((frame + 30)*π/120*(i % 2 ? 1 : -1)) : 0)*40, e[1] + ((i + 1) % 3 ? Math[(i + 1) % 3 == 1 ? "cos" : "sin"]((frame + 30)*π/120) : 0)*40)
			} else {
				C.moveTo(e[0] + ((i + 2) % 3 ? Math[i % 3 == 1 ? "sin" : "cos"]((frame + 30)*π/120) : 0)*40, e[1] + (i % 3 ? Math[i % 3 == 1 ? "cos" : "sin"]((frame + 30)*π/120*(i % 2 ? 1 : -1)) : 0)*40)
			}
		})
		C.closePath()
		C.fill()

		C.beginPath()
		C.fillStyle = "magenta";
		sqrs.forEach(e => e.draw(frame - 30))
		coords.forEach((e, i) => {
			if(i){
				C.lineTo(e[0] + (i % 3 ? Math[(i + 1) % 3 == 1 ? "sin" : "cos"]((frame - 30)*π/120*(i % 2 ? 1 : -1)) : 0)*40, e[1] + ((i + 1) % 3 ? Math[(i + 1) % 3 == 1 ? "cos" : "sin"]((frame - 30)*π/120) : 0)*40)
			} else {
				C.moveTo(e[0] + ((i + 2) % 3 ? Math[i % 3 == 1 ? "sin" : "cos"]((frame - 30)*π/120) : 0)*40, e[1] + (i % 3 ? Math[i % 3 == 1 ? "cos" : "sin"]((frame - 30)*π/120*(i % 2 ? 1 : -1)) : 0)*40)
			}
		})
		C.closePath()
		C.fill()

		C.beginPath()
		C.fillStyle = "white";
		sqrs.forEach(e => e.draw(frame))
		coords.forEach((e, i) => {
			if(i){
				C.lineTo(e[0] + (i % 3 ? Math[(i + 1) % 3 == 1 ? "sin" : "cos"](frame*π/120*(i % 2 ? 1 : -1)) : 0)*40, e[1] + ((i + 1) % 3 ? Math[(i + 1) % 3 == 1 ? "cos" : "sin"](frame*π/120) : 0)*40)
			} else {
				C.moveTo(e[0] + ((i + 2) % 3 ? Math[i % 3 == 1 ? "sin" : "cos"](frame*π/120) : 0)*40, e[1] + (i % 3 ? Math[i % 3 == 1 ? "cos" : "sin"](frame*π/120*(i % 2 ? 1 : -1)) : 0)*40)
			}
		})
		C.closePath()
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

(async () => {
	console.time("Total time")
	for await (const name of createFrames(2161)) {
		console.log("Frame created")
		console.timeEnd(name)
	}
	console.timeEnd("Total time")
})()