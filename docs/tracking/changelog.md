# Changelog

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

### Fixed
- Filas con `time_init` 23:00:00/22:00:00 ahora tienen `border-bottom: 2px solid #888` como separador de fin de día.
- Corregido desplazamiento de filas entre domingo 00:00-03:00 (hora servidor UTC-2): DOM 03:00 ya no aparece "En curso" antes de iniciar; SAB 23:00 (semana previa) pasa a ser la fila en curso.

### Removed
- Entrada errónea `codet 7.00` (STANDBY) en `db/calendar-battle-survival.json`: coincidía en el tiempo con el BUILD de inicio de semana y nunca quedaría "En curso".
