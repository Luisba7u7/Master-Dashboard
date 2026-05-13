# MATERIA 6.1: BASES DE DATOS RELACIONALES (SQL)
**(Parte 2: Niveles 51 al 100 - Rendimiento, Transacciones ACID y ORMs)**

---

## Nivel 51-60: Agrupación Matemática (Agregaciones)

**Objetivo del nivel:**
SQL no solo lee tablas, es una calculadora matemática extremadamente eficiente. Aquí aprendes a crear "Reportes Financieros" o "Dashboards" para el administrador.

**Conceptos exactos:**
*   **Funciones Base:** `COUNT()` (Cuántos son), `SUM()` (Sumatoria de todos), `AVG()` (Promedio), `MAX()` y `MIN()`.
*   **`GROUP BY`:** El poder real. ¿Quieres saber cuánto dinero gastó CADA usuario en tu tienda?
    `SELECT usuario_id, SUM(total) FROM compras GROUP BY usuario_id`.
*   **`HAVING` vs `WHERE`:** La trampa típica de entrevista.
    *   `WHERE` filtra filas ANTES de que ocurra la agrupación.
    *   `HAVING` filtra filas DESPUÉS de que ocurra la agrupación. (Ej. "Muéstrame a los usuarios cuyo promedio de compra sea mayor a 100 dólares").

**Tiempo estimado:**
*   1 semana.

---

## Nivel 61-70: Subqueries y CTEs (Common Table Expressions)

**Objetivo del nivel:**
Escribir consultas de nivel Senior sin perder la legibilidad. Cómo hacer consultas dentro de consultas.

**Conceptos exactos:**
*   **La Subquery clásica:** Usar el resultado de un SELECT como el filtro de otro. (Ej. `SELECT * FROM usuarios WHERE id IN (SELECT usuario_id FROM baneados)`).
*   **CTEs (`WITH`):** El equivalente a crear "Variables" dentro de SQL para que el código sea legible de arriba hacia abajo. En lugar de anidar 4 consultas asquerosas, defines bloques lógicos al principio del script.
    ```sql
    WITH UsuariosVip AS (
      SELECT id FROM usuarios WHERE compras > 10
    )
    SELECT * FROM compras WHERE usuario_id IN (SELECT id FROM UsuariosVip);
    ```

**Tiempo estimado:**
*   1 semana.

---

## Nivel 71-80: Índices y el Motor de Búsqueda (B-Trees)

**Objetivo del nivel:**
Comprender por qué tu aplicación de Node.js de repente tarda 5 segundos en devolver los usuarios, y cómo arreglarlo usando la estructura de datos más importante de las bases de datos.

**Conceptos exactos:**
*   **Full Table Scan (El Enemigo):** Si haces un `SELECT * FROM usuarios WHERE correo = 'juan@a.com'` en una tabla de 10 millones de usuarios, la base de datos lee LA TABLA ENTERA fila por fila hasta encontrar a Juan. Esto destruye el servidor.
*   **¿Qué es un Índice (Index)?** Es como el "Índice Alfabético" al final de un libro. En lugar de leer el libro entero para buscar una palabra, vas al índice, buscas la letra 'J', y te dice "Página 450". (Index Seek).
*   **Estructura B-Tree:** El algoritmo interno de los índices para dividir la búsqueda matemáticamente y encontrar un dato en milisegundos.
*   **El Costo Oculto:** ¿Por qué no le ponemos Índices a TODAS las columnas y ya? Porque cada vez que haces un `INSERT` o un `UPDATE`, la base de datos debe actualizar el índice también. Si pones demasiados índices, tu base de datos será rapidísima para leer (`SELECT`), pero lentísima para escribir (`INSERT`).

**Ejercicios:**
1.  Investiga el comando `EXPLAIN ANALYZE` en PostgreSQL para ver el tiempo de ejecución exacto de tus consultas y si están usando un Full Scan o un Index Seek.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 81-90: Transacciones y Propiedades A.C.I.D.

**Objetivo del nivel:**
El nivel Bancario. Entender cómo evitar que el dinero desaparezca en el aire si un cable de internet se corta a la mitad de una transferencia.

**Conceptos exactos:**
*   **¿Qué es una Transacción?** Un bloque de varias instrucciones SQL que se tratan como si fueran UNA SOLA. (Ej. 1. Restar 50$ a Juan. 2. Sumar 50$ a Pedro).
*   **COMMIT y ROLLBACK:** Si las dos instrucciones funcionan, haces `COMMIT` (Se guardan permanentemente). Si la máquina se apaga o hay un error en el paso 2, el sistema hace un `ROLLBACK` automático (Revierte el paso 1 como si nunca hubiera pasado, devolviéndole los 50$ a Juan).
*   **A.C.I.D:**
    *   *Atomicidad:* O se ejecuta TODO el bloque de la transacción, o no se ejecuta NADA. No existen los "puntos medios".
    *   *Consistencia:* La transacción no puede romper las reglas de la base de datos (Ej. No puede dejar un saldo negativo si la columna no lo permite).
    *   *Isolación (Isolation):* Si ocurren dos transferencias al mismo tiempo exacto, ocurren como si estuvieran aisladas en habitaciones separadas para no chocar (Niveles de aislamiento: Read Committed, Serializable).
    *   *Durabilidad:* Si se hizo un `COMMIT` exitoso y al microsegundo siguiente se quema el disco duro del servidor, la base de datos tiene la garantía matemática de recuperar ese dato usando el "Transaction Log" (Write-Ahead Log).

**Tiempo estimado:**
*   2 semanas (Es teoría fundamental de ciencias de la computación).

---

## Nivel 91-100: ORMs (Object-Relational Mappers) y el Problema N+1

**Objetivo del nivel:**
Dejar de escribir SQL crudo como cavernícola y usar herramientas modernas en Node.js, pero entendiendo los monstruos que estas herramientas pueden crear por debajo.

**Conceptos exactos:**
*   **¿Qué es un ORM? (Ej. Prisma, TypeORM, Sequelize):** Una librería que lee tu Base de Datos SQL y la transforma en Clases y Objetos de TypeScript/JS.
    *   *En lugar de:* `SELECT * FROM usuarios`
    *   *Escribes:* `prisma.user.findMany()`
*   **Beneficios:** Tienes autocompletado en VS Code (TypeScript) y previene inyecciones SQL automáticamente.
*   **El Problema N+1 (El Asesino Silencioso):** Los ORMs son "tontos". Si le pides 10 Usuarios y sus 10 Posts, un novato haría un loop. El ORM hace 1 petición para traer a los 10 usuarios, y luego hace 10 peticiones extra para traer los posts de cada uno. ¡Hiciste 11 peticiones a la DB (N+1) en lugar de hacer 1 solo JOIN eficiente! Aprende a usar comandos como `include` o `populate` para evitar esto.

**Ejercicios finales:**
1.  Inicia un proyecto en Node. Instala `Prisma ORM`. Conéctalo a una base de PostgreSQL (Puedes usar servicios gratuitos en la nube como Supabase o Neon). Define 2 modelos y haz un CRUD usándolo.

**Tiempo estimado:**
*   2 semanas.

---
*(Fin de la Materia 6.1: BASES DE DATOS SQL. Estás blindado matemáticamente. Pasaremos a NoSQL para ver el otro lado de la moneda).*
