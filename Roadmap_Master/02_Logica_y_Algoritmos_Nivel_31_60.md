# MATERIA 1: LÓGICA DE PROGRAMACIÓN, ALGORITMOS Y ESTRUCTURAS DE DATOS
**(Parte 2: Niveles 31 al 65 - Estructuras de Datos No Contiguas)**

---

## Nivel 31-35: Listas Enlazadas Simples (Singly Linked Lists)

**Objetivo del nivel:**
Romper con la idea de que los datos deben estar juntos en la memoria (como en los Arrays). Aprender a conectar nodos dispersos en la RAM usando punteros o referencias.

**Conceptos exactos:**
*   **Anatomía del Nodo:** Un objeto que contiene dos cosas: `valor` (la data) y `siguiente` (el puntero/referencia al próximo nodo).
*   **Head y Tail:** El inicio (cabeza) y el final (cola que apunta a `null`) de la lista.
*   **Ventajas vs Arrays:** Inserción y eliminación en $O(1)$ al inicio, pero búsqueda lenta en $O(N)$ porque no hay índices.
*   **Operaciones Base (CRUD algorítmico):** `append()` (agregar al final), `prepend()` (agregar al inicio), `insert()` (en medio), `remove()`.
*   **Recorrido de Nodos:** El clásico bucle `while (nodoActual !== null)`.

**Ejercicios:**
1.  Crea la clase `Nodo` y la clase `LinkedList` en JavaScript.
2.  Implementa el método `imprimirLista()` que devuelva un array con todos los valores para poder verlos.
3.  Escribe un algoritmo para invertir una Linked List ("Reverse a Linked List"). Es una de las preguntas de entrevista más comunes en el mundo.

**Mini proyectos:**
*   **"Historial de Navegador Web (Básico)":** Simula cómo el navegador guarda las páginas visitadas. Cada nueva página se inserta al final de la lista enlazada. Muestra la lista de páginas desde la primera hasta la última.

**Errores comunes:**
*   Perder el puntero `Head` al hacer una inserción al inicio (y perder acceso a toda la lista entera en memoria). "Garbage Collection" borrará tu lista sin querer.
*   Intentar usar `for (let i = 0...)` en lugar de saltar de nodo en nodo con `nodo = nodo.siguiente`.
*   No manejar el caso extremo donde la lista está vacía (`Head === null`).

**Qué dominar antes de avanzar:**
*   Poder dibujar en un papel (literalmente) cómo se rompen y se crean las flechas (punteros) al insertar un nodo en medio de otros dos.

**Videos recomendados:**
*   *Programación ATS (YouTube):* "Listas Simplemente Enlazadas en C++" (La lógica aplica 100% a JS. Muy detallado y en español).
*   *Midudev (YouTube / Twitch VODs):* Estructuras de datos en JavaScript (Búscar sus directos sobre estructuras).
*   *NeetCode (YouTube):* "Reverse Linked List" (Inglés, pero activa los subtítulos. Es la explicación gráfica definitiva).

**Tiempo estimado:**
*   2 semanas.

---

## Nivel 36-40: Listas Doblemente Enlazadas (Doubly Linked Lists)

**Objetivo del nivel:**
Añadir navegación bidireccional a tus estructuras de datos, pagando el precio de gestionar más punteros a cambio de mayor velocidad en ciertas operaciones.

**Conceptos exactos:**
*   **Puntero Previo (`prev`):** Cada nodo ahora sabe quién está adelante y quién está atrás.
*   **Complejidad Mejorada:** Eliminar el último elemento de la lista ahora es $O(1)$ en lugar de $O(N)$ (porque el `Tail` puede ir hacia atrás usando `prev`).
*   **Mayor consumo de Memoria:** Entender el *trade-off* (intercambio) arquitectónico: gastas más RAM guardando el puntero `prev`, pero ganas velocidad.

**Ejercicios:**
1.  Añade el puntero `prev` a tu clase `Nodo` anterior.
2.  Implementa la eliminación de un nodo específico dado su índice. Notarás que debes conectar el nodo `prev` con el nodo `next`, "saltando" el nodo a borrar.
3.  Implementa un recorrido en reversa (desde el `Tail` hasta el `Head`).

**Mini proyectos:**
*   **"Reproductor de Música (Spotify Clon Consola)":** Cada canción es un nodo. Implementa funciones para dar *Play*, *Next* (avanzar a nodo.next) y *Previous* (retroceder a nodo.prev).

**Errores comunes:**
*   Al insertar o eliminar, olvidar actualizar el puntero `prev` del nodo adyacente, creando listas que se pueden recorrer hacia adelante pero se rompen al intentar volver hacia atrás.

**Qué dominar antes de avanzar:**
*   Manejar perfectamente los 4 punteros implicados al insertar un nodo en el medio de una Doubly Linked List.

**Videos recomendados:**
*   *Fazt (YouTube):* Buscar sus tutoriales de estructuras de datos en JavaScript (español).
*   *Be a Better Dev (YouTube):* "Doubly Linked Lists Explained" (Inglés, poner CC. Muy buenas animaciones).

