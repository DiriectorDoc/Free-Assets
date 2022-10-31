(async function(){const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

class Body {
	d;
	wC;
	hC;
	img;
	r;
	o;
	p = Math.random();
	order;
	id;

	constructor(d, wc, hc, img, r, o, id){
		this.d = d;
		this.wC = wc;
		this.hC = hc;
		this.img = img;
		this.r = r;
		this.o = o;
		this.p *= o*120;
		this.id = id;
	}

	draw(f){
		//f-=this.id*4;
		C.drawImage(this.img, (4096 - (this.d*this.wC + 2*this.r)*Math.sin(π*(f + this.p)/(90*this.o)) - this.d*this.wC)/2, 1080 - this.d*this.hC/2 - 135*this.r*Math.cos(π*(f + this.p)/(90*this.o))/256, this.d*this.wC, this.d*this.hC)
	}
}

const sun = {
	base: await loadImage("assets/base.png"),
	draw(f){
		C.drawImage(sun.base, 1798, 830)
		C.globalAlpha = sun.f(f);
		C.drawImage(sun.l1, 1798, 830)
		C.globalAlpha = sun.f(f - 180)**2;
		C.drawImage(sun.l2, 1798, 830)
		C.globalAlpha = 1 - sun.f(f)**2;
		C.drawImage(sun.l3, 1798, 830)
		C.globalAlpha = 1 - sun.f(f - 360);
		C.drawImage(sun.l4, 1798, 830)
		C.globalAlpha = sun.f(-5*f - 180);
		C.drawImage(sun.l5, 1798, 830)
		C.globalAlpha = 1 - sun.f(f - 360)**2;
		C.drawImage(sun.l6, 1798, 830)
		C.globalAlpha = 1 - sun.f(f - 180)**2;
		C.drawImage(sun.l7, 1798, 830)
		C.globalAlpha = 1;
	},
	id: 0,
	order: 0,
	l1: await loadImage("assets/1.png"),
	l2: await loadImage("assets/2.png"),
	l3: await loadImage("assets/3.png"),
	l4: await loadImage("assets/4.png"),
	l5: await loadImage("assets/5.png"),
	l6: await loadImage("assets/6.png"),
	l7: await loadImage("assets/7.png"),

	f: (x) => Math.min(Math.max(Math.sin(x*π/360)/2 + .5, 0), 1),
};

const mercury = new Body(39.0352, 1, 1, await loadImage("assets/mercury.svg"), 325, 1, 1),
	venus = new Body(96.832, 1, 1, await loadImage("assets/venus.svg"), 425, 2, 2),
	earth = new Body(101.936, 1, 1, await loadImage("assets/earth.svg"), 575, 3, 3),
	mars = new Body(54.232, 1, 1, await loadImage("assets/mars.svg"), 750, 6, 4),
	jupiter = new Body(279.64, 1, 1, await loadImage("assets/jupiter.svg"), 875, 8, 5),
	saturn = new Body(232.92, 1.85759, 1.38484, await loadImage("assets/saturn.svg"), 1215, 12, 6),
	uranus = new Body(101.448, 1, 1, await loadImage("assets/uranus.svg"), 1680, 16, 7),
	neptune = new Body(98.488, 1, 1, await loadImage("assets/neptune.svg"), 1850, 24, 8);

const bodies = [sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune];

const smog = await loadImage("assets/smog.png")
	smogD = await loadImage("assets/smog darkness.png"),
	blue = await loadImage("assets/subtle blue.png"),
	stars1 = await loadImage("assets/stars-rounded.png"),
	stars2 = await loadImage("assets/stars-rounded2.png"),
	darkness = await loadImage("assets/darkness.png");

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		console.log(`Drawing frame ${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`)

		bodies.forEach((e) => {
			if(e.id != 0) e.order = Math.sign(Math.cos((frame+e.p)*π/90/e.o))*e.id
		})
		bodies.sort((a, b) => {
			return a.order < b.order ? 1 : -1
		})
		
		C.drawImage(smog, 0, -frame%2160)
		C.drawImage(smogD, 0, 0)
		C.drawImage(blue, 0, 0)
		C.globalAlpha = .5;
		C.drawImage(stars1, 0, 0)
		C.drawImage(stars2, 0, 0)
		C.globalAlpha = 1;
		C.drawImage(darkness, 0, 0)

		bodies.forEach(e => {
			e.draw(frame)
		})

		await new Promise(resolve => {
			const out = fs.createWriteStream(`${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`)
			const stream = canvas.createPNGStream()
			stream.pipe(out)
			out.on('finish', resolve)
		})

		yield `${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`
	}
}

for await (const name of createFrames(8640)) {
	console.log(`Frame ${name} created`);
}
})()