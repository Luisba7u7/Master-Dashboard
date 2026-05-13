# MATERIA 9: CLEAN CODE (CÓDIGO LIMPIO)
**(Parte 2: Niveles 51 al 100 - Errores, Testing y Code Smells)**

---

## Nivel 51-60: Manejo de Errores Limpio (No devuelvas Null)

**Objetivo del nivel:**
El manejo de errores en el código no debe ocultar la lógica de negocio. Debe ser elegante y, sobre todo, no dejar el sistema inestable.

**Conceptos exactos:**
*   **Usar Excepciones en lugar de Códigos de Retorno:** En lugar de devolver `-1` o `false` cuando algo sale mal, debes lanzar (Throw) una Excepción (`throw new Error("Saldo insuficiente")`). Esto permite que el error "burbujee" hacia arriba hasta un `try/catch` central.
*   **No devolver `null`:** El peor error de la informática (El error del billón de dólares, según su creador Tony Hoare). Si devuelves `null`, fuerzas a que quien te llamó escriba `if(usuario !== null)` en todo su código. Mejor devuelve un "Objeto Especial" (Special Case Pattern) o lanza una excepción.
*   **No pasar `null` como argumento:** Enviar `null` a una función es una invitación a un "Type Error: Cannot read property of null". Usa parámetros por defecto o sobrecarga.

**Ejercicios:**
1.  Busca una función en tu código que devuelva `null` si no encuentra un objeto (Ej. `buscarUsuario()`). Modifícala para que lance un `UsuarioNoEncontradoError`. Observa cómo desaparecen los chequeos de `null` en el resto de tu código.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 61-70: Objetos y Estructuras de Datos (La Ley de Demeter)

**Objetivo del nivel:**
Entender la sutil pero crítica diferencia entre una Estructura de Datos (que solo guarda cosas) y un Objeto (que hace cosas).

**Conceptos exactos:**
*   **La Asimetría:**
    *   *Objetos:* Ocultan sus datos (variables privadas) y exponen comportamientos (métodos públicos).
    *   *Estructuras de Datos (DTOs):* Exponen sus datos públicamente y no tienen comportamiento significativo. (En JS, un objeto plano `{ nombre: "Juan" }` es una estructura de datos, no un Objeto de POO).
*   **La Ley de Demeter (Principio de Conocimiento Mínimo):** Un módulo no debe conocer las entrañas (la estructura interna) de los objetos que manipula.
    *   *Violación (Train Wreck / Choque de Trenes):* `let nombreCalle = usuario.obtenerDireccion().obtenerCalle().obtenerNombre();`. Si la clase `Direccion` cambia, TODO tu código explota.
    *   *Solución:* `let nombreCalle = usuario.obtenerNombreCalle();` (El usuario debe hacer el trabajo sucio por ti, delegación).

**Tiempo estimado:**
*   1 semana.

---

## Nivel 71-80: Límites (Boundaries) y APIs de Terceros

**Objetivo del nivel:**
Mantener el código limpio incluso cuando usas librerías sucias de otras personas.

**Conceptos exactos:**
*   **Explorar y Aprender en los Límites:** No aprendas una librería de terceros directamente en tu código de producción. Crea "Learning Tests" (Tests de Aprendizaje) independientes para ver cómo se comporta la librería de Stripe o de AWS.
*   **Usar Código que aún no existe:** Cómo programar tu parte del trabajo hoy, aunque el equipo de Backend te diga que su API estará lista en 3 semanas (Uso de interfaces y Mocks).
*   **El Patrón Wrapper (Envoltorio):** NUNCA, NUNCA pases la librería "Axios" o "Lodash" por todos los archivos de tu proyecto. Crea un archivo `MiClienteHttp.js`, usa Axios *ahí adentro*, y en el resto de tu código llama a tu propio archivo. Si mañana Axios muere y debes usar `Fetch`, solo modificas UN archivo.

**Ejercicios:**
1.  Si usaste `axios.get()` en 20 archivos de React, borra todos. Crea un servicio `apiFetch.js` que envuelva la librería, y llama a ese servicio en su lugar.

**Tiempo estimado:**
*   1 semana.

---

## Nivel 81-90: Pruebas Limpias (Clean Tests y F.I.R.S.T.)

**Objetivo del nivel:**
Las pruebas unitarias (Tests) son código de producción. Si escribes tests sucios e incomprensibles, perderás más tiempo arreglando tests que haciendo features.

**Conceptos exactos:**
*   **TDD (Test-Driven Development):** Escribir la prueba ANTES de escribir el código que hace que la prueba pase. (Red -> Green -> Refactor).
*   **Mantener los Tests Limpios:** El código de test debe ser igual o MÁS limpio que el código de producción. Usa el patrón *Arrange, Act, Assert (Preparar, Actuar, Afirmar)* claramente separado.
*   **Un Assert por Test:** Lo ideal es que cada función `it()` o `test()` afirme UNA sola cosa.
*   **Reglas F.I.R.S.T. para Tests Unitarios:**
    *   *Fast (Rápidos):* Si tardan, no los correrás.
    *   *Independent (Independientes):* El test A no puede depender de que el test B corra primero.
    *   *Repeatable (Repetibles):* Deben correr igual en Windows, Mac, en la red corporativa o sin internet en un avión.
    *   *Self-Validating (Auto-validables):* Tienen que devolver un Booleano (Pasa o Falla). No puedes leer un log para ver si pasó.
    *   *Timely (Oportunos):* Deben escribirse justo antes de escribir el código de producción.

**Videos recomendados:**
*   *Midudev:* "Testing en Frontend con Jest / Vitest".

**Tiempo estimado:**
*   2 semanas (Requiere dominar Jest o Vitest).

---

## Nivel 91-100: Refactorización y Code Smells (Olor a Código)

**Objetivo del nivel:**
El código perfecto a la primera no existe. El desarrollo Senior se basa en la mejora continua.

**Conceptos exactos:**
*   **La Regla del Boy Scout:** "Deja el área de acampar más limpia de lo que la encontraste". Si entras a un archivo a arreglar un bug y ves un nombre de variable horrible, cámbialo, aunque no fuera parte de tu ticket original.
*   **Code Smells (Malos Olores):** Síntomas de que tu código está podrido, acuñados por Martin Fowler.
    *   *Duplicated Code:* Si copiaste y pegaste 3 veces lo mismo, extrae una función.
    *   *Long Method:* Funciones de más de 20 líneas.
    *   *Large Class:* Clases de más de 300 líneas (Viola el SRP).
    *   *Data Clumps (Grupos de Datos):* Si siempre pasas `(nombre, apellido, dni)` juntos a 5 funciones distintas, agrupalos en un objeto `Persona`.
*   **El Miedo a Refactorizar:** Si te da terror mover una línea de código porque crees que "algo se va a romper", significa que te faltan Tests Unitarios automatizados.

**Práctica Mental Continua:**
Lee código open source. Identifica malos olores en repositorios populares. Aplica la regla del Boy Scout todos los días en tu proyecto.

**Tiempo estimado:**
*   Toda tu carrera profesional.

---
*(Fin de la Materia 9: CLEAN CODE. Tu código ya no es solo funcional, es elegante, modular y profesional. Solo nos quedan Inglés Técnico y Metodologías Scrum. Avísame cuál sigue).*
