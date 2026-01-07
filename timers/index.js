const fs = require("fs");

let i = 0;

for(let s = 0; s < 100; s++){
    for(let ms = 0; ms < 120; ms++){
        console.log(`p${`${i}`.padStart(5, 0)}.svg`)
        fs.writeFileSync(`svgs/p${`${i}`.padStart(5, 0)}.svg`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="1920"
   height="1080"
   viewBox="0 0 1920 1080"
   version="1.1"
   id="svg1"
   inkscape:version="1.4.2 (f4327f4, 2025-05-13)"
   sodipodi:docname="seconds.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1">
    <text
       xml:space="preserve"
       style="font-size:558.175px;font-family:Arial;-inkscape-font-specification:Arial;text-align:center;writing-mode:lr-tb;direction:ltr;text-anchor:middle;fill:#ffffff;fill-opacity:1;stroke-width:40.0003;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:stroke fill markers"
       x="963.4068"
       y="673.95654"
       id="text1"><tspan
         sodipodi:role="line"
         id="tspan1"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-family:Consolas;-inkscape-font-specification:Consolas;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:40.0003;stroke-dasharray:none;stroke-opacity:1"
         x="963.40686"
         y="673.95654">${`${s}`.padStart(2, 0)},${(ms/120).toFixed(3).substring(2)}</tspan></text>
  </g>
</svg>`)
        i++
    }
}

i = 0;

for(let m = 0; m < 100; m++)for(let s = 0; s < 60; s++){
    for(let ms = 0; ms < 120; ms++){
        console.log(`m${`${i}`.padStart(6, 0)}.svg`)
        fs.writeFileSync(`svgs/m${`${i}`.padStart(6, 0)}.svg`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="1920"
   height="1080"
   viewBox="0 0 1920 1080"
   version="1.1"
   id="svg1"
   inkscape:version="1.4.2 (f4327f4, 2025-05-13)"
   sodipodi:docname="minutes.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1">
    <text
       xml:space="preserve"
       style="font-size:370.579px;font-family:Arial;-inkscape-font-specification:Arial;text-align:center;writing-mode:lr-tb;direction:ltr;text-anchor:middle;fill:#ffffff;fill-opacity:1;stroke-width:26.9999;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:stroke fill markers"
       x="962.26184"
       y="628.93536"
       id="text1"><tspan
         sodipodi:role="line"
         id="tspan1"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-family:Consolas;-inkscape-font-specification:Consolas;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:26.9999;stroke-dasharray:none;stroke-opacity:1"
         x="962.26184"
         y="628.93536">${`${m}`.padStart(2, 0)}:${`${s}`.padStart(2, 0)},${(ms/120).toFixed(3).substring(2)}</tspan></text>
  </g>
</svg>
`)
        i++
    }
}