# MATERIA 9: CLEAN CODE (CÓDIGO LIMPIO)
**(Parte 1: Niveles 0 al 50 - Variables, Funciones y Estructuras de Control)**

---

## Nivel 0-10: Nomenclatura Intencional (El Arte de Nombrar)

**Objetivo del nivel:**
Entender que el código se escribe una vez, pero se lee cien veces. Aprender a elegir nombres que cuenten una historia sin necesitar explicaciones.

**Conceptos exactos:**
*   **Intención Reveladora:** Prohibido usar `let x = 10;`. Si significa días, usa `let diasHastaVencimiento = 10;`.
*   **Evitar la Desinformación:** No llames `cuentaList` a una variable si no es literalmente un `Array` (List). Llámala `cuentas` o `grupoDeCuentas`.
*   **Hacer distinciones significativas:** Si tienes una clase `InfoProducto` y otra `DataProducto`, estás confundiendo al lector. Usa nombres que marquen la diferencia exacta.
*   **Nombres Pronunciables:** No uses `let fchaRgs;`. Usa `let fechaDeRegistro;`. Si no puedes pronunciarlo en una videollamada, el nombre está mal.
*   **Reglas Gramaticales Clásicas:**
    *   *Clases:* Sustantivos (`Usuario`, `Cuenta`). Nunca verbos.
    *   *Funciones:* Verbos (`guardarUsuario`, `obtenerCuenta`).
    *   *Booleanos:* Preguntas (`esValido`, `tienePermisos`, `isActive`).

**Ejercicios:**
1.  Abre un proyecto viejo. Busca todas las variables de 1 o 2 letras (ej. `let e`, `let data`). Renómbralas con palabras de al menos 3 sílabas que describan exactamente su contenido.

**Libros / Videos recomendados:**
*   *Robert C. Martin:* "Clean Code" (Capítulo 2: Nombres con sentido).
*   *Midudev:* "Tips de Clean Code - Nombres".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 11-20: El Arte de las Funciones

**Objetivo del nivel:**
Dejar de escribir "Funciones Monstruo" de 300 líneas. Una función debe caber en tu pantalla sin hacer scroll y debe leerse como un párrafo de un libro.

**Conceptos exactos:**
*   **Tamaño:** Las funciones deben ser pequeñas. Y luego, deben ser AÚN MÁS pequeñas (idealmente no más de 10-20 líneas).
*   **Hacer UNA sola cosa (Do One Thing):** Si una función dice `validarYGuardarUsuario()`, está haciendo dos cosas. Divídela en `validarUsuario()` y `guardarUsuario()`.
*   **El número de Argumentos:**
    *   0 argumentos: Perfecto.
    *   1 argumento (Monádica): Excelente.
    *   2 argumentos (Diádica): Aceptable, pero cuidado con el orden (`crear(nombre, edad)`).
    *   3+ argumentos: **Refactoriza**. Si necesitas pasar 5 cosas, pásale UN solo objeto que las contenga todas (ej. `crearUsuario({ nombre, edad, email, rol })`).
*   **Sin Efectos Secundarios (Side Effects):** Si tu función dice `checkPassword()` y devuelve `true/false`, ¡NO debe iniciar la sesión del usuario por debajo de la mesa! Cumple solo lo que tu nombre promete.

**Ejercicios:**
1.  Toma una función tuya que tenga más de 50 líneas. Pártela en 3 funciones más pequeñas. Haz que la función principal solo sea una lectura de las llamadas a las funciones hijas:
    ```javascript
    function procesarCompra(carrito) {
      validarStock(carrito);
      cobrarTarjeta(carrito);
      enviarEmail(carrito);
    }
    ```

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 21-30: Estructuras de Control y el Odio al `else`

**Objetivo del nivel:**
Destruir el "Código Arrow" (El Código Flecha `>>>>` de la Muerte), donde tienes `if` dentro de `if` dentro de `if`.

**Conceptos exactos:**
*   **El Patrón Bouncer (Early Returns / Guard Clauses):** Consiste en evaluar los errores PRIMERO y sacar de la función a los inválidos inmediatamente con `return`. Al hacerlo, eliminas la necesidad del `else`.
    *   *Mal:* `if(usuario) { if(usuario.vip) { hacerAlgo() } else { error() } } else { error() }`
    *   *Bien:* `if(!usuario) return error(); if(!usuario.vip) return error(); hacerAlgo();`
