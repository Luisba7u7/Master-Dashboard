# MATERIA 5: BACKEND Y NODE.JS
**(Parte 1: Niveles 0 al 50 - Servidores, Express y Middlewares)**

---

## Nivel 0-10: Node.js Core y el Entorno de Ejecución

**Objetivo del nivel:**
Entender qué demonios es Node.js. No es un lenguaje de programación, es un "Robot" C++ que saca a JavaScript del navegador y le da poderes para tocar el sistema operativo.

**Conceptos exactos:**
*   **El Motor V8 y Libuv:** Node = V8 (El motor de Google Chrome que compila JS a código máquina) + Libuv (Una librería escrita en C que maneja las operaciones asíncronas de entrada/salida como leer discos o redes).
*   **Sistemas de Módulos (CJS vs ESM):**
    *   *CommonJS (Antiguo):* `const fs = require('fs');` y `module.exports = {}`. Todavía domina el ecosistema Node antiguo.
    *   *ES Modules (Moderno):* `import fs from 'fs';` y `export default {}`. El estándar oficial actual. (Requiere poner `"type": "module"` en tu `package.json`).
*   **El Sistema de Archivos (`fs`):** Cómo usar Node para crear, leer y borrar archivos de texto en tu computadora usando `fs.promises`.
*   **Variables de Entorno (`.env`):** Por qué NUNCA debes escribir contraseñas en tu código fuente. Uso del módulo `process.env` y la librería `dotenv`.

**Ejercicios:**
1.  Crea un archivo `app.js`. Usa el módulo nativo `fs/promises` para escribir un archivo `hola.txt` en tu computadora que diga "Hola Backend".
2.  Inicia el script desde la terminal usando `node app.js`.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 11-20: El Protocolo HTTP y Servidores Nativos

**Objetivo del nivel:**
El internet está construido sobre texto plano. Entender cómo hablan las computadoras antes de usar frameworks mágicos.

**Conceptos exactos:**
*   **HTTP (HyperText Transfer Protocol):** Un sistema de petición y respuesta.
*   **Request (Petición):** Lo que envía el cliente (Navegador/React). Contiene:
    *   *URL/Endpoint:* `/api/usuarios`.
    *   *Verbo/Método:* GET (leer), POST (crear), PUT/PATCH (actualizar), DELETE (borrar).
    *   *Headers (Cabeceras):* Metadatos ocultos (Ej. "Soy un iPhone", "Tengo este Token de seguridad").
    *   *Body (Cuerpo):* Los datos reales (Ej. Un JSON con un nuevo correo).
*   **Response (Respuesta):** Lo que devuelve tu servidor. Contiene:
    *   *Status Code:* 200 (OK), 201 (Creado), 400 (Bad Request / Error del usuario), 401 (No autorizado), 404 (No encontrado), 500 (Server Error / Tu código explotó).
    *   *Body:* La información solicitada.
*   **El Módulo `node:http`:** Cómo levantar un servidor web básico escribiendo 100% JavaScript nativo sin librerías externas.

**Ejercicios:**
1.  Crea un servidor web nativo (sin Express) usando `http.createServer()`. Si el usuario entra a `http://localhost:3000/api`, devuélvele un JSON que diga `{ mensaje: "Hola Mundo" }`.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-30: Express.js (El Estándar Minimalista)

**Objetivo del nivel:**
Dejar de sufrir con el módulo `http` nativo. Express facilita el enrutamiento (Routing) de las URLs en un 90%.

**Conceptos exactos:**
*   **Creación de Instancia:** `const app = express(); app.listen(3000);`.
*   **Routing (Enrutamiento):** Definir caminos específicos.
    *   `app.get('/usuarios', (req, res) => res.json(usuarios))`
