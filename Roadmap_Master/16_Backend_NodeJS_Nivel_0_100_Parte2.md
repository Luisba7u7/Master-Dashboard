# MATERIA 5: BACKEND Y NODE.JS
**(Parte 2: Niveles 51 al 100 - NestJS, Autenticación, JWT y WebSockets)**

---

## Nivel 51-60: Autenticación, Encriptación y JWT

**Objetivo del nivel:**
Manejar el sistema de Login. Aprender que jamás, bajo ninguna circunstancia, se guarda una contraseña en texto plano en la base de datos.

**Conceptos exactos:**
*   **Bcrypt (Hashing vs Encriptación):** La encriptación tiene una llave para "desencriptar". El Hashing (Bcrypt) es de un solo sentido. Convierte "123456" en un texto ilegible de 60 caracteres y es matemáticamente imposible devolverlo a su estado original. Al hacer Login, aplicas Hash a la contraseña ingresada y comparas si los hashes coinciden.
*   **JWT (JSON Web Token):** Un pasaporte digital. Cuando el usuario hace Login correctamente, el servidor genera un JWT (firmado con una clave secreta del `.env`). El usuario guarda este JWT y se lo muestra al servidor en CADA petición futura para demostrar quién es.
*   **Las 3 partes del JWT:** Header, Payload (los datos del usuario, ej. `id: 5`), y la Firma (Signature). Si alguien altera un solo bit del Payload para robarse otra cuenta, la firma matemática se rompe y el servidor rechaza el token.
*   **Cookies `HttpOnly` (Seguridad Nivel Banco):** Guardar el JWT en el `localStorage` del navegador es peligroso (vulnerable a robos por XSS). El estándar de alta seguridad es que el servidor envíe el JWT dentro de una Cookie sellada como `HttpOnly`, de modo que el JavaScript del Frontend no pueda leerla, pero el navegador la adjunte automáticamente en cada petición HTTP.

**Ejercicios:**
1.  Implementa una ruta de registro (`/register`) que encripte la contraseña con `bcrypt` antes de guardarla.
2.  Implementa una ruta de login (`/login`) que compare contraseñas. Si coincide, usa la librería `jsonwebtoken` para firmar un Token y envíalo en un JSON al cliente.

**Tiempo estimado:**
*   2 semanas.

---

## Nivel 61-70: Arquitectura de 3 Capas y Manejo de Errores Centralizado

**Objetivo del nivel:**
Limpiar la basura de tu archivo principal `app.js`. Tu servidor debe estar quirúrgicamente organizado para que no colapse al llegar a 10,000 líneas de código.

**Conceptos exactos:**
*   **Separation of Concerns:**
    1.  *Controllers:* Solo reciben peticiones HTTP, extraen datos del body, y envían las respuestas (JSON). NO Tienen lógica matemática ni llamadas a base de datos.
    2.  *Services:* El cerebro. Reciben la orden del Controller, ejecutan la lógica de negocio (validar edad, calcular descuento) y llaman al Repository.
    3.  *Repositories / Models:* Los únicos archivos con permiso de usar código SQL o de MongoDB para conectarse a la Base de Datos.
*   **Manejo Centralizado de Errores en Express:** Eliminar los 500 bloques `try/catch` de tus controladores. En Express, si tú pasas un Error dentro de un `next(new Error("Falló"))`, Express lo envía automáticamente a un Middleware Especial de Errores al final de tu archivo (Una función con 4 parámetros: `(err, req, res, next)`).
*   **Custom Error Classes:** Crear clases en JS (`class AppError extends Error`) para lanzar errores con Status Codes específicos (`throw new AppError("No autorizado", 401)`).

**Ejercicios:**
1.  Reestructura tu CRUD de la Parte 1. Crea las carpetas `controllers/`, `routes/` y `services/` y separa la lógica por completo.
2.  Crea un middleware global de errores en tu `app.js` para interceptar todas las fallas asíncronas.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 71-80: El Meta-Framework NESTJS (Módulos y Controladores)

