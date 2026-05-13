# MATERIA 2: JAVASCRIPT CORE Y AVANZADO (Motor V8 e Internals)
**(Parte 3: Niveles 71 al 100 - DOM Avanzado, Funcionalidad y Prototipos)**

---

## Nivel 71-75: Manipulación Avanzada del DOM y Rendimiento

**Objetivo del nivel:**
Dejar de usar el DOM como si fuera magia y entender el inmenso costo computacional que tiene modificar la pantalla. Aprender a mutar el HTML con la máxima eficiencia posible.

**Conceptos exactos:**
*   **DOM Tree y CSSOM:** Entender que el HTML que escribes se convierte en un árbol de objetos en memoria (Document Object Model) y el CSS en otro (CSS Object Model).
*   **Critical Rendering Path:** Los pasos que hace el navegador (Style, Layout, Paint, Composite) cada vez que cambias un píxel en la pantalla.
*   **Selectores Modernos:** Olvidar `getElementById` y usar `querySelector` y `querySelectorAll` (NodeList vs Array).
*   **Reflow y Repaint:** El pecado capital del Frontend. Causar que toda la página se recalcule porque cambiaste el ancho de un botón.
*   **DocumentFragment:** Una "caja invisible" en memoria RAM. Sirve para inyectarle 1000 elementos `<li>` sin tocar la pantalla, y luego meter la caja entera al DOM en una sola operación de renderizado.

**Ejercicios:**
1.  Usa un bucle `for` para crear 1000 elementos `div` y hacerles `document.body.appendChild()` uno por uno en cada vuelta.
2.  Refactoriza el código anterior usando `document.createDocumentFragment()`. Añade los 1000 divs al fragmento en el bucle, y fuera del bucle haz UN SOLO `appendChild` al body.
3.  Usa `console.time('Bucle Normal')` y `console.time('Fragment')` para medir la abismal diferencia de velocidad.

**Errores comunes:**
*   Leer una propiedad que fuerza el "Layout" (como `elemento.offsetHeight`) inmediatamente después de haber cambiado su estilo (`elemento.style.height = "100px"`), obligando al navegador a calcular todo dos veces.
*   Inyectar HTML directo con `.innerHTML += "..."` dentro de un bucle, destruyendo y recreando el DOM entero en cada iteración.

**Videos recomendados (Español):**
*   *Jon Mircha:* "DOM: Nodos, Elementos y Selectores" (Tiene una playlist entera del DOM espectacular).
*   *Midudev:* "Mejora el rendimiento manipulando el DOM con DocumentFragment".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 76-80: Propagación de Eventos (Event Bubbling & Delegation)

**Objetivo del nivel:**
Controlar cómo viajan los clicks y las teclas a través del código HTML. Aprender el patrón de arquitectura más importante para crear listas interactivas sin ahogar la RAM.

**Conceptos exactos:**
*   **Fase de Captura (Capturing):** El evento viaja desde el `window` bajando hasta el elemento objetivo (`target`).
*   **Fase de Burbujeo (Bubbling):** El evento "burbujea" desde el objetivo hacia arriba, pasando por todos sus padres hasta llegar al `window`.
*   **`event.target` vs `event.currentTarget`:** A quién le hiciste click exactamente (el hijo) vs quién tiene el listener (el padre).
*   **`event.stopPropagation()`:** Cortar el burbujeo para que el padre no se entere de que el hijo fue clickeado.
*   **Delegación de Eventos (Event Delegation):** El patrón maestro. En vez de poner 100 `addEventListener` a 100 botones de una lista, pones 1 SOLO listener en el contenedor padre (`<ul>`) y verificas a qué hijo se le hizo click usando `event.target.matches()`.

**Ejercicios:**
1.  Crea tres `divs` anidados (Abuelo > Padre > Hijo). Ponle un `click listener` a los 3. Haz click en el Hijo y observa cómo se imprimen los 3 mensajes por culpa del Bubbling.
2.  Crea un botón de "Generar Tarea" que inyecte un nuevo `<li>` a un `<ul>`. Implementa un botón de "Borrar" dentro de cada `<li>`. Usa **Delegación de Eventos** en el `<ul>` para borrar tareas, demostrando que funciona incluso para elementos que se crearon dinámicamente *después* de que el código cargó.

**Errores comunes:**
*   Asignar listeners dentro de bucles a elementos generados dinámicamente. Esto gasta RAM y causa "Memory Leaks" si los elementos se borran pero el listener queda activo en el navegador.

