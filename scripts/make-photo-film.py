#!/usr/bin/env python3
"""Build the homepage scroll film from stills (see src/data/film.ts).

    python3 scripts/make-photo-film.py            # writes public/film/<id>/m/001.webp ...

Clips made here:
  floor  film-src/keyframe-platform.jpg: camera travels from the mirror ball down to the 360 platform
  booth, mirror, pod, spin: real SpinPix photos with a push in, crossfades, neon grade and a light sweep
The opening 'hero' clip (disco ball footage) is not touched. When real video clips replace any of these,
run scripts/make-film.sh on them instead and keep the same ids.
"""
import math, os, sys
import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PHOTOS = os.path.join(ROOT, 'public', 'photos')
OUT = os.path.join(ROOT, 'public', 'film')
W, H = 540, 960
QUALITY = 58

def smooth(x): x = min(1.0, max(0.0, x)); return x * x * (3 - 2 * x)
def lerp(a, b, t): return a + (b - a) * t

def window(im, cx, cy, w):
    """Crop a 9:16 window of width w centred on (cx, cy), kept inside the image, resized to the frame."""
    iw, ih = im.size
    w = min(w, iw, ih * 9 / 16); h = w * 16 / 9
    x0 = min(max(cx - w / 2, 0), iw - w); y0 = min(max(cy - h / 2, 0), ih - h)
    return im.resize((W, H), Image.LANCZOS, box=(x0, y0, x0 + w, y0 + h))

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
vignette = 1 - 0.55 * np.clip(((xx / W - .5) ** 2 * 1.6 + (yy / H - .5) ** 2) * 2.2, 0, 1)
ramp = (yy / H)[..., None]
tint = np.array([.18, .30, 1.0]) * (1 - ramp) + np.array([1.0, .18, .58]) * ramp   # blue top, pink bottom

def grade(img, t, glow=1.0):
    a = np.asarray(img, dtype=np.float32) / 255
    lum = a.mean(axis=2, keepdims=True)
    a = lum + (a - lum) * 1.18                       # richer colour
    a = (a - .5) * 1.1 + .5                          # a touch more contrast
    a = 1 - (1 - a) * (1 - tint * .13 * glow)        # screen a neon wash over it
    d = (xx / W * .55 + yy / H * .45) - lerp(-.2, 1.2, t)   # diagonal light sweep that travels with the scroll
    a += (np.exp(-(d / .09) ** 2) * .11)[..., None] * np.array([.8, .6, 1.0])
    a *= vignette[..., None]
    return np.clip(a, 0, 1)

def to_img(a): return Image.fromarray((a * 255).astype(np.uint8))

def floor_clip(n):
    im = Image.open(os.path.join(ROOT, 'film-src', 'keyframe-platform.jpg')).convert('RGB')
    iw, ih = im.size
    for f in range(n):
        u = f / (n - 1)
        if u < .5:   # pull back from the ball to the whole room
            k = smooth(u / .5); cx = lerp(377, iw / 2, k); cy = lerp(300, ih * .5, k); w = lerp(iw * .50, iw, k)
        else:        # then push in on the platform
            k = smooth((u - .5) / .5); cx = lerp(iw / 2, 400, k); cy = lerp(ih * .5, ih * .66, k); w = lerp(iw, iw * .50, k)
        yield to_img(grade(window(im, cx, cy, w), u, glow=.7))

def photo_clip(files, n, drift=1):
    ims = [Image.open(os.path.join(PHOTOS, f + '.jpg')).convert('RGB') for f in files]
    k = len(ims); X = .22   # share of each slot spent crossfading into the next photo
    def shot(i, t):
        im = ims[i]; iw, ih = im.size
        d = drift if i % 2 == 0 else -drift
        w0 = min(iw, ih * 9 / 16)
        z = lerp(1.0, .80, smooth(t))
        return window(im, lerp(iw / 2 - d * iw * .05, iw / 2 + d * iw * .05, t), lerp(ih * .55, ih * .47, t), w0 * z)
    for f in range(n):
        u = f / (n - 1); pos = u * k; i = min(int(pos), k - 1); local = pos - i
        a = shot(i, local)
        if i < k - 1 and local > 1 - X:
            a = Image.blend(a, shot(i + 1, 0), smooth((local - (1 - X)) / X))
        yield to_img(grade(a, u))

CLIPS = {
    'floor':  (60, lambda n: floor_clip(n)),
    'booth':  (36, lambda n: photo_clip(['enclosed-wood-night', 'booth-silver', 'booth-wood'], n)),
    'mirror': (36, lambda n: photo_clip(['mirror-clock', 'mirror-18th', 'mirror-bride-groom'], n, -1)),
    'pod':    (36, lambda n: photo_clip(['selfie-pod', 'selfie-totem-couple', 'selfie-totem'], n)),
    'spin':   (36, lambda n: photo_clip(['video-360', 'video-360-wedding', 'video-360-platform'], n, -1)),
}

if __name__ == '__main__':
    only = sys.argv[1:] or list(CLIPS)
    for cid in only:
        n, make = CLIPS[cid]
        d = os.path.join(OUT, cid, 'm'); os.makedirs(d, exist_ok=True)
        for f in os.listdir(d): os.remove(os.path.join(d, f))
        for i, img in enumerate(make(n)):
            img.save(os.path.join(d, f'{i + 1:03d}.webp'), quality=QUALITY, method=6)
        size = sum(os.path.getsize(os.path.join(d, f)) for f in os.listdir(d)) // 1024
        print(f"{{ id: '{cid}', frames: {n}, desktop: false }},  // {size} KB")
