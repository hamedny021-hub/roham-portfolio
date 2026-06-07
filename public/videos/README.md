# /public/videos/

## 📹 Place your hero video files here.

### Required files:
- `hero.mp4`   — H.264 encoded, primary format
- `hero.webm`  — VP9 encoded, for better Chrome/Firefox performance

### Optional:
- `hero-poster.jpg` — Still frame shown before video loads (move to /public/images/)

### Export settings (recommended):
| Setting     | Value                    |
|-------------|--------------------------|
| Resolution  | 1920×1080 (minimum)      |
| Frame rate  | 24 or 30 fps             |
| Bitrate     | 4–8 Mbps (1080p)         |
| Codec MP4   | H.264, AAC audio (muted) |
| Codec WebM  | VP9                      |
| Duration    | Any — video loops        |

The <video> tag in HeroSection.tsx points to:
  <source src="/videos/hero.webm" type="video/webm" />
  <source src="/videos/hero.mp4"  type="video/mp4"  />

WebM is listed first so modern browsers prefer it (smaller file).
MP4 is the fallback for Safari/iOS.
