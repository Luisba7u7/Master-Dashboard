# MATERIA 1: LÓGICA DE PROGRAMACIÓN, ALGORITMOS Y ESTRUCTURAS DE DATOS
**(Parte 1: Niveles 0 al 30 - Fundamentos a Estructuras Lineales)**

---

## Nivel 0-5: Pensamiento Computacional Crudo y Pseudocódigo

**Objetivo del nivel:**
Desprogramar tu cerebro de la forma de pensar humana y aprender a pensar como una máquina secuencial. No escribirás código real en un lenguaje, sino que aprenderás a dar instrucciones inflexibles y exactas.

**Conceptos exactos:**
*   **Algoritmos de la vida real:** Qué es un algoritmo (serie de pasos finitos, definidos y precisos).
*   **Secuencialidad:** La ejecución top-down (de arriba hacia abajo).
*   **Variables y Estado:** El concepto de la memoria como cajas etiquetadas. Asignación y reasignación de estado.
*   **Condicionales Simples y Compuestas:** `SI`, `SINO`, `SI NO SI`.
*   **Operadores Lógicos y Tablas de Verdad:** `AND` (&&), `OR` (||), `NOT` (!). Comprender cómo el cerebro de la computadora evalúa múltiples condiciones.
*   **Diagramas de Flujo (Flowcharts):** Simbología estándar (Inicio/Fin, Proceso, Decisión, Input/Output).

**Ejercicios:**
1.  Escribe el algoritmo detallado (paso a paso) para hacer un sándwich asumiendo que la computadora no sabe qué es un pan.
2.  Crea la tabla de verdad completa para la expresión: `(A AND B) OR (NOT C)`.
3.  Dibuja el diagrama de flujo para un cajero automático simple (Validar NIP -> Mostrar Saldo -> Retirar -> Restar Saldo).

**Mini proyectos:**
*   **"Simulador de peaje en papel":** Crea un diagrama de flujo y pseudocódigo que calcule cuánto debe pagar un vehículo dependiendo de su tipo (moto, auto, camión), la hora del día (tarifa nocturna) y si tiene pase rápido (descuento).

**Errores comunes:**
*   Asumir que la computadora "sobreentiende" un paso.
*   Confundir `=` (asignación) con `==` (comparación de igualdad).
*   No definir un fin claro para un algoritmo (pasos infinitos).

**Qué dominar antes de avanzar:**
*   Poder leer un diagrama de flujo complejo sin perderte.
*   Saber predecir el resultado de 5 operaciones lógicas anidadas de memoria.

**Videos recomendados:**
*   *CrashCourse Computer Science:* "Boolean Logic & Logic Gates" (Para entender a nivel hardware por qué existe AND/OR).
*   *Cualquier curso de PSeInt básico* en YouTube (PSeInt es la mejor herramienta de pseudocódigo en español).

**Documentación / Plataformas:**
*   Descargar e instalar **PSeInt**.
*   **Draw.io** para hacer diagramas de flujo.

**Tiempo estimado:**
*   1 a 2 semanas.

---

## Nivel 6-10: Bucles, Iteración y Estructuras de Control Cíclicas

**Objetivo del nivel:**
Aprender a hacer que la computadora repita tareas eficientemente sin copiar y pegar código, controlando exactamente cuándo detenerse.

**Conceptos exactos:**
*   **Concepto de Iteración:** La variable contadora (`i`), la condición de parada y el incremento/decremento.
*   **El bucle MIENTRAS (`WHILE`):** Ejecución dependiente de una condición previa.
*   **El bucle HACER-MIENTRAS (`DO-WHILE`):** Ejecución que garantiza al menos una pasada antes de evaluar la condición.
*   **El bucle PARA (`FOR`):** Iteración controlada conociendo la cantidad exacta de pasos.
*   **Bucles Infinitos:** Qué son, por qué ocurren y cómo romperlos intencionalmente (`break`, `continue`).
*   **Acumuladores y Contadores:** Variables que mutan dentro de un ciclo para guardar sumas (ej. `total = total + precio`) o conteos (ej. `cantidad = cantidad + 1`).

**Ejercicios:**
1.  Haz un pseudocódigo (en PSeInt) que imprima todos los números pares del 1 al 100 usando un `WHILE`.
2.  Haz un pseudocódigo que pida al usuario una contraseña y no le permita avanzar hasta que la ingrese correctamente (usando `DO-WHILE`).
3.  Imprime la tabla de multiplicar del 7 usando un `FOR`.

