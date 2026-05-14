# MATERIA 2: JAVASCRIPT CORE Y AVANZADO (Motor V8 e Internals)
**(Parte 1: Niveles 0 al 40 - Fundamentos, Memoria y Contextos de Ejecución)**

---

## Nivel 0-5: Fundamentos Absolutos y Ámbito de Bloque (Scope)

**Objetivo del nivel:**
Entender que JavaScript no es solo "hacer que los botones brillen". Aprender a declarar variables correctamente y entender por qué `var` está obsoleto y prohibido en entornos modernos.

**Conceptos exactos:**
*   **ECMAScript vs JavaScript:** La diferencia entre el estándar (ES6, ES2022) y la implementación del motor.
*   **Variables (`var`, `let`, `const`):** Reasignación vs Mutación.
*   **Scope Global vs Scope de Bloque:** Por qué las llaves `{}` atrapan a `let` y `const`, pero `var` se escapa (y por qué eso es un peligro).
*   **Tipos Primitivos:** `String`, `Number`, `Boolean`, `Undefined`, `Null`, `Symbol`, `BigInt`.
*   **El operador `typeof`:** Cómo usarlo para inspeccionar valores y su peculiar error histórico (`typeof null === 'object'`).

**Ejercicios:**
1.  Declara un bloque `if (true) { }` y dentro usa `var`, `let` y `const`. Intenta imprimir las tres variables fuera del bloque y analiza los errores.
2.  Crea una variable `const arreglo = []`. Intenta reasignarla (`arreglo = [1]`). Luego intenta mutarla (`arreglo.push(1)`). Comprende por qué una falla y la otra no.

**Mini proyectos:**
*   **"Calculadora de Tipos":** Un script de consola donde ingreses diferentes valores y te devuelva su tipo real. Usa sentencias condicionales para "arreglar" el error de `typeof null` y devolver el string correcto `"null"`.

**Errores comunes:**
*   Creer que `const` hace que un objeto o array sea inmutable (solo protege la asignación en memoria, no las propiedades internas).
*   Olvidar usar `let` en los bucles `for` y usar `var`, lo que contamina el scope global de todo tu programa.

**Qué dominar antes de avanzar:**
*   Jamás volver a escribir `var` en tu vida (salvo que estés debugeando código *legacy* de hace 10 años).
*   Entender la diferencia conceptual entre "No se le asignó un valor" (`undefined`) y "Se le asignó intencionalmente el valor de vacío" (`null`).

**Videos recomendados (Español):**
*   *Jon Mircha (YouTube):* "Curso JavaScript: 3. Variables: var vs let".
*   *Midudev (YouTube):* "Curso JavaScript - Diferencia entre var, let y const".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 6-10: Coerción de Tipos (Type Coercion) y Valores Truthy/Falsy

**Objetivo del nivel:**
Aprender por qué JavaScript a veces se "vuelve loco" (`"1" + 1 === "11"`, pero `"1" - 1 === 0`). Dominar cómo el motor convierte tipos automáticamente bajo el capó.

**Conceptos exactos:**
*   **Coerción Implícita (Type Coercion):** Cómo JS trata de ayudarte (o arruinarte) cuando mezclas tipos (ej. sumar un String con un Número).
*   **Coerción Explícita (Type Casting):** Convertir manualmente usando `String()`, `Number()`, `Boolean()`.
*   **Truthy y Falsy:** JavaScript evalúa TODO como Booleano si está en un `if()`.
*   **Los únicos 6 valores Falsy:** `false`, `0`, `""` (string vacío), `null`, `undefined`, `NaN`. Todo lo demás en el universo JS es Truthy (incluso `[]` y `{}`).
*   **Operadores de Igualdad:** `==` (Permite coerción) vs `===` (Igualdad estricta, compara valor y tipo).

