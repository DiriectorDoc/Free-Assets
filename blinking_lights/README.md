# Blinking Lights
## Animation Information

This animation was crated using frames extracted from the animation found at [index.html](./index.html). The unprocessed frames (along with the tools used to process the frames) can be found in the included .rar file.

When replayed, this animation makes a seamless loop.

| | |
|---|---|
| # Frames | 240 |
| FPS | 60 |
| Length | 4s |
| Dimentions | 4096 × 2160 (DCI 4K) |
| Aspect ratio | 256:135 |

## File Comparison

|                  | PNGs as Matrostka | H.264 + RGB       | VP9                |
|------------------|-------------------|-------------------|--------------------|
| Compression loss | None (lossless)   | Low               | Noticeable         |
| Portablility     | Low               | unknown           | High               |
| Size             | 609.87 MiB        | 358.86 MiB        | 278.28 MiB         |
| File name        | [blinking lights - libpng.mkv](blinking%20lights%20-%20libpng.md) | [blinking lights - libx264rgb.mkv](blinking%20lights%20-%20libx264rgb.md) | [blinking lights - libvpx-vp9.webm](blinking%20lights%20-%20libvpx-vp9.md) |
| pix_fmt          | rgb24             | gbrp              | yuv420p            |
| Notes            | Highest quality   | Low compatibility | As seen on YouTube |

The first 20 frames of libpng.mkv are loslessly compresses as much as possible (2.25 MB per frame). However, compressing these twenty frames took hours. Compressing all 240 would take days. I didn't have that patience. So for the remaining 220 frame, I losslessly compressed them using a faster, yet still decent, compression method (2.5 MB per frame).

## Example

The following is a downscaled example of the animated background.

![Blinking Lights](blinking%20lights%20-%20example.gif)