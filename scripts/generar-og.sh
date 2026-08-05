#!/usr/bin/env bash
#
# Genera la imagen de previsualización (Open Graph) que ven WhatsApp, Facebook,
# X y LinkedIn al compartir el sitio, y la deja en public/og/portada.jpg.
#
#   scripts/generar-og.sh
#
# La tarjeta se arma como HTML —misma identidad que el sitio: Poppins, Dancing
# Script, morado y rosa— y se fotografía con Chrome a 2x para que el texto salga
# nítido. Las fuentes se descargan de Google Fonts y se incrustan en base64: así
# el render no depende de qué tipografías tenga instaladas la máquina.
#
# Requiere ImageMagick, curl y Chrome (o Chromium).
#
# Vuelve a correrlo cuando cambie la fotografía, el lema o el dominio. Ojo: las
# redes cachean la imagen por URL. Después de reemplazarla, revalida en
# https://developers.facebook.com/tools/debug/ para que WhatsApp la vuelva a leer.

set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ORIGEN="$RAIZ/originales/draandrea1.png"
DESTINO="$RAIZ/public/og/portada.jpg"

# Recorte del retrato: 860x1020 desde arriba deja el rostro centrado en el panel
# y descarta el escritorio del borde inferior.
FOTO_ANCHO=860
FOTO_ALTO=1020

CHROME="$(command -v google-chrome || command -v google-chrome-stable \
  || command -v chromium || command -v chromium-browser || true)"

if [ -z "$CHROME" ]; then
  echo "No encontré Chrome ni Chromium; hacen falta para fotografiar la tarjeta." >&2
  exit 1
fi

if [ ! -f "$ORIGEN" ]; then
  echo "No existe el original: $ORIGEN" >&2
  exit 1
fi

TRABAJO="$(mktemp -d)"
trap 'rm -rf "$TRABAJO"' EXIT

# --------------------------------------------------------------- Tipografías
# Las URL apuntan a los .ttf estáticos que sirve Google Fonts para cada peso.
descargar() {
  curl -sSfL -A "Mozilla/5.0" -o "$TRABAJO/$1" "$2"
}

echo "Descargando tipografías…"
descargar Poppins-Regular.ttf \
  "https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrFJA.ttf"
descargar Poppins-SemiBold.ttf \
  "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6V1s.ttf"
descargar DancingScript-SemiBold.ttf \
  "https://fonts.gstatic.com/s/dancingscript/v29/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B7y0HTQ.ttf"

# ------------------------------------------------------------------- Retrato
echo "Recortando el retrato…"
magick "$ORIGEN" -resize "${FOTO_ANCHO}x" \
  -gravity north -crop "${FOTO_ANCHO}x${FOTO_ALTO}+0+0" +repage \
  -colorspace sRGB -strip -quality 92 "$TRABAJO/foto.jpg"

POPPINS="$(base64 -w0 "$TRABAJO/Poppins-Regular.ttf")"
POPPINS_SB="$(base64 -w0 "$TRABAJO/Poppins-SemiBold.ttf")"
DANCING="$(base64 -w0 "$TRABAJO/DancingScript-SemiBold.ttf")"
FOTO="$(base64 -w0 "$TRABAJO/foto.jpg")"

