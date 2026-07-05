# 🔎 Guía: Search Console + Google Analytics 4

> Dos registros gratis con tu cuenta `fer.becker21@gmail.com`.
> **Search Console** = que Google indexe bien el sitio y te diga con qué búsquedas te encuentran.
> **GA4** = saber cuánta gente visita la página y desde dónde.
> En ambos casos tú creas la cuenta y **me pasas un dato** — yo hago el resto en el código.

---

## A. Google Search Console (~5 min)

1. Entra a **https://search.google.com/search-console**
2. Botón **"Agregar propiedad"** → elige el tipo **"Prefijo de URL"** (NO "Dominio")
3. Pega exactamente: `https://5egaloz.github.io/soldaduras-becker/`
4. En los métodos de verificación, elige **"Etiqueta HTML"**
5. Te mostrará una línea como esta:
   ```html
   <meta name="google-site-verification" content="AbC123xyz..." />
   ```
   **Cópiala completa y pásamela** (o solo el código del `content`).
6. Yo la agrego al `<head>` de las 5 páginas y hago push (queda en vivo en ~1 min)
7. Vuelves a Search Console y aprietas **"Verificar"** ✅
8. Último paso (tú, 1 min): menú **Sitemaps** → escribir `sitemap.xml` → **Enviar**

> Resultado: en unos días Search Console empieza a mostrar en qué búsquedas
> apareces y qué posición tienes. Google además indexa las 5 páginas más rápido.

---

## B. Google Analytics 4 (~5 min)

1. Entra a **https://analytics.google.com**
2. **Empezar a medir** → nombre de cuenta: `Soldaduras Becker`
3. Crear **propiedad**: nombre `Sitio Soldaduras Becker`, zona horaria **Chile**, moneda **CLP**
4. Sector: "Otros" o "Construcción" · Tamaño: pequeña
5. Plataforma: **Web** → URL: `https://5egaloz.github.io/soldaduras-becker/` → nombre del flujo: `Sitio principal`
6. Te mostrará un **ID de medición** con formato **`G-XXXXXXXXXX`** (arriba a la derecha del flujo de datos)
7. **Pásame ese ID** — lo pego en `analytics.js` (ya está todo cableado, solo espera el ID) y hago push
8. Verificación: abres el sitio en el celular y en GA4 → **Informes → Tiempo real** te ves a ti mismo 📈

> ⚠️ Si Google te ofrece "instalar con Google Tag Manager" o pegar código: **no hace falta**,
> el código ya está en el sitio. Solo necesito el ID `G-...`.

---

## Resumen de lo que me tienes que mandar

| Dato | Formato | Qué hago yo |
|---|---|---|
| Meta tag de Search Console | `<meta name="google-site-verification" content="...">` | La pongo en las 5 páginas + push |
| ID de medición GA4 | `G-XXXXXXXXXX` | Lo activo en `analytics.js` + push |

*Guía generada 2026-07-05.*
