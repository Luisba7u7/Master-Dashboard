# MATERIA 2: JAVASCRIPT CORE Y AVANZADO (Motor V8 e Internals)
**(Parte 2: Niveles 41 al 70 - Asincronismo, Event Loop y Concurrencia)**

---

## Nivel 41-45: El Event Loop (Cola de Tareas y Web APIs)

**Objetivo del nivel:**
Desmitificar cómo JavaScript, siendo un lenguaje de un solo hilo (Single-Threaded), puede hacer múltiples cosas "a la vez" sin congelar el navegador. Este es el corazón de Node.js y JS en la web.

**Conceptos exactos:**
*   **Single Thread:** Entender que V8 solo tiene 1 Call Stack (Pila de Llamadas). Solo puede ejecutar 1 instrucción a la vez.
*   **Web APIs (Navegador) / C++ APIs (Node):** JS delega el trabajo pesado (timers, peticiones de red HTTP, geolocalización) al navegador. Las Web APIs corren en hilos separados usando C++.
*   **Macrotasks (Task Queue):** La cola donde esperan los callbacks de cosas como `setTimeout` o eventos del mouse.
*   **Microtasks (Microtask Queue):** La cola VIP. Aquí van las Promesas y el MutationObserver. Tiene prioridad absoluta sobre las Macrotasks.
*   **El Event Loop:** El vigilante eterno. Si el Call Stack está vacío, el Event Loop toma lo primero de la Microtask Queue y lo mete al Stack. Si esta vacía, toma de la Macrotask Queue.

**Ejercicios:**
1.  **El ejercicio definitivo de entrevistas:** Escribe un script con un `console.log("1")`, un `setTimeout(() => console.log("2"), 0)`, una Promesa `Promise.resolve().then(() => console.log("3"))`, y un `console.log("4")`.
2.  Predice el orden exacto de impresión en papel ANTES de correr el código en la consola. (Spoiler: 1, 4, 3, 2). Explica el porqué en voz alta.

**Errores comunes:**
*   Creer que `setTimeout(callback, 3000)` garantiza que se ejecute a los 3 segundos. Falso: garantiza que el callback ENTRARÁ a la cola en 3 segundos, pero si el Call Stack está ocupado con un bucle gigante, podría tardar 10 segundos en ejecutarse.

**Qué dominar antes de avanzar:**
*   Poder explicar cómo el V8, las Web APIs, la Cola de Tareas y el Call Stack interactúan entre sí gráficamente.

**Videos recomendados (Español / Inglés CC OBLIGATORIO):**
*   *Philip Roberts (JSConf):* "What the heck is the event loop anyway?" (Inglés con CC - **Este video es legendario, debes verlo sí o sí**).
*   *Midudev:* "Entiende el Event Loop en JavaScript".
*   *Jon Mircha:* "Asincronía y el Event Loop".

**Tiempo estimado:**
*   1 a 2 semanas.

---

## Nivel 46-50: Callbacks y el Inversion of Control (IoC)

**Objetivo del nivel:**
Aprender la forma original en la que JavaScript manejaba el asincronismo (antes de 2015), entender sus fallas mortales y por qué evolucionamos a Promesas.

**Conceptos exactos:**
*   **Callback:** Una función que pasas a otra función para que sea ejecutada *en el futuro* cuando una tarea asíncrona termine.
*   **Inversion of Control:** El problema de confiar ciegamente en una librería externa. Si le pasas un callback a una API de terceros, confías en que ellos la ejecutarán exactamente una vez. Si la API falla y la ejecuta dos veces (ej. un pago), estás arruinado.
*   **Callback Hell (Pyramid of Doom):** Cuando tienes tareas asíncronas que dependen unas de otras, y terminas anidando código en forma de flecha `>`.

**Ejercicios:**
1.  Crea tres funciones simuladas con `setTimeout` (Simulando bajada de datos): `obtenerUsuario()`, `obtenerPosts(usuario)`, `obtenerComentarios(post)`.
2.  Ejecútalas en orden usando Callbacks (notarás la creación del Callback Hell).

**Mini proyectos:**
*   **"Simulador de Descarga en Cadena":** Crea un script en consola que simule descargar un archivo en 3 partes. "Descargando parte 1... (espera 2s)", luego "Descargando parte 2... (espera 1s)". Hazlo puramente con callbacks.

