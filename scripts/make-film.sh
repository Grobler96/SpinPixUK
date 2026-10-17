#!/usr/bin/env bash
# Turn a video clip into scroll film frames for the homepage (see src/data/film.ts).
#   bash scripts/make-film.sh <clip.mp4> <id> [fps]
# Writes public/film/<id>/m/*.webp (portrait, 540x960, centre crop) and, for landscape
# sources, public/film/<id>/d/*.webp (1280x720). Then add { id, frames, desktop } to clips.
set -euo pipefail
src="${1:?usage: make-film.sh <clip.mp4> <id> [fps]}"; id="${2:?id}"; fps="${3:-15}"
out="public/film/$id"; rm -rf "$out"; mkdir -p "$out/m"
read -r w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=' ' "$src")
ffmpeg -v error -i "$src" -an -vf "fps=$fps,scale=-2:960:flags=lanczos,crop=540:960" -c:v libwebp -quality 62 "$out/m/%03d.webp"
desktop=false
if [ "$w" -gt "$h" ]; then
  mkdir -p "$out/d"
  ffmpeg -v error -i "$src" -an -vf "fps=$fps,scale=1280:720:flags=lanczos" -c:v libwebp -quality 60 "$out/d/%03d.webp"
  desktop=true
fi
n=$(ls "$out/m" | wc -l)
echo "{ id: '$id', frames: $n, desktop: $desktop },   # $(du -sh "$out" | cut -f1)"
