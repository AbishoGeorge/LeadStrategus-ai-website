"""Builds the web logo files in public/brand/ from the JPG sources in assets-src/brand/.

Run:  python3 scripts/make-brand.py   (needs Pillow + numpy)

TODO: these are cut out of JPGs. Replace them with the official SVG logo files
when LeadStrategus supplies them (then add public/brand/*.svg and favicon.svg).

What it does, without redrawing or recolouring the artwork:
- removes the white background (flood fill from the edges, so white areas
  *inside* the shield stay white), with a soft 2px edge so it sits cleanly on
  white, silver and tinted sections
- turns the black wordmark/tagline into black-on-transparent
- composes the horizontal logo from the official stacked logo's shield and
  wordmark, side by side, with a gap of 25% of the shield height
- exports masters plus @1x/@2x PNG + WebP, favicons and app icons
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src" / "brand"
OUT = ROOT / "public" / "brand"
IMG = ROOT / "public" / "img"
OUT.mkdir(parents=True, exist_ok=True)


def cut_shield(im: Image.Image, thresh=244) -> Image.Image:
    """Transparent background for artwork enclosed by a dark outline."""
    rgb = im.convert("RGB")
    a = np.asarray(rgb).astype(np.float32)
    light = (a.min(axis=2) >= thresh).astype(np.uint8) * 255
    m = Image.fromarray(light, "L").copy()  # copy: floodfill needs a writable image
    w, h = m.size
    for xy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        if m.getpixel(xy) == 255:
            ImageDraw.floodfill(m, xy, 128)
    bg = np.asarray(m) == 128
    # 2px band next to the background: un-blend from white for a soft edge
    near = np.asarray(Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
    band = near & ~bg
    alpha = np.ones(bg.shape, np.float32)
    alpha[bg] = 0
    mn = a.min(axis=2)
    alpha[band] = np.clip((255 - mn[band]) / (255 - 150), 0, 1)
    out = a.copy()
    sel = band & (alpha > 0)
    for c in range(3):
        ch = out[..., c]
        ch[sel] = np.clip((ch[sel] - (1 - alpha[sel]) * 255) / alpha[sel], 0, 255)
    rgba = np.dstack([out, alpha * 255]).astype(np.uint8)
    return trim(Image.fromarray(rgba, "RGBA"))


def cut_text(im: Image.Image) -> Image.Image:
    """Dark text on white → same text on transparent (alpha from darkness)."""
    a = np.asarray(im.convert("RGB")).astype(np.float32)
    lum = a.mean(axis=2)
    alpha = np.clip((250 - lum) / (250 - 40), 0, 1)
    out = np.zeros_like(a)
    nz = alpha > 0
    for c in range(3):
        ch = out[..., c]
        ch[nz] = np.clip((a[..., c][nz] - (1 - alpha[nz]) * 255) / alpha[nz], 0, 255)
    rgba = np.dstack([out, alpha * 255]).astype(np.uint8)
    return trim(Image.fromarray(rgba, "RGBA"))


def trim(im: Image.Image, pad=2) -> Image.Image:
    bbox = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    x0, y0, x1, y1 = bbox
    return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))


def save_set(im: Image.Image, name: str, h1: int):
    im.save(OUT / f"{name}.png", optimize=True)
    for scale in (1, 2):
        h = h1 * scale
        w = round(im.width * h / im.height)
        r = im.resize((w, h), Image.LANCZOS)
        r.save(OUT / f"{name}@{scale}x.png", optimize=True)
        r.save(OUT / f"{name}@{scale}x.webp", quality=90, method=6)
    print(f"{name}: master {im.size}, @1x {round(im.width * h1 / im.height)}x{h1}")


# 1. Shield icon: taken from the official full logo, whose silver rim closes the
#    outline (the flat 1024px icon can't be cut out: its white visor touches the
#    background through the top notch)
stk = Image.open(SRC / "logo-stacked-source.jpg").convert("RGB")
s_shield = cut_shield(stk.crop((200, 410, 640, 910)))
shield = s_shield
save_set(shield, "leadstrategus-shield", 36)

# 2. Stacked logo (official full logo: shield over wordmark and tagline)
s_word = cut_text(stk.crop((110, 912, 725, 982)))
s_tag = cut_text(stk.crop((190, 984, 640, 1034)))


def stack(parts, gaps):
    W = max(p.width for p in parts)
    H = sum(p.height for p in parts) + sum(gaps)
    c = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    y = 0
    for i, p in enumerate(parts):
        c.alpha_composite(p, ((W - p.width) // 2, y))
        y += p.height + (gaps[i] if i < len(gaps) else 0)
    return c


stacked = stack([s_shield, s_word, s_tag], [26, 14])
save_set(stacked, "leadstrategus-logo-stacked", 200)

# 3. Horizontal logo: same shield + wordmark block, side by side
text_block = stack([s_word, s_tag], [14])
sh_h = round(text_block.height / 0.55)
sh = s_shield.resize((round(s_shield.width * sh_h / s_shield.height), sh_h), Image.LANCZOS)
gap = round(sh_h * 0.25)
hz = Image.new("RGBA", (sh.width + gap + text_block.width, sh_h), (0, 0, 0, 0))
hz.alpha_composite(sh, (0, 0))
hz.alpha_composite(text_block, (sh.width + gap, (sh_h - text_block.height) // 2))
save_set(hz, "leadstrategus-logo-horizontal", 56)

# 4. Favicons and app icons from the shield
def square(im, size, pad_ratio, bg=None):
    c = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    inner = round(size * (1 - 2 * pad_ratio))
    s = im.copy()
    s.thumbnail((inner, inner), Image.LANCZOS)
    c.alpha_composite(s, ((size - s.width) // 2, (size - s.height) // 2))
    return c

IMG.mkdir(exist_ok=True)
square(shield, 48, 0.02).save(IMG / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
square(shield, 32, 0.02).save(IMG / "favicon-32.png", optimize=True)
square(shield, 180, 0.12, (255, 255, 255, 255)).convert("RGB").save(IMG / "apple-touch-icon.png", optimize=True)
square(shield, 192, 0.10, (255, 255, 255, 255)).save(IMG / "icon-192.png", optimize=True)
square(shield, 512, 0.10, (255, 255, 255, 255)).save(IMG / "icon-512.png", optimize=True)
print("favicons + app icons done")
