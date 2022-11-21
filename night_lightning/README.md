# Purple Rectangles
## Animation Information

This animation was crated using frames extracted from the animation found at [index.html](./index.html). The uncompressed frames can be found in the included .rar file (WARNING: Extracting all frames takes up about 200 MB of space).

When replayed, this animation makes a seamless loop.

| | |
|---|---|
| # Frames | 864 |
| FPS | 60 |
| Length | ~14.38s |
| Dimentions | 4096 × 2160 (DCI 4K) |
| Aspect ratio | 256:135 |

## File Comparison

|                  | PNGs as Matrostka | H.264 + RGB                      | H.264                    | VP9                |
|------------------|-------------------|----------------------------------|--------------------------|--------------------|
| Compression loss | None (lossless)   | unknown                          | Miniscule                | Negligible         |
| Portablility     | Low               | unknown                          | High                     | High               |
| Size             | 208.44 MiB        | 17.54 MiB                        | 16.67 MiB                | 15.46 MiB          |
| File name        | [night lightning - libpng.mkv](./night%20lightning%20-%20libpng.rar) | [night lightning - libx264rgb.mkv](night%20lightning%20-%20libx264rgb.mkv) | [night lightning - libx264.mp4](./night%20lightning%20-%20libx264.mp4) | [night lightning - libvpx-vp9.webm](./night%20lightning%20-%20libvpx-vp9.webm) |
| pix_fmt          | rgb24             | gbrp                             | yuv420p                  | yuv420p            |
| Notes            | Highest quality   | Quality == libpng.mkv (probably) | See Note [\[1\]](#Notes) | As seen on YouTube |

## Example

The following is a downscaled example of the animated background.

![Night Lightning](night%20lightning%20-%20example.webp)

## Notes

\[1\] This file may not play correctly on all agents, but this is in fact a valid MPEG with no errors.