# MATERIA 8: ARQUITECTURA DE SOFTWARE
**(Parte 1: Niveles 0 al 50 - Estilos Arquitectónicos y Clean Architecture)**

---

## Nivel 0-10: Monolitos vs Microservicios (La Gran Decisión)

**Objetivo del nivel:**
Entender la vista desde un helicóptero. Antes de escribir una línea de código, debes decidir cómo van a vivir tus servidores físicamente. Evitar el error novato de usar Microservicios para un proyecto simple.

**Conceptos exactos:**
*   **El Monolito (Monolithic Architecture):** Todo el código (Usuarios, Pagos, Inventario) vive en una sola carpeta, compila junto y se despliega en un solo servidor.
    *   *Ventajas:* Fácil de testear, fácil de desplegar, cero latencia de red interna.
    *   *Desventajas:* Si un programador rompe el módulo de pagos, TODO el sistema se cae. El código base se vuelve gigante.
*   **Microservicios:** Separar Usuarios, Pagos e Inventario en 3 servidores independientes que se comunican por internet (APIs).
    *   *Ventajas:* Escalamiento independiente (puedes darle más RAM solo a Pagos), resiliencia (si Pagos cae, Inventario sigue vivo).
    *   *Desventajas (La Trampa Prematura):* Complejidad DevOps masiva, latencia de red, consistencia eventual (¿qué pasa si el pago pasa pero el inventario falla la red?).
*   **El Monolito Modular:** El término medio de oro actual. Un solo servidor, pero el código está estrictamente dividido en módulos independientes que no se tocan directamente.

**Ejercicios mentales:**
1.  Si vas a hacer un clon de Uber, ¿cómo dividirías los microservicios? (Ej. Servicio de Pasajeros, Servicio de Conductores, Servicio de Pagos, Servicio de Geolocalización).
2.  Argumenta por qué empezarías ese clon de Uber como un Monolito los primeros 6 meses.

**Videos recomendados (Español):**
*   *Beto Quiroga:* "Microservicios vs Monolitos".
*   *Pelado Nerd:* "Arquitectura de Software: Monolito vs Microservicios".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 11-20: Arquitectura de 3 Capas (N-Tier)

**Objetivo del nivel:**
Aprender la forma histórica y tradicional de organizar el código dentro de un Monolito. Es la arquitectura más común que encontrarás en empresas.

**Conceptos exactos:**
*   **Separation of Concerns (Separación de Responsabilidades):** No mezclar lógica de base de datos en el archivo de diseño UI.
*   **1. Capa de Presentación (Controllers / UI):** La que interactúa con el usuario o recibe las peticiones HTTP. NO debe saber calcular impuestos, solo debe decir "Hubo un error" o "Todo salió bien".
*   **2. Capa de Negocio (Services / BLL):** El cerebro de la aplicación. Aquí vive el cálculo de impuestos y la lógica de "Si el usuario no es VIP, rechazar compra".
*   **3. Capa de Datos (Data Access Layer / Repositories):** Los archivos que hablan con SQL o MongoDB. Solo saben hacer `INSERT` o `SELECT`.
*   **Flujo de Datos:** El Controller recibe la petición -> llama al Service -> el Service calcula y llama al Repository -> el Repository guarda en la DB y devuelve el ID -> el Service devuelve el éxito -> el Controller responde JSON `200 OK`.

**Ejercicios:**
1.  Abre un proyecto Backend viejo tuyo. Identifica dónde mezclaste código de Base de Datos directamente dentro de un endpoint de Express.
2.  Crea la carpeta `services/` y `repositories/`. Extrae la lógica y conéctalas en cascada.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-30: Arquitectura Hexagonal (Puertos y Adaptadores)

**Objetivo del nivel:**
Curar el problema de la Arquitectura de 3 Capas. En las 3 Capas, todo depende de la Base de Datos. En la Hexagonal, el corazón de tu app no depende de NADA. (Arquitectura Senior).

