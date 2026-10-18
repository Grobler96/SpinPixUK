#!/usr/bin/env bash
# Turn a Veo clip into a seamless looping panel video for the Party Tunnel (src/data/tunnel.ts).
#   bash scripts/make-loop.sh <clip.mp4> <panel id>
# Writes public/tunnel/<id>.mp4: 960x540, silent, H.264, and the last second cross-fades
# into the first so the loop has no visible jump. Then set `video: true` on that panel.
set -euo pipefail
src="${1:?usage: make-loop.sh <clip.mp4> <id>}"; id="${2:?id}"
mkdir -p public/tunnel
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
fade=1
body=$(python3 -c "print(max(1.0, $dur - $fade))")
ffmpeg -v error -y -i "$src" -i "$src" -filter_complex "\
[0:v]fps=24,scale=960:540:force_original_aspect_ratio=increase,crop=960:540,setsar=1,trim=start=$fade:end=$body,setpts=PTS-STARTPTS[main];\
[1:v]fps=24,scale=960:540:force_original_aspect_ratio=increase,crop=960:540,setsar=1,trim=start=$body,setpts=PTS-STARTPTS[tail];\
[0:v]fps=24,scale=960:540:force_original_aspect_ratio=increase,crop=960:540,setsar=1,trim=end=$fade,setpts=PTS-STARTPTS[head];\
[tail][head]xfade=transition=fade:duration=$fade:offset=0[seam];\
[main][seam]concat=n=2:v=1[out]" -map "[out]" -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "public/tunnel/$id.mp4"
echo "public/tunnel/$id.mp4 $(du -h "public/tunnel/$id.mp4" | cut -f1)"
