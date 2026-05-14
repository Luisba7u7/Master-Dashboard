# MATERIA 6.2: BASES DE DATOS NOSQL (MongoDB y Redis)
**(Parte 2: Niveles 51 al 100 - Aggregation, Mongoose y la Velocidad de Redis)**

---

## Nivel 51-60: Aggregation Pipeline (El "JOIN" de Mongo)

**Objetivo del nivel:**
Cruzar datos y procesar matemáticas complejas en el servidor de la base de datos sin colapsar la RAM de tu aplicación Node.js.

**Conceptos exactos:**
*   **¿Qué es el Aggregation Framework?** Una cinta transportadora. Le pasas tus documentos a la Etapa 1 (ej. Filtro), los resultados pasan a la Etapa 2 (ej. Suma matemática), y los resultados pasan a la Etapa 3 (ej. Formateo final).
*   **Etapa `$match`:** Filtra los documentos (Igual que un `WHERE` o un `find()`). SIEMPRE debe ser tu primera etapa para reducir el volumen de datos a procesar.
*   **Etapa `$group`:** Agrupa por campos específicos y realiza sumas. (`_id` define por qué agrupar, ej. por país. Y usas `$sum` o `$avg` para promedios).
*   **Etapa `$lookup` (El temido JOIN falso):** Dado que Mongo no tiene JOINs reales, `$lookup` permite traer datos de otra colección a partir de un ID de referencia. Es computacionalmente MUY costoso. Si necesitas muchos `$lookups`, modelaste mal tus datos y debiste haber usado SQL.
*   **Etapa `$project`:** Quita los campos basura y devuelve un JSON limpio solo con la información que necesitas.

**Ejercicios:**
1.  Usa el Aggregation Pipeline para encontrar a los usuarios que viven en "México" (`$match`), calcular cuánto gastaron en total (`$group` usando `$sum`), y devolver solo su ID y el Total Gastado (`$project`).

**Tiempo estimado:**
*   2 semanas (Es un lenguaje matemático nuevo en sí mismo).

---

## Nivel 61-70: Índices y Rendimiento

**Objetivo del nivel:**
Evitar el infame "Collection Scan" (donde Mongo lee 5 millones de documentos uno por uno para encontrar un solo correo electrónico).

**Conceptos exactos:**
*   **`createIndex`:** Igual que en SQL, le dices a Mongo que cree un árbol B-Tree para una clave específica. Ej. `db.usuarios.createIndex({ correo: 1 })` (El 1 significa ascendente).
*   **Compound Indexes (Índices Compuestos):** Índices que abarcan 2 o más campos. Ej. `({ edad: 1, pais: 1 })`. *Regla de Oro (ESR):* Equality, Sort, Range. Primero pones en el índice lo que igualas exacto, luego lo que ordenas, luego los rangos (mayor que, menor que).
*   **Text Indexes:** Mongo tiene un motor de búsqueda de texto crudo (como un mini ElasticSearch) que te permite buscar "perros que saltan" dentro de campos infinitos de texto sin usar `$regex` pesado.
*   **Comando `explain("executionStats")`:** El detector de mentiras. Lo pones al final de tu query y te dirá exactamente en milisegundos cuánto tardó y si usó un índice o hizo un escaneo total.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 71-80: Mongoose ODM (La estructura en Node.js)

**Objetivo del nivel:**
Como Mongo te permite guardar basura sin formato, Mongoose es el policía que instalas en tu Backend (Node.js) para forzar reglas estrictas antes de guardar en la DB.

**Conceptos exactos:**
*   **ODM (Object Document Mapper):** Equivalente al ORM de SQL. Convierte la colección en una Clase de JavaScript.
*   **El Schema (Esquema):** Definiendo las reglas obligatorias en JS.
    ```javascript
    const userSchema = new mongoose.Schema({
      nombre: { type: String, required: true },
      edad: { type: Number, min: 18 }
    });
    ```
