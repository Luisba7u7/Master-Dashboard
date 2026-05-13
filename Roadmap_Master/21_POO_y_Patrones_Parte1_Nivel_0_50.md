# MATERIA 7: PROGRAMACIÓN ORIENTADA A OBJETOS (POO) Y PATRONES
**(Parte 1: Niveles 0 al 50 - Los 4 Pilares Fundamentales)**

---

## Nivel 0-10: El Cambio de Paradigma (Clases y Objetos)

**Objetivo del nivel:**
Dejar de pensar en funciones sueltas y variables globales. Entender cómo agrupar "Datos" y "Acciones" en una sola entidad lógica que modela la vida real.

**Conceptos exactos:**
*   **Programación Estructurada vs POO:** Por qué tener 10 variables sueltas y 5 funciones para manejar un "Usuario" es inmanejable frente a tener un solo objeto `Usuario`.
*   **La Clase (El Molde):** El plano arquitectónico. Define *qué* propiedades tendrá algo, pero no tiene datos reales.
*   **La Instancia (El Objeto):** La casa ya construida a partir del plano. Tiene datos reales (ej. la clase es `Perro`, la instancia es `miPerroFirulais`).
*   **Estado (Atributos):** Las variables que viven dentro de la clase (ej. `nombre`, `nivelEnergia`).
*   **Comportamiento (Métodos):** Las funciones que viven dentro de la clase y operan sobre el estado (ej. `correr()`, que resta `nivelEnergia`).
*   **El Método Constructor:** La función especial que se ejecuta automáticamente cuando haces `new Clase()`. Sirve para inicializar el estado.

**Ejercicios:**
1.  En JavaScript, crea una clase `CuentaBancaria`. Su constructor debe recibir un `titular` y un `saldoInicial`.
2.  Crea los métodos `depositar(monto)` y `retirar(monto)`.
3.  Instancia dos objetos distintos (`cuentaJuan` y `cuentaMaria`). Haz retiros cruzados y comprueba que el saldo de Juan no afecta al de María.

**Videos recomendados (Español):**
*   *Beto Quiroga / EDteam:* "Qué es la Programación Orientada a Objetos".
*   *Jon Mircha:* "POO: Clases y Objetos en JavaScript".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 11-20: Pilar 1 - La Abstracción

**Objetivo del nivel:**
Aprender a ignorar los detalles irrelevantes. Un conductor de auto no necesita saber cómo funciona el motor de combustión interna para acelerar. Tu código debe funcionar igual.

**Conceptos exactos:**
*   **Modelado de la Realidad:** Si haces un juego de ajedrez, un `Caballo` necesita los atributos `color` y `posicion`. NO necesita el atributo `tipoDeSangre` o `peso`. Abstraer es elegir solo lo que le importa a tu sistema.
*   **Ocultar la Complejidad (Caja Negra):** El método `.encender()` de un objeto `Auto` debe ser simple de llamar desde afuera, aunque por dentro tenga 50 líneas de código complejo.
*   **Interfaces Clásicas (Concepto Teórico):** Un contrato que te dice *qué* puede hacer un objeto, pero no *cómo* lo hace. (En TypeScript esto es la palabra `interface`).

**Ejercicios:**
1.  Diseña en papel la abstracción de una `Cafetera`.
    - ¿Qué métodos públicos necesita el usuario? (ej. `hacerCafe()`).
    - ¿Qué métodos internos de complejidad requiere la máquina que el usuario NO debe ver? (ej. `calentarAgua()`, `molerGranos()`).
2.  Lleva ese diseño a código. Haz que `hacerCafe()` llame internamente a los otros métodos complejos.

**Errores comunes:**
*   Hacer clases masivas ("God Objects") que intentan hacer de todo. Si tu clase `Usuario` tiene un método `enviarEmailDeMarketing()`, tienes un problema de abstracción.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-30: Pilar 2 - El Encapsulamiento

**Objetivo del nivel:**
Ponerle una armadura a tu código. Proteger el estado interno de tus objetos para que nadie (ni siquiera tú mismo por accidente) pueda corromper los datos.

**Conceptos exactos:**
*   **Modificadores de Acceso:** (En JS moderno se usa `#`, en TypeScript `private`, `public`, `protected`).
    *   `public`: Cualquiera desde afuera del objeto puede ver y modificar la variable. (Peligro).
    *   `private`: SOLO el propio objeto, desde adentro de sus llaves `{}`, puede tocar esa variable.
    *   `protected`: Solo el objeto y sus "hijos" (herencia) pueden tocarla.
