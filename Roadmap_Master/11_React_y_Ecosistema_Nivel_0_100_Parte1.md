# MATERIA 3.4: REACT Y ECOSISTEMA
**(Parte 1: Niveles 0 al 50 - De JSX al dominio total del Estado y los Efectos)**

---

## Nivel 0-10: El Paradigma Reactivo, JSX y el Virtual DOM

**Objetivo del nivel:**
Desaprender la manipulación directa del DOM (`document.getElementById`). Entender cómo React actúa como un "intermediario" entre tu código y el navegador para lograr un rendimiento brutal.

**Conceptos exactos:**
*   **Imperativo vs Declarativo:**
    *   *Vanilla JS (Imperativo):* "Busca el botón, añádele un listener, cambia su texto a rojo, muéstralo".
    *   *React (Declarativo):* "El botón es rojo. Si el estado cambia, el botón es azul". Tú declaras el estado final, React se encarga de los pasos para llegar ahí.
*   **Virtual DOM:** La copia ligera de memoria del DOM real. React compara el Virtual DOM viejo con el nuevo (Proceso de **Reconciliación**), encuentra las diferencias, y hace "Cirugía láser" cambiando solo ese pixel en el DOM real.
*   **JSX (JavaScript XML):** Parece HTML, pero es mentira. Es azúcar sintáctica para la función `React.createElement()`.
    *   Regla 1: Usar `className` en lugar de `class` (porque class es una palabra reservada en JS).
    *   Regla 2: Todo el JSX debe estar envuelto en un solo elemento padre (o usar Fragmentos `<></>`).

**Ejercicios:**
1.  Crea un proyecto en Vite (`npm create vite@latest`).
2.  Limpia los archivos base y crea tu primer componente `<HolaMundo />` desde cero devolviendo un simple H1 en JSX.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 11-20: Componentes, Props e Inmutabilidad

**Objetivo del nivel:**
Aprender la arquitectura de "Piezas de Lego". Construir aplicaciones grandes a partir de funciones diminutas y reutilizables.

**Conceptos exactos:**
*   **Componente Funcional:** Una simple función de JavaScript que recibe un objeto (Props) y devuelve JSX.
*   **Props (Propiedades):** La forma en que un Componente Padre le pasa datos a un Componente Hijo.
*   **Inmutabilidad estricta:** Las Props son de **SOLO LECTURA**. Un componente hijo jamás puede hacer `props.nombre = "Pedro"`. Si lo hace, React rompe sus reglas de flujo de datos unidireccional (One-way data flow).
*   **Renderizado Condicional:** No puedes usar `if/else` normal adentro del JSX.
    *   Ternarios: `{ logueado ? <Perfil /> : <Login /> }`.
    *   Operador And (`&&`): `{ tieneMensajes && <Alerta /> }`.

**Ejercicios:**
1.  Crea un componente `<TarjetaProducto />` que reciba por Props: `titulo`, `precio` y `enStock` (booleano).
2.  Si `enStock` es falso, renderiza condicionalmente un botón gris que diga "Agotado". Si es verdadero, un botón verde de "Comprar".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-30: El Estado Local (`useState`) y Eventos

**Objetivo del nivel:**
Darle memoria a tus componentes. Hacer que la interfaz gráfica cambie instantáneamente cuando el usuario hace click.

**Conceptos exactos:**
*   **El Hook `useState`:** La única forma de decirle a React: "Ey, esta variable va a cambiar, y cuando cambie, quiero que repintes este componente".
*   **Desestructuración:** `const [contador, setContador] = useState(0)`.
*   **Actualizaciones Asíncronas:** Por qué hacer un `console.log(contador)` inmediatamente después de `setContador(5)` imprimirá `0` en lugar de `5`. (React agrupa las actualizaciones para no repintar 100 veces por segundo).
*   **Eventos Sintéticos:** `onClick`, `onChange`, `onSubmit`. Se escriben en camelCase.
*   **Formularios Controlados:** El estado de un `<input>` no debe vivir en el HTML, debe vivir forzosamente en un `useState` que se actualiza con el evento `onChange`.

