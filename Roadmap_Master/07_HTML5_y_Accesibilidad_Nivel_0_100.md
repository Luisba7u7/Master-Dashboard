# MATERIA 3.1: HTML5 Y ACCESIBILIDAD (A11Y)
**(Niveles 0 al 100 - De las etiquetas básicas a la maestría semántica y SEO Técnico)**

---

## Nivel 0-20: Anatomía Base y El Fin de la "Divitis"

**Objetivo del nivel:**
Dejar de ver el HTML como "lo que da color a la página" y entenderlo como el árbol de datos estructurados que le dice a Google y a los navegadores de qué trata tu aplicación.

**Conceptos exactos:**
*   **El Documento Core:** `<!DOCTYPE html>` (¿Por qué existe? Para evitar el Quirks Mode), `<html lang="es">` (Vital para lectores de pantalla), `<head>` (Metadatos invisibles) y `<body>` (Contenido visible).
*   **Block vs Inline:** Entender por qué un `<div>` (Block) empuja todo hacia abajo y ocupa el 100% del ancho, mientras que un `<span>` (Inline) solo ocupa su propio tamaño y permite elementos a su lado.
*   **Semántica Estricta:** Reemplazar `<div>` por `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`. 
*   **Diferencia Crítica:** `section` sirve para agrupar contenido relacionado temáticamente. `article` sirve para contenido que tendría sentido por sí solo si lo sacaras de la página (ej. un post de blog).
*   **Jerarquía de Encabezados:** NUNCA saltar de un `<h2>` a un `<h4>`. Jamás tener más de un `<h1>` visible. Los encabezados crean el "índice" del libro para los motores de búsqueda.

**Ejercicios:**
1.  Abre la página web de Wikipedia de cualquier tema. Inspecciona el código (F12). Identifica dónde usaron listas (`<ul>`, `<ol>`, `<li>`) para agrupar enlaces y por qué no usaron simples etiquetas `<a>` sueltas.
2.  Crea la estructura de una receta de cocina usando `<article>` para la receta entera, `<section>` para ingredientes y pasos, y `<mark>` para resaltar tiempos importantes.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-40: Formularios Estrictos y Multimedia

**Objetivo del nivel:**
Aprender a recolectar datos de los usuarios de forma segura y usar los teclados móviles a tu favor.

**Conceptos exactos:**
*   **Anatomía del Formulario:** La etiqueta `<form>` y los atributos `action` y `method` (GET vs POST).
*   **La Regla de Oro de los Inputs:** Todo `<input>` DEBE tener una etiqueta `<label>` asociada mediante el atributo `for="id_del_input"`. Esto hace que el área clickeable sea más grande y que los lectores de pantalla anuncien qué pide el campo.
*   **Tipos de Input y Teclados Móviles:** Usar `type="email"`, `type="tel"`, `type="number"`, `type="url"`. Esto cambia automáticamente el tipo de teclado que se despliega en un iPhone o Android.
*   **Validación Intrínseca HTML5:** Evitar JavaScript innecesario. Usar `required`, `minlength="5"`, `maxlength="10"`, `pattern="[a-zA-Z]+"` (Expresiones regulares nativas).
*   **Multimedia Optimizada:** La etiqueta `<picture>` para cargar imágenes diferentes según el tamaño del celular (Responsive Images). Atributo `loading="lazy"` para que la imagen no gaste datos hasta que el usuario baje por la página.

**Ejercicios:**
1.  Crea un formulario de registro. Haz que el botón de "Enviar" esté deshabilitado nativamente si el email no tiene un formato válido usando pseudoclases de CSS como `:invalid` conectadas al HTML.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 41-60: Accesibilidad Web (A11y) y Estándares WCAG

**Objetivo del nivel:**
Nivel profesional. Asegurar que una persona con discapacidad visual total pueda navegar por tu tienda en línea y comprar un producto usando solo el teclado y un lector de pantalla.

**Conceptos exactos:**
*   **WCAG (Web Content Accessibility Guidelines):** El estándar legal de accesibilidad (Niveles A, AA, AAA). En muchos países, te pueden demandar si tu web no cumple con AA.
*   **Navegación por Teclado:** El uso del atributo `tabindex`.
    *   `tabindex="0"`: Hace que un `<div>` pueda recibir foco con la tecla TAB (como un botón).
    *   `tabindex="-1"`: Le quita el foco con TAB, pero permite que JavaScript le ponga foco forzosamente.
    *   `tabindex="1"` o superior: **PROHIBIDO**. Arruina el orden lógico del lector.