**Tiempo estimado:**
*   1 semana.

---

## Nivel 41-45: Pilas (Stacks - LIFO) y Colas (Queues - FIFO)

**Objetivo del nivel:**
Entender estructuras lineales con reglas estrictas de acceso. No puedes tocar el elemento del medio, solo los extremos. Son la base de los sistemas operativos y servidores web.

**Conceptos exactos:**
*   **Pila (Stack):** LIFO (Last In, First Out). El último que entra es el primero que sale (como una pila de platos).
*   **Operaciones de Pila:** `push()` (apilar), `pop()` (desapilar), `peek()` (ver el de arriba sin sacarlo).
*   **Cola (Queue):** FIFO (First In, First Out). El primero que entra es el primero que sale (como la fila del supermercado).
*   **Operaciones de Cola:** `enqueue()` (encolar), `dequeue()` (desencolar).
*   **Implementación interna:** Por qué hacer un `dequeue()` usando un Array nativo de JS (`array.shift()`) es un crimen de rendimiento ($O(N)$), y por qué debe construirse usando Nodos ($O(1)$).

**Ejercicios:**
1.  Implementa un Stack usando Nodos (Linked List).
2.  Implementa un Queue usando Nodos con punteros de `primero` y `ultimo`.
3.  **Algoritmo Clásico:** Validar paréntesis anidados. Dado el string `"{[()()]}"`, usa un Stack para determinar si los paréntesis se cierran correctamente.

**Mini proyectos:**
*   **"Sistema de Turnos para Banco":** Un programa donde llega un cliente normal (se forma atrás en el Queue), y llega un cliente VIP.
*   **"Ctrl+Z (Deshacer)":** Implementa un Stack de acciones. Cada vez que el usuario hace algo, entra al Stack. Si hace "Deshacer", haz `pop()` para volver al estado anterior.

**Errores comunes:**
*   Usar un array como Queue sin considerar el problema de latencia masiva si tienes 1 millón de elementos y usas `.shift()`.

**Qué dominar antes de avanzar:**
*   Saber identificar inmediatamente cuándo un problema en una entrevista requiere una Pila y cuándo una Cola.

**Videos recomendados:**
*   *HolaMundo / Pelado Nerd (YouTube):* Pilas y colas explicadas de manera sencilla (Español).
*   *HackerRank (YouTube):* "Data Structures: Stacks and Queues" por Gayle Laakmann (Inglés con CC).

**Tiempo estimado:**
*   1 a 2 semanas.

---

## Nivel 46-50: Tablas Hash (Hash Maps / Dictionaries)

**Objetivo del nivel:**
Conocer la estructura de datos más importante de todo el desarrollo de software. Aprender a mapear una Llave (Key) a un Valor para obtener búsquedas instantáneas en $O(1)$.

**Conceptos exactos:**
*   **Pares Clave-Valor:** El equivalente a buscar una palabra en un diccionario real para obtener su definición.
*   **Funciones Hash (Hashing):** El algoritmo matemático que convierte un `String` (ej. "Juan") en un número (índice del array interno de la memoria).
*   **Colisiones:** Qué pasa cuando dos claves diferentes generan el mismo número hash.
*   **Resolución de Colisiones:** Separate Chaining (guardar listas enlazadas dentro del mismo índice) y Linear Probing.
*   **Objetos Literales vs Mapas en JS:** La diferencia entre `{}` y `new Map()` en JavaScript.

