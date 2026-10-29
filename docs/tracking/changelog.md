# Changelog

## [261029] - 2026-10-29

### Added
- Archivo `AGENTS.md` en la raíz del proyecto con configuración para agentes de IA.
- Estructura de documentación `docs/` con subcarpetas architecture, core y tracking.
- Documentación del patrón de bloques-script en `docs/architecture/`.
- Reglas del proyecto en `docs/core/`.
- Columna "Servidor" (7ª) en `src/battle-survival-schedule.html`: muestra `time_init` convertido a la hora local del navegador.

### Changed
- Refactorizado `src/battle-survival-schedule.html`: eliminado bloque `<style>`, CSS ahora se inyecta dinámicamente vía JS.
- Aplicada paleta de colores estandarizada: header de tabla cambia de `#666` a `#26b` (primary).
- Estructura final del bloque: solo `<div>` + `<script>` (sin `<style>`, sin `<html>` completo).
- Fila en curso (bs-current): estilo pleno (verde + bold) solo en columnas 1-3; columnas 4-7 con tono tenue `rgba(0,153,34,0.4)` y `font-weight: normal`.
- Texto de columnas 5-7 (Actividad 1, Actividad 2, Servidor) reducido a 11px.
- Contador de fila en curso ahora muestra tiempo transcurrido (cuenta ascendente); posiciones 3-9 muestran prefijo `T - ` con formato `00:00:00` y `font-weight: normal`.

### Fixed
- Filas con `time_init` 23:00:00/22:00:00 ahora tienen `border-bottom: 2px solid #888` como separador de fin de día.
- Corregido desplazamiento de filas entre domingo 00:00-03:00 (hora servidor UTC-2): DOM 03:00 ya no aparece "En curso" antes de iniciar; SAB 23:00 (semana previa) pasa a ser la fila en curso.