**Ejercicios:**
1.  Crea un Contador con botones de sumar y restar.
2.  Crea un Input de texto. Haz que todo lo que escribas en el input se muestre simultáneamente en un `<h1>` arriba de él (Data binding manual).

**Videos recomendados:**
*   *Midudev:* "React desde Cero - Estado y Eventos".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 31-40: El Ciclo de Vida y los Efectos Secundarios (`useEffect`)

**Objetivo del nivel:**
Conectar React con el mundo exterior (APIs, Bases de datos, Timers) sin provocar bucles infinitos que congelen la computadora del usuario.

**Conceptos exactos:**
*   **Efecto Secundario (Side Effect):** Cualquier cosa que ocurra fuera del control directo de la función de React (Hacer un `fetch` a una API, modificar el `document.title`, poner un `setInterval`).
*   **El Hook `useEffect`:** Se ejecuta DESPUÉS de que el componente ya se dibujó en la pantalla.
*   **El Array de Dependencias (La Trampa Mortal):**
    *   `useEffect(() => {...})` sin array: Se ejecuta en cada maldito re-render (Peligro de bucle infinito).
    *   `useEffect(() => {...}, [])` array vacío: Se ejecuta UNA SOLA VEZ cuando el componente "nace" (Mount). Ideal para el Fetch inicial.
    *   `useEffect(() => {...}, [variable])`: Se ejecuta solo cuando esa variable cambia.
*   **La Función de Limpieza (Cleanup):** Si inicias un evento global o un timer dentro de un useEffect, DEBES retornar una función para matarlo cuando el componente "muera" (Unmount), de lo contrario causarás una fuga de memoria (Memory Leak).

**Ejercicios:**
1.  Usa `useEffect` para llamar a una API pública (ej. la de Rick & Morty o PokéAPI) al cargar la página, y guarda la lista en un `useState` para dibujarla.
2.  Crea un componente `<Cronometro />` que inicie un `setInterval`. Monta y desmonta el componente. Si no usaste el Cleanup `clearInterval`, verás cómo el contador en la consola sigue corriendo a pesar de que el componente ya no existe.

**Tiempo estimado:**
*   2 semanas (Es el concepto más difícil de dominar en React básico).

---

## Nivel 41-50: Renderizado de Listas, Keys y Enrutamiento Básico

**Objetivo del nivel:**
Dibujar grandes volúmenes de datos usando arrays y crear aplicaciones de múltiples páginas virtuales.

**Conceptos exactos:**
*   **El método `.map()` en JSX:** El único bucle for permitido dentro del HTML. Toma un array de objetos y devuelve un array de elementos JSX.
*   **La maldición de la prop `key`:** Por qué JAMÁS debes usar el `index` del `.map((item, index))` como Key si tu lista va a poder ordenarse o eliminar elementos. El `key` es la etiqueta de identificación que usa el Virtual DOM para no destruir y recrear elementos de más. Siempre usa un ID único de la base de datos (`item.id`).
*   **React Router DOM:** Convertir una SPA (Single Page Application) en algo navegable.
*   **Componentes Core:** `<BrowserRouter>`, `<Routes>`, `<Route>`.
*   **Navegación sin recarga:** Sustituir la etiqueta `<a>` tradicional (que fuerza al navegador a hacer una petición al servidor) por el componente `<Link to="/ruta">` (que cambia la URL falsamente e inyecta el nuevo componente).

**Ejercicios:**
1.  Toma los datos de tu API de Rick & Morty y dibújalos usando un `.map()`. Aplícale una Key única a cada tarjeta.
2.  Instala `react-router-dom`. Crea una ruta `/home` y una ruta `/personaje/:id`.
3.  Haz que al clickear una tarjeta, el `<Link>` te lleve a la ruta del personaje usando rutas dinámicas.

**Tiempo estimado:**
*   1.5 semanas.

---
*(Fin de la Parte 1 de React. Ya eres capaz de construir el 80% de las aplicaciones web comerciales. Avísame para entrar a la Parte 2: Hooks Avanzados, Performance, React Query y NEXT.JS).*