**Objetivo del nivel:**
Express.js es un framework "no opinado" (te deja hacer un desastre si quieres). NestJS es el Framework de nivel Enterprise (opinado) que usan los bancos y corporaciones para mantener un orden militar en el código. (Usa TypeScript obligatoriamente).

**Conceptos exactos:**
*   **Arquitectura Modular:** En NestJS todo es un Módulo (Ej. `UsersModule`, `AuthModule`). Un módulo empaqueta Controladores y Servicios relacionados.
*   **Los Decoradores (Decorators):** La magia sintáctica de NestJS (Inspirada en Angular/Spring Boot). Pones `@Get('/usuarios')` encima de una función y mágicamente se convierte en una ruta GET, sin necesidad de usar `app.get()`.
*   **El Controlador en NestJS:**
    ```typescript
    @Controller('users')
    export class UsersController {
      @Get(':id')
      findOne(@Param('id') id: string) {
        return `Devolviendo usuario ${id}`;
      }
    }
    ```
*   **Pipes de Validación (DTOs):** NestJS trae validación brutal integrada usando las librerías `class-validator` y `class-transformer`. Creas una clase DTO (Data Transfer Object) y NestJS valida y bloquea el request automáticamente antes de que entre a tu función.

**Videos recomendados:**
*   *Fazt:* "NestJS Curso para Principiantes".

**Tiempo estimado:**
*   2 semanas.

---

## Nivel 81-90: Inyección de Dependencias (Dependency Injection - DI)

**Objetivo del nivel:**
El concepto de Ingeniería de Software más poderoso del Backend moderno. Es el corazón oscuro que hace que NestJS, Java Spring y C# .NET funcionen.

**Conceptos exactos:**
*   **Inversión de Control (IoC):** En lugar de que tú crees manualmente tus servicios haciendo `const userService = new UserService()` dentro de tu Controlador, dejas que el Framework (El Contenedor IoC) los cree y te los "Inyecte" automáticamente en el constructor.
*   **¿Por qué importa?** Facilita el Testing inmensamente. Si haces inyección de dependencias, puedes inyectarle un `MockUserService` falso al controlador durante una prueba unitaria, sin tener que tocar una base de datos real.
*   **Providers en NestJS:** Cualquier clase que tenga el decorador `@Injectable()` puede ser inyectada en otra clase. NestJS resuelve el rompecabezas de quién depende de quién automáticamente al arrancar el servidor.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 91-100: WebSockets, Comunicación Bidireccional y Tiempo Real

**Objetivo del nivel:**
Superar las limitaciones de HTTP. HTTP obliga a que el Cliente "pregunte" para que el Servidor "responda". Un WebSocket permite que el Servidor te envíe un mensaje a ti (Push) sin que tú lo hayas pedido. (Ej. WhatsApp Web o Notificaciones en vivo).

**Conceptos exactos:**
*   **Socket.io:** La librería líder en Node.js para envolver el protocolo nativo de WebSockets y añadirle "Salas" (Rooms) y reconexión automática si el internet falla.
*   **El Handshake Inicial:** La comunicación empieza como un protocolo HTTP normal, pero luego envía un header "Upgrade", y la conexión HTTP se "transforma" en un túnel de TCP abierto bidireccional y constante.
*   **Emitir y Escuchar (Eventos):**
    *   *Servidor:* `socket.emit("nuevoMensaje", { text: "Hola" })`
    *   *Cliente (React):* `socket.on("nuevoMensaje", (data) => console.log(data))`
*   **Broadcasting (Radiodifusión):** Enviar un mensaje a todos los usuarios conectados excepto al que generó el mensaje.

**Ejercicios:**
1.  Crea un servidor Node con `socket.io` y un frontend en React.
2.  Implementa un chat grupal simple donde lo que escribe una pestaña del navegador aparezca instantáneamente en la otra pestaña sin recargar la página.

**Tiempo estimado:**
*   2 semanas.

---
*(Fin de la Materia 5: BACKEND Y NODE.JS. Eres capaz de orquestar servidores monolíticos en Express o infraestructuras Enterprise de grado militar con NestJS).*
