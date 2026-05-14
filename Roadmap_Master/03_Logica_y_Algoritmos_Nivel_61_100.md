# MATERIA 1: LÓGICA DE PROGRAMACIÓN, ALGORITMOS Y ESTRUCTURAS DE DATOS
**(Parte 3: Niveles 61 al 100 - Grafos, Optimización y Entrevistas FAANG)**

---

## Nivel 61-65: Heaps y Colas de Prioridad (Priority Queues)

**Objetivo del nivel:**
Manejar el concepto de "el más importante primero". En una cola de banco normal el primero en llegar es atendido. En una cola de prioridad, la mujer embarazada pasa al frente aunque haya llegado al final.

**Conceptos exactos:**
*   **Min-Heap y Max-Heap:** Un árbol binario especial donde el nodo padre SIEMPRE es menor (o mayor) que sus hijos.
*   **Representación en Array:** La magia matemática de representar un Árbol Binario Completo dentro de un simple Array sin usar punteros (`HijoIzquierdo = 2*i + 1`, `HijoDerecho = 2*i + 2`).
*   **Inserción (Heapify Up / Bubble Up):** Insertar al final del array y "flotar" el valor hacia arriba hasta que respete la regla.
*   **Extracción (Heapify Down):** Sacar la raíz, mover el último elemento a la raíz y "hundirlo" hasta recuperar el balance.

**Ejercicios:**
1.  Implementa la clase `MinHeap` usando un Array nativo de JavaScript.
2.  Escribe las funciones `insert()` y `extractMin()` con su respectivo Heapify.

**Mini proyectos:**
*   **"Sistema triage de Hospital":** Los pacientes entran con una gravedad (1 leve, 10 crítico). Usa un Max-Heap para extraer siempre al paciente que debe ser atendido primero, en tiempo $O(\log N)$.

**Errores comunes:**
*   Confundir un Heap con un BST (Árbol de Búsqueda). En el Heap, el lado izquierdo NO es menor que el derecho, solo el padre es mayor/menor que ambos.

**Videos recomendados (En Español):**
*   *Makigas (YouTube):* "Montículos (Heaps) - Estructuras de Datos"
*   *Programación ATS (YouTube):* Búsqueda de Colas de prioridad.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 66-70: Grafos y su Representación (Graphs)

**Objetivo del nivel:**
Entender cómo funciona Facebook (una red social) o Google Maps. Aprender que el mundo real no es jerárquico (como un Árbol), sino una red enmarañada de conexiones (Grafos).

**Conceptos exactos:**
*   **Vértices (Nodos) y Aristas (Edges):** Los puntos y las líneas que los conectan.
*   **Grafos Dirigidos (Twitter) vs No Dirigidos (Facebook):** Flechas en un solo sentido vs conexiones mutuas.
*   **Grafos Ponderados (Weighted):** Las aristas tienen un "costo" o "distancia" (ej. 5km de una ciudad a otra).
*   **Matriz de Adyacencia:** Representar conexiones en una matriz bidimensional (Consume mucha RAM para grafos dispersos).
*   **Lista de Adyacencia:** Usar un Hash Map (Diccionario) para listar los "vecinos" de cada nodo (Más eficiente).

**Ejercicios:**
1.  Representa tu familia usando una Lista de Adyacencia en JS (`{ "Juan": ["Madre", "Padre"], "Madre": ["Juan"] }`).
2.  Escribe una clase `Graph` con métodos `addVertex()` y `addEdge()`.

**Mini proyectos:**
*   **"Red de Seguidores":** Crea un grafo dirigido. Escribe funciones para añadir usuarios, hacer que A siga a B, y una función para saber a cuántas personas sigue X.

**Errores comunes:**
*   Intentar usar Matrices de Adyacencia para redes gigantescas provocando el colapso de la memoria (Out of Memory).
*   Olvidar que en grafos no dirigidos, al conectar A con B, debes explícitamente conectar B con A.

**Videos recomendados (En Español):**
*   *Beto Quiroga / EDteam (YouTube):* "Qué son los Grafos"
*   *Fazt (YouTube):* Grafos en JavaScript.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 71-75: Recorridos en Grafos y Detección de Ciclos

**Objetivo del nivel:**
Saber cómo "navegar" de una ciudad a otra a través de la red, asegurando no quedarte atrapado dando vueltas en círculos infinitamente.

