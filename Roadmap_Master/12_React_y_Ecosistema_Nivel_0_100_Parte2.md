# MATERIA 3.4: REACT Y ECOSISTEMA
**(Parte 2: Niveles 51 al 100 - Performance, Next.js y el Ecosistema Moderno)**

---

## Nivel 51-60: Optimización de Rendimiento y Hooks Avanzados

**Objetivo del nivel:**
Que tu aplicación no se sienta "lenta" cuando tengas miles de componentes. Evitar que React repinte cosas que no han cambiado.

**Conceptos exactos:**
*   **El Problema del Re-render Ciego:** En React, si el Padre cambia su estado, TODOS sus hijos y los hijos de sus hijos se vuelven a dibujar por defecto, incluso si sus Props no cambiaron. Esto mata el rendimiento.
*   **`React.memo` (Memorizar el Componente):** Envolver al componente hijo para decirle: "Solo vuélvete a dibujar si el valor estricto de tus Props acaba de cambiar".
*   **`useCallback` (Memorizar Funciones):** Cuando el Padre se repinta, JS destruye las funciones y las vuelve a crear. Si le pasas una función al Hijo por Props, el Hijo verá que es una función "nueva" en memoria y romperá el `React.memo`. `useCallback` congela la función en RAM.
*   **`useMemo` (Memorizar Cálculos):** Si tienes un for-loop que procesa 10,000 datos, no quieres que se recalcule cada vez que el usuario escribe una letra en el input de búsqueda. `useMemo` guarda el resultado de la matemática pesada.
*   **`useRef`:** Sirve para dos cosas: 1) Capturar elementos físicos del DOM (`inputRef.current.focus()`). 2) Guardar variables que mutan pero que **NO** quieres que provoquen un re-render (a diferencia de `useState`).

**Ejercicios:**
1.  Haz un test de rendimiento. Crea un Padre con un botón que cuente clics (`useState`). Ponle un Hijo pesado (con un for loop inmenso). Toca el botón del Padre y verás el lag. Resuélvelo aplicando `React.memo` al hijo.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 61-70: Prop Drilling y Context API

**Objetivo del nivel:**
Manejar el Estado Global básico. Resolver el infierno de pasar propiedades por 10 niveles de profundidad.

**Conceptos exactos:**
*   **Prop Drilling (Perforación de Props):** Cuando pasas el dato `usuario` del Componente A -> B -> C -> D, y B y C ni siquiera usan el dato, solo actúan como tuberías. Es un anti-patrón de mantenimiento.
*   **Context API (`createContext` y `useContext`):**
    *   *El Provider (Proveedor):* Un componente mágico que envuelve a toda tu app y sostiene el dato.
    *   *El Consumer (Consumidor):* Cualquier componente, a cualquier nivel de profundidad, que invoca `useContext` y "chupa" los datos del Proveedor directamente.
*   **El Peligro del Contexto:** Si el valor del Provider cambia, TODOS los componentes que hacen `useContext` se repintan instantáneamente. Jamás lo uses para datos que cambian cada segundo (como las coordenadas del mouse), úsalo para Temas (Dark/Light) o Sesión de Usuario.
*   **React Portals:** La técnica para dibujar un Modal o Pop-up fuera del `div#root` principal del HTML, evitando problemas de `z-index` y `overflow: hidden`.

**Ejercicios:**
1.  Implementa un Tema Global (Modo Oscuro/Claro) usando Context API que envuelva a toda tu aplicación.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 71-80: Zustand y Redux Toolkit (Estado Global Avanzado)

**Objetivo del nivel:**
Cuando el Context API no es suficiente porque la aplicación es gigante, necesitas el estándar corporativo para el "Cerebro" de tu aplicación.

**Conceptos exactos:**
*   **Redux Toolkit (RTK):** El estándar histórico. Muy potente, pero extremadamente verboso (requiere Actions, Reducers, Slices, Dispatch, Selectors). Te lo pedirán en empresas de software tradicional o bancos.
*   **Zustand:** El estándar moderno y minimalista. Un Hook global que no requiere envolver tu app en Providers. Solo extraes lo que necesitas: `const osos = useOsoStore(state => state.osos)`.
*   **Suscripciones Finas:** La ventaja brutal de Zustand sobre Context. Zustand solo repinta el componente si cambió el dato ESPECÍFICO al que estás suscrito, no toda la tienda.