**Ejercicios:**
1.  Crea una tabla en papel prediciendo el resultado de: `0 == false`, `0 === false`, `"1" == 1`, `"1" === 1`, `null == undefined`, `null === undefined`. Luego verifícalo en la consola.
2.  Dado un input de formulario que a veces viene vacío, a veces con `0`, y a veces con `null`, escribe una validación usando if-statements aprovechando Truthy/Falsy.

**Mini proyectos:**
*   **"Filtro de Datos Basura":** Tienes un array de una API: `[1, "", null, "Hola", 0, undefined, false, 42]`. Escribe una función que devuelva un nuevo array limpiando TODOS los valores Falsy, usando el constructor `Boolean`.

**Errores comunes:**
*   Usar `==` en lugar de `===` en producción.
*   Hacer comprobaciones excesivas como `if (array.length > 0 && array.length !== null)` cuando simplemente `if (array.length)` evalúa a Falsy si es 0.
*   Creer que un array vacío `[]` es falso. Es Truthy.

**Qué dominar antes de avanzar:**
*   Tener grabados los 6 valores Falsy en tu mente. Si no es uno de esos 6, siempre será verdadero.
*   Entender que `NaN` (Not a Number) es de tipo `Number` (paradoja de JS), y que `NaN === NaN` es falso. (Debes usar `Number.isNaN()`).

**Videos recomendados (Español):**
*   *Sacha Lifszyc (YouTube - La Web Empieza Aquí):* "Coerción en JavaScript".
*   *Fernando Herrera (YouTube):* Valores booleanos, truthy y falsy.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 11-15: Paso por Valor vs Paso por Referencia (Heap vs Stack)

**Objetivo del nivel:**
Entender cómo JavaScript gestiona la memoria RAM. Este nivel evitará que pases horas "cazando bugs" misteriosos donde modificas una variable y accidentalmente se modifica otra.

**Conceptos exactos:**
*   **La Pila (Stack Memory):** Donde se guardan los tipos primitivos (Variables pequeñas, de tamaño predecible).
*   **El Montículo (Heap Memory):** Donde se guardan los objetos y arrays (Variables pesadas, de tamaño dinámico).
*   **Paso por Valor:** Copiar el dato exacto (Ocurre con los Primitivos).
*   **Paso por Referencia:** Copiar "la dirección de memoria" (Ocurre con Objetos/Arrays). Si modificas la copia, ¡modificas el original!
*   **Clonación Superficial (Shallow Copy):** Usar el Operador Spread (`...`) o `Object.assign()`.
*   **Clonación Profunda (Deep Copy):** `structuredClone()` o el truco clásico `JSON.parse(JSON.stringify(obj))`.

**Ejercicios:**
1.  Crea `let a = { nombre: "Juan" }; let b = a; b.nombre = "Pedro";`. Imprime `a`. ¿Por qué "a" cambió si tú modificaste "b"? Escríbelo.
2.  Crea un clon superficial de un array usando `[...arrayOriginal]`. Modifica un elemento interno y verifica que el original no cambió.

**Mini proyectos:**
*   **"Protector de Estado Global":** Tienes un objeto `usuario` con datos y preferencias (con arrays dentro de objetos). Crea una función `actualizarPerfil(usuarioOriginal, nuevosDatos)` que DEBA retornar un usuario modificado SIN alterar el objeto `usuarioOriginal` que le pasaste (Inmutabilidad pura).

**Errores comunes:**
*   Creer que el Spread Operator (`...`) hace clonaciones profundas. Solo clona el nivel 1. Si hay un objeto dentro de otro objeto, la referencia interna se mantiene.

**Qué dominar antes de avanzar:**
*   Entender que en JS, dos objetos idénticos no son iguales: `{ a: 1 } === { a: 1 }` es *falso*, porque estás comparando direcciones de memoria diferentes.

**Videos recomendados (Español / Inglés con CC):**
*   *Carlos Azaustre (YouTube):* "Asignación por valor y por referencia en JavaScript".
*   *Academind (YouTube):* "Reference vs Primitive Values" (Inglés, pero animaciones perfectas).

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 16-20: First-Class Functions, Hoisting y TDZ

