#!/usr/bin/env bash
#
# Genera las variantes responsivas (AVIF, WebP y JPG de respaldo) de una imagen
# original y las deja en public/imagenes/<nombre>/.
#
#   scripts/optimizar-imagenes.sh originales/draandrea1.png retrato 480 768 1086
#
# El JPG es el respaldo para navegadores sin AVIF ni WebP; siempre se genera.
# Requiere ImageMagick con los delegados heic (AVIF) y webp.

set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "Uso: $0 <original> <nombre> <ancho> [ancho...]" >&2
  exit 1
fi

ORIGEN="$1"
NOMBRE="$2"
shift 2
ANCHOS=("$@")

if [ ! -f "$ORIGEN" ]; then
  echo "No existe el original: $ORIGEN" >&2
  exit 1
fi

DESTINO="public/imagenes/$NOMBRE"
mkdir -p "$DESTINO"

echo "$ORIGEN → $DESTINO/"

for ancho in "${ANCHOS[@]}"; do
  base="$DESTINO/$NOMBRE-$ancho"

  # -colorspace sRGB antes de -strip: quitamos metadatos sin alterar el color.
  magick "$ORIGEN" -resize "${ancho}x" -colorspace sRGB -strip \
    -quality 82 -interlace Plane "$base.jpg"

  magick "$ORIGEN" -resize "${ancho}x" -colorspace sRGB -strip \
    -quality 80 -define webp:method=6 "$base.webp"

  magick "$ORIGEN" -resize "${ancho}x" -colorspace sRGB -strip \
    -quality 55 "$base.avif"

  printf '  %5spx  avif %6s   webp %6s   jpg %6s\n' "$ancho" \
    "$(du -h "$base.avif" | cut -f1)" \
    "$(du -h "$base.webp" | cut -f1)" \
    "$(du -h "$base.jpg" | cut -f1)"
done