**Errores comunes:**
*   No manejar errores (`try/catch` NO funciona de forma síncrona para capturar errores de un callback asíncrono; se usaba el patrón Error-First Callbacks en Node).

**Videos recomendados (Español):**
*   *Fazt:* "Callbacks en Javascript".
*   *Sacha Lifszyc:* "Asincronismo en JavaScript: Callbacks".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 51-55: Promesas Bajas (Promises)

**Objetivo del nivel:**
La revolución de ES6. Las Promesas devuelven el "Control" a tu código, representando un valor que puede estar disponible ahora, en el futuro, o nunca.

**Conceptos exactos:**
*   **Anatomía:** `new Promise((resolve, reject) => { ... })`.
*   **Los 3 Estados:** `Pending` (Pendiente), `Fulfilled` (Resuelta exitosamente), `Rejected` (Rechazada con error).
*   **Inmutabilidad del Estado:** Una vez que una promesa pasa a resuelta o rechazada, se "congela". Ya no puede cambiar de estado (a diferencia de los callbacks que podían ejecutarse múltiples veces).
*   **Métodos de Consumo:** `.then()` (para el resolve), `.catch()` (para el reject), `.finally()` (se ejecuta siempre, ideal para quitar *Loaders* de la pantalla).
*   **Encadenamiento (Chaining):** Cómo devolver una nueva promesa dentro de un `.then()` para evitar el Callback Hell.

**Ejercicios:**
1.  Refactoriza tu ejercicio de "Simulador de Descarga en Cadena" del nivel anterior. Pásalo de Callbacks a Promesas devolviendo nuevas Promesas y encadenando `.then()`.

**Mini proyectos:**
*   **"Cajero de Pagos Falso":** Crea una función que devuelva una promesa simulando un pago bancario con 50% de probabilidad de fallar (usando `Math.random()`). Si falla, haz un `reject("Saldo insuficiente")`. Captura ese error limpiamente con un `.catch()` en consola.

**Errores comunes:**
*   Crear una "Promisificación" anidada (Promise Hell). Si pones un `.then()` dentro de otro `.then()` sin retornarlo hacia el hilo principal, sigues haciendo Callback Hell pero con otra sintaxis.
*   Olvidar poner el `.catch()` al final de una cadena larga. Si hay un error, el motor lanzará un "Unhandled Promise Rejection".

**Videos recomendados (Español):**
*   *Midudev:* "Promises en JavaScript".
*   *Fernando Herrera:* "Promesas, resolve, reject".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 56-60: Métodos Concurrentes de Promesas

**Objetivo del nivel:**
Optimizar la velocidad de la web. ¿Para qué esperar a que cargue el Usuario, para luego cargar los Artículos, si puedes disparar ambas peticiones a la red *al mismo tiempo*?

**Conceptos exactos:**
*   **`Promise.all(arregloDePromesas)`:** Espera a que TODAS terminen para devolver un array de resultados. ¡Si UNA falla, todo explota (falla rápido)! Útil para dependencias críticas.
*   **`Promise.race()`:** Devuelve el resultado de la PRIMERA promesa en terminar (sea éxito o error). Útil para hacer "Timeouts" (Hacer que compita una petición a una API vs un `setTimeout` de 5 segundos que tire reject).
*   **`Promise.allSettled()`:** Espera a que todas terminen, sin importar si algunas fallaron. Devuelve un array de objetos detallando el estado de cada una. Útil para peticiones masivas que no dependen unas de otras.
*   **`Promise.any()`:** Devuelve la primera que sea EXITOSA (ignora los rechazos a menos que todas fallen).

**Ejercicios:**
1.  Simula 3 funciones que tardan distinto tiempo (1s, 2s, 3s). Ejecútalas con `Promise.all()`. Mide el tiempo total (debería ser el de la más lenta, 3s, no 6s sumados).
2.  Implementa un "Timeout de Seguridad" para una API falsa usando `Promise.race()`. Si la API tarda más de 3 segundos, lanza error.

**Errores comunes:**
*   No saber cuándo usar `.all()` vs `.allSettled()`. (Si cargas un Dashboard y falla el widget de Clima, no quieres que se caiga todo el Dashboard. Usas `allSettled`).

**Videos recomendados (Español):**
*   *Jon Mircha:* "Promise.all() y otros métodos estáticos".
*   *Dorian Designs:* "Asincronía: Promise.all, Promise.race".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 61-65: Async / Await y Try / Catch (Sintaxis Moderna)