**Objetivo del nivel:**
Descubrir el verdadero poder de JavaScript: las funciones no son especiales, son simplemente "valores" (como los strings) que pueden ser pasados de un lado a otro. Entender cómo el motor lee tu código ANTES de ejecutarlo.

**Conceptos exactos:**
*   **First-Class Citizens:** Funciones que se pueden asignar a variables, pasar como parámetros, y retornar dentro de otras funciones.
*   **Hoisting (Elevación):** Cómo el motor V8 escanea tu código y mueve las declaraciones de funciones (`function nombre()`) al tope del archivo ANTES de la ejecución.
*   **Function Expression vs Function Declaration:** Por qué puedes llamar a una función clásica antes de escribirla, pero si usas `const miFuncion = () => {}`, el motor lanza un error.
*   **Temporal Dead Zone (TDZ):** La "zona muerta" donde residen las variables `let` y `const` antes de la línea en la que las declaraste.

**Ejercicios:**
1.  Intenta hacer un `console.log(variableLet)` antes de declararla. Analiza el error `ReferenceError` (Esto es la TDZ en acción).
2.  Escribe una función que reciba a *otra* función por parámetro y la ejecute (Un Callback simple).

**Mini proyectos:**
*   **"Simulador de Callbacks Matemáticos":** Crea una función maestra `operar(a, b, callback)`. Luego crea funciones separadas `sumar`, `restar`, `multiplicar`. Pasa estas funciones como argumento a `operar()` sin ejecutarlas (sin usar `()`), dejando que la función maestra las ejecute.

**Errores comunes:**
*   Añadir paréntesis al pasar un callback: `boton.addEventListener("click", miFuncion())`. ¡Eso la ejecuta al instante en lugar de esperar al click! Lo correcto es `miFuncion`.

**Qué dominar antes de avanzar:**
*   Entender que `function ola() {}` es elevada al 100% en memoria, mientras que `let ola = function() {}` no se eleva (se queda en TDZ).

**Videos recomendados (Español):**
*   *Midudev (YouTube):* "El HOISTING en JavaScript explicado desde CERO".
*   *Beto Quiroga (YouTube):* "Funciones de primera clase y callbacks".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 21-25: Execution Context (El Motor Bajo el Capó)

**Objetivo del nivel:**
Este es el nivel que separa a los Juniors (que solo copian código de internet) de los Semi-Seniors/Seniors. Vas a entender exactamente qué hace el compilador V8 de Google Chrome milisegundo a milisegundo.

**Conceptos exactos:**
*   **Global Execution Context (GEC):** El entorno maestro que se crea apenas ejecutas un archivo JS. Aquí nace el objeto `window` (o `global` en Node) y el contexto `this`.
*   **Fase 1: Memory Creation Phase:** El motor recorre tu código y reserva espacio en RAM para todas tus variables y funciones, dándoles valor `undefined` inicialmente.
*   **Fase 2: Code Execution Phase:** El motor recorre tu código por segunda vez, ahora sí ejecutando e insertando los valores reales en la memoria.
*   **Function Execution Context (FEC):** Cada vez que invocas una función, se crea un mini-universo (un nuevo Execution Context) exclusivo para ella, con sus propias dos fases.

**Ejercicios:**
1.  Abre un cuaderno físico. Escribe 5 líneas de código JS con variables y una función.
2.  Juega a ser el motor V8: Dibuja dos columnas (Memory Phase / Execution Phase). Recorre el código anotando paso a paso cómo reservas memoria y cómo luego asignas valores.

**Mini proyectos:**
*   Este es un nivel 100% mental/teórico. Tu proyecto es ser capaz de explicar este flujo en voz alta como si estuvieras en una entrevista técnica para una posición pesada de Frontend.

**Errores comunes:**
*   Pensar que JavaScript lee el archivo línea por línea una sola vez. Falso, hace una pasada completa para leer (Memoria) y luego otra para accionar (Ejecución).

