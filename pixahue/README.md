# PixaHue
## Animation Information

This animation was crated using frames extracted from the animation found at [index.html](./index.html), and rendered using [downloader.js](./downloader.js) and Node.js.

The unprocessed frames (along with the tools used to process the frames) can be found in [these .rar files](./pixahue%20-%20raw%20frames). (WARNING: Extracting all frames takes up about 600 MB of space).

When replayed, this animation makes a seamless loop.

| | |
|---|---|
| # Frames | 7200 |
| FPS | 60 |
| Length | 2m |
| Dimentions | 4096 × 2160 (DCI 4K) |
| Aspect ratio | 256:135 |

## File Comparison

|                  | PNGs as Matrostka | H.264 + RGB                      | H.264                 | VP9                |
|------------------|-------------------|----------------------------------|-----------------------|--------------------|
| Compression loss | None (lossless)   | None                             | (see note*)           | Noticable          |
| Portablility     | Low               | unknown                          | High                  | High               |
| Size             | 643.72 MiB        | 2.32 GiB                         | 1.32 GiB              | 1.63 GiB           |
| File name        | [pixahue - libpng.mkv](./pixahue%20-%20libpng.rar) | [pixahue - libx264rgb.mkv](./pixahue%20-%20libx264rgb) | [pixahue - libx264.mp4](./pixahue%20-%20libx264) | [pixahue - libvpx-vp9.webm](./pixahue%20-%20libvpx-vp9) |
| pix_fmt          | rgb24             | gbrp                             | yuv420p               | yuv420p            |
| Notes            | Highest quality   | Quality == libpng.mkv (probably) | Highest compatibility | As seen on YouTube |

\* All the individual frames of this this .mp4 file are properly renderd, contain no errors, and were checkedfor validity; though this file tends to break when viewed in most players.

## Example

The following is a downscaled example of the animated background.

![PixaHue](pixahue%20-%20example.gif)