**Conceptos exactos:**
*   **Set de Nodos Visitados (`visited`):** La estructura CRÍTICA (usualmente un Set/Hash) para no procesar el mismo nodo dos veces.
*   **DFS en Grafos:** Explorar tan profundo como se pueda usando Recursión o un Stack.
*   **BFS en Grafos:** Explorar vecinos inmediatos primero usando un Queue. Útil para encontrar el camino más corto en saltos (ej. 6 grados de separación).
*   **Detección de Ciclos:** Si en mi DFS encuentro un nodo que YA está en el camino de exploración actual, hay un bucle.

**Ejercicios:**
1.  Dado un grafo como Lista de Adyacencia, escribe una función BFS que imprima todos los nodos.
2.  Usa BFS para encontrar cuántos saltos hay entre el nodo "A" y el nodo "D".

**Mini proyectos:**
*   **"El Algoritmo de Kevin Bacon":** Tienes un grafo de Actores conectados por Películas. Encuentra el grado de separación entre cualquier actor y un actor objetivo usando BFS.

**Errores comunes:**
*   **¡El Bucle Infinito de la Muerte!** Olvidar marcar un nodo como "visitado" y que el algoritmo salte entre A y B para siempre.

**Videos recomendados (En Español / Inglés con CC):**
*   *NeetCode (YouTube):* "Graph Traversal (DFS & BFS)" (Sus animaciones en pizarra son obligatorias para entender).

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 76-80: Búsqueda del Camino Más Corto (Algoritmo de Dijkstra)

**Objetivo del nivel:**
Dominar el algoritmo que hace que los GPS modernos y el enrutamiento de Internet funcionen.

**Conceptos exactos:**
*   **El problema de los pesos:** BFS encuentra la ruta con menos saltos, pero si esos saltos son carreteras lentas, no es el más corto en tiempo.
*   **Algoritmo de Dijkstra:** Cómo usar una Cola de Prioridad (Min-Heap) junto con un Grafo para calcular progresivamente la distancia mínima a todos los nodos.
*   **Tabla de Distancias (Hash Map):** Para ir guardando la distancia mínima conocida a cada nodo (empezando por infinito $\infty$).

**Ejercicios:**
1.  Implementa Dijkstra a nivel código básico (puede ser usando un array simple si no tienes el Min-Heap optimizado).
2.  Dibuja un grafo con 5 nodos, ponle distancias numéricas, y simula en papel paso a paso cómo los valores "infinitos" se van actualizando.

**Errores comunes:**
*   Usar Dijkstra en grafos con aristas de peso negativo (Para eso se usa Bellman-Ford, un concepto más avanzado).

**Videos recomendados (En Español):**
*   *La Vida del Programador / Algoritmos (YouTube):* "Algoritmo de Dijkstra paso a paso".
*   *Dot CSV (YouTube):* Aunque hace de IA, tiene videos donde explica conceptualmente A* y Dijkstra.

**Tiempo estimado:**
*   2 semanas (Es pesado conceptualmente).

---

## Nivel 81-85: Algoritmos de Ordenamiento Avanzado (Divide y Vencerás)

**Objetivo del nivel:**
Entender cómo los lenguajes internamente ordenan arreglos (ej. `array.sort()`). Reemplazar los lentos bucles $O(N^2)$ por la magia del "Divide y Vencerás" en $O(N \log N)$.

**Conceptos exactos:**
*   **Merge Sort:** Cortar el array a la mitad recursivamente hasta tener elementos individuales, y luego "fusionarlos" en orden. Gasta memoria extra ($O(N)$ Space).
*   **Quick Sort:** Elegir un "Pivote", poner los menores a la izquierda y mayores a la derecha. Hacer esto recursivamente. Es in-place (no gasta memoria).
*   **Concepto de In-Place vs Out-of-Place:** Entender el impacto en RAM de tus algoritmos de ordenamiento.

**Ejercicios:**
1.  Escribe el algoritmo Merge Sort. Imprime por consola cada vez que la función divida, y cada vez que fusione.
2.  Escribe Quick Sort. Mide el tiempo de ejecución ordenando un array de 100,000 números aleatorios comparado con un Bubble Sort.

**Videos recomendados (En Español):**
*   *Makigas (YouTube):* "Ordenación por mezcla (Merge sort)" y "Ordenación rápida (Quicksort)".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 86-90: Programación Dinámica (Dynamic Programming)

**Objetivo del nivel:**
Aprender a no recalcular lo que ya has calculado. La Programación Dinámica es el terror de las entrevistas, pero en el fondo solo es Recursión con memoria cache.

**Conceptos exactos:**
*   **Superposición de Subproblemas:** Notar que en Fibonacci recursivo, `fib(3)` se recalcula docenas de veces.
*   **Memoization (Top-Down):** Guardar el resultado de la función en un Hash Map/Array. Si te piden el mismo número de nuevo, lo devuelves del Hash en vez de calcularlo.
*   **Tabulation (Bottom-Up):** Olvidar la recursión. Empezar un array desde 0 y construir la solución iterativamente hacia adelante.