**Mini proyectos:**
*   **"Caja Registradora":** Un programa en PSeInt que pida precios de productos repetidamente hasta que el usuario ingrese `0`. Al final, debe mostrar el total a pagar, el total de artículos y si aplica un descuento del 10% (si la compra superó $1000).

**Errores comunes:**
*   Olvidar incrementar la variable contadora dentro de un `WHILE` (causando un bucle infinito que crashea el programa).
*   Errores "Off-by-one" (Desfase por uno): Iterar de 0 a 10 cuando querías de 1 a 10.
*   Anidar bucles innecesariamente sin entender la carga de procesamiento que genera.

**Qué dominar antes de avanzar:**
*   Saber escribir mentalmente un bucle `FOR` sin dudar en la sintaxis de sus 3 partes.
*   Entender cuándo usar `WHILE` (cuando no sabes cuántas veces iterar) vs `FOR` (cuando sí sabes).

**Videos recomendados:**
*   *FreeCodeCamp:* Búsqueda "Loops and Iteration basics".
*   *Programación ATS (YouTube):* Bloque de ciclos en C++ (aunque sea C++, la lógica es oro puro).

**Documentación / Plataformas:**
*   Documentación oficial de PSeInt (manual de usuario).

**Tiempo estimado:**
*   1 a 2 semanas.

---

## Nivel 11-15: Arreglos Unidimensionales (Arrays/Vectores) y Punteros Lógicos

**Objetivo del nivel:**
Introducirte a las colecciones de datos contiguos. Dejarás de tener 100 variables para almacenar 100 nombres, y usarás una sola variable indexada. Aquí se pasa al lenguaje JavaScript como herramienta base.

**Conceptos exactos:**
*   **Anatomía del Array:** Qué es, cómo se guarda en memoria (bloques contiguos) y por qué empiezan en índice `0` (concepto de offset en memoria).
*   **CRUD en Arrays (Sin métodos de alto nivel):** Cómo insertar, leer, actualizar y eliminar elementos de un array usando solo bucles `FOR` e índices.
*   **Desplazamiento (Shifting):** El costo computacional de insertar un elemento en la posición `0` de un array (tener que mover todos los demás elementos un espacio a la derecha).
*   **Recorrido de Arrays:** Uso de `FOR` para inspeccionar cada elemento.
*   **Punteros Lógicos (Two Pointers Technique):** Técnica algorítmica donde usas dos variables (ej. `left` y `right`) que apuntan a diferentes índices del array para resolver problemas (ej. invertir un array in-place).

**Ejercicios (en JavaScript, sin usar métodos nativos como .reverse() o .push()):**
1.  Dado un array `[5, 2, 9, 1, 5, 6]`, encuentra el número mayor iterando con un `FOR`.
2.  Invierte el array usando un bucle y una variable temporal, sin crear un array nuevo (In-place).
3.  Encuentra si un elemento X existe en el array (Búsqueda Lineal / Sequential Search).

**Mini proyectos:**
*   **"Gestor de Inventario Básico":** Crea un programa de consola que mantenga un array de nombres de productos. Permite al usuario (a través de prompts o readline) agregar un producto al final, buscar si un producto existe, e imprimir todo el inventario numerado.

**Errores comunes:**
*   Intentar acceder al índice `array.length` (que da *undefined* o *Index Out of Bounds*, porque el último elemento es `length - 1`).
*   Confundir el *índice* (la posición) con el *valor* almacenado en esa posición.
*   Crear arrays nuevos para modificar datos en lugar de aprender a modificarlos *in-place* (desperdiciando memoria).

**Qué dominar antes de avanzar:**
*   Dominio absoluto del índice 0 y de la iteración `for (let i = 0; i < arr.length; i++)`.
*   Entender visualmente cómo un Two-Pointer avanza de los extremos hacia el centro.

**Videos recomendados:**
*   *NeetCode (YouTube):* "Two Pointer Technique" (Vital para entrevistas).
*   *CS50 (Harvard):* Lecture sobre Arrays (Explica la memoria contigua de forma magistral con bloques).

**Documentación / Plataformas:**
*   MDN Web Docs: `Array` (Leer solo la sección de qué son, ignorar los métodos funcionales por ahora).
*   **LeetCode:** Resolver problemas tipo "Easy" usando solo arreglos (ej. *Two Sum* usando bucles anidados, *Reverse String*).

**Tiempo estimado:**
*   2 semanas.

---