**Ejercicios:**
1.  Dada una lista gigantesca de votos `['A', 'B', 'A', 'C', 'B', 'A']`, usa un Hash Map (Objeto en JS) para contar quién ganó en una sola pasada ($O(N)$).
2.  **Two Sum (LeetCode #1):** Encuentra dos números en un array que sumen a `target`, utilizando un Hash Map para lograr $O(N)$ en lugar de $O(N^2)$ con bucles anidados.

**Mini proyectos:**
*   **"Caché en Memoria Simulado":** Crea una función que simule llamar a una API lenta. Usa un Hash Map para guardar la respuesta. Si se vuelve a llamar con los mismos parámetros, devuelve el resultado del Hash Map instantáneamente sin "esperar" (Memorización).

**Errores comunes:**
*   Intentar usar arrays para buscar elementos repetidos mediante `.includes()` dentro de un `.forEach()` (Creando complejidad $O(N^2)$ oculta), en lugar de usar un Hash Map ($O(N)$).
*   Iterar ciegamente sobre las propiedades de un Objeto heredadas del prototipo (no usar `Object.hasOwn()`).

**Qué dominar antes de avanzar:**
*   Si escuchas la palabra "frecuencia", "contar ocurrencias" o "búsqueda rápida" en un problema, tu cerebro debe gritar "¡TABLA HASH!".

**Videos recomendados:**
*   *Jon Mircha (YouTube):* Curso de JS, sección de estructuras de datos Maps y Sets (Español).
*   *CS50 (YouTube):* "Hash Tables" (Inglés con CC). Una explicación visual con casilleros brillante.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 51-55: Árboles (Trees) y Árboles Binarios (Binary Trees)

**Objetivo del nivel:**
Abandonar las estructuras lineales y entrar al mundo de los grafos jerárquicos. Es como se estructuran las carpetas de tu PC o el HTML del navegador (El DOM).

**Conceptos exactos:**
*   **Anatomía del Árbol:** Root (Raíz), Parent (Padre), Child (Hijo), Leaf (Hoja), Depth (Profundidad).
*   **Árbol Binario:** Un árbol donde cada nodo tiene máximo 2 hijos (`left` y `right`).
*   **Recorridos de Profundidad (DFS - Depth First Search):**
    *   *Pre-order* (Raíz, Izquierda, Derecha). Útil para copiar árboles.
    *   *In-order* (Izquierda, Raíz, Derecha).
    *   *Post-order* (Izquierda, Derecha, Raíz). Útil para borrar árboles.
*   **Recorridos de Anchura (BFS - Breadth First Search):** Nivel por nivel (Nivel 1, Nivel 2, Nivel 3). Usa un *Queue* internamente.

**Ejercicios:**
1.  Implementa la clase `TreeNode` (`valor`, `izq`, `der`).
2.  Construye un árbol a mano uniéndolos: `root.izq = new TreeNode(5)`.
3.  Escribe el algoritmo DFS recursivo para imprimir todos los nodos usando In-Order traversal.

**Mini proyectos:**
*   **"Impresor de DOM (Simulado)":** Crea una estructura de árbol que represente `<html> <body> <div> ...`. Escribe una función recursiva que imprima las etiquetas con sangría (indentación) simulando la profundidad.

**Errores comunes:**
*   Intentar usar bucles `while` o `for` para recorrer un árbol. Los árboles se dominan casi exclusivamente usando Recursión (ver Nivel 26-30).
*   Confundir DFS (que viaja hacia el fondo rápido) con BFS (que viaja como ondas en el agua).

**Qué dominar antes de avanzar:**
*   La recursión múltiple. Entender qué hace el Call Stack cuando llamas a `dfs(nodo.izq)` y luego a `dfs(nodo.der)`.

**Videos recomendados:**
*   *Makigas (YouTube):* "Árboles en programación" (Español, excelente serie).
*   *FreeCodeCamp:* "Data Structures - Trees" (Inglés con CC).

**Tiempo estimado:**
*   2 semanas (Es un salto cognitivo enorme).

---

## Nivel 56-60: Árboles Binarios de Búsqueda (BST)

**Objetivo del nivel:**
Convertir un árbol ordinario en un motor de búsqueda super-rápido. Entender por qué las bases de datos (como PostgreSQL) usan árboles para encontrar datos en milisegundos entre millones de registros.

**Conceptos exactos:**
*   **La Regla del BST:** Todo nodo a la izquierda es MENOR que la raíz, todo nodo a la derecha es MAYOR que la raíz.
*   **Búsqueda Logarítmica $O(\log N)$:** En cada paso, descartas la mitad del árbol. Si hay 1 millón de nodos, lo encuentras en 20 pasos.
*   **Inserción:** Cómo encontrar el espacio vacío correcto para colocar un nuevo número respetando la regla.
*   **Balanceo (Concepto Teórico):** Qué pasa si insertas `1, 2, 3, 4` en orden? El árbol se vuelve una lista enlazada asimétrica de rendimiento $O(N)$. (Introducción mental a los árboles AVL o Red-Black).

**Ejercicios:**
1.  Escribe el método `insertar(valor)` en una clase `BST`.
2.  Escribe el método `buscar(valor)` que devuelva `true` o `false`.
3.  Encuentra el valor MÍNIMO y el MÁXIMO en un BST (Pista: ir todo a la izquierda o todo a la derecha).

**Mini proyectos:**
*   **"Pokedex Binario":** Inserta objetos de Pokemon donde la llave es su nivel de poder. Haz búsquedas super rápidas para encontrar "El pokemon más débil" o buscar si existe uno con nivel "X".

**Errores comunes:**
*   No retornar la función en la llamada recursiva durante la búsqueda (`return buscar(nodo.izq)` en vez de solo `buscar(nodo.izq)`).

**Qué dominar antes de avanzar:**
*   Poder explicar cómo la inserción de números aleatorios forma un árbol y cómo recorrerlo In-Order los devuelve ordenados automáticamente.

**Videos recomendados:**
*   *Programación ATS (YouTube):* "Árboles Binarios de Búsqueda" (Español).
*   *NeetCode:* "Binary Search Tree logic" (Inglés con CC).

**Tiempo estimado:**
*   1 a 2 semanas.

---
*(Fin del bloque 2. Listo para avanzar a la Fase de Grafos, Algoritmos Avanzados y Resolución Práctica para Empleabilidad cuando des la orden).*
