# MATERIA 3.2: CSS3 Y ARQUITECTURA VISUAL
**(Parte 2: Niveles 51 al 100 - Responsive Design, Animaciones y Arquitectura BEM)**

---

## Nivel 51-60: Unidades Relativas y Tipografía Fluida

**Objetivo del nivel:**
Dejar de escribir `16px` para todo. Aprender a diseñar de forma fluida, para que tu página web se adapte orgánicamente si el usuario tiene mala vista y tiene el zoom de su teléfono al 150%.

**Conceptos exactos:**
*   **Px (Píxeles Absolutos):** Peligrosos para la accesibilidad porque no respetan la configuración de zoom nativo del sistema operativo.
*   **`rem` (Root EM):** La unidad reina. Equivale al tamaño de fuente del `<html>` (que por defecto es 16px). Si usas `2rem`, son 32px. Si el usuario sube el zoom base de su celular a 24px, tu `2rem` automáticamente se escala a 48px sin que toques una sola línea de código.
*   **El Truco del `62.5%`:** Poner `html { font-size: 62.5%; }`. Esto hace que 1rem sea igual a 10px exactamente, facilitando los cálculos matemáticos (`1.6rem` = 16px).
*   **`vh` y `vw` (Viewport Units):** `100vh` significa "ocupa el 100% de la altura de la pantalla actual". Ideal para banners o pantallas de inicio a pantalla completa.
*   **Tipografía Fluida (La función `clamp()`):** Magia matemática moderna. Le das 3 valores: `clamp(minimo, ideal_fluido, maximo)`. Ej: `font-size: clamp(1.5rem, 4vw, 3rem)`. El texto crecerá de tamaño al estirar la ventana del navegador, sin saltos bruscos.

**Ejercicios:**
1.  Toma una página web antigua tuya que use píxeles. Borra TODOS los `px` y reemplázalos por `rem`.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 61-70: Responsive Design y Media Queries

**Objetivo del nivel:**
Que tu página no se rompa y genere scroll horizontal cuando alguien la abra en un iPhone SE o en un monitor 4K.

**Conceptos exactos:**
*   **Mobile First vs Desktop First:**
    *   *Malo (Desktop First):* Diseñas para monitor de 1920px. Luego creas un `@media (max-width: 768px)` y empiezas a "desarmar" y borrar todo el código que no cabe en el celular.
    *   *Profesional (Mobile First):* Escribes tu CSS base imaginando una pantalla de iPhone. Todo está en bloque, todo cae hacia abajo. Luego, añades complejidad con `@media (min-width: 768px)` para estirarlo cuando la pantalla crezca.
*   **Los Puntos de Quiebre (Breakpoints):** No diseñes para dispositivos específicos (ej. "iPad Mini"). Los dispositivos mueren y cambian cada año. Pon tu media query *exactamente en los pixeles donde tu diseño se empiece a ver feo al estirarlo o encogerlo*.
*   **Imágenes Responsivas:** La regla de oro: `img { max-width: 100%; height: auto; }`. Esto evita que las fotos gigantes se desborden de su contenedor.

**Ejercicios:**
1.  Diseña una Tarjeta de Perfil usando Mobile First. Por defecto, la foto debe estar arriba del texto. Al llegar a `min-width: 800px`, la foto debe flotar a la izquierda y el texto a la derecha.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 71-80: Animaciones, Transiciones y Custom Properties

**Objetivo del nivel:**
Agregar vida a tu interfaz para causar ese efecto "WOW" en el usuario, sin matar el procesador de su teléfono usando JavaScript para animar.

**Conceptos exactos:**
*   **Transiciones (`transition`):** Para cambios de un estado A a un estado B (ej. Hacer `hover` sobre un botón). Controlas el qué, cuánto dura y cómo frena (`transition: background-color 0.3s ease-in-out`).
*   **Transformaciones (`transform`):** `translate` (mover), `scale` (agrandar), `rotate`.
    *   *Secreto de Rendimiento:* Nunca animes `margin`, `padding` o `top/left`. Eso fuerza al navegador a recalcular toda la geometría de la página (Reflow), matando los FPS. Anima siempre usando `transform` y `opacity` porque las procesa la Tarjeta Gráfica (GPU).
