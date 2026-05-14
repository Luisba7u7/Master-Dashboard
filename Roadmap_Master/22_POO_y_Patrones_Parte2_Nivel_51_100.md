# MATERIA 7: PROGRAMACIÓN ORIENTADA A OBJETOS (POO) Y PATRONES
**(Parte 2: Niveles 51 al 100 - Arquitectura SOLID y Patrones de Diseño)**

---

## Nivel 51-60: Composición sobre Herencia y Clases Abstractas

**Objetivo del nivel:**
Deshacerse de los árboles de herencia rígidos y problemáticos. Aprender a armar objetos como piezas de Lego combinando módulos de comportamiento.

**Conceptos exactos:**
*   **Composición sobre Herencia (Favor Composition over Inheritance):** La frase célebre de GoF. En lugar de decir "Un Coche ES UN Vehículo" (Herencia), dices "Un Coche TIENE UN Motor y TIENE UNAS Llantas" (Composición). El coche se arma inyectándole otros objetos adentro.
*   **Mixins en JavaScript:** Como JS no permite herencia múltiple (un hijo no puede tener 2 padres clase), los Mixins son funciones que copian métodos al prototipo de una clase dinámicamente.
*   **Clases Abstractas e Interfaces (En TypeScript/Java):** Una clase abstracta es un Molde a medias. NO PUEDES hacer `new MoldeAbstracto()`. Sirve obligatoriamente para que otra clase herede de ella y esté FORZADA a implementar ciertos métodos.

**Ejercicios:**
1.  Tienes 3 habilidades: `nadar()`, `volar()`, `correr()`.
2.  Si usas Herencia, crear una clase `Pato` que herede de `Pajaro` y `Pez` es imposible en JS.
3.  Usa Composición: Crea una clase vacía `Pato`. Crea 3 funciones independientes (Mixins). Inyéctale al Pato solo la habilidad de `nadar()` y `volar()`, y a un `Perro` inyéctale `nadar()` y `correr()`.

**Videos recomendados:**
*   *Midudev:* "Composición vs Herencia".
*   *Fazt:* "TypeScript Clases Abstractas".

**Tiempo estimado:**
*   1.5 semanas.

---

## Nivel 61-70: Principios SOLID (La "S" y la "O")

**Objetivo del nivel:**
Este es el filtro que usan las grandes empresas para saber si eres Senior. SOLID son 5 reglas de arquitectura limpia dictadas por Robert C. Martin (Uncle Bob).

**Conceptos exactos:**
*   **S - Single Responsibility Principle (SRP):** El Principio de Responsabilidad Única. "Una clase debe tener una, y solo una, razón para cambiar". Si tu clase `Usuario` guarda datos en memoria, Y TAMBIÉN hace la conexión a la base de datos MySQL, Y TAMBIÉN envía emails, estás violando el SRP.
*   **O - Open/Closed Principle (OCP):** Abierto a la extensión, cerrado a la modificación. Debes poder añadir nuevas funcionalidades a un sistema SIN tocar (modificar) el código viejo que ya funcionaba bien.

**Ejercicios:**
1.  **Refactor SRP:** Tienes una clase `CalculadoraSueldos` que calcula matemáticamente el sueldo y además genera un PDF y lo guarda en el disco duro. Pártela en 3 clases: `Calculadora`, `GeneradorPDF`, `SistemaArchivos`.
2.  **Refactor OCP:** Tienes una función que recibe un animal y un largo `switch(animal) { case 'Perro': sonidoPerro(); case 'Gato': ... }`. Si quieres añadir una Vaca, tienes que modificar esa función vieja. Refactoriza eso usando Polimorfismo (cada clase nueva de animal debe tener su propio método `sonido()`, así la función vieja nunca se toca).

**Videos recomendados:**
*   *Christopher Okhravi (YouTube):* "SOLID Principles" (En inglés, pero es la mejor serie del mundo sobre el tema).
*   *Beto Quiroga:* "Principios SOLID en español".

**Tiempo estimado:**
*   2 semanas (Son conceptos de digestión lenta).

---

## Nivel 71-80: Principios SOLID (La "L", la "I" y la "D")

**Objetivo del nivel:**
Completar la arquitectura. Entender cómo los contratos estrictos y la inversión del control evitan que tu aplicación sea un bloque de cemento inamovible.

