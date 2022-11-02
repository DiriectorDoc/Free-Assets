# Mondrian Rectangles
## Animation Information

This animation is an adaptation of [Composition A by Piet Mondrian](https://commons.wikimedia.org/wiki/File:Composition_A_by_Piet_Mondrian_Galleria_Nazionale_d%27Arte_Moderna_e_Contemporanea.jpg), which is in the public domain.

This animation was crated using frames extracted from the animation found at [index.html](./index.html), and rendered using [downloader.js](./downloader.js) and Node.js

When replayed, this animation makes a seamless loop.

| | |
|---|---|
| # Frames | 300 |
| FPS | 60 |
| Length | 5s |
| Dimentions | 4096 × 2160 (DCI 4K) |
| Aspect ratio | 256:135 |

## File Comparison

|                  | PNGs as Matrostka | H.264 + RGB     | H.264                 | VP9                |
|------------------|-------------------|-----------------|-----------------------|--------------------|
| Compression loss | None (lossless)   | None            | Miniscule             | Noticable          |
| Portablility     | Low               | unknown         | High                  | High               |
| Size             | 8.67 MiB          | 492 KiB         | 489 KiB               | 2.25 MiB           |
| File name        | [mondrian rectangles - libpng.mkv](./mondrian%20rectangles%20-%20libpng.mkv) | [mondrian rectangles - libx264rgb.mkv](mondrian%20rectangles%20-%20libx264rgb.mkv) | [mondrian rectangles - libx264.mp4](./mondrian%20rectangles%20-%20libx264.mp4) | [mondrian rectangles - libvpx-vp9.webm](./mondrian%20rectangles%20-%20libvpx-vp9.webm) |
| pix_fmt          | rgb24             | gbrp            | yuv420p               | yuv420p            |
| Notes            | Highest quality   | Correct colours | Highest compatibility | As seen on YouTube |

## Example

The following is a downscaled example of the animated background.

![Mondrian Rectangles](mondrian%20rectangles%20-%20example.gif)