## Nivel 16-20: Arreglos Multidimensionales (Matrices) y Cadenas (Strings)

**Objetivo del nivel:**
Manejar el concepto de "tableros" o "grillas" (filas y columnas) e inmersión profunda en la manipulación de texto como si fueran arreglos de caracteres.

**Conceptos exactos:**
*   **Matrices (Arrays 2D):** Un array que contiene arrays. Concepto de filas (i) y columnas (j).
*   **Anidamiento de Bucles:** El bucle exterior controla las filas, el interior controla las columnas. $O(N*M)$.
*   **Transposición de Matrices:** Cambiar filas por columnas.
*   **Recorridos Diagonales:** Cómo encontrar la diagonal principal (`i == j`) y la secundaria (`i + j == N - 1`).
*   **Strings como Arrays inmutables:** Entender que en muchos lenguajes (como JS o C) un String es esencialmente un arreglo de caracteres, pero con asignación por valor.
*   **Manipulación de Strings (Algorítmica):** Palíndromos, conteo de vocales, substrings.

**Ejercicios:**
1.  Crea una matriz de 3x3 llena de ceros, y cambia la diagonal principal a unos (Matriz Identidad).
2.  Dado un String `"reconocer"`, verifica si es un palíndromo usando la técnica de Two Pointers sin usar métodos `.reverse()`.
3.  Crea una función que reciba una matriz y devuelva la suma de todos sus bordes (ignora el centro).

**Mini proyectos:**
*   **"Buscaminas Básico (Terminal)":** Genera una matriz de 5x5. Coloca 3 "bombas" aleatoriamente. Haz una función que, dada una coordenada (x, y), imprima si explotaste o estás a salvo.
*   **"Validador de Sudoku":** Dada una matriz de 9x9 con números del 1 al 9, verifica si hay números repetidos en alguna fila o columna.

**Errores comunes:**
*   Perderse en el rastro del índice `i` vs el índice `j`. Escribir `matriz[j][i]` cuando querías `matriz[i][j]`.
*   Intentar mutar un caracter específico de un String en JS (`str[0] = 'a'`), lo cual falla silenciosamente porque los primitivos string son inmutables.
*   Crear bucles infinitos en el bucle anidado al reusar la misma variable contadora (ej. usar `i` adentro y afuera).

**Qué dominar antes de avanzar:**
*   Poder visualizar mentalmente cómo el bucle `j` da una vuelta completa por cada paso único del bucle `i`.
*   Dominar la diferencia algorítmica entre manipular un Array (mutable) y un String (inmutable).

**Videos recomendados:**
*   *Abdul Bari (YouTube):* "2D Arrays / Matrices" (Explicación académica pura).
*   *MyCodeSchool:* "Pointers and 2-D arrays" (Aplica a C, pero la lógica espacial te servirá por siempre).

**Documentación / Plataformas:**
*   **HackerRank:** Sección "Problem Solving" -> Filtro: "Strings" y "2D Array".

**Tiempo estimado:**
*   2 semanas.

---

## Nivel 21-25: Complejidad Algorítmica Crítica (Big-O Notation)

**Objetivo del nivel:**
Dejar de programar "a ciegas". Entender y poder calcular matemáticamente qué tan eficiente (en tiempo y en RAM) es el código que escribes, para pasar de Junior a Mid-Level.

**Conceptos exactos:**
*   **Concepto de Big-O:** Por qué no medimos el código en milisegundos sino en "operaciones a medida que el input (N) crece".
*   **Complejidad Constante $O(1)$:** Acceder a un array por índice. El "Santo Grial" del rendimiento.
*   **Complejidad Lineal $O(N)$:** Bucles simples. Buscar un elemento no ordenado.
*   **Complejidad Cuadrática $O(N^2)$:** Bucles anidados. El enemigo del rendimiento masivo.
*   **Complejidad Logarítmica $O(\log N)$:** Entender el concepto de "dividir a la mitad" en cada paso (Búsqueda binaria).
*   **Complejidad Espacial (Space Complexity):** Cuánta memoria RAM extra requiere tu algoritmo. Variables locales vs Copias de Arrays.
*   **Trade-offs (Intercambios):** Cómo gastar más memoria (RAM) para ganar más velocidad (Tiempo).

**Ejercicios:**
1.  Toma 5 ejercicios que hayas hecho en niveles anteriores. Para cada uno, escribe en papel su Complejidad Temporal y Espacial, justificando línea por línea.
2.  Refactoriza la función "Encontrar duplicados en un array": Primero hazla en $O(N^2)$ con dos bucles anidados. Luego, intenta optimizar la idea (aunque sea teóricamente por ahora).

