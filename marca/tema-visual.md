# 🎨 Tema visual — "Forja Aysén"

Sistema de diseño de la página de **Soldaduras Becker**.
Creado a medida (Theme Factory) sobre la identidad industrial ya definida en
`.antigravityrules`: acero oscuro + chispa naranja + dorado + verde WhatsApp.

> **Idea del tema:** el negocio es *fierro **y** madera*. La paleta anterior solo
> hablaba de fierro (todo naranja sobre gris). "Forja Aysén" suma un tono **madera**
> y un tono **acero frío** para que la página cuente las dos materias primas.

---

## 1. Paleta

### Superficies (acero frío)

| Token | Hex | Uso |
|---|---|---|
| `--ink-900` | `#08090c` | Fondo más profundo (footer, secciones oscuras) |
| `--ink-800` | `#0f1115` | **Fondo base de la marca** (no se cambia) |
| `--ink-700` | `#161a21` | Superficie: tarjetas, CTA, cabeceras de subpágina |
| `--ink-600` | `#1c212b` | Superficie elevada (hover de tarjetas) |
| `--ink-500` | `#232a34` | Líneas y bordes |
| `--ink-400` | `#2f3846` | Bordes marcados / estado hover |

### Texto

| Token | Hex | Contraste sobre `#0f1115` |
|---|---|---|
| `--text` | `#eef1f6` | 16.4:1 — AAA |
| `--text-soft` | `#c6ced9` | 11.1:1 — AAA |
| `--muted` | `#9ba6b5` | 7.1:1 — AAA (texto normal) |

### Acentos de marca

| Token | Hex | Uso |
|---|---|---|
| `--spark` | `#ff7a1a` | **Acento principal.** Chispa de soldadura: CTAs, subrayados, hover |
| `--spark-soft` | `#ffb648` | Dorado. Eyebrows, enlaces sobre fondo oscuro, foco |
| `--spark-deep` | `#c85c08` | Sombras y degradados del naranja |
| `--wood` | `#c78d55` | **Nuevo.** Madera: segundo acento, degradados fierro→madera |
| `--wood-soft` | `#e2b184` | Madera clara: hover de acentos madera |
| `--steel` | `#7d92a8` | **Nuevo.** Acero frío: iconos e info secundaria neutra |
| `--wa` | `#25d366` | Verde WhatsApp (solo para acciones de WhatsApp) |

### Regla de uso del color

1. **Naranja `--spark` = acción o marca.** Nunca decorativo a gran escala.
2. **Verde `--wa` = únicamente WhatsApp.** Nada más lo usa, para que el usuario
   aprenda que "verde = me contacta".
3. **Degradado firma:** `linear-gradient(90deg, var(--spark), var(--wood))`
   (fierro → madera). Es el sello del tema: subrayados de títulos, barra de
   progreso, borde superior de tarjetas.
4. Nunca poner naranja sobre naranja: el texto sobre `--spark` es `#1a1206`.

---

## 2. Tipografía

| Rol | Fuente | Peso | Tratamiento |
|---|---|---|---|
| Títulos (h1–h3, marca) | **Oswald** | 500–700 | MAYÚSCULAS, `letter-spacing` positivo |
| Cuerpo e interfaz | **Inter** | 400–600 | Normal, `line-height` 1.65 |

Escala fluida (`clamp()`), sin saltos bruscos entre móvil y escritorio:

```
--fs-xs   .78rem          etiquetas, contadores
--fs-sm   .9rem           texto secundario
--fs-base 1rem            cuerpo
--fs-md   1.02 → 1.12rem  bajadas de sección
--fs-lg   1.12 → 1.28rem  subtítulo del hero
--fs-xl   1.15 → 1.35rem  h3
--fs-2xl  1.9  → 2.8rem   h2
--fs-3xl  2.4  → 4.4rem   h1 del hero
```

---

## 3. Espacio, forma y profundidad

- **Espaciado:** escala de 8 (`--space-1` … `--space-9`, de 4px a 88px).
  Todo el ritmo vertical sale de ahí, no de números sueltos.
- **Radios:** `--r-sm 10px` · `--r-md 16px` · `--r-lg 22px` · `--r-pill 999px`.
- **Elevación:** 3 niveles (`--shadow-1/2/3`), sombras dobles (contacto + difusa).
- **Cristal (glassmorphism):** `backdrop-filter: blur()` reservado a elementos
  flotantes sobre contenido — nav, badges del hero, botones del lightbox.

---

## 4. Movimiento

| Token | Valor | Uso |
|---|---|---|
| `--t-fast` | `.16s` | Cambios de color |
| `--t` | `.28s` | Hover, transformaciones |
| `--t-slow` | `.5s` | Zoom de imágenes, aparición |
| `--ease-out` | `cubic-bezier(.22,.61,.36,1)` | General |
| `--ease-spring` | `cubic-bezier(.34,1.28,.5,1)` | Botones y CTAs |

Todo el movimiento se desactiva con `@media (prefers-reduced-motion: reduce)`.
Las animaciones de aparición usan **scroll-driven CSS** (`animation-timeline: view()`)
dentro de un `@supports`, así que no dependen de JavaScript ni rompen la CSP.

---

## 5. Accesibilidad (objetivo del tema)

- Contraste mínimo AA en todo texto; el cuerpo y `--muted` llegan a AAA.
- Anillo de foco visible y consistente: `--spark-soft` a 3px con offset.
- Objetivos táctiles ≥ 44×44 px en móvil.
- Enlace "saltar al contenido" como primer elemento enfocable.
- Landmark `<main>` en las 5 páginas.
- Lightbox con trampa de foco, cierre con `Esc` y devolución del foco.
