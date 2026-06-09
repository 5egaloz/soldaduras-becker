# ✅ TAREAS — Lo que TÚ harás después (en orden)

> El paquete ya está construido. Esto es lo único que falta y que solo tú puedes hacer.

## 1. Loguearte en GitHub (1 vez)
En el prompt de Claude Code escribe:
```
! gh auth login --web
```
Elige: `GitHub.com` → `HTTPS` → `Y` → copia el código → ábrelo en el navegador.

## 2. Crear y subir el repo R1
Una vez logueado, dime **"ya me logueé"** y yo corro la creación y subida automática.
(O tú mismo, parado en la carpeta R1:)
```
gh repo create R1 --public --source . --remote origin --push
```

## 3. Activar la página web (GitHub Pages)
En GitHub.com → repo **R1** → **Settings → Pages**:
- Source: **Deploy from a branch**
- Branch: **main** / carpeta **/(root)** → **Save**
- En ~1 min tu página estará en: `https://TU-USUARIO.github.io/R1/`

## 4. Llenar los datos del negocio
Abre `marca/negocio.md` y llena todos los campos `[...]`.
Esto lo necesita la página **y** Oficina IA Bot.

## 5. Personalizar la página (`index.html`)
- [ ] Poner tu **número de WhatsApp** (busca `569XXXXXXXX`, 4 lugares).
- [ ] Poner el **nombre del negocio** (busca `Soldadura [TU NEGOCIO]`).
- [ ] Poner **teléfono, zona y horario** (sección contacto).

## 6. Fotos de trabajos
- [ ] Mete 6 fotos en `assets/trabajos/` como `trabajo-1.jpg` … `trabajo-6.jpg`.
- [ ] ¿No tienes fotos? → Oficina IA Bot las genera con `marca/prompts-imagenes.md`.

## 7. Después de publicar: imagen de WhatsApp (og:image)
Para que el link se vea con foto al compartirlo por WhatsApp, la URL debe ser
**absoluta**. Una vez que sepas tu URL de GitHub Pages, en `index.html` cambia:
```
<meta property="og:image" content="assets/og-imagen.jpg" />
```
por:
```
<meta property="og:image" content="https://TU-USUARIO.github.io/R1/assets/og-imagen.jpg" />
```
(La imagen `assets/og-imagen.jpg` ya existe, creada el 2026-06-09.)

## 8. Volver a publicar cambios
Cada vez que edites algo:
```
git add .
git commit -m "Actualizo datos y fotos"
git push
```
La página se actualiza sola en ~1 min.

---
### 🤖 Conexión con Oficina IA Bot
Cuando los datos (`marca/negocio.md`) y los prompts estén listos, los agentes pueden:
1. Leer `marca/negocio.md` para el contexto.
2. Generar imágenes con `marca/prompts-imagenes.md`.
3. Guardarlas en `assets/` y hacer commit/push para publicarlas.