**Videos recomendados (Inglés con CC - ABSOLUTAMENTE OBLIGATORIO):**
*   *Akshay Saini (YouTube):* Serie "Namaste JavaScript". Video 1 y 2: "How JavaScript Works 🔥& Execution Context". (Es la mejor explicación del planeta, activa los subtítulos en español si es necesario).

**Tiempo estimado:**
*   1 a 2 semanas (Requiere digestión mental lenta).

---

## Nivel 26-30: Call Stack y Lexical Environment (Ámbito Léxico)

**Objetivo del nivel:**
Unir el concepto de Recursión (que viste en Lógica) con los Execution Contexts de JavaScript, y entender cómo las variables saben dónde buscar sus valores si no están en su propio bloque.

**Conceptos exactos:**
*   **La Pila de Llamadas (Call Stack):** La estructura *LIFO* de JS. Abajo está el Global Context. Arriba se apilan los Function Contexts. Cuando una función termina con un `return`, hace "Pop" y se destruye de la pila.
*   **Ámbito Léxico (Lexical Environment):** "Léxico" significa "Dónde está escrito físicamente en el archivo". Las funciones tienen acceso a las variables del contexto donde fueron creadas, NO del contexto de donde son ejecutadas.
*   **Scope Chain (Cadena de Alcance):** Si el motor no encuentra una variable en la función actual, baja un nivel en el Lexical Environment preguntando "Acaso mi padre tiene esta variable?", y si no, busca en el abuelo, hasta llegar al Scope Global.

**Ejercicios:**
1.  Usa el Debugger de Chrome (o VS Code). Pon un breakpoint (`debugger;`) dentro de una función anidada (Una función llamando a otra).
2.  Observa en la pestaña lateral el "Call Stack" llenarse y vaciarse. Observa la pestaña "Scope" y verás la cadena Léxica (`Local`, `Closure`, `Global`).

**Mini proyectos:**
*   **"El Inspector de la Cadena":** Crea variables con el MISMO NOMBRE (ej. `let num = 10;`) en el scope global, dentro de `FuncionA`, y dentro de `FuncionB` anidada en A. Haz un `console.log(num)` en B. Juega borrando los `let num` locales para comprobar cómo el motor viaja por el Scope Chain para encontrar el número más externo.

**Errores comunes:**
*   Confundir el Lexical Scope con `this`. (El Scope está definido por DÓNDE escribiste la función, el `this` está definido por QUIÉN la ejecuta. Es la trampa clásica).

**Videos recomendados:**
*   *Akshay Saini (YouTube):* "Scope Chain, Scope & Lexical Environment | Namaste JavaScript Ep. 7".
*   *Fazt (YouTube):* "Entendiendo el Scope en JS".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 31-35: Closures (Clausuras) y Garbage Collection

**Objetivo del nivel:**
Comprender el "Truco de Magia" más importante de JavaScript. Un Closure es cuando una función recuerda las variables de su Lexical Scope externo, ¡INCLUSO DESPUÉS de que esa función externa haya terminado de ejecutarse y haya desaparecido del Call Stack!

**Conceptos exactos:**
*   **Definición de Closure:** Una función anidada ligada (empaquetada) junto con su Lexical Environment.
*   **Encapsulamiento y Privacidad (Data Hiding):** Como JS no tenía variables privadas (hasta hace muy poco), se usaban Closures para esconder variables que nadie de afuera pudiera modificar.
*   **Garbage Collector (Recolector de Basura):** El proceso que elimina las variables de la memoria RAM cuando ya nadie las usa.
*   **Retención de Memoria (Memory Leaks):** Cómo los Closures "salvan" a ciertas variables del Garbage Collector al mantener viva su referencia (cuidado con los consumos masivos de RAM).

**Ejercicios:**
1.  Crea una función `crearContador()`. Dentro, declara `let cuenta = 0;`. Retorna una función anónima que haga `cuenta++` y haga un `console.log`.
2.  Asigna la función externa a una variable `const miContador = crearContador();`. Luego ejecuta `miContador()` 5 veces. ¡Magia! La variable cuenta sobrevive a la destrucción de `crearContador`.