*   **Textos Alternativos (`alt`):** Toda imagen `<img>` DEBE tener `alt`. Si la imagen es puramente decorativa (ej. un fondo abstracto), el alt debe existir pero estar vacío: `alt=""`. Si no lo pones, el lector leerá "imagen-fondo-32.jpg", arruinando la experiencia.
*   **ARIA (Accessible Rich Internet Applications):** Superpoderes para HTML.
    *   `aria-label`: Le da un nombre invisible a un botón que solo tiene un icono (ej. un botón con una lupa debe tener `aria-label="Buscar"`).
    *   `aria-hidden="true"`: Esconde elementos visuales inútiles para el lector de pantalla.
    *   `aria-expanded="true/false"`: Le avisa a los ciegos si un menú desplegable está abierto o cerrado.

**Ejercicios:**
1.  Descarga el lector NVDA (Windows) o usa VoiceOver (Mac). Cierra los ojos e intenta rellenar tu formulario del Nivel 40 usando SOLO la tecla TAB y Enter.

**Tiempo estimado:**
*   2 semanas (Es un cambio de paradigma total).

---

## Nivel 61-80: SEO Técnico, Microdata y Metadatos

**Objetivo del nivel:**
Que tu sitio web aparezca en el primer resultado de Google y se vea espectacular cuando alguien pegue el link en WhatsApp o Twitter.

**Conceptos exactos:**
*   **Open Graph Protocol (OG):** Las etiquetas `<meta>` mágicas inventadas por Facebook. Son las responsables de generar la "tarjetita" con imagen y título cuando compartes un enlace.
    *   `<meta property="og:title" content="Mi App">`
    *   `<meta property="og:image" content="https://miapp.com/foto.jpg">`
*   **Twitter Cards:** Equivalente de Open Graph para X/Twitter.
*   **Schema.org y Microdatos (JSON-LD):** Fragmentos de código en formato JSON que pones ocultos en el `<head>`. Le explican explícitamente a Google qué eres. (Ej. "Este HTML no es un blog, es una Receta de Cocina, tarda 30 minutos, y tiene 5 estrellas de review"). Esto genera los "Rich Snippets" en las búsquedas de Google.
*   **Canonical Tags:** `<link rel="canonical" href="...">`. Si tienes 3 URLs que muestran el mismo contenido, le dices a Google cuál es la original para que no te penalice por "Contenido Duplicado".

**Ejercicios:**
1.  Escribe el `<head>` perfecto para una página de E-commerce de un "Zócalo de CPU". Incluye metadatos OG, metadatos Twitter, y un script JSON-LD de tipo "Product" con precio, moneda y disponibilidad.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 81-100: Web APIs Nativas (El DOM bajo nivel)

**Objetivo del nivel:**
Descubrir que el HTML5 no es solo texto estático. Trae incorporadas APIs potentes que antes requerían plugins como Flash.

**Conceptos exactos:**
*   **`<canvas>`:** Un lienzo en blanco donde puedes dibujar gráficos 2D o 3D (WebGL) píxel por píxel usando JavaScript. (La base de los juegos de navegador).
*   **`<svg>` (Scalable Vector Graphics):** A diferencia de un PNG, un SVG es código matemático. Se puede animar, cambiar de color con CSS y escalar infinitamente sin perder calidad.
*   **Drag & Drop API:** Convertir cualquier elemento HTML en "arrastrable" (`draggable="true"`) y escuchar los eventos de soltado (`ondrop`, `ondragover`).
*   **Geolocation API:** Pedirle permiso al navegador para acceder al GPS del usuario (`navigator.geolocation.getCurrentPosition()`).
*   **Web Storage API:** `localStorage` (persiste aunque cierres el navegador) y `sessionStorage` (se borra al cerrar la pestaña). Límites de memoria (usualmente 5MB) vs Cookies.

**Ejercicios:**
1.  Crea un `<canvas>` de 500x500px y dibuja usando la API de JS un círculo rojo perfecto en el centro.
2.  Implementa una lista de tareas (To-Do List) simple donde guardes el array de tareas en el `localStorage` en formato JSON (`JSON.stringify`), de modo que al recargar la página, las tareas sigan ahí.

**Tiempo estimado:**
*   2 semanas.

---
*(Fin de HTML5. Estás listo para dominar la presentación visual en el siguiente módulo: CSS3 Arquitectónico).*
