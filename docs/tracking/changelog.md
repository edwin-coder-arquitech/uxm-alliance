# Changelog

## [261101] - 2026-11-01

### Added
- Sitio web estático en la raíz del repositorio (`index.html` + 5 subpáginas) para GitHub Pages.
- Menú lateral deslizante con las secciones: Actividades Diarias, Normas UXM, Video Tutoriales, Estrategia y Contacto.
- Título hero "Under Xtreme Madness" con sombra y aparición progresiva de las letras desde el centro.
- Footer persistente: enlace de YouTube con icono SVG en el extremo izquierdo y copyright en el derecho.
- Selector de idioma en el footer con 9 idiomas (es, en, pt, it, fr, ja, ru, zh), conservando `?lang=` entre páginas.
- Bootstrap 6 (`6.0.0-alpha.1`) por CDN con SRI en las 6 páginas del sitio.

### Changed
- Migración del menú lateral artesanal al componente **Drawer** de Bootstrap 6 (`<dialog class="drawer drawer-end drawer-sheet">`), con backdrop, `Escape` y deslizamiento gestionados por el plugin.
- El menú lateral queda **anclado a la derecha** (`drawer-end`).
- La barra superior pasa a `<nav class="navbar">` con **fondo transparente** y texto en el color estándar del esquema claro de Bootstrap (`--fg-2` / `--fg-body`), manteniendo el comportamiento superpuesto y `pointer-events` para no bloquear el Home.
- Selector de idioma convertido en **Menu desplegable de Bootstrap** (`data-bs-toggle="menu"`, `data-bs-placement="top-end"`): se abre hacia arriba y alineado a la derecha. Cada idioma se muestra en su propio idioma (`Español`, `English`, `Português`, `Italiano`, `Français`, `日本語`, `Русский`, `中文`) con atributo `lang`.
- Footer redistribuido con CSS Grid `1fr auto 1fr`: YouTube a la izquierda, copyright en el centro y selector de idioma a la derecha.
- Fondo del sitio cambiado a gris suave `#e9ecef`, con paleta de texto oscura y sombras del hero recalculadas.
- El botón hamburguesa pierde el borde y su animación solo cambia la forma de las barras, conservando el color.
- Eliminado el icono "X" de cierre; el menú se cierra con backdrop, `Escape`, deslizamiento o al pulsar un enlace.

### Removed
- Navbar de demostración de Bootstrap (enlaces `#`, buscador y drawer duplicado) presente en `index.html`.
- Estilos y marcado del backdrop y del botón de cierre manuales (`#navBackdrop`, `#navClose`, `.nav-close`).
- Dependencia previa de Vanilla Framework en el sitio.

## [261029] - 2026-10-29

### Added
- Archivo `AGENTS.md` en la raíz del proyecto con configuración para agentes de IA.
- Estructura de documentación `docs/` con subcarpetas architecture, core y tracking.
- Documentación del patrón de bloques-script en `docs/architecture/`.
- Reglas del proyecto en `docs/core/`.
- Columna "Servidor" (7ª) en `src/battle-survival-schedule.html`: muestra `time_init` convertido a la hora local del navegador.
- Idioma francés (`fr`) en el objeto I18N: 8 idiomas disponibles (es, en, pt, it, tr, fr, zh, ja).
- Destacado gris (paleta texto-tracking-1 `#727374`/`#ebebeb`) en celdas de Actividad 1 con keywords 'fruit'/'ticket' y de Actividad 2 con 'stamina'/'antitoxin', solo en filas futuras (posiciones 3-9).
- Destacado amarillo (paleta texto-special-1 `#ffee00`/`#b65200`) en celdas Contador/Detalle/Evento de filas futuras cuyo evento contiene 'soldiers' (Train Soldiers).

### Changed
- Refactorizado `src/battle-survival-schedule.html`: eliminado bloque `<style>`, CSS ahora se inyecta dinámicamente vía JS.
- Aplicada paleta de colores estandarizada: header de tabla cambia de `#666` a `#26b` (primary).
- Estructura final del bloque: solo `<div>` + `<script>` (sin `<style>`, sin `<html>` completo).
- Fila en curso (bs-current): estilo pleno (verde + bold) solo en columnas 1-3; columnas 4-7 con tono tenue `rgba(0,153,34,0.4)` y `font-weight: normal`.
- Texto de columnas 5-7 (Actividad 1, Actividad 2, Servidor) reducido a 11px.
- Contador de fila en curso ahora muestra tiempo transcurrido (cuenta ascendente); posiciones 3-9 muestran prefijo `T - ` con formato `00:00:00` y `font-weight: normal`.
- Fallback de idioma pasa de español a inglés (`default:ingles` según AGENTS.md).
- Color de texto de columnas 4-7 en fila en curso cambia a `#009922`.
- Prefijo `+ ` en el contador de la fila en curso (tiempo transcurrido).
- Datos embebidos sincronizados con `db/`: calendario 0-based (noday 0-6, dom-sáb), slots 00:00-20:00 cada 4h, STANDBY en ACTIVITIES; fórmula `sec` ajustada a `noday * 86400`.
- Borde de fin de día ahora data-driven: se aplica bajo el último slot de cada día (20:00) en lugar de chequeo fijo por hora.
- Estrella de fila en curso sin tono gris (hereda blanco); tz info sin `text-align: right` y padding superior 10px.
- Columnas 4-7 de la fila en curso usan paleta texto-success-2 (`#00ff39`/`#00821d`) en lugar de verde transparente.
- Eliminada columna "Día" (la tabla pasa de 7 a 6 columnas); estrella de fila en curso reubicada en la celda de Evento; el estilo success-2 de la fila en curso ahora cubre las columnas 3-6 (Evento, Actividad 1, Actividad 2, Servidor).
- Columna "Servidor" con formato "DD HH:MM" (día del mes + hora local del navegador) en lugar de "HH:MM".
- Columna "Servidor" con formato "DDD HH:MM" (abreviatura de día en inglés fijo: Sun/Mon/... + hora local) en lugar de "DD HH:MM".

### Fixed
- Filas con `time_init` 23:00:00/22:00:00 ahora tienen `border-bottom: 2px solid #888` como separador de fin de día.
- Corregido desplazamiento de filas entre domingo 00:00-03:00 (hora servidor UTC-2): DOM 03:00 ya no aparece "En curso" antes de iniciar; SAB 23:00 (semana previa) pasa a ser la fila en curso.

### Removed
- Entrada errónea `codet 7.00` (STANDBY) en `db/calendar-battle-survival.json`: coincidía en el tiempo con el BUILD de inicio de semana y nunca quedaría "En curso".
- Arrays `days` del objeto I18N en los 8 idiomas (código muerto tras eliminar la columna Día).