*   **Extracción de Datos:**
    *   *Params (Parámetros de URL):* `/usuarios/:id` -> `req.params.id`. (Para identificar un recurso específico).
    *   *Queries (Consultas de Búsqueda):* `/usuarios?edad=20` -> `req.query.edad`. (Para filtros, ordenamiento o paginación).
    *   *Body (Cuerpo):* `req.body`. Requiere activar el parser de Express con `app.use(express.json())`.

**Ejercicios:**
1.  Crea un "CRUD" falso de libros en memoria (un array de objetos).
2.  Crea 4 rutas en Express: Un GET para ver todos los libros, un GET `/libros/:id` para ver solo uno, un POST para agregar uno nuevo al array, y un DELETE para borrarlo.
3.  Usa "Postman" o "Thunder Client" para probar tus rutas sin necesidad de construir un Frontend en React.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 31-40: La Magia de los Middlewares

**Objetivo del nivel:**
El corazón absoluto de Express. Entender la "cadena de montaje" por la que pasa una petición HTTP antes de llegar a su destino final.

**Conceptos exactos:**
*   **¿Qué es un Middleware?** Una función que se para en medio de la petición (`req`) y la respuesta (`res`). Puede modificar la petición, finalizarla (si hay un error), o pasarla al siguiente eslabón usando la función `next()`.
*   **Middlewares Globales:** `app.use(logger)`. Se ejecutan en TODAS las rutas de tu aplicación.
*   **Middlewares de Ruta:** `app.get('/privado', verificarToken, (req, res) => {...})`. Solo se ejecutan en esa ruta.
*   **El Patrón de Autorización:** Crear un middleware que lea el Token del usuario. Si el token es inválido, el middleware hace `res.status(401).json({ error: "Fuera de aquí" })` y NUNCA llama a `next()`, protegiendo tu base de datos de intrusos.

**Ejercicios:**
1.  Crea un middleware global que imprima en la consola la hora exacta y el método de CADA petición que entre a tu servidor (Ej. `[12:00:00] GET /usuarios`).
2.  Crea un middleware de seguridad en una ruta `/admin` que solo permita el paso si envías un Header llamado `api-key` con el valor "123". Si no, bloquea la petición.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 41-50: Validaciones Estrictas y Seguridad Base

**Objetivo del nivel:**
Nunca confíes en el Frontend (Regla número 1 del Backend). Todo lo que llega por `req.body` debe ser tratado como radiactivo hasta que se demuestre lo contrario.

**Conceptos exactos:**
*   **Validación de Esquemas (Zod / Joi):** Librerías que verifican que el JSON que mandó el usuario tenga la estructura perfecta. Si tú esperas un `edad: number` y el usuario te manda `edad: "veinte"`, Zod frena la petición y lanza un error automático.
*   **CORS (Cross-Origin Resource Sharing):** La pesadilla de los Juniors. Por seguridad, el navegador bloquea peticiones de una página web (`tudominio.com`) hacia tu API (`tuapi.com`) a menos que tu servidor Backend explícitamente diga: "Sí, autorizo a tudominio.com a leerme" instalando y configurando el middleware `cors()`.
*   **Helmet:** Un middleware que automáticamente pone "Cascos" (Headers de seguridad HTTP) en tus respuestas para proteger tu app contra ataques comunes como XSS (Cross-Site Scripting).
*   **Rate Limiting (Límite de peticiones):** Evitar ataques DDoS básicos (Que alguien envíe 10,000 peticiones por segundo intentando tirar tu servidor).

**Ejercicios:**
1.  Instala Zod. Crea un esquema para crear un Usuario (nombre string > 3 letras, correo válido, password > 8 caracteres). Crea un middleware de Express que valide el `req.body` contra ese esquema Zod ANTES de intentar crear el usuario.

**Tiempo estimado:**
*   1.5 semanas.

---
*(Fin de la Parte 1 de Backend. Tienes un servidor sólido. En la Parte 2 le daremos una Arquitectura Enterprise con NestJS, JWT y Websockets).*