*   **Evitar el "Negative Logic" (Lógica Negativa):** Es más difícil de leer `if(!esInvalido)` que `if(esValido)`. Crea variables booleanas para facilitar la lectura.
*   **Encapsular Condicionales:** Si tienes `if (edad > 18 && pais === "MX" && noTieneDeudas)`, extráelo a una variable o función: `if (esAptoParaCredito(usuario))`.

**Ejercicios:**
1.  Busca en tu código cualquier bloque `if / else if / else`. Intenta borrar la palabra `else` por completo usando "Early Returns". Tu código quedará alineado completamente a la izquierda, reduciendo la carga cognitiva.

**Videos recomendados:**
*   *Fazt:* "Cómo eliminar los condicionales If-Else".

**Tiempo estimado:**
*   1 semana.

---

## Nivel 31-40: Los Comentarios (Un Mal Necesario)

**Objetivo del nivel:**
Entender que "No escribas comentarios, escribe código expresivo". Un comentario es, por definición, un fracaso en tu capacidad de expresarte a través del código.

**Conceptos exactos:**
*   **El Comentario Miente:** El código cambia constantemente, pero la gente se olvida de actualizar los comentarios. Un comentario desactualizado es peor que no tener ningún comentario.
*   **Comentarios Malos:**
    *   *Ruido:* `// i se incrementa en 1` justo arriba de `i++`.
    *   *Código Comentado:* Dejar bloques gigantes de código verde apagado "por si acaso". ¡Bórralo! Para eso existe Git.
    *   *Marcadores:* `// ------- ZONA DE VARIABLES -------`.
*   **Comentarios Buenos:**
    *   *Avisos de Consecuencias:* `// ADVERTENCIA: Esta prueba tarda 5 minutos en correr.`
    *   *Aclaración de Intención:* Explicar *POR QUÉ* tomaste una decisión de diseño extraña, no el *QUÉ* hace el código. (Ej. `// Usamos un bucle For nativo en lugar de .map() porque ganamos 50ms críticos de rendimiento en esta vista`).

**Ejercicios:**
1.  Lee el código que escribiste hace un mes. Si encuentras un comentario explicando qué hace una variable confusa, borra el comentario y CÁMBIALE EL NOMBRE a la variable para que el comentario ya no sea necesario.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 41-50: Formateo, Linters y Números Mágicos

**Objetivo del nivel:**
Lograr que el código de un equipo de 10 personas parezca escrito por 1 sola persona. Automatizar la limpieza para no pelear en las revisiones de código.

**Conceptos exactos:**
*   **Números Mágicos (Magic Numbers):** Jamás escribas `if (estado === 4)` o `calcularSalario(dias * 86400)`. El lector no sabe qué es "4" o "86400".
    *   *Solución:* `const SEGUNDOS_POR_DIA = 86400; const ESTADO_PAGADO = 4;`.
*   **El Formateo Físico:** Conceptos del "Clean Code" sobre la lectura de arriba hacia abajo (Metáfora del periódico). Las funciones principales deben estar arriba, y las funciones de detalle que mandan llamar deben estar justo debajo.
*   **Herramientas Obligatorias:**
    *   *Prettier:* El dictador del formato. Se encarga de poner comas, espacios y tabulaciones automáticamente al guardar.
    *   *ESLint:* El policía de la sintaxis. Te marca de rojo si declaraste una variable que no usaste o si violaste una regla del equipo.

**Ejercicios:**
1.  Instala la extensión `ESLint` y `Prettier` en tu VS Code. Configura el archivo `.eslintrc.json` usando el estándar de la industria (Ej. el "Airbnb JavaScript Style Guide").
2.  Configura VS Code para "Format On Save". Observa cómo tu código se limpia solo al apretar Ctrl+S.

**Videos recomendados:**
*   *Midudev:* "Cómo configurar ESLint y Prettier paso a paso".

**Tiempo estimado:**
*   1 semana.

---
*(Fin de la Parte 1 de Clean Code. Tu código ahora se lee como poesía. Avísame y lanzamos la Parte 2: Clases, Errores y Testing Limpio).*