*   **La Invariante:** Una regla que tu objeto no puede romper. (Ej. El `saldo` de una cuenta nunca puede ser negativo). El encapsulamiento garantiza que nadie asigne un valor negativo directamente.
*   **Getters y Setters:** La única puerta de entrada y salida a una variable privada.
    *   `get`: Permite que lean la variable.
    *   `set`: Permite que la modifiquen, pero tú interceptas el valor y lo validas primero (`if (nuevoSaldo < 0) throw Error`).

**Ejercicios:**
1.  En la clase `CuentaBancaria` del nivel 10, haz que la variable `saldo` sea estrictamente PRIVADA (`#saldo` en JS moderno).
2.  Intenta hacer `cuentaJuan.#saldo = 5000000` desde afuera de la clase. Debería darte un error de sintaxis del compilador.
3.  Crea un `get saldo()` para poder imprimirlo, y asegúrate de que la única forma de meter dinero sea usando el método `depositar()`.

**Videos recomendados:**
*   *Fazt:* "JavaScript Clases y Privacidad (Private fields)".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 31-40: Pilar 3 - La Herencia y sus peligros

**Objetivo del nivel:**
Reutilizar código inteligentemente (DRY - Don't Repeat Yourself). Pero también aprenderás por qué la herencia profunda es el error de diseño más odiado de la década pasada.

**Conceptos exactos:**
*   **Jerarquía de Clases:** Clase Padre (Superclase) y Clases Hijas (Subclases).
*   **La palabra reservada `extends`:** Cómo un `Perro` hereda todo el estado y comportamiento de `Animal`.
*   **El método `super()`:** Por qué la primera línea del constructor de un hijo DEBE ser `super()` (llama al constructor del padre para inicializar la base antes de añadir cosas nuevas).
*   **El Problema de la Herencia: El Gorila y la Banana:** (Cita de Joe Armstrong) "El problema con la POO es que tú querías una banana, pero obtienes a un gorila sosteniendo la banana y toda la jungla completa".
*   **La Fragilidad de la Clase Base:** Si cambias algo en el Padre, automáticamente impactas a 50 hijos. (Por esto moderno se prefiere la "Composición" sobre la "Herencia").

**Ejercicios:**
1.  Crea una clase base `Empleado` con `nombre` y `sueldoBase`.
2.  Crea una clase hija `Desarrollador` que herede de Empleado, pero que su constructor pida un dato extra: `lenguajeProgramacion`. Usa `super()`.
3.  Crea otra clase hija `Gerente` que tenga un método `calcularBono()`.

**Errores comunes:**
*   Crear árboles de herencia de 5 niveles (`Animal -> Mamífero -> Perro -> Bulldog -> BulldogFrances`). El código se vuelve imposible de leer y rastrear.

**Videos recomendados:**
*   *Midudev / Fernando Herrera:* "Herencia en Clases de JavaScript / TypeScript".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 41-50: Pilar 4 - El Polimorfismo

**Objetivo del nivel:**
"Muchas Formas". Aprender a tratar objetos diferentes de la misma manera. Este es el secreto de los Patrones de Diseño que verás en la segunda mitad.

**Conceptos exactos:**
*   **Sobrescritura de métodos (Overriding / Polimorfismo de Inclusión):** El Padre `Animal` tiene el método `hacerSonido()` que hace "Grrr". La clase hija `Perro` *sobrescribe* ese método para que haga "Guau", y el `Gato` lo sobrescribe para que haga "Miau".
*   **Sobrecarga de métodos (Overloading / Polimorfismo Ad-Hoc):** Tener 3 métodos con el MISMO nombre pero que reciben diferente cantidad de parámetros. (En Java/C# es nativo, en JS puro se tiene que fingir usando `if (arguments.length === 2)`).
*   **Duck Typing (Tipado de Pato en JS):** "Si camina como un pato y grazna como un pato, entonces debe ser un pato". A JS no le importa si el objeto hereda o no hereda de una clase, solo le importa que TENGAN el mismo método invocado.

**Ejercicios:**
1.  Crea una función global `reproducirSonido(animal) { animal.hacerSonido() }`.
2.  Pásale a esa función una instancia de `Perro`, una de `Gato` y una de `Pato`. Nota cómo el programa no colapsa, sino que ejecuta la versión correcta del sonido de cada uno sin usar ni un solo `if/else`. ¡Eso es polimorfismo!

**Errores comunes:**
*   Llenar tu código de `switch(tipoDeAnimal) { case 'Perro': ... }`. El polimorfismo EXISTE precisamente para destruir los `switch`. Cada objeto debe saber cómo comportarse por sí mismo.

**Tiempo estimado:**
*   2 semanas (Es un concepto avanzado de abstracción mental).

---
*(Fin de la Parte 1 de POO. He dividido esta materia para asegurar que no pierdas ni un ápice de profundidad. Cuando me des luz verde, generaré la Parte 2: LOS PATRONES SOLID Y EL CATÁLOGO GoF DE PATRONES DE DISEÑO).*