**Objetivo del nivel:**
Escribir código asíncrono que "parece" síncrono. Esta es la forma estándar de la industria desde 2017. Todo el Backend de Node.js se basa en esto.

**Conceptos exactos:**
*   **Azúcar Sintáctico (Syntactic Sugar):** Entender que `async/await` NO es magia nueva, es exactamente una Promesa debajo del capó disfrazada para leerse de arriba a abajo.
*   **La regla de oro:** Solo puedes usar la palabra reservada `await` dentro de una función marcada como `async`.
*   **Bloqueo Visual vs Bloqueo Real:** El `await` pausa la ejecución *dentro* de la función `async`, pero NO congela el navegador (el Event Loop sigue libre).
*   **Manejo de Errores con `try / catch`:** El reemplazo del `.catch()` para atrapar errores con estilo síncrono.
*   **Top-Level Await:** Cómo en ESModules modernos puedes usar await fuera de una función (muy útil).

**Ejercicios:**
1.  Refactoriza todos tus códigos de promesas de niveles anteriores (`.then().catch()`) para que usen `async/await`.
2.  Usa la API pública de "PokeAPI" o "JSONPlaceholder" con el método nativo `fetch()`. Descarga un dato usando `async/await`, parsea el JSON y muéstralo.

**Mini proyectos:**
*   **"Mini Buscador de Github":** Escribe una función `async` que pida por consola un nombre de usuario de Github. Usa `fetch()` para llamar a `api.github.com/users/{usuario}`. Usa `try/catch` para que, si el usuario no existe (404), imprimas "Usuario no encontrado" de forma elegante.

**Errores comunes:**
*   Olvidar hacer `await fetch()` Y TAMBIÉN `await response.json()`.
*   Anidar demasiados `try/catch` haciendo el código ilegible (A veces es mejor delegar el error).
*   Romper la concurrencia: Escribir múltiples `await` seguidos cuando NO dependen entre sí (Haciendo el código secuencialmente lento). Debes combinarlos con `await Promise.all()`.

**Videos recomendados (Español):**
*   *Midudev:* "Async Await en JavaScript".
*   *Fazt:* "Fetch API, Async Await y Promesas".

**Tiempo estimado:**
*   1 a 2 semanas.

---

## Nivel 66-70: Generadores (Generators) y Symbol.iterator

**Objetivo del nivel:**
Un nivel avanzado (Casi de Senior). Aprender cómo funcionan las estructuras de datos internamente para poder ser recorridas por un `for...of`, y poder pausar una función múltiples veces.

**Conceptos exactos:**
*   **Función Generadora (`function*`):** Una función especial que puede devolver múltiples valores a lo largo del tiempo, pausando su propia ejecución en cada entrega.
*   **La palabra reservada `yield`:** Pausa la función y devuelve un valor. La próxima vez que llames a la función, retoma *exactamente* donde se quedó.
*   **Método `.next()`:** Cómo el código externo empuja a la función generadora para que avance.
*   **Iterables vs Iteradores:** Por qué puedes hacer un `for...of` sobre un Array, pero NO sobre un Objeto Literal (Porque los Objetos no tienen el Symbol.iterator definido por defecto).

**Ejercicios:**
1.  Crea un Generador de IDs incrementales únicos. Cada vez que llames a `gen.next().value` te debe devolver 1, 2, 3, infinitamente, sin causar un bucle de bloqueo.
2.  Desafío avanzado: Inyecta la propiedad `[Symbol.iterator]` a un Objeto Literal tuyo para que Mágicamente puedas hacer un `for (let prop of miObjeto)` y no tire error.

**Errores comunes:**
*   Creer que los generadores devuelven valores directos. Devuelven un objeto de la forma `{ value: 1, done: false }`.

**Videos recomendados (Español / Inglés CC):**
*   *Jon Mircha:* "Generators en JavaScript".
*   *Fireship:* "JavaScript Generators in 100 Seconds" (Inglés, corto y al pie).

**Tiempo estimado:**
*   1 semana.

---
*(Fin de la Parte 2 de JS Core. Quedo a la orden para generar la Parte 3 de JS Core: DOM Avanzado, Funciones de Alto Orden, Módulos y Prototipos para POO).*
