# MATERIA 6.1: BASES DE DATOS RELACIONALES (SQL)
**(Parte 1: Niveles 0 al 50 - Tablas, Relaciones y JOINs)**

---

## Nivel 0-10: El Mundo Relacional (Tablas, Filas y Claves)

**Objetivo del nivel:**
Entender la estructura de Excel glorificada que mueve al 90% de los bancos, gobiernos y empresas del mundo. Si los datos tienen reglas estrictas, usas SQL (PostgreSQL / MySQL).

**Conceptos exactos:**
*   **¿Qué es un RDBMS?** Relational Database Management System. El motor que lee tus archivos de datos y los expone al mundo.
*   **Tablas (Entidades):** Como una hoja de Excel. Ej. Tabla `usuarios`.
*   **Filas (Registros/Tuplas):** Cada entrada individual. Ej. El usuario Juan.
*   **Columnas (Atributos):** Las propiedades estáticas. Ej. Nombre, Edad. TODO registro debe tener exactamente las mismas columnas.
*   **La Llave Primaria (Primary Key - PK):** La regla de oro. Toda tabla DEBE tener una columna que sea única, irrepetible y no nula para identificar la fila (usualmente un `id` numérico o un `UUID` alfanumérico).

**Ejercicios:**
1.  Dibuja en papel una tabla `productos` con 4 columnas: `id`, `nombre`, `precio`, y `stock`. Inventa 3 filas de datos que respeten esa estructura estricta.

**Tiempo estimado:**
*   3 días.

---

## Nivel 11-20: Tipos de Datos Estrictos y Constraints

**Objetivo del nivel:**
Aprender a restringir la basura. La base de datos es la última línea de defensa. Si tu API falla, la base de datos no debe permitir que se guarde un "precio" con letras.

**Conceptos exactos:**
*   **Strings:** `VARCHAR(255)` (Texto corto, nombres, emails) vs `TEXT` (Artículos de blog infinitos).
*   **Números:** `INT` (Números enteros estándar) vs `BIGINT` (Para IDs de miles de millones de filas) vs `DECIMAL(10,2)` (Crucial para dinero. NUNCA uses FLOAT para dinero o perderás centavos por redondeo binario).
*   **Fechas:** `TIMESTAMP` vs `DATE`.
*   **Constraints (Restricciones):**
    *   `NOT NULL`: El campo es obligatorio.
    *   `UNIQUE`: No pueden existir dos filas con este mismo valor (Ej. El correo electrónico).
    *   `DEFAULT`: Si no me mandas nada, pon este valor (Ej. `DEFAULT false` para la columna `isAdmin`).

**Tiempo estimado:**
*   1 semana.

---

## Nivel 21-30: El Lenguaje DDL y DML (Sintaxis Base)

**Objetivo del nivel:**
Hablar el idioma SQL directamente a la consola.

**Conceptos exactos:**
*   **DDL (Data Definition Language):** Para manipular *la estructura* de la base de datos (Las columnas).
    *   `CREATE TABLE usuarios (...)`
    *   `ALTER TABLE usuarios ADD COLUMN telefono VARCHAR(15)`
    *   `DROP TABLE usuarios` (Destruye la tabla por completo).
*   **DML (Data Manipulation Language):** Para manipular *los datos* (Las filas).
    *   `INSERT INTO usuarios (nombre, correo) VALUES ('Juan', 'juan@a.com')`
    *   `SELECT nombre FROM usuarios WHERE edad > 18`
    *   `UPDATE usuarios SET nombre = 'Pedro' WHERE id = 1` (Peligro: Si olvidas el WHERE, cambiarás el nombre de TODOS los usuarios del sistema).
    *   `DELETE FROM usuarios WHERE id = 1` (Peligro: Igual que el Update. Si olvidas el WHERE, borras toda la base de datos).

**Ejercicios:**
1.  Instala DBeaver o TablePlus. Conéctate a una base de datos local de PostgreSQL.
2.  Escribe código SQL puro para crear una tabla, insertarle 3 filas, actualizar 1 y borrar otra.

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 31-40: Relaciones y la Foreign Key (Llave Foránea)

**Objetivo del nivel:**
Las tablas no viven aisladas. Se comunican entre sí. Entender cómo conectar datos sin duplicar información (Normalización).

**Conceptos exactos:**
*   **La Llave Foránea (FK):** Una columna en la Tabla B que guarda el ID (Llave primaria) de la Tabla A.
*   **Relación 1 a N (Uno a Muchos):** Un `Usuario` puede tener muchas `Compras`.
    *   *¿Dónde va la FK?* Siempre va del lado de los MUCHOS. La tabla `compras` tendrá una columna `usuario_id`.
*   **Relación N a M (Muchos a Muchos):** Un `Estudiante` tiene muchas `Clases`, y una `Clase` tiene muchos `Estudiantes`.
    *   *La solución (Tabla Intermedia/Pivot):* No puedes poner FK en ninguna de las dos. Debes crear una TERCERA tabla llamada `estudiantes_clases` que solo tenga dos columnas: `estudiante_id` y `clase_id`.
*   **Integridad Referencial (ON DELETE CASCADE):** Si borras al Usuario 1, ¿qué pasa con sus Compras? Si activas `CASCADE`, la base de datos borrará automáticamente todas sus compras para no dejar datos "huérfanos".

**Ejercicios:**
1.  Diseña en papel cómo se verían las tablas de Netflix: `Usuarios`, `Películas`, y la tabla que guarda qué películas ha visto cada usuario (¿Qué tipo de relación es?).

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 41-50: El Infierno de los JOINs

**Objetivo del nivel:**
Leer datos de 5 tablas diferentes al mismo tiempo como si fueran una sola. (La pregunta más común en entrevistas de bases de datos).

**Conceptos exactos:**
*   **`INNER JOIN`:** Devuelve SOLO las filas que tienen coincidencia en AMBAS tablas. (Ej. Trae a los Usuarios que SI hayan hecho una compra. Si un usuario no ha comprado nada, NO aparece).
*   **`LEFT JOIN`:** Devuelve TODOS los registros de la Tabla A (Izquierda), e intenta unirlos con la Tabla B. Si no hay coincidencia, la parte B aparece como `NULL`. (Ej. Trae a TODOS los usuarios, y si tienen compras, muéstralas. Si no tienen, muestra `NULL` en la columna compra).
*   **`RIGHT JOIN`:** Lo inverso al Left Join. Rara vez se usa, los desarrolladores prefieren voltear el orden de las tablas en un Left Join.
*   **`FULL OUTER JOIN`:** Devuelve TODO. Mezcla todo con todo, y si no hay parejas, rellena con `NULL` en ambos lados.

**Ejercicios:**
1.  Busca el diagrama de conjuntos de Venn de los SQL JOINs en Google Imágenes (Es obligatorio que lo tengas de fondo de pantalla hasta que lo memorices).
2.  Haz una consulta que cruce la tabla `Usuarios` con `Compras` usando un `INNER JOIN` y otra con `LEFT JOIN`. Observa la diferencia en la cantidad de filas devueltas.

**Tiempo estimado:**
*   2 semanas.

---
*(Fin de la Parte 1 de SQL. Tienes la lógica estructural completa. En la Parte 2 entraremos al rendimiento, CTEs y Transacciones Bancarias).*
