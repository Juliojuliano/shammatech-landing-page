#!/usr/bin/env bash
# Gera as mídias do Shammy a partir do GIF original (320x569).
# Uso: optimize_shammy.sh <gif_original> <pasta_saida>
# Saídas: shammy-hero.webm, shammy-hero.mp4, shammy-hero-poster.jpg, shammy-final.jpg
# Dica: para pegar o GIF original depois de já ter trocado, use `git show origin/main~N:assets/img/shammy-hero.gif`.
set -euo pipefail
SRC="$1"; OUT="$2"; mkdir -p "$OUT"
COLOR="eq=contrast=1.1:saturation=1.3:brightness=0.03:gamma=0.95"
VF="scale=576:-2:flags=lanczos,hqdn3d=2:2:6:6,$COLOR,unsharp=7:7:1.2:5:5:0.0"

ffmpeg -loglevel error -y -i "$SRC" -vf "$VF" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -an "$OUT/shammy-hero.webm"
ffmpeg -loglevel error -y -i "$SRC" -vf "$VF,format=yuv420p" -c:v libx264 -crf 27 -preset slow -movflags +faststart -an "$OUT/shammy-hero.mp4"
ffmpeg -loglevel error -y -i "$OUT/shammy-hero.mp4" -vf "select='eq(n,0)'" -vframes 1 -q:v 4 "$OUT/shammy-hero-poster.jpg"
# Último quadro (Shammy sorrindo de olhos fechados); ajuste o índice se a animação mudar
ffmpeg -loglevel error -y -i "$SRC" -vf "select='eq(n,91)',$VF" -vframes 1 -q:v 2 "$OUT/shammy-final.jpg"
ls -l "$OUT"
