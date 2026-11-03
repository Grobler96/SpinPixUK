# SpinPix header on TouchPix event galleries

The logo at the top of a TouchPix gallery is a flat image with a black background, so it shows as a black box.
This makes it look like part of the page: no box, a neon glow that follows the letters, and a gentle float and pulse.
It is set up in TouchPix (the gallery lives on TouchPix's page, not ours).

1. In the TouchPix gallery/event settings, replace the header logo with `spinpix-gallery-logo.png` (transparent background).
2. Paste the contents of `gallery-header.css` into the gallery's custom CSS box.

If there is no custom CSS box, step 1 alone removes the black box. If you would rather keep the current logo image,
use `gallery-header-keep-current-logo.css` instead of both steps (it hides the black with a blend effect; the result is
less crisp, so the transparent logo is better).

The CSS targets TouchPix's `.header_logo` and `.header_logo_image` classes. If TouchPix ever renames them, the styling
will stop applying and the gallery just falls back to the plain logo. `before-and-after.png` shows the difference.
The animation switches itself off for visitors who have "reduce motion" turned on.