# ------------------------------------------------------------------- Tarjeta
cat > "$TRABAJO/tarjeta.html" <<HTML
<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<style>
  @font-face { font-family: 'Poppins'; font-weight: 400;
    src: url(data:font/ttf;base64,$POPPINS) format('truetype'); }
  @font-face { font-family: 'Poppins'; font-weight: 600;
    src: url(data:font/ttf;base64,$POPPINS_SB) format('truetype'); }
  @font-face { font-family: 'Dancing Script'; font-weight: 600;
    src: url(data:font/ttf;base64,$DANCING) format('truetype'); }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  /* El fondo repite el .patron-marca del sitio sobre el degradado lavanda. */
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: 'Poppins', sans-serif;
    background:
      radial-gradient(circle at 11% 15%, rgba(179,157,219,.16) 0 3px, transparent 3.5px),
      radial-gradient(circle at 52% 9%, rgba(248,187,208,.38) 0 4px, transparent 4.5px),
      radial-gradient(circle at 4% 55%, rgba(179,157,219,.15) 0 3px, transparent 3.5px),
      radial-gradient(circle at 30% 88%, rgba(248,187,208,.32) 0 3px, transparent 3.5px),
      linear-gradient(135deg, #F3EEFF 0%, #FBF9FF 55%, #FFFFFF 100%);
    background-size: 220px 220px, 220px 220px, 220px 220px, 220px 220px, 100% 100%;
  }

  .tarjeta { display: flex; height: 100%; align-items: center; }
  .texto { flex: 1; padding: 0 40px 0 80px; }
  .marca { width: 66px; height: 66px; display: block; margin-bottom: 34px; }

  .eyebrow {
    font-size: 22px; font-weight: 600; letter-spacing: .32em;
    color: #E91E63; text-transform: uppercase; margin-bottom: 10px;
  }

  h1 {
    font-size: 60px; font-weight: 600; line-height: 1.12;
    letter-spacing: -.015em; color: #4A2F80;
  }
  h1 .rosa { color: #E91E63; }

  .regla {
    width: 64px; height: 5px; border-radius: 3px;
    background: #E91E63; margin: 26px 0 22px;
  }

  .especialidad {
    font-size: 19px; font-weight: 600; letter-spacing: .28em;
    color: #6A6472; text-transform: uppercase;
  }

  .lema {
    font-family: 'Dancing Script', cursive; font-weight: 600;
    font-size: 42px; color: #7E57C2; margin-top: 26px;
  }

  .sitio { font-size: 20px; color: #6A6472; margin-top: 26px; }

  .foto {
    width: 430px; height: 510px; margin-right: 70px; flex: none;
    border-radius: 40px; object-fit: cover; object-position: 50% 12%;
    box-shadow: 0 22px 52px -14px rgba(74,47,128,.34);
  }
</style>
</head>
<body>
  <div class="tarjeta">
    <div class="texto">
      <svg class="marca" viewBox="0 0 64 64">
        <path d="M32 55C21 47 9 38.5 9 26.5 9 18.5 15 13 22 13c4.3 0 8 2.2 10 5.6C34 15.2 37.7 13 42 13c7 0 13 5.5 13 13.5 0 5.6-2.6 10.3-6.2 14.4"
          fill="none" stroke="#7E57C2" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M22 20v9.5a7.5 7.5 0 0 0 15 0V20"
          fill="none" stroke="#7E57C2" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M29.5 37v3.5a8.5 8.5 0 0 0 8.5 8.5 5.5 5.5 0 0 0 5.5-5.5v-2"
          fill="none" stroke="#7E57C2" stroke-width="3.4" stroke-linecap="round"/>
        <circle cx="43.5" cy="39" r="4" fill="none" stroke="#7E57C2" stroke-width="3.4"/>
        <path d="M31 25h-4.5v4.5h-4V34H18v-4.5h-4.5V25H18v-4.5h4.5V25z"
          transform="translate(11 3)" fill="#E91E63"/>
      </svg>
      <p class="eyebrow">Dra.</p>
      <h1>Andrea <span class="rosa">Garc&iacute;a</span><br>Hern&aacute;ndez</h1>
      <div class="regla"></div>
      <p class="especialidad">M&eacute;dico general</p>
      <p class="lema">Tu salud es mi prioridad</p>
      <p class="sitio">draandreagarciahernandez.com</p>
    </div>
    <img class="foto" src="data:image/jpeg;base64,$FOTO" alt="">
  </div>
</body>
</html>
HTML

echo "Fotografiando la tarjeta…"
"$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1200,630 \
  --screenshot="$TRABAJO/tarjeta.png" "file://$TRABAJO/tarjeta.html" >/dev/null 2>&1

# Se fotografía a 2x y se reduce a 1200x630: el remuestreo deja los bordes de
# la tipografía más limpios que capturar directo al tamaño final.
mkdir -p "$(dirname "$DESTINO")"
magick "$TRABAJO/tarjeta.png" -resize 1200x630 \
  -colorspace sRGB -strip -quality 88 -interlace Plane "$DESTINO"

printf '%s  %s  %s\n' "$(magick identify -format '%wx%h' "$DESTINO")" \
  "$(du -h "$DESTINO" | cut -f1)" "${DESTINO#"$RAIZ/"}"
