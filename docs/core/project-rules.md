# Reglas del Proyecto

## Alcance

UXM Alliance es un conjunto de bloques-script autónomos para Google Sites que muestran información del juego (calendarios, actividades, contadores en tiempo real).

Además, el repositorio incluye un **sitio web estático** (GitHub Pages) con navegación, página principal y subpáginas.

## Fuente de Verdad

Los datos en `db/*.json` son la fuente de verdad. Al actualizar un bloque-script, los datos embebidos deben sincronizarse con estos archivos.

## Bloques Existentes

| Archivo | Prefijo | Descripción |
|---|---|---|
| `src/battle-survival-schedule.html` | `bs-` | Calendario semanal Battle Survival con counter en tiempo real |

## Datos Fuente

| Archivo | Descripción |
|---|---|
| `db/calendar-battle-survival.json` | Calendario semanal (42 slots, 6 por día) |
| `db/activity-battle-survival.json` | Actividades y objetivos de Battle Survival |
| `db/activity-duel-alliance.json` | Actividades y fases de Duel Alliance |

## Sitio Web

### Estructura

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal (Home) |
| `actividades-diarias.html` | Actividades Diarias |
| `normas-uxm.html` | Normas UXM |
| `video-tutoriales.html` | Video Tutoriales |
| `estrategia.html` | Estrategia |
| `contacto.html` | Contacto |
| `css/style.css` | Estilos del sitio (se carga después de Bootstrap) |
| `js/i18n.js` | Textos por idioma (9 idiomas) |
| `js/app.js` | Lógica del sitio (menú, idiomas, título animado) |

### Bootstrap 6 (CDN obligatorio)

El sitio usa **Bootstrap 6** cargado exclusivamente por CDN (jsDelivr), sin paso de build ni `npm`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-B/GM4XqrwHnWXNOWMbloTmrYXZg10cakYGmpfsR/bbzQ6JAJI4ihuyADKLnBgrCe" crossorigin="anonymous">
<script type="module" src="https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-1a/pXj49ZQ1aHEmrJ+gMw1otqoVsYwlEnlD8mIfY2TV03r20Y0CN7uqx1tQogjPL" crossorigin="anonymous"></script>
```

Reglas:

1. La versión está **fijada** (`6.0.0-alpha.1`, versión estable oficial de Bootstrap 6). No usar rangos como `@6` para evitar cambios no controlados.
2. Los atributos `integrity` (SRI) son obligatorios: si se actualiza la versión, deben recalcularse.
3. `css/style.css` se carga **después** del CSS de Bootstrap para que la personalización del sitio prevalezca.
4. El sitio es HTML/CSS/JS estático: funciona en **GitHub Pages** sin configuración adicional. Requiere conexión a internet para cargar el CDN.

### Componentes Bootstrap en uso

| Componente | Uso |
|---|---|
| Navbar (`<nav class="navbar topbar">`) | Barra superior transparente, superpuesta y con texto en el color estándar del esquema claro |
| Drawer (`<dialog class="drawer drawer-end drawer-sheet">`) | Menú lateral deslizante anclado a la **derecha**, reemplaza el offcanvas de Bootstrap 5 |
| Menu (`<div class="menu">` + `data-bs-toggle="menu"`) | Lista desplegable del selector de idioma, con `data-bs-placement="top-end"` |
| Grid y utilities | Layout del contenido y del footer |

### Colores del sitio

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#e9ecef` | Fondo gris suave del sitio |
| `--panel` | `#ffffff` | Panel del menú lateral |
| `--line` | `#ced4da` | Bordes y separadores |
| `--text` | `#212529` | Texto principal sobre fondo claro |
| `--muted` | `#495057` | Texto secundario |
| `--hot` | `#df1b1b` | Acento (marca UXM, YouTube) |
| `--cyan` | `#0d6efd` | Estados de foco e interacción |

El fondo del sitio es **gris suave** (`#e9ecef`, equivalente a `bs-gray-200`). Por ese fondo claro, el texto del sitio usa la paleta oscura de Bootstrap (`bs-gray-900` / `bs-gray-700`) y el título del hero aplica sombra clara y oscura para conservar el contraste.

### Navbar (barra superior)

- Elemento `<nav class="navbar topbar">` con **fondo transparente** (`background-color: transparent`, sin `navbar-translucent` ni `data-bs-theme="dark"`).
- El texto usa el **color estándar** del esquema claro de Bootstrap (`--navbar-color: var(--fg-2)`, `--navbar-brand-color: var(--fg-body)`).
- Transparente, superpuesto (`position: absolute`), sin fondo ni borde.
- `pointer-events: none` en el navbar y en su `.container-fluid` para no bloquear el Home; solo el botón hamburguesa, la marca y el drawer son interactivos.
- El botón hamburguesa **no tiene borde** y su animación solo cambia la forma de las barras (nunca el color).
- No se muestra ningún icono "X": el drawer se cierra con backdrop, `Escape`, gesto de deslizamiento o al pulsar un enlace.

### Menú lateral

- Drawer **anclado a la derecha**: clase `drawer-end` (equivalente a `drawer-start` en RTL).
- Un único drawer por página con `id="navPanel"`; el contenido lo genera `js/app.js` en `#navList`.
- Enlaces generados con `?lang=` para conservar el idioma: `actividades-diarias.html`, `normas-uxm.html`, `video-tutoriales.html`, `estrategia.html`, `contacto.html`.
- La página activa se marca con `aria-current="page"` y la clase `.active`.

### Footer

- Siempre al fondo de la página: `body` es flex column con `min-height: 100dvh`, `#stage` crece (`flex: 1 1 auto`) y el footer queda al final (`flex: 0 0 auto`). Con contenido que excede el alto de pantalla, la página se vuelve continua con scroll normal.
- Distribución de escritorio (CSS Grid `1fr auto 1fr`): **YouTube a la izquierda, copyright en el centro y selector de idioma a la derecha**.
- El selector de idioma (`#langs`) es un **Menu desplegable de Bootstrap** (`data-bs-toggle="menu"`, `data-bs-placement="top-end"`): se abre hacia arriba y alineado a la derecha.
- Cada idioma se muestra **en su propio idioma** (`Español`, `English`, `Português`, `Italiano`, `Français`, `日本語`, `Русский`, `中文`), con atributo `lang` y el activo marcado con `.selected` + `aria-current="true"`.
- El cambio de idioma conserva la página actual y añade el parámetro `?lang=`.