**Conceptos exactos:**
*   **L - Liskov Substitution Principle (LSP):** Si tienes una clase Padre y una clase Hija, debes poder reemplazar al Padre con el Hijo en TODO tu código y el programa NO DEBE ROMPERSE. (Si el hijo se niega a hacer algo que el padre sí hacía, rompes LSP).
*   **I - Interface Segregation Principle (ISP):** "No obligues a los clientes a depender de interfaces que no usan". En lugar de tener una Interfaz masiva `IImpresoraSuper` (imprimir, escanear, grapar), haz 3 interfaces pequeñas `IImpresora`, `IEscaner`, `IGrapadora`. Si la máquina es barata, solo hereda de `IImpresora`.
*   **D - Dependency Inversion Principle (DIP):** Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones (Interfaces). (Lo vimos en Backend con NestJS: tu controlador de rutas no requiere saber si usas Mongo o Postgres).

**Práctica Mental Obligatoria:**
*   La violación clásica de Liskov: El Pato de Goma. Si `PatoDeGoma` hereda de `PatoVivo`, pero su método `volar()` lanza un error `throw "Los patos de goma no vuelan"`, acabas de romper Liskov. El Pato de Goma NO es un PatoVivo, heredaste mal.

**Tiempo estimado:**
*   2 semanas.

---

## Nivel 81-90: Patrones de Diseño GoF (Creacionales y Estructurales)

**Objetivo del nivel:**
Descubrir que el problema que estás intentando resolver con código espagueti, alguien más ya lo resolvió elegantemente en 1994 (El libro "Gang of Four").

**Conceptos exactos:**
*   **Patrones Creacionales (Cómo nacen los objetos):**
    *   *Singleton:* Asegurar que SOLO exista una única instancia de una clase en toda tu aplicación (Ej. La conexión a la Base de Datos. No quieres abrir 1000 conexiones).
    *   *Factory Method:* En lugar de usar `new` por todo tu código, tienes una clase "Fábrica" que decide qué clase instanciar en base a un string (`Fabrica.crearVehiculo("auto")`).
*   **Patrones Estructurales (Cómo se relacionan las clases):**
    *   *Adapter (Adaptador):* Tienes un código viejo que espera enchufe europeo, y una librería nueva que da enchufe americano. Creas una clase intermedia (Adaptador) que traduzca de un lado al otro sin romper ninguno.
    *   *Decorator (Decorador):* Añadirle "ropa" (comportamientos extras) a un objeto base de forma dinámica sin modificar su clase original.

**Ejercicios:**
1.  Implementa un Singleton perfecto en JavaScript o TypeScript (Pista: guarda la instancia en una propiedad estática `static instance` y revisa si es null antes de crearla).
2.  Implementa una Fábrica de Enemigos para un videojuego que devuelva una clase `Orco`, `Duende` o `Dragon` dependiendo del nivel de dificultad.

**Videos recomendados:**
*   *Refactoring.guru:* (No es un video, es el mejor sitio web ilustrado del planeta sobre Patrones de Diseño. Búscalo ya mismo).

**Tiempo estimado:**
*   2 semanas.

---

## Nivel 91-100: Patrones de Comportamiento (Observer y Strategy)

**Objetivo del nivel:**
Cómo se comunican los objetos entre ellos cuando hay eventos. Es la base teórica detrás de librerías como React, Redux o WebSockets.

**Conceptos exactos:**
*   **Observer (El Suscriptor/Publicador):** Tienes un objeto Youtuber (Subject) y muchos objetos Suscriptores (Observers). Cuando el Youtuber sube un video, en lugar de que los suscriptores pregunten cada 5 segundos "¿Ya lo subiste?", el Youtuber notifica automáticamente a todos su lista con un ciclo `forEach(sub => sub.notificar())`.
*   **Strategy (Estrategia):** Extraer algoritmos a clases separadas. Si tienes un E-commerce con pagos (`Paypal`, `Tarjeta`, `Bitcoin`), no haces un `if/else` gigante en tu carrito de compras. Creas una "Estrategia" independiente para cada pago, y se la inyectas al carrito.

**Ejercicios finales:**
1.  **El Ejercicio del Observer:** Implementa un mini clon de EventListener de Vanilla JS. Crea una clase `EventEmitter` con métodos `.on("evento", callback)` y `.emit("evento", datos)`.
2.  **Refactor Strategy:** Tienes una clase `Autenticacion` con un método `.login(metodo)`. Usa el patrón Strategy para aislar `LoginGoogle`, `LoginFacebook` y `LoginEmail` en clases separadas.

**Plataformas / Documentación:**
*   Nuevamente, devora la web **Refactoring.guru** (Sección de Patrones de Comportamiento).

**Tiempo estimado:**
*   2 semanas.

---
*(Fin de la Materia 7: POO y PATRONES. Ya no eres un "Coder", eres un Ingeniero de Software Arquitectónico. Avísame y marcamos el inicio de la Arquitectura Avanzada (Materia 8) o el Código Limpio (Materia 9)).*
