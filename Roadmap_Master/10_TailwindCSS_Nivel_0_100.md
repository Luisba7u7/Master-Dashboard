# MATERIA 3.3: TAILWIND CSS
**(Niveles 0 al 100 - El Framework Definitivo de Utility-First)**

---

## Nivel 0-20: El Paradigma Utility-First y Configuración

**Objetivo del nivel:**
Desaprender la costumbre de crear clases semánticas (`.tarjeta-usuario`) e ir de un archivo HTML a un archivo CSS constantemente. Aprender a diseñar *directamente* en el HTML.

**Conceptos exactos:**
*   **¿Qué es Tailwind?** Un framework "Utility-First". En lugar de darte componentes hechos (como Bootstrap con su `.btn`), te da piezas de lego microscópicas (`bg-blue-500`, `text-white`, `p-4`).
*   **El debate Semántico vs Utilidad:** Entender por qué ensuciar el HTML con 15 clases es preferible a tener un archivo CSS de 10,000 líneas que nadie se atreve a borrar.
*   **Instalación Core:** `npm install -D tailwindcss`.
*   **El cerebro: `tailwind.config.js`:** El archivo donde configuras tus colores de marca, tus fuentes y el `content` (Rutas de tus archivos HTML/JS para que Tailwind sepa qué clases estás usando y cuáles borrar).
*   **El Motor JIT (Just-in-Time):** Por qué Tailwind no compila un archivo CSS de 5MB, sino que solo genera las clases exactas que escribiste, resultando en un CSS final de menos de 10KB.

**Ejercicios:**
1.  Inicia un proyecto vacío en Node (`npm init -y`). Instala Tailwind vía CLI.
2.  Crea un archivo `index.html` y crea un botón azul, con texto blanco, redondeado, y con padding usando SOLO clases de Tailwind (`bg-blue-600 text-white rounded-lg px-4 py-2`).

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-40: La Escala de Espaciado, Tipografía y Colores

**Objetivo del nivel:**
Dejar de adivinar "si ponerle 12px o 14px". Tailwind te obliga a usar un Sistema de Diseño matemático predefinido para que todo luzca perfecto y alineado.

**Conceptos exactos:**
*   **La Escala Base 4:** En Tailwind, el número 1 equivale a `0.25rem` (4px).
    *   `p-4` = Padding de 16px.
    *   `m-8` = Margin de 32px.
    *   `gap-2` = Gap de 8px.
*   **Alineaciones Individuales:** `px-4` (Padding X, izquierda/derecha), `pt-2` (Padding Top).
*   **Tipografía:** Tamaños (`text-sm`, `text-xl`, `text-3xl`), Pesos (`font-bold`, `font-light`), Alineación (`text-center`, `text-justify`).
*   **La Paleta de Colores 50-900:** Cómo elegir tonos. `50` es casi blanco, `500` es el color principal, `900` es casi negro. (`bg-red-500`, `text-slate-800`).

**Ejercicios:**
1.  Haz un clon visual de una tarjeta de producto de Amazon (Imagen arriba, título, precio, y botón de comprar). Asegúrate de no usar ningún valor arbitrario (como `w-[200px]`), oblígate a usar la escala nativa de Tailwind (`w-48` o `w-64`).

**Videos recomendados:**
*   *Midudev:* "Aprende Tailwind CSS desde cero".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 41-60: Layouts (Flex & Grid) y Responsive Design

**Objetivo del nivel:**
Construir estructuras complejas sin tocar CSS. Y lo más importante: Hacer la página responsiva usando prefijos matemáticos.

**Conceptos exactos:**
*   **Flexbox en Tailwind:** `flex`, `flex-row`, `flex-col`, `justify-center`, `items-center`, `flex-grow`.
*   **Grid en Tailwind:** `grid`, `grid-cols-3` (3 columnas iguales), `col-span-2` (ocupar 2 celdas), `gap-4`.
*   **Breakpoints Responsivos (Mobile First nativo):** Las clases normales (`flex`) aplican desde el celular más pequeño en adelante. Para cambiar el diseño en pantallas más grandes usas prefijos:
    *   `sm:` (pantallas de 640px+).
    *   `md:` (tablets, 768px+).
    *   `lg:` (laptops, 1024px+).
    *   `xl:` (monitores grandes, 1280px+).

