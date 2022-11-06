# Screensaver
## Animation Information

This animation was crated using frames extracted from the animation found at [index.html](./index.html), and rendered using [downloader.js](./downloader.js) and Node.js.

The unprocessed frames (along with the tools used to process the frames) can be found in [these .rar files](./screensaver%20-%20raw%20frames).

When replayed, this animation makes a seamless loop.

| | |
|---|---|
| # Frames | 1200 |
| FPS | 60 |
| Length | 20s |
| Dimentions | 4096 × 2160 (DCI 4K) |
| Aspect ratio | 256:135 |

## File Comparison

|                  | PNGs as Matrostka | H.264 + RGB            | H.264                 | VP9                |
|------------------|-------------------|------------------------|-----------------------|--------------------|
| Compression loss | None (lossless)   | None                   | Miniscule             | Noticable          |
| Portablility     | Low               | unknown                | High                  | High               |
| Size             | 672.05 MiB        | 8.44 MiB               | 11.93 MiB             | 12.01 MiB          |
| File name        | [screensaver - libpng.mkv](./screensaver%20-%20libpng) | [screensaver - libx264rgb.mkv](screensaver%20-%20libx264rgb.md) | [screensaver - libpng.mkv](screensaver%20-%20libx264.mp4) | [screensaver - libvpx-vp9.webm](screensaver%20-%20libvpx-vp9.md) |
| pix_fmt          | rgb24             | gbrp                   | yuv420p               | yuv420p            |
| Notes            | Highest quality   | Very low compatibility | Highest compatibility | As seen on YouTube |

## Example

The following is a downscaled example of the animated background.

![Screensaver](screensaver%20-%20example.gif)