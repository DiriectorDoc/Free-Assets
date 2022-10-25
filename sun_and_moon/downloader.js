const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')

const canvas = createCanvas(4096, 2160);
const C = canvas.getContext("2d");

const π = Math.PI;

const p = 1200;

let NIGHT;
loadImage("pexels-francesco-ungaro-998641.jpg").then((image) => {
	NIGHT = image
})
let MOON;
loadImage("Weather_icon_-_full_moon.svg").then((image) => {
	MOON = image
})

const groundPath = new Array(410).fill(0).map((e, i) => -(1097*i**3)/20480000 + (66007*i**2)/2048000 - (203523*i)/40960 + 8545625/4096 + Math.random()*10|0);

const sky = C.createLinearGradient(2048, 0, 2048, 2160);
sky.addColorStop(0, `rgb(71, 122, 191)`);
sky.addColorStop(1, `rgb(192, 218, 235`);

async function* createFrames(frames){
	for(let frame = 0; frame < frames; frame++){
		console.log(`Drawing frame ${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`)

		const sx = Math.cos(π*(frame + p)/p)*1548 + 2048,
			sy = Math.sin(π*(frame + p)/p)*1548 + 2048,
			
			mx = Math.cos(π*frame/p)*1548 + 2048,
			my = Math.sin(π*frame/p)*1548 + 2048,
			
			skya = (1 - Math.sin(π*frame/p)*3)/2;


		const gradient = C.createRadialGradient(sx, sy, 250, sx, sy, 500);

		// Add three color stops
		gradient.addColorStop(0, "white");
		gradient.addColorStop(.1, "rgba(255, 255, 0, .25)");
		gradient.addColorStop(1, "rgba(255, 255, 0, 0)");

		C.fillStyle = sky;
		C.fillRect(0, 0, 4096, 2160)
		C.fillStyle = `rgba(179, 101, 0, ${Math.max((1 - 3*Math.sin(π*frame/p)**3)/2, 0)})`;
		C.fillRect(0, 0, 4096, 2160)
		C.globalAlpha = Math.max(skya, 0);
		C.drawImage(NIGHT, 0, 0)
		C.globalAlpha = 1;

		C.fillStyle = gradient;
		C.fillRect(sx-500, sy-500, 1000, 1000);
		C.fill();

		C.drawImage(MOON, mx-250, my-250, 500, 500)
		C.fillStyle = "rgba(255, 187, 0, .2)";
		C.beginPath();
		C.arc(mx, my, 250, 0, π*2, false);
		C.fill();

		const l = (60*(Math.sin(π*frame/p) + Math.sin(3*π*frame/p)/3 + Math.sin(5*π*frame/p)/5 + Math.sin(7*π*frame/p)/7 + Math.sin(9*π*frame/p)/9))/π + 25 -4*(skya+1);

		C.fillStyle = `hsl(121, 60%, ${l}%)`;

		const grad = C.createLinearGradient(2048, 1858, 2048, 2160);
		grad.addColorStop(0, `hsl(121, 60%, ${l+20}%)`);
		grad.addColorStop(0.30, `hsl(121, 60%, ${l+10}%)`);
		grad.addColorStop(0.70, `hsl(121, 60%, ${l}%)`);
		grad.addColorStop(1, `hsl(121, 60%, ${l-20}%)`);

		C.beginPath();
		C.moveTo(0, groundPath[0]);
		for(let x = 10; x < 4096; x += 10){
			C.lineTo(x, groundPath[x/10]);
		}
		C.lineTo(4100, 2164)
		C.lineTo(-6, 2164)
		C.lineTo(0, groundPath[0]);
		C.fillStyle = grad;
		C.fill()

		await new Promise(resolve => {
			const out = fs.createWriteStream(`${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`)
			const stream = canvas.createPNGStream()
			stream.pipe(out)
			out.on('finish', resolve)
		})

		yield `${frame < 1000 ? "0" : ""}${frame < 100 ? "0" : ""}${frame < 10 ? "0" : ""}${frame}.png`
	}
}

// Wait for 3 seconds so the images load
console.log("Standby for 3")
setTimeout(async () => {
	for await (const name of createFrames(2400)) {
		console.log(`Frame ${name} created`);
	}
}, 3000)