**Ejercicios:**
1.  Crea un contenedor de tarjetas.
2.  En celular (`<div>`), haz que sea una sola columna (`flex-col`).
3.  En tablet, haz que sean 2 columnas: `<div class="flex-col md:grid md:grid-cols-2">`.
4.  En PC, haz que sean 4 columnas: `<div class="flex-col md:grid md:grid-cols-2 lg:grid-cols-4">`. ¡Acabas de hacer un layout responsivo perfecto en una sola línea de HTML!

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 61-80: Estados (Hover, Focus) y Modificadores Avanzados

**Objetivo del nivel:**
Manejar la interactividad. Tailwind tiene modificadores brutales que en CSS normal requerirían docenas de líneas de código y dolores de cabeza con selectores hermanos.

**Conceptos exactos:**
*   **Modificadores de Estado Básico:** `hover:bg-blue-700` (al pasar el mouse), `focus:ring-2` (al hacer click en un input).
*   **El superpoder de `group`:** Tienes una tarjeta entera. Quieres que al hacer hover en LA TARJETA, el *botón que está adentro* se vuelva visible.
    *   Le pones `group` al padre.
    *   Le pones `group-hover:block` al botón.
*   **El superpoder de `peer`:** Tienes un input (checkbox) y un texto al lado. Quieres que si el checkbox está marcado, el texto se ponga verde.
    *   Le pones `peer` al input.
    *   Le pones `peer-checked:text-green-500` al texto. (Evita usar JavaScript para cosas tan simples).
*   **Dark Mode (Modo Oscuro):** Configurar Tailwind en modo clase. Solo necesitas poner `dark:bg-black dark:text-white` en tus elementos.

**Ejercicios:**
1.  Crea un Input de tipo Contraseña. Usa el modificador `focus:ring-2 focus:ring-blue-500` para que tenga un halo brillante al seleccionarlo.
2.  Usa el modificador `invalid:border-red-500` para que el borde se ponga rojo si el usuario escribe menos de 8 caracteres.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 81-100: Customization, Directivas `@layer` y Arquitectura

**Objetivo del nivel:**
Saber cuándo NO usar Tailwind en el HTML, y cómo extender el framework para inyectarle los colores corporativos de tu empresa.

**Conceptos exactos:**
*   **El archivo `tailwind.config.js` (Extender):** Cómo añadir colores personalizados (Ej. el azul oficial de Facebook) bajo la llave `extend: { colors: { brandBlue: '#1877F2' } }`. Así podrás usar `bg-brandBlue`.
*   **Directiva `@apply` (El lado oscuro):** Si tienes un botón que repites 100 veces y tiene 15 clases, en lugar de pegarlo 100 veces, creas una clase CSS normal `.btn-primary { @apply bg-blue-500 text-white p-4 rounded; }`. (Advertencia: Los creadores de Tailwind recomiendan usar "Componentes de React" en lugar de `@apply` para no perder la filosofía del framework).
*   **Directiva `@layer`:** Dónde debes colocar tu propio código CSS para que no pelee con Tailwind (En `@layer base`, `@layer components` o `@layer utilities`).
*   **Valores Arbitrarios:** El escape de emergencia. Si Tailwind no tiene la medida exacta que quieres, usas corchetes: `w-[317px]`. (Úsalo con extrema moderación).
*   **Plugins:** Instalar `prettier-plugin-tailwindcss` para que tus clases se auto-ordenen siempre de la misma forma al guardar el archivo (Ej. Los paddings siempre van antes que los colores).

**Ejercicios finales:**
1.  Configura el tema de Tailwind para añadir una tipografía externa (Google Fonts) y úsala como fuente por defecto del proyecto.
2.  Instala el plugin de Prettier para Tailwind y observa cómo ordena tus clases mágicamente.

**Tiempo estimado:**
*   1 semana.

---
*(Fin de la Materia 3.3: TAILWIND CSS. Tienes el stack visual completo y rápido de la industria moderna. Ahora cruzaremos el puente hacia REACT para construir SPAs).*