**Videos recomendados (Español):**
*   *Fazt:* "JavaScript Event Delegation (Delegación de Eventos)".
*   *Dorian Designs:* "DOM: Eventos, flujo de eventos y delegación".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 81-85: Web APIs de Almacenamiento (Persistencia Local)

**Objetivo del nivel:**
Que tu aplicación no pierda la memoria cuando el usuario recarga la página (F5).

**Conceptos exactos:**
*   **LocalStorage:** Guarda strings hasta 5MB. No expira nunca.
*   **SessionStorage:** Guarda strings. Expira y se borra cuando cierras la pestaña.
*   **Cookies:** Guarda poca data (4KB). Se envía automáticamente al servidor en CADA petición HTTP (Peligro de seguridad y rendimiento si se abusa).
*   **IndexedDB:** Una base de datos NoSQL completa dentro del navegador para guardar gigabytes de información offline (imágenes, archivos).
*   **Serialización JSON:** El localStorage SOLO acepta strings. Debes aprender a usar `JSON.stringify()` para guardar arrays/objetos, y `JSON.parse()` al extraerlos.

**Ejercicios:**
1.  Crea un "Modo Oscuro/Claro". Guarda la preferencia del usuario en el LocalStorage. Al recargar la página, lee esa preferencia y aplica la clase CSS correspondiente antes de que el usuario vea la pantalla en blanco.

**Mini proyectos:**
*   **"Carrito de Compras Persistente":** Un array de objetos (productos). Añade y quita productos. Asegúrate de sincronizar ese array con el LocalStorage en cada cambio para que sobreviva un cierre de navegador.

**Errores comunes:**
*   Intentar guardar un objeto directamente: `localStorage.setItem('user', {nombre: "juan"})`. El resultado será el infame string `"[object Object]"`.

**Videos recomendados (Español):**
*   *Carlos Azaustre:* "Cómo usar LocalStorage y SessionStorage".
*   *Jon Mircha:* "APIs REST: JSON (JavaScript Object Notation)".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 86-90: Módulos (ES Modules vs CommonJS)

**Objetivo del nivel:**
Dejar de escribir "código espagueti" de 5000 líneas en un archivo `main.js`. Aprender a dividir y encapsular tu arquitectura en pequeños bloques reutilizables.

**Conceptos exactos:**
*   **El problema global:** Antes, si importabas tres `<script>` en HTML, todos compartían las variables globales y se sobrescribían ("Namespace Pollution").
*   **CommonJS (`require` / `module.exports`):** El sistema clásico de Node.js (Síncrono, útil en servidores).
*   **ES Modules (`import` / `export`):** El estándar moderno absoluto (Asíncrono, usado en React, Next.js, Vite y Node moderno).
*   **Exportación Nombrada (Named Export):** Extraer varias funciones de un archivo (`import { sumar, restar } from './mate.js'`).
*   **Exportación por Defecto (Default Export):** Extraer una única clase o función principal (`import Usuario from './usuario.js'`).
*   **`<script type="module">`:** Requisito en el navegador para activar el modo estricto y la carga modular.

**Ejercicios:**
1.  Crea un archivo `math.js`. Exporta 4 funciones matemáticas.
2.  Crea `app.js`. Importa todas como un objeto gigante `import * as mates from './math.js'` y úsalas (`mates.sumar(2, 2)`).

**Errores comunes:**
*   Mezclar sintaxis de CommonJS y ES Modules en el mismo archivo de Node.js (causa explosión inmediata del compilador).
*   Olvidar la extensión `.js` en el import cuando trabajas en Vanilla JS puro en el navegador.

**Videos recomendados (Español):**
*   *Midudev:* "Módulos en JavaScript (ES Modules vs CommonJS)".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 91-95: Programación Funcional (Inmutabilidad y HOF)

**Objetivo del nivel:**
Escribir código de alto nivel. Aprenderás a tratar tus datos como tuberías de agua: entra un dato impuro, pasa por varios filtros inmutables, y sale un dato limpio, sin afectar nunca el origen.

**Conceptos exactos:**
*   **Funciones Puras (Pure Functions):** Si le pasas el mismo input `(2,2)`, siempre devolverá el mismo output `(4)`. Cero "Side Effects" (No tocan variables globales ni el DOM).
*   **Inmutabilidad:** Jamás modificar el array/objeto original. Siempre retornar una copia nueva.
*   **Higher Order Functions (HOF):** Ya vimos callbacks, ahora aplicados a iteradores nativos.
*   **`.map()`:** Transforma un array en otro array de exactamente la misma longitud.
*   **`.filter()`:** Devuelve un array más corto descartando los elementos que no cumplan la condición (`false`).
*   **`.reduce()`:** La función más temida. Aplasta un array entero en un ÚNICO valor (un número, un nuevo objeto, etc).
*   **Composición / Chaining:** Encadenar métodos: `array.filter().map().reduce()`.