**Mini proyectos:**
*   **"Cajero Automático Privado":** Crea una función `crearCuentaBancaria(saldoInicial)`. Retorna un objeto con métodos `depositar` y `retirar`. Haz que sea TOTALMENTE IMPOSIBLE que un atacante acceda directamente a la variable `saldoInicial` desde el código global (debe ser privada usando un closure).

**Errores comunes:**
*   Crear Closures accidentalmente dentro de grandes bucles `for`, reteniendo en memoria nodos completos del DOM (esto crashea aplicaciones React pesadas si no se tiene cuidado).

**Videos recomendados (Español / Inglés CC):**
*   *Midudev (YouTube):* "Qué es un CLOSURE en JavaScript y cómo funciona".
*   *Akshay Saini:* "Closures in JS 🔥 | Namaste JavaScript Ep. 10".

**Tiempo estimado:**
*   1.5 a 2 semanas. (Este concepto te lo preguntarán en el 90% de las entrevistas Mid/Senior).

---

## Nivel 36-40: Contexto Contextual (`this`), Default, Implicit y Explicit Binding

**Objetivo del nivel:**
Dominar al enemigo más incomprendido de JS: la palabra reservada `this`. Saber exactamente a qué apunta en cualquier escenario sin adivinar.

**Conceptos exactos:**
*   **El Misterio de `this`:** En JS, `this` NO apunta a la clase/objeto donde fue escrito. `this` apunta a "quien sea que invocó/llamó a la función en este preciso momento".
*   **Default Binding:** Llamar una función globalmente (`mifuncion()`). `this` apunta al objeto `window` (o `undefined` si usas `"use strict"`).
*   **Implicit Binding:** Llamar un método en un objeto (`usuario.saludar()`). `this` es el objeto `usuario` (lo que está a la izquierda del punto).
*   **Explicit Binding (`call`, `apply`, `bind`):** Forzar artificialmente a quién apuntará `this`.
    *   `.call()`: Ejecuta la función pasándole un contexto.
    *   `.apply()`: Igual, pero acepta parámetros en formato de array.
    *   `.bind()`: No la ejecuta, sino que te "retorna una nueva copia" atada permanentemente a ese contexto.
*   **Arrow Functions `() => {}` y su Superpoder Léxico:** Las Arrow functions no tienen su propio `this`. Heredan el `this` del contexto LÉXICO externo donde fueron creadas. (Por eso se usan tanto en React).

**Ejercicios:**
1.  Crea un objeto con un método tradicional `saludar() { console.log(this.nombre) }`. Extrae el método a una variable global: `const saludoSuelta = objeto.saludar;`. Ejecuta `saludoSuelta()`. Comprueba que el `this` se "perdió" (evalúa a undefined).
2.  Arregla el ejercicio 1 usando `.bind(objeto)`.

**Mini proyectos:**
*   **"El Préstamo de Métodos":** Tienes un objeto `personajeGuerrero` con un método complejo para calcular daño. Tienes un `personajeMago` que no tiene ese método. Usa `.call()` para hacer que el Mago tome prestado el método del Guerrero inyectando su propio objeto en el contexto.

**Errores comunes:**
*   Usar Arrow Functions en métodos dentro de Objetos Literales, lo que causa que su `this` intente buscar hacia afuera (hacia `window`) en lugar de apuntar al propio objeto.
*   Perder el `this` al pasar un método como callback a un `setTimeout` o a un evento de botón en el DOM (requiere bindear).

**Videos recomendados (Español):**
*   *Jon Mircha (YouTube):* "Curso JS: call, apply, bind".
*   *Midudev:* "Entendiendo THIS en JavaScript".

**Tiempo estimado:**
*   1 a 2 semanas.

---
*(Fin de la Parte 1. Quedo atento para generar la Parte 2 de JS Core: Asincronismo, Event Loop, Promesas y DOM Avanzado).*
