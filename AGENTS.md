# AGENTS.md - UXM Alliance

Configuración para agentes de IA. Este archivo garantiza continuidad del proyecto entre sesiones.

---

## Descripción del Proyecto

Bloques-script autónomos para insertar en Google Sites (bloque "Insertar > Embed code").
Cada archivo en `src/` es un **bloque-script** independiente que funciona sin librerías externas.
sin dependencias de red (sin fetch/CORS), y sin HTML completo.
Determinando la Zona Horaria cambia el texto según el idioma disponible: español, ingles, portugués, italiano, turco, francés, chino, japones.

---

## Estructura de Carpetas

```
uxm-alliance/
├── AGENTS.md          # Este archivo - configuracion para agentes
├── README.md          # Descripcion breve del proyecto
├── src/               # Bloques-script (un archivo = un bloque)
├── db/                # Datos fuente en JSON (referencia, no se cargan en runtime)
├── bin/               # Scripts utilitarios
├── prompt/            # Instrucciones de sesion
└── docs/              # Documentacion del proyecto
    ├── architecture/  # Decisiones de diseno y patrones
    ├── core/          # Reglas del proyecto y alcance
    └── tracking/      # Changelog y milestones
```

---

## Convenciones de Bloques-Script

Cada archivo en `src/` DEBE cumplir:

1. **Solo `<div>` + `<script>`**: No incluir `<html>`, `<head>`, `<body>`, ni `<style>`.
2. **CSS inyectado vía JS**: Los estilos se crean dinámicamente desde el script usando un elemento `<style>` inyectado al DOM.
3. **Sin librerías externas**: Vanilla JS, compatible con ES5 (var, function, sin arrow functions ni let/const).
4. **Datos embebidos**: Toda la data necesaria va dentro del script (sin fetch, sin CORS, sin dependencias de red).
5. **100% autónomo**: Cada bloque funciona por sí solo al pegarlo en Google Sites.
6. **IIFE**: Todo el código se envuelve en `(function () { "use strict"; ... })();`.
7. **Prefijo de clases**: Cada bloque usa un prefijo único (ej: `bs-` para battle-survival) para evitar colisiones en Google Sites.

---

## Zona Horaria Base

**UTC-2** es la zona horaria origen donde se registran todos los datos de actividades.

- Los horarios en `db/*.json` están en UTC-2.
- Cada bloque-script convierte los horarios a la zona local del visitante automáticamente.
- Fórmula: `UTC = hora_origen + 2h` → luego se convierte a la zona del navegador.

---

## Paleta de Colores Estándar

Todos los bloques-script deben usar esta paleta para acciones o elementos de importancia:

| Token     | Hex       | Uso                                    |
|-----------|-----------|----------------------------------------|
| `success` | #009922 | Acciones completadas, estado en curso  |
| `primary` | #26b    | Elementos principales, headers, títulos|
| `warning` | #e95612 | Alertas preventivas, próximos eventos  |
| `alert`   | #df1b1b | Errores, eventos críticos              |

Colores neutros complementarios (no requieren token):

- Texto base: #888
- Texto secundario: #aaa
- Bordes: #eee
- Texto pasado/atenuado: #b3b3b3
- Background satisfactorio 2: #00992156

---

## Flujo de Trabajo

1. **Plan**: Usar modo Plan para decisiones de arquitectura antes de construir.
2. **Explore**: Antes de modificar código existente, usar `@explore` para entender la estructura.
3. **Build**: Al escribir `GO`, ejecutar tareas secuencialmente.
4. **Review**: Usar `@review` tras completar una feature.
5. **Debug**: Usar `@debug` para investigar problemas.

---

## Reglas de Commits Atómicos

Tras cada modificación exitosa, generar commits individuales por concepto (no agrupar cambios no relacionados):

Formato conventional commits:

- `feat [scope]: descripcion` - nueva funcionalidad
- `fix [scope]: descripcion` - corrección de bug
- `refactor [scope]: descripcion` - refactorización
- `upd [scope]: descripcion` - modificación de capa o ajuste
- `rem [scope]: descripcion` - eliminación
- `release [version]: descripcion` - release gitflow

---

## Bloques-Script Google Site Existentes

| Archivo | Prefijo | Descripción |
|---|---|---|
| `src/battle-survival-schedule.html` | `bs-` | Calendario semanal Battle Survival con counter en tiempo real |

---

## Datos Fuente (db/)

| Archivo | Descripción |
|---|---|
| `db/calendar-battle-survival.json` | Calendario semanal (42 slots, 6 por día) |
| `db/activity-battle-survival.json` | Actividades y objetivos de Battle Survival |
| `db/activity-duel-alliance.json` | Actividades y fases de Duel Alliance |

> Los datos en `db/` son la fuente de verdad. Al actualizar un bloque-script, sincronizar los datos embebidos con estos archivos.