**Mini proyectos:**
*   No hay proyecto de código, el proyecto es **Analítico**. Toma repositorios o códigos viejos tuyos y añade un comentario en la cabecera de cada función indicando su Big-O exacto de Tiempo y Espacio.

**Errores comunes:**
*   Creer que un bucle `for` que va de 1 a 1,000,000 es $O(N)$. Es $O(1)$ porque es una constante que NO depende del input.
*   Ignorar el costo de los métodos nativos. Creer que `array.includes(x)` es mágico, cuando internamente es $O(N)$.
*   Olvidar la complejidad espacial de crear un array nuevo dentro de un bucle.

**Qué dominar antes de avanzar:**
*   Si ves dos bucles anidados donde uno depende de `N` y el otro de `M`, saber al instante que es $O(N*M)$.
*   Tener grabada la jerarquía gráfica de Big-O en tu mente (de mejor a peor).

**Videos recomendados:**
*   *Fireship:* "Big O Notation - Full Course".
*   *NeetCode:* "Big-O Notation for Technical Interviews".
*   *CS50 (Harvard):* "Computational Complexity".

**Documentación / Plataformas:**
*   **BigOCheatSheet.com:** (Ponla en tus marcadores e imprímela y pégala frente a tu escritorio).

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 26-30: Recursión y el Stack de Llamadas

**Objetivo del nivel:**
Aprender la técnica algorítmica más temida y elegante. Entender cómo una función puede llamarse a sí misma usando la pila de memoria del sistema (Call Stack).

**Conceptos exactos:**
*   **El Call Stack:** Cómo la computadora guarda el estado de "dónde me quedé" cuando una función llama a otra. Stack Frames.
*   **Caso Base (Base Case):** La condición de parada absoluta. Sin esto, el programa colapsa.
*   **Caso Recursivo (Recursive Case):** La parte donde la función se llama a sí misma acercándose un paso hacia el Caso Base.
*   **Stack Overflow:** Qué pasa cuando el Call Stack se llena porque olvidaste el caso base.
*   **Recursión de Cola (Tail Recursion):** Optimización donde la llamada recursiva es la última acción, evitando que el stack crezca.
*   **Árbol de Llamadas (Call Tree):** Cómo dibujar a mano las ramificaciones de la recursión múltiple (vital para Fibonacci).

**Ejercicios:**
1.  Escribe una función recursiva que calcule el factorial de un número. Dibuja a mano el Call Stack de `factorial(4)`.
2.  Escribe una función recursiva que sume todos los números de un array sin usar bucles.
3.  Crea la clásica función recursiva de Fibonacci (`fib(n) = fib(n-1) + fib(n-2)`). Calcula a mano su complejidad temporal y descubre por qué es $O(2^N)$ (horriblemente lenta).

**Mini proyectos:**
*   **"Navegador del Sistema de Archivos":** Simula un objeto anidado en JS (carpetas dentro de carpetas). Escribe un script recursivo que imprima la ruta completa de todos los archivos `.txt` escondidos a cualquier nivel de profundidad.

**Errores comunes:**
*   No poner el retorno (`return`) en el caso base.
*   Que el parámetro del caso recursivo no mute (ej. llamar a `funcion(n)` infinitamente en lugar de `funcion(n - 1)`).
*   Pensar en la recursión hacia adelante en lugar de "hacia atrás" (resolviendo el problema asumiendo que el sub-problema ya se resolvió).

**Qué dominar antes de avanzar:**
*   Poder explicar en voz alta el flujo del Call Stack mientras una función recursiva "regresa" desenrollándose.
*   Ser capaz de convertir un bucle `while` simple a su equivalente recursivo.

**Videos recomendados:**
*   *Colt Steele (YouTube):* "Recursion Crash Course".
*   *FreeCodeCamp:* "Recursion in Programming - Full Course" (El video de 2 horas).
*   *Computerphile:* "Recursion".

**Documentación / Plataformas:**
*   **Visual Studio Code Debugger:** Aprender a usar breakpoints y observar la pestaña "Call Stack" en vivo mientras la función recursiona.

**Tiempo estimado:**
*   2 semanas de frustración garantizada (pero necesaria).

---
*(Fin del bloque 1. Quedo a la espera de tu instrucción para generar el bloque 2: Niveles 31 al 60).*