*   **Keyframes (`@keyframes`):** Para animaciones complejas que corren solas sin interacción del usuario (Ej. Un spinner de carga girando infinitamente).
*   **Custom Properties (Variables CSS):** Declararlas en la raíz `:root { --color-primary: #FF5733; }`. Te permiten crear botones `var(--color-primary)` y, lo mejor de todo, crear un "Dark Mode" simplemente redefiniendo las variables de `:root` a colores oscuros.

**Ejercicios:**
1.  Crea un botón. Al hacerle hover, haz que escale a 1.1x y mueva su sombra ligeramente hacia abajo usando `transform: scale()` y `box-shadow` suave.
2.  Implementa un interruptor de "Dark Mode" en JavaScript que solo le añada la clase `.dark` al body, y en tu CSS cambia todas las `--variables` base.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 81-90: Arquitectura CSS y Metodología BEM

**Objetivo del nivel:**
Dejar de nombrar tus clases `.titulo-rojo-grande`. Aprender a estructurar el CSS para que en un proyecto de 50,000 líneas no rompas el Navbar mientras intentas arreglar el Footer.

**Conceptos exactos:**
*   **BEM (Block, Element, Modifier):** La nomenclatura estándar de la industria.
    *   *Block:* Un componente independiente. Ej. `.card` o `.btn`.
    *   *Element:* Un hijo que depende del bloque. Se usan dos guiones bajos. Ej. `.card__title` o `.btn__icon`.
    *   *Modifier:* Una variante visual o estado del bloque/elemento. Se usan dos guiones medios. Ej. `.btn--primary`, `.card--dark`.
*   **¿Por qué BEM es mágico?** Porque aplana la especificidad. Todas tus clases valen exactamente 10 puntos en el cálculo de especificidad. Ya no necesitas usar `!important` nunca más, ni tener miedo de que `.card h2` sobreescriba accidentalmente el `h2` del Footer.

**Ejercicios:**
1.  Analiza la página principal de un E-commerce. Identifica los Bloques, Elementos y Modificadores visualmente.
2.  Programa una lista de tarjetas de producto respetando la nomenclatura BEM a rajatabla en tu HTML y CSS.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 91-100: Preprocesadores (SASS/SCSS) y PostCSS

**Objetivo del nivel:**
Darle a CSS poderes de un lenguaje de programación real (variables lógicas, bucles, funciones) y preparar el código antiguo para que funcione en todos los navegadores automáticamente.

**Conceptos exactos:**
*   **SASS / SCSS:** Un lenguaje superior que "compila" a CSS estándar.
    *   *Nesting (Anidamiento):* Escribir reglas hijas dentro de las llaves del padre. Cuidado: Si anidas más de 3 niveles de profundidad, estás creando un infierno de especificidad.
    *   *Mixins:* Funciones que generan bloques de código repetitivo. Ej. Un mixin `@mixin flex-center` que te inyecte el `display: flex; justify-content: center; align-items: center;` con una sola línea de llamada.
    *   *Partials:* Dividir tu CSS gigante de 2000 líneas en 20 archivos pequeños (`_header.scss`, `_buttons.scss`) y unirlos con `@use` en un solo archivo maestro para compilar.
*   **PostCSS y Autoprefixer:** Una herramienta robótica que escanea tu CSS final y le añade automáticamente prefijos molestos como `-webkit-` o `-moz-` a las propiedades nuevas para que funcionen en versiones viejas de Safari o Firefox, sin que tú los escribas a mano.

**Tiempo estimado:**
*   1.5 semanas.

---
*(Fin de la Materia 3.2: CSS3. Ahora eres arquitecto visual absoluto. Puedes continuar hacia Tailwind CSS para acelerar todo este proceso x10).*
