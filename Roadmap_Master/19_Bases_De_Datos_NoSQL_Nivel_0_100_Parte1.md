# MATERIA 6.2: BASES DE DATOS NOSQL (MongoDB y Redis)
**(Parte 1: Niveles 0 al 50 - El Teorema CAP, Documentos y MongoDB Core)**

---

## Nivel 0-10: El Surgimiento de NoSQL y el Teorema CAP

**Objetivo del nivel:**
Entender por qué las empresas gigantes modernas (Facebook, Amazon) no usan SQL para todo. Descubrir la necesidad de bases de datos flexibles y ultra-escalables.

**Conceptos exactos:**
*   **¿Qué es NoSQL (Not Only SQL)?** Un término general para bases de datos que no usan tablas rígidas. Tipos principales: Documentales (MongoDB), Clave-Valor (Redis), Grafos (Neo4j), y Columnas Anchas (Cassandra).
*   **El Teorema CAP (La regla de oro de los Sistemas Distribuidos):**
    *   *Consistency (Consistencia):* Todos los usuarios ven los mismos datos al mismo tiempo.
    *   *Availability (Disponibilidad):* El sistema siempre responde, incluso si hay fallas.
    *   *Partition Tolerance (Tolerancia a Particiones):* El sistema sigue funcionando aunque se corte el cable entre el Servidor A y el Servidor B.
    *   *La cruel realidad:* Matemáticamente, solo puedes elegir DOS de estas tres características en una base de datos distribuida. SQL elige Consistencia. NoSQL (usualmente) elige Disponibilidad (Consistencia Eventual).
*   **Escalamiento Horizontal nativo (Sharding):** SQL sufre mucho si intentas dividir su base de datos en 5 computadoras. NoSQL nació para ser dividida en 1,000 computadoras baratas sin esfuerzo.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 11-20: MongoDB Core y el formato BSON

**Objetivo del nivel:**
Cambiar tu cerebro de "Tablas de Excel" a "Árboles JSON infinitos".

**Conceptos exactos:**
*   **BSON (Binary JSON):** MongoDB no guarda JSON de texto puro, guarda un JSON compilado en binario que es más rápido de leer y permite guardar tipos de datos avanzados como fechas matemáticas y el famoso `ObjectId`.
*   **Diccionario de Traducción (SQL -> Mongo):**
    *   Base de Datos = Base de Datos.
    *   Tabla = Colección (`Collection`).
    *   Fila = Documento (`Document`).
    *   Columna = Campo (`Field`).
*   **La Flexibilidad Absoluta (Schema-less):** En Mongo, el primer documento de tu colección `usuarios` puede tener 2 campos (`nombre`, `edad`), y el segundo documento puede tener 50 campos distintos, y Mongo no se quejará. (Esto es una bendición y una maldición inmensa).
*   **El `_id`:** Mongo crea automáticamente un `ObjectId` único de 24 caracteres hexadecimales para cada documento si tú no le pasas uno.

**Ejercicios:**
1.  Instala MongoDB localmente o crea un clúster gratuito en MongoDB Atlas.
2.  Usa la herramienta MongoDB Compass (Interfaz gráfica) para conectarte a tu clúster.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-30: Operaciones CRUD Atómicas

**Objetivo del nivel:**
Aprender la sintaxis que reemplaza al `SELECT`, `INSERT`, `UPDATE` y `DELETE` de SQL.

**Conceptos exactos:**
*   **Create:** `db.usuarios.insertOne({ nombre: "Juan", edad: 25 })` y `insertMany([...])`.
*   **Read:** `db.usuarios.find({ edad: 25 })`. (Equivale al `SELECT * FROM usuarios WHERE edad=25`).
*   **Update:** Requiere dos parámetros (Filtro, y qué cambiar). Ojo, DEBES usar el operador `$set`.
    *   *Correcto:* `db.usuarios.updateOne({ nombre: "Juan" }, { $set: { edad: 26 } })`.
    *   *Peligro:* Si omites `$set`, borrarás todo el documento original y lo reemplazarás solo con el número 26.
*   **Delete:** `db.usuarios.deleteOne({ _id: ObjectId("1234...") })`.

**Ejercicios:**
1.  Abre la terminal de Mongo (`mongosh`).
2.  Crea una base de datos `tienda`, inserta 5 productos diferentes (algunos con campos extra), busca solo los que tengan un precio específico, y bórralos.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 31-40: Filtros Avanzados y Operadores

**Objetivo del nivel:**
Hacer búsquedas complejas en árboles de datos profundos.

**Conceptos exactos:**
*   **Operadores de Comparación:** `$eq` (Igual), `$gt` (Mayor que), `$gte` (Mayor o igual), `$lt` (Menor que).
    *   *Ejemplo:* `db.productos.find({ precio: { $gt: 100 } })`.
*   **Operadores Lógicos:** `$or`, `$and`, `$in`.
    *   *Ejemplo:* Traer usuarios que sean de México O de España: `db.usuarios.find({ pais: { $in: ["MX", "ES"] } })`.
*   **Búsqueda de Expresiones Regulares (`$regex`):** Equivalente al `LIKE` de SQL para buscar coincidencias de texto.
*   **Proyección (Projection):** Si un documento tiene 100 campos, y solo quieres leer el "nombre", usas proyección para no ahogar tu memoria RAM: `db.usuarios.find({}, { nombre: 1, _id: 0 })`.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 41-50: Modelado de Datos (Embedding vs Referencing)

**Objetivo del nivel:**
El dolor de cabeza más grande de los programadores SQL al pasarse a Mongo. En Mongo NO HAY JOINs EFICIENTES. Tienes que modelar tus datos pensando en cómo los vas a leer.

**Conceptos exactos:**
*   **Embebido (Embedding / Denormalización):** Si una "Receta" tiene 5 "Ingredientes", en lugar de crear dos colecciones separadas, metes el array de ingredientes DIRECTAMENTE DENTRO del documento de la Receta.
    *   *Ventaja:* Lees la receta completa en 1 milisegundo (0 JOINs).
    *   *Desventaja:* El límite de tamaño de un documento BSON es de 16MB. Si embebes demasiada información (Ej. Todos los comentarios de un video de Youtube), el documento explotará.
*   **Referencia (Referencing / Normalización):** Igual que SQL. Creas la colección `Usuarios` y la colección `Posts`. El post guarda el `ObjectId` del creador.
*   **La Regla de Oro de Mongo:** "Lo que se lee junto, se guarda junto". Si vas a mostrar los datos en la misma pantalla casi siempre, embébelos. Si crecen infinitamente o necesitas actualizarlos masivamente en muchos lugares, referéncialos.

**Ejercicios:**
1.  Diseña en papel el modelo de datos de un "Blog". Modela un documento usando Embedding para los Comentarios del post, y modela otra versión usando Referencing. Analiza los pros y contras de cada uno.

**Tiempo estimado:**
*   1.5 semanas.

---
*(Fin de la Parte 1 de NoSQL. Tienes la mente flexible ahora. En la Parte 2 aprenderás a hacer analítica avanzada (Aggregation), usar Mongoose ODM en Node.js, y entrarás al hiper-velocidad con REDIS).*
