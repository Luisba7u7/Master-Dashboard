# MATERIA 3.2: CSS3 Y ARQUITECTURA VISUAL
**(Parte 1: Niveles 0 al 50 - Del Box Model a los Layouts Bidimensionales)**

---

## Nivel 0-10: Selectores, Modelo de Caja y el Reset Universal

**Objetivo del nivel:**
Entender la geometría de la web. Todo en CSS es un rectángulo invisible. Si no dominas el modelo de caja, jamás podrás centrar un elemento sin adivinar.

**Conceptos exactos:**
*   **Selectores Core:** Elemento (`div`), Clase (`.tarjeta`), ID (`#header`), Universal (`*`), Atributo (`[type="text"]`).
*   **El Modelo de Caja (Box Model):** El concepto de que cada elemento tiene 4 capas: `Content` (El texto/imagen) -> `Padding` (Relleno interior) -> `Border` (Línea límite) -> `Margin` (Espacio exterior empujando a los vecinos).
*   **El Defecto Mortal (`content-box`):** Por defecto, si a un div de 100px de ancho le pones 20px de padding, el div crecerá a 140px, rompiendo tu diseño.
*   **El Reset Universal:** La primera regla que TODO archivo CSS debe tener para arreglar las matemáticas del navegador:
    ```css
    * {
      box-sizing: border-box; /* El padding se come hacia adentro, no hacia afuera */
      margin: 0;
      padding: 0;
    }
    ```
*   **Colapso de Márgenes (Margin Collapse):** El dolor de cabeza donde el `margin-bottom` de un título se "fusiona" con el `margin-top` del párrafo siguiente en lugar de sumarse. Solo ocurre verticalmente.

**Ejercicios:**
1.  Dibuja 3 cuadrados de colores en tu HTML. Ponles diferentes bordes, paddings y márgenes. Abre las DevTools (F12) en Chrome, ve a "Computed", y observa el diagrama de caja de colores para entender cuánto mide realmente cada capa.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 11-20: Especificidad y la Cascada (Matemáticas CSS)

**Objetivo del nivel:**
Dejar de usar la bomba destructiva `!important`. Entender exactamente por qué el navegador decidió que tu botón sea rojo cuando tú querías que fuera azul.

**Conceptos exactos:**
*   **La Cascada:** Si dos reglas tienen el mismo peso, gana la que está escrita más abajo en el archivo CSS. (El código lee de arriba a abajo).
*   **Especificidad (El Sistema de Puntos):**
    *   Etiqueta (`div`) = 1 punto.
    *   Clase (`.btn`) = 10 puntos.
    *   ID (`#nav`) = 100 puntos.
    *   Estilo en línea (`style="..."`) = 1000 puntos.
*   **Cálculo Mental:** Un selector `header .nav-link:hover` vale 1 + 10 + 10 = 21 puntos. Un selector `#main-menu a` vale 100 + 1 = 101 puntos. El segundo siempre le ganará al primero, sin importar dónde se escriba.
*   **Herencia:** Algunas propiedades "atraviesan" a los hijos sin necesidad de código (ej. `color`, `font-family`). Otras JAMÁS se heredan (ej. `border`, `padding`). (Uso de la palabra clave `inherit` para forzar herencia).

**Ejercicios:**
1.  Haz un test matemático de especificidad: Tienes un `<p class="texto" id="mi-texto" style="color: blue">`. Crea reglas en tu CSS para `p` (rojo), para `.texto` (verde) y para `#mi-texto` (naranja). Adivina quién ganará, quita los estilos en línea y observa cómo cambia el "ganador".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-30: Posicionamiento Puro y el Eje Z

**Objetivo del nivel:**
Arrancar a los elementos del flujo normal de lectura y ponerlos exactamente donde tú quieres en la pantalla, manejando la profundidad y la superposición.

