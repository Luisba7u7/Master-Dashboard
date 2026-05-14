# MATERIA 11: SCRUM Y METODOLOGÍAS ÁGILES
**(Parte 2: Niveles 51 al 100 - Ceremonias, Tableros Jira y Estimación de Tiempo)**

---

## Nivel 51-60: Las 4 Ceremonias Sagradas (El Latido del Corazón)

**Objetivo del nivel:**
Aprender la rutina de trabajo. Si trabajas con Scrum, estas reuniones estarán agendadas en tu calendario de Google para el resto de tu vida profesional.

**Conceptos exactos:**
*   **El Sprint:** El contenedor de todas las ceremonias. Dura usualmente de 2 a 4 semanas máximo. En el Sprint, el tiempo se detiene y nada entra ni sale.
*   **1. Sprint Planning (¿Qué haremos y cómo?):** Reunión al inicio del Sprint. El equipo mira el *Product Backlog* con el PO, toma las Historias más importantes, se debate CÓMO se programarán y se meten al *Sprint Backlog*.
*   **2. Daily Scrum (Sincronización de 15 min):** Una mini-reunión todos los días a la misma hora, de pie. Solo respondes: ¿Qué hice ayer? ¿Qué haré hoy? ¿Tengo bloqueos? (No es para justificar tus horas al jefe, es para organizarse).
*   **3. Sprint Review (La Demo):** Al terminar el Sprint, invitan a los "Stakeholders" (Clientes, Directores) y les muestras el software real funcionando. Te dan feedback.
*   **4. Sprint Retrospective (Terapia de Pareja):** Reunión secreta solo para el equipo (Sin clientes ni jefes). ¿Qué salió bien en este Sprint? ¿Qué nos molestó? (Ej. "El servidor de pruebas estuvo caído 3 días, hay que arreglar eso"). ¿Cómo mejoramos para el siguiente?

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 61-70: Estimación Ágil y el Planning Poker

**Objetivo del nivel:**
El error más grande de los Juniors es prometer "Termino este ticket en 4 horas", y luego tardar 3 días por un bug inesperado. Scrum prohibe estimar en horas.

**Conceptos exactos:**
*   **Story Points (Puntos de Historia):** En lugar de medir Tiempo, mides *Esfuerzo, Complejidad e Incertidumbre*. (No mides en litros de agua, mides en tamaños de camiseta: S, M, L, XL).
*   **La Secuencia de Fibonacci:** Las cartas de estimación no son 1, 2, 3, 4, 5. Son 1, 2, 3, 5, 8, 13, 21. Si una tarea es más compleja que un 8, salta drásticamente al 13 para representar que la "incertidumbre crece rápido".
*   **Planning Poker:** El "juego" de cartas. El Product Owner lee una Historia ("Hacer el Login con Google"). Los programadores piensan en silencio y revelan su carta al mismo tiempo.
    *   Si Juan saca un 3 y María saca un 13, discuten. María dice "Ojo, la base de datos es súper vieja y no soporta OAuth", Juan se da cuenta del error, y llegan a un consenso (Ej. un 8).

**Tiempo estimado:**
*   1 semana.

---

## Nivel 71-80: Métricas Ágiles (Midiendo el éxito)

**Objetivo del nivel:**
Entender cómo los Scrum Masters saben si el equipo es rentable y si terminarán a tiempo sin presionar a los programadores.

**Conceptos exactos:**
*   **Velocity (Velocidad):** La suma total de los Puntos de Historia que el equipo es capaz de completar en un Sprint normal. Si en el Sprint 1 completan 40 puntos, en el Sprint 2 completan 42 puntos, y en el Sprint 3 completan 38 puntos, la Velocidad promedio es 40 puntos.
*   **El Poder de la Velocidad:** Si el Backlog total tiene 400 puntos, y el equipo tiene una Velocidad de 40 puntos por Sprint... sabes matemáticamente que el proyecto terminará en 10 Sprints. Sin adivinar fechas.
*   **Burndown Chart:** Una gráfica en diagonal hacia abajo que te muestra cuántos puntos faltan para terminar el Sprint actual y si van a lograr llegar a la meta.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 81-90: Jira, Trello y el Tablero Kanban

**Objetivo del nivel:**
Manejar la herramienta digital por la que te comunicas todo el día en tu trabajo.

**Conceptos exactos:**
*   **El Tablero Visual:** Donde viven tus "Tickets" (Historias de Usuario).
*   **Las Columnas Básicas:**
    *   `To Do / Backlog` (Tareas por hacer).
    *   `In Progress` (Lo que estás programando hoy. *Regla de Oro:* Un programador nunca debe tener más de 1 tarea en Progreso. El multitasking mata el software).
    *   `In Review` (Código terminado pero que está siendo revisado por un compañero en GitHub).
    *   `In QA / Testing` (Los analistas de calidad lo están intentando romper).
    *   `Done` (Desplegado en producción).
*   **La Disciplina:** Como Junior, tu mayor responsabilidad hacia tu equipo es mover tus tarjetas en Jira TODOS LOS DÍAS antes de la Daily, para que todos sepan en qué estado está tu trabajo sin tener que preguntarte.

**Ejercicios finales:**
1.  Abre una cuenta gratuita en **Trello** o **Jira**. Crea un proyecto para tus estudios de programación.
2.  Crea columnas de "To Do", "In Progress" y "Done".
3.  Crea tickets para tus próximas sesiones de estudio y usa el tablero religiosamente durante un mes.

**Tiempo estimado:**
*   Práctica diaria.

---

## Nivel 91-100: Scrum a Gran Escala y los Anti-Patrones (Agile Theater)

**Objetivo del nivel:**
Conocer el lado oscuro. Muchas empresas dicen ser "Agile", pero en realidad es un caos disfrazado. Aprender a detectarlo en entrevistas de trabajo.

**Conceptos exactos:**
*   **Scrum a gran escala (SAFe / LeSS):** Scrum está diseñado para equipos de 3 a 9 personas. ¿Qué haces si Facebook tiene 5,000 programadores? Usas el patrón "Scrum de Scrums" (Los representantes de cada equipo se reúnen).
*   **Agile Theater (Teatro Ágil):** Empresas que siguen trabajando en el obsoleto Cascada (Waterfall), pero le cambiaron los nombres para verse modernos. Siguen haciendo documentación de 500 páginas, el Jefe te grita si no terminas en "2 horas", pero ahora tienen una reunión de 15 minutos en la mañana a la que llaman "Daily".
*   **Water-Scrum-Fall:** Planifican en Cascada, programan usando "Sprints de Scrum" estresantes, y despliegan a producción 6 meses después en formato Cascada. Es el anti-patrón más común de la industria corporativa.

**Tiempo estimado:**
*   Lectura final de concientización.

---
*(Fin de la Materia 11: SCRUM Y METODOLOGÍAS ÁGILES).*
**(¡El Roadmap ha sido completamente reconstruido, separado y maximizado! Estás armado hasta los dientes).*