**Ejercicios:**
1.  Implementa un "Carrito de Compras" global usando Zustand. Añade productos desde la página `/catalogo` y mira el total actualizado en la barra de navegación del Navbar en tiempo real.

**Videos recomendados:**
*   *Midudev:* "ZUSTAND: El nuevo estándar de estado en React".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 81-90: Server State y React Query (TanStack Query)

**Objetivo del nivel:**
Eliminar `useEffect` para pedir datos. React no tiene un sistema oficial para comunicarse con APIs, y hacerlo a mano es una pesadilla de manejo de errores, recargas y memoria caché.

**Conceptos exactos:**
*   **Client State vs Server State:** Entender que la "lista de usuarios" no te pertenece, le pertenece a la Base de Datos. Tú solo tienes una copia prestada (Server State).
*   **TanStack Query (`useQuery`):** El estándar de oro. Le pasas la URL del fetch, y él te devuelve un objeto limpio con: `{ data, isLoading, isError, error }`. Cero `useStates`. Cero `useEffects`.
*   **Caché Automático (Stale-While-Revalidate):** Si pides los usuarios, cambias de página, y regresas a la lista, React Query muestra instantáneamente los usuarios en memoria (Caché), y por debajo, sin que el usuario lo note, va al servidor a ver si hay nuevos. Si los hay, actualiza la lista.
*   **Mutaciones (`useMutation`):** Para peticiones POST/PUT/DELETE. Además, permite "Invalidar la Caché" (ej. creas un post, invalidas la caché de posts, y la lista se auto-refresca sin recargar la página).

**Ejercicios:**
1.  Borra el `useEffect` y el `useState` que hiciste en la parte 1 para llamar a la API de Rick & Morty. Reemplázalo 100% por TanStack Query.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 91-100: NEXT.JS (El Meta-Framework y el Server-Side Rendering)

**Objetivo del nivel:**
El jefe final. React es solo una "librería de interfaz" que corre en el cliente y tiene pésimo SEO. Next.js es el framework completo que lleva a React al Backend.

**Conceptos exactos:**
*   **SPA (Single Page Application):** React puro. El servidor envía un HTML vacío con un div y mucho JS. Google entra y no ve nada.
*   **SSR (Server-Side Rendering):** Next.js pre-dibuja el React en el servidor (Node) y le envía al cliente el HTML lleno de texto. Perfecto para SEO.
*   **El App Router (`app/`):** El sistema de archivos moderno. En lugar de React Router, creas la carpeta `app/usuarios/page.tsx` y la ruta se crea sola.
*   **RSC (React Server Components):** El paradigma actual. Por defecto, TUS COMPONENTES YA NO CORREN EN EL NAVEGADOR. Corren en el servidor y envían HTML estático.
*   **Client Components (`"use client"`):** Solo si tu componente necesita interactividad (ej. un botón con `onClick` o `useState`), le pones `"use client"` arriba para decirle a Next que lo corra en el navegador de la forma clásica.
*   **Server Actions:** Llamar a funciones de base de datos SQL directamente desde el `onClick` de un botón en tu componente de React sin necesidad de crear endpoints de API (Express).

**Ejercicios:**
1.  Crea un proyecto en Next.js 14 o 15 usando el App Router.
2.  Crea un Componente de Servidor asíncrono `async function Page()`. Haz un `await fetch()` dentro del componente (algo imposible en React clásico) y pinta los datos. Mira el código fuente en el navegador para comprobar que el HTML ya llegó dibujado desde el servidor.

**Videos recomendados:**
*   *Fazt / Midudev:* "Next.js App Router Crash Course".

**Tiempo estimado:**
*   3 semanas (Es casi un lenguaje nuevo).

---
*(Fin de la Materia 3.4 y del Ecosistema Frontend. Estás oficialmente listo para construir productos gigantes a escala empresarial).*