**Ejercicios:**
1.  Tienes un array de números. Usa `filter` para sacar los impares, `map` para multiplicar los restantes por 10, y `reduce` para sumar el resultado total. (Todo en una sola cadena sin punto y coma intermedios).
2.  Usa `reduce` para contar cuántas veces se repite cada letra en un string y devolver un Objeto (Técnica super avanzada de conteo).

**Mini proyectos:**
*   **"Buscador E-Commerce Inmutable":** Dado un JSON masivo de productos, crea una barra de búsqueda, un filtro de categoría y un filtro de "En Stock". Toda la lógica debe fluir a través de `.filter()` y `.map()`, sin un solo bucle `for` y sin mutar el array original jamás.

**Errores comunes:**
*   Olvidar retornar (`return`) el valor dentro del callback de `.map()` o `.filter()` (recibiendo un array de `undefined`s).
*   Intentar usar `break` o `continue` dentro de un `.forEach` o `.map()` (no se puede, son funciones, no bucles nativos).

**Videos recomendados (Español / Inglés CC):**
*   *Beto Quiroga:* "Map, Filter y Reduce en JavaScript".
*   *Fun Fun Function (YouTube):* "Map - Part 2 of Functional Programming in JavaScript" (Inglés. Este canal es una reliquia histórica de oro para FP).

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 96-100: Prototype Chain y Herencia (El preludio a la POO)

**Objetivo del nivel:**
Entender cómo JavaScript "finge" ser un lenguaje Orientado a Objetos. En JS no existen las clases reales como en Java o C#, todo funciona a través de prototipos ocultos.

**Conceptos exactos:**
*   **El Prototipo Oculto (`__proto__` o `[[Prototype]]`):** Cada objeto en JS tiene un enlace interno a otro objeto.
*   **La Cadena de Prototipos (Prototype Chain):** Cuando llamas `array.push()`, el array no tiene ese método dentro. Lo busca en su padre `Array.prototype`. Si no lo halla, busca en `Object.prototype`. Si no lo halla, llega a `null` y da error.
*   **Funciones Constructoras (Constructor Functions):** Funciones antiguas con Mayúscula (ej. `function Persona()`) que se invocaban con la palabra `new` para generar objetos.
*   **`Object.create(proto)`:** La forma cruda de crear un objeto que herede directamente de otro objeto específico sin usar constructores.
*   **"Syntactic Sugar" de las Clases:** Entender que la palabra reservada `class` en JS (ES6) es solo un disfraz. Por debajo, sigue siendo una Función Constructora con un `Prototype`.

**Ejercicios:**
1.  Abre la consola del navegador. Crea un array vacío `const a = []`. Ábrelo y mira la propiedad `[[Prototype]]`. Expándela. Mira que tiene otro `[[Prototype]]` dentro. Investiga toda la cadena.
2.  Crea un objeto literal `animal = { vivo: true }`. Crea otro objeto `perro = Object.create(animal)`. Añádele `perro.ladra = true`. Haz un `console.log(perro.vivo)`. Entiende de dónde sacó la propiedad `vivo` a pesar de que "perro" no la tiene definida físicamente.

**Errores comunes:**
*   Creer que las clases de JS son iguales a las de Java (herencia de clase rígida). JS usa Herencia Prototípica (herencia de objetos a objetos, mucho más flexible y dinámica en tiempo de ejecución).
*   Añadir métodos directamente al objeto en lugar de añadirlos a la propiedad `.prototype` de la función constructora, gastando muchísima RAM (si creas 1000 usuarios, crearías 1000 copias del mismo método en memoria).

**Videos recomendados (Español):**
*   *Sacha Lifszyc:* "Prototipos en JavaScript".
*   *Midudev:* "Entiende los Prototipos de una vez por todas".

**Tiempo estimado:**
*   2 semanas (Es el concepto interno más denso del lenguaje).

---
*(Fin de la Materia 2. Tienes en tus manos el control absoluto de JavaScript vanilla y el motor V8. Si lo dominas, aprender React, Angular o Node será un paseo. Avísame cuando estés listo para la Materia 3: PROGRAMACIÓN ORIENTADA A OBJETOS Y PATRONES o FRONTEND HTML/CSS).*