**Conceptos exactos:**
*   **El Corazón (El Dominio):** Tu lógica de negocio pura, escrita sin saber si estás en la Web, en la Consola, si usas Mongo o si usas Postgres.
*   **Puertos (Interfaces):** El dominio define "Agujeros" con formas específicas. Ej. `IPagoRepository` (Dice que necesita un método `guardar()`, pero no le importa quién lo haga).
*   **Adaptadores (Implementaciones):** El código sucio de afuera. Creas un `MongoPagoRepository` que "encaja" en el Puerto, o un `PostgresPagoRepository`.
*   **Ventaja Brutal:** Puedes cambiar toda tu Base de Datos o tu framework de Frontend en 1 hora, sin tocar una sola línea de tu lógica de negocio.
*   **Inversión de Dependencias (El Principio D de SOLID aplicado a nivel de carpetas):** El exterior depende del interior, nunca al revés.

**Videos recomendados (Español):**
*   *CodelyTV:* "Arquitectura Hexagonal en JavaScript / TypeScript" (El estándar de oro en español para este tema).

**Tiempo estimado:**
*   2 semanas (Romperá tu forma de ver el código).

---

## Nivel 31-40: Introducción a Domain-Driven Design (DDD)

**Objetivo del nivel:**
Dejar de pensar en "Tablas de Bases de Datos" y empezar a pensar en "Reglas de Negocio". DDD es una filosofía de diseño inventada por Eric Evans para software gigantesco.

**Conceptos exactos:**
*   **El Lenguaje Ubicuo (Ubiquitous Language):** Si los expertos de negocio (Los de traje) llaman al cliente "Huésped", tu clase en el código NO se puede llamar `User` ni `Cliente`, DEBE llamarse `Huesped`. Negocio y Código deben hablar el mismo idioma.
*   **El Dominio:** El problema real que el software intenta resolver (Ej. Logística de Envíos).
*   **Bounded Contexts (Contextos Delimitados):** La palabra "Producto" significa algo para Inventario (Peso, Dimensiones) y significa otra cosa para Ventas (Precio, Promoción). En lugar de crear una clase gigante `Producto` con 50 propiedades, creas dos clases `Producto` diferentes que viven en Contextos (carpetas/microservicios) diferentes.

**Ejercicios mentales:**
1.  Imagina un sistema de Hospital. Define un Bounded Context para "Consulta Médica" y otro para "Facturación". ¿Cómo se vería la clase `Paciente` en Consulta vs en Facturación?

**Videos recomendados:**
*   *CodelyTV:* "¿Qué es Domain-Driven Design (DDD)?".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 41-50: Tácticas de DDD (Entidades, Agregados y Value Objects)

**Objetivo del nivel:**
Traducir la teoría de DDD a bloques de código reales.

**Conceptos exactos:**
*   **Entidades (Entities):** Objetos que tienen una IDENTIDAD única a lo largo del tiempo. Si un usuario cambia de nombre 5 veces, sigue siendo el mismo usuario por su ID.
*   **Value Objects (Objetos de Valor):** Objetos que NO tienen ID, se definen por sus propiedades. Si cambian, son otro objeto. Ej. `Dinero(monto: 50, moneda: "USD")`. Si cambias a 60, es otro dinero distinto. En el código, NUNCA debes pasar un número pelado `50`, debes pasar una instancia de `Dinero`.
*   **Agregados (Aggregates):** Un clúster de entidades y objetos de valor que se tratan como un solo bloque.
*   **Aggregate Root (Raíz del Agregado):** La única clase por la que puedes entrar al Agregado. (Ej. Si tienes `Carrito` y `ItemsDeCarrito`, NO puedes añadir un Item directamente a la Base de Datos. Debes pedírselo al `Carrito.añadirItem()`, porque el Carrito es el responsable de verificar que no te pases de 10 items).

**Ejercicios:**
1.  Crea un Value Object `Email` en TypeScript/JS. Su constructor debe validar que el string contenga un `@`. Si no lo tiene, lanza un Error. A partir de ahora, tu clase `Usuario` no recibe un `string` para el correo, recibe un objeto `Email`. ¡Acabas de blindar tu código!

**Tiempo estimado:**
*   1.5 semanas.

---
*(Fin de la Parte 1 de Arquitectura. Ya entiendes cómo estructurar proyectos inmensos internamente. Dime cuándo estés listo para la Parte 2: ESCALAMIENTO, REDES, EVENTOS Y MICROSERVICIOS).*
