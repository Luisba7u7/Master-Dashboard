# MATERIA 4: GIT Y GITHUB
**(Parte 1: Niveles 0 al 50 - Los 3 Árboles, Ramas y Viajes en el Tiempo)**

---

## Nivel 0-10: El Guardián del Tiempo y los 3 Árboles

**Objetivo del nivel:**
Entender por qué no guardamos archivos como "proyecto_final_FINAL_v3.js". Comprender la arquitectura interna de Git antes de escribir el primer comando.

**Conceptos exactos:**
*   **¿Qué es Git?** Un Sistema de Control de Versiones Distribuido (VCS). No es "la nube" (eso es GitHub). Es un programa que corre localmente en tu computadora.
*   **Los 3 Árboles de Git (Arquitectura Core):**
    1.  *Working Directory (El Taller):* Tus archivos reales actuales en la computadora. Donde cortas, pegas y modificas.
    2.  *Staging Area (La Zona de Carga / Index):* El pasillo donde preparas las cajas antes de enviarlas por correo. Seleccionas qué cambios específicos quieres guardar.
    3.  *El Repositorio (La Bóveda / HEAD):* El historial permanente y congelado. Una vez que entra aquí, es casi indestructible.
*   **El flujo mental:** Modificas en el Taller -> Mueves a la Zona de Carga -> Tomas una Fotografía permanente en la Bóveda.

**Ejercicios:**
1.  Crea una carpeta en tu computadora. Ábrela en la terminal y ejecuta `git init`. Revela las carpetas ocultas en tu sistema operativo y entra a la carpeta mágica `.git`. Ese es el "cerebro". No lo toques a mano nunca.

**Tiempo estimado:**
*   3 días.

---

## Nivel 11-20: Comandos Atómicos (`add`, `commit`, `log`)

**Objetivo del nivel:**
Saber cómo mover tus archivos a través de los 3 Árboles usando la terminal.

**Conceptos exactos:**
*   **`git status`:** El comando que usarás 100 veces al día. Te dice exactamente en qué Árbol está cada archivo (Rojo = Working Directory, Verde = Staging Area).
*   **`git add <archivo>`:** Pasa un archivo rojo al estado verde (Lo mete a la Zona de Carga).
    *   *Peligro:* Usar `git add .` (agrega TODO) a ciegas es un mal hábito junior. Añade basura o archivos de contraseñas si no tienes cuidado.
*   **`git commit -m "mensaje"`:** Toma la Fotografía de la Zona de Carga y la mete a la Bóveda. Genera un Hash (un ID alfanumérico largo y único, ej. `a1b2c3d`).
*   **`git log`:** Muestra el historial de todas las fotografías. Usa `git log --oneline` para leerlo rápido y limpio.

**Ejercicios:**
1.  Crea un archivo `index.html`. Haz `git status`. Haz `git add`. Vuelve a hacer `git status`. Haz el `commit` con un mensaje descriptivo. Revisa el `git log`.

**Tiempo estimado:**
*   4 días.

---

## Nivel 21-30: Universos Paralelos (Ramas y Merges)

**Objetivo del nivel:**
Poder crear una nueva funcionalidad (feature) experimental sin romper el código principal que ya funciona.

**Conceptos exactos:**
*   **¿Qué es una Rama (Branch)?** Una etiqueta móvil que apunta a un Commit específico. Por defecto, existe una rama llamada `main` o `master`.
*   **Crear y Viajar:** `git branch nueva-feature` (Crea el universo paralelo) y `git switch nueva-feature` (o `checkout`). Te transporta a esa línea temporal.
*   **El HEAD:** Es el apuntador que dice "Tú estás parado exactamente aquí ahora mismo".
*   **`git merge <rama>`:** Fusionar dos universos. Estás parado en `main`, y absorbes a la rama `nueva-feature`.
    *   *Fast-forward Merge:* Si `main` no tuvo cambios nuevos, Git solo mueve la etiqueta hacia adelante.
    *   *3-way Merge:* Si ambos universos sufrieron cambios diferentes, Git crea un "Commit de Fusión" especial uniendo ambas líneas.

**Ejercicios:**
1.  Estando en `main`, crea y salta a la rama `modo-oscuro`. Haz 2 commits ahí.
2.  Vuelve a `main` (observa cómo tu código de modo oscuro DESAPARECE mágicamente de tu computadora, no te asustes).
3.  Haz `git merge modo-oscuro`. Observa cómo tu código vuelve al unirse.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 31-40: Viajes en el Tiempo y el Modo Pánico

**Objetivo del nivel:**
Poder saltar al pasado a revisar código antiguo, entender por qué Git a veces te asusta con mensajes en rojo, y aprender a escapar.

**Conceptos exactos:**
*   **Viaje de Inspección:** `git checkout <hash-del-commit-viejo>`. Tu código entero retrocede en el tiempo a hace 3 meses.
*   **Detached HEAD (Cabeza Separada):** El estado aterrador en el que caes al viajar al pasado. Significa que NO estás en ninguna rama, estás flotando en el vacío. Si haces un commit aquí, y luego te vas, ese commit se perderá para siempre en la basura.
*   **El Regreso al Presente:** Para escapar del Detached HEAD y volver al presente seguro, simplemente haz `git switch main`.

**Ejercicios:**
1.  Usa `git log` y copia el hash de tu PRIMER commit.
2.  Viaja a él usando `git checkout <hash>`. Lee la advertencia de Detached HEAD.
3.  Vuelve al presente con `git switch main`.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 41-50: Deshacer Errores (La Trinidad del `reset`)

**Objetivo del nivel:**
Si el `commit` es una fotografía, el `reset` es la máquina de borrar memoria de los Hombres de Negro. Cómo arreglar catástrofes locales.

**Conceptos exactos:**
*   **`git reset <hash>`:** Le dice al HEAD que retroceda en el tiempo y "borre" los commits recientes del historial. Pero, ¿qué hace con los archivos físicos en tu computadora?
*   **1. `git reset --soft`:** Viaja al pasado, pero deja los archivos físicos intactos y *los pone en la Zona de Carga (Staging)* listos para un nuevo commit. (Útil para reescribir un mal mensaje de commit).
*   **2. `git reset --mixed` (Por defecto):** Viaja al pasado, deja los archivos intactos, pero los saca de la Zona de Carga (los pone en rojo en el Working Directory).
*   **3. `git reset --hard` (DESTRUCTIVO):** La bomba nuclear. Viaja al pasado y DESTRUYE físicamente todos los archivos y cambios en tu computadora que se hayan hecho después de ese momento. No hay botón de deshacer fácil para esto.

**Ejercicios:**
1.  Haz un archivo que diga "CONTRASEÑA: 123", hazle `add` y `commit`.
2.  Mátalo usando `git reset --hard HEAD~1` (Regresa un commit al pasado destruyendo todo a su paso).

**Tiempo estimado:**
*   1 semana.

---
*(Fin de la Parte 1. Ya controlas Git localmente como un profesional. Avísame y lanzamos la Parte 2: GitHub, Conflictos y Trabajo en Equipo).*