**Conceptos exactos:**
*   **Normal Flow:** Cómo los elementos caen en la página por defecto (de arriba a abajo, de izquierda a derecha).
*   `position: static`: El estado natural. No acepta `top` ni `left`.
*   `position: relative`: Se mueve en relación a donde *debería* haber estado originalmente. Crea un "hueco fantasma" en su posición original.
*   `position: absolute`: **MAGIA PURA.** El elemento vuela fuera del documento. Se posiciona relativo a su ancestro más cercano que tenga un position diferente a static. (El patrón OBLIGATORIO: `Padre relative / Hijo absolute`).
*   `position: fixed`: Se ancla a la ventana de la pantalla. No se mueve aunque hagas scroll (Ej. Navbars pegajosas o Botones de WhatsApp flotantes).
*   `position: sticky`: Híbrido. Se comporta normal hasta que el scroll toca el borde, y entonces se transforma en `fixed`.
*   **Contextos de Apilamiento (Z-Index):** Por qué a veces un `z-index: 9999` pierde contra un `z-index: 1`. (Regla: El Z-Index solo compite dentro de hermanos del mismo padre. Si tu padre tiene Z-Index 1, jamás le ganarás a un elemento cuyo padre tiene Z-Index 2).

**Ejercicios:**
1.  Crea un "Tooltip" (Un globo de texto que aparece encima de un icono). Debes poner al contenedor en `relative` y al tooltip en `absolute`, y moverlo con `top: -30px`.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 31-40: Flexbox (Layout en 1 Dimensión)

**Objetivo del nivel:**
Olvidar para siempre el infernal `float: left`. Dominar la alineación vertical y horizontal en una sola línea de código.

**Conceptos exactos:**
*   **El Eje de Poder:** Al poner `display: flex` al PADRE, este gana el control total sobre sus hijos directos (Items).
*   **Dirección:** `flex-direction: row` (Eje principal horizontal) vs `flex-direction: column` (Eje principal vertical).
*   **Alineación del Padre:**
    *   `justify-content`: Alinea los hijos a lo largo del Eje Principal (Main Axis).
    *   `align-items`: Alinea los hijos a lo largo del Eje Transversal (Cross Axis). (El truco mágico para centrar verticalmente).
*   **Comportamiento de los Hijos:**
    *   `flex-grow`: Cuántas "porciones" de espacio sobrante se come este hijo.
    *   `flex-shrink`: Cuánto espacio cede este hijo si la pantalla se hace pequeña.
    *   `flex-basis`: El tamaño "ideal" antes de aplicar el grow o shrink (mejor que usar `width`).
*   **Wrapping:** `flex-wrap: wrap` para que los elementos salten a la siguiente línea en pantallas pequeñas en lugar de aplastarse y desbordar.

**Ejercicios (Innegociable):**
1.  Busca y termina el juego web gratuito **"Flexbox Froggy"** al 100%. No pases al Nivel 41 sin haberlo terminado.
2.  Céntrame un div en medio de toda tu pantalla usando exactamente 3 líneas de código Flex en el body.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 41-50: Grid Layout (Layout en 2 Dimensiones)

**Objetivo del nivel:**
El Jefe Final del posicionamiento CSS. Si Flexbox es una cuerda, Grid es una cuadrícula de ajedrez completa. Sirve para construir la macro-arquitectura de la página entera.

**Conceptos exactos:**
*   **La Cuadrícula del Padre:** `display: grid`. Defines cuántas pistas tienes usando `grid-template-columns` y `grid-template-rows`.
*   **La Fracción (`fr`):** La unidad de medida de Grid que dice "1 porción del espacio libre". Ej: `1fr 2fr 1fr` crea 3 columnas donde la de en medio es el doble de ancha.
*   **Grid Template Areas:** La técnica más legible del mundo. Dibujas tu web usando strings.
    ```css
    grid-template-areas:
      "header header header"
      "sidebar main main"
      "footer footer footer";
    ```
*   **Posicionamiento de los Hijos:** Cómo decirle a un hijo que ocupe 2 columnas (`grid-column: span 2`) o que empiece en la línea 1 y termine en la 3 (`grid-column: 1 / 3`).
*   **El superpoder Responsivo (Sin Media Queries):** `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`. Esta línea mágica hace que las tarjetas de un E-commerce se reacomoden solas dependiendo de si estás en un celular, tablet o monitor gigante.

**Ejercicios (Innegociable):**
1.  Busca y termina el juego web gratuito **"Grid Garden"** al 100%.
2.  Replica el layout principal de Youtube (Sidebar a la izquierda, barra de búsqueda arriba, y una cuadrícula de videos responsiva en el centro). Usa CSS Grid para todo.

**Tiempo estimado:**
*   1.5 semanas.

---
*(Fin de la Parte 1 de CSS3. Ahora sabes poner los bloques en su lugar exacto. Avísame y lanzamos la Parte 2: Arquitectura, Responsive Design, Animaciones y Preprocesadores).*
