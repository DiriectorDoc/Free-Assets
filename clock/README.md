# Clock
## Animation Information

This animation was crated using frames extracted from the animation found at [downloader.js](./downloader.js) and Node.js (WARNING: Rendering all frames takes up about 11 GB of space).

### Transparent - segments

| | |
|---|---|
| # Frames | 3600 |
| FPS | 1 |
| Length | 1h |
| Dimentions | 2160 × 2160 (technically 4K) |
| Aspect ratio | 1:1 |

### Transparent - full

When replayed, this animation makes a seamless loop.

| | |
|---|---|
| # Frames | 43200 |
| FPS | 1 |
| Length | 12h |
| Dimentions | 2160 × 2160 (technically 4K) |
| Aspect ratio | 1:1 |

### Greenscreen - segments

| | |
|---|---|
| # Frames | 36000 |
| FPS | 10 |
| Length | 1h |
| Dimentions | 4096 × 2160 (DCI 4K) |
| Aspect ratio | 256:135 |

### Greenscreen - full

When replayed, this animation makes a seamless loop.

| | |
|---|---|
| # Frames | 432000 |
| FPS | 10 |
| Length | 12h |
| Dimentions | 4096 × 2160 (DCI 4K) |
| Aspect ratio | 256:135 |

## File Comparison

|                  | H.264 (greenscreen)   | VP9 (transparent)  |
|------------------|-----------------------|--------------------|
| Compression loss | N/A                   | N/A                |
| Portablility     | High                  | Medium             |
| Size (segements) | ~53 MiB each          | ~27 MiB each       |
| Size (full)      | 637 MiB               | 324 MiB            |
| File name        | [clock - greenscreen](./clock%20-%20greenscreen) | [clock - transparent](./clock%20-%20transparent/) |
| pix_fmt          | yuv420p               | yuva420p           |
| Notes            | As seen on YouTube    | Best Quality       |

## Example

The following is a downscaled example of the animated background.

![Clock](clock%20-%20example.webp)