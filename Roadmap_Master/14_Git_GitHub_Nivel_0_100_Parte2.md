# MATERIA 4: GIT Y GITHUB
**(Parte 2: Niveles 51 al 100 - Servidores Remotos, Conflictos y Flujos Empresariales)**

---

## Nivel 51-60: GitHub y los Repositorios Remotos

**Objetivo del nivel:**
Conectar tu computadora local con los servidores de Microsoft (GitHub) para poder colaborar con otros programadores alrededor del mundo.

**Conceptos exactos:**
*   **¿Qué es un Remoto?** Simplemente una copia de tu Bóveda (Repositorio) guardada en una computadora de alguien más (Ej. `origin` es el nombre estándar que se le da a la URL de GitHub).
*   **`git push origin main`:** Empujar tus commits locales al servidor de GitHub.
*   **`git fetch` vs `git pull`:**
    *   `fetch`: Va a GitHub, descarga los commits de tus compañeros y los pone en una zona segura sin tocar tus archivos físicos para que puedas "mirarlos" primero.
    *   `pull`: Ejecuta un `fetch` y automáticamente después ejecuta un `merge` para fusionar el código de tus compañeros con el tuyo.
*   **`git clone`:** Descargar un proyecto entero de internet. Automáticamente configura el `origin` por ti.

**Ejercicios:**
1.  Crea un repositorio vacío en GitHub.
2.  Usa el comando `git remote add origin <URL>` en tu proyecto local para conectarlos.
3.  Haz tu primer `git push -u origin main`.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 61-70: Resolución de Conflictos (Merge Conflicts)

**Objetivo del nivel:**
Sobrevivir al momento más temido por los Juniors. Qué pasa cuando tú y tu compañero editan exactamente la misma línea de código al mismo tiempo.

**Conceptos exactos:**
*   **El Conflicto:** Si haces `pull` y Git se detiene mostrando la palabra `CONFLICT`, no entres en pánico. Git no borrará nada, simplemente está pidiendo tu ayuda humana para decidir qué código gana.
*   **Leyendo el Diff (Los marcadores de conflicto):**
    ```html
    <<<<<<< HEAD
    <h1>Título Azul (Lo que tenías tú)</h1>
    =======
    <h1>Título Rojo (Lo que subió tu compañero)</h1>
    >>>>>>> commit-de-tu-compañero
    ```
*   **La Resolución:** Abres VS Code, buscas esos símbolos extraños, borras los `<` `=` `>`, y dejas solo el código que quieres que sobreviva. Luego haces un simple `git add` y `git commit` para sellar la paz.

**Ejercicios:**
1.  Crea un conflicto a propósito. Crea dos ramas diferentes, edita la línea 1 del mismo archivo en ambas ramas con textos distintos, y luego intenta hacerles `merge`. Resuélvelo en VS Code.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 71-80: Reescritura de la Historia Avanzada

**Objetivo del nivel:**
El control absoluto. Alterar la línea temporal antes de enviarla a la nube para que tu historial luzca perfecto y limpio frente a tu jefe.

**Conceptos exactos:**
*   **`git commit --amend`:** ¿Olvidaste agregar un archivo o te equivocaste en el mensaje del ÚLTIMO commit? Haces el cambio, lo agregas al stage, y en lugar de hacer un commit nuevo, usas `--amend` para fusionarlo con el anterior como si nada hubiera pasado.
*   **`git rebase` (Rebasar):** La alternativa "limpia" al Merge. En lugar de crear un commit de fusión ruidoso, el rebase "desconecta" tu rama, la mueve al frente de los cambios de tu compañero, y la vuelve a pegar en una línea recta perfecta.
*   **El Peligro Nuclear de `--force` (`-f`):** Si usas `--amend` o `rebase`, estás alterando la historia. Si intentas hacer un `push` a GitHub, GitHub te rechazará diciendo que las historias no coinciden. Deberás usar `git push --force` para obligar a GitHub a destruir su versión y aceptar la tuya. **NUNCA hagas `--force` en la rama `main` compartida con otros, o destruirás el trabajo del equipo entero.**

**Videos recomendados:**
*   *Midudev:* "Git Rebase Explicado".

**Tiempo estimado:**
*   2 semanas (Requiere mucha práctica visual).

---

## Nivel 81-90: Herramientas Quirúrgicas (Stash y Cherry-Pick)

**Objetivo del nivel:**
Tácticas de guerrilla para problemas específicos del día a día.

**Conceptos exactos:**
*   **`git stash` (Guardar en el bolsillo):** Estás programando a medias, el código no compila. Te llama el jefe: "¡Arregla este bug en la rama main urgente!". No puedes cambiar de rama porque tus archivos están sucios y no quieres hacer un commit de código roto. Haces `git stash`. Git esconde todos tus cambios actuales, dejando tu directorio limpio. Vas, arreglas el bug, vuelves a tu rama, y haces `git stash pop` para recuperar tu código a medias.
*   **`git cherry-pick <hash>` (Robar Commits):** Un compañero subió 10 commits a su rama, pero tú solo necesitas exactamente el commit número 4 que tiene un componente que necesitas usar. Estando en tu rama, haces `cherry-pick <hash-del-commit-4>`. Git crea una copia exacta de ese commit en tu universo.

**Ejercicios:**
1.  Ensuciar el código, usar `stash`, cambiar de rama a ver que está limpio, volver y usar `stash pop`.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 91-100: Flujos de Trabajo (Pull Requests y GitFlow)

**Objetivo del nivel:**
Comprender las leyes corporativas. En una empresa, NUNCA tienes permiso para hacer un `push` directamente a la rama `main`.

**Conceptos exactos:**
*   **El Pull Request (PR):** El proceso social. Tú empujas tu rama a GitHub (`git push origin feature-login`). Luego entras a la web de GitHub y creas una solicitud ("Por favor, revisen mi código y mézclenlo con main").
*   **Code Review:** Tus compañeros comentan línea por línea en GitHub ("Cambia este nombre de variable", "Falta test"). Hasta que no te aprueben el PR (Approve), el botón verde de "Merge" estará bloqueado.
*   **GitFlow / GitHub Flow:** Las estrategias empresariales.
    *   *Main:* Solo código de producción, 100% estable.
    *   *Develop / Staging:* El patio de recreo para juntar todo antes de la salida a producción.
    *   *Feature Branches:* Donde ocurren los milagros (`feature/login`, `feature/cart`).

**Práctica Final:**
1.  Haz un clon de un repositorio de un amigo. Crea una rama, haz un cambio, súbelo y hazle un Pull Request (PR). Pídele que revise tu código y lo apruebe.

**Tiempo estimado:**
*   2 semanas (Simulación en equipo o proyectos Open Source).

---
*(Fin de la Materia 4: GIT Y GITHUB. Estás protegido contra desastres y listo para unirte a empresas con 500+ programadores trabajando en el mismo código base).*
