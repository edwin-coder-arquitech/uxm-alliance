# Reglas del Proyecto

## Alcance

UXM Alliance es un conjunto de bloques-script autónomos para Google Sites que muestran información del juego (calendarios, actividades, contadores en tiempo real).

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