*   **Validaciones Nativas:** Mongoose detiene el `save()` automáticamente y lanza un error capturable si intentas guardar un usuario de 15 años usando el esquema de arriba.
*   **Métodos Estáticos vs Métodos de Instancia:** Crear funciones personalizadas dentro del esquema. Ej. `usuario.compararPassword()` (De Instancia) o `User.encontrarPorEmail()` (Estático).

**Ejercicios:**
1.  Instala `mongoose` en tu servidor Express. Crea el Esquema y Modelo de un Producto.
2.  Usa los métodos del modelo (`Product.find()`, `Product.create()`) para refactorizar tus rutas.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 81-90: REDIS (La Base de Datos en Memoria)

**Objetivo del nivel:**
Mongo y Postgres son lentos (tardan milisegundos). Guardan datos en un Disco Duro (SSD). Redis guarda TODO en la Memoria RAM. Tarda microsegundos. Aquí inicia tu conocimiento para aplicaciones en Tiempo Real y Caching.

**Conceptos exactos:**
*   **¿Qué es Redis (Remote Dictionary Server)?** Una base de datos NoSQL ultra-rápida basada en pares Clave-Valor (`Key: Value`).
*   **El peligro de la RAM:** Si tu servidor se apaga, la RAM se borra. Por ende, Redis NO se usa para guardar información crítica a largo plazo (No guardas las facturas aquí).
*   **Comandos Atómicos Base:** `SET llave valor`, `GET llave`, `DEL llave`.
*   **Tiempo de Vida (TTL - Time To Live):** Puedes ponerle una fecha de caducidad a un dato. `SETEX codigo_verificacion 300 "9876"`. El código se autodestruirá de Redis en exactamente 5 minutos (300 segundos).

**Ejercicios:**
1.  Instala Redis localmente o usa un contenedor Docker (`docker run -p 6379:6379 redis`).
2.  Entra al Redis CLI y guarda tu nombre. Ponle una caducidad de 10 segundos. Has `GET` repetidamente hasta que el nombre desaparezca solo.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 91-100: Arquitectura con Redis en Producción

**Objetivo del nivel:**
Implementar los 3 casos de uso donde Redis es el rey indiscutible de la industria tecnológica.

**Conceptos exactos:**
*   **1. Caching (Caché de consultas pesadas):** Tienes un dashboard SQL que tarda 5 segundos en calcular las ganancias mensuales. Una vez calculado, guardas ese JSON gigante en Redis bajo la llave `"dashboard_mensual"` con un TTL de 1 hora. Las siguientes peticiones de TODOS tus clientes no tocan SQL, leen Redis y responden en 2 milisegundos.
*   **2. Rate Limiting (Protección contra Hackers):** Guardas en Redis la IP del usuario. Si la IP intenta iniciar sesión más de 5 veces en 1 minuto, Redis lo bloquea y devuelve un Error HTTP 429 (Too Many Requests).
*   **3. Sesiones Distribuidas y Cookies:** En un microservicio escalado (10 servidores Express balanceados), no puedes guardar la sesión en la RAM de la PC local. Guardas el Session ID (Cookie) en Redis, así los 10 servidores saben instantáneamente si el usuario tiene permiso para entrar.

**Ejercicios finales:**
1.  En tu servidor Node.js, implementa un endpoint `/slow-data` que tenga un `setTimeout` artificial de 3 segundos simulando una carga pesada.
2.  Instala la librería `redis` de npm. Implementa caché: Si la data está en Redis, devuélvela rápido. Si no está, espera 3 segundos, envíala y también gúardala en Redis para la siguiente vez.

**Tiempo estimado:**
*   2 semanas.

---
*(Fin de la Materia 6.2: BASES DE DATOS NOSQL. Ya tienes el arsenal completo. Postgres para el Dinero y Reglas Estrictas. Mongo para Flexibilidad Infinita. Redis para Velocidad de la Luz).*
