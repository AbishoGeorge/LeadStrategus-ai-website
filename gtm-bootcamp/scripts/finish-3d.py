"""Crops each scene's layers to one shared box (so they stay aligned), exports
@1x/@2x WebP + PNG, and writes anim.json with positions as % of that box."""
import json
from pathlib import Path
from PIL import Image

out = Path(__file__).resolve().parent.parent / "public" / "img" / "3d"
raw = json.loads((out / "raw-meta.json").read_text())
anim = {}
for scene, layers in raw["scenes"].items():
    ims = {l: Image.open(out / f"raw-{scene}-{l}.png").convert("RGBA") for l in layers}
    box = None
    for im in ims.values():
        b = im.getchannel("A").point(lambda v: 255 if v > 6 else 0).getbbox()
        if b:
            box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
    pad = 30
    x0, y0, x1, y1 = max(0, box[0] - pad), max(0, box[1] - pad - (90 if scene == "stones" else 0)), min(1200, box[2] + pad), min(900, box[3] + pad)
    w, h = x1 - x0, y1 - y0
    w2 = min(w, 1000)
    for l, im in ims.items():
        c = im.crop((x0, y0, x1, y1))
        if scene == "hero":  # each hero object is cropped on its own; they float independently
            bb = im.getchannel("A").point(lambda v: 255 if v > 6 else 0).getbbox()
            c = im.crop((bb[0] - 8, bb[1] - 8, bb[2] + 8, bb[3] + 8))
            cw = min(c.width, 400)
            for s, ww in ((2, cw), (1, cw // 2)):
                r = c.resize((ww, round(c.height * ww / c.width)), Image.LANCZOS)
                r.save(out / f"{scene}-{l}@{s}x.webp", quality=88, method=6)
                r.save(out / f"{scene}-{l}@{s}x.png", optimize=True)
            continue
        for s, ww in ((2, w2), (1, w2 // 2)):
            r = c.resize((ww, round(h * ww / w)), Image.LANCZOS)
            r.save(out / f"{scene}-{l}@{s}x.webp", quality=88, method=6)
            r.save(out / f"{scene}-{l}@{s}x.png", optimize=True)
    m = raw["meta"][scene]
    pct = lambda pt: [round((pt[0] - x0) / w * 100, 2), round((pt[1] - y0) / h * 100, 2)]
    entry = {"w": w2 // 2, "h": round(h * (w2 // 2) / w)}
    if scene == "target":
        entry.update(bull=pct(m["bull"]), tail=pct(m["tail"]))
    if scene == "stones":
        entry.update(tops=[pct(t) for t in m["tops"]], ballBottom=pct(m["ballBottom"]), gates=m["gates"])
    anim[scene] = entry
    print(scene, "box", (w, h), "->", entry["w"], "x", entry["h"])
for f in out.glob("raw-*"):
    f.unlink()
for f in out.glob("pipeline@*"):
    f.unlink()
for f in out.glob("layers@*"):
    f.unlink()
for f in out.glob("target@*"):
    f.unlink()
(out / "anim.json").write_text(json.dumps(anim, indent=1))
