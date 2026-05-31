# 🎨 Prompts para Oficina IA Bot — Imágenes de Soldadura

> Estos prompts los usan los agentes (vía `generate_image`) para crear fotos
> realistas mientras consigues fotos propias, o para banners y redes sociales.
> Idioma del prompt: inglés rinde mejor en los modelos de imagen.

## Estilo base (pégalo al inicio de cada prompt)
`professional product photography, realistic, dramatic industrial lighting, warm orange sparks, dark steel tones, high detail, shallow depth of field, --ar 4:3`

## Galería de trabajos (6 imágenes para la sección "Trabajos")
1. **Portón:** `A modern black wrought-iron driveway gate, clean welds, residential street, golden hour`
2. **Reja de ventana:** `Decorative steel security bars on a house window, freshly painted, neat geometric design`
3. **Barandal:** `A sleek metal handrail on an outdoor concrete staircase, minimalist, powder-coated black`
4. **Estructura:** `A steel canopy structure over a small business entrance, sturdy welded frame`
5. **Escalera:** `An industrial spiral metal staircase, clean welding seams, warehouse setting`
6. **Soldador trabajando:** `A skilled welder in protective gear welding a steel frame, bright sparks flying, dark workshop`

## Hero / banner principal
`Cinematic wide shot of a welder's hands welding steel, intense orange sparks, dark moody background, copy space on the left, --ar 16:9`

## Imagen para compartir (Open Graph → guardar como assets/og-imagen.jpg)
`Bold banner: close-up of glowing welded steel joint with sparks, dark background, premium industrial look, --ar 1.91:1`

## Para redes (Facebook/Instagram)
- **Post "antes y después":** `Split image, before: rusty broken metal gate, after: brand new black welded gate, clean comparison`
- **Post promo:** `Eye-catching social media graphic, dark steel background, orange spark accents, space for text overlay, square --ar 1:1`

---
### Flujo sugerido con Oficina IA Bot
1. El bot lee `marca/negocio.md` para el contexto del negocio.
2. Genera las 6 imágenes de galería → guárdalas en `assets/trabajos/trabajo-1..6.jpg`.
3. Genera hero y og-imagen → `assets/`.
4. Vuelve a publicar la página (commit + push) y las imágenes aparecen solas.