**Ejercicios:**
1.  Transforma tu Fibonacci del Nivel 30 (que tardaba años para el número 50) añadiéndole Memoization (Un objeto caché). Pásale el número 100 y verás que es instantáneo.
2.  Resuelve el "Coin Change Problem" (Dado un monto y un array de monedas, cuál es la mínima cantidad de monedas para llegar al monto).

**Errores comunes:**
*   Tenerle miedo al nombre. "Programación Dinámica" solo es memorizar resultados.

**Videos recomendados (Inglés con CC - Obligatorio por la calidad):**
*   *FreeCodeCamp:* "Dynamic Programming - Learn to Solve Algorithmic Problems & Coding Challenges" (El curso de 5 horas de Alvin Zablan. Es oro puro).

**Tiempo estimado:**
*   2 a 3 semanas.

---

## Nivel 91-95: Algoritmos Codiciosos (Greedy) y Backtracking

**Objetivo del nivel:**
Técnicas de optimización para tomar decisiones sobre la marcha o explorar todas las opciones posibles cuando el problema es un laberinto.

**Conceptos exactos:**
*   **Greedy (Avaricioso):** Tomar la mejor decisión inmediata en el momento, esperando que lleve a la mejor solución global. (A veces funciona, a veces falla).
*   **Backtracking (Vuelta Atrás):** Recorrer un árbol de decisiones. Si tomas un mal camino y fallas, retrocedes al último punto válido y pruebas otra ruta (Como salir de un laberinto).

**Ejercicios:**
1.  **Greedy:** Te dan billetes de 100, 50, 20 y 10. Devuelve el cambio de "280" usando la menor cantidad de billetes (La mente greedy toma 2x100, 1x50, 1x20, 1x10).
2.  **Backtracking:** El clásico N-Reinas. Pon 8 reinas en un tablero de ajedrez sin que se ataquen.

**Videos recomendados (En Español):**
*   *Programación ATS:* Backtracking.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 96-100: Mapeo de Patrones para Empleabilidad (Entrevistas FAANG / Técnicas)

**Objetivo del nivel:**
Conectar toda esta teoría académica cruda con las plataformas modernas (LeetCode, HackerRank) y aprobar entrevistas de algoritmos para corporativos.

**Conceptos exactos (Los 7 Patrones de LeetCode que debes dominar en JS):**
1.  **Sliding Window (Ventana Deslizante):** Para buscar sub-arrays o sub-strings (ej. "Encuentra el sub-array de tamaño K con la suma máxima").
2.  **Two Pointers (Dos Punteros):** Lo vimos en nivel 15, ahora llévalo al límite.
3.  **Fast & Slow Pointers (Liebre y Tortuga):** Para detectar si una Linked List tiene un ciclo infinito.
4.  **Merge Intervals:** Manejo de horarios (ej. "Tienes estas reuniones 1-3, 2-5, fusiona los horarios superpuestos").
5.  **Monotonic Stack:** Un Stack que solo acepta valores en orden estricto (Útil para problemas de "Next Greater Element").
6.  **Top K Elements:** Identificar que necesitas usar un Heap.
7.  **Islands (Matrix Traversal):** Usar DFS dentro de una matriz bidimensional (Problema clásico de "Number of Islands").

**Práctica Obligatoria (El Portfolio de Algoritmos):**
*   No necesitas hacer 1000 ejercicios de LeetCode. Necesitas hacer el **"Blind 75"** o el **"NeetCode 150"**.
*   Resuelve 1 o 2 ejercicios al día.
*   **Regla de oro de la entrevista:** Nunca programes en silencio. Practica resolver el ejercicio HABLANDO y explicando el "Trade-off" de Memoria vs Tiempo. "Podría usar un bucle anidado $O(N^2)$, pero para optimizar tiempo prefiero gastar memoria $O(N)$ instanciando una Tabla Hash". ESO consigue el trabajo.

**Plataformas:**
*   **LeetCode.com** (Sección Problems).
*   **NeetCode.io** (Agrupa los de LeetCode por el patrón subyacente. Úsalo como tu Biblia técnica).

**Tiempo estimado:**
*   Evaluación continua. De aquí al trabajo real.

---
*(Fin de la Materia 1. Este es todo el camino desde que no sabías qué era un Bucle, hasta superar una prueba algorítmica de Amazon. Cuando estés listo, dímelo y empezamos la Materia 2: FRONTEND (HTML/CSS Base) o JAVASCRIPT CORE).*
